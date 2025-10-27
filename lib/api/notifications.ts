/**
 * Notifications API functions
 */

import { apiClient } from './client'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
}

// Fetch notifications
export async function getNotifications(
  userId: string
): Promise<{ notifications: Notification[] }> {
  return apiClient<{ notifications: Notification[] }>(`/api/notifications?userId=${userId}`)
}

// Mark notification as read
export async function markNotificationRead(id: string): Promise<void> {
  return apiClient<void>(`/api/notifications/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ read: true }),
  })
}
