import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { complianceItems, activityLog } from '@/db/schema'
import { desc, eq, and } from 'drizzle-orm'

// GET /api/compliance - List all compliance items for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Build where conditions
    const conditions = [eq(complianceItems.userId, userId)]
    if (status) {
      conditions.push(eq(complianceItems.status, status))
    }

    const items = await db
      .select()
      .from(complianceItems)
      .where(and(...conditions))
      .orderBy(desc(complianceItems.dueDate))

    return NextResponse.json({ items })
  } catch (error) {
    console.error('Error fetching compliance items:', error)
    return NextResponse.json({ error: 'Failed to fetch compliance items' }, { status: 500 })
  }
}

// POST /api/compliance - Create a new compliance item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      grantId,
      grantName,
      requirement,
      description,
      dueDate,
      priority = 'Medium',
      status = 'Upcoming',
      notes,
    } = body

    // Validate required fields
    if (!userId || !grantName || !requirement || !dueDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create the compliance item
    const [newItem] = await db
      .insert(complianceItems)
      .values({
        userId,
        grantId,
        grantName,
        requirement,
        description,
        dueDate: new Date(dueDate),
        priority,
        status,
        notes,
      })
      .returning()

    // Log the activity
    await db.insert(activityLog).values({
      userId,
      action: `Created compliance task: ${requirement}`,
      entityType: 'compliance',
      entityId: newItem.id,
      details: `Grant: ${grantName}, Due: ${new Date(dueDate).toLocaleDateString()}`,
    })

    return NextResponse.json({ item: newItem }, { status: 201 })
  } catch (error) {
    console.error('Error creating compliance item:', error)
    return NextResponse.json({ error: 'Failed to create compliance item' }, { status: 500 })
  }
}

// PATCH /api/compliance/[id]/complete - Mark compliance item as complete
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, userId } = body

    if (!id || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Update the item to completed
    const [updatedItem] = await db
      .update(complianceItems)
      .set({
        status: 'Completed',
        completedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(complianceItems.id, id))
      .returning()

    if (!updatedItem) {
      return NextResponse.json({ error: 'Compliance item not found' }, { status: 404 })
    }

    // Log the activity
    await db.insert(activityLog).values({
      userId,
      action: `Completed compliance task: ${updatedItem.requirement}`,
      entityType: 'compliance',
      entityId: id,
      details: `Grant: ${updatedItem.grantName}`,
    })

    return NextResponse.json({ item: updatedItem })
  } catch (error) {
    console.error('Error completing compliance item:', error)
    return NextResponse.json({ error: 'Failed to complete compliance item' }, { status: 500 })
  }
}
