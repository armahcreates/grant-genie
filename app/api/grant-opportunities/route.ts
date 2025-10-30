import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { grantOpportunities } from '@/db/schema'
import { desc, eq, and, like, or } from 'drizzle-orm'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { requireAuth } from '@/lib/middleware/auth'
import { successResponse, errorResponse } from '@/lib/api/response'
import { createGrantOpportunitySchema } from '@/lib/validation/zod-schemas'

// GET /api/grant-opportunities - Search and list grant opportunities (public endpoint)
export async function GET(request: NextRequest) {
  try {
    // Rate limiting (public endpoint, so moderate rate limit)
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

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

    return NextResponse.json(successResponse(opportunities))
  } catch (error) {
    console.error('Error fetching grant opportunities:', error)
    return errorResponse('Failed to fetch grant opportunities', 500)
  }
}

// POST /api/grant-opportunities - Create a new grant opportunity (requires auth)
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user (POST requires auth)
    const { error, user } = await requireAuth(request)
    if (error) return error

    // Parse and validate request body
    let body
    try {
      body = await request.json()
    } catch {
      return errorResponse('Invalid JSON in request body', 400)
    }

    const validationResult = createGrantOpportunitySchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        'Invalid request data',
        400,
        validationResult.error.issues
      )
    }

    const validatedData = validationResult.data

    // Create the grant opportunity
    const [newOpportunity] = await db
      .insert(grantOpportunities)
      .values({
        title: validatedData.title.trim(),
        organization: validatedData.organization.trim(),
        description: validatedData.description.trim(),
        amount: validatedData.amount?.trim() || null,
        minAmount: validatedData.minAmount?.trim() || null,
        maxAmount: validatedData.maxAmount?.trim() || null,
        deadline: validatedData.deadline ? new Date(validatedData.deadline) : null,
        category: validatedData.category.trim(),
        focusAreas: validatedData.focusAreas || null,
        eligibility: validatedData.eligibility?.trim() || null,
        geographicScope: validatedData.geographicScope?.trim() || null,
        location: validatedData.location?.trim() || null,
        status: validatedData.status || 'Open',
        matchScore: validatedData.matchScore || null,
        sourceUrl: validatedData.sourceUrl?.trim() || null,
        applicationUrl: validatedData.applicationUrl?.trim() || null,
        contactEmail: validatedData.contactEmail?.trim() || null,
        contactPhone: validatedData.contactPhone?.trim() || null,
        requirements: validatedData.requirements?.trim() || null,
        guidelines: validatedData.guidelines?.trim() || null,
      })
      .returning()

    return NextResponse.json(successResponse(newOpportunity), { status: 201 })
  } catch (error) {
    console.error('Error creating grant opportunity:', error)
    return errorResponse('Failed to create grant opportunity', 500)
  }
}
