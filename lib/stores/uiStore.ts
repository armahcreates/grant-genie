/**
 * UI Store - Zustand
 *
 * Manages UI state like modals, active tabs, sidebar state, etc.
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIState {
  // Sidebar
  isSidebarOpen: boolean
  sidebarCollapsed: boolean

  // Active tabs for different pages
  activeProfileTab: 'personal' | 'organization' | 'notifications' | 'security'
  activeSettingsTab: 'personal' | 'organization' | 'notifications' | 'security'

  // Modals
  isAuthModalOpen: boolean
  authModalType: 'signin' | 'signup' | null

  // Loading states
  isLoading: boolean
  loadingMessage: string | null

  // Actions
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setActiveProfileTab: (tab: UIState['activeProfileTab']) => void
  setActiveSettingsTab: (tab: UIState['activeSettingsTab']) => void
  openAuthModal: (type: 'signin' | 'signup') => void
  closeAuthModal: () => void
  setLoading: (isLoading: boolean, message?: string) => void
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      // Initial state
      isSidebarOpen: true,
      sidebarCollapsed: false,
      activeProfileTab: 'personal',
      activeSettingsTab: 'personal',
      isAuthModalOpen: false,
      authModalType: null,
      isLoading: false,
      loadingMessage: null,

      // Actions
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      setActiveProfileTab: (tab) => set({ activeProfileTab: tab }),

      setActiveSettingsTab: (tab) => set({ activeSettingsTab: tab }),

      openAuthModal: (type) => set({ isAuthModalOpen: true, authModalType: type }),

      closeAuthModal: () => set({ isAuthModalOpen: false, authModalType: null }),

      setLoading: (isLoading, message) =>
        set({ isLoading, loadingMessage: message || null }),
    }),
    { name: 'UIStore' }
  )
)
