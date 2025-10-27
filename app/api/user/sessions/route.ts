import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware/auth'
import { getUserSessions, deleteSession } from '@/lib/utils/session-tracking'

// GET /api/user/sessions - Get all active sessions for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    if (!user?.id) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
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

    return NextResponse.json({ sessions: formattedSessions })
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching sessions' },
      { status: 500 }
    )
  }
}

// DELETE /api/user/sessions/:id - Delete a specific session
export async function DELETE(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    if (!user?.id) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get session ID from URL
    const url = new URL(request.url)
    const sessionId = url.searchParams.get('id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Delete the session
    await deleteSession(parseInt(sessionId), user.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting session:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while deleting session' },
      { status: 500 }
    )
  }
}
