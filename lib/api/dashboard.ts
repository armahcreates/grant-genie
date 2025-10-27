/**
 * Dashboard API functions
 */

import { apiClient } from './client'

export interface DashboardStats {
  activeGrants: number
  totalFunding: string
  upcomingDeadlines: number
  complianceRate: number
}

export interface RecentActivity {
  id: string
  action: string
  grant: string
  user: string
  timestamp: string
}

// Fetch dashboard statistics
export async function getDashboardStats(
  userId: string
): Promise<{ stats: DashboardStats }> {
  return apiClient<{ stats: DashboardStats }>(`/api/dashboard/stats?userId=${userId}`)
}

// Fetch recent activity
export async function getRecentActivity(
  userId: string
): Promise<{ activities: RecentActivity[] }> {
  return apiClient<{ activities: RecentActivity[] }>(`/api/activity?userId=${userId}`)
}
