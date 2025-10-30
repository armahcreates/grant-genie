/**
 * User API Hooks - TanStack Query
 *
 * Query and mutation hooks for user-related data
 * 
 * NOTE: Server state is managed by TanStack Query only.
 * Do NOT sync to Zustand stores - TanStack Query is the single source of truth.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './client'
import { useAppToast } from '../utils/toast'

// Re-export types for convenience (these should come from API responses, not Zustand)
export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  jobTitle: string
  bio?: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
}

export interface OrganizationInfo {
  orgName: string
  orgType: string
  taxId: string
  orgWebsite?: string
  orgPhone: string
  orgEmail: string
}

export interface NotificationPreferences {
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  deadlineReminders: boolean
  complianceAlerts: boolean
  grantMatches: boolean
  weeklyDigest: boolean
}

// Query Keys
export const userKeys = {
  all: ['user'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
  organization: () => [...userKeys.all, 'organization'] as const,
  notifications: () => [...userKeys.all, 'notifications'] as const,
  onboarding: () => [...userKeys.all, 'onboarding'] as const,
}

// ============================================================================
// Personal Info Queries and Mutations
// ============================================================================

export function usePersonalInfo() {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: async () => {
      const response = await apiClient<{ data: PersonalInfo }>('/api/user/profile')
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useUpdatePersonalInfo() {
  const queryClient = useQueryClient()
  const toast = useAppToast()

  return useMutation({
    mutationFn: async (data: PersonalInfo) => {
      const response = await apiClient<{ data: PersonalInfo }>('/api/user/profile', {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
      return response.data
    },
    onSuccess: (data) => {
      // Invalidate and refetch - TanStack Query handles state
      queryClient.setQueryData(userKeys.profile(), data)
      queryClient.invalidateQueries({ queryKey: userKeys.profile() })
      toast.success('Profile updated', 'Your personal information has been saved successfully')
    },
    onError: (error) => {
      toast.error('Failed to update profile', error instanceof Error ? error.message : 'Please try again')
    },
  })
}

// ============================================================================
// Organization Info Queries and Mutations
// ============================================================================

export function useOrganizationInfo() {
  return useQuery({
    queryKey: userKeys.organization(),
    queryFn: async () => {
      const response = await apiClient<{ data: OrganizationInfo }>('/api/user/organization')
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useUpdateOrganizationInfo() {
  const queryClient = useQueryClient()
  const toast = useAppToast()

  return useMutation({
    mutationFn: async (data: OrganizationInfo) => {
      const response = await apiClient<{ data: OrganizationInfo }>('/api/user/organization', {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
      return response.data
    },
    onSuccess: (data) => {
      // TanStack Query handles state - no Zustand sync needed
      queryClient.setQueryData(userKeys.organization(), data)
      queryClient.invalidateQueries({ queryKey: userKeys.organization() })
      toast.success('Organization updated', 'Your organization details have been saved successfully')
    },
    onError: (error) => {
      toast.error('Failed to update organization', error instanceof Error ? error.message : 'Please try again')
    },
  })
}

// ============================================================================
// Notification Preferences Queries and Mutations
// ============================================================================

export function useNotificationPreferences() {
  return useQuery({
    queryKey: userKeys.notifications(),
    queryFn: async () => {
      const response = await apiClient<{ data: NotificationPreferences }>('/api/user/preferences')
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useUpdateNotificationPreferences() {
  const queryClient = useQueryClient()
  const toast = useAppToast()

  return useMutation({
    mutationFn: async (data: NotificationPreferences) => {
      const response = await apiClient<{ data: NotificationPreferences }>('/api/user/preferences', {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
      return response.data
    },
    onSuccess: (data) => {
      // TanStack Query handles state
      queryClient.setQueryData(userKeys.notifications(), data)
      queryClient.invalidateQueries({ queryKey: userKeys.notifications() })
      toast.success('Preferences updated', 'Your notification preferences have been saved')
    },
    onError: (error) => {
      toast.error('Failed to update preferences', error instanceof Error ? error.message : 'Please try again')
    },
  })
}

// ============================================================================
// Onboarding Mutations
// ============================================================================

export function useCompleteOnboarding() {
  const queryClient = useQueryClient()
  const toast = useAppToast()

  return useMutation({
    mutationFn: async (data: {
      fullName: string
      organizationName: string
      organizationType: string
      role: string
      goals: string[]
    }) => {
      return apiClient('/api/user/onboarding', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },
    onSuccess: () => {
      // Invalidate all user queries to refetch
      queryClient.invalidateQueries({ queryKey: userKeys.all })
      toast.success('Welcome aboard!', 'Your account is now set up')
    },
    onError: (error) => {
      toast.error('Onboarding failed', error instanceof Error ? error.message : 'Please try again')
    },
  })
}

// ============================================================================
// Password Update Mutation
// ============================================================================

export function useUpdatePassword() {
  const toast = useAppToast()

  return useMutation({
    mutationFn: async (data: {
      currentPassword: string
      newPassword: string
    }) => {
      return apiClient('/api/user/password', {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
    },
    onSuccess: () => {
      toast.success('Password updated', 'Your password has been changed successfully')
    },
    onError: (error) => {
      toast.error('Failed to update password', error instanceof Error ? error.message : 'Please try again')
    },
  })
}
