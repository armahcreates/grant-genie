'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Card,
  Badge,
  Textarea,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  FiUpload,
  FiFileText,
  FiArrowRight,
  FiLoader,
} from 'react-icons/fi'
import MainLayout from '@/components/layout/MainLayout'
import { useGrantGenieStore } from '@/lib/store'

export default function GrantGeniePage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const { formData, setFormData } = useGrantGenieStore()

  const handleGenerate = async () => {
    // Basic validation
    if (!formData.projectName || !formData.funderName) {
      setError('Project Name and Funder Name are required')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      // Navigate to proposal page which will generate the content
      // Form data is already in Zustand store with persistence
      router.push('/grant-application/proposal')
    } catch (err) {
      setError('Failed to start generation. Please try again.')
      setIsGenerating(false)
    }
  }

  return (
    <MainLayout>
      <Box minH="100vh" bg="purple.50">
        <Container maxW="container.xl" py={8}>
          <VStack gap={8} align="stretch">
            {/* Header */}
            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Heading size="xl" color="purple.900">
                  Grant Genie
                </Heading>
                <Text color="purple.700">
                  Make it yours and collaborate
                </Text>
              </VStack>
              <Badge colorScheme="purple" fontSize="sm" px={3} py={1}>
                Step 1 of 1
              </Badge>
            </HStack>

            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
              {/* Left Column - Upload & Teaching */}
              <VStack gap={6} align="stretch">
                {/* Upload Grant Materials */}
                <Card.Root>
                  <Card.Header>
                    <Heading size="md" color="purple.900">
                      Upload Grant Materials
                    </Heading>
                    <Text fontSize="sm" color="purple.700" mt={2}>
                      Upload RFP or Guidelines, or paste the content in text box
                    </Text>
                  </Card.Header>
                  <Card.Body>
                    <VStack gap={4} align="stretch">
                      {/* Upload Area */}
                      <Box
                        p={8}
                        border="2px dashed"
                        borderColor="purple.300"
                        borderRadius="lg"
                        bg="purple.50"
                        cursor="pointer"
                        textAlign="center"
                        _hover={{ borderColor: 'purple.400', bg: 'purple.100' }}
                        transition="all 0.2s"
                      >
                        <VStack gap={3}>
                          <Icon as={FiUpload} boxSize={10} color="purple.600" />
                          <Text color="purple.900" fontWeight="medium">
                            Drop RFP or Guidelines here
                          </Text>
                          <Text fontSize="sm" color="purple.600">
                            Or paste the content in text box
                          </Text>
                        </VStack>
                      </Box>

                      {/* Text Input Alternative */}
                      <Textarea
                        placeholder="Or paste foundation's request for proposals, guidelines, and strategic priorities..."
                        rows={6}
                        value={formData.rfpText}
                        onChange={(e) => setFormData({ rfpText: e.target.value })}
                      />
                      <Text fontSize="xs" color="purple.600">
                        (Paste the content or describe in text box)
                      </Text>
                    </VStack>
                  </Card.Body>
                </Card.Root>

                {/* Teach the Grant Genie */}
                <Card.Root>
                  <Card.Header>
                    <Heading size="md" color="purple.900">
                      Teach the Grant Genie
                    </Heading>
                    <Text fontSize="sm" color="purple.700" mt={2}>
                      Upload your own past grants and teach the Genie HOW you write
                    </Text>
                  </Card.Header>
                  <Card.Body>
                    <VStack gap={4} align="stretch">
                      {/* Upload Area */}
                      <Box
                        p={8}
                        border="2px dashed"
                        borderColor="purple.300"
                        borderRadius="lg"
                        bg="white"
                        cursor="pointer"
                        textAlign="center"
                        _hover={{ borderColor: 'purple.400', bg: 'purple.50' }}
                        transition="all 0.2s"
                      >
                        <VStack gap={3}>
                          <Icon as={FiFileText} boxSize={10} color="purple.600" />
                          <Text color="purple.900" fontWeight="medium">
                            Upload grants, reports, or narratives
                          </Text>
                          <Text fontSize="sm" color="purple.600">
                            that shows HOW you write
                          </Text>
                        </VStack>
                      </Box>

                      {/* Text Input Alternative */}
                      <Textarea
                        placeholder="Uploaded grants, reports, or narratives that shows HOW you write. Paste here or upload above..."
                        rows={6}
                        value={formData.teachingMaterials}
                        onChange={(e) => setFormData({ teachingMaterials: e.target.value })}
                      />
                    </VStack>
                  </Card.Body>
                </Card.Root>

                {/* Knowledge Capture */}
                <Card.Root bg="purple.50" border="1px solid" borderColor="purple.200">
                  <Card.Header>
                    <Heading size="sm" color="purple.900">
                      Knowledge Capture
                    </Heading>
                  </Card.Header>
                  <Card.Body>
                    <Text fontSize="sm" color="purple.700" lineHeight="tall">
                      Grant the proposal will use all the context to learn your writing style and the funder's priorities. Share as much as you can OR AVOID guidance and opt to control your grant style.
                    </Text>
                  </Card.Body>
                </Card.Root>

                {/* Talk to the Genie */}
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
                        <Text fontSize="sm" color="purple.900" fontStyle="italic">
                          e.g., "How can I incorporate data-driven evidence into my problem statement?"
                        </Text>
                      </Box>
                      <Textarea
                        placeholder="Remember that Smith Foundation prefers concise strategic metrics over general statements..."
                        rows={3}
                      />
                    </VStack>
                  </Card.Body>
                </Card.Root>
              </VStack>

              {/* Right Column - Project Context */}
              <VStack gap={6} align="stretch">
                <Card.Root>
                  <Card.Header>
                    <Heading size="md" color="purple.900">
                      Project Context Fields
                    </Heading>
                    <Text fontSize="sm" color="purple.700" mt={2}>
                      Provide the essential details for your grant proposal
                    </Text>
                  </Card.Header>
                  <Card.Body>
                    <VStack gap={6} align="stretch">
                      {/* Project/Program Name */}
                      <VStack align="start" gap={2}>
                        <Text fontWeight="semibold" color="purple.900">
                          Project/Program Name
                        </Text>
                        <Input
                          placeholder="Enter project name"
                          value={formData.projectName}
                          onChange={(e) => setFormData({ projectName: e.target.value })}
                        />
                      </VStack>

                      {/* Funder Name */}
                      <VStack align="start" gap={2}>
                        <Text fontWeight="semibold" color="purple.900">
                          Funder Name
                        </Text>
                        <Input
                          placeholder="Optional"
                          value={formData.funderName}
                          onChange={(e) => setFormData({ funderName: e.target.value })}
                        />
                      </VStack>

                      {/* Funding Deadline */}
                      <VStack align="start" gap={2}>
                        <Text fontWeight="semibold" color="purple.900">
                          Funding Deadline
                        </Text>
                        <Input
                          type="date"
                          value={formData.deadline}
                          onChange={(e) => setFormData({ deadline: e.target.value })}
                        />
                      </VStack>

                      {/* Estimated Grant Amount */}
                      <VStack align="start" gap={2}>
                        <Text fontWeight="semibold" color="purple.900">
                          Estimated Grant Amount
                        </Text>
                        <Input
                          placeholder="$50,000"
                          value={formData.fundingAmount}
                          onChange={(e) => setFormData({ fundingAmount: e.target.value })}
                        />
                      </VStack>
                    </VStack>
                  </Card.Body>
                </Card.Root>

                {/* Input Summary Preview */}
                <Card.Root bg="purple.50" border="1px solid" borderColor="purple.200">
                  <Card.Header>
                    <Heading size="sm" color="purple.900">
                      Input Summary
                    </Heading>
                  </Card.Header>
                  <Card.Body>
                    <VStack gap={3} align="stretch">
                      <Box>
                        <Text fontSize="xs" color="purple.600" mb={1}>
                          Grant Materials
                        </Text>
                        <Text fontSize="sm" color="purple.900">
                          {formData.rfpText ? 'RFP content provided' : 'Not provided yet'}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color="purple.600" mb={1}>
                          Teaching Materials
                        </Text>
                        <Text fontSize="sm" color="purple.900">
                          {formData.teachingMaterials ? 'Writing samples provided' : 'Not provided yet'}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color="purple.600" mb={1}>
                          Project Name
                        </Text>
                        <Text fontSize="sm" color="purple.900">
                          {formData.projectName || 'Not entered'}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color="purple.600" mb={1}>
                          Funder
                        </Text>
                        <Text fontSize="sm" color="purple.900">
                          {formData.funderName || 'Not specified'}
                        </Text>
                      </Box>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              </VStack>
            </SimpleGrid>

            {/* Error Message */}
            {error && (
              <Card.Root bg="red.50" border="1px solid" borderColor="red.300">
                <Card.Body>
                  <Text color="red.700" fontWeight="medium">
                    {error}
                  </Text>
                </Card.Body>
              </Card.Root>
            )}

            {/* Generate Button */}
            <HStack justify="center" pt={4}>
              <Button
                size="lg"
                colorScheme="purple"
                px={12}
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Icon as={FiLoader} className="animate-spin" mr={2} />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Draft
                    <Icon as={FiArrowRight} ml={2} />
                  </>
                )}
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </MainLayout>
  )
}
