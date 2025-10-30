/**
 * Compliance API Hooks - TanStack Query
 *
 * Query and mutation hooks for compliance-related data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './client'
import { useAppToast } from '../utils/toast'

export interface ComplianceItem {
  id: string
  grantName: string
  requirement: string
  dueDate: Date | string
  status: 'Completed' | 'Upcoming' | 'Overdue' | 'In Progress'
  priority: 'High' | 'Medium' | 'Low'
}

// Query Keys
export const complianceKeys = {
  all: ['compliance'] as const,
  lists: () => [...complianceKeys.all, 'list'] as const,
  list: (userId?: string) => [...complianceKeys.lists(), userId] as const,
  detail: (id: string) => [...complianceKeys.all, 'detail', id] as const,
}

// ============================================================================
// Compliance Queries
// ============================================================================

export function useCompliance(userId?: string) {
  return useQuery({
    queryKey: complianceKeys.list(userId),
    queryFn: async () => {
      if (!userId) {
        return { items: [] }
      }
      // API automatically uses authenticated user, no need to pass userId
      const response = await apiClient<{ data: ComplianceItem[] }>('/api/compliance')
      return { items: response.data || [] }
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// ============================================================================
// Compliance Mutations
// ============================================================================

export function useUploadComplianceDocument() {
  const queryClient = useQueryClient()
  const toast = useAppToast()

  return useMutation({
    mutationFn: async ({ taskId, file }: { taskId: string; file: File }) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('taskId', taskId)

      return apiClient(`/api/compliance/${taskId}/upload`, {
        method: 'POST',
        body: formData,
        headers: {}, // Let browser set Content-Type for FormData
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: complianceKeys.lists() })
      toast.complianceDocumentUploaded()
    },
    onError: (error) => {
      toast.error('Failed to upload document', error instanceof Error ? error.message : 'Please try again')
    },
  })
}

export function useUpdateComplianceStatus() {
  const queryClient = useQueryClient()
  const toast = useAppToast()

  return useMutation({
    mutationFn: async ({ id, status }: { id: string | number; status: ComplianceItem['status'] }) => {
      return apiClient(`/api/compliance`, {
        method: 'PATCH',
        body: JSON.stringify({ id, status }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: complianceKeys.lists() })
      toast.success('Status updated', 'Compliance status has been updated')
    },
    onError: (error) => {
      toast.error('Failed to update status', error instanceof Error ? error.message : 'Please try again')
    },
  })
}
