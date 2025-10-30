import { NextRequest, NextResponse } from 'next/server'
import { mastra } from '@/lib/mastra'
import { requireAuth } from '@/lib/middleware/auth'
import { strictRateLimit } from '@/lib/middleware/rate-limit'
import { errorResponse, successResponse } from '@/lib/api/response'
import { z } from 'zod'

const endSessionSchema = z.object({
  sessionConfig: z.object({
    donorProfile: z.string().optional(),
    donorType: z.string().optional(),
    warmthFactor: z.string().optional(),
    practiceFormat: z.string().optional(),
  }).optional(),
})

// POST /api/ai/donor-meeting/end-session - End donor practice session
export async function POST(request: NextRequest) {
  try {
    // Rate limiting (stricter for AI endpoints)
    const rateLimitError = await strictRateLimit(request)
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

    const validationResult = endSessionSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    // For now, calculate a simple score based on session completion
    // In the future, this could analyze conversation quality, coaching tips given, etc.
    const finalScore = Math.floor(Math.random() * 30) + 70 // Placeholder: 70-100 score

    // Generate session summary using the agent
    const agent = mastra.getAgent('donorMeeting')
    
    const summaryPrompt = `Provide a brief summary and feedback for this donor meeting practice session. 
    Donor Profile: ${body.sessionConfig?.donorProfile || 'Not specified'}
    Donor Type: ${body.sessionConfig?.donorType || 'Not specified'}
    
    The session has been completed. Provide constructive feedback and next steps.`

    const summaryStream = await agent.stream([
      {
        role: 'user' as const,
        content: summaryPrompt,
      },
    ] as any, {
      format: 'aisdk',
    })

    // For now, return a simple response
    // In production, you might want to process the stream and extract summary
    return NextResponse.json(
      successResponse({
        finalScore,
        summary: 'Session completed successfully. Review your conversation history for insights.',
        completedAt: new Date().toISOString(),
      })
    )
  } catch (error) {
    console.error('Error ending donor session:', error)
    return errorResponse('Failed to end donor session', 500)
  }
}

