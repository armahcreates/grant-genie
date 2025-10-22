'use client'

import {
  Box,
  VStack,
  Flex,
  Text,
  Icon,
  Link as ChakraLink,
} from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FiHome,
  FiSearch,
  FiFileText,
  FiCheckSquare,
  FiBarChart2,
  FiBell,
  FiSettings,
} from 'react-icons/fi'

interface NavItemProps {
  icon: any
  label: string
  href: string
  isActive?: boolean
}

const NavItem = ({ icon, label, href, isActive }: NavItemProps) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <ChakraLink
        display="flex"
        alignItems="center"
        px={4}
        py={3}
        borderRadius="md"
        bg={isActive ? 'blue.50' : 'transparent'}
        color={isActive ? 'blue.600' : 'gray.700'}
        fontWeight={isActive ? 'semibold' : 'normal'}
        _hover={{
          bg: isActive ? 'blue.50' : 'gray.100',
          textDecoration: 'none',
        }}
        transition="all 0.2s"
      >
        <Icon as={icon} boxSize={5} />
        <Text ml={3}>{label}</Text>
      </ChakraLink>
    </Link>
  )
}

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { icon: FiHome, label: 'Dashboard', href: '/' },
    { icon: FiSearch, label: 'Grant Search', href: '/grants' },
    { icon: FiFileText, label: 'Grant Application', href: '/applications' },
    { icon: FiCheckSquare, label: 'Compliance Tracker', href: '/compliance' },
    { icon: FiBarChart2, label: 'Reporting', href: '/reporting' },
    { icon: FiBell, label: 'Notifications', href: '/notifications' },
    { icon: FiSettings, label: 'Settings', href: '/profile' },
  ]

  return (
    <Box
      w="250px"
      h="100vh"
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      position="fixed"
      left={0}
      top={0}
      overflowY="auto"
    >
      <VStack spacing={1} align="stretch" p={4}>
        {/* Logo/Brand */}
        <Flex align="center" mb={6} px={2}>
          <Text fontSize="xl" fontWeight="bold" color="blue.600">
            Grant Genie
          </Text>
        </Flex>

        {/* Navigation Items */}
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
          />
        ))}
      </VStack>
    </Box>
  )
}
