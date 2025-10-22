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
} from '@chakra-ui/react'
import { MdDescription, MdTrendingUp, MdCheckCircle, MdPending, MdCalendarToday } from 'react-icons/md'
import MainLayout from '@/components/layout/MainLayout'
import { mockApplications, mockCompliance, mockDashboardStats, mockRecentActivity } from '@/lib/mockData'

export default function DashboardPage() {
  // Get recent applications (top 5)
  const recentApplications = mockApplications.slice(0, 5)

  // Get upcoming compliance deadlines
  const upcomingDeadlines = mockCompliance
    .filter(item => item.status === 'Upcoming' || item.status === 'Overdue')
    .slice(0, 5)

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <Box mb={8}>
          <Heading size="lg" mb={2} color="purple.900">
            Dashboard
          </Heading>
          <Text color="purple.800">
            Welcome back! Here's an overview of your grant activities.
          </Text>
        </Box>

        {/* Stats Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} mb={8}>
          <Card.Root>
            <Card.Body>
              <Flex align="center" gap={4}>
                <Flex
                  bg="purple.100"
                  borderRadius="lg"
                  p={3}
                  align="center"
                  justify="center"
                >
                  <Icon as={MdDescription} boxSize={6} color="purple.600" />
                </Flex>
                <VStack gap={0} align="start">
                  <Text fontSize="sm" color="purple.700">Active Grants</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="purple.900">{mockDashboardStats.activeGrants}</Text>
                  <Text fontSize="xs" color="purple.700">Currently managing</Text>
                </VStack>
              </Flex>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Flex align="center" gap={4}>
                <Flex
                  bg="green.100"
                  borderRadius="lg"
                  p={3}
                  align="center"
                  justify="center"
                >
                  <Icon as={MdCheckCircle} boxSize={6} color="green.600" />
                </Flex>
                <VStack gap={0} align="start">
                  <Text fontSize="sm" color="purple.700">Total Funding</Text>
                  <Text fontSize="2xl" fontWeight="bold" color="purple.900">{mockDashboardStats.totalFunding}</Text>
                  <Text fontSize="xs" color="purple.700">Secured to date</Text>
                </VStack>
              </Flex>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Flex align="center" gap={4}>
                <Flex
                  bg="orange.100"
                  borderRadius="lg"
                  p={3}
                  align="center"
                  justify="center"
                >
                  <Icon as={MdPending} boxSize={6} color="orange.600" />
                </Flex>
                <VStack gap={0} align="start">
                  <Text fontSize="sm" color="purple.700">Upcoming Deadlines</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="purple.900">{mockDashboardStats.upcomingDeadlines}</Text>
                  <Text fontSize="xs" color="purple.700">This month</Text>
                </VStack>
              </Flex>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Flex align="center" gap={4}>
                <Flex
                  bg="purple.100"
                  borderRadius="lg"
                  p={3}
                  align="center"
                  justify="center"
                >
                  <Icon as={MdTrendingUp} boxSize={6} color="purple.600" />
                </Flex>
                <VStack gap={0} align="start">
                  <Text fontSize="sm" color="purple.700">Compliance Rate</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="purple.900">{mockDashboardStats.complianceRate}%</Text>
                  <Text fontSize="xs" color="purple.700">On track</Text>
                </VStack>
              </Flex>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6} mb={8}>
          {/* Recent Applications */}
          <Card.Root>
            <Card.Header>
              <Heading size="md" color="purple.900">Recent Applications</Heading>
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
                    _hover={{ bg: 'gray.50' }}
                    cursor="pointer"
                  >
                    <Flex justify="space-between" align="start" mb={2}>
                      <Box flex={1}>
                        <Text fontWeight="semibold" mb={1} color="purple.900">{app.grantTitle}</Text>
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
                    <HStack justify="space-between">
                      <Text fontSize="sm" fontWeight="medium" color="green.600">
                        {app.amount}
                      </Text>
                      <Text fontSize="xs" color="purple.700">
                        Due: {new Date(app.deadline).toLocaleDateString()}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Upcoming Deadlines */}
          <Card.Root>
            <Card.Header>
              <Heading size="md" color="purple.900">Upcoming Deadlines</Heading>
            </Card.Header>
            <Card.Body>
              <VStack gap={3} align="stretch">
                {upcomingDeadlines.map((item) => (
                  <Box
                    key={item.id}
                    p={4}
                    border="1px"
                    borderColor={item.status === 'Overdue' ? 'red.200' : 'gray.200'}
                    bg={item.status === 'Overdue' ? 'red.50' : 'white'}
                    borderRadius="md"
                  >
                    <Flex justify="space-between" align="start" mb={2}>
                      <Box flex={1}>
                        <Text fontWeight="semibold" fontSize="sm" mb={1} color="purple.900">
                          {item.requirement}
                        </Text>
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
                    <HStack gap={2}>
                      <Icon as={MdCalendarToday} boxSize={3} color="purple.600" />
                      <Text fontSize="xs" color={item.status === 'Overdue' ? 'red.600' : 'purple.800'}>
                        Due: {new Date(item.dueDate).toLocaleDateString()}
                        {item.status === 'Overdue' && ' - OVERDUE'}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* Recent Activity */}
        <Card.Root>
          <Card.Header>
            <Heading size="md" color="purple.900">Recent Activity</Heading>
          </Card.Header>
          <Card.Body>
            <VStack gap={3} align="stretch">
              {mockRecentActivity.map((activity) => (
                <HStack
                  key={activity.id}
                  p={3}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  justify="space-between"
                >
                  <HStack gap={3} flex={1}>
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
                    <Box flex={1}>
                      <Text fontSize="sm" fontWeight="medium" color="purple.900">{activity.action}</Text>
                      <Text fontSize="xs" color="purple.800">{activity.grant}</Text>
                    </Box>
                  </HStack>
                  <VStack gap={0} align="end">
                    <Text fontSize="xs" color="purple.700">{activity.user}</Text>
                    <Text fontSize="xs" color="purple.600">{activity.timestamp}</Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </Card.Body>
        </Card.Root>
      </Container>
    </MainLayout>
  )
}
