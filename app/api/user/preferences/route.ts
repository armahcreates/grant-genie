import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { userPreferences } from '@/db/schema'
import { eq } from 'drizzle-orm'

// GET /api/user/preferences - Get user preferences
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const [preferences] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId))
      .limit(1)

    if (!preferences) {
      // Return default preferences if none exist
      return NextResponse.json({
        preferences: {
          emailNotifications: true,
          inAppNotifications: true,
          notificationDigest: 'daily',
          theme: 'light',
          timezone: 'America/New_York',
          language: 'en',
        },
      })
    }

    return NextResponse.json({ preferences })
  } catch (error) {
    console.error('Error fetching user preferences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user preferences' },
      { status: 500 }
    )
  }
}

// PUT /api/user/preferences - Update user preferences
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      emailNotifications,
      inAppNotifications,
      notificationDigest,
      theme,
      timezone,
      language,
      dashboardLayout,
    } = body

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Check if preferences exist
    const [existing] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId))
      .limit(1)

    if (existing) {
      // Update existing preferences
      const [updated] = await db
        .update(userPreferences)
        .set({
          emailNotifications,
          inAppNotifications,
          notificationDigest,
          theme,
          timezone,
          language,
          dashboardLayout,
          updatedAt: new Date(),
        })
        .where(eq(userPreferences.userId, userId))
        .returning()

      return NextResponse.json({ preferences: updated })
    } else {
      // Create new preferences
      const [created] = await db
        .insert(userPreferences)
        .values({
          userId,
          emailNotifications,
          inAppNotifications,
          notificationDigest,
          theme,
          timezone,
          language,
          dashboardLayout,
        })
        .returning()

      return NextResponse.json({ preferences: created }, { status: 201 })
    }
  } catch (error) {
    console.error('Error updating user preferences:', error)
    return NextResponse.json(
      { error: 'Failed to update user preferences' },
      { status: 500 }
    )
  }
}
