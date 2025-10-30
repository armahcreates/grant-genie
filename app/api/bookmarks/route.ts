import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { grantBookmarks, grantOpportunities } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'
import { createBookmarkSchema, sessionIdSchema } from '@/lib/validation/zod-schemas'
import { activityLog } from '@/db/schema'

// GET /api/bookmarks - Get user's bookmarked grants
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const bookmarks = await db
      .select({
        bookmarkId: grantBookmarks.id,
        notes: grantBookmarks.notes,
        createdAt: grantBookmarks.createdAt,
        opportunity: grantOpportunities,
      })
      .from(grantBookmarks)
      .leftJoin(
        grantOpportunities,
        eq(grantBookmarks.grantOpportunityId, grantOpportunities.id)
      )
      .where(eq(grantBookmarks.userId, user!.id))

    return NextResponse.json(successResponse(bookmarks))
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    return errorResponse('An unexpected error occurred while fetching bookmarks', 500)
  }
}

// POST /api/bookmarks - Bookmark a grant
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

    const validationResult = createBookmarkSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    const { grantOpportunityId, notes } = validationResult.data

    // Check if already bookmarked
    const existing = await db
      .select()
      .from(grantBookmarks)
      .where(
        and(
          eq(grantBookmarks.userId, user!.id),
          eq(grantBookmarks.grantOpportunityId, grantOpportunityId)
        )
      )
      .limit(1)

    if (existing.length > 0) {
      return errorResponse('Grant already bookmarked', 409)
    }

    // Create bookmark and log activity in a transaction
    const newBookmark = await db.transaction(async (tx) => {
      const [bookmark] = await tx
        .insert(grantBookmarks)
        .values({
          userId: user!.id,
          grantOpportunityId,
          notes: notes?.trim() || null,
        })
        .returning()

      // Log the activity
      await tx.insert(activityLog).values({
        userId: user!.id,
        action: `Bookmarked grant opportunity`,
        entityType: 'bookmark',
        entityId: bookmark.id,
        details: `Grant ID: ${grantOpportunityId}`,
      })

      return bookmark
    })

    return NextResponse.json(successResponse(newBookmark), { status: 201 })
  } catch (error) {
    console.error('Error creating bookmark:', error)
    return errorResponse('An unexpected error occurred while creating bookmark', 500)
  }
}

// DELETE /api/bookmarks - Remove a bookmark
export async function DELETE(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const searchParams = request.nextUrl.searchParams
    const grantOpportunityId = searchParams.get('grantOpportunityId')

    if (!grantOpportunityId) {
      return errorResponse('grantOpportunityId is required', 400)
    }

    const id = parseInt(grantOpportunityId)
    if (isNaN(id)) {
      return errorResponse('Invalid grantOpportunityId', 400)
    }

    // Delete bookmark and log activity in a transaction
    await db.transaction(async (tx) => {
      await tx
        .delete(grantBookmarks)
        .where(
          and(
            eq(grantBookmarks.userId, user!.id),
            eq(grantBookmarks.grantOpportunityId, id)
          )
        )

      // Log the activity
      await tx.insert(activityLog).values({
        userId: user!.id,
        action: `Removed bookmark`,
        entityType: 'bookmark',
        entityId: null,
        details: `Grant ID: ${id}`,
      })
    })

    return NextResponse.json(successResponse({ message: 'Bookmark removed successfully' }))
  } catch (error) {
    console.error('Error deleting bookmark:', error)
    return errorResponse('An unexpected error occurred while deleting bookmark', 500)
  }
}
