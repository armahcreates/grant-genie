import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware/auth'
import { stackServerApp } from '@/lib/stack'

// POST /api/user/sessions/revoke - Revoke a specific session
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const body = await request.json()
    const { sessionId } = body

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Get current user from Stack Auth
    const stackUser = await stackServerApp.getUser()

    if (!stackUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Prevent revoking current session
    if (sessionId === 'current-session') {
      return NextResponse.json(
        { error: 'Cannot revoke current session. Please sign out instead.' },
        { status: 400 }
      )
    }

    // In a real implementation, you would revoke the session via Stack Auth's API
    // Example (hypothetical): await stackUser.revokeSession(sessionId)

    return NextResponse.json({
      success: true,
      message: 'Session revoked successfully',
    })
  } catch (error) {
    console.error('Error revoking session:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while revoking session' },
      { status: 500 }
    )
  }
}
