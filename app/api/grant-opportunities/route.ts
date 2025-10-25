import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { grantOpportunities } from '@/db/schema'
import { desc, eq, and, like, or, sql } from 'drizzle-orm'

// GET /api/grant-opportunities - Search and list grant opportunities
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const searchQuery = searchParams.get('search')
    const category = searchParams.get('category')
    const status = searchParams.get('status') || 'Open'
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = db.select().from(grantOpportunities).$dynamic()

    // Build WHERE conditions
    const conditions = []

    if (status && status !== 'all') {
      conditions.push(eq(grantOpportunities.status, status))
    }

    if (category && category !== 'all' && category !== 'all categories') {
      conditions.push(eq(grantOpportunities.category, category))
    }

    if (searchQuery) {
      conditions.push(
        or(
          like(grantOpportunities.title, `%${searchQuery}%`),
          like(grantOpportunities.organization, `%${searchQuery}%`),
          like(grantOpportunities.description, `%${searchQuery}%`)
        )
      )
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions))
    }

    const opportunities = await query
      .orderBy(desc(grantOpportunities.createdAt))
      .limit(limit)
      .offset(offset)

    return NextResponse.json({ opportunities })
  } catch (error) {
    console.error('Error fetching grant opportunities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch grant opportunities' },
      { status: 500 }
    )
  }
}

// POST /api/grant-opportunities - Create a new grant opportunity
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      organization,
      description,
      amount,
      minAmount,
      maxAmount,
      deadline,
      category,
      focusAreas,
      eligibility,
      geographicScope,
      location,
      status,
      matchScore,
      sourceUrl,
      applicationUrl,
      contactEmail,
      contactPhone,
      requirements,
      guidelines,
    } = body

    // Validate required fields
    if (!title || !organization || !description || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, organization, description, category' },
        { status: 400 }
      )
    }

    // Create the grant opportunity
    const [newOpportunity] = await db
      .insert(grantOpportunities)
      .values({
        title,
        organization,
        description,
        amount,
        minAmount,
        maxAmount,
        deadline: deadline ? new Date(deadline) : null,
        category,
        focusAreas,
        eligibility,
        geographicScope,
        location,
        status: status || 'Open',
        matchScore,
        sourceUrl,
        applicationUrl,
        contactEmail,
        contactPhone,
        requirements,
        guidelines,
      })
      .returning()

    return NextResponse.json({ opportunity: newOpportunity }, { status: 201 })
  } catch (error) {
    console.error('Error creating grant opportunity:', error)
    return NextResponse.json(
      { error: 'Failed to create grant opportunity' },
      { status: 500 }
    )
  }
}
