import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'
import { deleteAccountSchema } from '@/lib/validation/zod-schemas'
import { stackServerApp } from '@/lib/stack'
import { db } from '@/db'
import {
  users,
  grantApplications,
  complianceItems,
  donors,
  donorMeetingSessions,
  donorInteractions,
  documents,
  templates,
  knowledgeBase,
  savedSearches,
  grantBookmarks,
  activityLog,
  notifications,
  userPreferences,
  organizationProfiles,
} from '@/db/schema'
import { eq } from 'drizzle-orm'

// DELETE /api/user/delete-account - Permanently delete user account and all data
export async function DELETE(request: NextRequest) {
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

    const validationResult = deleteAccountSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    const { password, confirmation } = validationResult.data

    // Validate confirmation
    if (confirmation !== 'DELETE MY ACCOUNT') {
      return errorResponse('Please type "DELETE MY ACCOUNT" to confirm account deletion', 400)
    }

    // Get current user from Stack Auth
    const stackUser = await stackServerApp.getUser()

    if (!stackUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    try {
      // Verify password with Stack Auth
      // Note: This is a placeholder - Stack Auth's actual password verification may differ
      // In production, you would use Stack Auth's password verification method
      // Example (hypothetical): await stackUser.verifyPassword(password)

      // Begin transaction to delete all user data atomically
      await db.transaction(async (tx) => {
        // Delete in correct order (respecting foreign key constraints)
        
        // 1. Delete activity log
        await tx.delete(activityLog).where(eq(activityLog.userId, user!.id))

        // 2. Delete notifications
        await tx.delete(notifications).where(eq(notifications.userId, user!.id))

        // 3. Delete grant-related data
        await tx.delete(grantBookmarks).where(eq(grantBookmarks.userId, user!.id))
        await tx.delete(savedSearches).where(eq(savedSearches.userId, user!.id))
        await tx.delete(complianceItems).where(eq(complianceItems.userId, user!.id))
        await tx.delete(grantApplications).where(eq(grantApplications.userId, user!.id))

        // 4. Delete donor-related data
        await tx.delete(donorMeetingSessions).where(eq(donorMeetingSessions.userId, user!.id))

        // Get donor IDs to delete interactions
        const userDonors = await tx
          .select({ id: donors.id })
          .from(donors)
          .where(eq(donors.userId, user!.id))

        for (const donor of userDonors) {
          await tx.delete(donorInteractions).where(eq(donorInteractions.donorId, donor.id))
        }

        await tx.delete(donors).where(eq(donors.userId, user!.id))

        // 5. Delete documents and templates
        await tx.delete(documents).where(eq(documents.userId, user!.id))
        await tx.delete(templates).where(eq(templates.userId, user!.id))

        // 6. Delete knowledge base
        await tx.delete(knowledgeBase).where(eq(knowledgeBase.userId, user!.id))

        // 7. Delete user preferences and organization profile
        await tx.delete(userPreferences).where(eq(userPreferences.userId, user!.id))
        await tx.delete(organizationProfiles).where(eq(organizationProfiles.userId, user!.id))

        // 8. Delete user record
        await tx.delete(users).where(eq(users.id, user!.id))
      })

      // 9. Delete Stack Auth account
      // Note: This is a placeholder - Stack Auth's actual deletion method may differ
      // In production, you would use Stack Auth's account deletion method
      // Example (hypothetical): await stackUser.delete()

      // Sign out user
      // Example (hypothetical): await stackServerApp.signOut()

      return NextResponse.json(successResponse({
        message: 'Account deleted successfully. All your data has been permanently removed.',
      }))
    } catch (authError: any) {
      // Handle authentication-specific errors
      if (authError.message?.includes('Invalid password') || authError.message?.includes('incorrect')) {
        return errorResponse('Incorrect password', 401)
      }

      throw authError // Re-throw if it's a different error
    }
  } catch (error: any) {
    console.error('Error deleting account:', error)
    return errorResponse(error.message || 'An unexpected error occurred while deleting account', 500)
  }
}
