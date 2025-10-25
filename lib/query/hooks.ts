import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// ============================================================================
// Query Keys
// ============================================================================

export const queryKeys = {
  grants: {
    all: ['grants'] as const,
    list: (userId: string) => [...queryKeys.grants.all, 'list', userId] as const,
    detail: (id: number) => [...queryKeys.grants.all, 'detail', id] as const,
  },
  grantOpportunities: {
    all: ['grantOpportunities'] as const,
    list: (params?: any) => [...queryKeys.grantOpportunities.all, 'list', params] as const,
    detail: (id: number) => [...queryKeys.grantOpportunities.all, 'detail', id] as const,
  },
  donors: {
    all: ['donors'] as const,
    list: (userId: string) => [...queryKeys.donors.all, 'list', userId] as const,
    detail: (id: number) => [...queryKeys.donors.all, 'detail', id] as const,
  },
  compliance: {
    all: ['compliance'] as const,
    list: (userId: string, status?: string) =>
      [...queryKeys.compliance.all, 'list', userId, status] as const,
  },
  notifications: {
    all: ['notifications'] as const,
    list: (userId: string, unreadOnly?: boolean) =>
      [...queryKeys.notifications.all, 'list', userId, unreadOnly] as const,
  },
  bookmarks: {
    all: ['bookmarks'] as const,
    list: (userId: string) => [...queryKeys.bookmarks.all, 'list', userId] as const,
  },
  documents: {
    all: ['documents'] as const,
    list: (userId: string, entityType?: string, entityId?: number) =>
      [...queryKeys.documents.all, 'list', userId, entityType, entityId] as const,
  },
  activity: {
    all: ['activity'] as const,
    list: (userId: string) => [...queryKeys.activity.all, 'list', userId] as const,
  },
  dashboardStats: {
    all: ['dashboardStats'] as const,
    get: (userId: string) => [...queryKeys.dashboardStats.all, userId] as const,
  },
  userPreferences: {
    all: ['userPreferences'] as const,
    get: (userId: string) => [...queryKeys.userPreferences.all, userId] as const,
  },
}

// ============================================================================
// Grant Applications
// ============================================================================

export function useGrants(userId: string) {
  return useQuery({
    queryKey: queryKeys.grants.list(userId),
    queryFn: async () => {
      const res = await fetch(`/api/grants?userId=${userId}`)
      if (!res.ok) throw new Error('Failed to fetch grants')
      return res.json()
    },
    enabled: !!userId,
  })
}

export function useGrant(id: number) {
  return useQuery({
    queryKey: queryKeys.grants.detail(id),
    queryFn: async () => {
      const res = await fetch(`/api/grants/${id}`)
      if (!res.ok) throw new Error('Failed to fetch grant')
      return res.json()
    },
    enabled: !!id,
  })
}

export function useCreateGrant() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/grants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create grant')
      return res.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.grants.list(variables.userId) })
    },
  })
}

export function useUpdateGrant() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await fetch(`/api/grants/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update grant')
      return res.json()
    },
    onSuccess: (_, { id, data }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.grants.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.grants.list(data.userId) })
    },
  })
}

export function useDeleteGrant() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, userId }: { id: number; userId: string }) => {
      const res = await fetch(`/api/grants/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete grant')
      return res.json()
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.grants.list(userId) })
    },
  })
}

// ============================================================================
// Grant Opportunities
// ============================================================================

export function useGrantOpportunities(params?: {
  search?: string
  category?: string
  status?: string
  limit?: number
  offset?: number
}) {
  const queryString = new URLSearchParams(
    Object.entries(params || {})
      .filter(([_, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)])
  ).toString()

  return useQuery({
    queryKey: queryKeys.grantOpportunities.list(params),
    queryFn: async () => {
      const res = await fetch(`/api/grant-opportunities?${queryString}`)
      if (!res.ok) throw new Error('Failed to fetch grant opportunities')
      return res.json()
    },
  })
}

export function useGrantOpportunity(id: number) {
  return useQuery({
    queryKey: queryKeys.grantOpportunities.detail(id),
    queryFn: async () => {
      const res = await fetch(`/api/grant-opportunities/${id}`)
      if (!res.ok) throw new Error('Failed to fetch grant opportunity')
      return res.json()
    },
    enabled: !!id,
  })
}

export function useCreateGrantOpportunity() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/grant-opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create grant opportunity')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.grantOpportunities.all })
    },
  })
}

// ============================================================================
// Donors
// ============================================================================

export function useDonors(userId: string) {
  return useQuery({
    queryKey: queryKeys.donors.list(userId),
    queryFn: async () => {
      const res = await fetch(`/api/donors?userId=${userId}`)
      if (!res.ok) throw new Error('Failed to fetch donors')
      return res.json()
    },
    enabled: !!userId,
  })
}

export function useCreateDonor() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/donors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create donor')
      return res.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.donors.list(variables.userId) })
    },
  })
}

// ============================================================================
// Compliance
// ============================================================================

export function useCompliance(userId: string, status?: string) {
  return useQuery({
    queryKey: queryKeys.compliance.list(userId, status),
    queryFn: async () => {
      const url = `/api/compliance?userId=${userId}${status ? `&status=${status}` : ''}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch compliance items')
      return res.json()
    },
    enabled: !!userId,
  })
}

export function useCreateCompliance() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create compliance item')
      return res.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.compliance.list(variables.userId) })
    },
  })
}

export function useCompleteCompliance() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, userId }: { id: number; userId: string }) => {
      const res = await fetch('/api/compliance', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, userId }),
      })
      if (!res.ok) throw new Error('Failed to complete compliance item')
      return res.json()
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.compliance.list(userId) })
    },
  })
}

// ============================================================================
// Notifications
// ============================================================================

export function useNotifications(userId: string, unreadOnly = false) {
  return useQuery({
    queryKey: queryKeys.notifications.list(userId, unreadOnly),
    queryFn: async () => {
      const res = await fetch(
        `/api/notifications?userId=${userId}&unreadOnly=${unreadOnly}`
      )
      if (!res.ok) throw new Error('Failed to fetch notifications')
      return res.json()
    },
    enabled: !!userId,
  })
}

export function useCreateNotification() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create notification')
      return res.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.list(variables.userId) })
    },
  })
}

export function useMarkNotificationsAsRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      userId,
      notificationIds,
      markAllAsRead,
    }: {
      userId: string
      notificationIds?: number[]
      markAllAsRead?: boolean
    }) => {
      const res = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, notificationIds, markAllAsRead }),
      })
      if (!res.ok) throw new Error('Failed to mark notifications as read')
      return res.json()
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
    },
  })
}

// ============================================================================
// Bookmarks
// ============================================================================

export function useBookmarks(userId: string) {
  return useQuery({
    queryKey: queryKeys.bookmarks.list(userId),
    queryFn: async () => {
      const res = await fetch(`/api/bookmarks?userId=${userId}`)
      if (!res.ok) throw new Error('Failed to fetch bookmarks')
      return res.json()
    },
    enabled: !!userId,
  })
}

export function useCreateBookmark() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: { userId: string; grantOpportunityId: number; notes?: string }) => {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create bookmark')
      return res.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookmarks.list(variables.userId) })
    },
  })
}

export function useDeleteBookmark() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ userId, grantOpportunityId }: { userId: string; grantOpportunityId: number }) => {
      const res = await fetch(
        `/api/bookmarks?userId=${userId}&grantOpportunityId=${grantOpportunityId}`,
        {
          method: 'DELETE',
        }
      )
      if (!res.ok) throw new Error('Failed to delete bookmark')
      return res.json()
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookmarks.list(userId) })
    },
  })
}

// ============================================================================
// Documents
// ============================================================================

export function useDocuments(userId: string, entityType?: string, entityId?: number) {
  return useQuery({
    queryKey: queryKeys.documents.list(userId, entityType, entityId),
    queryFn: async () => {
      let url = `/api/documents?userId=${userId}`
      if (entityType && entityId) {
        url += `&entityType=${entityType}&entityId=${entityId}`
      }
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch documents')
      return res.json()
    },
    enabled: !!userId,
  })
}

export function useCreateDocument() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create document')
      return res.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents.list(variables.userId) })
    },
  })
}

// ============================================================================
// Activity
// ============================================================================

export function useActivity(userId: string, limit = 10) {
  return useQuery({
    queryKey: queryKeys.activity.list(userId),
    queryFn: async () => {
      const res = await fetch(`/api/activity?userId=${userId}&limit=${limit}`)
      if (!res.ok) throw new Error('Failed to fetch activity')
      return res.json()
    },
    enabled: !!userId,
  })
}

// ============================================================================
// Dashboard Stats
// ============================================================================

export function useDashboardStats(userId: string) {
  return useQuery({
    queryKey: queryKeys.dashboardStats.get(userId),
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/stats?userId=${userId}`)
      if (!res.ok) throw new Error('Failed to fetch dashboard stats')
      return res.json()
    },
    enabled: !!userId,
  })
}

// ============================================================================
// User Preferences
// ============================================================================

export function useUserPreferences(userId: string) {
  return useQuery({
    queryKey: queryKeys.userPreferences.get(userId),
    queryFn: async () => {
      const res = await fetch(`/api/user/preferences?userId=${userId}`)
      if (!res.ok) throw new Error('Failed to fetch user preferences')
      return res.json()
    },
    enabled: !!userId,
  })
}

export function useUpdateUserPreferences() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update user preferences')
      return res.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userPreferences.get(variables.userId) })
    },
  })
}
