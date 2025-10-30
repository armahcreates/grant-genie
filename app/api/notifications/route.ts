import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { notifications } from '@/db/schema'
import { desc, eq, and } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'

// GET /api/notifications - Get notifications for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const searchParams = request.nextUrl.searchParams
    const unreadOnly = searchParams.get('unreadOnly') === 'true'
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '50'))

    // Build where conditions
    const conditions = [eq(notifications.userId, user!.id)]
    if (unreadOnly) {
      conditions.push(eq(notifications.read, false))
    }

    const notificationsList = await db
      .select()
      .from(notifications)
      .where(and(...conditions))
      .orderBy(desc(notifications.createdAt))
      .limit(limit)

    return NextResponse.json(successResponse(notificationsList))
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return errorResponse('An unexpected error occurred while fetching notifications', 500)
  }
}

// POST /api/notifications - Create a notification for authenticated user
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    let body
    try {
      body = await request.json()
    } catch {
      return errorResponse('Invalid JSON in request body', 400)
    }

    const { type, category, title, message, entityType, entityId, actionUrl } = body

    if (!type || !title || !message) {
      return errorResponse('Missing required fields: type, title, message', 400)
    }

    const [newNotification] = await db
      .insert(notifications)
      .values({
        userId: user!.id, // Use authenticated user's ID
        type,
        category,
        title: title.trim(),
        message: message.trim(),
        entityType,
        entityId,
        actionUrl,
      })
      .returning()

    return NextResponse.json(successResponse(newNotification), { status: 201 })
  } catch (error) {
    console.error('Error creating notification:', error)
    return errorResponse('An unexpected error occurred while creating notification', 500)
  }
}

// PATCH /api/notifications - Mark notifications as read for authenticated user
export async function PATCH(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    let body
    try {
      body = await request.json()
    } catch {
      return errorResponse('Invalid JSON in request body', 400)
    }

    const { notificationIds, markAllAsRead } = body

    if (markAllAsRead) {
      // Mark all user's notifications as read
      await db
        .update(notifications)
        .set({ read: true, readAt: new Date() })
        .where(eq(notifications.userId, user!.id))
    } else if (notificationIds && Array.isArray(notificationIds)) {
      // Mark specific notifications as read (only if owned by user)
      for (const id of notificationIds) {
        await db
          .update(notifications)
          .set({ read: true, readAt: new Date() })
          .where(
            and(
              eq(notifications.id, id),
              eq(notifications.userId, user!.id)
            )
          )
      }
    } else {
      return errorResponse('Either notificationIds or markAllAsRead is required', 400)
    }

    return NextResponse.json(successResponse({ message: 'Notifications marked as read' }))
  } catch (error) {
    console.error('Error updating notifications:', error)
    return errorResponse('An unexpected error occurred while updating notifications', 500)
  }
}
