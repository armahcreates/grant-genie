'use client'

import { useEffect, useCallback } from 'react'

export interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  description: string
  action: () => void
  category?: string
}

/**
 * Keyboard Shortcuts Hook
 * 
 * Registers global keyboard shortcuts and handles their execution.
 * Automatically cleans up event listeners on unmount.
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase()
        const ctrlMatch = shortcut.ctrlKey ? event.ctrlKey : !event.ctrlKey
        const metaMatch = shortcut.metaKey ? event.metaKey : !event.metaKey
        const shiftMatch = shortcut.shiftKey ? event.shiftKey : !event.shiftKey
        const altMatch = shortcut.altKey ? event.altKey : !event.altKey

        if (keyMatch && ctrlMatch && metaMatch && shiftMatch && altMatch) {
          event.preventDefault()
          shortcut.action()
          break
        }
      }
    },
    [shortcuts]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

/**
 * Format keyboard shortcut for display
 */
export function formatShortcut(shortcut: KeyboardShortcut): string {
  const parts: string[] = []
  
  if (shortcut.ctrlKey || shortcut.metaKey) {
    parts.push(isMac() ? '⌘' : 'Ctrl')
  }
  if (shortcut.shiftKey) {
    parts.push('Shift')
  }
  if (shortcut.altKey) {
    parts.push(isMac() ? '⌥' : 'Alt')
  }
  
  parts.push(shortcut.key.toUpperCase())
  
  return parts.join(' + ')
}

/**
 * Check if the user is on macOS
 */
function isMac(): boolean {
  if (typeof window === 'undefined') return false
  return /Mac|iPhone|iPod|iPad/i.test(navigator.platform)
}