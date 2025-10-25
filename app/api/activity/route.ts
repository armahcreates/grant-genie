import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { activityLog } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'

// GET /api/activity - Get recent activity for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const activities = await db
      .select()
      .from(activityLog)
      .where(eq(activityLog.userId, userId))
      .orderBy(desc(activityLog.createdAt))
      .limit(limit)

    return NextResponse.json({ activities })
  } catch (error) {
    console.error('Error fetching activity:', error)
    return NextResponse.json({ error: 'Failed to fetch activity' }, { status: 500 })
  }
}

// POST /api/activity - Log a new activity
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, action, entityType, entityId, details } = body

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'userId and action are required' },
        { status: 400 }
      )
    }

    const [newActivity] = await db
      .insert(activityLog)
      .values({
        userId,
        action,
        entityType,
        entityId,
        details,
      })
      .returning()

    return NextResponse.json({ activity: newActivity }, { status: 201 })
  } catch (error) {
    console.error('Error logging activity:', error)
    return NextResponse.json({ error: 'Failed to log activity' }, { status: 500 })
  }
}
