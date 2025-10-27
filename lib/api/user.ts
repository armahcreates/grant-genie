/**
 * User API Hooks - TanStack Query
 *
 * Query and mutation hooks for user-related data
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './client'
import { useUserStore, type PersonalInfo, type OrganizationInfo, type NotificationPreferences } from '../stores/userStore'
import { useAppToast } from '../utils/toast'

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
  const setPersonalInfo = useUserStore((state) => state.setPersonalInfo)

  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: async () => {
      const response = await apiClient<{ profile: PersonalInfo }>('/api/user/profile')
      const data = response.profile
      setPersonalInfo(data)
      return data
    },
  })
}

export function useUpdatePersonalInfo() {
  const queryClient = useQueryClient()
  const setPersonalInfo = useUserStore((state) => state.setPersonalInfo)
  const toast = useAppToast()

  return useMutation({
    mutationFn: async (data: PersonalInfo) => {
      const response = await apiClient<{ profile: PersonalInfo }>('/api/user/profile', {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
      return response.profile
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile() })
      setPersonalInfo(data)
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
  const setOrganizationInfo = useUserStore((state) => state.setOrganizationInfo)

  return useQuery({
    queryKey: userKeys.organization(),
    queryFn: async () => {
      const response = await apiClient<{ organization: OrganizationInfo }>('/api/user/organization')
      const data = response.organization
      setOrganizationInfo(data)
      return data
    },
  })
}

export function useUpdateOrganizationInfo() {
  const queryClient = useQueryClient()
  const setOrganizationInfo = useUserStore((state) => state.setOrganizationInfo)
  const toast = useAppToast()

  return useMutation({
    mutationFn: async (data: OrganizationInfo) => {
      const response = await apiClient<{ organization: OrganizationInfo }>('/api/user/organization', {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
      return response.organization
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.organization() })
      setOrganizationInfo(data)
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
  const setNotificationPreferences = useUserStore((state) => state.setNotificationPreferences)

  return useQuery({
    queryKey: userKeys.notifications(),
    queryFn: async () => {
      const response = await apiClient<{ preferences: NotificationPreferences }>('/api/user/preferences')
      const data = response.preferences
      setNotificationPreferences(data)
      return data
    },
  })
}

export function useUpdateNotificationPreferences() {
  const queryClient = useQueryClient()
  const setNotificationPreferences = useUserStore((state) => state.setNotificationPreferences)
  const toast = useAppToast()

  return useMutation({
    mutationFn: async (data: NotificationPreferences) => {
      const response = await apiClient<{ preferences: NotificationPreferences }>('/api/user/preferences', {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
      return response.preferences
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.notifications() })
      setNotificationPreferences(data)
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
  const { setOnboardingData, setIsOnboarded } = useUserStore()
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
      setOnboardingData(variables)
      setIsOnboarded(true)
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
