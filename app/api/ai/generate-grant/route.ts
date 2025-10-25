import { mastra } from '@/lib/mastra'

// export const runtime = 'edge' // Disabled for Mastra compatibility

export async function POST(req: Request) {
  try {
    const {
      rfpText,
      teachingMaterials,
      projectName,
      funderName,
      focusArea,
      grantAmount
    } = await req.json()

    const userPrompt = `Generate a compelling grant proposal based on the following information:

Project Name: ${projectName || 'Not specified'}
Funder: ${funderName || 'Not specified'}
Focus Area: ${focusArea || 'Not specified'}
Grant Amount: ${grantAmount || 'Not specified'}

RFP/Guidelines:
${rfpText || 'No RFP provided'}

Writing Style Reference (use this to match the organization's voice):
${teachingMaterials || 'No reference materials provided'}

Please generate a complete grant proposal with these sections:
1. Executive Summary
2. Statement of Need
3. Program Description
4. Expected Outcomes
5. Budget Summary

Format the response with clear headings and professional nonprofit language.`

    const agent = mastra.getAgent('grantWriting')

    const stream = await agent.stream(
      [{ role: 'user', content: userPrompt }],
      {
        format: 'aisdk',
      }
    )

    return stream.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Error generating grant:', error)
    return new Response('Error generating grant proposal', { status: 500 })
  }
}
