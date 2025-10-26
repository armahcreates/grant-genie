'use client'

import { useTheme } from 'next-themes'

/**
 * Color Mode Hook
 *
 * Wrapper around next-themes useTheme hook for consistent API
 */
export function useColorMode() {
  const { theme, setTheme } = useTheme()
  
  return {
    colorMode: theme as 'light' | 'dark' | 'system',
    setColorMode: setTheme,
    toggleColorMode: () => setTheme(theme === 'light' ? 'dark' : 'light'),
  }
}