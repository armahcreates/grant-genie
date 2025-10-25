import { NextRequest } from 'next/server'
import { mastra } from '@/lib/mastra'

export const runtime = 'edge'

// POST /api/ai/generate-grant - Generate grant proposal using Grant Writing Agent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      projectName,
      funderName,
      fundingAmount,
      deadline,
      rfpText,
      teachingMaterials,
    } = body

    if (!projectName || !funderName) {
      return new Response(
        JSON.stringify({ error: 'projectName and funderName are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

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

    // Generate the proposal with streaming
    const stream = await agent.generate(prompt, {
      stream: true,
    })

    // Return streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Error generating grant proposal:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate grant proposal' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
