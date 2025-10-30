'use client'

import { useState, useCallback } from 'react'
import { useGrantGenieStore, useDonorGenieStore } from '@/lib/stores'

// ============================================================================
// Grant Writing Agent Hook
// ============================================================================

interface UseGrantWritingAgentOptions {
  onComplete?: (content: string) => void
  onError?: (error: Error) => void
}

export function useGrantWritingAgent(options: UseGrantWritingAgentOptions = {}) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setProposalContent, setIsGenerating: setStoreGenerating } = useGrantGenieStore()

  const generateProposal = useCallback(
    async (formData: {
      projectName: string
      funderName: string
      fundingAmount?: string
      deadline?: string
      rfpText?: string
      teachingMaterials?: string
    }) => {
      setIsGenerating(true)
      setStoreGenerating(true)
      setError(null)

      try {
        const response = await fetch('/api/ai/generate-grant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error('Failed to generate proposal')
        }

        // Handle streaming response using Vercel AI SDK format
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let content = ''

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            // Parse SSE format from Vercel AI SDK
            const lines = chunk.split('\n')
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') continue
                try {
                  const parsed = JSON.parse(data)
                  if (parsed.type === 'text-delta' && parsed.textDelta) {
                    content += parsed.textDelta
                    // Update content incrementally for real-time display
                    setProposalContent(content)
                  }
                } catch {
                  // If not JSON, append as text
                  if (data && data !== '[DONE]') {
                    content += data
                    setProposalContent(content)
                  }
                }
              }
            }
          }
        }

        options.onComplete?.(content)
        return content
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error')
        setError(error.message)
        options.onError?.(error)
        throw error
      } finally {
        setIsGenerating(false)
        setStoreGenerating(false)
      }
    },
    [setProposalContent, setStoreGenerating, options]
  )

  return {
    generateProposal,
    isGenerating,
    error,
  }
}

// ============================================================================
// Donor Meeting Agent Hook
// ============================================================================

interface UseDonorMeetingAgentOptions {
  onMessage?: (message: { role: 'user' | 'assistant'; content: string }) => void
  onCoachingTip?: (tip: string) => void
  onError?: (error: Error) => void
}

export function useDonorMeetingAgent(options: UseDonorMeetingAgentOptions = {}) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { sessionConfig, addMessage, addCoachingTip, setScore } = useDonorGenieStore()

  const sendMessage = useCallback(
    async (message: string) => {
      setIsProcessing(true)
      setError(null)

      try {
        // Add user message
        const userMessage = { role: 'user' as const, content: message }
        addMessage(userMessage)
        options.onMessage?.(userMessage)

        const response = await fetch('/api/ai/donor-practice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...sessionConfig,
            messages: [{ role: 'user', content: message }],
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to get response from donor agent')
        }

        // Handle streaming response using Vercel AI SDK format
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let content = ''

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            // Parse SSE format from Vercel AI SDK
            const lines = chunk.split('\n')
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') continue
                try {
                  const parsed = JSON.parse(data)
                  if (parsed.type === 'text-delta' && parsed.textDelta) {
                    content += parsed.textDelta
                  }
                } catch {
                  // If not JSON, append as text
                  if (data && data !== '[DONE]') {
                    content += data
                  }
                }
              }
            }
          }
        }

        // Add assistant message
        const assistantMessage = {
          role: 'assistant' as const,
          content: content || 'No response received',
        }
        addMessage(assistantMessage)
        options.onMessage?.(assistantMessage)

        // Note: Coaching tips and scores would need to be extracted from agent response
        // For now, these are handled by the agent's instructions

        return { response: content }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error')
        setError(error.message)
        options.onError?.(error)
        throw error
      } finally {
        setIsProcessing(false)
      }
    },
    [sessionConfig, addMessage, options]
  )

  const endSession = useCallback(async () => {
    try {
      const response = await fetch('/api/ai/donor-meeting/end-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionConfig }),
      })

      if (!response.ok) {
        throw new Error('Failed to end session')
      }

      const data = await response.json()
      if (data.finalScore !== undefined) {
        setScore(data.finalScore)
      }

      return data
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error.message)
      options.onError?.(error)
      throw error
    }
  }, [sessionConfig, setScore, options])

  return {
    sendMessage,
    endSession,
    isProcessing,
    error,
  }
}

// ============================================================================
// General Assistant Agent Hook
// ============================================================================

interface UseGeneralAssistantOptions {
  onResponse?: (response: string) => void
  onError?: (error: Error) => void
}

export function useGeneralAssistant(options: UseGeneralAssistantOptions = {}) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const ask = useCallback(
    async (question: string, context?: any) => {
      setIsProcessing(true)
      setError(null)

      try {
        const response = await fetch('/api/ai/assistant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question,
            context,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to get response from assistant')
        }

        // Handle streaming response using Vercel AI SDK format
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let content = ''

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            // Parse SSE format from Vercel AI SDK
            const lines = chunk.split('\n')
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') continue
                try {
                  const parsed = JSON.parse(data)
                  if (parsed.type === 'text-delta' && parsed.textDelta) {
                    content += parsed.textDelta
                  }
                } catch {
                  // If not JSON, append as text
                  if (data && data !== '[DONE]') {
                    content += data
                  }
                }
              }
            }
          }
        }

        options.onResponse?.(content)
        return content
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error')
        setError(error.message)
        options.onError?.(error)
        throw error
      } finally {
        setIsProcessing(false)
      }
    },
    [options]
  )

  return {
    ask,
    isProcessing,
    error,
  }
}
