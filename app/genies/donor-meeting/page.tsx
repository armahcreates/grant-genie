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
  Textarea,
  Stack,
  Card,
  Icon,
  Badge,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FiUpload, FiX, FiArrowRight } from 'react-icons/fi'
import { Checkbox } from '@/components/ui/checkbox'
import { useDonorGenieStore } from '@/lib/stores'
import MainLayout from '@/components/layout/MainLayout'

export default function DonorMeetingGeniePage() {
  const router = useRouter()
  const { sessionConfig, setSessionConfig } = useDonorGenieStore()

  const handleObjectionToggle = (objection: string) => {
    setSessionConfig({
      anticipatedObjections: sessionConfig.anticipatedObjections?.includes(objection)
        ? sessionConfig.anticipatedObjections.filter(o => o !== objection)
        : [...(sessionConfig.anticipatedObjections || []), objection]
    })
  }

  const handleStartPractice = () => {
    // Validate required fields before navigating
    if (!sessionConfig.donorType) {
      alert('Please select a donor type before continuing')
      return
    }

    // Navigate to summary page first
    router.push('/genies/donor-meeting/summary')
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
                Donor Meeting Genie
              </Heading>
              <Text color="purple.700">
                Prepare conversations and capture next steps
              </Text>
            </VStack>
            <Badge colorPalette="purple" fontSize="sm" px={3} py={1}>
              Step 1 of 3
            </Badge>
          </HStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
            {/* Left Column - Setup Form */}
            <Card.Root>
              <Card.Header>
                <Heading size="md" color="purple.900">
                  Teach The Donor Genie
                </Heading>
                <Text fontSize="sm" color="purple.700" mt={2}>
                  This trains your Genie with context about the donor, ask, and objections you may face.
                </Text>
              </Card.Header>
              <Card.Body>
                <VStack gap={6} align="stretch">
                  {/* Genie Profile */}
                  <VStack align="start" gap={3}>
                    <Text fontWeight="semibold" color="purple.900">
                      Genie Profile
                    </Text>
                    <Textarea
                      placeholder="e.g., Their LinkedIn, an interview about the donor, a funder research, or past interactions"
                      rows={4}
                      value={sessionConfig.donorProfile}
                      onChange={(e) => setSessionConfig({ donorProfile: e.target.value })}
                    />
                    <Text fontSize="xs" color="purple.600">
                      Links or copy-pasted text, actual files, or screenshots or images.
                    </Text>
                  </VStack>

                  {/* Donor Type */}
                  <VStack align="start" gap={3}>
                    <Text fontWeight="semibold" color="purple.900">
                      Donor Type (Required)
                    </Text>
                    <select
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        borderRadius: '0.375rem',
                        border: '1px solid #E2E8F0',
                      }}
                      value={sessionConfig.donorType}
                      onChange={(e) => setSessionConfig({ donorType: e.target.value as any })}
                    >
                      <option value="">Select donor type...</option>
                      <option value="Individual">Major Individual</option>
                      <option value="Foundation">Foundation</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Planned Giving">Planned Giving</option>
                    </select>
                  </VStack>

                  {/* Warmth Factor */}
                  <VStack align="start" gap={3}>
                    <Text fontWeight="semibold" color="purple.900">
                      Warmth Factor
                    </Text>
                    <Input
                      placeholder="What do you sense of them (practical or enthusiastic)?"
                      value={sessionConfig.warmthLevel || ''}
                      onChange={(e) => setSessionConfig({ warmthLevel: e.target.value })}
                    />
                    <Text fontSize="xs" color="purple.600">
                      (e.g., "down to earth, story-focused; OR more cerebral and ROI-focused")
                    </Text>
                  </VStack>

                  {/* Anticipated Objections */}
                  <VStack align="start" gap={3}>
                    <Text fontWeight="semibold" color="purple.900">
                      Anticipated Objections (Optional)
                    </Text>
                    <Text fontSize="xs" color="purple.600" mb={2}>
                      (What might the objection be? Share the general direction of your work or program.)
                    </Text>
                    <Textarea
                      placeholder="e.g., They love our programs locally but are hesitant about the expansion"
                      rows={3}
                      value={sessionConfig.objections || ''}
                      onChange={(e) => setSessionConfig({ objections: e.target.value })}
                    />
                  </VStack>

                  {/* Tone Section */}
                  <VStack align="start" gap={3}>
                    <Text fontWeight="semibold" color="purple.900">
                      Tone Section (Optional)
                    </Text>
                    <Stack gap={2}>
                      <HStack>
                        <Checkbox
                          checked={sessionConfig.anticipatedObjections?.includes('major')}
                          onCheckedChange={() => handleObjectionToggle('major')}
                        />
                        <Text fontSize="sm">Major</Text>
                      </HStack>
                      <HStack>
                        <Checkbox
                          checked={sessionConfig.anticipatedObjections?.includes('planned')}
                          onCheckedChange={() => handleObjectionToggle('planned')}
                        />
                        <Text fontSize="sm">Planned</Text>
                      </HStack>
                      <HStack>
                        <Checkbox
                          checked={sessionConfig.anticipatedObjections?.includes('build')}
                          onCheckedChange={() => handleObjectionToggle('build')}
                        />
                        <Text fontSize="sm">Build</Text>
                      </HStack>
                      <HStack>
                        <Checkbox
                          checked={sessionConfig.anticipatedObjections?.includes('sustain')}
                          onCheckedChange={() => handleObjectionToggle('sustain')}
                        />
                        <Text fontSize="sm">Sustain</Text>
                      </HStack>
                    </Stack>
                  </VStack>

                  {/* Practice Format */}
                  <VStack align="start" gap={3}>
                    <Text fontWeight="semibold" color="purple.900">
                      Practice Format
                    </Text>
                    <Stack gap={2}>
                      <HStack>
                        <input
                          type="radio"
                          name="practiceFormat"
                          value="conversation"
                          checked={sessionConfig.practiceMode === 'conversation'}
                          onChange={(e) => setSessionConfig({ practiceMode: 'conversation' })}
                        />
                        <Text fontSize="sm">Two-way conversation</Text>
                      </HStack>
                      <HStack>
                        <input
                          type="radio"
                          name="practiceFormat"
                          value="pitch"
                          checked={sessionConfig.practiceMode === 'pitch'}
                          onChange={(e) => setSessionConfig({ practiceMode: 'pitch' })}
                        />
                        <Text fontSize="sm">Elevator pitch</Text>
                      </HStack>
                      <HStack>
                        <input
                          type="radio"
                          name="practiceFormat"
                          value="objection-handling"
                          checked={sessionConfig.practiceMode === 'objection-handling'}
                          onChange={(e) => setSessionConfig({ practiceMode: 'objection-handling' })}
                        />
                        <Text fontSize="sm">Objection handling only</Text>
                      </HStack>
                    </Stack>
                  </VStack>

                  {/* Google My Inputs */}
                  <HStack>
                    <Checkbox
                      checked={sessionConfig.useKnowledgeBase}
                      onCheckedChange={(checked) => setSessionConfig({ useKnowledgeBase: !!checked.checked })}
                    />
                    <Text fontSize="sm" color="purple.700">
                      Google My Inputs (e.g., context about philanthropic values, past donor objection sheets, development notes)
                    </Text>
                  </HStack>

                  {/* Action Buttons */}
                  <HStack pt={4} gap={4}>
                    <Button
                      flex={1}
                      variant="outline"
                      colorPalette="purple"
                    >
                      Edit Session
                    </Button>
                    <Button
                      flex={1}
                      variant="outline"
                      colorPalette="purple"
                    >
                      Regenerate
                    </Button>
                    <Button
                      flex={1}
                      variant="outline"
                      colorPalette="purple"
                    >
                      Export
                    </Button>
                  </HStack>

                  <Button
                    w="full"
                    colorPalette="purple"
                    size="lg"
                    onClick={handleStartPractice}
                  >
                    Start Practice Session
                    <Icon as={FiArrowRight} ml={2} />
                  </Button>
                </VStack>
              </Card.Body>
            </Card.Root>

            {/* Right Column - Preview */}
            <Card.Root bg="purple.50" border="1px solid" borderColor="purple.200">
              <Card.Header>
                <Heading size="md" color="purple.900">
                  Practice Session Preview
                </Heading>
                <Text fontSize="sm" color="purple.700" mt={2}>
                  Your Genie will bring this profile to life in practice mode or coaching prompts.
                </Text>
              </Card.Header>
              <Card.Body>
                <VStack gap={4} align="stretch">
                  <Box
                    p={4}
                    bg="white"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="purple.200"
                  >
                    <Text fontSize="sm" color="purple.600" mb={2}>
                      Donor Profile Preview
                    </Text>
                    <Text fontSize="sm" color="purple.900">
                      {sessionConfig.donorType || 'Select a donor type to see preview'}
                    </Text>
                  </Box>

                  <Box
                    p={4}
                    bg="white"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="purple.200"
                  >
                    <Text fontSize="sm" color="purple.600" mb={2}>
                      Practice Format
                    </Text>
                    <Text fontSize="sm" color="purple.900">
                      {sessionConfig.practiceMode === 'conversation' && 'Two-way conversation'}
                      {sessionConfig.practiceMode === 'pitch' && 'Elevator pitch'}
                      {sessionConfig.practiceMode === 'objection-handling' && 'Objection handling only'}
                    </Text>
                  </Box>

                  {sessionConfig.warmthLevel && (
                    <Box
                      p={4}
                      bg="white"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="purple.200"
                    >
                      <Text fontSize="sm" color="purple.600" mb={2}>
                        Warmth Factor
                      </Text>
                      <Text fontSize="sm" color="purple.900">
                        {sessionConfig.warmthLevel}
                      </Text>
                    </Box>
                  )}

                  <Box p={4} bg="purple.100" borderRadius="lg">
                    <Text fontSize="xs" color="purple.700" fontStyle="italic">
                      Fill out the form to see a live preview of how your practice session will be structured.
                    </Text>
                  </Box>
                </VStack>
              </Card.Body>
            </Card.Root>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
    </MainLayout>
  )
}
