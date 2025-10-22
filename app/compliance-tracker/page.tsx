'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Card,
  Badge,
  Icon,
  SimpleGrid,
  Progress,
  Checkbox,
  Tabs,
  Table,
  Flex,
  Separator,
  Stack,
} from '@chakra-ui/react'
import { useState } from 'react'
import {
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiFileText,
  FiCalendar,
  FiUpload,
  FiDownload,
} from 'react-icons/fi'
import MainLayout from '@/components/layout/MainLayout'
import { mockCompliance, type ComplianceItem } from '@/lib/mockData'

export default function ComplianceTrackerPage() {
  const tasks = mockCompliance

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'green'
      case 'In Progress':
      case 'Upcoming':
        return 'purple'
      case 'Overdue':
        return 'red'
      default:
        return 'gray'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'red'
      case 'Medium':
        return 'orange'
      case 'Low':
        return 'green'
      default:
        return 'gray'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return FiCheckCircle
      case 'Overdue':
        return FiAlertCircle
      default:
        return FiClock
    }
  }

  const completedTasks = tasks.filter((t) => t.status === 'Completed').length
  const totalTasks = tasks.length
  const complianceRate = Math.round((completedTasks / totalTasks) * 100)

  const overdueTasks = tasks.filter((t) => t.status === 'Overdue')
  const pendingTasks = tasks.filter((t) => t.status === 'In Progress' || t.status === 'Upcoming')
  const completedTasksList = tasks.filter((t) => t.status === 'Completed')

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <VStack gap={8} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="lg" mb={2} color="purple.900">
              Compliance Tracker
            </Heading>
            <Text color="purple.800">
              Monitor and manage all compliance requirements for your active grants
            </Text>
          </Box>

          {/* Stats Overview */}
          <SimpleGrid columns={{ base: 1, md: 4 }} gap={6}>
            <Card.Root>
              <Card.Body>
                <VStack align="start" gap={2}>
                  <Icon as={FiCheckCircle} boxSize={8} color="green.500" />
                  <Text fontSize="2xl" fontWeight="bold" color="purple.900">
                    {completedTasks}
                  </Text>
                  <Text fontSize="sm" color="purple.700">
                    Completed Tasks
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Body>
                <VStack align="start" gap={2}>
                  <Icon as={FiClock} boxSize={8} color="purple.500" />
                  <Text fontSize="2xl" fontWeight="bold" color="purple.900">
                    {pendingTasks.length}
                  </Text>
                  <Text fontSize="sm" color="purple.700">
                    Pending Tasks
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Body>
                <VStack align="start" gap={2}>
                  <Icon as={FiAlertCircle} boxSize={8} color="red.500" />
                  <Text fontSize="2xl" fontWeight="bold" color="purple.900">
                    {overdueTasks.length}
                  </Text>
                  <Text fontSize="sm" color="purple.700">
                    Overdue Tasks
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Body>
                <VStack align="start" gap={2}>
                  <Text fontSize="sm" color="purple.700" mb={1}>
                    Compliance Rate
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="purple.900">
                    {complianceRate}%
                  </Text>
                  <Progress.Root
                    value={complianceRate}
                    size="sm"
                    colorScheme="green"
                    w="full"
                    borderRadius="full"
                  >
                    <Progress.Track>
                      <Progress.Range />
                    </Progress.Track>
                  </Progress.Root>
                </VStack>
              </Card.Body>
            </Card.Root>
          </SimpleGrid>

          {/* Tabs for Different Views */}
          <Card.Root>
            <Card.Body>
              <Tabs.Root defaultValue="all">
                <Tabs.List>
                  <Tabs.Trigger value="all">All Tasks ({totalTasks})</Tabs.Trigger>
                  <Tabs.Trigger value="overdue">
                    Overdue ({overdueTasks.length})
                    {overdueTasks.length > 0 && (
                      <Badge ml={2} colorScheme="red">
                        !
                      </Badge>
                    )}
                  </Tabs.Trigger>
                  <Tabs.Trigger value="pending">Pending ({pendingTasks.length})</Tabs.Trigger>
                  <Tabs.Trigger value="completed">Completed ({completedTasks})</Tabs.Trigger>
                </Tabs.List>

                <Tabs.ContentGroup>
                  {/* All Tasks */}
                  <Tabs.Content value="all" px={0}>
                    <Table.Root variant="outline">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>Grant Name</Table.ColumnHeader>
                          <Table.ColumnHeader>Task</Table.ColumnHeader>
                          <Table.ColumnHeader>Due Date</Table.ColumnHeader>
                          <Table.ColumnHeader>Priority</Table.ColumnHeader>
                          <Table.ColumnHeader>Status</Table.ColumnHeader>
                          <Table.ColumnHeader>Actions</Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {tasks.map((task) => (
                          <Table.Row key={task.id}>
                            <Table.Cell fontWeight="medium">{task.grantName}</Table.Cell>
                            <Table.Cell>
                              <HStack>
                                <Icon as={FiFileText} color="purple.600" />
                                <Text>{task.requirement}</Text>
                              </HStack>
                            </Table.Cell>
                            <Table.Cell>
                              <HStack>
                                <Icon as={FiCalendar} color="purple.600" boxSize={4} />
                                <Text fontSize="sm">{new Date(task.dueDate).toLocaleDateString()}</Text>
                              </HStack>
                            </Table.Cell>
                            <Table.Cell>
                              <Badge colorScheme={getPriorityColor(task.priority)}>
                                {task.priority.toUpperCase()}
                              </Badge>
                            </Table.Cell>
                            <Table.Cell>
                              <HStack>
                                <Icon
                                  as={getStatusIcon(task.status)}
                                  color={`${getStatusColor(task.status)}.500`}
                                />
                                <Badge colorScheme={getStatusColor(task.status)}>
                                  {task.status}
                                </Badge>
                              </HStack>
                            </Table.Cell>
                            <Table.Cell>
                              <HStack gap={2}>
                                <Button size="xs">
                                  <Icon as={FiUpload} />
                                  Upload
                                </Button>
                                <Button size="xs" variant="ghost">
                                  View
                                </Button>
                              </HStack>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Tabs.Content>

                  {/* Overdue Tasks */}
                  <Tabs.Content value="overdue" px={0}>
                    <VStack gap={4} align="stretch">
                      {overdueTasks.map((task) => (
                        <Card.Root key={task.id} borderLeft="4px solid" borderLeftColor="red.500">
                          <Card.Body>
                            <HStack justify="space-between">
                              <VStack align="start" gap={2}>
                                <HStack>
                                  <Icon as={FiAlertCircle} color="red.500" />
                                  <Heading size="sm">{task.requirement}</Heading>
                                  <Badge colorScheme="red">OVERDUE</Badge>
                                </HStack>
                                <Text fontSize="sm" color="purple.800">
                                  {task.grantName}
                                </Text>
                                <Text fontSize="sm" color="red.600" fontWeight="medium">
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </Text>
                              </VStack>
                              <Button colorScheme="red">
                                <Icon as={FiUpload} />
                                Submit Now
                              </Button>
                            </HStack>
                          </Card.Body>
                        </Card.Root>
                      ))}
                    </VStack>
                  </Tabs.Content>

                  {/* Pending Tasks */}
                  <Tabs.Content value="pending" px={0}>
                    <VStack gap={4} align="stretch">
                      {pendingTasks.map((task) => (
                        <Card.Root key={task.id} borderLeft="4px solid" borderLeftColor="purple.500">
                          <Card.Body>
                            <HStack justify="space-between">
                              <VStack align="start" gap={2}>
                                <HStack>
                                  <Icon as={FiClock} color="purple.500" />
                                  <Heading size="sm">{task.requirement}</Heading>
                                  <Badge colorScheme={getPriorityColor(task.priority)}>
                                    {task.priority.toUpperCase()}
                                  </Badge>
                                </HStack>
                                <Text fontSize="sm" color="purple.800">
                                  {task.grantName}
                                </Text>
                                <Text fontSize="sm" color="purple.800">
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </Text>
                              </VStack>
                              <HStack>
                                <Button variant="outline">
                                  <Icon as={FiDownload} />
                                  Download Template
                                </Button>
                                <Button colorScheme="purple">
                                  <Icon as={FiUpload} />
                                  Upload
                                </Button>
                              </HStack>
                            </HStack>
                          </Card.Body>
                        </Card.Root>
                      ))}
                    </VStack>
                  </Tabs.Content>

                  {/* Completed Tasks */}
                  <Tabs.Content value="completed" px={0}>
                    <VStack gap={4} align="stretch">
                      {completedTasksList.map((task) => (
                        <Card.Root key={task.id} borderLeft="4px solid" borderLeftColor="green.500">
                          <Card.Body>
                            <HStack justify="space-between">
                              <VStack align="start" gap={2}>
                                <HStack>
                                  <Icon as={FiCheckCircle} color="green.500" />
                                  <Heading size="sm">{task.requirement}</Heading>
                                  <Badge colorScheme="green">COMPLETED</Badge>
                                </HStack>
                                <Text fontSize="sm" color="purple.700">
                                  {task.grantName}
                                </Text>
                                <Text fontSize="sm" color="purple.700">
                                  Submitted: {new Date(task.dueDate).toLocaleDateString()}
                                </Text>
                              </VStack>
                              <Button variant="outline">
                                <Icon as={FiDownload} />
                                Download Receipt
                              </Button>
                            </HStack>
                          </Card.Body>
                        </Card.Root>
                      ))}
                    </VStack>
                  </Tabs.Content>
                </Tabs.ContentGroup>
              </Tabs.Root>
            </Card.Body>
          </Card.Root>

          {/* Quick Actions */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            <Card.Root>
              <Card.Body>
                <VStack gap={3}>
                  <Icon as={FiUpload} boxSize={8} color="purple.500" />
                  <Heading size="sm">Bulk Upload</Heading>
                  <Text fontSize="sm" color="purple.800" textAlign="center">
                    Upload multiple compliance documents at once
                  </Text>
                  <Button size="sm" colorScheme="purple" w="full">
                    Upload Documents
                  </Button>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Body>
                <VStack gap={3}>
                  <Icon as={FiCalendar} boxSize={8} color="purple.500" />
                  <Heading size="sm">Set Reminders</Heading>
                  <Text fontSize="sm" color="purple.800" textAlign="center">
                    Configure automatic reminders for deadlines
                  </Text>
                  <Button size="sm" colorScheme="purple" w="full">
                    Manage Reminders
                  </Button>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Body>
                <VStack gap={3}>
                  <Icon as={FiDownload} boxSize={8} color="purple.500" />
                  <Heading size="sm">Export Report</Heading>
                  <Text fontSize="sm" color="purple.800" textAlign="center">
                    Download compliance status report
                  </Text>
                  <Button size="sm" colorScheme="purple" w="full">
                    Generate Report
                  </Button>
                </VStack>
              </Card.Body>
            </Card.Root>
          </SimpleGrid>
        </VStack>
      </Container>
    </MainLayout>
  )
}
