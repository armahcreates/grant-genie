import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { organizationProfiles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'

// GET /api/user/organization - Get organization profile for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const [organization] = await db
      .select()
      .from(organizationProfiles)
      .where(eq(organizationProfiles.userId, user!.id))
      .limit(1)

    if (!organization) {
      return NextResponse.json(
        { organization: null, message: 'No organization profile found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ organization })
  } catch (error) {
    console.error('Error fetching organization profile:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching organization profile' },
      { status: 500 }
    )
  }
}

// PATCH /api/user/organization - Update organization profile for authenticated user
export async function PATCH(request: NextRequest) {
  try {
    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const body = await request.json()
    const {
      legalName,
      ein,
      address,
      city,
      state,
      zipCode,
      phone,
      website,
      missionStatement,
      yearEstablished,
      annualBudget,
      staffCount,
      boardSize,
      serviceArea,
      populationServed,
      programAreas,
      logo,
    } = body

    // Build update object with only provided fields
    const updateData: any = {
      updatedAt: new Date(),
    }

    if (legalName !== undefined) updateData.legalName = legalName.trim()
    if (ein !== undefined) updateData.ein = ein.trim()
    if (address !== undefined) updateData.address = address.trim()
    if (city !== undefined) updateData.city = city.trim()
    if (state !== undefined) updateData.state = state.trim()
    if (zipCode !== undefined) updateData.zipCode = zipCode.trim()
    if (phone !== undefined) updateData.phone = phone.trim()
    if (website !== undefined) updateData.website = website.trim()
    if (missionStatement !== undefined) updateData.missionStatement = missionStatement.trim()
    if (yearEstablished !== undefined) updateData.yearEstablished = yearEstablished
    if (annualBudget !== undefined) updateData.annualBudget = annualBudget
    if (staffCount !== undefined) updateData.staffCount = staffCount
    if (boardSize !== undefined) updateData.boardSize = boardSize
    if (serviceArea !== undefined) updateData.serviceArea = serviceArea.trim()
    if (populationServed !== undefined) updateData.populationServed = populationServed.trim()
    if (programAreas !== undefined) updateData.programAreas = programAreas
    if (logo !== undefined) updateData.logo = logo.trim()

    // Check if organization profile exists
    const [existing] = await db
      .select()
      .from(organizationProfiles)
      .where(eq(organizationProfiles.userId, user!.id))
      .limit(1)

    let updatedOrganization

    if (existing) {
      // Update existing organization profile
      const [updated] = await db
        .update(organizationProfiles)
        .set(updateData)
        .where(eq(organizationProfiles.userId, user!.id))
        .returning()

      updatedOrganization = updated
    } else {
      // Create new organization profile if it doesn't exist
      if (!legalName) {
        return NextResponse.json(
          { error: 'legalName is required when creating a new organization profile' },
          { status: 400 }
        )
      }

      const [created] = await db
        .insert(organizationProfiles)
        .values({
          userId: user!.id,
          legalName,
          ...updateData,
        })
        .returning()

      updatedOrganization = created
    }

    if (!updatedOrganization) {
      return NextResponse.json(
        { error: 'Failed to update organization profile' },
        { status: 500 }
      )
    }

    return NextResponse.json({ organization: updatedOrganization })
  } catch (error) {
    console.error('Error updating organization profile:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while updating organization profile' },
      { status: 500 }
    )
  }
}
