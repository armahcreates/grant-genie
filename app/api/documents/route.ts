import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { documents, activityLog } from '@/db/schema'
import { desc, eq, and } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'
import { createDocumentSchema } from '@/lib/validation/zod-schemas'

// GET /api/documents - Get user's documents
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const searchParams = request.nextUrl.searchParams
    const entityType = searchParams.get('entityType')
    const entityId = searchParams.get('entityId')

    let query = db.select().from(documents).where(eq(documents.userId, user!.id)).$dynamic()

    if (entityType && entityId) {
      const id = parseInt(entityId)
      if (!isNaN(id)) {
        query = query.where(
          and(
            eq(documents.entityType, entityType),
            eq(documents.entityId, id)
          )
        )
      }
    }

    const documentsList = await query.orderBy(desc(documents.createdAt))

    return NextResponse.json(successResponse(documentsList))
  } catch (error) {
    console.error('Error fetching documents:', error)
    return errorResponse('An unexpected error occurred while fetching documents', 500)
  }
}

// POST /api/documents - Upload/create a document record
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

    const validationResult = createDocumentSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    const validatedData = validationResult.data

    // Create document and log activity in a transaction
    const newDocument = await db.transaction(async (tx) => {
      const [document] = await tx
        .insert(documents)
        .values({
          userId: user!.id,
          entityType: validatedData.entityType?.trim() || null,
          entityId: validatedData.entityId || null,
          fileName: validatedData.fileName.trim(),
          fileType: validatedData.fileType?.trim() || null,
          fileSize: validatedData.fileSize || null,
          fileUrl: validatedData.fileUrl.trim(),
          category: validatedData.category?.trim() || null,
          description: validatedData.description?.trim() || null,
          tags: validatedData.tags || null,
        })
        .returning()

      // Log the activity
      await tx.insert(activityLog).values({
        userId: user!.id,
        action: `Uploaded document: ${validatedData.fileName}`,
        entityType: 'document',
        entityId: document.id,
        details: `Category: ${validatedData.category || 'N/A'}`,
      })

      return document
    })

    return NextResponse.json(successResponse(newDocument), { status: 201 })
  } catch (error) {
    console.error('Error creating document:', error)
    return errorResponse('An unexpected error occurred while creating document', 500)
  }
}
