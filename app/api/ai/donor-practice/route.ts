import { NextRequest } from 'next/server'
import { mastra } from '@/lib/mastra'
import { requireAuth } from '@/lib/middleware/auth'
import { strictRateLimit } from '@/lib/middleware/rate-limit'
import { errorResponse } from '@/lib/api/response'
import { z } from 'zod'

const donorPracticeSchema = z.object({
  donorProfile: z.string().optional(),
  donorType: z.string().optional(),
  warmthFactor: z.string().optional(),
  practiceFormat: z.string().optional(),
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string(),
  })),
})

// POST /api/ai/donor-practice - Donor meeting practice conversation
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

    const validationResult = donorPracticeSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    const {
      donorProfile,
      donorType,
      warmthFactor,
      practiceFormat,
      messages,
    } = validationResult.data

    const systemContext = `You are simulating a donor conversation for practice.

Donor Profile: ${donorProfile || 'Not specified'}
Donor Type: ${donorType || 'Not specified'}
Warmth Factor: ${warmthFactor || 'Neutral'}
Practice Format: ${practiceFormat || 'Two-way conversation'}

Respond as the donor would, based on their profile and type. Be realistic and challenging when appropriate, but also recognize good responses. Help the fundraiser practice effective donor engagement.

Provide responses that:
1. Match the donor's communication style based on their profile
2. Include realistic questions and concerns
3. Offer constructive feedback when appropriate
4. Help the fundraiser practice effective donor engagement techniques`

    const agent = mastra.getAgent('donorMeeting')

    const messagesWithContext = [
      { role: 'system' as const, content: systemContext },
      ...messages,
    ]

    // Use Vercel AI SDK streaming format
    const stream = await agent.stream(messagesWithContext, {
      format: 'aisdk',
    })

    // Return streaming response compatible with Vercel AI SDK
    return stream.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Error in donor practice:', error)
    return errorResponse('Failed to process donor practice', 500)
  }
}
