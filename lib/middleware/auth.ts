/**
 * Authentication Middleware
 * Validates user authentication for API routes
 */

import { NextRequest, NextResponse } from 'next/server'
import { stackServerApp } from '@/lib/stack'

export interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string
    email: string
  }
}

/**
 * Middleware to verify user authentication
 * Returns the authenticated user or an error response
 */
export async function requireAuth(request: NextRequest) {
  try {
    // Get user from Stack Auth - it uses nextjs-cookie tokenStore by default
    const user = await stackServerApp.getUser()

    if (!user) {
      return {
        error: NextResponse.json(
          { error: 'Unauthorized - Please sign in to access this resource' },
          { status: 401 }
        ),
        user: null,
      }
    }

    return {
      error: null,
      user: {
        id: user.id,
        email: user.primaryEmail || '',
      },
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return {
      error: NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      ),
      user: null,
    }
  }
}

/**
 * Optional auth - returns user if authenticated, null otherwise
 * Does not block the request
 */
export async function optionalAuth(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser()

    if (!user) {
      return { user: null }
    }

    return {
      user: {
        id: user.id,
        email: user.primaryEmail || '',
      },
    }
  } catch (error) {
    return { user: null }
  }
}
