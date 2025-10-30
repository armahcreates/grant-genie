/**
 * Grants API Hooks - TanStack Query
 *
 * Query and mutation hooks for grant-related data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './client'
import { useAppToast } from '../utils/toast'

export interface Grant {
  id: string
  title: string
  organization: string
  description: string
  amount: string
  deadline: string
  category: string
  status: string
  matchScore: number
  eligibility: string[]
  location?: string
  type?: string
}

export interface GrantApplication {
  id: number
  userId: string
  grantOpportunityId?: number
  grantTitle: string
  organization: string
  funderName: string
  focusArea?: string
  amount?: string
  deadline?: Date | string
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected'
  rfpText?: string
  teachingMaterials?: string
  projectName?: string
  proposalContent?: string
  submittedAt?: Date | string
  approvedAt?: Date | string
  rejectedAt?: Date | string
  rejectionReason?: string
  awardAmount?: string
  projectStartDate?: Date | string
  projectEndDate?: Date | string
  createdAt: Date | string
  updatedAt: Date | string
}

// Query Keys
export const grantKeys = {
  all: ['grants'] as const,
  lists: () => [...grantKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...grantKeys.lists(), filters] as const,
  details: () => [...grantKeys.all, 'detail'] as const,
  detail: (id: string) => [...grantKeys.details(), id] as const,
  applications: () => [...grantKeys.all, 'applications'] as const,
  application: (id: string) => [...grantKeys.applications(), id] as const,
}

// ============================================================================
// Grant Search/List Queries
// ============================================================================

export function useGrants(filters?: Record<string, any>) {
  return useQuery({
    queryKey: grantKeys.list(filters || {}),
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '' && value !== 'all') {
            if (typeof value === 'object') {
              params.append(key, JSON.stringify(value))
            } else {
              params.append(key, String(value))
            }
          }
        })
      }
      const response = await apiClient<{ opportunities: Grant[] }>(`/api/grant-opportunities?${params.toString()}`)
      return response.opportunities
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useGrantDetail(grantId: string) {
  return useQuery({
    queryKey: grantKeys.detail(grantId),
    queryFn: async () => {
      const response = await apiClient<{ opportunity: Grant }>(`/api/grant-opportunities/${grantId}`)
      return response.opportunity
    },
    enabled: !!grantId,
  })
}

// ============================================================================
// Grant Applications
// ============================================================================

export function useGrantApplications() {
  return useQuery({
    queryKey: grantKeys.applications(),
    queryFn: async () => {
      // API automatically uses authenticated user and returns standardized response
      const response = await apiClient<{ data: GrantApplication[]; pagination?: any }>('/api/grants')
      return response.data || []
    },
  })
}

export function useGrantApplication(applicationId: string) {
  return useQuery({
    queryKey: grantKeys.application(applicationId),
    queryFn: async () => {
      // API automatically uses authenticated user and returns standardized response
      const response = await apiClient<{ data: GrantApplication }>(`/api/grants/${applicationId}`)
      return response.data
    },
    enabled: !!applicationId,
  })
}

// ============================================================================
// Grant Application Mutations
// ============================================================================

export function useCreateGrantApplication() {
  const queryClient = useQueryClient()
  const toast = useAppToast()

  return useMutation({
    mutationFn: async (data: Partial<GrantApplication>) => {
      const response = await apiClient<{ data: GrantApplication }>('/api/grants', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: grantKeys.applications() })
      toast.success('Application started', 'Your grant application has been created')
    },
    onError: (error) => {
      toast.error('Failed to create application', error instanceof Error ? error.message : 'Please try again')
    },
  })
}

export function useUpdateGrantApplication() {
  const queryClient = useQueryClient()
  const toast = useAppToast()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<GrantApplication> }) => {
      const response = await apiClient<{ data: GrantApplication }>(`/api/grants/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: grantKeys.application(variables.id) })
      queryClient.invalidateQueries({ queryKey: grantKeys.applications() })
      toast.success('Application updated', 'Your changes have been saved')
    },
    onError: (error) => {
      toast.error('Failed to update application', error instanceof Error ? error.message : 'Please try again')
    },
  })
}

export function useSubmitGrantApplication() {
  const queryClient = useQueryClient()
  const toast = useAppToast()

  return useMutation({
    mutationFn: async (applicationId: string) => {
      // Submit by updating status to 'submitted'
      const response = await apiClient<{ data: GrantApplication }>(`/api/grants/${applicationId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'submitted' }),
      })
      return response.data
    },
    onSuccess: (_, applicationId) => {
      queryClient.invalidateQueries({ queryKey: grantKeys.application(applicationId) })
      queryClient.invalidateQueries({ queryKey: grantKeys.applications() })
      toast.success('Application submitted', 'Your grant application has been submitted for review')
    },
    onError: (error) => {
      toast.error('Failed to submit application', error instanceof Error ? error.message : 'Please try again')
    },
  })
}

export function useDeleteGrantApplication() {
  const queryClient = useQueryClient()
  const toast = useAppToast()

  return useMutation({
    mutationFn: async (applicationId: string) => {
      return apiClient(`/api/grants/${applicationId}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: grantKeys.applications() })
      toast.success('Application deleted', 'The grant application has been removed')
    },
    onError: (error) => {
      toast.error('Failed to delete application', error instanceof Error ? error.message : 'Please try again')
    },
  })
}
