/**
 * Mastra AI Configuration
 * 
 * Configured to use Vercel AI SDK with OpenAI
 * Agents use OpenAI GPT-4 Turbo model
 */

import { Mastra } from '@mastra/core'
import { createOpenAI } from '@ai-sdk/openai'
import { env } from '@/lib/env'
import { grantWritingAgent } from './agents/grant-writing'
import { donorMeetingAgent } from './agents/donor-meeting'
import { generalAssistantAgent } from './agents/general-assistant'

// Initialize OpenAI provider using Vercel AI SDK
const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
})

// Initialize Mastra with OpenAI provider and agents
export const mastra = new Mastra({
  providers: {
    openai,
  },
  agents: {
    grantWriting: grantWritingAgent,
    donorMeeting: donorMeetingAgent,
    generalAssistant: generalAssistantAgent,
  },
})

export { grantWritingAgent, donorMeetingAgent, generalAssistantAgent }
