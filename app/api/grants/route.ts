import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { grantApplications, activityLog } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'

// GET /api/grants - List all grants for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    // Get pagination parameters
    const searchParams = request.nextUrl.searchParams
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')))
    const offset = (page - 1) * limit

    // Fetch grants for authenticated user only
    const grants = await db
      .select()
      .from(grantApplications)
      .where(eq(grantApplications.userId, user!.id))
      .orderBy(desc(grantApplications.createdAt))
      .limit(limit)
      .offset(offset)

    // Get total count for pagination
    const totalResult = await db
      .select({ count: grantApplications.id })
      .from(grantApplications)
      .where(eq(grantApplications.userId, user!.id))

    const total = totalResult.length

    return NextResponse.json({
      grants,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching grants:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching grants' },
      { status: 500 }
    )
  }
}

// POST /api/grants - Create a new grant application
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const body = await request.json()
    const {
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
    if (!grantTitle || !organization || !funderName) {
      return NextResponse.json(
        { error: 'Missing required fields: grantTitle, organization, and funderName are required' },
        { status: 400 }
      )
    }

    // Validate grant title length
    if (grantTitle.length > 500) {
      return NextResponse.json(
        { error: 'Grant title must be 500 characters or less' },
        { status: 400 }
      )
    }

    // Create the grant for authenticated user
    const [newGrant] = await db
      .insert(grantApplications)
      .values({
        userId: user!.id, // Use authenticated user's ID, not from request body
        grantTitle: grantTitle.trim(),
        organization: organization.trim(),
        funderName: funderName.trim(),
        focusArea: focusArea?.trim(),
        amount: amount?.trim(),
        deadline: deadline ? new Date(deadline) : null,
        status,
        rfpText,
        teachingMaterials,
        projectName: projectName?.trim(),
        proposalContent,
      })
      .returning()

    // Log the activity
    await db.insert(activityLog).values({
      userId: user!.id,
      action: `Created new grant application: ${grantTitle}`,
      entityType: 'grant',
      entityId: newGrant.id,
      details: `Organization: ${organization}`,
    })

    return NextResponse.json({ grant: newGrant }, { status: 201 })
  } catch (error) {
    console.error('Error creating grant:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while creating the grant' },
      { status: 500 }
    )
  }
}
