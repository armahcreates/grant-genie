import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ============================================================================
// User Store
// ============================================================================

interface UserState {
  userId: string | null
  userEmail: string | null
  userName: string | null
  organizationName: string | null
  setUser: (user: {
    userId: string
    userEmail: string
    userName?: string
    organizationName?: string
  }) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      userEmail: null,
      userName: null,
      organizationName: null,
      setUser: (user) =>
        set({
          userId: user.userId,
          userEmail: user.userEmail,
          userName: user.userName || null,
          organizationName: user.organizationName || null,
        }),
      clearUser: () =>
        set({
          userId: null,
          userEmail: null,
          userName: null,
          organizationName: null,
        }),
    }),
    {
      name: 'user-storage',
    }
  )
)

// ============================================================================
// Grant Genie Store (for grant application workflow)
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
      name: 'grant-genie-storage',
    }
  )
)

// ============================================================================
// Donor Genie Store (for donor meeting practice workflow)
// ============================================================================

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
      name: 'donor-genie-storage',
    }
  )
)

// ============================================================================
// UI Store (for global UI state)
// ============================================================================

interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'light',
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage',
    }
  )
)

// ============================================================================
// Notification Store (for local notification state)
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
