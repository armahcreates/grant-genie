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
  IconButton,
  DrawerRoot,
  DrawerBackdrop,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseTrigger,
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
  MdMenu,
} from 'react-icons/md'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useUser } from '@stackframe/stack'
import { useState } from 'react'

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

const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname()
  const router = useRouter()
  const user = useUser()

  const handleLogout = async () => {
    await user?.signOut()
    router.push('/')
  }

  const handleNavClick = () => {
    onClose?.()
  }

  return (
    <Box
      bg="white"
      borderRight={{ base: 'none', md: '1px' }}
      borderColor="gray.200"
      h="full"
      display="flex"
      flexDirection="column"
    >
      <Flex h="20" alignItems="center" mx="4" justifyContent="center">
        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color="purple.600">
          Headspace Genie
        </Text>
      </Flex>

      <VStack gap={1} align="stretch" flex={1} overflowY="auto" pb={4}>
        <Box onClick={handleNavClick}>
          <NavItem icon={MdDashboard} href="/dashboard" isActive={pathname === '/dashboard'}>
            Dashboard
          </NavItem>
        </Box>
        <Box onClick={handleNavClick}>
          <NavItem icon={MdSearch} href="/grant-search" isActive={pathname === '/grant-search'}>
            Grant Search
          </NavItem>
        </Box>
        <Box onClick={handleNavClick}>
          <NavItem icon={MdDescription} href="/grant-application" isActive={pathname === '/grant-application'}>
            Grant Application
          </NavItem>
        </Box>
        <Box onClick={handleNavClick}>
          <NavItem icon={MdChecklist} href="/compliance-tracker" isActive={pathname === '/compliance-tracker'}>
            Compliance Tracker
          </NavItem>
        </Box>
        <Box onClick={handleNavClick}>
          <NavItem icon={MdBarChart} href="/reporting" isActive={pathname === '/reporting'}>
            Reporting
          </NavItem>
        </Box>
        <Box onClick={handleNavClick}>
          <NavItem icon={MdNotifications} href="/notifications" isActive={pathname === '/notifications'}>
            Notifications
          </NavItem>
        </Box>
        <Box onClick={handleNavClick}>
          <NavItem icon={MdLibraryBooks} href="/resources" isActive={pathname === '/resources'}>
            Resources
          </NavItem>
        </Box>
        <Box onClick={handleNavClick}>
          <NavItem icon={MdHelp} href="/support" isActive={pathname === '/support'}>
            Support
          </NavItem>
        </Box>
        <Box onClick={handleNavClick}>
          <NavItem icon={MdSettings} href="/profile" isActive={pathname === '/profile'}>
            Settings
          </NavItem>
        </Box>
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
                  <Avatar.Fallback>
                    {(user?.displayName || 'U').substring(0, 2).toUpperCase()}
                  </Avatar.Fallback>
                </Avatar.Root>
                <VStack align="start" gap={0} flex={1}>
                  <Text fontSize="sm" fontWeight="semibold" lineClamp={1}>
                    {user?.displayName || 'User'}
                  </Text>
                  <Text fontSize="xs" color="gray.500" lineClamp={1}>
                    {user?.primaryEmail || 'No email'}
                  </Text>
                </VStack>
              </HStack>
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem value="profile" onClick={() => { router.push('/profile'); onClose?.() }}>
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

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <Box
        display={{ base: 'block', md: 'none' }}
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        zIndex={10}
        px={4}
        py={3}
      >
        <Flex justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold" color="purple.600">
            Headspace Genie
          </Text>
          <DrawerRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} placement="start">
            <DrawerBackdrop />
            <DrawerTrigger asChild>
              <IconButton
                aria-label="Open menu"
                variant="ghost"
                colorPalette="purple"
              >
                <Icon as={MdMenu} boxSize={6} />
              </IconButton>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerCloseTrigger />
              </DrawerHeader>
              <DrawerBody p={0}>
                <SidebarContent onClose={() => setIsOpen(false)} />
              </DrawerBody>
            </DrawerContent>
          </DrawerRoot>
        </Flex>
      </Box>

      {/* Desktop Sidebar */}
      <Box
        display={{ base: 'none', md: 'block' }}
        w="240px"
        h="100vh"
        position="fixed"
        left={0}
        top={0}
      >
        <SidebarContent />
      </Box>
    </>
  )
}
