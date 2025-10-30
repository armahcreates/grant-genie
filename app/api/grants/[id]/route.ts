import { NextRequest } from 'next/server'
import { db } from '@/db'
import { grantApplications, activityLog } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'

// GET /api/grants/[id] - Get a specific grant application
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const { id } = await params
    const grantId = parseInt(id)

    if (isNaN(grantId)) {
      return errorResponse('Invalid grant ID', 400)
    }

    // Get grant - only if owned by authenticated user
    const [grant] = await db
      .select()
      .from(grantApplications)
      .where(
        and(
          eq(grantApplications.id, grantId),
          eq(grantApplications.userId, user!.id)
        )
      )
      .limit(1)

    if (!grant) {
      return errorResponse('Grant not found or unauthorized', 404)
    }

    return NextResponse.json(successResponse(grant))
  } catch (error) {
    console.error('Error fetching grant:', error)
    return errorResponse('An unexpected error occurred while fetching grant', 500)
  }
}

// PUT /api/grants/[id] - Update a grant application
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const { id } = await params
    const grantId = parseInt(id)

    if (isNaN(grantId)) {
      return errorResponse('Invalid grant ID', 400)
    }

    // Parse and validate request body
    let body
    try {
      body = await request.json()
    } catch {
      return errorResponse('Invalid JSON in request body', 400)
    }

    // Check if grant exists and is owned by user
    const [existingGrant] = await db
      .select()
      .from(grantApplications)
      .where(
        and(
          eq(grantApplications.id, grantId),
          eq(grantApplications.userId, user!.id)
        )
      )
      .limit(1)

    if (!existingGrant) {
      return errorResponse('Grant not found or unauthorized', 404)
    }

    // Update the grant and log activity in a transaction
    const updatedGrant = await db.transaction(async (tx) => {
      // Update the grant
      const [grant] = await tx
        .update(grantApplications)
        .set({
          ...body,
          deadline: body.deadline ? new Date(body.deadline) : undefined,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(grantApplications.id, grantId),
            eq(grantApplications.userId, user!.id)
          )
        )
        .returning()

      // Log the activity
      await tx.insert(activityLog).values({
        userId: user!.id,
        action: `Updated grant application: ${grant.grantTitle}`,
        entityType: 'grant',
        entityId: grantId,
        details: `Status: ${grant.status}`,
      })

      return grant
    })

    return NextResponse.json(successResponse(updatedGrant))
  } catch (error) {
    console.error('Error updating grant:', error)
    return errorResponse('An unexpected error occurred while updating grant', 500)
  }
}

// DELETE /api/grants/[id] - Delete a grant application
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const { id } = await params
    const grantId = parseInt(id)

    if (isNaN(grantId)) {
      return errorResponse('Invalid grant ID', 400)
    }

    // Check if grant exists and is owned by user
    const [existingGrant] = await db
      .select()
      .from(grantApplications)
      .where(
        and(
          eq(grantApplications.id, grantId),
          eq(grantApplications.userId, user!.id)
        )
      )
      .limit(1)

    if (!existingGrant) {
      return errorResponse('Grant not found or unauthorized', 404)
    }

    // Delete the grant and log activity in a transaction
    await db.transaction(async (tx) => {
      // Delete the grant
      await tx.delete(grantApplications).where(
        and(
          eq(grantApplications.id, grantId),
          eq(grantApplications.userId, user!.id)
        )
      )

      // Log the activity
      await tx.insert(activityLog).values({
        userId: user!.id,
        action: `Deleted grant application: ${existingGrant.grantTitle}`,
        entityType: 'grant',
        entityId: grantId,
        details: `Organization: ${existingGrant.organization}`,
      })
    })

    return NextResponse.json(successResponse({ message: 'Grant deleted successfully' }))
  } catch (error) {
    console.error('Error deleting grant:', error)
    return errorResponse('An unexpected error occurred while deleting grant', 500)
  }
}
