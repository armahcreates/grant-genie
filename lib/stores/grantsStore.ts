/**
 * Grants Store - Zustand
 *
 * Manages grant-related state (filters, selections, etc.)
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface GrantFilter {
  searchQuery: string
  category: string
  amountRange: { min: number; max: number }
  deadline: 'all' | '30days' | '60days' | '90days'
  status: 'all' | 'open' | 'closed' | 'upcoming'
}

export interface GrantApplication {
  id: string
  grantId: string
  status: 'draft' | 'in_progress' | 'submitted' | 'under_review' | 'approved' | 'rejected'
  lastUpdated: string
  deadline: string
}

interface GrantsState {
  // Filters
  filters: GrantFilter

  // Selected grants
  selectedGrantIds: string[]

  // Current application
  currentApplicationId: string | null

  // Search history
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
    { name: 'GrantsStore' }
  )
)
