import { mastra } from '@/lib/mastra'

// export const runtime = 'edge' // Disabled for Mastra compatibility

export async function POST(req: Request) {
  try {
    const {
      donorProfile,
      donorType,
      warmthFactor,
      practiceFormat,
      messages
    } = await req.json()

    const systemContext = `You are simulating a donor conversation for practice.

Donor Profile: ${donorProfile || 'Not specified'}
Donor Type: ${donorType || 'Not specified'}
Warmth Factor: ${warmthFactor || 'Neutral'}
Practice Format: ${practiceFormat || 'Two-way conversation'}

Respond as the donor would, based on their profile and type. Be realistic and challenging when appropriate, but also recognize good responses. Help the fundraiser practice effective donor engagement.`

    const agent = mastra.getAgent('donorMeeting')

    const messagesWithContext = [
      { role: 'system', content: systemContext },
      ...messages
    ]

    const stream = await agent.stream(messagesWithContext, {
      format: 'aisdk',
    })

    return stream.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Error in donor practice:', error)
    return new Response('Error processing donor practice', { status: 500 })
  }
}
