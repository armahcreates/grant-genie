/**
 * React hooks for dashboard data fetching
 */

import { useState, useEffect } from 'react'
import { getDashboardStats, getRecentActivity, type DashboardStats, type RecentActivity } from '@/lib/api/dashboard'

export function useDashboardStats(userId: string | undefined) {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setIsLoading(false)
      return
    }

    const fetchStats = async () => {
      try {
        setIsLoading(true)
        const { stats: data } = await getDashboardStats(userId)
        setStats(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard stats')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [userId])

  return { stats, isLoading, error }
}

export function useRecentActivity(userId: string | undefined) {
  const [activities, setActivities] = useState<RecentActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setIsLoading(false)
      return
    }

    const fetchActivity = async () => {
      try {
        setIsLoading(true)
        const { activities: data } = await getRecentActivity(userId)
        setActivities(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activity')
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivity()
  }, [userId])

  return { activities, isLoading, error }
}
