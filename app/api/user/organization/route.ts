import { NextRequest } from 'next/server'
import { db } from '@/db'
import { organizationProfiles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'

// GET /api/user/organization - Get organization profile for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    const [organization] = await db
      .select()
      .from(organizationProfiles)
      .where(eq(organizationProfiles.userId, user!.id))
      .limit(1)

    if (!organization) {
      return errorResponse('Organization profile not found', 404)
    }

    // Transform to match OrganizationInfo interface
    const organizationInfo = {
      orgName: organization.legalName || '',
      orgType: organization.type || '',
      taxId: organization.ein || '',
      orgWebsite: organization.website || '',
      orgPhone: organization.phone || '',
      orgEmail: organization.email || '',
    }

    return NextResponse.json(successResponse(organizationInfo))
  } catch (error) {
    console.error('Error fetching organization profile:', error)
    return errorResponse('An unexpected error occurred while fetching organization profile', 500)
  }
}

// PATCH /api/user/organization - Update organization profile for authenticated user
export async function PATCH(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    let body
    try {
      body = await request.json()
    } catch {
      return errorResponse('Invalid JSON in request body', 400)
    }

    const {
      orgName,
      orgType,
      taxId,
      orgWebsite,
      orgPhone,
      orgEmail,
    } = body

    // Build update object
    const updateData: any = {
      updatedAt: new Date(),
    }

    if (orgName !== undefined) updateData.legalName = orgName.trim()
    if (orgType !== undefined) updateData.type = orgType.trim()
    if (taxId !== undefined) updateData.ein = taxId.trim()
    if (orgWebsite !== undefined) updateData.website = orgWebsite.trim()
    if (orgPhone !== undefined) updateData.phone = orgPhone.trim()
    if (orgEmail !== undefined) updateData.email = orgEmail.trim()

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
      if (!orgName) {
        return errorResponse('orgName is required when creating a new organization profile', 400)
      }

      const [created] = await db
        .insert(organizationProfiles)
        .values({
          userId: user!.id,
          legalName: orgName,
          ...updateData,
        })
        .returning()

      updatedOrganization = created
    }

    if (!updatedOrganization) {
      return errorResponse('Failed to update organization profile', 500)
    }

    // Transform to match OrganizationInfo interface
    const organizationInfo = {
      orgName: updatedOrganization.legalName || '',
      orgType: updatedOrganization.type || '',
      taxId: updatedOrganization.ein || '',
      orgWebsite: updatedOrganization.website || '',
      orgPhone: updatedOrganization.phone || '',
      orgEmail: updatedOrganization.email || '',
    }

    return NextResponse.json(successResponse(organizationInfo))
  } catch (error) {
    console.error('Error updating organization profile:', error)
    return errorResponse('An unexpected error occurred while updating organization profile', 500)
  }
}
