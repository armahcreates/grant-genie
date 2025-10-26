'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { KeyboardShortcut, useKeyboardShortcuts } from '@/lib/utils/keyboard-shortcuts'
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal'

interface KeyboardShortcutsContextType {
  shortcuts: KeyboardShortcut[]
  registerShortcuts: (shortcuts: KeyboardShortcut[]) => void
  showShortcuts: () => void
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | undefined>(undefined)

/**
 * KeyboardShortcutsProvider Component
 * 
 * Global provider for keyboard shortcuts management.
 * Automatically registers the "?" shortcut to show the shortcuts modal.
 */
export function KeyboardShortcutsProvider({ children }: { children: ReactNode }) {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcut[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Register the "?" shortcut to show the modal
  const globalShortcuts: KeyboardShortcut[] = [
    {
      key: '?',
      description: 'Show keyboard shortcuts',
      action: () => setIsModalOpen(true),
      category: 'Global',
    },
    ...shortcuts,
  ]

  useKeyboardShortcuts(globalShortcuts)

  const registerShortcuts = (newShortcuts: KeyboardShortcut[]) => {
    setShortcuts((prev) => [...prev, ...newShortcuts])
  }

  const showShortcuts = () => {
    setIsModalOpen(true)
  }

  return (
    <KeyboardShortcutsContext.Provider value={{ shortcuts: globalShortcuts, registerShortcuts, showShortcuts }}>
      {children}
      <KeyboardShortcutsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shortcuts={globalShortcuts}
      />
    </KeyboardShortcutsContext.Provider>
  )
}

/**
 * Hook to access keyboard shortcuts context
 */
export function useKeyboardShortcutsContext() {
  const context = useContext(KeyboardShortcutsContext)
  if (!context) {
    throw new Error('useKeyboardShortcutsContext must be used within KeyboardShortcutsProvider')
  }
  return context
}