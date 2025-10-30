import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'
import { z } from 'zod'

const supportMessageSchema = z.object({
  message: z.string().min(1, 'Message is required').max(5000, 'Message must be 5000 characters or less'),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
})

// POST /api/ai/support - Support Genie AI chat
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
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

    const validationResult = supportMessageSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    const { message } = validationResult.data

    // Generate contextual response based on user question
    const response = generateSupportResponse(message)

    return NextResponse.json(successResponse({ response }))
  } catch (error) {
    console.error('Error processing support chat:', error)

    // Return a helpful fallback message instead of an error
    return NextResponse.json(successResponse({
      response: "I apologize, but I'm having trouble processing your request right now. Here are some quick navigation tips:\n\n• Grant Search: Find funding opportunities in the sidebar\n• Donor Meeting Genie: Practice conversations under 'Genies'\n• Compliance Tracker: Manage deadlines in the sidebar\n• Profile: Update your information in the top menu\n\nFor immediate assistance, please contact support@headspacegenie.com",
    }))
  }
}

// Helper function to generate contextual support responses
function generateSupportResponse(question: string): string {
  const lowerQuestion = question.toLowerCase()

  if (lowerQuestion.includes('grant') && lowerQuestion.includes('search')) {
    return 'To search for grants, go to the Grant Search page from the sidebar. You can:\n\n• Filter by category, deadline, and amount\n• Sort by relevance, deadline, or amount\n• Bookmark grants for later\n• Save your searches\n\nWould you like help with any specific search criteria?'
  }

  if (lowerQuestion.includes('donor') || lowerQuestion.includes('meeting')) {
    return 'The Donor Meeting Genie helps you prepare for donor conversations. You can:\n\n• Train the genie with donor profile info\n• Practice different conversation formats\n• Get coaching on objection handling\n• Review session summaries\n\nNavigate to Genies → Donor Meeting Genie to get started!'
  }

  if (lowerQuestion.includes('compliance') || lowerQuestion.includes('deadline')) {
    return 'The Compliance Tracker helps you stay on top of deadlines:\n\n• View all upcoming deadlines\n• Upload required documents\n• Track task status (completed/pending/overdue)\n• Get notifications for approaching deadlines\n\nCheck the Compliance Tracker in your sidebar!'
  }

  if (lowerQuestion.includes('notification')) {
    return 'You can manage notifications in Settings → Notifications. You can:\n\n• Toggle email notifications\n• Toggle in-app alerts\n• Filter notifications by type\n• Mark notifications as read\n\nIs there a specific notification setting you need help with?'
  }

  if (lowerQuestion.includes('profile') || lowerQuestion.includes('account')) {
    return 'To update your profile, go to Profile from the top menu. You can:\n\n• Update personal information\n• Change organization details\n• Manage notification preferences\n• Update your profile photo\n\nAll changes are automatically saved!'
  }

  return 'I\'d be happy to help! Here are some things I can assist with:\n\n• Grant search and filtering\n• Using the Donor Meeting Genie\n• Compliance tracking\n• Profile and settings\n• General navigation\n\nCould you provide more details about what you need help with?'
}
