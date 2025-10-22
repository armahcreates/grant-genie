'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Input,
  InputGroup,
  SimpleGrid,
  Badge,
  Flex,
  Card,
  Icon,
  IconButton,
  List,
} from '@chakra-ui/react'
import { useState } from 'react'
import {
  FiSend,
  FiDownload,
  FiExternalLink,
  FiFileText,
  FiSearch,
  FiBarChart2,
  FiCheckSquare,
  FiPlus,
  FiList,
} from 'react-icons/fi'
import MainLayout from '@/components/layout/MainLayout'

export default function ResourcesPage() {
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Grant Assistant. I can help you with:\n\n• Finding grants and opportunities\n• Tracking application deadlines\n• Generating reports and analytics\n• Managing compliance requirements',
    },
  ])

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setMessages([...messages, { role: 'user', content: chatInput }])
      setChatInput('')
      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'I can help you with that! Let me gather the information you need...',
          },
        ])
      }, 1000)
    }
  }

  const borderColor = 'gray.200'
  const messageBgUser = 'blue.500'
  const messageBgAssistant = 'gray.100'

  const templates = [
    { name: 'Federal Grant Template', icon: FiDownload },
    { name: 'Foundation Grant Template', icon: FiDownload },
    { name: 'Corporate Grant Template', icon: FiDownload },
  ]

  const guides = [
    { name: 'Grant Writing Best Practices', icon: FiExternalLink },
    { name: 'Compliance Management Guide', icon: FiExternalLink },
    { name: 'Budget Planning Handbook', icon: FiExternalLink },
  ]

  const tools = [
    { name: 'Budget Calculator', icon: FiList },
    { name: 'Timeline Planner', icon: FiList },
    { name: 'Compliance Checklist', icon: FiList },
  ]

  const quickActions = [
    { name: 'New Application', icon: FiPlus },
    { name: 'Find Grants', icon: FiSearch },
    { name: 'View Reports', icon: FiBarChart2 },
    { name: 'Check Deadlines', icon: FiCheckSquare },
  ]

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <VStack gap={8} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="lg" mb={2}>
              Grant Management Resources
            </Heading>
            <Text color="gray.600">
              Access templates, guides, and tools to streamline your grant management process
            </Text>
          </Box>

          {/* AI Grant Copilot */}
          <Card.Root>
            <Card.Header>
              <HStack>
                <Icon as={FiFileText} boxSize={6} color="blue.500" />
                <Heading size="md">AI Grant Copilot</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              <VStack gap={4} align="stretch">
                <Text color="gray.600" fontSize="sm">
                  Hello! I'm your AI Grant Assistant. I can help you with:
                </Text>
                <List.Root gap={1} fontSize="sm" color="gray.600">
                  <List.Item>• Finding grants and opportunities</List.Item>
                  <List.Item>• Tracking application deadlines</List.Item>
                  <List.Item>• Generating reports and analytics</List.Item>
                </List.Root>

                {/* Chat Messages */}
                <Box
                  maxH="300px"
                  overflowY="auto"
                  border="1px"
                  borderColor={borderColor}
                  borderRadius="md"
                  p={4}
                  bg="gray.50"
                >
                  <VStack gap={3} align="stretch">
                    {messages.map((message, index) => (
                      <Flex
                        key={index}
                        justify={message.role === 'user' ? 'flex-end' : 'flex-start'}
                      >
                        <Box
                          maxW="80%"
                          bg={message.role === 'user' ? messageBgUser : messageBgAssistant}
                          color={message.role === 'user' ? 'white' : 'inherit'}
                          px={4}
                          py={2}
                          borderRadius="lg"
                          whiteSpace="pre-line"
                        >
                          <Text fontSize="sm">{message.content}</Text>
                        </Box>
                      </Flex>
                    ))}
                  </VStack>
                </Box>

                {/* Chat Input */}
                <HStack>
                  <Input
                    placeholder="Ask me anything about grant management..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage()
                      }
                    }}
                  />
                  <IconButton
                    aria-label="Send message"
                    size="sm"
                    colorScheme="blue"
                    onClick={handleSendMessage}
                  >
                    <Icon as={FiSend} />
                  </IconButton>
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Resources Grid */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {/* Application Templates */}
            <Card.Root>
              <Card.Header>
                <HStack>
                  <Icon as={FiFileText} boxSize={5} color="blue.500" />
                  <Heading size="sm">Application Templates</Heading>
                </HStack>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  Pre-built templates for common grant applications
                </Text>
              </Card.Header>
              <Card.Body>
                <VStack gap={3} align="stretch">
                  {templates.map((template, index) => (
                    <HStack
                      key={index}
                      justify="space-between"
                      p={3}
                      border="1px"
                      borderColor={borderColor}
                      borderRadius="md"
                      _hover={{ bg: 'gray.50' }}
                      cursor="pointer"
                    >
                      <Text fontSize="sm">{template.name}</Text>
                      <Icon as={template.icon} color="gray.500" />
                    </HStack>
                  ))}
                </VStack>
              </Card.Body>
            </Card.Root>

            {/* Best Practice Guides */}
            <Card.Root>
              <Card.Header>
                <HStack>
                  <Icon as={FiFileText} boxSize={5} color="green.500" />
                  <Heading size="sm">Best Practice Guides</Heading>
                </HStack>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  Comprehensive guides for successful grant management
                </Text>
              </Card.Header>
              <Card.Body>
                <VStack gap={3} align="stretch">
                  {guides.map((guide, index) => (
                    <HStack
                      key={index}
                      justify="space-between"
                      p={3}
                      border="1px"
                      borderColor={borderColor}
                      borderRadius="md"
                      _hover={{ bg: 'gray.50' }}
                      cursor="pointer"
                    >
                      <Text fontSize="sm">{guide.name}</Text>
                      <Icon as={guide.icon} color="gray.500" />
                    </HStack>
                  ))}
                </VStack>
              </Card.Body>
            </Card.Root>

            {/* Management Tools */}
            <Card.Root>
              <Card.Header>
                <HStack>
                  <Icon as={FiFileText} boxSize={5} color="purple.500" />
                  <Heading size="sm">Management Tools</Heading>
                </HStack>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  Tools to streamline your grant management workflow
                </Text>
              </Card.Header>
              <Card.Body>
                <VStack gap={3} align="stretch">
                  {tools.map((tool, index) => (
                    <HStack
                      key={index}
                      justify="space-between"
                      p={3}
                      border="1px"
                      borderColor={borderColor}
                      borderRadius="md"
                      _hover={{ bg: 'gray.50' }}
                      cursor="pointer"
                    >
                      <Text fontSize="sm">{tool.name}</Text>
                      <Icon as={tool.icon} color="gray.500" />
                    </HStack>
                  ))}
                </VStack>
              </Card.Body>
            </Card.Root>
          </SimpleGrid>

          {/* Quick Actions */}
          <Card.Root>
            <Card.Header>
              <Heading size="md">Quick Actions</Heading>
            </Card.Header>
            <Card.Body>
              <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    h="100px"
                    flexDirection="column"
                    gap={2}
                  >
                    <Icon as={action.icon} boxSize={8} />
                    <Text fontSize="sm">{action.name}</Text>
                  </Button>
                ))}
              </SimpleGrid>
            </Card.Body>
          </Card.Root>

          {/* Pagination */}
          <Flex justify="center" align="center" gap={2}>
            <IconButton
              aria-label="Previous page"
              variant="outline"
              size="sm"
            >
              <Text>&lt;</Text>
            </IconButton>
            <Text fontSize="sm" color="gray.600">
              8 / 12
            </Text>
            <IconButton
              aria-label="Next page"
              variant="outline"
              size="sm"
            >
              <Text>&gt;</Text>
            </IconButton>
          </Flex>
        </VStack>
      </Container>
    </MainLayout>
  )
}
