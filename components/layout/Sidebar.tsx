'use client'

import {
  Box,
  Flex,
  Icon,
  Link,
  VStack,
  Text,
  useColorModeValue,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
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
  const activeColor = useColorModeValue('blue.600', 'blue.200')
  const activeBg = useColorModeValue('blue.50', 'blue.900')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Link
      as={NextLink}
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      w="full"
    >
      <Flex
        align="center"
        p="3"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? activeBg : 'transparent'}
        color={isActive ? activeColor : 'inherit'}
        _hover={{
          bg: isActive ? activeBg : hoverBg,
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
    </Link>
  )
}

export default function Sidebar() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/landing')
  }

  return (
    <Box
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      w={{ base: 'full', md: '240px' }}
      h="100vh"
      position="fixed"
      left={0}
      top={0}
      display="flex"
      flexDirection="column"
    >
      <Flex h="20" alignItems="center" mx="4" justifyContent="center">
        <Text fontSize="2xl" fontWeight="bold" color="blue.500">
          Grant Genie
        </Text>
      </Flex>

      <VStack spacing={1} align="stretch" flex={1} overflowY="auto" pb={4}>
        <NavItem icon={MdDashboard} href="/" isActive={pathname === '/'}>
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
        borderColor={borderColor}
        p={4}
      >
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            w="full"
            textAlign="left"
            _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
          >
            <HStack spacing={3}>
              <Avatar size="sm" name={user?.name || 'User'} bg="blue.500" />
              <VStack align="start" spacing={0} flex={1}>
                <Text fontSize="sm" fontWeight="semibold" noOfLines={1}>
                  {user?.name || 'Guest User'}
                </Text>
                <Text fontSize="xs" color="gray.500" noOfLines={1}>
                  {user?.organization || 'No organization'}
                </Text>
              </VStack>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem icon={<Icon as={MdPerson} />} onClick={() => router.push('/profile')}>
              Profile Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon as={MdLogout} />} onClick={handleLogout}>
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  )
}
