import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { complianceItems, activityLog } from '@/db/schema'
import { desc, eq, and, count } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'
import { paginationSchema, createComplianceItemSchema, complianceItemSchema } from '@/lib/validation/zod-schemas'

// GET /api/compliance - List all compliance items for authenticated user
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
    const status = searchParams.get('status')

    // Build where conditions for authenticated user
    const conditions = [eq(complianceItems.userId, user!.id)]
    if (status && ['Completed', 'Upcoming', 'Overdue'].includes(status)) {
      conditions.push(eq(complianceItems.status, status))
    }

    const items = await db
      .select()
      .from(complianceItems)
      .where(and(...conditions))
      .orderBy(desc(complianceItems.dueDate))
      .limit(limit)
      .offset(offset)

    // Get total count
    const [totalResult] = await db
      .select({ count: count() })
      .from(complianceItems)
      .where(and(...conditions))

    const total = totalResult.count

    return NextResponse.json(
      successResponse(items, {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      })
    )
  } catch (error) {
    console.error('Error fetching compliance items:', error)
    return errorResponse('An unexpected error occurred while fetching compliance items', 500)
  }
}

// POST /api/compliance - Create a new compliance item for authenticated user
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

    const validationResult = createComplianceItemSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    const validatedData = validationResult.data

    // Create the compliance item and log activity in a transaction
    const newItem = await db.transaction(async (tx) => {
      // Create the compliance item for authenticated user
      const [item] = await tx
        .insert(complianceItems)
        .values({
          userId: user!.id,
          grantId: validatedData.grantId || null,
          grantName: validatedData.grantName.trim(),
          requirement: validatedData.requirement.trim(),
          description: validatedData.description?.trim() || null,
          dueDate: new Date(validatedData.dueDate),
          priority: validatedData.priority || 'Medium',
          status: 'Upcoming',
          notes: null,
        })
        .returning()

      // Log the activity
      await tx.insert(activityLog).values({
        userId: user!.id,
        action: `Created compliance task: ${validatedData.requirement}`,
        entityType: 'compliance',
        entityId: item.id,
        details: `Grant: ${validatedData.grantName}, Due: ${new Date(validatedData.dueDate).toLocaleDateString()}`,
      })

      return item
    })

    return NextResponse.json(successResponse(newItem), { status: 201 })
  } catch (error) {
    console.error('Error creating compliance item:', error)
    return errorResponse('An unexpected error occurred while creating compliance item', 500)
  }
}

// PATCH /api/compliance - Update compliance item for authenticated user
export async function PATCH(request: NextRequest) {
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

    const { id, ...updateData } = body

    if (!id || typeof id !== 'number') {
      return errorResponse('id (number) is required', 400)
    }

    // Validate update data
    const updateSchema = complianceItemSchema.partial()
    const validationResult = updateSchema.safeParse(updateData)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid update data',
        400,
        validationResult.error.issues
      )
    }

        const validatedUpdate = validationResult.data

        // Build update object
        const updateValues: any = {
          updatedAt: new Date(),
        }

        if (validatedUpdate.status === 'Completed') {
          updateValues.status = 'Completed'
          updateValues.completedAt = new Date()
        } else if (validatedUpdate.status) {
          updateValues.status = validatedUpdate.status
        }

        if (validatedUpdate.requirement) updateValues.requirement = validatedUpdate.requirement.trim()
        if (validatedUpdate.description !== undefined) updateValues.description = validatedUpdate.description?.trim() || null
        if (validatedUpdate.dueDate) updateValues.dueDate = new Date(validatedUpdate.dueDate)
        if (validatedUpdate.priority) updateValues.priority = validatedUpdate.priority
        if (validatedUpdate.notes !== undefined) updateValues.notes = validatedUpdate.notes?.trim() || null

        // Update the item and log activity in a transaction
        const updatedItem = await db.transaction(async (tx) => {
          // Update the item (only if owned by user)
          const [item] = await tx
            .update(complianceItems)
            .set(updateValues)
            .where(
              and(
                eq(complianceItems.id, id),
                eq(complianceItems.userId, user!.id)
              )
            )
            .returning()

          if (!item) {
            throw new Error('Compliance item not found or unauthorized')
          }

          // Log the activity
          await tx.insert(activityLog).values({
            userId: user!.id,
            action: `Updated compliance task: ${item.requirement}`,
            entityType: 'compliance',
            entityId: id,
            details: `Status: ${item.status}`,
          })

          return item
        })

        return NextResponse.json(successResponse(updatedItem))
  } catch (error) {
    console.error('Error updating compliance item:', error)
    return errorResponse('An unexpected error occurred while updating compliance item', 500)
  }
}
