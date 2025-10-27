/**
 * Notifications API Hooks - TanStack Query
 *
 * Query and mutation hooks for notifications data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './client'
import { useAppToast } from '../utils/toast'

export interface Notification {
  id: string
  type: 'critical' | 'update' | 'info'
  title: string
  message: string
  timestamp: string
  read: boolean
}

// Query Keys
export const notificationKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  list: (userId?: string) => [...notificationKeys.lists(), userId] as const,
  detail: (id: string) => [...notificationKeys.all, 'detail', id] as const,
}

// ============================================================================
// Notification Queries
// ============================================================================

export function useNotifications(userId?: string) {
  return useQuery({
    queryKey: notificationKeys.list(userId),
    queryFn: async () => {
      if (!userId) {
        return { notifications: [] }
      }
      const response = await apiClient<{ notifications: Notification[] }>(`/api/notifications?userId=${userId}`)
      return response
    },
    enabled: !!userId,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

// ============================================================================
// Notification Mutations
// ============================================================================

export function useMarkNotificationRead() {
  const queryClient = useQueryClient()
  const toast = useAppToast()

  return useMutation({
    mutationFn: async (notificationId: string) => {
      return apiClient(`/api/notifications/${notificationId}`, {
        method: 'PATCH',
        body: JSON.stringify({ read: true }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() })
    },
    onError: (error) => {
      toast.error('Failed to mark notification as read', error instanceof Error ? error.message : 'Please try again')
    },
  })
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient()
  const toast = useAppToast()

  return useMutation({
    mutationFn: async () => {
      return apiClient('/api/notifications/mark-all-read', {
        method: 'POST',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() })
      toast.success('All notifications marked as read', '')
    },
    onError: (error) => {
      toast.error('Failed to mark all as read', error instanceof Error ? error.message : 'Please try again')
    },
  })
}
