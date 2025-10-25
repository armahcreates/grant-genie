'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Card,
  SimpleGrid,
  Icon,
  Flex,
  VStack,
  HStack,
  Badge,
  Button,
  Progress,
  Separator,
  Image,
} from '@chakra-ui/react'
import { MdDescription, MdTrendingUp, MdCheckCircle, MdPending, MdCalendarToday, MdSearch, MdAdd, MdNotifications } from 'react-icons/md'
import { FiTrendingUp, FiArrowRight, FiClock, FiAlertCircle, FiZap, FiTarget, FiDollarSign, FiAward, FiUsers, FiMail, FiMessageCircle } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { mockApplications, mockCompliance, mockDashboardStats, mockRecentActivity } from '@/lib/mockData'

export default function DashboardPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [animatedStats, setAnimatedStats] = useState({
    activeGrants: 0,
    complianceRate: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Simulate loading and animate stats
  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoading(false), 500)

    // Animate stats on load
    const statTimer = setTimeout(() => {
      const duration = 1500
      const steps = 60
      const interval = duration / steps
      let currentStep = 0

      const animate = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)

        setAnimatedStats({
          activeGrants: Math.round(mockDashboardStats.activeGrants * easeOutQuart),
          complianceRate: Math.round(mockDashboardStats.complianceRate * easeOutQuart),
        })

        if (currentStep >= steps) {
          clearInterval(animate)
          setAnimatedStats({
            activeGrants: mockDashboardStats.activeGrants,
            complianceRate: mockDashboardStats.complianceRate,
          })
        }
      }, interval)

      return () => clearInterval(animate)
    }, 600)

    return () => {
      clearTimeout(loadTimer)
      clearTimeout(statTimer)
    }
  }, [])

  // Brand colors
  const deepIndigo = '#3C3B6E'
  const softTeal = '#5CE1E6'

  // Get recent applications (top 5)
  const recentApplications = mockApplications.slice(0, 5)

  // Get upcoming compliance deadlines
  const upcomingDeadlines = mockCompliance
    .filter(item => item.status === 'Upcoming' || item.status === 'Overdue')
    .slice(0, 5)

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <MainLayout>
      {/* Premium Header Background */}
      <Box
        position="relative"
        bgGradient={`linear(to-br, ${deepIndigo}, #2D2C5A, #1a1a3e)`}
        overflow="hidden"
        _before={{
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          w: '600px',
          h: '600px',
          bg: softTeal,
          borderRadius: 'full',
          filter: 'blur(120px)',
          opacity: 0.15,
        }}
      >
        <Container maxW="container.xl" py={{ base: 8, md: 12 }} position="relative" zIndex={1}>
          <VStack align="stretch" gap={6}>
            {/* Welcome Header */}
            <Flex justify="space-between" align="start" flexWrap="wrap" gap={4}>
              <VStack align="start" gap={2}>
                <HStack gap={3}>
                  <Text fontSize={{ base: 'md', md: 'lg' }} color="purple.200" fontWeight="medium">
                    {getGreeting()}, Sarah
                  </Text>
                  <Text fontSize={{ base: '2xl', md: '3xl' }}>👋</Text>
                </HStack>
                <Heading
                  size={{ base: 'xl', md: '2xl' }}
                  color="white"
                  letterSpacing="-0.02em"
                  lineHeight={{ base: '1.2', md: '1.1' }}
                >
                  Your Headspace Command Center
                </Heading>
                <Text
                  color="purple.200"
                  fontSize={{ base: 'sm', md: 'lg' }}
                  maxW="2xl"
                  lineHeight="1.5"
                >
                  {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </Text>
              </VStack>

              <HStack gap={3} flexWrap="wrap">
                <Button
                  size={{ base: 'md', md: 'lg' }}
                  variant="outline"
                  borderWidth="2px"
                  borderColor="whiteAlpha.400"
                  color="white"
                  bg="whiteAlpha.100"
                  backdropFilter="blur(10px)"
                  _hover={{
                    bg: 'whiteAlpha.200',
                    borderColor: softTeal,
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.3s"
                  onClick={() => router.push('/grant-search')}
                >
                  <Icon as={MdSearch} mr={2} />
                  <Text display={{ base: 'none', sm: 'inline' }}>Discover Grants</Text>
                  <Text display={{ base: 'inline', sm: 'none' }}>Discover</Text>
                </Button>
                <Button
                  size={{ base: 'md', md: 'lg' }}
                  bgGradient={`linear(to-r, ${softTeal}, #4BC5CC)`}
                  color="white"
                  _hover={{
                    bgGradient: `linear(to-r, #4BC5CC, ${softTeal})`,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 25px rgba(92, 225, 230, 0.4)'
                  }}
                  transition="all 0.3s"
                  boxShadow="0 4px 15px rgba(92, 225, 230, 0.3)"
                  onClick={() => router.push('/grant-application')}
                >
                  <Icon as={FiZap} mr={2} />
                  Start Writing
                </Button>
              </HStack>
            </Flex>

            {/* Urgent Alert Banner */}
            {upcomingDeadlines.some(item => item.status === 'Overdue') && (
              <Card.Root
                bg="whiteAlpha.100"
                backdropFilter="blur(20px)"
                border="2px solid"
                borderColor="red.400"
                borderRadius="2xl"
                animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                sx={{
                  '@keyframes pulse': {
                    '0%, 100%': {
                      boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.7)',
                    },
                    '50%': {
                      boxShadow: '0 0 0 10px rgba(239, 68, 68, 0)',
                    },
                  },
                }}
              >
                <Card.Body p={{ base: 4, md: 5 }}>
                  <HStack gap={4} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                    <Flex
                      w={12}
                      h={12}
                      bg="red.500"
                      borderRadius="xl"
                      align="center"
                      justify="center"
                      flexShrink={0}
                    >
                      <Icon as={FiAlertCircle} boxSize={6} color="white" />
                    </Flex>
                    <Box flex={1}>
                      <Text fontWeight="bold" color="white" mb={1} fontSize={{ base: 'md', md: 'lg' }}>
                        Action Required: Overdue Tasks
                      </Text>
                      <Text fontSize={{ base: 'sm', md: 'md' }} color="purple.100">
                        You have {upcomingDeadlines.filter(item => item.status === 'Overdue').length} overdue compliance task(s) that need immediate attention.
                      </Text>
                    </Box>
                    <Button
                      size={{ base: 'sm', md: 'md' }}
                      bg="red.500"
                      color="white"
                      _hover={{ bg: 'red.600', transform: 'scale(1.05)' }}
                      onClick={() => router.push('/compliance-tracker')}
                      flexShrink={0}
                    >
                      View Tasks
                    </Button>
                  </HStack>
                </Card.Body>
              </Card.Root>
            )}
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        {/* Premium Stats Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6} mb={8} mt={{ base: 0, md: -12 }} position="relative" zIndex={2}>
          {/* Active Grants Card */}
          <Card.Root
            bg="white"
            cursor="pointer"
            border="1px solid"
            borderColor="purple.100"
            _hover={{
              transform: 'translateY(-8px)',
              boxShadow: `0 20px 40px ${softTeal}20`,
              borderColor: softTeal,
            }}
            transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            onClick={() => router.push('/grant-application')}
            borderRadius="2xl"
            overflow="hidden"
            position="relative"
            animation={isLoading ? 'none' : 'fadeInUp 0.6s ease-out 0.1s both'}
            sx={{
              '@keyframes fadeInUp': {
                from: {
                  opacity: 0,
                  transform: 'translateY(30px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              h="4px"
              bgGradient={`linear(to-r, ${deepIndigo}, ${softTeal})`}
            />
            <Card.Body p={{ base: 5, md: 6 }}>
              <VStack gap={4} align="stretch">
                <HStack justify="space-between">
                  <Flex
                    w={{ base: 12, md: 14 }}
                    h={{ base: 12, md: 14 }}
                    bgGradient={`linear(135deg, ${softTeal}20, ${deepIndigo}10)`}
                    borderRadius="xl"
                    align="center"
                    justify="center"
                    boxShadow={`0 4px 15px ${softTeal}30`}
                  >
                    <Icon as={MdDescription} boxSize={{ base: 6, md: 7 }} color={softTeal} />
                  </Flex>
                  <Icon as={FiArrowRight} color={deepIndigo} boxSize={5} />
                </HStack>
                <Box>
                  <Text fontSize="sm" color="purple.700" mb={2} fontWeight="medium">Active Grants</Text>
                  <Heading
                    size={{ base: '2xl', md: '3xl' }}
                    color={deepIndigo}
                    mb={1}
                    transition="all 0.3s"
                    letterSpacing="-0.02em"
                    fontWeight="bold"
                  >
                    {animatedStats.activeGrants}
                  </Heading>
                  <Text fontSize="sm" color="purple.600">Currently managing</Text>
                </Box>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Total Funding Card */}
          <Card.Root
            bgGradient={`linear(135deg, ${softTeal}, #4BC5CC)`}
            cursor="pointer"
            _hover={{
              transform: 'translateY(-8px) scale(1.02)',
              boxShadow: `0 25px 50px ${softTeal}40`,
            }}
            transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            onClick={() => router.push('/reporting')}
            borderRadius="2xl"
            position="relative"
            overflow="hidden"
            animation={isLoading ? 'none' : 'fadeInUp 0.6s ease-out 0.2s both'}
            sx={{
              '@keyframes fadeInUp': {
                from: {
                  opacity: 0,
                  transform: 'translateY(30px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
            _before={{
              content: '""',
              position: 'absolute',
              top: '-50%',
              right: '-30%',
              w: '300px',
              h: '300px',
              bg: 'whiteAlpha.300',
              borderRadius: 'full',
              filter: 'blur(60px)',
            }}
          >
            <Card.Body p={{ base: 5, md: 6 }} position="relative" zIndex={1}>
              <VStack gap={4} align="stretch">
                <HStack justify="space-between">
                  <Flex
                    w={{ base: 12, md: 14 }}
                    h={{ base: 12, md: 14 }}
                    bg="whiteAlpha.300"
                    backdropFilter="blur(10px)"
                    borderRadius="xl"
                    align="center"
                    justify="center"
                  >
                    <Icon as={FiDollarSign} boxSize={{ base: 6, md: 7 }} color="white" />
                  </Flex>
                  <Badge
                    bg="whiteAlpha.300"
                    backdropFilter="blur(10px)"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="bold"
                  >
                    <Icon as={FiTrendingUp} mr={1} />
                    +23%
                  </Badge>
                </HStack>
                <Box>
                  <Text fontSize="sm" color="whiteAlpha.900" mb={2} fontWeight="semibold">Total Funding</Text>
                  <Heading
                    size={{ base: 'xl', md: '2xl' }}
                    color="white"
                    mb={1}
                    letterSpacing="-0.02em"
                  >
                    {mockDashboardStats.totalFunding}
                  </Heading>
                  <Text fontSize="sm" color="whiteAlpha.800">Secured to date</Text>
                </Box>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Upcoming Deadlines Card */}
          <Card.Root
            bg="white"
            cursor="pointer"
            border="2px solid"
            borderColor={mockDashboardStats.upcomingDeadlines > 5 ? 'orange.300' : 'purple.100'}
            _hover={{
              transform: 'translateY(-8px)',
              boxShadow: '0 20px 40px rgba(251, 146, 60, 0.2)',
              borderColor: 'orange.400',
            }}
            transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            onClick={() => router.push('/compliance-tracker')}
            borderRadius="2xl"
            position="relative"
            overflow="hidden"
            animation={isLoading ? 'none' : 'fadeInUp 0.6s ease-out 0.3s both'}
            sx={{
              '@keyframes fadeInUp': {
                from: {
                  opacity: 0,
                  transform: 'translateY(30px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            {mockDashboardStats.upcomingDeadlines > 5 && (
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                h="4px"
                bg="orange.400"
              />
            )}
            <Card.Body p={{ base: 5, md: 6 }}>
              <VStack gap={4} align="stretch">
                <HStack justify="space-between">
                  <Flex
                    w={{ base: 12, md: 14 }}
                    h={{ base: 12, md: 14 }}
                    bg="orange.100"
                    borderRadius="xl"
                    align="center"
                    justify="center"
                  >
                    <Icon as={FiClock} boxSize={{ base: 6, md: 7 }} color="orange.500" />
                  </Flex>
                  {mockDashboardStats.upcomingDeadlines > 5 && (
                    <Badge colorScheme="orange" fontSize="sm" px={3} py={1}>Urgent</Badge>
                  )}
                </HStack>
                <Box>
                  <Text fontSize="sm" color="purple.700" mb={2} fontWeight="medium">Upcoming Deadlines</Text>
                  <Heading
                    size={{ base: '2xl', md: '3xl' }}
                    color={deepIndigo}
                    mb={1}
                    letterSpacing="-0.02em"
                    fontWeight="bold"
                  >
                    {mockDashboardStats.upcomingDeadlines}
                  </Heading>
                  <Text fontSize="sm" color="purple.600">This month</Text>
                </Box>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Compliance Rate Card */}
          <Card.Root
            bgGradient={`linear(135deg, ${deepIndigo}, #2D2C5A)`}
            cursor="pointer"
            _hover={{
              transform: 'translateY(-8px) scale(1.02)',
              boxShadow: `0 25px 50px ${deepIndigo}60`,
            }}
            transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            onClick={() => router.push('/compliance-tracker')}
            borderRadius="2xl"
            position="relative"
            overflow="hidden"
            animation={isLoading ? 'none' : 'fadeInUp 0.6s ease-out 0.4s both'}
            sx={{
              '@keyframes fadeInUp': {
                from: {
                  opacity: 0,
                  transform: 'translateY(30px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            <Card.Body p={{ base: 5, md: 6 }} position="relative" zIndex={1}>
              <VStack gap={4} align="stretch">
                <HStack justify="space-between">
                  <Flex
                    w={{ base: 12, md: 14 }}
                    h={{ base: 12, md: 14 }}
                    bg="whiteAlpha.200"
                    backdropFilter="blur(10px)"
                    borderRadius="xl"
                    align="center"
                    justify="center"
                  >
                    <Icon as={FiTarget} boxSize={{ base: 6, md: 7 }} color={softTeal} />
                  </Flex>
                  <Icon as={FiAward} boxSize={6} color={softTeal} />
                </HStack>
                <Box>
                  <Text fontSize="sm" color="whiteAlpha.900" mb={2} fontWeight="semibold">Compliance Rate</Text>
                  <Heading
                    size={{ base: '2xl', md: '3xl' }}
                    color="white"
                    mb={3}
                    transition="all 0.3s"
                    letterSpacing="-0.02em"
                    fontWeight="bold"
                  >
                    {animatedStats.complianceRate}%
                  </Heading>
                  <Progress.Root value={animatedStats.complianceRate} h={2} borderRadius="full">
                    <Progress.Track bg="whiteAlpha.300">
                      <Progress.Range
                        bg={softTeal}
                        transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                      />
                    </Progress.Track>
                  </Progress.Root>
                </Box>
              </VStack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* Main Content Grid */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} mb={8}>
          {/* Recent Applications - Premium Card */}
          <Card.Root
            bg="white"
            border="1px solid"
            borderColor="purple.100"
            borderRadius="2xl"
            boxShadow="lg"
            animation={isLoading ? 'none' : 'fadeInUp 0.6s ease-out 0.5s both'}
            sx={{
              '@keyframes fadeInUp': {
                from: {
                  opacity: 0,
                  transform: 'translateY(30px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            <Card.Header p={{ base: 5, md: 6 }} pb={4}>
              <Flex justify="space-between" align="center" gap={3} flexWrap="wrap">
                <HStack gap={3}>
                  <Flex
                    w={10}
                    h={10}
                    bgGradient={`linear(135deg, ${softTeal}20, ${deepIndigo}10)`}
                    borderRadius="lg"
                    align="center"
                    justify="center"
                    display={{ base: 'none', sm: 'flex' }}
                  >
                    <Icon as={MdDescription} boxSize={5} color={softTeal} />
                  </Flex>
                  <Heading size={{ base: 'sm', md: 'md' }} color={deepIndigo}>Recent Applications</Heading>
                </HStack>
                <Button
                  size="sm"
                  variant="ghost"
                  color={deepIndigo}
                  _hover={{ bg: `${softTeal}10` }}
                  onClick={() => router.push('/grant-application')}
                >
                  <Text display={{ base: 'none', sm: 'inline' }}>View All</Text>
                  <Icon as={FiArrowRight} ml={{ base: 0, sm: 2 }} />
                </Button>
              </Flex>
            </Card.Header>
            <Card.Body p={{ base: 4, md: 6 }} pt={2}>
              <VStack gap={3} align="stretch">
                {recentApplications.map((app) => (
                  <Box
                    key={app.id}
                    p={{ base: 4, md: 5 }}
                    bg="purple.50"
                    border="1px"
                    borderColor="purple.100"
                    borderRadius="xl"
                    _hover={{
                      bg: `${softTeal}05`,
                      borderColor: softTeal,
                      transform: 'translateX(6px)',
                      boxShadow: `0 4px 15px ${softTeal}20`,
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    cursor="pointer"
                  >
                    <Flex justify="space-between" align="start" mb={3} gap={3} flexDirection={{ base: 'column', sm: 'row' }}>
                      <Box flex={1} minW={0}>
                        <Text
                          fontWeight="bold"
                          color={deepIndigo}
                          mb={1}
                          fontSize={{ base: 'sm', md: 'md' }}
                          noOfLines={2}
                          lineHeight="1.4"
                        >
                          {app.grantTitle}
                        </Text>
                        <Text fontSize="sm" color="purple.700" noOfLines={1}>
                          {app.organization}
                        </Text>
                      </Box>
                      <Badge
                        colorScheme={
                          app.status === 'Approved' ? 'green' :
                          app.status === 'Under Review' ? 'cyan' :
                          app.status === 'Submitted' ? 'blue' :
                          app.status === 'Rejected' ? 'red' : 'gray'
                        }
                        fontSize="xs"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontWeight="semibold"
                      >
                        {app.status}
                      </Badge>
                    </Flex>
                    <Separator my={3} />
                    <Flex justify="space-between" align="center" gap={4} flexWrap="wrap">
                      <HStack gap={2}>
                        <Icon as={FiDollarSign} boxSize={4} color="green.600" />
                        <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold" color="green.600">
                          {app.amount}
                        </Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon as={FiClock} boxSize={4} color={deepIndigo} />
                        <Text fontSize="sm" color="purple.700" fontWeight="medium">
                          {new Date(app.deadline).toLocaleDateString()}
                        </Text>
                      </HStack>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Upcoming Deadlines - Premium Card */}
          <Card.Root
            bg="white"
            border="1px solid"
            borderColor="purple.100"
            borderRadius="2xl"
            boxShadow="lg"
            animation={isLoading ? 'none' : 'fadeInUp 0.6s ease-out 0.6s both'}
            sx={{
              '@keyframes fadeInUp': {
                from: {
                  opacity: 0,
                  transform: 'translateY(30px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            <Card.Header p={{ base: 5, md: 6 }} pb={4}>
              <Flex justify="space-between" align="center" gap={3} flexWrap="wrap">
                <HStack gap={3}>
                  <Flex
                    w={10}
                    h={10}
                    bg="orange.100"
                    borderRadius="lg"
                    align="center"
                    justify="center"
                    display={{ base: 'none', sm: 'flex' }}
                  >
                    <Icon as={FiClock} boxSize={5} color="orange.500" />
                  </Flex>
                  <Heading size={{ base: 'sm', md: 'md' }} color={deepIndigo}>Upcoming Deadlines</Heading>
                </HStack>
                <Button
                  size="sm"
                  variant="ghost"
                  color={deepIndigo}
                  _hover={{ bg: `${softTeal}10` }}
                  onClick={() => router.push('/compliance-tracker')}
                >
                  <Text display={{ base: 'none', sm: 'inline' }}>View All</Text>
                  <Icon as={FiArrowRight} ml={{ base: 0, sm: 2 }} />
                </Button>
              </Flex>
            </Card.Header>
            <Card.Body p={{ base: 4, md: 6 }} pt={2}>
              <VStack gap={3} align="stretch">
                {upcomingDeadlines.map((item) => (
                  <Box
                    key={item.id}
                    p={{ base: 4, md: 5 }}
                    bg={item.status === 'Overdue' ? 'red.50' : 'purple.50'}
                    border="2px solid"
                    borderColor={item.status === 'Overdue' ? 'red.300' : 'purple.100'}
                    borderRadius="xl"
                    position="relative"
                    _hover={{
                      borderColor: item.status === 'Overdue' ? 'red.400' : softTeal,
                      transform: 'translateX(6px)',
                      boxShadow: item.status === 'Overdue' ? '0 4px 15px rgba(239, 68, 68, 0.2)' : `0 4px 15px ${softTeal}20`,
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    cursor="pointer"
                    onClick={() => router.push('/compliance-tracker')}
                  >
                    {item.status === 'Overdue' && (
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        bottom={0}
                        w="4px"
                        bg="red.500"
                        borderLeftRadius="xl"
                      />
                    )}
                    <Flex justify="space-between" align="start" mb={3} gap={3} flexDirection={{ base: 'column', sm: 'row' }}>
                      <HStack gap={2} flex={1} minW={0}>
                        {item.status === 'Overdue' && (
                          <Icon as={FiAlertCircle} boxSize={5} color="red.500" flexShrink={0} />
                        )}
                        <Box flex={1} minW={0}>
                          <Text
                            fontWeight="bold"
                            fontSize={{ base: 'sm', md: 'md' }}
                            color={item.status === 'Overdue' ? 'red.900' : deepIndigo}
                            mb={1}
                            noOfLines={2}
                            lineHeight="1.4"
                          >
                            {item.requirement}
                          </Text>
                          <Text fontSize="sm" color="purple.700" noOfLines={1}>
                            {item.grantName}
                          </Text>
                        </Box>
                      </HStack>
                      <Badge
                        colorScheme={
                          item.status === 'Overdue' ? 'red' :
                          item.priority === 'High' ? 'orange' :
                          item.priority === 'Medium' ? 'yellow' : 'gray'
                        }
                        fontSize="xs"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontWeight="semibold"
                      >
                        {item.priority}
                      </Badge>
                    </Flex>
                    <Separator my={3} />
                    <Flex justify="space-between" align="center" flexWrap="wrap" gap={3}>
                      <HStack gap={2}>
                        <Icon as={MdCalendarToday} boxSize={4} color={item.status === 'Overdue' ? 'red.600' : deepIndigo} />
                        <Text fontSize="sm" color={item.status === 'Overdue' ? 'red.700' : 'purple.700'} fontWeight="semibold">
                          {new Date(item.dueDate).toLocaleDateString()}
                        </Text>
                      </HStack>
                      {item.status === 'Overdue' && (
                        <Badge colorScheme="red" fontSize="xs" px={2} py={0.5} fontWeight="bold">
                          OVERDUE
                        </Badge>
                      )}
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* Quick Actions - Premium Grid */}
        <Card.Root
          mb={8}
          bgGradient={`linear(135deg, ${deepIndigo}05, ${softTeal}05)`}
          border="2px solid"
          borderColor={`${softTeal}30`}
          borderRadius="2xl"
          overflow="hidden"
          animation={isLoading ? 'none' : 'fadeInUp 0.6s ease-out 0.7s both'}
          sx={{
            '@keyframes fadeInUp': {
              from: {
                opacity: 0,
                transform: 'translateY(30px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          <Card.Header p={{ base: 5, md: 6 }}>
            <HStack gap={3}>
              <Flex
                w={10}
                h={10}
                bgGradient={`linear(135deg, ${softTeal}, #4BC5CC)`}
                borderRadius="lg"
                align="center"
                justify="center"
              >
                <Icon as={FiZap} boxSize={5} color="white" />
              </Flex>
              <Heading size={{ base: 'sm', md: 'md' }} color={deepIndigo}>Your Genies - Quick Actions</Heading>
            </HStack>
          </Card.Header>
          <Card.Body p={{ base: 4, md: 6 }} pt={2}>
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
              <Button
                h={{ base: '90px', md: '100px' }}
                flexDirection="column"
                gap={3}
                bg="white"
                border="2px solid"
                borderColor="purple.200"
                borderRadius="xl"
                _hover={{
                  borderColor: softTeal,
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: `0 12px 30px ${softTeal}25`,
                  bg: 'white',
                }}
                _active={{
                  transform: 'translateY(-2px) scale(0.98)',
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                onClick={() => router.push('/grant-application')}
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  w: '0',
                  h: '0',
                  borderRadius: 'full',
                  bg: `${softTeal}10`,
                  transform: 'translate(-50%, -50%)',
                  transition: 'width 0.6s, height 0.6s',
                }}
                _focusVisible={{
                  _before: {
                    w: '100%',
                    h: '100%',
                  },
                }}
              >
                <Flex
                  w={{ base: 10, md: 12 }}
                  h={{ base: 10, md: 12 }}
                  bgGradient={`linear(135deg, ${softTeal}20, ${deepIndigo}10)`}
                  borderRadius="xl"
                  align="center"
                  justify="center"
                  position="relative"
                  zIndex={1}
                >
                  <Icon as={MdAdd} boxSize={{ base: 5, md: 6 }} color={softTeal} />
                </Flex>
                <Text fontSize={{ base: 'xs', md: 'sm' }} color={deepIndigo} fontWeight="semibold" textAlign="center" position="relative" zIndex={1}>
                  Grant Genie
                </Text>
              </Button>

              <Button
                h={{ base: '90px', md: '100px' }}
                flexDirection="column"
                gap={3}
                bg="white"
                border="2px solid"
                borderColor="purple.200"
                borderRadius="xl"
                _hover={{
                  borderColor: softTeal,
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: `0 12px 30px ${softTeal}25`,
                  bg: 'white',
                }}
                _active={{
                  transform: 'translateY(-2px) scale(0.98)',
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                onClick={() => router.push('/genies/donor-meeting')}
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  w: '0',
                  h: '0',
                  borderRadius: 'full',
                  bg: `${softTeal}10`,
                  transform: 'translate(-50%, -50%)',
                  transition: 'width 0.6s, height 0.6s',
                }}
                _focusVisible={{
                  _before: {
                    w: '100%',
                    h: '100%',
                  },
                }}
              >
                <Flex
                  w={{ base: 10, md: 12 }}
                  h={{ base: 10, md: 12 }}
                  bg={`${softTeal}10`}
                  borderRadius="xl"
                  align="center"
                  justify="center"
                  position="relative"
                  zIndex={1}
                >
                  <Icon as={FiUsers} boxSize={{ base: 5, md: 6 }} color={softTeal} />
                </Flex>
                <Text fontSize={{ base: 'xs', md: 'sm' }} color={deepIndigo} fontWeight="semibold" textAlign="center" position="relative" zIndex={1}>
                  Donor Genie
                </Text>
              </Button>

              <Button
                h={{ base: '90px', md: '100px' }}
                flexDirection="column"
                gap={3}
                bg="white"
                border="2px solid"
                borderColor="purple.200"
                borderRadius="xl"
                _hover={{
                  borderColor: 'purple.400',
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 12px 30px rgba(128, 90, 213, 0.25)',
                  bg: 'white',
                }}
                _active={{
                  transform: 'translateY(-2px) scale(0.98)',
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                onClick={() => router.push('/genies')}
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  w: '0',
                  h: '0',
                  borderRadius: 'full',
                  bg: 'purple.50',
                  transform: 'translate(-50%, -50%)',
                  transition: 'width 0.6s, height 0.6s',
                }}
                _focusVisible={{
                  _before: {
                    w: '100%',
                    h: '100%',
                  },
                }}
              >
                <Flex
                  w={{ base: 10, md: 12 }}
                  h={{ base: 10, md: 12 }}
                  bg="purple.100"
                  borderRadius="xl"
                  align="center"
                  justify="center"
                  position="relative"
                  zIndex={1}
                >
                  <Icon as={FiMail} boxSize={{ base: 5, md: 6 }} color="purple.600" />
                </Flex>
                <Text fontSize={{ base: 'xs', md: 'sm' }} color={deepIndigo} fontWeight="semibold" textAlign="center" position="relative" zIndex={1}>
                  Newsletter Genie
                </Text>
              </Button>

              <Button
                h={{ base: '90px', md: '100px' }}
                flexDirection="column"
                gap={3}
                bg="white"
                border="2px solid"
                borderColor="purple.200"
                borderRadius="xl"
                _hover={{
                  borderColor: deepIndigo,
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: `0 12px 30px ${deepIndigo}25`,
                  bg: 'white',
                }}
                _active={{
                  transform: 'translateY(-2px) scale(0.98)',
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                onClick={() => router.push('/genies')}
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  w: '0',
                  h: '0',
                  borderRadius: 'full',
                  bg: `${deepIndigo}10`,
                  transform: 'translate(-50%, -50%)',
                  transition: 'width 0.6s, height 0.6s',
                }}
                _focusVisible={{
                  _before: {
                    w: '100%',
                    h: '100%',
                  },
                }}
              >
                <Flex
                  w={{ base: 10, md: 12 }}
                  h={{ base: 10, md: 12 }}
                  bg={`${deepIndigo}10`}
                  borderRadius="xl"
                  align="center"
                  justify="center"
                  position="relative"
                  zIndex={1}
                >
                  <Icon as={FiMessageCircle} boxSize={{ base: 5, md: 6 }} color={deepIndigo} />
                </Flex>
                <Text fontSize={{ base: 'xs', md: 'sm' }} color={deepIndigo} fontWeight="semibold" textAlign="center" position="relative" zIndex={1}>
                  All Genies
                </Text>
              </Button>
            </SimpleGrid>
          </Card.Body>
        </Card.Root>

        {/* Recent Activity - Premium Timeline */}
        <Card.Root
          bg="white"
          border="1px solid"
          borderColor="purple.100"
          borderRadius="2xl"
          boxShadow="lg"
          animation={isLoading ? 'none' : 'fadeInUp 0.6s ease-out 0.8s both'}
          sx={{
            '@keyframes fadeInUp': {
              from: {
                opacity: 0,
                transform: 'translateY(30px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          <Card.Header p={{ base: 5, md: 6 }}>
            <Flex justify="space-between" align="center" gap={3} flexWrap="wrap">
              <HStack gap={3}>
                <Flex
                  w={10}
                  h={10}
                  bg={`${deepIndigo}10`}
                  borderRadius="lg"
                  align="center"
                  justify="center"
                  display={{ base: 'none', sm: 'flex' }}
                >
                  <Icon as={MdNotifications} boxSize={5} color={deepIndigo} />
                </Flex>
                <Heading size={{ base: 'sm', md: 'md' }} color={deepIndigo}>Recent Activity</Heading>
              </HStack>
              <Button
                size="sm"
                variant="ghost"
                color={deepIndigo}
                _hover={{ bg: `${softTeal}10` }}
                onClick={() => router.push('/notifications')}
              >
                <Icon as={MdNotifications} mr={{ base: 0, sm: 2 }} />
                <Text display={{ base: 'none', sm: 'inline' }}>View All</Text>
              </Button>
            </Flex>
          </Card.Header>
          <Card.Body p={{ base: 4, md: 6 }} pt={2}>
            <VStack gap={0} align="stretch">
              {mockRecentActivity.map((activity, index) => (
                <Box key={activity.id}>
                  <Flex
                    p={4}
                    borderRadius="lg"
                    gap={4}
                    _hover={{ bg: `${softTeal}05` }}
                    transition="all 0.2s"
                    position="relative"
                  >
                    <Flex
                      w={10}
                      h={10}
                      borderRadius="full"
                      bg={
                        activity.action.includes('Approved') ? 'green.100' :
                        activity.action.includes('Submitted') ? `${softTeal}20` :
                        activity.action.includes('Completed') ? `${deepIndigo}10` : 'purple.100'
                      }
                      align="center"
                      justify="center"
                      flexShrink={0}
                      border="3px solid"
                      borderColor="white"
                      boxShadow="0 2px 8px rgba(0,0,0,0.1)"
                    >
                      <Box
                        w={3}
                        h={3}
                        borderRadius="full"
                        bg={
                          activity.action.includes('Approved') ? 'green.500' :
                          activity.action.includes('Submitted') ? softTeal :
                          activity.action.includes('Completed') ? deepIndigo : 'purple.400'
                        }
                      />
                    </Flex>
                    <Flex flex={1} justify="space-between" align="start" gap={4} direction={{ base: 'column', sm: 'row' }}>
                      <Box flex={1} minW={0}>
                        <Text
                          fontSize={{ base: 'sm', md: 'md' }}
                          fontWeight="semibold"
                          color={deepIndigo}
                          mb={1}
                          noOfLines={1}
                        >
                          {activity.action}
                        </Text>
                        <Text fontSize="sm" color="purple.700" noOfLines={1}>
                          {activity.grant}
                        </Text>
                      </Box>
                      <VStack gap={0} align={{ base: 'start', sm: 'end' }} flexShrink={0}>
                        <Text fontSize="sm" color={deepIndigo} fontWeight="semibold">{activity.user}</Text>
                        <Text fontSize="xs" color="purple.600">{activity.timestamp}</Text>
                      </VStack>
                    </Flex>
                  </Flex>
                  {index < mockRecentActivity.length - 1 && (
                    <Box pl={9}>
                      <Separator />
                    </Box>
                  )}
                </Box>
              ))}
            </VStack>
          </Card.Body>
        </Card.Root>
      </Container>
    </MainLayout>
  )
}
