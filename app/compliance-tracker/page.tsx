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
  CardBody,
  CardHeader,
  Badge,
  Icon,
  SimpleGrid,
  Progress,
  Checkbox,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Flex,
  Divider,
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

interface ComplianceTask {
  id: string
  grantName: string
  task: string
  dueDate: string
  status: 'completed' | 'pending' | 'overdue'
  priority: 'high' | 'medium' | 'low'
  type: 'report' | 'document' | 'review'
}

export default function ComplianceTrackerPage() {
  const [tasks, setTasks] = useState<ComplianceTask[]>([
    {
      id: '1',
      grantName: 'Community Development Grant',
      task: 'Quarterly Progress Report',
      dueDate: 'Feb 15, 2025',
      status: 'pending',
      priority: 'high',
      type: 'report',
    },
    {
      id: '2',
      grantName: 'Education Innovation Fund',
      task: 'Financial Statement Upload',
      dueDate: 'Feb 28, 2025',
      status: 'pending',
      priority: 'high',
      type: 'document',
    },
    {
      id: '3',
      grantName: 'Healthcare Access Program',
      task: 'Mid-Year Program Review',
      dueDate: 'Mar 10, 2025',
      status: 'pending',
      priority: 'medium',
      type: 'review',
    },
    {
      id: '4',
      grantName: 'Youth Development Fund',
      task: 'Annual Impact Report',
      dueDate: 'Jan 30, 2025',
      status: 'overdue',
      priority: 'high',
      type: 'report',
    },
    {
      id: '5',
      grantName: 'Environmental Sustainability',
      task: 'Budget Reconciliation',
      dueDate: 'Mar 31, 2025',
      status: 'pending',
      priority: 'medium',
      type: 'document',
    },
    {
      id: '6',
      grantName: 'Arts & Culture Grant',
      task: 'Program Evaluation',
      dueDate: 'Dec 15, 2024',
      status: 'completed',
      priority: 'low',
      type: 'review',
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green'
      case 'pending':
        return 'blue'
      case 'overdue':
        return 'red'
      default:
        return 'gray'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red'
      case 'medium':
        return 'orange'
      case 'low':
        return 'green'
      default:
        return 'gray'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return FiCheckCircle
      case 'overdue':
        return FiAlertCircle
      default:
        return FiClock
    }
  }

  const completedTasks = tasks.filter((t) => t.status === 'completed').length
  const totalTasks = tasks.length
  const complianceRate = Math.round((completedTasks / totalTasks) * 100)

  const overdueTasks = tasks.filter((t) => t.status === 'overdue')
  const pendingTasks = tasks.filter((t) => t.status === 'pending')
  const completedTasksList = tasks.filter((t) => t.status === 'completed')

  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="lg" mb={2}>
              Compliance Tracker
            </Heading>
            <Text color="gray.600">
              Monitor and manage all compliance requirements for your active grants
            </Text>
          </Box>

          {/* Stats Overview */}
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
            <Card>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <Icon as={FiCheckCircle} boxSize={8} color="green.500" />
                  <Text fontSize="2xl" fontWeight="bold">
                    {completedTasks}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Completed Tasks
                  </Text>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <Icon as={FiClock} boxSize={8} color="blue.500" />
                  <Text fontSize="2xl" fontWeight="bold">
                    {pendingTasks.length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Pending Tasks
                  </Text>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <Icon as={FiAlertCircle} boxSize={8} color="red.500" />
                  <Text fontSize="2xl" fontWeight="bold">
                    {overdueTasks.length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Overdue Tasks
                  </Text>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    Compliance Rate
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    {complianceRate}%
                  </Text>
                  <Progress
                    value={complianceRate}
                    size="sm"
                    colorScheme="green"
                    w="full"
                    borderRadius="full"
                  />
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Tabs for Different Views */}
          <Card>
            <CardBody>
              <Tabs>
                <TabList>
                  <Tab>All Tasks ({totalTasks})</Tab>
                  <Tab>
                    Overdue ({overdueTasks.length})
                    {overdueTasks.length > 0 && (
                      <Badge ml={2} colorScheme="red">
                        !
                      </Badge>
                    )}
                  </Tab>
                  <Tab>Pending ({pendingTasks.length})</Tab>
                  <Tab>Completed ({completedTasks})</Tab>
                </TabList>

                <TabPanels>
                  {/* All Tasks */}
                  <TabPanel px={0}>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Grant Name</Th>
                          <Th>Task</Th>
                          <Th>Due Date</Th>
                          <Th>Priority</Th>
                          <Th>Status</Th>
                          <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {tasks.map((task) => (
                          <Tr key={task.id}>
                            <Td fontWeight="medium">{task.grantName}</Td>
                            <Td>
                              <HStack>
                                <Icon as={FiFileText} color="gray.500" />
                                <Text>{task.task}</Text>
                              </HStack>
                            </Td>
                            <Td>
                              <HStack>
                                <Icon as={FiCalendar} color="gray.500" boxSize={4} />
                                <Text fontSize="sm">{task.dueDate}</Text>
                              </HStack>
                            </Td>
                            <Td>
                              <Badge colorScheme={getPriorityColor(task.priority)}>
                                {task.priority.toUpperCase()}
                              </Badge>
                            </Td>
                            <Td>
                              <HStack>
                                <Icon
                                  as={getStatusIcon(task.status)}
                                  color={`${getStatusColor(task.status)}.500`}
                                />
                                <Badge colorScheme={getStatusColor(task.status)}>
                                  {task.status}
                                </Badge>
                              </HStack>
                            </Td>
                            <Td>
                              <HStack spacing={2}>
                                <Button size="xs" leftIcon={<Icon as={FiUpload} />}>
                                  Upload
                                </Button>
                                <Button size="xs" variant="ghost">
                                  View
                                </Button>
                              </HStack>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TabPanel>

                  {/* Overdue Tasks */}
                  <TabPanel px={0}>
                    <VStack spacing={4} align="stretch">
                      {overdueTasks.map((task) => (
                        <Card key={task.id} borderLeft="4px solid" borderLeftColor="red.500">
                          <CardBody>
                            <HStack justify="space-between">
                              <VStack align="start" spacing={2}>
                                <HStack>
                                  <Icon as={FiAlertCircle} color="red.500" />
                                  <Heading size="sm">{task.task}</Heading>
                                  <Badge colorScheme="red">OVERDUE</Badge>
                                </HStack>
                                <Text fontSize="sm" color="gray.600">
                                  {task.grantName}
                                </Text>
                                <Text fontSize="sm" color="red.500">
                                  Due: {task.dueDate}
                                </Text>
                              </VStack>
                              <Button colorScheme="red" leftIcon={<Icon as={FiUpload} />}>
                                Submit Now
                              </Button>
                            </HStack>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  </TabPanel>

                  {/* Pending Tasks */}
                  <TabPanel px={0}>
                    <VStack spacing={4} align="stretch">
                      {pendingTasks.map((task) => (
                        <Card key={task.id} borderLeft="4px solid" borderLeftColor="blue.500">
                          <CardBody>
                            <HStack justify="space-between">
                              <VStack align="start" spacing={2}>
                                <HStack>
                                  <Icon as={FiClock} color="blue.500" />
                                  <Heading size="sm">{task.task}</Heading>
                                  <Badge colorScheme={getPriorityColor(task.priority)}>
                                    {task.priority.toUpperCase()}
                                  </Badge>
                                </HStack>
                                <Text fontSize="sm" color="gray.600">
                                  {task.grantName}
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                  Due: {task.dueDate}
                                </Text>
                              </VStack>
                              <HStack>
                                <Button variant="outline" leftIcon={<Icon as={FiDownload} />}>
                                  Download Template
                                </Button>
                                <Button colorScheme="blue" leftIcon={<Icon as={FiUpload} />}>
                                  Upload
                                </Button>
                              </HStack>
                            </HStack>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  </TabPanel>

                  {/* Completed Tasks */}
                  <TabPanel px={0}>
                    <VStack spacing={4} align="stretch">
                      {completedTasksList.map((task) => (
                        <Card key={task.id} borderLeft="4px solid" borderLeftColor="green.500">
                          <CardBody>
                            <HStack justify="space-between">
                              <VStack align="start" spacing={2}>
                                <HStack>
                                  <Icon as={FiCheckCircle} color="green.500" />
                                  <Heading size="sm">{task.task}</Heading>
                                  <Badge colorScheme="green">COMPLETED</Badge>
                                </HStack>
                                <Text fontSize="sm" color="gray.600">
                                  {task.grantName}
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                  Submitted: {task.dueDate}
                                </Text>
                              </VStack>
                              <Button variant="outline" leftIcon={<Icon as={FiDownload} />}>
                                Download Receipt
                              </Button>
                            </HStack>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>

          {/* Quick Actions */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Card>
              <CardBody>
                <VStack spacing={3}>
                  <Icon as={FiUpload} boxSize={8} color="blue.500" />
                  <Heading size="sm">Bulk Upload</Heading>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Upload multiple compliance documents at once
                  </Text>
                  <Button size="sm" colorScheme="blue" w="full">
                    Upload Documents
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack spacing={3}>
                  <Icon as={FiCalendar} boxSize={8} color="purple.500" />
                  <Heading size="sm">Set Reminders</Heading>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Configure automatic reminders for deadlines
                  </Text>
                  <Button size="sm" colorScheme="purple" w="full">
                    Manage Reminders
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack spacing={3}>
                  <Icon as={FiDownload} boxSize={8} color="green.500" />
                  <Heading size="sm">Export Report</Heading>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Download compliance status report
                  </Text>
                  <Button size="sm" colorScheme="green" w="full">
                    Generate Report
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>
      </Container>
    </MainLayout>
  )
}
