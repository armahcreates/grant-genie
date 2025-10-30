'use client'

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import { AuthProvider } from '@/contexts/AuthContext'
import { colors } from '@/theme/tokens'

// Create a custom system with HeadspaceGenie branding
// Using purple/indigo palette from theme/tokens.ts
const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: colors.purple[50] },
          100: { value: colors.purple[100] },
          200: { value: colors.purple[200] },
          300: { value: colors.purple[300] },
          400: { value: colors.purple[400] },
          500: { value: colors.purple[500] },
          600: { value: colors.purple[600] },
          700: { value: colors.purple[700] },
          800: { value: colors.purple[800] },
          900: { value: colors.brand.deepIndigo }, // Matches brand.deepIndigo
        },
      },
    },
    semanticTokens: {
      colors: {
        'bg.brand': {
          value: {
            _light: colors.brand.deepIndigo,
            _dark: '#5D5B9E', // Lighter indigo for dark mode
          },
        },
        'bg.brand.subtle': {
          value: {
            _light: colors.purple[50],
            _dark: '#1A1F2E',
          },
        },
        'bg.subtle': {
          value: {
            _light: colors.purple[50],
            _dark: '#1A1F2E',
          },
        },
        'fg.brand': {
          value: {
            _light: colors.brand.deepIndigo,
            _dark: colors.brand.softTeal,
          },
        },
      },
    },
  },
})

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ChakraProvider>
  )
}
