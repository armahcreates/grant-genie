'use client'

import {
  Box,
  Button,
  Icon,
  VStack,
  HStack,
  Text,
  Input,
  Card,
  Portal,
  Heading,
  Badge,
} from '@chakra-ui/react'
import { useState, useRef, useEffect } from 'react'
import { FiMessageCircle, FiX, FiSend, FiHelpCircle } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function SupportGenie() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m your Support Genie. I can help you with:\n\n• Navigating the app\n• Understanding features\n• Troubleshooting issues\n• Grant application tips\n• Compliance questions\n\nWhat can I help you with today?',
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // TODO: Replace with actual API call to /api/ai/support
      // const response = await fetch('/api/ai/support', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: inputMessage, history: messages }),
      // })
      // const data = await response.json()

      // Simulate AI response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateSupportResponse(inputMessage),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or contact support at support@headspacegenie.com',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const generateSupportResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes('grant') && lowerQuestion.includes('search')) {
      return 'To search for grants, go to the Grant Search page from the sidebar. You can:\n\n• Filter by category, deadline, and amount\n• Sort by relevance, deadline, or amount\n• Bookmark grants for later\n• Save your searches\n\nWould you like help with any specific search criteria?'
    }

    if (lowerQuestion.includes('donor') || lowerQuestion.includes('meeting')) {
      return 'The Donor Meeting Genie helps you prepare for donor conversations. You can:\n\n• Train the genie with donor profile info\n• Practice different conversation formats\n• Get coaching on objection handling\n• Review session summaries\n\nNavigate to Genies → Donor Meeting Genie to get started!'
    }

    if (lowerQuestion.includes('compliance') || lowerQuestion.includes('deadline')) {
      return 'The Compliance Tracker helps you stay on top of deadlines:\n\n• View all upcoming deadlines\n• Upload required documents\n• Track task status (completed/pending/overdue)\n• Get notifications for approaching deadlines\n\nCheck the Compliance Tracker in your sidebar!'
    }

    if (lowerQuestion.includes('notification')) {
      return 'You can manage notifications in Settings → Notifications. You can:\n\n• Toggle email notifications\n• Toggle in-app alerts\n• Filter notifications by type\n• Mark notifications as read\n\nIs there a specific notification setting you need help with?'
    }

    if (lowerQuestion.includes('profile') || lowerQuestion.includes('account')) {
      return 'To update your profile, go to Profile from the top menu. You can:\n\n• Update personal information\n• Change organization details\n• Manage notification preferences\n• Update your profile photo\n\nAll changes are automatically saved!'
    }

    return 'I\'d be happy to help! Here are some things I can assist with:\n\n• Grant search and filtering\n• Using the Donor Meeting Genie\n• Compliance tracking\n• Profile and settings\n• General navigation\n\nCould you provide more details about what you need help with?'
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  return (
    <>
      {/* Floating Action Button */}
      <Portal>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1000,
          }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="lg"
            borderRadius="full"
            colorScheme="purple"
            boxShadow="2xl"
            w="64px"
            h="64px"
            p={0}
            _hover={{
              transform: 'scale(1.1)',
              boxShadow: '2xl',
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            <Icon as={isOpen ? FiX : FiMessageCircle} boxSize={6} />
          </Button>
        </motion.div>

        {/* Chat Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed',
                bottom: '100px',
                right: '24px',
                width: '400px',
                maxWidth: 'calc(100vw - 48px)',
                height: '600px',
                maxHeight: 'calc(100vh - 150px)',
                zIndex: 1001,
              }}
            >
              <Card.Root
                bg="white"
                boxShadow="2xl"
                borderRadius="xl"
                overflow="hidden"
                h="full"
                display="flex"
                flexDirection="column"
              >
                {/* Header */}
                <Box
                  bg="purple.600"
                  color="white"
                  p={4}
                  borderBottom="1px solid"
                  borderColor="purple.700"
                >
                  <HStack justify="space-between">
                    <HStack gap={3}>
                      <Icon as={FiHelpCircle} boxSize={6} />
                      <VStack align="start" gap={0}>
                        <Heading size="sm">Support Genie</Heading>
                        <HStack gap={2}>
                          <Box
                            w="8px"
                            h="8px"
                            borderRadius="full"
                            bg="green.300"
                          />
                          <Text fontSize="xs">Online</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="ghost"
                      color="white"
                      size="sm"
                      _hover={{ bg: 'purple.700' }}
                    >
                      <Icon as={FiX} />
                    </Button>
                  </HStack>
                </Box>

                {/* Messages */}
                <VStack
                  flex={1}
                  overflow="auto"
                  p={4}
                  gap={4}
                  align="stretch"
                  bg="purple.50"
                >
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HStack
                        align="start"
                        justify={message.role === 'user' ? 'flex-end' : 'flex-start'}
                        gap={2}
                      >
                        <VStack
                          align={message.role === 'user' ? 'flex-end' : 'flex-start'}
                          gap={1}
                          maxW="85%"
                        >
                          <Box
                            bg={message.role === 'user' ? 'purple.600' : 'white'}
                            color={message.role === 'user' ? 'white' : 'purple.900'}
                            px={4}
                            py={3}
                            borderRadius="xl"
                            borderTopRightRadius={message.role === 'user' ? 'sm' : 'xl'}
                            borderTopLeftRadius={message.role === 'user' ? 'xl' : 'sm'}
                            boxShadow="sm"
                          >
                            <Text fontSize="sm" whiteSpace="pre-line">
                              {message.content}
                            </Text>
                          </Box>
                          <Text fontSize="xs" color="purple.600" px={2}>
                            {formatTime(message.timestamp)}
                          </Text>
                        </VStack>
                      </HStack>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <HStack gap={2}>
                      <Box
                        bg="white"
                        px={4}
                        py={3}
                        borderRadius="xl"
                        borderTopLeftRadius="sm"
                        boxShadow="sm"
                      >
                        <HStack gap={1}>
                          <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Box w="8px" h="8px" borderRadius="full" bg="purple.400" />
                          </motion.div>
                          <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                          >
                            <Box w="8px" h="8px" borderRadius="full" bg="purple.400" />
                          </motion.div>
                          <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                          >
                            <Box w="8px" h="8px" borderRadius="full" bg="purple.400" />
                          </motion.div>
                        </HStack>
                      </Box>
                    </HStack>
                  )}

                  <div ref={messagesEndRef} />
                </VStack>

                {/* Input */}
                <Box
                  p={4}
                  borderTop="1px solid"
                  borderColor="purple.200"
                  bg="white"
                >
                  <HStack gap={2}>
                    <Input
                      placeholder="Ask me anything..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      disabled={isLoading}
                      borderColor="purple.300"
                      _focus={{ borderColor: 'purple.500' }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      colorScheme="purple"
                      disabled={!inputMessage.trim() || isLoading}
                      loading={isLoading}
                    >
                      <Icon as={FiSend} />
                    </Button>
                  </HStack>
                  <Text fontSize="xs" color="purple.600" mt={2}>
                    Press Enter to send, Shift+Enter for new line
                  </Text>
                </Box>
              </Card.Root>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  )
}
