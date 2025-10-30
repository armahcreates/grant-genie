/**
 * Server-side data fetching utilities for TanStack Query
 * 
 * Use these functions in Server Components to prefetch data
 */

import { QueryClient } from '@tanstack/react-query'
import { cookies } from 'next/headers'
import { stackServerApp } from '@/lib/stack'
import { apiClient } from '@/lib/api/client'

/**
 * Create a query client for server-side fetching
 */
export function getServerQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: false, // Don't retry on server
      },
    },
  })
}

/**
 * Prefetch dashboard stats on the server
 */
export async function prefetchDashboardStats() {
  const queryClient = getServerQueryClient()
  
  try {
    // Get authenticated user
    const cookieStore = await cookies()
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return queryClient
    }

    await queryClient.prefetchQuery({
      queryKey: ['dashboard', 'stats', user.id],
      queryFn: async () => {
        // Server-side fetch - use absolute URL or direct DB access
        const { env } = await import('@/lib/env')
        const response = await fetch(`${env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/dashboard/stats`, {
          headers: {
            Cookie: cookieStore.toString(),
          },
        })
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        return data.data
      },
    })
  } catch (error) {
    console.error('Error prefetching dashboard stats:', error)
  }

  return queryClient
}

/**
 * Prefetch grant applications on the server
 */
export async function prefetchGrantApplications() {
  const queryClient = getServerQueryClient()
  
  try {
    const cookieStore = await cookies()
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return queryClient
    }

    await queryClient.prefetchQuery({
      queryKey: ['grants', 'applications'],
      queryFn: async () => {
        const { env } = await import('@/lib/env')
        const response = await fetch(`${env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/grants`, {
          headers: {
            Cookie: cookieStore.toString(),
          },
        })
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        return data.data || []
      },
    })
  } catch (error) {
    console.error('Error prefetching grant applications:', error)
  }

  return queryClient
}

/**
 * Prefetch compliance items on the server
 */
export async function prefetchCompliance(userId?: string) {
  const queryClient = getServerQueryClient()
  
  try {
    const cookieStore = await cookies()
    const user = await stackServerApp.getUser()
    
    if (!user || !userId) {
      return queryClient
    }

    await queryClient.prefetchQuery({
      queryKey: ['compliance', 'list', userId],
      queryFn: async () => {
        const { env } = await import('@/lib/env')
        const response = await fetch(`${env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/compliance`, {
          headers: {
            Cookie: cookieStore.toString(),
          },
        })
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        return { items: data.data || [] }
      },
    })
  } catch (error) {
    console.error('Error prefetching compliance:', error)
  }

  return queryClient
}

/**
 * Prefetch recent activity on the server
 */
export async function prefetchRecentActivity(userId?: string) {
  const queryClient = getServerQueryClient()
  
  try {
    const cookieStore = await cookies()
    const user = await stackServerApp.getUser()
    
    if (!user || !userId) {
      return queryClient
    }

    await queryClient.prefetchQuery({
      queryKey: ['dashboard', 'activity', userId],
      queryFn: async () => {
        const { env } = await import('@/lib/env')
        const response = await fetch(`${env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/activity`, {
          headers: {
            Cookie: cookieStore.toString(),
          },
        })
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        return { activities: data.data || [] }
      },
    })
  } catch (error) {
    console.error('Error prefetching recent activity:', error)
  }

  return queryClient
}

