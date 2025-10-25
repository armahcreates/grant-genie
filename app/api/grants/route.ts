import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { grantApplications, activityLog } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'

// GET /api/grants - List all grants for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const grants = await db
      .select()
      .from(grantApplications)
      .where(eq(grantApplications.userId, userId))
      .orderBy(desc(grantApplications.createdAt))

    return NextResponse.json({ grants })
  } catch (error) {
    console.error('Error fetching grants:', error)
    return NextResponse.json({ error: 'Failed to fetch grants' }, { status: 500 })
  }
}

// POST /api/grants - Create a new grant application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      grantTitle,
      organization,
      funderName,
      focusArea,
      amount,
      deadline,
      status = 'Draft',
      rfpText,
      teachingMaterials,
      projectName,
      proposalContent,
    } = body

    // Validate required fields
    if (!userId || !grantTitle || !organization || !funderName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create the grant
    const [newGrant] = await db
      .insert(grantApplications)
      .values({
        userId,
        grantTitle,
        organization,
        funderName,
        focusArea,
        amount,
        deadline: deadline ? new Date(deadline) : null,
        status,
        rfpText,
        teachingMaterials,
        projectName,
        proposalContent,
      })
      .returning()

    // Log the activity
    await db.insert(activityLog).values({
      userId,
      action: `Created new grant application: ${grantTitle}`,
      entityType: 'grant',
      entityId: newGrant.id,
      details: `Organization: ${organization}`,
    })

    return NextResponse.json({ grant: newGrant }, { status: 201 })
  } catch (error) {
    console.error('Error creating grant:', error)
    return NextResponse.json({ error: 'Failed to create grant' }, { status: 500 })
  }
}
