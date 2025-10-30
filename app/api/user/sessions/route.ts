import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'
import { getUserSessions, deleteSession } from '@/lib/utils/session-tracking'
import { sessionIdSchema } from '@/lib/validation/zod-schemas'

// GET /api/user/sessions - Get all active sessions for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    if (!user?.id) {
      return errorResponse('User not found', 404)
    }

    // Get sessions from database
    const sessions = await getUserSessions(user.id)

    // Format sessions for API response
    const formattedSessions = sessions.map(session => ({
      id: session.id.toString(),
      device: session.device || 'Unknown Device',
      browser: session.browser || 'Unknown Browser',
      os: session.os || 'Unknown OS',
      location: session.location || 'Unknown Location',
      ipAddress: session.ipAddress || '',
      lastActive: session.lastActive.toISOString(),
      isCurrent: session.isCurrent || false,
      createdAt: session.createdAt.toISOString(),
    }))

    return NextResponse.json(successResponse(formattedSessions))
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return errorResponse('An unexpected error occurred while fetching sessions', 500)
  }
}

// DELETE /api/user/sessions/:id - Delete a specific session
export async function DELETE(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    if (!user?.id) {
      return errorResponse('User not found', 404)
    }

    // Get session ID from URL
    const url = new URL(request.url)
    const sessionId = url.searchParams.get('id')

    if (!sessionId) {
      return errorResponse('Session ID is required', 400)
    }

    const validationResult = sessionIdSchema.safeParse({ id: sessionId })

    if (!validationResult.success) {
      return errorResponse(
        'Invalid session ID',
        400,
        validationResult.error.issues
      )
    }

    // Delete the session
    await deleteSession(validationResult.data.id, user!.id)

    return NextResponse.json(successResponse({ message: 'Session deleted successfully' }))
  } catch (error) {
    console.error('Error deleting session:', error)
    return errorResponse('An unexpected error occurred while deleting session', 500)
  }
}
