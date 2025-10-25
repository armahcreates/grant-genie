import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { grantOpportunities } from '@/db/schema'
import { eq } from 'drizzle-orm'

// GET /api/grant-opportunities/[id] - Get a specific grant opportunity
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const opportunityId = parseInt(params.id)

    if (isNaN(opportunityId)) {
      return NextResponse.json({ error: 'Invalid opportunity ID' }, { status: 400 })
    }

    const [opportunity] = await db
      .select()
      .from(grantOpportunities)
      .where(eq(grantOpportunities.id, opportunityId))
      .limit(1)

    if (!opportunity) {
      return NextResponse.json({ error: 'Grant opportunity not found' }, { status: 404 })
    }

    return NextResponse.json({ opportunity })
  } catch (error) {
    console.error('Error fetching grant opportunity:', error)
    return NextResponse.json(
      { error: 'Failed to fetch grant opportunity' },
      { status: 500 }
    )
  }
}

// PUT /api/grant-opportunities/[id] - Update a grant opportunity
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const opportunityId = parseInt(params.id)
    const body = await request.json()

    if (isNaN(opportunityId)) {
      return NextResponse.json({ error: 'Invalid opportunity ID' }, { status: 400 })
    }

    // Check if opportunity exists
    const [existingOpportunity] = await db
      .select()
      .from(grantOpportunities)
      .where(eq(grantOpportunities.id, opportunityId))
      .limit(1)

    if (!existingOpportunity) {
      return NextResponse.json({ error: 'Grant opportunity not found' }, { status: 404 })
    }

    // Update the opportunity
    const [updatedOpportunity] = await db
      .update(grantOpportunities)
      .set({
        ...body,
        deadline: body.deadline ? new Date(body.deadline) : undefined,
        updatedAt: new Date(),
      })
      .where(eq(grantOpportunities.id, opportunityId))
      .returning()

    return NextResponse.json({ opportunity: updatedOpportunity })
  } catch (error) {
    console.error('Error updating grant opportunity:', error)
    return NextResponse.json(
      { error: 'Failed to update grant opportunity' },
      { status: 500 }
    )
  }
}

// DELETE /api/grant-opportunities/[id] - Delete a grant opportunity
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const opportunityId = parseInt(params.id)

    if (isNaN(opportunityId)) {
      return NextResponse.json({ error: 'Invalid opportunity ID' }, { status: 400 })
    }

    // Check if opportunity exists
    const [existingOpportunity] = await db
      .select()
      .from(grantOpportunities)
      .where(eq(grantOpportunities.id, opportunityId))
      .limit(1)

    if (!existingOpportunity) {
      return NextResponse.json({ error: 'Grant opportunity not found' }, { status: 404 })
    }

    // Delete the opportunity
    await db.delete(grantOpportunities).where(eq(grantOpportunities.id, opportunityId))

    return NextResponse.json({ message: 'Grant opportunity deleted successfully' })
  } catch (error) {
    console.error('Error deleting grant opportunity:', error)
    return NextResponse.json(
      { error: 'Failed to delete grant opportunity' },
      { status: 500 }
    )
  }
}
