import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { documents } from '@/db/schema'
import { desc, eq, and } from 'drizzle-orm'

// GET /api/documents - Get user's documents
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const entityType = searchParams.get('entityType')
    const entityId = searchParams.get('entityId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    let query = db.select().from(documents).where(eq(documents.userId, userId)).$dynamic()

    if (entityType && entityId) {
      query = query.where(
        and(
          eq(documents.entityType, entityType),
          eq(documents.entityId, parseInt(entityId))
        )
      )
    }

    const documentsList = await query.orderBy(desc(documents.createdAt))

    return NextResponse.json({ documents: documentsList })
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
  }
}

// POST /api/documents - Upload/create a document record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      entityType,
      entityId,
      fileName,
      fileType,
      fileSize,
      fileUrl,
      category,
      description,
      tags,
    } = body

    if (!userId || !fileName || !fileUrl) {
      return NextResponse.json(
        { error: 'userId, fileName, and fileUrl are required' },
        { status: 400 }
      )
    }

    const [newDocument] = await db
      .insert(documents)
      .values({
        userId,
        entityType,
        entityId,
        fileName,
        fileType,
        fileSize,
        fileUrl,
        category,
        description,
        tags,
      })
      .returning()

    return NextResponse.json({ document: newDocument }, { status: 201 })
  } catch (error) {
    console.error('Error creating document:', error)
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 })
  }
}
