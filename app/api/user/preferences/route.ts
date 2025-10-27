import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { userPreferences } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'

// GET /api/user/preferences - Get user preferences for authenticated user
export async function GET(request: NextRequest) {
  try {
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

      return NextResponse.json({ preferences: newPreferences })
    }

    return NextResponse.json({ preferences })
  } catch (error) {
    console.error('Error fetching user preferences:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching preferences' },
      { status: 500 }
    )
  }
}

// PATCH /api/user/preferences - Update user preferences for authenticated user
export async function PATCH(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const body = await request.json()
    const {
      emailNotifications,
      inAppNotifications,
      notificationDigest,
      theme,
      timezone,
      language,
      dashboardLayout,
    } = body

    // Validate notification digest if provided
    if (notificationDigest && !['realtime', 'daily', 'weekly'].includes(notificationDigest)) {
      return NextResponse.json(
        { error: 'Invalid notification digest. Must be one of: realtime, daily, weekly' },
        { status: 400 }
      )
    }

    // Validate theme if provided
    if (theme && !['light', 'dark', 'auto'].includes(theme)) {
      return NextResponse.json(
        { error: 'Invalid theme. Must be one of: light, dark, auto' },
        { status: 400 }
      )
    }

    // Build update object with only provided fields
    const updateData: any = {
      updatedAt: new Date(),
    }

    if (emailNotifications !== undefined) updateData.emailNotifications = emailNotifications
    if (inAppNotifications !== undefined) updateData.inAppNotifications = inAppNotifications
    if (notificationDigest !== undefined) updateData.notificationDigest = notificationDigest
    if (theme !== undefined) updateData.theme = theme
    if (timezone !== undefined) updateData.timezone = timezone
    if (language !== undefined) updateData.language = language
    if (dashboardLayout !== undefined) updateData.dashboardLayout = dashboardLayout

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
          ...updateData,
        })
        .returning()

      updatedPreferences = created
    }

    if (!updatedPreferences) {
      return NextResponse.json(
        { error: 'Failed to update preferences' },
        { status: 500 }
      )
    }

    return NextResponse.json({ preferences: updatedPreferences })
  } catch (error) {
    console.error('Error updating user preferences:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while updating preferences' },
      { status: 500 }
    )
  }
}
