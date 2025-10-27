'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Badge,
  Card,
  Switch,
  Field,
  Separator,
  Icon,
  NativeSelectRoot,
  NativeSelectField,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiClock } from 'react-icons/fi'
import MainLayout from '@/components/layout/MainLayout'
import { mockNotifications, type Notification } from '@/lib/mockData'

export default function NotificationsPage() {
  const [filterType, setFilterType] = useState('All Alerts')
  const [filterDays, setFilterDays] = useState('Last 7 days')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [inAppNotifications, setInAppNotifications] = useState(true)
  const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set())
  const [isSaving, setIsSaving] = useState(false)

  // Filter notifications based on selections
  const filteredNotifications = mockNotifications.filter((notification) => {
    // Filter by type
    const matchesType = filterType === 'All Alerts' ||
      (filterType === 'Critical' && notification.type === 'critical') ||
      (filterType === 'Updates' && notification.type === 'update') ||
      (filterType === 'Info' && notification.type !== 'critical' && notification.type !== 'update')

    // Filter by days (simplified - in real app would check timestamp)
    const matchesDays = true // Placeholder - implement date filtering as needed

    return matchesType && matchesDays
  })

  const notifications = filteredNotifications

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
        return 'purple'
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

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hours ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return '1 day ago'
    return `${diffInDays} days ago`
  }

  const markAllAsRead = () => {
    const allIds = new Set(mockNotifications.map(n => n.id))
    setReadNotifications(allIds)
    // TODO: Call API to persist: await fetch('/api/notifications/mark-all-read', { method: 'POST' })
  }

  const markAsRead = (notificationId: string) => {
    setReadNotifications(prev => new Set(prev).add(notificationId))
    // TODO: Call API to persist: await fetch(`/api/notifications/${notificationId}/read`, { method: 'POST' })
  }

  const savePreferences = async () => {
    setIsSaving(true)
    try {
      // TODO: Implement API call
      // await fetch('/api/user/preferences', {
      //   method: 'PATCH',
      //   body: JSON.stringify({ emailNotifications, inAppNotifications })
      // })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Notification preferences saved successfully!')
    } catch (error) {
      alert('Failed to save preferences. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <VStack gap={8} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="lg" mb={2} color="purple.900">
              Notifications & Alerts
            </Heading>
            <Text color="purple.800">
              Stay updated with important dates and deadlines for your grant applications
            </Text>
          </Box>

          {/* Filters */}
          <HStack gap={4}>
            <NativeSelectRoot w="200px">
              <NativeSelectField
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option>All Alerts</option>
                <option>Critical</option>
                <option>Updates</option>
                <option>Info</option>
              </NativeSelectField>
            </NativeSelectRoot>
            <NativeSelectRoot w="200px">
              <NativeSelectField
                value={filterDays}
                onChange={(e) => setFilterDays(e.target.value)}
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>All time</option>
              </NativeSelectField>
            </NativeSelectRoot>
            <Button colorScheme="purple" onClick={markAllAsRead}>
              <Icon as={FiClock} />
              Mark All Read
            </Button>
          </HStack>

          {/* Critical Alerts Section */}
          <Box>
            <Heading size="md" mb={4} color="purple.900">
              Critical Alerts
            </Heading>
            <VStack gap={4} align="stretch">
              {notifications
                .filter((n) => n.type === 'critical')
                .map((notification) => (
                  <Card.Root
                    key={notification.id}
                    borderLeft="4px solid"
                    borderLeftColor={`${getNotificationColor(notification.type)}.500`}
                    _hover={{ bg: 'purple.50', transform: 'translateX(8px) scale(1.02)', boxShadow: 'lg' }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    cursor="pointer"
                    opacity={readNotifications.has(notification.id) ? 0.6 : 1}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <Card.Body>
                      <HStack align="start" gap={4}>
                        <Icon
                          as={getNotificationIcon(notification.type)}
                          boxSize={6}
                          color={`${getNotificationColor(notification.type)}.500`}
                          mt={1}
                        />
                        <VStack align="stretch" flex={1} gap={2}>
                          <HStack justify="space-between">
                            <HStack>
                              <Heading size="sm">{notification.title}</Heading>
                              <Badge colorScheme={getNotificationColor(notification.type)}>
                                {getBadgeLabel(notification.type)}
                              </Badge>
                            </HStack>
                            <Text fontSize="sm" color="purple.600">
                              {formatTimestamp(notification.timestamp)}
                            </Text>
                          </HStack>
                          <Text whiteSpace="pre-line" color="purple.800">
                            {notification.message}
                          </Text>
                          <Box>
                            <Button size="sm" colorScheme="purple" variant="outline">
                              View Notification Details
                            </Button>
                          </Box>
                        </VStack>
                      </HStack>
                    </Card.Body>
                  </Card.Root>
                ))}
            </VStack>
          </Box>

          {/* Recent Updates Section */}
          <Box>
            <Heading size="md" mb={4} color="purple.900">
              Recent Updates
            </Heading>
            <VStack gap={4} align="stretch">
              {notifications
                .filter((n) => n.type !== 'critical')
                .map((notification) => (
                  <Card.Root
                    key={notification.id}
                    borderLeft="4px solid"
                    borderLeftColor={`${getNotificationColor(notification.type)}.500`}
                    _hover={{ bg: 'purple.50', transform: 'translateX(8px) scale(1.02)', boxShadow: 'lg' }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    cursor="pointer"
                    opacity={readNotifications.has(notification.id) ? 0.6 : 1}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <Card.Body>
                      <HStack align="start" gap={4}>
                        <Icon
                          as={getNotificationIcon(notification.type)}
                          boxSize={6}
                          color={`${getNotificationColor(notification.type)}.500`}
                          mt={1}
                        />
                        <VStack align="stretch" flex={1} gap={2}>
                          <HStack justify="space-between">
                            <HStack>
                              <Heading size="sm">{notification.title}</Heading>
                              <Badge colorScheme={getNotificationColor(notification.type)}>
                                {getBadgeLabel(notification.type)}
                              </Badge>
                            </HStack>
                            <Text fontSize="sm" color="purple.600">
                              {formatTimestamp(notification.timestamp)}
                            </Text>
                          </HStack>
                          <Text whiteSpace="pre-line" color="purple.800">
                            {notification.message}
                          </Text>
                          <Box>
                            <Button size="sm" colorScheme="purple" variant="outline">
                              View Notification Details
                            </Button>
                          </Box>
                        </VStack>
                      </HStack>
                    </Card.Body>
                  </Card.Root>
                ))}
            </VStack>
          </Box>

          {/* Notification Preferences */}
          <Card.Root>
            <Card.Body>
              <VStack gap={6} align="stretch">
                <Heading size="md" color="purple.900">Notification Preferences</Heading>
                <Separator />

                <HStack justify="space-between" align="center">
                  <Box>
                    <Text mb={1} fontWeight="semibold" color="purple.900">
                      Email Notifications
                    </Text>
                    <Text fontSize="sm" color="purple.800">
                      Receive important updates via email
                    </Text>
                  </Box>
                  <Switch.Root
                    size="lg"
                    checked={emailNotifications}
                    onCheckedChange={(e: any) => setEmailNotifications(!!e.checked)}
                  >
                    <Switch.Thumb />
                  </Switch.Root>
                </HStack>

                <HStack justify="space-between" align="center">
                  <Box>
                    <Text mb={1} fontWeight="semibold" color="purple.900">
                      In-App Alerts
                    </Text>
                    <Text fontSize="sm" color="purple.800">
                      Get in-app alerts for time-sensitive updates
                    </Text>
                  </Box>
                  <Switch.Root
                    size="lg"
                    checked={inAppNotifications}
                    onCheckedChange={(e: any) => setInAppNotifications(!!e.checked)}
                  >
                    <Switch.Thumb />
                  </Switch.Root>
                </HStack>

                <HStack justify="space-between" align="center">
                  <Box>
                    <Text mb={1} fontWeight="semibold" color="purple.900">
                      In-App Notifications
                    </Text>
                    <Text fontSize="sm" color="purple.800">
                      Show notifications inside the application
                    </Text>
                  </Box>
                  <Switch.Root size="lg" defaultChecked>
                    <Switch.Thumb />
                  </Switch.Root>
                </HStack>

                <Button
                  colorScheme="purple"
                  alignSelf="flex-start"
                  onClick={savePreferences}
                  loading={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Preferences'}
                </Button>
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </MainLayout>
  )
}
