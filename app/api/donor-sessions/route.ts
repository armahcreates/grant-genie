import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { donorMeetingSessions, activityLog } from '@/db/schema'
import { desc, eq, and } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'
import { createDonorMeetingSessionSchema } from '@/lib/validation/zod-schemas'
import { z } from 'zod'

const updateDonorSessionSchema = z.object({
  id: z.number().int().min(1),
  conversationHistory: z.array(z.object({
    role: z.string(),
    content: z.string(),
  })).optional(),
  coachingTips: z.array(z.string()).optional(),
  score: z.number().int().min(0).max(100).optional(),
  feedback: z.string().optional(),
})

// GET /api/donor-sessions - Get all donor meeting sessions for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const searchParams = request.nextUrl.searchParams
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '20'))

    // Build query conditions
    const conditions = [eq(donorMeetingSessions.userId, user!.id)]

    // Filter by donorId if provided
    const donorId = searchParams.get('donorId')
    if (donorId) {
      const id = parseInt(donorId)
      if (!isNaN(id)) {
        conditions.push(eq(donorMeetingSessions.donorId, id))
      }
    }

    const sessions = await db
      .select()
      .from(donorMeetingSessions)
      .where(and(...conditions))
      .orderBy(desc(donorMeetingSessions.createdAt))
      .limit(limit)

    return NextResponse.json(successResponse(sessions))
  } catch (error) {
    console.error('Error fetching donor meeting sessions:', error)
    return errorResponse('An unexpected error occurred while fetching donor sessions', 500)
  }
}

// POST /api/donor-sessions - Create a new donor meeting session
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

    const validationResult = createDonorMeetingSessionSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    const validatedData = validationResult.data

    // Create the donor meeting session and log activity in a transaction
    const newSession = await db.transaction(async (tx) => {
      const [session] = await tx
        .insert(donorMeetingSessions)
        .values({
          userId: user!.id,
          donorId: validatedData.donorId || null,
          donorProfile: validatedData.donorProfile.trim(),
          donorType: validatedData.donorType,
          warmthFactor: validatedData.warmthFactor.trim(),
          practiceFormat: validatedData.practiceFormat,
          conversationHistory: [],
          coachingTips: [],
        })
        .returning()

      // Log the activity
      await tx.insert(activityLog).values({
        userId: user!.id,
        action: `Created donor meeting practice session for ${validatedData.donorType}`,
        entityType: 'donor_session',
        entityId: session.id,
        details: `Practice format: ${validatedData.practiceFormat}`,
      })

      return session
    })

    return NextResponse.json(successResponse(newSession), { status: 201 })
  } catch (error) {
    console.error('Error creating donor meeting session:', error)
    return errorResponse('An unexpected error occurred while creating donor session', 500)
  }
}

// PATCH /api/donor-sessions - Update an existing donor meeting session
export async function PATCH(request: NextRequest) {
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

    const validationResult = updateDonorSessionSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    const { id, conversationHistory, coachingTips, score, feedback } = validationResult.data

    // Build update object
    const updateData: any = {
      updatedAt: new Date(),
    }

    if (conversationHistory !== undefined) updateData.conversationHistory = conversationHistory
    if (coachingTips !== undefined) updateData.coachingTips = coachingTips
    if (score !== undefined) updateData.score = score
    if (feedback !== undefined) updateData.feedback = feedback.trim()

    // Update the session (ensure user owns it)
    const [updatedSession] = await db
      .update(donorMeetingSessions)
      .set(updateData)
      .where(eq(donorMeetingSessions.id, id))
      .returning()

    if (!updatedSession) {
      return errorResponse('Session not found', 404)
    }

    // Verify the session belongs to the authenticated user
    if (updatedSession.userId !== user!.id) {
      return errorResponse('Unauthorized to update this session', 403)
    }

    return NextResponse.json(successResponse(updatedSession))
  } catch (error) {
    console.error('Error updating donor meeting session:', error)
    return errorResponse('An unexpected error occurred while updating donor session', 500)
  }
}
