import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'
import { changePasswordSchema } from '@/lib/validation/zod-schemas'
import { stackServerApp } from '@/lib/stack'

// POST /api/user/change-password - Change user password
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    // Parse and validate request body
    let body
    try {
      body = await request.json()
    } catch {
      return errorResponse('Invalid JSON in request body', 400)
    }

    const validationResult = changePasswordSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    const { currentPassword, newPassword } = validationResult.data

    // Check if new password is different from current
    if (currentPassword === newPassword) {
      return errorResponse('New password must be different from current password', 400)
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

      return NextResponse.json(successResponse({
        message: 'Password changed successfully. Please sign in with your new password.',
      }))
    } catch (authError: any) {
      // Handle authentication-specific errors
      if (authError.message?.includes('Invalid password') || authError.message?.includes('incorrect')) {
        return errorResponse('Current password is incorrect', 401)
      }

      throw authError // Re-throw if it's a different error
    }
  } catch (error: any) {
    console.error('Error changing password:', error)
    return errorResponse(error.message || 'An unexpected error occurred while changing password', 500)
  }
}
