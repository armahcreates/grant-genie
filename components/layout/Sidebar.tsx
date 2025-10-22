'use client'

import {
  Box,
  Flex,
  Icon,
  Link,
  VStack,
  Text,
  Avatar,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  Button,
  HStack,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import {
  MdDashboard,
  MdSearch,
  MdDescription,
  MdChecklist,
  MdBarChart,
  MdNotifications,
  MdSettings,
  MdLibraryBooks,
  MdHelp,
  MdLogout,
  MdPerson,
} from 'react-icons/md'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface NavItemProps {
  icon: IconType
  children: string
  href: string
  isActive?: boolean
}

const NavItem = ({ icon, children, href, isActive }: NavItemProps) => {
  return (
    <Link
      asChild
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      w="full"
    >
      <NextLink href={href}>
        <Flex
          align="center"
          p="3"
          mx="2"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={isActive ? 'purple.50' : 'transparent'}
          color={isActive ? 'purple.600' : 'inherit'}
          _hover={{
            bg: isActive ? 'purple.50' : 'gray.100',
          }}
          transition="all 0.2s"
        >
          <Icon
            mr="3"
            fontSize="20"
            as={icon}
          />
          <Text fontSize="sm" fontWeight={isActive ? 'semibold' : 'medium'}>
            {children}
          </Text>
        </Flex>
      </NextLink>
    </Link>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <Box
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      w={{ base: 'full', md: '240px' }}
      h="100vh"
      position="fixed"
      left={0}
      top={0}
      display="flex"
      flexDirection="column"
    >
      <Flex h="20" alignItems="center" mx="4" justifyContent="center">
        <Text fontSize="2xl" fontWeight="bold" color="purple.600">
          Headspace Genie
        </Text>
      </Flex>

      <VStack gap={1} align="stretch" flex={1} overflowY="auto" pb={4}>
        <NavItem icon={MdDashboard} href="/dashboard" isActive={pathname === '/dashboard'}>
          Dashboard
        </NavItem>
        <NavItem icon={MdSearch} href="/grant-search" isActive={pathname === '/grant-search'}>
          Grant Search
        </NavItem>
        <NavItem icon={MdDescription} href="/grant-application" isActive={pathname === '/grant-application'}>
          Grant Application
        </NavItem>
        <NavItem icon={MdChecklist} href="/compliance-tracker" isActive={pathname === '/compliance-tracker'}>
          Compliance Tracker
        </NavItem>
        <NavItem icon={MdBarChart} href="/reporting" isActive={pathname === '/reporting'}>
          Reporting
        </NavItem>
        <NavItem icon={MdNotifications} href="/notifications" isActive={pathname === '/notifications'}>
          Notifications
        </NavItem>
        <NavItem icon={MdLibraryBooks} href="/resources" isActive={pathname === '/resources'}>
          Resources
        </NavItem>
        <NavItem icon={MdHelp} href="/support" isActive={pathname === '/support'}>
          Support
        </NavItem>
        <NavItem icon={MdSettings} href="/profile" isActive={pathname === '/profile'}>
          Settings
        </NavItem>
      </VStack>

      {/* User Profile Section */}
      <Box
        borderTop="1px"
        borderColor="gray.200"
        p={4}
      >
        <MenuRoot>
          <MenuTrigger asChild>
            <Button
              variant="ghost"
              w="full"
              textAlign="left"
              _hover={{ bg: 'gray.100' }}
            >
              <HStack gap={3}>
                <Avatar.Root size="sm" bg="purple.600">
                  <Avatar.Fallback>{(user?.name || 'User').substring(0, 2).toUpperCase()}</Avatar.Fallback>
                </Avatar.Root>
                <VStack align="start" gap={0} flex={1}>
                  <Text fontSize="sm" fontWeight="semibold" lineClamp={1}>
                    {user?.name || 'Guest User'}
                  </Text>
                  <Text fontSize="xs" color="gray.500" lineClamp={1}>
                    {user?.organization || 'No organization'}
                  </Text>
                </VStack>
              </HStack>
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem value="profile" onClick={() => router.push('/profile')}>
              <Icon as={MdPerson} />
              Profile Settings
            </MenuItem>
            <MenuSeparator />
            <MenuItem value="logout" onClick={handleLogout}>
              <Icon as={MdLogout} />
              Log Out
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </Box>
    </Box>
  )
}
