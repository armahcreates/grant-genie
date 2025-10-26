'use client'

import { IconButton } from '@chakra-ui/react'
import { useColorMode } from '@/components/ui/color-mode'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

/**
 * ColorModeToggle Component
 * 
 * Toggles between light and dark mode themes.
 * Uses Chakra UI's color mode system for theme management.
 */
export function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      onClick={toggleColorMode}
      variant="ghost"
      colorPalette="purple"
      size="sm"
      _focusVisible={{
        outline: '3px solid',
        outlineColor: 'purple.500',
        outlineOffset: '2px',
      }}
    >
      {colorMode === 'light' ? (
        <MdDarkMode size={20} />
      ) : (
        <MdLightMode size={20} />
      )}
    </IconButton>
  )
}