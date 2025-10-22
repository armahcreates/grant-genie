'use client'

import { Box, Flex } from '@chakra-ui/react'
import Sidebar from './Sidebar'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <ProtectedRoute>
      <Flex minH="100vh">
        <Sidebar />
        <Box
          ml={{ base: 0, md: '240px' }}
          w={{ base: 'full', md: 'calc(100% - 240px)' }}
          bg="gray.50"
          minH="100vh"
        >
          {children}
        </Box>
      </Flex>
    </ProtectedRoute>
  )
}
