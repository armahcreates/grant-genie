import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { grantApplications, complianceItems } from '@/db/schema'
import { eq, and, count, sum, sql } from 'drizzle-orm'

// GET /api/dashboard/stats - Get dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Get active grants count
    const activeGrantsResult = await db
      .select({ count: count() })
      .from(grantApplications)
      .where(
        and(
          eq(grantApplications.userId, userId),
          eq(grantApplications.status, 'Approved')
        )
      )

    // Get total funding secured (sum of approved grants)
    const totalFundingResult = await db
      .select({
        total: sql<string>`COALESCE(SUM(CAST(${grantApplications.amount} AS DECIMAL)), 0)`,
      })
      .from(grantApplications)
      .where(
        and(
          eq(grantApplications.userId, userId),
          eq(grantApplications.status, 'Approved')
        )
      )

    // Get compliance stats
    const totalComplianceResult = await db
      .select({ count: count() })
      .from(complianceItems)
      .where(eq(complianceItems.userId, userId))

    const completedComplianceResult = await db
      .select({ count: count() })
      .from(complianceItems)
      .where(
        and(
          eq(complianceItems.userId, userId),
          eq(complianceItems.status, 'Completed')
        )
      )

    const upcomingDeadlinesResult = await db
      .select({ count: count() })
      .from(complianceItems)
      .where(
        and(
          eq(complianceItems.userId, userId),
          sql`${complianceItems.status} IN ('Upcoming', 'Overdue')`
        )
      )

    // Calculate compliance rate
    const totalCompliance = totalComplianceResult[0]?.count || 0
    const completedCompliance = completedComplianceResult[0]?.count || 0
    const complianceRate =
      totalCompliance > 0
        ? Math.round((completedCompliance / totalCompliance) * 100)
        : 0

    const stats = {
      activeGrants: activeGrantsResult[0]?.count || 0,
      totalFunding: `$${parseInt(totalFundingResult[0]?.total || '0').toLocaleString()}`,
      upcomingDeadlines: upcomingDeadlinesResult[0]?.count || 0,
      complianceRate,
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 })
  }
}
