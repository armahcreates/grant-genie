import { NextRequest } from 'next/server'
import { mastra } from '@/lib/mastra'
import { requireAuth } from '@/lib/middleware/auth'
import { strictRateLimit } from '@/lib/middleware/rate-limit'
import { errorResponse, successResponse } from '@/lib/api/response'
import { z } from 'zod'

const assistantSchema = z.object({
  question: z.string().min(1).max(5000),
  context: z.any().optional(),
})

// POST /api/ai/assistant - General assistant queries
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

    const validationResult = assistantSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    const { question, context } = validationResult.data

    // Get the general assistant agent
    const agent = mastra.getAgent('generalAssistant')

    // Convert question to messages format
    const messages = [
      ...(context?.messages || []),
      {
        role: 'user' as const,
        content: question,
      },
    ]

    // Generate response using streaming
    const stream = await agent.stream(messages as any, {
      format: 'aisdk',
    })

    // Return streaming response compatible with Vercel AI SDK
    return stream.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Error processing assistant query:', error)
    return errorResponse('Failed to process assistant query', 500)
  }
}

