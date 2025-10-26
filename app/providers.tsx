'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/contexts/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ChakraProvider value={defaultSystem}>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </ThemeProvider>
  )
}
