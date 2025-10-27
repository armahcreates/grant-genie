import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware/auth'
import { stackServerApp } from '@/lib/stack'

// GET /api/user/sessions - Get all active sessions for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    // Get current user from Stack Auth
    const stackUser = await stackServerApp.getUser()

    if (!stackUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Mock sessions data (Stack Auth handles sessions internally)
    // In a real implementation, you would fetch sessions from Stack Auth's API
    const sessions = [
      {
        id: 'current-session',
        device: 'Current Device',
        browser: 'Chrome',
        location: 'San Francisco, CA',
        ipAddress: '192.168.1.1',
        lastActive: new Date().toISOString(),
        isCurrent: true,
      },
    ]

    return NextResponse.json({ sessions })
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching sessions' },
      { status: 500 }
    )
  }
}
