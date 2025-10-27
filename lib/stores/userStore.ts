/**
 * User Store - Zustand
 *
 * Manages user profile and personal information state
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

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

interface UserState {
  // Personal Info
  personalInfo: PersonalInfo | null

  // Organization Info
  organizationInfo: OrganizationInfo | null

  // Notification Preferences
  notificationPreferences: NotificationPreferences | null

  // Onboarding
  isOnboarded: boolean
  onboardingData: {
    fullName: string
    organizationName: string
    organizationType: string
    role: string
    goals: string[]
  } | null

  // Actions
  setPersonalInfo: (info: PersonalInfo) => void
  setOrganizationInfo: (info: OrganizationInfo) => void
  setNotificationPreferences: (prefs: NotificationPreferences) => void
  setOnboardingData: (data: UserState['onboardingData']) => void
  setIsOnboarded: (isOnboarded: boolean) => void
  clearUserData: () => void
}

const initialState = {
  personalInfo: null,
  organizationInfo: null,
  notificationPreferences: null,
  isOnboarded: false,
  onboardingData: null,
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setPersonalInfo: (info) => set({ personalInfo: info }),

        setOrganizationInfo: (info) => set({ organizationInfo: info }),

        setNotificationPreferences: (prefs) => set({ notificationPreferences: prefs }),

        setOnboardingData: (data) => set({ onboardingData: data }),

        setIsOnboarded: (isOnboarded) => set({ isOnboarded }),

        clearUserData: () => set(initialState),
      }),
      {
        name: 'user-store',
        partialize: (state) => ({
          personalInfo: state.personalInfo,
          organizationInfo: state.organizationInfo,
          notificationPreferences: state.notificationPreferences,
          isOnboarded: state.isOnboarded,
        }),
      }
    ),
    { name: 'UserStore' }
  )
)
