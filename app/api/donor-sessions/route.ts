import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { donorMeetingSessions, activityLog } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'

// GET /api/donor-sessions - Get all donor meeting sessions for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const searchParams = request.nextUrl.searchParams
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '20'))
    const donorId = searchParams.get('donorId')

    // Build query conditions
    let query = db
      .select()
      .from(donorMeetingSessions)
      .where(eq(donorMeetingSessions.userId, user!.id))
      .orderBy(desc(donorMeetingSessions.createdAt))
      .limit(limit)

    // Filter by donorId if provided
    if (donorId) {
      query = db
        .select()
        .from(donorMeetingSessions)
        .where(eq(donorMeetingSessions.donorId, parseInt(donorId)))
        .orderBy(desc(donorMeetingSessions.createdAt))
        .limit(limit)
    }

    const sessions = await query

    return NextResponse.json({ sessions })
  } catch (error) {
    console.error('Error fetching donor meeting sessions:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching donor sessions' },
      { status: 500 }
    )
  }
}

// POST /api/donor-sessions - Create a new donor meeting session
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const body = await request.json()
    const {
      donorId,
      donorProfile,
      donorType,
      warmthFactor,
      practiceFormat,
      conversationHistory,
      coachingTips,
      score,
      feedback,
    } = body

    // Validate required fields
    if (!donorType || !practiceFormat) {
      return NextResponse.json(
        { error: 'donorType and practiceFormat are required' },
        { status: 400 }
      )
    }

    // Validate donorType
    if (!['Individual', 'Foundation', 'Corporate', 'Planned Giving'].includes(donorType)) {
      return NextResponse.json(
        { error: 'Invalid donor type. Must be one of: Individual, Foundation, Corporate, Planned Giving' },
        { status: 400 }
      )
    }

    // Validate practiceFormat
    if (!['conversation', 'pitch', 'objection-handling'].includes(practiceFormat)) {
      return NextResponse.json(
        { error: 'Invalid practice format. Must be one of: conversation, pitch, objection-handling' },
        { status: 400 }
      )
    }

    // Validate score if provided
    if (score !== undefined && (score < 0 || score > 100)) {
      return NextResponse.json(
        { error: 'Score must be between 0 and 100' },
        { status: 400 }
      )
    }

    // Create the donor meeting session
    const [newSession] = await db
      .insert(donorMeetingSessions)
      .values({
        userId: user!.id,
        donorId: donorId ? parseInt(donorId) : null,
        donorProfile: donorProfile?.trim(),
        donorType,
        warmthFactor: warmthFactor?.trim(),
        practiceFormat,
        conversationHistory: conversationHistory || [],
        coachingTips: coachingTips || [],
        score,
        feedback: feedback?.trim(),
      })
      .returning()

    // Log the activity
    await db.insert(activityLog).values({
      userId: user!.id,
      action: `Created donor meeting practice session for ${donorType}`,
      entityType: 'donor_session',
      entityId: newSession.id,
      details: `Practice format: ${practiceFormat}`,
    })

    return NextResponse.json({ session: newSession }, { status: 201 })
  } catch (error) {
    console.error('Error creating donor meeting session:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while creating donor session' },
      { status: 500 }
    )
  }
}

// PATCH /api/donor-sessions - Update an existing donor meeting session
export async function PATCH(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const body = await request.json()
    const {
      id,
      conversationHistory,
      coachingTips,
      score,
      feedback,
    } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Session id is required' },
        { status: 400 }
      )
    }

    // Build update object
    const updateData: any = {
      updatedAt: new Date(),
    }

    if (conversationHistory !== undefined) updateData.conversationHistory = conversationHistory
    if (coachingTips !== undefined) updateData.coachingTips = coachingTips
    if (score !== undefined) {
      if (score < 0 || score > 100) {
        return NextResponse.json(
          { error: 'Score must be between 0 and 100' },
          { status: 400 }
        )
      }
      updateData.score = score
    }
    if (feedback !== undefined) updateData.feedback = feedback.trim()

    // Update the session (ensure user owns it)
    const [updatedSession] = await db
      .update(donorMeetingSessions)
      .set(updateData)
      .where(eq(donorMeetingSessions.id, parseInt(id)))
      .returning()

    if (!updatedSession) {
      return NextResponse.json(
        { error: 'Session not found or unauthorized' },
        { status: 404 }
      )
    }

    // Verify the session belongs to the authenticated user
    if (updatedSession.userId !== user!.id) {
      return NextResponse.json(
        { error: 'Unauthorized to update this session' },
        { status: 403 }
      )
    }

    return NextResponse.json({ session: updatedSession })
  } catch (error) {
    console.error('Error updating donor meeting session:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while updating donor session' },
      { status: 500 }
    )
  }
}
