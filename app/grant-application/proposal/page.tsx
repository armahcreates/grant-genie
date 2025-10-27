'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Card,
  SimpleGrid,
  Separator,
  Spinner,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {
  FiShare2,
  FiDownload,
  FiSave,
  FiRefreshCw,
} from 'react-icons/fi'
import MainLayout from '@/components/layout/MainLayout'
import { useGrantGenieStore } from '@/lib/store'
import { useGrantWritingAgent } from '@/lib/agents'

export default function GrantProposalPage() {
  const router = useRouter()
  const { formData, proposalContent, isGenerating } = useGrantGenieStore()
  const { generateProposal, error } = useGrantWritingAgent()

  useEffect(() => {
    // Check if we have form data, if not redirect back
    if (!formData.projectName || !formData.funderName) {
      router.push('/grant-application')
      return
    }

    // Only generate if we don't have content yet
    if (!proposalContent && !isGenerating) {
      handleGenerate()
    }
  }, [])

  const handleGenerate = async () => {
    try {
      await generateProposal({
        projectName: formData.projectName,
        funderName: formData.funderName,
        fundingAmount: formData.fundingAmount,
        deadline: formData.deadline,
        rfpText: formData.rfpText,
        teachingMaterials: formData.teachingMaterials,
      })
    } catch (err) {
      console.error('Error generating proposal:', err)
    }
  }

  const handleRegenerate = () => {
    handleGenerate()
  }

  return (
    <MainLayout>
      <Box minH="100vh" bg="purple.50">
        <Container maxW="container.xl" py={8}>
          <VStack gap={8} align="stretch">
            {/* Header */}
            <HStack justify="space-between" flexWrap="wrap" gap={4}>
              <VStack align="start" gap={1}>
                <Heading size="xl" color="purple.900">
                  Grant Genie
                </Heading>
                <Text color="purple.700">
                  Make it yours and proposal
                </Text>
              </VStack>
              <HStack gap={3}>
                <Button
                  variant="outline"
                  colorPalette="purple"
                  size="sm"
                >
                  <Icon as={FiShare2} mr={2} />
                  Share with Colleague
                </Button>
                <Button
                  variant="outline"
                  colorPalette="purple"
                  size="sm"
                >
                  <Icon as={FiDownload} mr={2} />
                  Download Copy
                </Button>
                <Button
                  colorPalette="purple"
                  size="sm"
                >
                  <Icon as={FiSave} mr={2} />
                  Save to Database
                </Button>
              </HStack>
            </HStack>

            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8}>
              {/* Left Sidebar - Reflection */}
              <VStack gap={6} align="stretch">
                <Card.Root>
                  <Card.Header>
                    <Heading size="sm" color="purple.900">
                      Reflection
                    </Heading>
                  </Card.Header>
                  <Card.Body>
                    <Text fontSize="sm" color="purple.700" lineHeight="tall">
                      Help me revise this proposal to emphasize the measurable outcomes and include specific data points.
                    </Text>
                  </Card.Body>
                </Card.Root>

                <Card.Root bg="purple.50" border="1px solid" borderColor="purple.200">
                  <Card.Header>
                    <Heading size="sm" color="purple.900">
                      Knowledge Capture
                    </Heading>
                  </Card.Header>
                  <Card.Body>
                    <Text fontSize="sm" color="purple.700" lineHeight="tall">
                      Save the donor's profile and validate how to say "yes" without over-promising. Record the conversation for later reference. Capture next steps in real-time.
                    </Text>
                  </Card.Body>
                </Card.Root>

                <Card.Root bg="purple.50" border="1px solid" borderColor="purple.200">
                  <Card.Header>
                    <Heading size="sm" color="purple.900">
                      Talk to the Genie
                    </Heading>
                  </Card.Header>
                  <Card.Body>
                    <VStack gap={3} align="stretch">
                      <Text fontSize="sm" color="purple.700">
                        Ask one reflective or question to the Genie to customize:
                      </Text>
                      <Box
                        p={3}
                        bg="white"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="purple.200"
                      >
                        <Text fontSize="xs" color="purple.900">
                          Why would you want to run this?
                        </Text>
                      </Box>
                      <Box
                        p={3}
                        bg="white"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="purple.200"
                      >
                        <Text fontSize="xs" color="purple.900">
                          Are you reflecting or asking the Genie for knowledge on this?
                        </Text>
                      </Box>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              </VStack>

              {/* Main Proposal Content */}
              <Box gridColumn={{ base: '1', lg: 'span 2' }}>
                <Card.Root>
                  <Card.Body p={8}>
                    {isGenerating ? (
                      <VStack gap={6} py={12} align="center">
                        <Spinner size="xl" color="purple.600" />
                        <VStack gap={2}>
                          <Heading size="lg" color="purple.900">
                            Generating Your Grant Proposal
                          </Heading>
                          <Text color="purple.700" textAlign="center">
                            The Genie is crafting a compelling proposal based on your inputs...
                          </Text>
                        </VStack>
                      </VStack>
                    ) : error ? (
                      <VStack gap={6} py={12} align="center">
                        <Text color="red.700" fontSize="lg">
                          {error}
                        </Text>
                        <Button colorPalette="purple" onClick={handleRegenerate}>
                          <Icon as={FiRefreshCw} mr={2} />
                          Try Again
                        </Button>
                      </VStack>
                    ) : (
                      <VStack gap={8} align="stretch">
                        {/* Proposal Header */}
                        <VStack align="start" gap={3}>
                          <Heading size="2xl" color="purple.900">
                            {formData?.projectName || 'Grant Proposal'}
                          </Heading>
                          <Text fontSize="lg" color="purple.700" fontWeight="medium">
                            Submitted to: {formData?.funderName || 'Funder'}
                          </Text>
                          <Text fontSize="sm" color="purple.600">
                            Generated: {new Date().toLocaleString()}
                          </Text>
                        </VStack>

                        <Separator />

                        {/* AI Generated Content */}
                        <Box
                          color="purple.900"
                          lineHeight="tall"
                          css={{
                            '& h1, & h2, & h3': {
                              color: 'var(--chakra-colors-purple-900)',
                              fontWeight: 'bold',
                              marginTop: '1.5rem',
                              marginBottom: '1rem',
                            },
                            '& p': {
                              marginBottom: '1rem',
                            },
                            '& ul, & ol': {
                              marginLeft: '1.5rem',
                              marginBottom: '1rem',
                            },
                          }}
                          whiteSpace="pre-wrap"
                        >
                          {proposalContent || 'No content generated yet.'}
                        </Box>
                      </VStack>
                    )}
                  </Card.Body>
                </Card.Root>

                {/* Action Buttons */}
                {!isGenerating && !error && (
                  <HStack gap={4} justify="center" mt={8}>
                    <Button
                      variant="outline"
                      colorPalette="purple"
                      onClick={() => router.push('/grant-application')}
                    >
                      Edit Inputs
                    </Button>
                    <Button
                      variant="outline"
                      colorPalette="purple"
                      onClick={handleRegenerate}
                      disabled={isGenerating}
                    >
                      <Icon as={FiRefreshCw} mr={2} />
                      Regenerate
                    </Button>
                    <Button
                      colorPalette="purple"
                    >
                      <Icon as={FiSave} mr={2} />
                      Save to Database
                    </Button>
                  </HStack>
                )}
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </MainLayout>
  )
}
