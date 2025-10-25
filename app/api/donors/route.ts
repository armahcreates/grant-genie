import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { donors, activityLog } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'

// GET /api/donors - List all donors for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const donorsList = await db
      .select()
      .from(donors)
      .where(eq(donors.userId, userId))
      .orderBy(desc(donors.createdAt))

    return NextResponse.json({ donors: donorsList })
  } catch (error) {
    console.error('Error fetching donors:', error)
    return NextResponse.json({ error: 'Failed to fetch donors' }, { status: 500 })
  }
}

// POST /api/donors - Create a new donor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      name,
      email,
      phone,
      organization,
      title,
      address,
      city,
      state,
      zipCode,
      donorType,
      totalContributions,
      relationshipStatus,
      interests,
      notes,
      lastContactDate,
      nextFollowUpDate,
      rating,
    } = body

    // Validate required fields
    if (!userId || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, name' },
        { status: 400 }
      )
    }

    // Create the donor
    const [newDonor] = await db
      .insert(donors)
      .values({
        userId,
        name,
        email,
        phone,
        organization,
        title,
        address,
        city,
        state,
        zipCode,
        donorType,
        totalContributions,
        relationshipStatus,
        interests,
        notes,
        lastContactDate: lastContactDate ? new Date(lastContactDate) : null,
        nextFollowUpDate: nextFollowUpDate ? new Date(nextFollowUpDate) : null,
        rating,
      })
      .returning()

    // Log the activity
    await db.insert(activityLog).values({
      userId,
      action: `Added new donor: ${name}`,
      entityType: 'donor',
      entityId: newDonor.id,
      details: `Type: ${donorType || 'N/A'}`,
    })

    return NextResponse.json({ donor: newDonor }, { status: 201 })
  } catch (error) {
    console.error('Error creating donor:', error)
    return NextResponse.json({ error: 'Failed to create donor' }, { status: 500 })
  }
}
