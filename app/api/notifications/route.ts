import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { notifications } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'

// GET /api/notifications - Get notifications for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'
    const limit = parseInt(searchParams.get('limit') || '50')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    let query = db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .$dynamic()

    if (unreadOnly) {
      query = query.where(eq(notifications.read, false))
    }

    const notificationsList = await query
      .orderBy(desc(notifications.createdAt))
      .limit(limit)

    return NextResponse.json({ notifications: notificationsList })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 })
  }
}

// POST /api/notifications - Create a notification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, type, category, title, message, entityType, entityId, actionUrl } = body

    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const [newNotification] = await db
      .insert(notifications)
      .values({
        userId,
        type,
        category,
        title,
        message,
        entityType,
        entityId,
        actionUrl,
      })
      .returning()

    return NextResponse.json({ notification: newNotification }, { status: 201 })
  } catch (error) {
    console.error('Error creating notification:', error)
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 })
  }
}

// PATCH /api/notifications - Mark notifications as read
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { notificationIds, userId, markAllAsRead } = body

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    if (markAllAsRead) {
      // Mark all user's notifications as read
      await db
        .update(notifications)
        .set({ read: true, readAt: new Date() })
        .where(eq(notifications.userId, userId))
    } else if (notificationIds && Array.isArray(notificationIds)) {
      // Mark specific notifications as read
      for (const id of notificationIds) {
        await db
          .update(notifications)
          .set({ read: true, readAt: new Date() })
          .where(eq(notifications.id, id))
      }
    } else {
      return NextResponse.json(
        { error: 'Either notificationIds or markAllAsRead is required' },
        { status: 400 }
      )
    }

    return NextResponse.json({ message: 'Notifications marked as read' })
  } catch (error) {
    console.error('Error updating notifications:', error)
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 })
  }
}
