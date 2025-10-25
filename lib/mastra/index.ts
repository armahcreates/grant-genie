import { Mastra } from '@mastra/core'
import { grantWritingAgent } from './agents/grant-writing'
import { donorMeetingAgent } from './agents/donor-meeting'
import { generalAssistantAgent } from './agents/general-assistant'

export const mastra = new Mastra({
  agents: {
    grantWriting: grantWritingAgent,
    donorMeeting: donorMeetingAgent,
    generalAssistant: generalAssistantAgent,
  },
})

export { grantWritingAgent, donorMeetingAgent, generalAssistantAgent }
