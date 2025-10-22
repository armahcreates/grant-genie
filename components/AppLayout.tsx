'use client'

import { Box, Flex } from '@chakra-ui/react'
import Sidebar from './Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex>
      <Sidebar />
      <Box ml="250px" w="calc(100% - 250px)" minH="100vh" bg="gray.50">
        {children}
      </Box>
    </Flex>
  )
}
