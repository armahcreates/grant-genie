/**
 * Consolidated Stores - Zustand
 * 
 * UI and Client State Management Only
 * Server state is managed by TanStack Query
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// ============================================================================
// UI Store - Global UI state (sidebar, modals, tabs, theme)
// ============================================================================

interface UIState {
  // Sidebar
  sidebarOpen: boolean
  sidebarCollapsed: boolean

  // Active tabs
  activeProfileTab: 'personal' | 'organization' | 'notifications' | 'security'
  activeSettingsTab: 'personal' | 'organization' | 'notifications' | 'security'

  // Modals
  authModalOpen: boolean
  authModalType: 'signin' | 'signup' | null

  // Theme
  theme: 'light' | 'dark'

  // Loading states (for global loading indicators)
  isLoading: boolean
  loadingMessage: string | null

  // Actions
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setActiveProfileTab: (tab: UIState['activeProfileTab']) => void
  setActiveSettingsTab: (tab: UIState['activeSettingsTab']) => void
  openAuthModal: (type: 'signin' | 'signup') => void
  closeAuthModal: () => void
  setTheme: (theme: 'light' | 'dark') => void
  setLoading: (isLoading: boolean, message?: string) => void
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        sidebarOpen: true,
        sidebarCollapsed: false,
        activeProfileTab: 'personal',
        activeSettingsTab: 'personal',
        authModalOpen: false,
        authModalType: null,
        theme: 'light',
        isLoading: false,
        loadingMessage: null,

        // Actions
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
        setActiveProfileTab: (tab) => set({ activeProfileTab: tab }),
        setActiveSettingsTab: (tab) => set({ activeSettingsTab: tab }),
        openAuthModal: (type) => set({ authModalOpen: true, authModalType: type }),
        closeAuthModal: () => set({ authModalOpen: false, authModalType: null }),
        setTheme: (theme) => set({ theme }),
        setLoading: (isLoading, message) => set({ isLoading, loadingMessage: message || null }),
      }),
      {
        name: 'ui-store',
        partialize: (state) => ({
          sidebarOpen: state.sidebarOpen,
          sidebarCollapsed: state.sidebarCollapsed,
          activeProfileTab: state.activeProfileTab,
          activeSettingsTab: state.activeSettingsTab,
          theme: state.theme,
        }),
      }
    ),
    { name: 'UIStore' }
  )
)

// ============================================================================
// Grants Store - Grant search filters and UI state
// ============================================================================

export interface GrantFilter {
  searchQuery: string
  category: string
  amountRange: { min: number; max: number }
  deadline: 'all' | '30days' | '60days' | '90days'
  status: 'all' | 'open' | 'closed' | 'upcoming'
}

interface GrantsState {
  // Filters (UI state)
  filters: GrantFilter

  // Selected grants (UI state)
  selectedGrantIds: string[]

  // Current application (UI state)
  currentApplicationId: string | null

  // Search history (UI state)
  recentSearches: string[]

  // Actions
  setFilters: (filters: Partial<GrantFilter>) => void
  resetFilters: () => void
  toggleGrantSelection: (grantId: string) => void
  clearSelectedGrants: () => void
  setCurrentApplication: (applicationId: string | null) => void
  addRecentSearch: (query: string) => void
  clearRecentSearches: () => void
}

const defaultFilters: GrantFilter = {
  searchQuery: '',
  category: 'all',
  amountRange: { min: 0, max: 1000000 },
  deadline: 'all',
  status: 'open',
}

export const useGrantsStore = create<GrantsState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        filters: defaultFilters,
        selectedGrantIds: [],
        currentApplicationId: null,
        recentSearches: [],

        // Actions
        setFilters: (newFilters) =>
          set((state) => ({
            filters: { ...state.filters, ...newFilters },
          })),

        resetFilters: () => set({ filters: defaultFilters }),

        toggleGrantSelection: (grantId) =>
          set((state) => ({
            selectedGrantIds: state.selectedGrantIds.includes(grantId)
              ? state.selectedGrantIds.filter((id) => id !== grantId)
              : [...state.selectedGrantIds, grantId],
          })),

        clearSelectedGrants: () => set({ selectedGrantIds: [] }),

        setCurrentApplication: (applicationId) => set({ currentApplicationId: applicationId }),

        addRecentSearch: (query) =>
          set((state) => ({
            recentSearches: [
              query,
              ...state.recentSearches.filter((s) => s !== query),
            ].slice(0, 10), // Keep only last 10 searches
          })),

        clearRecentSearches: () => set({ recentSearches: [] }),
      }),
      {
        name: 'grants-store',
        partialize: (state) => ({
          filters: state.filters,
          recentSearches: state.recentSearches,
        }),
      }
    ),
    { name: 'GrantsStore' }
  )
)

// ============================================================================
// Workflow Stores - Form data persistence across navigation
// ============================================================================

interface GrantGenieState {
  formData: {
    projectName: string
    funderName: string
    fundingAmount: string
    deadline: string
    rfpText: string
    teachingMaterials: string
  }
  proposalContent: string
  isGenerating: boolean
  setFormData: (data: Partial<GrantGenieState['formData']>) => void
  setProposalContent: (content: string) => void
  setIsGenerating: (isGenerating: boolean) => void
  resetGrantGenie: () => void
}

export const useGrantGenieStore = create<GrantGenieState>()(
  persist(
    (set) => ({
      formData: {
        projectName: '',
        funderName: '',
        fundingAmount: '',
        deadline: '',
        rfpText: '',
        teachingMaterials: '',
      },
      proposalContent: '',
      isGenerating: false,
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setProposalContent: (content) => set({ proposalContent: content }),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      resetGrantGenie: () =>
        set({
          formData: {
            projectName: '',
            funderName: '',
            fundingAmount: '',
            deadline: '',
            rfpText: '',
            teachingMaterials: '',
          },
          proposalContent: '',
          isGenerating: false,
        }),
    }),
    {
      name: 'grant-genie-store',
    }
  )
)

interface DonorGenieState {
  sessionConfig: {
    donorProfile: string
    donorType: string
    warmthLevel?: string
    warmthFactor: string
    practiceMode?: string
    practiceFormat: string
    objections?: string
    anticipatedObjections?: string[]
    useKnowledgeBase?: boolean
  }
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
  coachingTips: string[]
  score: number | null
  isActive: boolean
  setSessionConfig: (config: Partial<DonorGenieState['sessionConfig']>) => void
  addMessage: (message: { role: 'user' | 'assistant'; content: string }) => void
  addCoachingTip: (tip: string) => void
  setScore: (score: number) => void
  setIsActive: (isActive: boolean) => void
  resetDonorGenie: () => void
}

export const useDonorGenieStore = create<DonorGenieState>()(
  persist(
    (set) => ({
      sessionConfig: {
        donorProfile: '',
        donorType: 'Individual',
        warmthFactor: 'Warm',
        practiceFormat: 'First Meeting',
      },
      conversationHistory: [],
      coachingTips: [],
      score: null,
      isActive: false,
      setSessionConfig: (config) =>
        set((state) => ({
          sessionConfig: { ...state.sessionConfig, ...config },
        })),
      addMessage: (message) =>
        set((state) => ({
          conversationHistory: [...state.conversationHistory, message],
        })),
      addCoachingTip: (tip) =>
        set((state) => ({
          coachingTips: [...state.coachingTips, tip],
        })),
      setScore: (score) => set({ score }),
      setIsActive: (isActive) => set({ isActive }),
      resetDonorGenie: () =>
        set({
          sessionConfig: {
            donorProfile: '',
            donorType: 'Individual',
            warmthFactor: 'Warm',
            practiceFormat: 'First Meeting',
          },
          conversationHistory: [],
          coachingTips: [],
          score: null,
          isActive: false,
        }),
    }),
    {
      name: 'donor-genie-store',
    }
  )
)

// ============================================================================
// Notification Store - Local notification count (derived from TanStack Query)
// ============================================================================

interface NotificationState {
  unreadCount: number
  setUnreadCount: (count: number) => void
  incrementUnreadCount: () => void
  decrementUnreadCount: () => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
  incrementUnreadCount: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
  decrementUnreadCount: () =>
    set((state) => ({ unreadCount: Math.max(0, state.unreadCount - 1) })),
}))

