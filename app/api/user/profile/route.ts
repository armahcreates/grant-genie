import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'

// GET /api/user/profile - Get user profile
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

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
      return errorResponse('User profile not found', 404)
    }

    // Transform to match PersonalInfo interface expected by frontend
    const personalInfo = {
      firstName: userProfile.name?.split(' ')[0] || '',
      lastName: userProfile.name?.split(' ').slice(1).join(' ') || '',
      email: userProfile.email || '',
      phone: '', // Not stored in users table
      jobTitle: userProfile.role || '',
      bio: '', // Not stored in users table
      streetAddress: '', // Not stored in users table
      city: '', // Not stored in users table
      state: '', // Not stored in users table
      zipCode: '', // Not stored in users table
    }

    return NextResponse.json(successResponse(personalInfo))
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return errorResponse('An unexpected error occurred while fetching profile', 500)
  }
}

// PATCH /api/user/profile - Update user profile
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
      firstName,
      lastName,
      email,
      phone,
      jobTitle,
      bio,
      streetAddress,
      city,
      state,
      zipCode,
    } = body

    // Build update object
    const updateData: any = {
      updatedAt: new Date(),
    }

    if (firstName !== undefined || lastName !== undefined) {
      // Get current name from existing grant query result (if we already have it)
      // Or fetch once and reuse
      const [currentUser] = await db
        .select({ name: users.name })
        .from(users)
        .where(eq(users.id, user!.id))
        .limit(1)

      const nameParts = (currentUser?.name || '').split(' ')
      const newFirstName = firstName !== undefined ? firstName : nameParts[0] || ''
      const newLastName = lastName !== undefined ? lastName : nameParts.slice(1).join(' ') || ''
      updateData.name = `${newFirstName} ${newLastName}`.trim()
    }

    if (email !== undefined) updateData.email = email.trim()
    if (jobTitle !== undefined) updateData.role = jobTitle.trim()
    // phone, bio, address fields not stored in users table - skip

    // Update user profile
    const [updatedProfile] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, user!.id))
      .returning()

    if (!updatedProfile) {
      return errorResponse('Failed to update profile', 500)
    }

    // Transform to match PersonalInfo interface
    const personalInfo = {
      firstName: updatedProfile.name?.split(' ')[0] || '',
      lastName: updatedProfile.name?.split(' ').slice(1).join(' ') || '',
      email: updatedProfile.email || '',
      phone: '', // Not stored in users table
      jobTitle: updatedProfile.role || '',
      bio: '', // Not stored in users table
      streetAddress: '', // Not stored in users table
      city: '', // Not stored in users table
      state: '', // Not stored in users table
      zipCode: '', // Not stored in users table
    }

    return NextResponse.json(successResponse(personalInfo))
  } catch (error) {
    console.error('Error updating user profile:', error)
    return errorResponse('An unexpected error occurred while updating profile', 500)
  }
}
