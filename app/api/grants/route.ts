import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { grantApplications, activityLog } from '@/db/schema'
import { desc, eq, count } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'
import { paginationSchema } from '@/lib/validation/zod-schemas'

// GET /api/grants - List all grants for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    // Validate pagination parameters
    const searchParams = request.nextUrl.searchParams
    const paginationResult = paginationSchema.safeParse({
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '20',
    })

    if (!paginationResult.success) {
      return errorResponse(
        'Invalid pagination parameters',
        400,
        paginationResult.error.issues
      )
    }

    const { page, limit } = paginationResult.data
    const offset = (page - 1) * limit

    // Fetch grants for authenticated user only
    const grants = await db
      .select()
      .from(grantApplications)
      .where(eq(grantApplications.userId, user!.id))
      .orderBy(desc(grantApplications.createdAt))
      .limit(limit)
      .offset(offset)

    // Get total count for pagination
    const [totalResult] = await db
      .select({ count: count() })
      .from(grantApplications)
      .where(eq(grantApplications.userId, user!.id))

    const total = totalResult.count

    return NextResponse.json(
      successResponse(grants, {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      })
    )
  } catch (error) {
    console.error('Error fetching grants:', error)
    return errorResponse('An unexpected error occurred while fetching grants', 500)
  }
}

// POST /api/grants - Create a new grant application
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

    // Validate request body against schema
    const { createGrantApplicationSchema } = await import('@/lib/validation/zod-schemas')
    const validationResult = createGrantApplicationSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    const validatedData = validationResult.data

    // Create the grant and log activity in a transaction
    const newGrant = await db.transaction(async (tx) => {
      // Create the grant for authenticated user
      const [grant] = await tx
        .insert(grantApplications)
        .values({
          userId: user!.id,
          grantTitle: validatedData.grantTitle.trim(),
          organization: validatedData.organization.trim(),
          funderName: validatedData.funderName.trim(),
          focusArea: validatedData.focusArea?.trim(),
          amount: validatedData.amount?.trim() || null,
          deadline: validatedData.deadline ? new Date(validatedData.deadline) : null,
          status: 'Draft',
          rfpText: validatedData.rfpText || null,
          teachingMaterials: validatedData.teachingMaterials || null,
          projectName: validatedData.projectName?.trim() || null,
          proposalContent: null,
        })
        .returning()

      // Log the activity
      await tx.insert(activityLog).values({
        userId: user!.id,
        action: `Created new grant application: ${validatedData.grantTitle}`,
        entityType: 'grant',
        entityId: grant.id,
        details: `Organization: ${validatedData.organization}`,
      })

      return grant
    })

    return NextResponse.json(successResponse(newGrant), { status: 201 })
  } catch (error) {
    console.error('Error creating grant:', error)
    return errorResponse('An unexpected error occurred while creating the grant', 500)
  }
}
