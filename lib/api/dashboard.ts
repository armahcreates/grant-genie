/**
 * Dashboard API Hooks - TanStack Query
 *
 * Query and mutation hooks for dashboard data
 */

import { useQuery } from '@tanstack/react-query'
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

export interface FundingByCategory {
  category: string
  amount: string
  percentage: number
}

export interface GrantReport {
  name: string
  amount: string
  status: 'Active' | 'Completed' | 'Pending'
  progress: number
  endDate: string
}

// Query Keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: (userId?: string) => [...dashboardKeys.all, 'stats', userId] as const,
  activity: (userId?: string) => [...dashboardKeys.all, 'activity', userId] as const,
  funding: (userId?: string) => [...dashboardKeys.all, 'funding', userId] as const,
  reports: (userId?: string) => [...dashboardKeys.all, 'reports', userId] as const,
}

// ============================================================================
// Dashboard Queries
// ============================================================================

export function useDashboardStats(userId?: string) {
  return useQuery({
    queryKey: dashboardKeys.stats(userId),
    queryFn: async () => {
      if (!userId) {
        return { stats: { activeGrants: 0, totalFunding: '$0', upcomingDeadlines: 0, complianceRate: 0 } }
      }
      const response = await apiClient<{ stats: DashboardStats }>(`/api/dashboard/stats?userId=${userId}`)
      return response
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useRecentActivity(userId?: string) {
  return useQuery({
    queryKey: dashboardKeys.activity(userId),
    queryFn: async () => {
      if (!userId) {
        return { activities: [] }
      }
      const response = await apiClient<{ activities: RecentActivity[] }>(`/api/activity?userId=${userId}`)
      return response
    },
    enabled: !!userId,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

export function useFundingByCategory(userId?: string) {
  return useQuery({
    queryKey: dashboardKeys.funding(userId),
    queryFn: async () => {
      if (!userId) {
        return { funding: [] }
      }
      const response = await apiClient<{ funding: FundingByCategory[] }>(`/api/reporting/funding-by-category?userId=${userId}`)
      return response
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useGrantReports(userId?: string) {
  return useQuery({
    queryKey: dashboardKeys.reports(userId),
    queryFn: async () => {
      if (!userId) {
        return { reports: [] }
      }
      const response = await apiClient<{ reports: GrantReport[] }>(`/api/reporting/grant-reports?userId=${userId}`)
      return response
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
