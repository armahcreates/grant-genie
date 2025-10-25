'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  VStack,
  Icon,
  Button,
  HStack,
  Flex,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import {
  FiFileText,
  FiUsers,
  FiMail,
  FiSettings,
  FiPlus,
} from 'react-icons/fi'

export default function GeniesPage() {
  const router = useRouter()

  const genies = [
    {
      id: 'grant-writing',
      icon: FiFileText,
      title: 'Start Writing',
      description: 'Create compelling, impact-aligned grant proposals tailored to your funders',
      href: '/grant-application',
    },
    {
      id: 'donor-meetings',
      icon: FiUsers,
      title: 'Donor Meetings',
      description: 'An easy way to donor prep, storytelling, and pitch practice',
      href: '/genies/donor-meeting',
    },
    {
      id: 'newsletter',
      icon: FiMail,
      title: 'Newsletter Creation',
      description: 'Engage your community with inspiring, personalized newsletters',
      href: '/genies/newsletter',
    },
    {
      id: 'email-management',
      icon: FiSettings,
      title: 'Email Management',
      description: 'Smart donor responses, pledges, and automated follow-ups',
      href: '/genies/email-management',
    },
  ]

  return (
    <Box minH="100vh" bg="purple.50" py={12}>
      <Container maxW="container.xl">
        <VStack gap={8} align="stretch">
          {/* Header */}
          <VStack align="start" gap={2}>
            <Heading size="2xl" color="purple.900">
              Welcome back, Sarah!
            </Heading>
            <Text fontSize="lg" color="purple.700">
              Ready to make an impact today?
            </Text>
          </VStack>

          {/* What would you help with today? */}
          <VStack align="start" gap={6}>
            <Heading size="lg" color="purple.900">
              What would you help with today?
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
              {genies.map((genie) => (
                <Card.Root
                  key={genie.id}
                  cursor="pointer"
                  onClick={() => router.push(genie.href)}
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'xl',
                    borderColor: 'purple.400',
                  }}
                  transition="all 0.3s"
                  border="1px solid"
                  borderColor="purple.200"
                  bg="white"
                >
                  <Card.Body p={8}>
                    <HStack gap={4} align="start">
                      <Flex
                        w={14}
                        h={14}
                        bg="purple.50"
                        borderRadius="xl"
                        align="center"
                        justify="center"
                        flexShrink={0}
                      >
                        <Icon as={genie.icon} boxSize={7} color="purple.600" />
                      </Flex>
                      <VStack align="start" gap={2} flex={1}>
                        <Heading size="md" color="purple.900">
                          {genie.title}
                        </Heading>
                        <Text color="purple.700" fontSize="sm" lineHeight="tall">
                          {genie.description}
                        </Text>
                      </VStack>
                    </HStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
          </VStack>

          {/* Create New Genie */}
          <Box mt={8}>
            <Card.Root
              border="2px dashed"
              borderColor="purple.300"
              bg="white"
              cursor="pointer"
              _hover={{
                borderColor: 'purple.400',
                bg: 'purple.50',
              }}
              transition="all 0.3s"
            >
              <Card.Body p={8}>
                <VStack gap={3}>
                  <Icon as={FiPlus} boxSize={8} color="purple.600" />
                  <Heading size="md" color="purple.900">
                    Create New Genie
                  </Heading>
                  <Text color="purple.700" fontSize="sm" textAlign="center">
                    Build a custom assistant for your unique workflow
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
