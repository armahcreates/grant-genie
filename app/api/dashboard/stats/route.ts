import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { grantApplications, complianceItems } from '@/db/schema'
import { eq, and, count, sql } from 'drizzle-orm'
import { requireAuth } from '@/lib/middleware/auth'
import { moderateRateLimit } from '@/lib/middleware/rate-limit'
import { successResponse, errorResponse } from '@/lib/api/response'

// GET /api/dashboard/stats - Get dashboard statistics for authenticated user
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitError = await moderateRateLimit(request)
    if (rateLimitError) return rateLimitError

    // Authenticate user
    const { error, user } = await requireAuth(request)
    if (error) return error

    // Optimize: Single query with CTEs instead of 5 separate queries
    const statsResult = await db.execute(sql`
      WITH grant_stats AS (
        SELECT 
          COUNT(*) FILTER (WHERE status = 'Approved') as active_grants,
          COALESCE(SUM(CAST(amount AS DECIMAL)), 0) as total_funding
        FROM grant_applications
        WHERE user_id = ${user!.id} AND status = 'Approved'
      ),
      compliance_stats AS (
        SELECT 
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE status = 'Completed') as completed,
          COUNT(*) FILTER (WHERE status IN ('Upcoming', 'Overdue')) as upcoming
        FROM compliance_items
        WHERE user_id = ${user!.id}
      )
      SELECT 
        gs.active_grants::integer,
        gs.total_funding::text,
        cs.total::integer as total_compliance,
        cs.completed::integer as completed_compliance,
        cs.upcoming::integer as upcoming_deadlines
      FROM grant_stats gs, compliance_stats cs
    `)

    const statsRow = statsResult.rows[0] as {
      active_grants?: string | number
      total_funding?: string | number
      total_compliance?: string | number
      completed_compliance?: string | number
      upcoming_deadlines?: string | number
    } | undefined

    // Calculate compliance rate
    const totalCompliance = parseInt(String(statsRow?.total_compliance || '0'))
    const completedCompliance = parseInt(String(statsRow?.completed_compliance || '0'))
    const complianceRate =
      totalCompliance > 0
        ? Math.round((completedCompliance / totalCompliance) * 100)
        : 0

    const stats = {
      activeGrants: parseInt(String(statsRow?.active_grants || '0')),
      totalFunding: `$${parseInt(String(statsRow?.total_funding || '0')).toLocaleString()}`,
      upcomingDeadlines: parseInt(String(statsRow?.upcoming_deadlines || '0')),
      complianceRate,
    }

    return NextResponse.json(successResponse(stats))
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return errorResponse('An unexpected error occurred while fetching dashboard stats', 500)
  }
}
