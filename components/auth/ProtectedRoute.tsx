'use client'

import { useUser } from '@stackframe/stack'
import { Box, Spinner, VStack } from '@chakra-ui/react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useUser()

  if (!user) {
    // Redirect to signin page
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/signin'
    }

    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="purple.50">
        <VStack gap={4}>
          <Spinner size="xl" colorPalette="purple" borderWidth="4px" />
        </VStack>
      </Box>
    )
  }

  return <>{children}</>
}
