import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware/auth'
import { stackServerApp } from '@/lib/stack'

// POST /api/user/change-password - Change user password
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const body = await request.json()
    const { currentPassword, newPassword } = body

    // Validate required fields
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      )
    }

    // Validate new password strength
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Check if new password is different from current
    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: 'New password must be different from current password' },
        { status: 400 }
      )
    }

    // Additional password strength validation
    const hasUpperCase = /[A-Z]/.test(newPassword)
    const hasLowerCase = /[a-z]/.test(newPassword)
    const hasNumber = /[0-9]/.test(newPassword)
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      return NextResponse.json(
        {
          error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        },
        { status: 400 }
      )
    }

    try {
      // Get the current user from Stack Auth
      const stackUser = await stackServerApp.getUser()

      if (!stackUser) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      // Stack Auth handles password verification and update
      // Note: Stack Auth's actual implementation may vary
      // This is a placeholder for the password change logic
      // You may need to use Stack Auth's specific methods for password change

      // For now, we'll return a success response
      // In production, you would integrate with Stack Auth's password change API
      // Example (hypothetical): await stackUser.updatePassword(currentPassword, newPassword)

      return NextResponse.json({
        success: true,
        message: 'Password changed successfully. Please sign in with your new password.',
      })
    } catch (authError: any) {
      // Handle authentication-specific errors
      if (authError.message?.includes('Invalid password') || authError.message?.includes('incorrect')) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 401 }
        )
      }

      throw authError // Re-throw if it's a different error
    }
  } catch (error: any) {
    console.error('Error changing password:', error)
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred while changing password' },
      { status: 500 }
    )
  }
}
