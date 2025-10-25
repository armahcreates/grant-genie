import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { grantBookmarks, grantOpportunities } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

// GET /api/bookmarks - Get user's bookmarked grants
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

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
      .where(eq(grantBookmarks.userId, userId))

    return NextResponse.json({ bookmarks })
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 })
  }
}

// POST /api/bookmarks - Bookmark a grant
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, grantOpportunityId, notes } = body

    if (!userId || !grantOpportunityId) {
      return NextResponse.json(
        { error: 'userId and grantOpportunityId are required' },
        { status: 400 }
      )
    }

    // Check if already bookmarked
    const existing = await db
      .select()
      .from(grantBookmarks)
      .where(
        and(
          eq(grantBookmarks.userId, userId),
          eq(grantBookmarks.grantOpportunityId, grantOpportunityId)
        )
      )
      .limit(1)

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Grant already bookmarked' },
        { status: 409 }
      )
    }

    const [bookmark] = await db
      .insert(grantBookmarks)
      .values({ userId, grantOpportunityId, notes })
      .returning()

    return NextResponse.json({ bookmark }, { status: 201 })
  } catch (error) {
    console.error('Error creating bookmark:', error)
    return NextResponse.json({ error: 'Failed to create bookmark' }, { status: 500 })
  }
}

// DELETE /api/bookmarks - Remove a bookmark
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const grantOpportunityId = searchParams.get('grantOpportunityId')

    if (!userId || !grantOpportunityId) {
      return NextResponse.json(
        { error: 'userId and grantOpportunityId are required' },
        { status: 400 }
      )
    }

    await db
      .delete(grantBookmarks)
      .where(
        and(
          eq(grantBookmarks.userId, userId),
          eq(grantBookmarks.grantOpportunityId, parseInt(grantOpportunityId))
        )
      )

    return NextResponse.json({ message: 'Bookmark removed successfully' })
  } catch (error) {
    console.error('Error deleting bookmark:', error)
    return NextResponse.json({ error: 'Failed to delete bookmark' }, { status: 500 })
  }
}
