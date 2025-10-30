import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { donors, activityLog } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'
import { createDonorSchema } from '@/lib/validation/zod-schemas'

// GET /api/donors - List all donors for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const donorsList = await db
      .select()
      .from(donors)
      .where(eq(donors.userId, user!.id))
      .orderBy(desc(donors.createdAt))

    return NextResponse.json(successResponse(donorsList))
  } catch (error) {
    console.error('Error fetching donors:', error)
    return errorResponse('An unexpected error occurred while fetching donors', 500)
  }
}

// POST /api/donors - Create a new donor
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    // Parse and validate request body
    let body
    try {
      body = await request.json()
    } catch {
      return errorResponse('Invalid JSON in request body', 400)
    }

    const validationResult = createDonorSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    const validatedData = validationResult.data

    // Create the donor and log activity in a transaction
    const newDonor = await db.transaction(async (tx) => {
      const [donor] = await tx
        .insert(donors)
        .values({
          userId: user!.id,
          name: validatedData.name.trim(),
          email: validatedData.email?.trim() || null,
          phone: validatedData.phone?.trim() || null,
          organization: validatedData.organization?.trim() || null,
          title: validatedData.title?.trim() || null,
          address: validatedData.address?.trim() || null,
          city: validatedData.city?.trim() || null,
          state: validatedData.state?.trim() || null,
          zipCode: validatedData.zipCode?.trim() || null,
          donorType: validatedData.donorType || null,
          notes: validatedData.notes?.trim() || null,
        })
        .returning()

      // Log the activity
      await tx.insert(activityLog).values({
        userId: user!.id,
        action: `Added new donor: ${validatedData.name}`,
        entityType: 'donor',
        entityId: donor.id,
        details: `Type: ${validatedData.donorType || 'N/A'}`,
      })

      return donor
    })

    return NextResponse.json(successResponse(newDonor), { status: 201 })
  } catch (error) {
    console.error('Error creating donor:', error)
    return errorResponse('An unexpected error occurred while creating donor', 500)
  }
}
