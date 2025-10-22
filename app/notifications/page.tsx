'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Select,
  Badge,
  Card,
  CardBody,
  Switch,
  FormControl,
  FormLabel,
  Divider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiClock } from 'react-icons/fi'
import MainLayout from '@/components/layout/MainLayout'

interface Notification {
  id: string
  type: 'critical' | 'update' | 'info'
  title: string
  message: string
  time: string
  actionLabel?: string
}

export default function NotificationsPage() {
  const [filterType, setFilterType] = useState('All Alerts')
  const [filterDays, setFilterDays] = useState('Last 7 days')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [inAppNotifications, setInAppNotifications] = useState(true)

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'critical',
      title: 'Application Deadline Approaching',
      message: 'Healthcare Research Grant - $45,000\nDeadline: March 15, 2025 (3 days remaining)\nYour application status: In review',
      time: '2 hours ago',
      actionLabel: 'View Application',
    },
    {
      id: '2',
      type: 'critical',
      title: 'Missing Required Documents',
      message: 'Education Technology Grant - $25,000\nMissing documents: Budget breakdown and timeline\nPlease upload required documents to complete your application',
      time: '4 hours ago',
      actionLabel: 'Upload Documents',
    },
    {
      id: '3',
      type: 'update',
      title: 'Application Submitted Successfully',
      message: 'Youth Development Program Grant - $75,000\nYour application has been submitted and is under review',
      time: '1 day ago',
    },
    {
      id: '4',
      type: 'info',
      title: 'New Grant Opportunity Available',
      message: 'Environmental Sustainability Grant - Up to $150,000\nDeadline: April 30, 2025\nFunding for sustainable community projects',
      time: '2 days ago',
      actionLabel: 'View Details',
    },
    {
      id: '5',
      type: 'update',
      title: 'Compliance Report Due',
      message: 'Annual Health Report - Community Arts Grant\nDue: February 15, 2025\nPlease submit your compliance report before the deadline',
      time: '3 days ago',
    },
    {
      id: '6',
      type: 'info',
      title: 'Upcoming Grant Workshop',
      message: 'Grant Writing Best Practices Webinar\nJanuary 25, 2025 at 2:00 PM EST\nRegister now to improve your grant writing skills',
      time: '5 days ago',
      actionLabel: 'Register Now',
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return FiAlertCircle
      case 'update':
        return FiCheckCircle
      default:
        return FiInfo
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'red'
      case 'update':
        return 'blue'
      default:
        return 'gray'
    }
  }

  const getBadgeLabel = (type: string) => {
    switch (type) {
      case 'critical':
        return 'Critical'
      case 'update':
        return 'Update'
      default:
        return 'Info'
    }
  }

  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const bgHover = useColorModeValue('gray.50', 'gray.700')

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="lg" mb={2}>
              Notifications & Alerts
            </Heading>
            <Text color="gray.600">
              Stay updated with important dates and deadlines for your grant applications
            </Text>
          </Box>

          {/* Filters */}
          <HStack spacing={4}>
            <Select
              w="200px"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option>All Alerts</option>
              <option>Critical</option>
              <option>Updates</option>
              <option>Info</option>
            </Select>
            <Select
              w="200px"
              value={filterDays}
              onChange={(e) => setFilterDays(e.target.value)}
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>All time</option>
            </Select>
            <Button colorScheme="blue" leftIcon={<Icon as={FiClock} />}>
              Mark All Read
            </Button>
          </HStack>

          {/* Critical Alerts Section */}
          <Box>
            <Heading size="md" mb={4}>
              Critical Alerts
            </Heading>
            <VStack spacing={4} align="stretch">
              {notifications
                .filter((n) => n.type === 'critical')
                .map((notification) => (
                  <Card
                    key={notification.id}
                    borderLeft="4px solid"
                    borderLeftColor={`${getNotificationColor(notification.type)}.500`}
                    _hover={{ bg: bgHover }}
                    cursor="pointer"
                  >
                    <CardBody>
                      <HStack align="start" spacing={4}>
                        <Icon
                          as={getNotificationIcon(notification.type)}
                          boxSize={6}
                          color={`${getNotificationColor(notification.type)}.500`}
                          mt={1}
                        />
                        <VStack align="stretch" flex={1} spacing={2}>
                          <HStack justify="space-between">
                            <HStack>
                              <Heading size="sm">{notification.title}</Heading>
                              <Badge colorScheme={getNotificationColor(notification.type)}>
                                {getBadgeLabel(notification.type)}
                              </Badge>
                            </HStack>
                            <Text fontSize="sm" color="gray.500">
                              {notification.time}
                            </Text>
                          </HStack>
                          <Text whiteSpace="pre-line" color="gray.600">
                            {notification.message}
                          </Text>
                          {notification.actionLabel && (
                            <Box>
                              <Button size="sm" colorScheme="blue" variant="outline">
                                {notification.actionLabel}
                              </Button>
                            </Box>
                          )}
                        </VStack>
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
            </VStack>
          </Box>

          {/* Recent Updates Section */}
          <Box>
            <Heading size="md" mb={4}>
              Recent Updates
            </Heading>
            <VStack spacing={4} align="stretch">
              {notifications
                .filter((n) => n.type !== 'critical')
                .map((notification) => (
                  <Card
                    key={notification.id}
                    borderLeft="4px solid"
                    borderLeftColor={`${getNotificationColor(notification.type)}.500`}
                    _hover={{ bg: bgHover }}
                    cursor="pointer"
                  >
                    <CardBody>
                      <HStack align="start" spacing={4}>
                        <Icon
                          as={getNotificationIcon(notification.type)}
                          boxSize={6}
                          color={`${getNotificationColor(notification.type)}.500`}
                          mt={1}
                        />
                        <VStack align="stretch" flex={1} spacing={2}>
                          <HStack justify="space-between">
                            <HStack>
                              <Heading size="sm">{notification.title}</Heading>
                              <Badge colorScheme={getNotificationColor(notification.type)}>
                                {getBadgeLabel(notification.type)}
                              </Badge>
                            </HStack>
                            <Text fontSize="sm" color="gray.500">
                              {notification.time}
                            </Text>
                          </HStack>
                          <Text whiteSpace="pre-line" color="gray.600">
                            {notification.message}
                          </Text>
                          {notification.actionLabel && (
                            <Box>
                              <Button size="sm" colorScheme="blue" variant="outline">
                                {notification.actionLabel}
                              </Button>
                            </Box>
                          )}
                        </VStack>
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
            </VStack>
          </Box>

          {/* Notification Preferences */}
          <Card>
            <CardBody>
              <VStack spacing={6} align="stretch">
                <Heading size="md">Notification Preferences</Heading>
                <Divider />

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel mb={1} fontWeight="semibold">
                      Email Notifications
                    </FormLabel>
                    <Text fontSize="sm" color="gray.600">
                      Receive important updates via email
                    </Text>
                  </Box>
                  <Switch
                    size="lg"
                    isChecked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel mb={1} fontWeight="semibold">
                      In-App Alerts
                    </FormLabel>
                    <Text fontSize="sm" color="gray.600">
                      Get in-app alerts for time-sensitive updates
                    </Text>
                  </Box>
                  <Switch
                    size="lg"
                    isChecked={inAppNotifications}
                    onChange={(e) => setInAppNotifications(e.target.checked)}
                  />
                </FormControl>

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel mb={1} fontWeight="semibold">
                      In-App Notifications
                    </FormLabel>
                    <Text fontSize="sm" color="gray.600">
                      Show notifications inside the application
                    </Text>
                  </Box>
                  <Switch size="lg" defaultChecked />
                </FormControl>

                <Button colorScheme="blue" alignSelf="flex-start">
                  Save Preferences
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </MainLayout>
  )
}
