import { NextRequest } from 'next/server'
import { mastra } from '@/lib/mastra'
import { requireAuth } from '@/lib/middleware/auth'
import { strictRateLimit } from '@/lib/middleware/rate-limit'
import { errorResponse } from '@/lib/api/response'
import { z } from 'zod'

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string(),
  })),
  agentType: z.enum(['donor-meeting', 'general']).optional(),
})

// POST /api/ai/chat - Chat interface for agents
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

    const validationResult = chatSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    const { messages, agentType } = validationResult.data

    // Select the appropriate agent based on context
    const agentName = agentType === 'donor-meeting'
      ? 'donorMeeting'
      : 'generalAssistant'

    const agent = mastra.getAgent(agentName)

    // Use Vercel AI SDK streaming format
    // Mastra's stream accepts messages array directly
    const stream = await agent.stream(messages as any, {
      format: 'aisdk',
    })

    // Return streaming response compatible with Vercel AI SDK
    return stream.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Error in chat:', error)
    return errorResponse('Failed to process chat', 500)
  }
}
