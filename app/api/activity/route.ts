import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { activityLog } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'

// GET /api/activity - Get recent activity for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

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

    return NextResponse.json(successResponse(activities))
  } catch (error) {
    console.error('Error fetching activity:', error)
    return errorResponse('An unexpected error occurred while fetching activity', 500)
  }
}

// POST /api/activity - Log a new activity for authenticated user
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

    const { action, entityType, entityId, details } = body

    if (!action) {
      return errorResponse('action is required', 400)
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

    return NextResponse.json(successResponse(newActivity), { status: 201 })
  } catch (error) {
    console.error('Error logging activity:', error)
    return errorResponse('An unexpected error occurred while logging activity', 500)
  }
}
