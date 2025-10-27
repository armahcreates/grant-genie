import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'

// GET /api/user/profile - Get user profile
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    // Fetch user profile from database
    const [userProfile] = await db
      .select()
      .from(users)
      .where(eq(users.id, user!.id))
      .limit(1)

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ profile: userProfile })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching profile' },
      { status: 500 }
    )
  }
}

// PATCH /api/user/profile - Update user profile
export async function PATCH(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const body = await request.json()
    const { name, organizationName, role } = body

    // Validate input
    if (name && name.length > 255) {
      return NextResponse.json(
        { error: 'Name must be 255 characters or less' },
        { status: 400 }
      )
    }

    if (organizationName && organizationName.length > 255) {
      return NextResponse.json(
        { error: 'Organization name must be 255 characters or less' },
        { status: 400 }
      )
    }

    // Build update object with only provided fields
    const updateData: any = {
      updatedAt: new Date(),
    }

    if (name !== undefined) updateData.name = name.trim()
    if (organizationName !== undefined) updateData.organizationName = organizationName.trim()
    if (role !== undefined) updateData.role = role.trim()

    // Update user profile
    const [updatedProfile] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, user!.id))
      .returning()

    if (!updatedProfile) {
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      )
    }

    return NextResponse.json({ profile: updatedProfile })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while updating profile' },
      { status: 500 }
    )
  }
}
