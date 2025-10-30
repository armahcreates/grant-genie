import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'
import { env } from '@/lib/env'

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024

// Allowed file types
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'image/png',
  'image/jpeg',
  'image/jpg',
]

export async function POST(request: NextRequest): Promise<Response> {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    // Check if BLOB_READ_WRITE_TOKEN is configured
    if (!env.BLOB_READ_WRITE_TOKEN) {
      return errorResponse(
        'File upload is not configured. Please set BLOB_READ_WRITE_TOKEN.',
        503
      )
    }

    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')
    const category = searchParams.get('category') || 'general'

    if (!filename) {
      return errorResponse('Filename is required as query parameter', 400)
    }

    // Validate filename
    if (!/^[a-zA-Z0-9._-]+$/.test(filename)) {
      return errorResponse('Invalid filename. Only alphanumeric characters, dots, dashes, and underscores are allowed.', 400)
    }

    if (!request.body) {
      return errorResponse('Request body is required', 400)
    }

    // Read the body
    const body = await request.blob()

    // Validate file size
    if (body.size > MAX_FILE_SIZE) {
      return errorResponse(
        `File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        400
      )
    }

    // Validate file type
    const contentType = request.headers.get('content-type') || ''
    if (!ALLOWED_TYPES.some(type => contentType.includes(type))) {
      return errorResponse(
        `File type not allowed. Allowed types: PDF, DOC, DOCX, TXT, PNG, JPG, JPEG`,
        400
      )
    }

    // Construct path with user ID and category
    const pathname = `users/${user!.id}/${category}/${Date.now()}-${filename}`

    // Upload to Vercel Blob
    const blob = await put(pathname, body, {
      access: 'public',
      contentType,
    })

    return NextResponse.json(successResponse({
      url: blob.url,
      filename: blob.pathname,
      contentType: blob.contentType,
    }), { status: 201 })
  } catch (error) {
    console.error('Error uploading file:', error)
    return errorResponse('An unexpected error occurred while uploading file', 500)
  }
}
