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
} from '@chakra-ui/react'
import { MdDescription, MdTrendingUp, MdCheckCircle, MdPending, MdCalendarToday, MdSearch, MdAdd, MdNotifications } from 'react-icons/md'
import { FiTrendingUp, FiArrowRight, FiClock, FiAlertCircle } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import { mockApplications, mockCompliance, mockDashboardStats, mockRecentActivity } from '@/lib/mockData'

export default function DashboardPage() {
  const router = useRouter()

  // Get recent applications (top 5)
  const recentApplications = mockApplications.slice(0, 5)

  // Get upcoming compliance deadlines
  const upcomingDeadlines = mockCompliance
    .filter(item => item.status === 'Upcoming' || item.status === 'Overdue')
    .slice(0, 5)

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        {/* Header with Quick Actions */}
        <Flex justify="space-between" align="start" mb={8} flexWrap="wrap" gap={4}>
          <Box>
            <Heading size="lg" mb={2} color="purple.900">
              Welcome back, Sarah! 👋
            </Heading>
            <Text color="purple.800">
              Here's an overview of your grant activities and upcoming tasks
            </Text>
          </Box>
          <HStack gap={3}>
            <Button
              colorScheme="purple"
              variant="outline"
              onClick={() => router.push('/grant-search')}
            >
              <Icon as={MdSearch} mr={2} />
              Find Grants
            </Button>
            <Button
              colorScheme="purple"
              onClick={() => router.push('/grant-application')}
            >
              <Icon as={MdAdd} mr={2} />
              New Application
            </Button>
          </HStack>
        </Flex>

        {/* Urgent Alert Banner */}
        {upcomingDeadlines.some(item => item.status === 'Overdue') && (
          <Card.Root bg="red.50" borderLeft="4px" borderLeftColor="red.500" mb={6}>
            <Card.Body>
              <HStack gap={3}>
                <Icon as={FiAlertCircle} boxSize={5} color="red.600" />
                <Box flex={1}>
                  <Text fontWeight="semibold" color="red.900" mb={1}>
                    Action Required: Overdue Compliance Tasks
                  </Text>
                  <Text fontSize="sm" color="red.700">
                    You have {upcomingDeadlines.filter(item => item.status === 'Overdue').length} overdue compliance task(s) that need immediate attention.
                  </Text>
                </Box>
                <Button size="sm" colorScheme="red" onClick={() => router.push('/compliance-tracker')}>
                  View Tasks
                </Button>
              </HStack>
            </Card.Body>
          </Card.Root>
        )}

        {/* Enhanced Stats Cards with Actions */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} mb={8}>
          <Card.Root
            cursor="pointer"
            _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => router.push('/grant-application')}
          >
            <Card.Body>
              <Flex direction="column" gap={3}>
                <Flex align="center" justify="space-between">
                  <Flex
                    bg="purple.100"
                    borderRadius="lg"
                    p={3}
                    align="center"
                    justify="center"
                  >
                    <Icon as={MdDescription} boxSize={6} color="purple.600" />
                  </Flex>
                  <Icon as={FiArrowRight} color="purple.600" />
                </Flex>
                <Box>
                  <Text fontSize="sm" color="purple.700" mb={1}>Active Grants</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="purple.900">{mockDashboardStats.activeGrants}</Text>
                  <Text fontSize="xs" color="purple.700">Currently managing</Text>
                </Box>
              </Flex>
            </Card.Body>
          </Card.Root>

          <Card.Root
            cursor="pointer"
            _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => router.push('/reporting')}
          >
            <Card.Body>
              <Flex direction="column" gap={3}>
                <Flex align="center" justify="space-between">
                  <Flex
                    bg="green.100"
                    borderRadius="lg"
                    p={3}
                    align="center"
                    justify="center"
                  >
                    <Icon as={MdCheckCircle} boxSize={6} color="green.600" />
                  </Flex>
                  <Badge colorScheme="green" size="sm">
                    <Icon as={FiTrendingUp} mr={1} />
                    +23%
                  </Badge>
                </Flex>
                <Box>
                  <Text fontSize="sm" color="purple.700" mb={1}>Total Funding</Text>
                  <Text fontSize="2xl" fontWeight="bold" color="purple.900">{mockDashboardStats.totalFunding}</Text>
                  <Text fontSize="xs" color="purple.700">Secured to date</Text>
                </Box>
              </Flex>
            </Card.Body>
          </Card.Root>

          <Card.Root
            cursor="pointer"
            _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
            transition="all 0.2s"
            borderLeft={mockDashboardStats.upcomingDeadlines > 5 ? '4px' : '0'}
            borderLeftColor="orange.500"
            onClick={() => router.push('/compliance-tracker')}
          >
            <Card.Body>
              <Flex direction="column" gap={3}>
                <Flex align="center" justify="space-between">
                  <Flex
                    bg="orange.100"
                    borderRadius="lg"
                    p={3}
                    align="center"
                    justify="center"
                  >
                    <Icon as={MdPending} boxSize={6} color="orange.600" />
                  </Flex>
                  {mockDashboardStats.upcomingDeadlines > 5 && (
                    <Badge colorScheme="orange" size="sm">Urgent</Badge>
                  )}
                </Flex>
                <Box>
                  <Text fontSize="sm" color="purple.700" mb={1}>Upcoming Deadlines</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="purple.900">{mockDashboardStats.upcomingDeadlines}</Text>
                  <Text fontSize="xs" color="purple.700">This month</Text>
                </Box>
              </Flex>
            </Card.Body>
          </Card.Root>

          <Card.Root
            cursor="pointer"
            _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => router.push('/compliance-tracker')}
          >
            <Card.Body>
              <Flex direction="column" gap={3}>
                <Flex align="center" justify="space-between">
                  <Flex
                    bg="purple.100"
                    borderRadius="lg"
                    p={3}
                    align="center"
                    justify="center"
                  >
                    <Icon as={MdTrendingUp} boxSize={6} color="purple.600" />
                  </Flex>
                </Flex>
                <Box>
                  <Text fontSize="sm" color="purple.700" mb={1}>Compliance Rate</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="purple.900">{mockDashboardStats.complianceRate}%</Text>
                  <Progress.Root value={mockDashboardStats.complianceRate} size="sm" colorScheme="purple" mt={2}>
                    <Progress.Track>
                      <Progress.Range />
                    </Progress.Track>
                  </Progress.Root>
                </Box>
              </Flex>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6} mb={8}>
          {/* Recent Applications */}
          <Card.Root>
            <Card.Header>
              <Flex justify="space-between" align="center">
                <Heading size="md" color="purple.900">Recent Applications</Heading>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => router.push('/grant-application')}
                >
                  View All
                  <Icon as={FiArrowRight} ml={2} />
                </Button>
              </Flex>
            </Card.Header>
            <Card.Body>
              <VStack gap={3} align="stretch">
                {recentApplications.map((app) => (
                  <Box
                    key={app.id}
                    p={4}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    _hover={{ bg: 'purple.50', borderColor: 'purple.300', transform: 'translateX(4px)' }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    <Flex justify="space-between" align="start" mb={2}>
                      <Box flex={1}>
                        <HStack mb={1}>
                          <Text fontWeight="semibold" color="purple.900">{app.grantTitle}</Text>
                        </HStack>
                        <Text fontSize="sm" color="purple.800">{app.organization}</Text>
                      </Box>
                      <Badge
                        colorScheme={
                          app.status === 'Approved' ? 'green' :
                          app.status === 'Under Review' ? 'purple' :
                          app.status === 'Submitted' ? 'purple' :
                          app.status === 'Rejected' ? 'red' : 'gray'
                        }
                      >
                        {app.status}
                      </Badge>
                    </Flex>
                    <Separator my={2} />
                    <HStack justify="space-between">
                      <HStack>
                        <Text fontSize="sm" fontWeight="bold" color="green.600">
                          {app.amount}
                        </Text>
                      </HStack>
                      <HStack gap={1}>
                        <Icon as={FiClock} boxSize={3} color="purple.600" />
                        <Text fontSize="xs" color="purple.700">
                          {new Date(app.deadline).toLocaleDateString()}
                        </Text>
                      </HStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Upcoming Deadlines */}
          <Card.Root>
            <Card.Header>
              <Flex justify="space-between" align="center">
                <Heading size="md" color="purple.900">Upcoming Deadlines</Heading>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => router.push('/compliance-tracker')}
                >
                  View All
                  <Icon as={FiArrowRight} ml={2} />
                </Button>
              </Flex>
            </Card.Header>
            <Card.Body>
              <VStack gap={3} align="stretch">
                {upcomingDeadlines.map((item) => (
                  <Box
                    key={item.id}
                    p={4}
                    border="1px"
                    borderColor={item.status === 'Overdue' ? 'red.300' : 'gray.200'}
                    bg={item.status === 'Overdue' ? 'red.50' : 'white'}
                    borderRadius="md"
                    borderLeft={item.status === 'Overdue' ? '4px' : '0'}
                    borderLeftColor="red.500"
                    _hover={{ shadow: 'md', transform: 'translateX(4px)' }}
                    transition="all 0.2s"
                    cursor="pointer"
                    onClick={() => router.push('/compliance-tracker')}
                  >
                    <Flex justify="space-between" align="start" mb={2}>
                      <Box flex={1}>
                        <HStack mb={1}>
                          {item.status === 'Overdue' && (
                            <Icon as={FiAlertCircle} boxSize={4} color="red.500" />
                          )}
                          <Text fontWeight="semibold" fontSize="sm" color="purple.900">
                            {item.requirement}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="purple.800">
                          {item.grantName}
                        </Text>
                      </Box>
                      <Badge
                        colorScheme={
                          item.status === 'Overdue' ? 'red' :
                          item.priority === 'High' ? 'orange' :
                          item.priority === 'Medium' ? 'yellow' : 'gray'
                        }
                        size="sm"
                      >
                        {item.priority}
                      </Badge>
                    </Flex>
                    <Separator my={2} />
                    <HStack gap={2} justify="space-between">
                      <HStack gap={2}>
                        <Icon as={MdCalendarToday} boxSize={3} color={item.status === 'Overdue' ? 'red.600' : 'purple.600'} />
                        <Text fontSize="xs" color={item.status === 'Overdue' ? 'red.700' : 'purple.800'} fontWeight="medium">
                          {new Date(item.dueDate).toLocaleDateString()}
                        </Text>
                      </HStack>
                      {item.status === 'Overdue' && (
                        <Badge colorScheme="red" size="xs">OVERDUE</Badge>
                      )}
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* Quick Actions Grid */}
        <Card.Root mb={8} bg="purple.50" borderColor="purple.200">
          <Card.Header>
            <Heading size="md" color="purple.900">Quick Actions</Heading>
          </Card.Header>
          <Card.Body>
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
              <Button
                height="80px"
                flexDirection="column"
                gap={2}
                variant="outline"
                bg="white"
                _hover={{ bg: 'purple.100', borderColor: 'purple.400' }}
                onClick={() => router.push('/grant-search')}
              >
                <Icon as={MdSearch} boxSize={6} color="purple.600" />
                <Text fontSize="sm" color="purple.900">Search Grants</Text>
              </Button>
              <Button
                height="80px"
                flexDirection="column"
                gap={2}
                variant="outline"
                bg="white"
                _hover={{ bg: 'purple.100', borderColor: 'purple.400' }}
                onClick={() => router.push('/grant-application')}
              >
                <Icon as={MdAdd} boxSize={6} color="purple.600" />
                <Text fontSize="sm" color="purple.900">New Application</Text>
              </Button>
              <Button
                height="80px"
                flexDirection="column"
                gap={2}
                variant="outline"
                bg="white"
                _hover={{ bg: 'purple.100', borderColor: 'purple.400' }}
                onClick={() => router.push('/compliance-tracker')}
              >
                <Icon as={MdCheckCircle} boxSize={6} color="purple.600" />
                <Text fontSize="sm" color="purple.900">Track Compliance</Text>
              </Button>
              <Button
                height="80px"
                flexDirection="column"
                gap={2}
                variant="outline"
                bg="white"
                _hover={{ bg: 'purple.100', borderColor: 'purple.400' }}
                onClick={() => router.push('/reporting')}
              >
                <Icon as={MdTrendingUp} boxSize={6} color="purple.600" />
                <Text fontSize="sm" color="purple.900">View Reports</Text>
              </Button>
            </SimpleGrid>
          </Card.Body>
        </Card.Root>

        {/* Recent Activity */}
        <Card.Root>
          <Card.Header>
            <Flex justify="space-between" align="center">
              <Heading size="md" color="purple.900">Recent Activity</Heading>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.push('/notifications')}
              >
                <Icon as={MdNotifications} mr={2} />
                View All
              </Button>
            </Flex>
          </Card.Header>
          <Card.Body>
            <VStack gap={3} align="stretch">
              {mockRecentActivity.map((activity, index) => (
                <Box key={activity.id}>
                  <HStack
                    p={3}
                    borderRadius="md"
                    justify="space-between"
                    _hover={{ bg: 'purple.50' }}
                    transition="all 0.2s"
                  >
                    <HStack gap={3} flex={1}>
                      <Flex
                        w={8}
                        h={8}
                        borderRadius="full"
                        bg={
                          activity.action.includes('Approved') ? 'green.100' :
                          activity.action.includes('Submitted') ? 'purple.100' :
                          activity.action.includes('Completed') ? 'purple.100' : 'gray.100'
                        }
                        align="center"
                        justify="center"
                      >
                        <Box
                          w={2}
                          h={2}
                          borderRadius="full"
                          bg={
                            activity.action.includes('Approved') ? 'green.500' :
                            activity.action.includes('Submitted') ? 'purple.500' :
                            activity.action.includes('Completed') ? 'purple.500' : 'gray.400'
                          }
                        />
                      </Flex>
                      <Box flex={1}>
                        <Text fontSize="sm" fontWeight="medium" color="purple.900">{activity.action}</Text>
                        <Text fontSize="xs" color="purple.700">{activity.grant}</Text>
                      </Box>
                    </HStack>
                    <VStack gap={0} align="end">
                      <Text fontSize="xs" color="purple.700" fontWeight="medium">{activity.user}</Text>
                      <Text fontSize="xs" color="purple.600">{activity.timestamp}</Text>
                    </VStack>
                  </HStack>
                  {index < mockRecentActivity.length - 1 && <Separator />}
                </Box>
              ))}
            </VStack>
          </Card.Body>
        </Card.Root>
      </Container>
    </MainLayout>
  )
}
