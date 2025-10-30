import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { userPreferences } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'

// GET /api/user/preferences - Get user preferences for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const [preferences] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, user!.id))
      .limit(1)

    if (!preferences) {
      // Create default preferences if none exist
      const [newPreferences] = await db
        .insert(userPreferences)
        .values({
          userId: user!.id,
          emailNotifications: true,
          inAppNotifications: true,
          notificationDigest: 'daily',
          theme: 'light',
          timezone: 'America/New_York',
          language: 'en',
        })
        .returning()

      // Transform to match NotificationPreferences interface
      const notificationPrefs = {
        emailNotifications: newPreferences.emailNotifications || false,
        pushNotifications: newPreferences.inAppNotifications || false,
        smsNotifications: false,
        deadlineReminders: true,
        complianceAlerts: true,
        grantMatches: true,
        weeklyDigest: newPreferences.notificationDigest === 'weekly',
      }

      return NextResponse.json(successResponse(notificationPrefs))
    }

    // Transform to match NotificationPreferences interface
    const notificationPrefs = {
      emailNotifications: preferences.emailNotifications || false,
      pushNotifications: preferences.inAppNotifications || false,
      smsNotifications: false,
      deadlineReminders: true,
      complianceAlerts: true,
      grantMatches: true,
      weeklyDigest: preferences.notificationDigest === 'weekly',
    }

    return NextResponse.json(successResponse(notificationPrefs))
  } catch (error) {
    console.error('Error fetching user preferences:', error)
    return errorResponse('An unexpected error occurred while fetching preferences', 500)
  }
}

// PATCH /api/user/preferences - Update user preferences for authenticated user
export async function PATCH(request: NextRequest) {
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

    const {
      emailNotifications,
      pushNotifications,
      smsNotifications,
      deadlineReminders,
      complianceAlerts,
      grantMatches,
      weeklyDigest,
    } = body

    // Build update object
    const updateData: any = {
      updatedAt: new Date(),
    }

    if (emailNotifications !== undefined) updateData.emailNotifications = emailNotifications
    if (pushNotifications !== undefined) updateData.inAppNotifications = pushNotifications
    if (weeklyDigest !== undefined) {
      updateData.notificationDigest = weeklyDigest ? 'weekly' : 'daily'
    }

    // Check if preferences exist
    const [existing] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, user!.id))
      .limit(1)

    let updatedPreferences

    if (existing) {
      // Update existing preferences
      const [updated] = await db
        .update(userPreferences)
        .set(updateData)
        .where(eq(userPreferences.userId, user!.id))
        .returning()

      updatedPreferences = updated
    } else {
      // Create new preferences if they don't exist
      const [created] = await db
        .insert(userPreferences)
        .values({
          userId: user!.id,
          emailNotifications: emailNotifications ?? true,
          inAppNotifications: pushNotifications ?? true,
          notificationDigest: weeklyDigest ? 'weekly' : 'daily',
          theme: 'light',
          timezone: 'America/New_York',
          language: 'en',
          ...updateData,
        })
        .returning()

      updatedPreferences = created
    }

    if (!updatedPreferences) {
      return errorResponse('Failed to update preferences', 500)
    }

    // Transform to match NotificationPreferences interface
    const notificationPrefs = {
      emailNotifications: updatedPreferences.emailNotifications || false,
      pushNotifications: updatedPreferences.inAppNotifications || false,
      smsNotifications: false,
      deadlineReminders: true,
      complianceAlerts: true,
      grantMatches: true,
      weeklyDigest: updatedPreferences.notificationDigest === 'weekly',
    }

    return NextResponse.json(successResponse(notificationPrefs))
  } catch (error) {
    console.error('Error updating user preferences:', error)
    return errorResponse('An unexpected error occurred while updating preferences', 500)
  }
}
