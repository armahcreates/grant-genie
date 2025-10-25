import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { grantApplications, activityLog } from '@/db/schema'
import { eq } from 'drizzle-orm'

// GET /api/grants/[id] - Get a specific grant
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const grantId = parseInt(params.id)

    if (isNaN(grantId)) {
      return NextResponse.json({ error: 'Invalid grant ID' }, { status: 400 })
    }

    const [grant] = await db
      .select()
      .from(grantApplications)
      .where(eq(grantApplications.id, grantId))
      .limit(1)

    if (!grant) {
      return NextResponse.json({ error: 'Grant not found' }, { status: 404 })
    }

    return NextResponse.json({ grant })
  } catch (error) {
    console.error('Error fetching grant:', error)
    return NextResponse.json({ error: 'Failed to fetch grant' }, { status: 500 })
  }
}

// PUT /api/grants/[id] - Update a grant
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const grantId = parseInt(params.id)
    const body = await request.json()

    if (isNaN(grantId)) {
      return NextResponse.json({ error: 'Invalid grant ID' }, { status: 400 })
    }

    // Check if grant exists
    const [existingGrant] = await db
      .select()
      .from(grantApplications)
      .where(eq(grantApplications.id, grantId))
      .limit(1)

    if (!existingGrant) {
      return NextResponse.json({ error: 'Grant not found' }, { status: 404 })
    }

    // Update the grant
    const [updatedGrant] = await db
      .update(grantApplications)
      .set({
        ...body,
        deadline: body.deadline ? new Date(body.deadline) : undefined,
        updatedAt: new Date(),
      })
      .where(eq(grantApplications.id, grantId))
      .returning()

    // Log the activity
    await db.insert(activityLog).values({
      userId: updatedGrant.userId,
      action: `Updated grant application: ${updatedGrant.grantTitle}`,
      entityType: 'grant',
      entityId: grantId,
      details: `Status: ${updatedGrant.status}`,
    })

    return NextResponse.json({ grant: updatedGrant })
  } catch (error) {
    console.error('Error updating grant:', error)
    return NextResponse.json({ error: 'Failed to update grant' }, { status: 500 })
  }
}

// DELETE /api/grants/[id] - Delete a grant
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const grantId = parseInt(params.id)

    if (isNaN(grantId)) {
      return NextResponse.json({ error: 'Invalid grant ID' }, { status: 400 })
    }

    // Check if grant exists
    const [existingGrant] = await db
      .select()
      .from(grantApplications)
      .where(eq(grantApplications.id, grantId))
      .limit(1)

    if (!existingGrant) {
      return NextResponse.json({ error: 'Grant not found' }, { status: 404 })
    }

    // Delete the grant
    await db.delete(grantApplications).where(eq(grantApplications.id, grantId))

    // Log the activity
    await db.insert(activityLog).values({
      userId: existingGrant.userId,
      action: `Deleted grant application: ${existingGrant.grantTitle}`,
      entityType: 'grant',
      entityId: grantId,
      details: `Organization: ${existingGrant.organization}`,
    })

    return NextResponse.json({ message: 'Grant deleted successfully' })
  } catch (error) {
    console.error('Error deleting grant:', error)
    return NextResponse.json({ error: 'Failed to delete grant' }, { status: 500 })
  }
}
