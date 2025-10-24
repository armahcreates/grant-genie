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
import { FiTrendingUp, FiArrowRight, FiClock, FiAlertCircle, FiZap, FiTarget, FiDollarSign, FiAward } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { mockApplications, mockCompliance, mockDashboardStats, mockRecentActivity } from '@/lib/mockData'

export default function DashboardPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
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
        <Container maxW="container.xl" py={12} position="relative" zIndex={1}>
          <VStack align="stretch" gap={6}>
            {/* Welcome Header */}
            <Flex justify="space-between" align="start" flexWrap="wrap" gap={4}>
              <VStack align="start" gap={2}>
                <HStack gap={3}>
                  <Text fontSize="lg" color="gray.300" fontWeight="medium">
                    {getGreeting()}, Sarah
                  </Text>
                  <Text fontSize="3xl">👋</Text>
                </HStack>
                <Heading size="2xl" color="white" letterSpacing="-0.02em">
                  Your Headspace Command Center
                </Heading>
                <Text color="gray.300" fontSize="lg" maxW="2xl">
                  {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </Text>
              </VStack>

              <HStack gap={3}>
                <Button
                  size="lg"
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
                  <Icon as={MdSearch} />
                  Discover Grants
                </Button>
                <Button
                  size="lg"
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
                  <Icon as={FiZap} />
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
              >
                <Card.Body p={5}>
                  <HStack gap={4}>
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
                      <Text fontWeight="bold" color="white" mb={1} fontSize="lg">
                        Action Required: Overdue Tasks
                      </Text>
                      <Text fontSize="md" color="gray.200">
                        You have {upcomingDeadlines.filter(item => item.status === 'Overdue').length} overdue compliance task(s) that need immediate attention.
                      </Text>
                    </Box>
                    <Button
                      size="md"
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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} mb={8} mt={-12} position="relative" zIndex={2}>
          {/* Active Grants Card */}
          <Card.Root
            bg="white"
            cursor="pointer"
            border="1px solid"
            borderColor="gray.100"
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
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              h="4px"
              bgGradient={`linear(to-r, ${deepIndigo}, ${softTeal})`}
            />
            <Card.Body p={6}>
              <VStack gap={4} align="stretch">
                <HStack justify="space-between">
                  <Flex
                    w={14}
                    h={14}
                    bgGradient={`linear(135deg, ${softTeal}20, ${deepIndigo}10)`}
                    borderRadius="xl"
                    align="center"
                    justify="center"
                    boxShadow={`0 4px 15px ${softTeal}30`}
                  >
                    <Icon as={MdDescription} boxSize={7} color={softTeal} />
                  </Flex>
                  <Icon as={FiArrowRight} color={deepIndigo} boxSize={5} />
                </HStack>
                <Box>
                  <Text fontSize="sm" color="gray.600" mb={2} fontWeight="medium">Active Grants</Text>
                  <Heading size="3xl" color={deepIndigo} mb={1}>{mockDashboardStats.activeGrants}</Heading>
                  <Text fontSize="sm" color="gray.500">Currently managing</Text>
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
            <Card.Body p={6} position="relative" zIndex={1}>
              <VStack gap={4} align="stretch">
                <HStack justify="space-between">
                  <Flex
                    w={14}
                    h={14}
                    bg="whiteAlpha.300"
                    backdropFilter="blur(10px)"
                    borderRadius="xl"
                    align="center"
                    justify="center"
                  >
                    <Icon as={FiDollarSign} boxSize={7} color="white" />
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
                  <Heading size="2xl" color="white" mb={1}>{mockDashboardStats.totalFunding}</Heading>
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
            borderColor={mockDashboardStats.upcomingDeadlines > 5 ? 'orange.300' : 'gray.100'}
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
            <Card.Body p={6}>
              <VStack gap={4} align="stretch">
                <HStack justify="space-between">
                  <Flex
                    w={14}
                    h={14}
                    bg="orange.100"
                    borderRadius="xl"
                    align="center"
                    justify="center"
                  >
                    <Icon as={FiClock} boxSize={7} color="orange.500" />
                  </Flex>
                  {mockDashboardStats.upcomingDeadlines > 5 && (
                    <Badge colorScheme="orange" fontSize="sm" px={3} py={1}>Urgent</Badge>
                  )}
                </HStack>
                <Box>
                  <Text fontSize="sm" color="gray.600" mb={2} fontWeight="medium">Upcoming Deadlines</Text>
                  <Heading size="3xl" color={deepIndigo} mb={1}>{mockDashboardStats.upcomingDeadlines}</Heading>
                  <Text fontSize="sm" color="gray.500">This month</Text>
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
          >
            <Card.Body p={6} position="relative" zIndex={1}>
              <VStack gap={4} align="stretch">
                <HStack justify="space-between">
                  <Flex
                    w={14}
                    h={14}
                    bg="whiteAlpha.200"
                    backdropFilter="blur(10px)"
                    borderRadius="xl"
                    align="center"
                    justify="center"
                  >
                    <Icon as={FiTarget} boxSize={7} color={softTeal} />
                  </Flex>
                  <Icon as={FiAward} boxSize={6} color={softTeal} />
                </HStack>
                <Box>
                  <Text fontSize="sm" color="whiteAlpha.900" mb={2} fontWeight="semibold">Compliance Rate</Text>
                  <Heading size="3xl" color="white" mb={3}>{mockDashboardStats.complianceRate}%</Heading>
                  <Progress.Root value={mockDashboardStats.complianceRate} h={2} borderRadius="full">
                    <Progress.Track bg="whiteAlpha.300">
                      <Progress.Range bg={softTeal} />
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
            borderColor="gray.100"
            borderRadius="2xl"
            boxShadow="lg"
          >
            <Card.Header p={6} pb={4}>
              <Flex justify="space-between" align="center">
                <HStack gap={3}>
                  <Flex
                    w={10}
                    h={10}
                    bgGradient={`linear(135deg, ${softTeal}20, ${deepIndigo}10)`}
                    borderRadius="lg"
                    align="center"
                    justify="center"
                  >
                    <Icon as={MdDescription} boxSize={5} color={softTeal} />
                  </Flex>
                  <Heading size="md" color={deepIndigo}>Recent Applications</Heading>
                </HStack>
                <Button
                  size="sm"
                  variant="ghost"
                  color={deepIndigo}
                  _hover={{ bg: `${softTeal}10` }}
                  onClick={() => router.push('/grant-application')}
                >
                  View All
                  <Icon as={FiArrowRight} ml={2} />
                </Button>
              </Flex>
            </Card.Header>
            <Card.Body p={6} pt={2}>
              <VStack gap={3} align="stretch">
                {recentApplications.map((app) => (
                  <Box
                    key={app.id}
                    p={5}
                    bg="gray.50"
                    border="1px"
                    borderColor="gray.100"
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
                    <Flex justify="space-between" align="start" mb={3}>
                      <Box flex={1}>
                        <Text fontWeight="bold" color={deepIndigo} mb={1} fontSize="md">
                          {app.grantTitle}
                        </Text>
                        <Text fontSize="sm" color="gray.600">{app.organization}</Text>
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
                    <Flex justify="space-between" align="center">
                      <HStack gap={2}>
                        <Icon as={FiDollarSign} boxSize={4} color="green.600" />
                        <Text fontSize="md" fontWeight="bold" color="green.600">
                          {app.amount}
                        </Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon as={FiClock} boxSize={4} color={deepIndigo} />
                        <Text fontSize="sm" color="gray.600" fontWeight="medium">
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
            borderColor="gray.100"
            borderRadius="2xl"
            boxShadow="lg"
          >
            <Card.Header p={6} pb={4}>
              <Flex justify="space-between" align="center">
                <HStack gap={3}>
                  <Flex
                    w={10}
                    h={10}
                    bg="orange.100"
                    borderRadius="lg"
                    align="center"
                    justify="center"
                  >
                    <Icon as={FiClock} boxSize={5} color="orange.500" />
                  </Flex>
                  <Heading size="md" color={deepIndigo}>Upcoming Deadlines</Heading>
                </HStack>
                <Button
                  size="sm"
                  variant="ghost"
                  color={deepIndigo}
                  _hover={{ bg: `${softTeal}10` }}
                  onClick={() => router.push('/compliance-tracker')}
                >
                  View All
                  <Icon as={FiArrowRight} ml={2} />
                </Button>
              </Flex>
            </Card.Header>
            <Card.Body p={6} pt={2}>
              <VStack gap={3} align="stretch">
                {upcomingDeadlines.map((item) => (
                  <Box
                    key={item.id}
                    p={5}
                    bg={item.status === 'Overdue' ? 'red.50' : 'gray.50'}
                    border="2px solid"
                    borderColor={item.status === 'Overdue' ? 'red.300' : 'gray.100'}
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
                    <Flex justify="space-between" align="start" mb={3}>
                      <HStack gap={2} flex={1}>
                        {item.status === 'Overdue' && (
                          <Icon as={FiAlertCircle} boxSize={5} color="red.500" />
                        )}
                        <Box flex={1}>
                          <Text fontWeight="bold" fontSize="md" color={item.status === 'Overdue' ? 'red.900' : deepIndigo} mb={1}>
                            {item.requirement}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
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
                    <Flex justify="space-between" align="center">
                      <HStack gap={2}>
                        <Icon as={MdCalendarToday} boxSize={4} color={item.status === 'Overdue' ? 'red.600' : deepIndigo} />
                        <Text fontSize="sm" color={item.status === 'Overdue' ? 'red.700' : 'gray.600'} fontWeight="semibold">
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
        >
          <Card.Header p={6}>
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
              <Heading size="md" color={deepIndigo}>Your Genies - Quick Actions</Heading>
            </HStack>
          </Card.Header>
          <Card.Body p={6} pt={2}>
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
              <Button
                h="100px"
                flexDirection="column"
                gap={3}
                bg="white"
                border="2px solid"
                borderColor="gray.200"
                borderRadius="xl"
                _hover={{
                  borderColor: softTeal,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 20px ${softTeal}20`,
                  bg: 'white',
                }}
                transition="all 0.3s"
                onClick={() => router.push('/grant-search')}
              >
                <Flex
                  w={12}
                  h={12}
                  bg={`${softTeal}10`}
                  borderRadius="xl"
                  align="center"
                  justify="center"
                >
                  <Icon as={MdSearch} boxSize={6} color={softTeal} />
                </Flex>
                <Text fontSize="sm" color={deepIndigo} fontWeight="semibold">Discover Grants</Text>
              </Button>

              <Button
                h="100px"
                flexDirection="column"
                gap={3}
                bg="white"
                border="2px solid"
                borderColor="gray.200"
                borderRadius="xl"
                _hover={{
                  borderColor: softTeal,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 20px ${softTeal}20`,
                  bg: 'white',
                }}
                transition="all 0.3s"
                onClick={() => router.push('/grant-application')}
              >
                <Flex
                  w={12}
                  h={12}
                  bgGradient={`linear(135deg, ${softTeal}20, ${deepIndigo}10)`}
                  borderRadius="xl"
                  align="center"
                  justify="center"
                >
                  <Icon as={MdAdd} boxSize={6} color={softTeal} />
                </Flex>
                <Text fontSize="sm" color={deepIndigo} fontWeight="semibold">Grant Writing Genie</Text>
              </Button>

              <Button
                h="100px"
                flexDirection="column"
                gap={3}
                bg="white"
                border="2px solid"
                borderColor="gray.200"
                borderRadius="xl"
                _hover={{
                  borderColor: softTeal,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 20px ${softTeal}20`,
                  bg: 'white',
                }}
                transition="all 0.3s"
                onClick={() => router.push('/compliance-tracker')}
              >
                <Flex
                  w={12}
                  h={12}
                  bg="green.100"
                  borderRadius="xl"
                  align="center"
                  justify="center"
                >
                  <Icon as={MdCheckCircle} boxSize={6} color="green.600" />
                </Flex>
                <Text fontSize="sm" color={deepIndigo} fontWeight="semibold">Track Compliance</Text>
              </Button>

              <Button
                h="100px"
                flexDirection="column"
                gap={3}
                bg="white"
                border="2px solid"
                borderColor="gray.200"
                borderRadius="xl"
                _hover={{
                  borderColor: softTeal,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 20px ${softTeal}20`,
                  bg: 'white',
                }}
                transition="all 0.3s"
                onClick={() => router.push('/reporting')}
              >
                <Flex
                  w={12}
                  h={12}
                  bg={`${deepIndigo}10`}
                  borderRadius="xl"
                  align="center"
                  justify="center"
                >
                  <Icon as={MdTrendingUp} boxSize={6} color={deepIndigo} />
                </Flex>
                <Text fontSize="sm" color={deepIndigo} fontWeight="semibold">View Reports</Text>
              </Button>
            </SimpleGrid>
          </Card.Body>
        </Card.Root>

        {/* Recent Activity - Premium Timeline */}
        <Card.Root
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          borderRadius="2xl"
          boxShadow="lg"
        >
          <Card.Header p={6}>
            <Flex justify="space-between" align="center">
              <HStack gap={3}>
                <Flex
                  w={10}
                  h={10}
                  bg={`${deepIndigo}10`}
                  borderRadius="lg"
                  align="center"
                  justify="center"
                >
                  <Icon as={MdNotifications} boxSize={5} color={deepIndigo} />
                </Flex>
                <Heading size="md" color={deepIndigo}>Recent Activity</Heading>
              </HStack>
              <Button
                size="sm"
                variant="ghost"
                color={deepIndigo}
                _hover={{ bg: `${softTeal}10` }}
                onClick={() => router.push('/notifications')}
              >
                <Icon as={MdNotifications} />
                View All
              </Button>
            </Flex>
          </Card.Header>
          <Card.Body p={6} pt={2}>
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
                        activity.action.includes('Completed') ? `${deepIndigo}10` : 'gray.100'
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
                          activity.action.includes('Completed') ? deepIndigo : 'gray.400'
                        }
                      />
                    </Flex>
                    <Flex flex={1} justify="space-between" align="center" gap={4}>
                      <Box flex={1}>
                        <Text fontSize="md" fontWeight="semibold" color={deepIndigo} mb={1}>
                          {activity.action}
                        </Text>
                        <Text fontSize="sm" color="gray.600">{activity.grant}</Text>
                      </Box>
                      <VStack gap={0} align="end" flexShrink={0}>
                        <Text fontSize="sm" color={deepIndigo} fontWeight="semibold">{activity.user}</Text>
                        <Text fontSize="xs" color="gray.500">{activity.timestamp}</Text>
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
