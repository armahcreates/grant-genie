import { mastra } from '@/lib/mastra'

// export const runtime = 'edge' // Disabled for Mastra compatibility

export async function POST(req: Request) {
  try {
    const { messages, agentType } = await req.json()

    // Select the appropriate agent based on context
    const agentName = agentType === 'donor-meeting'
      ? 'donorMeeting'
      : 'generalAssistant'

    const agent = mastra.getAgent(agentName)

    const stream = await agent.stream(messages, {
      format: 'aisdk',
    })

    return stream.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Error in chat:', error)
    return new Response('Error processing chat', { status: 500 })
  }
}
