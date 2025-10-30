import { NextRequest } from 'next/server'
import { mastra } from '@/lib/mastra'
import { requireAuth } from '@/lib/middleware/auth'
import { strictRateLimit } from '@/lib/middleware/rate-limit'
import { errorResponse } from '@/lib/api/response'
import { z } from 'zod'

const generateGrantSchema = z.object({
  projectName: z.string().min(1).max(300),
  funderName: z.string().min(1).max(300),
  fundingAmount: z.string().optional(),
  deadline: z.string().optional(),
  rfpText: z.string().optional(),
  teachingMaterials: z.string().optional(),
})

// POST /api/ai/generate-grant - Generate grant proposal using Grant Writing Agent
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

    const validationResult = generateGrantSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    const { projectName, funderName, fundingAmount, deadline, rfpText, teachingMaterials } = validationResult.data

    // Build the prompt for the grant writing agent
    const prompt = `Generate a comprehensive grant proposal for the following project:

Project Name: ${projectName}
Funder: ${funderName}
${fundingAmount ? `Funding Amount Requested: ${fundingAmount}` : ''}
${deadline ? `Deadline: ${deadline}` : ''}

${rfpText ? `RFP/Grant Guidelines:\n${rfpText}\n` : ''}

${teachingMaterials ? `Organization Background & Writing Style:\n${teachingMaterials}\n` : ''}

Please generate a complete grant proposal following best practices for nonprofit grant writing. Include:
1. Executive Summary
2. Statement of Need
3. Program Description
4. Expected Outcomes and Impact
5. Budget Summary

Make it compelling, data-driven, and aligned with the funder's priorities.`

    // Get the grant writing agent
    const agent = mastra.getAgent('grantWriting')

    // Use Vercel AI SDK streaming format
    const stream = await agent.stream(prompt, {
      format: 'aisdk',
    })

    // Return streaming response compatible with Vercel AI SDK
    return stream.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Error generating grant proposal:', error)
    return errorResponse('Failed to generate grant proposal', 500)
  }
}
