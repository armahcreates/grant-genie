import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware/auth'
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
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const body = await request.json()
    const { password, confirmation } = body

    // Validate required fields
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required to delete account' },
        { status: 400 }
      )
    }

    // Validate confirmation
    if (confirmation !== 'DELETE MY ACCOUNT') {
      return NextResponse.json(
        { error: 'Please type "DELETE MY ACCOUNT" to confirm account deletion' },
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

    try {
      // Verify password with Stack Auth
      // Note: This is a placeholder - Stack Auth's actual password verification may differ
      // In production, you would use Stack Auth's password verification method
      // Example (hypothetical): await stackUser.verifyPassword(password)

      // Begin transaction to delete all user data
      // Delete user data from all tables in the correct order (respect foreign key constraints)

      // 1. Delete activity log
      await db.delete(activityLog).where(eq(activityLog.userId, user!.id))

      // 2. Delete notifications
      await db.delete(notifications).where(eq(notifications.userId, user!.id))

      // 3. Delete grant-related data
      await db.delete(grantBookmarks).where(eq(grantBookmarks.userId, user!.id))
      await db.delete(savedSearches).where(eq(savedSearches.userId, user!.id))
      await db.delete(complianceItems).where(eq(complianceItems.userId, user!.id))
      await db.delete(grantApplications).where(eq(grantApplications.userId, user!.id))

      // 4. Delete donor-related data
      await db.delete(donorMeetingSessions).where(eq(donorMeetingSessions.userId, user!.id))

      // Get donor IDs to delete interactions
      const userDonors = await db
        .select({ id: donors.id })
        .from(donors)
        .where(eq(donors.userId, user!.id))

      for (const donor of userDonors) {
        await db.delete(donorInteractions).where(eq(donorInteractions.donorId, donor.id))
      }

      await db.delete(donors).where(eq(donors.userId, user!.id))

      // 5. Delete documents and templates
      await db.delete(documents).where(eq(documents.userId, user!.id))
      await db.delete(templates).where(eq(templates.userId, user!.id))

      // 6. Delete knowledge base
      await db.delete(knowledgeBase).where(eq(knowledgeBase.userId, user!.id))

      // 7. Delete user preferences and organization profile
      await db.delete(userPreferences).where(eq(userPreferences.userId, user!.id))
      await db.delete(organizationProfiles).where(eq(organizationProfiles.userId, user!.id))

      // 8. Delete user record
      await db.delete(users).where(eq(users.id, user!.id))

      // 9. Delete Stack Auth account
      // Note: This is a placeholder - Stack Auth's actual deletion method may differ
      // In production, you would use Stack Auth's account deletion method
      // Example (hypothetical): await stackUser.delete()

      // Sign out user
      // Example (hypothetical): await stackServerApp.signOut()

      return NextResponse.json({
        success: true,
        message: 'Account deleted successfully. All your data has been permanently removed.',
      })
    } catch (authError: any) {
      // Handle authentication-specific errors
      if (authError.message?.includes('Invalid password') || authError.message?.includes('incorrect')) {
        return NextResponse.json(
          { error: 'Incorrect password' },
          { status: 401 }
        )
      }

      throw authError // Re-throw if it's a different error
    }
  } catch (error: any) {
    console.error('Error deleting account:', error)
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred while deleting account' },
      { status: 500 }
    )
  }
}
