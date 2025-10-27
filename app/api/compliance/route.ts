import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { complianceItems, activityLog } from '@/db/schema'
import { desc, eq, and } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'

// GET /api/compliance - List all compliance items for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    // Build where conditions for authenticated user
    const conditions = [eq(complianceItems.userId, user!.id)]
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
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching compliance items' },
      { status: 500 }
    )
  }
}

// POST /api/compliance - Create a new compliance item for authenticated user
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const body = await request.json()
    const {
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
    if (!grantName || !requirement || !dueDate) {
      return NextResponse.json(
        { error: 'Missing required fields: grantName, requirement, and dueDate are required' },
        { status: 400 }
      )
    }

    // Create the compliance item for authenticated user
    const [newItem] = await db
      .insert(complianceItems)
      .values({
        userId: user!.id,
        grantId,
        grantName: grantName.trim(),
        requirement: requirement.trim(),
        description: description?.trim(),
        dueDate: new Date(dueDate),
        priority,
        status,
        notes: notes?.trim(),
      })
      .returning()

    // Log the activity
    await db.insert(activityLog).values({
      userId: user!.id,
      action: `Created compliance task: ${requirement}`,
      entityType: 'compliance',
      entityId: newItem.id,
      details: `Grant: ${grantName}, Due: ${new Date(dueDate).toLocaleDateString()}`,
    })

    return NextResponse.json({ item: newItem }, { status: 201 })
  } catch (error) {
    console.error('Error creating compliance item:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while creating compliance item' },
      { status: 500 }
    )
  }
}

// PATCH /api/compliance - Mark compliance item as complete for authenticated user
export async function PATCH(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    // Update the item to completed (only if owned by user)
    const [updatedItem] = await db
      .update(complianceItems)
      .set({
        status: 'Completed',
        completedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(complianceItems.id, id),
          eq(complianceItems.userId, user!.id) // Ensure user owns this item
        )
      )
      .returning()

    if (!updatedItem) {
      return NextResponse.json(
        { error: 'Compliance item not found or unauthorized' },
        { status: 404 }
      )
    }

    // Log the activity
    await db.insert(activityLog).values({
      userId: user!.id,
      action: `Completed compliance task: ${updatedItem.requirement}`,
      entityType: 'compliance',
      entityId: id,
      details: `Grant: ${updatedItem.grantName}`,
    })

    return NextResponse.json({ item: updatedItem })
  } catch (error) {
    console.error('Error completing compliance item:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while completing compliance item' },
      { status: 500 }
    )
  }
}
