import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { activityLog } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'

// GET /api/activity - Get recent activity for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const searchParams = request.nextUrl.searchParams
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '10'))

    const activities = await db
      .select()
      .from(activityLog)
      .where(eq(activityLog.userId, user!.id))
      .orderBy(desc(activityLog.createdAt))
      .limit(limit)

    return NextResponse.json({ activities })
  } catch (error) {
    console.error('Error fetching activity:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching activity' },
      { status: 500 }
    )
  }
}

// POST /api/activity - Log a new activity for authenticated user
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const body = await request.json()
    const { action, entityType, entityId, details } = body

    if (!action) {
      return NextResponse.json(
        { error: 'action is required' },
        { status: 400 }
      )
    }

    const [newActivity] = await db
      .insert(activityLog)
      .values({
        userId: user!.id,
        action: action.trim(),
        entityType: entityType?.trim(),
        entityId,
        details: details?.trim(),
      })
      .returning()

    return NextResponse.json({ activity: newActivity }, { status: 201 })
  } catch (error) {
    console.error('Error logging activity:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while logging activity' },
      { status: 500 }
    )
  }
}
