'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Field,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Card,
  Badge,
  Flex,
  IconButton,
  Progress,
} from '@chakra-ui/react'
import { useState } from 'react'
import {
  FiZap,
  FiFileText,
  FiEdit3,
  FiCheck,
  FiRefreshCw,
  FiTrendingUp,
  FiClock,
  FiTarget,
  FiSave,
  FiDownload,
  FiInfo,
} from 'react-icons/fi'
import MainLayout from '@/components/layout/MainLayout'

export default function GrantWritingGeniePage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [aiAssisting, setAiAssisting] = useState(false)

  // Color palette
  const deepIndigo = '#3C3B6E'
  const softTeal = '#5CE1E6'

  const sections = [
    { id: 'overview', title: 'Project Overview', icon: FiFileText, progress: 80 },
    { id: 'narrative', title: 'Project Narrative', icon: FiEdit3, progress: 60 },
    { id: 'budget', title: 'Budget & Justification', icon: FiTrendingUp, progress: 40 },
    { id: 'impact', title: 'Impact & Evaluation', icon: FiTarget, progress: 20 },
    { id: 'timeline', title: 'Timeline & Milestones', icon: FiClock, progress: 0 },
  ]

  const handleAiSuggest = () => {
    setAiAssisting(true)
    // Simulate AI processing
    setTimeout(() => setAiAssisting(false), 2000)
  }

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <VStack gap={8} align="stretch">
          {/* Header */}
          <Box>
            <HStack gap={3} mb={3}>
              <Flex
                w={12}
                h={12}
                bgGradient={`linear(135deg, ${deepIndigo}, ${softTeal})`}
                borderRadius="xl"
                align="center"
                justify="center"
                boxShadow={`0 4px 15px ${softTeal}30`}
              >
                <Icon as={FiZap} color="white" boxSize={6} />
              </Flex>
              <VStack align="start" gap={0}>
                <Heading size="lg" color={deepIndigo}>
                  Grant Writing Genie 🪶
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  Your AI partner for compelling grant proposals
                </Text>
              </VStack>
            </HStack>

            <HStack gap={3} flexWrap="wrap">
              <Badge
                bg={`${softTeal}20`}
                color={deepIndigo}
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="semibold"
              >
                Draft in Progress
              </Badge>
              <Badge
                bg="green.50"
                color="green.700"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="semibold"
              >
                Auto-saved 2 mins ago
              </Badge>
              <Text fontSize="sm" color="gray.500">
                Last edited by you
              </Text>
            </HStack>
          </Box>

          {/* Progress Bar */}
          <Card.Root
            bgGradient={`linear(135deg, ${deepIndigo}05, ${softTeal}05)`}
            border="1px solid"
            borderColor={`${softTeal}30`}
          >
            <Card.Body p={6}>
              <VStack gap={4}>
                <HStack justify="space-between" w="full">
                  <VStack align="start" gap={1}>
                    <Text fontWeight="semibold" color={deepIndigo}>
                      Overall Progress
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      You're making great progress! Keep going.
                    </Text>
                  </VStack>
                  <Heading size="2xl" color={softTeal}>
                    45%
                  </Heading>
                </HStack>
                <Progress.Root value={45} w="full" h={3} borderRadius="full">
                  <Progress.Track bg="gray.100">
                    <Progress.Range bgGradient={`linear(to-r, ${deepIndigo}, ${softTeal})`} />
                  </Progress.Track>
                </Progress.Root>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Main Content Grid */}
          <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8}>
            {/* Sidebar - Section Navigation */}
            <VStack gap={4} gridColumn={{ lg: 'span 4' }} align="stretch">
              <Text fontWeight="semibold" color={deepIndigo} fontSize="sm" textTransform="uppercase" letterSpacing="wide">
                Grant Sections
              </Text>

              {sections.map((section, index) => (
                <Card.Root
                  key={section.id}
                  cursor="pointer"
                  border="2px solid"
                  borderColor={currentSection === index ? softTeal : 'gray.200'}
                  bg={currentSection === index ? `${softTeal}05` : 'white'}
                  _hover={{
                    borderColor: softTeal,
                    transform: 'translateX(4px)',
                  }}
                  transition="all 0.2s"
                  onClick={() => setCurrentSection(index)}
                >
                  <Card.Body p={4}>
                    <HStack justify="space-between">
                      <HStack gap={3}>
                        <Flex
                          w={10}
                          h={10}
                          bg={currentSection === index ? `${softTeal}20` : 'gray.50'}
                          borderRadius="lg"
                          align="center"
                          justify="center"
                        >
                          <Icon
                            as={section.icon}
                            boxSize={5}
                            color={currentSection === index ? softTeal : 'gray.500'}
                          />
                        </Flex>
                        <VStack align="start" gap={0}>
                          <Text
                            fontWeight={currentSection === index ? 'bold' : 'medium'}
                            color={currentSection === index ? deepIndigo : 'gray.700'}
                            fontSize="sm"
                          >
                            {section.title}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {section.progress}% complete
                          </Text>
                        </VStack>
                      </HStack>
                      {section.progress === 100 && (
                        <Icon as={FiCheck} color="green.500" boxSize={5} />
                      )}
                    </HStack>
                    <Progress.Root value={section.progress} mt={3} h={2} borderRadius="full">
                      <Progress.Track bg="gray.100">
                        <Progress.Range bg={softTeal} />
                      </Progress.Track>
                    </Progress.Root>
                  </Card.Body>
                </Card.Root>
              ))}

              {/* AI Assistant Panel */}
              <Card.Root
                bgGradient={`linear(135deg, ${deepIndigo}, #2D2C5A)`}
                color="white"
                mt={4}
              >
                <Card.Body p={6}>
                  <VStack gap={4} align="start">
                    <HStack gap={2}>
                      <Icon as={FiInfo} boxSize={6} color={softTeal} />
                      <Text fontWeight="bold" fontSize="lg">
                        AI Writing Tips
                      </Text>
                    </HStack>
                    <Text fontSize="sm" lineHeight="tall" color="gray.200">
                      • Use specific metrics and data to strengthen your narrative
                    </Text>
                    <Text fontSize="sm" lineHeight="tall" color="gray.200">
                      • Align your language with the funder's mission
                    </Text>
                    <Text fontSize="sm" lineHeight="tall" color="gray.200">
                      • Show clear cause-and-effect relationships
                    </Text>
                    <Button
                      size="sm"
                      bg={softTeal}
                      color="white"
                      w="full"
                      _hover={{ bg: '#4BC5CC' }}
                    >
                      Get More Tips
                    </Button>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </VStack>

            {/* Main Editor Area */}
            <VStack gap={6} gridColumn={{ lg: 'span 8' }} align="stretch">
              {/* Editor Header */}
              <HStack justify="space-between" flexWrap="wrap" gap={4}>
                <VStack align="start" gap={1}>
                  <Heading size="md" color={deepIndigo}>
                    {sections[currentSection].title}
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    Let the Genie help you craft a compelling narrative
                  </Text>
                </VStack>
                <HStack gap={2}>
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="gray.300"
                  >
                    <Icon as={FiSave} />
                    Save Draft
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="gray.300"
                  >
                    <Icon as={FiDownload} />
                    Export
                  </Button>
                </HStack>
              </HStack>

              {/* AI Action Bar */}
              <Card.Root bg={`${deepIndigo}05`} border="1px solid" borderColor={`${softTeal}30`}>
                <Card.Body p={4}>
                  <HStack gap={3} flexWrap="wrap">
                    <Text fontSize="sm" fontWeight="semibold" color={deepIndigo}>
                      AI Actions:
                    </Text>
                    <Button
                      size="sm"
                      bg={softTeal}
                      color="white"
                      onClick={handleAiSuggest}
                      loading={aiAssisting}
                      _hover={{ bg: '#4BC5CC' }}
                    >
                      <Icon as={FiZap} />
                      AI Suggest
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      borderColor={softTeal}
                      color={deepIndigo}
                    >
                      <Icon as={FiRefreshCw} />
                      Rephrase
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      borderColor={softTeal}
                      color={deepIndigo}
                    >
                      <Icon as={FiTrendingUp} />
                      Enhance
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      borderColor={softTeal}
                      color={deepIndigo}
                    >
                      <Icon as={FiCheck} />
                      Tone Check
                    </Button>
                  </HStack>
                </Card.Body>
              </Card.Root>

              {/* Dynamic Content Based on Section */}
              {currentSection === 0 && (
                <VStack gap={6} align="stretch">
                  <Card.Root>
                    <Card.Body p={6}>
                      <VStack gap={6} align="stretch">
                        <Field.Root>
                          <Field.Label color={deepIndigo} fontWeight="semibold" fontSize="md">
                            Project Title
                          </Field.Label>
                          <Input
                            placeholder="Enter a compelling project title..."
                            size="lg"
                            _focus={{ borderColor: softTeal }}
                          />
                          <Text fontSize="xs" color="gray.500" mt={2}>
                            💡 Tip: Make it action-oriented and specific
                          </Text>
                        </Field.Root>

                        <Field.Root>
                          <Field.Label color={deepIndigo} fontWeight="semibold" fontSize="md">
                            Organization Name
                          </Field.Label>
                          <Input
                            placeholder="Your organization's name"
                            size="lg"
                            _focus={{ borderColor: softTeal }}
                          />
                        </Field.Root>

                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                          <Field.Root>
                            <Field.Label color={deepIndigo} fontWeight="semibold" fontSize="md">
                              Grant Category
                            </Field.Label>
                            <Input
                              placeholder="e.g., Education, Healthcare"
                              _focus={{ borderColor: softTeal }}
                            />
                          </Field.Root>

                          <Field.Root>
                            <Field.Label color={deepIndigo} fontWeight="semibold" fontSize="md">
                              Funding Amount Requested
                            </Field.Label>
                            <Input
                              placeholder="$0"
                              type="number"
                              _focus={{ borderColor: softTeal }}
                            />
                          </Field.Root>
                        </SimpleGrid>

                        <Field.Root>
                          <Field.Label color={deepIndigo} fontWeight="semibold" fontSize="md">
                            Executive Summary
                          </Field.Label>
                          <Textarea
                            placeholder="Start writing your executive summary, or ask the AI to help you draft it..."
                            rows={6}
                            _focus={{ borderColor: softTeal }}
                          />
                          <HStack mt={2} gap={2}>
                            <Button
                              size="xs"
                              variant="ghost"
                              color={softTeal}
                            >
                              <Icon as={FiZap} />
                              AI Draft
                            </Button>
                            <Text fontSize="xs" color="gray.400">•</Text>
                            <Text fontSize="xs" color="gray.500">
                              0 / 500 words recommended
                            </Text>
                          </HStack>
                        </Field.Root>
                      </VStack>
                    </Card.Body>
                  </Card.Root>

                  {/* AI Suggestions Card */}
                  <Card.Root border="2px solid" borderColor={`${softTeal}40`} bg={`${softTeal}05`}>
                    <Card.Body p={6}>
                      <VStack gap={4} align="start">
                        <HStack gap={2}>
                          <Icon as={FiInfo} color={softTeal} boxSize={5} />
                          <Text fontWeight="bold" color={deepIndigo}>
                            AI Suggestion
                          </Text>
                        </HStack>
                        <Text color="gray.700" lineHeight="tall">
                          Based on your organization's mission, I recommend emphasizing the community impact in your executive summary. Would you like me to help draft language that highlights how this project serves underrepresented populations?
                        </Text>
                        <HStack gap={3}>
                          <Button
                            size="sm"
                            bg={softTeal}
                            color="white"
                            _hover={{ bg: '#4BC5CC' }}
                          >
                            Apply Suggestion
                          </Button>
                          <Button size="sm" variant="outline" borderColor="gray.300">
                            Dismiss
                          </Button>
                        </HStack>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                </VStack>
              )}

              {currentSection === 1 && (
                <VStack gap={6} align="stretch">
                  <Card.Root>
                    <Card.Body p={6}>
                      <VStack gap={6} align="stretch">
                        <Field.Root>
                          <Field.Label color={deepIndigo} fontWeight="semibold" fontSize="md">
                            Problem Statement
                          </Field.Label>
                          <Textarea
                            placeholder="Describe the problem your project addresses..."
                            rows={8}
                            _focus={{ borderColor: softTeal }}
                          />
                          <HStack mt={2} justify="space-between">
                            <HStack gap={2}>
                              <Button
                                size="xs"
                                variant="ghost"
                                color={softTeal}
                              >
                                <Icon as={FiZap} />
                                Strengthen with Data
                              </Button>
                              <Button
                                size="xs"
                                variant="ghost"
                                color={softTeal}
                              >
                                <Icon as={FiRefreshCw} />
                                Rephrase
                              </Button>
                            </HStack>
                            <Text fontSize="xs" color="gray.500">
                              156 / 800 words
                            </Text>
                          </HStack>
                        </Field.Root>

                        <Field.Root>
                          <Field.Label color={deepIndigo} fontWeight="semibold" fontSize="md">
                            Proposed Solution
                          </Field.Label>
                          <Textarea
                            placeholder="Explain how your project will solve the problem..."
                            rows={8}
                            _focus={{ borderColor: softTeal }}
                          />
                        </Field.Root>

                        <Field.Root>
                          <Field.Label color={deepIndigo} fontWeight="semibold" fontSize="md">
                            Innovation & Approach
                          </Field.Label>
                          <Textarea
                            placeholder="What makes your approach unique and effective?"
                            rows={6}
                            _focus={{ borderColor: softTeal }}
                          />
                        </Field.Root>
                      </VStack>
                    </Card.Body>
                  </Card.Root>

                  {/* Tone Analysis Card */}
                  <Card.Root border="1px solid" borderColor="green.200" bg="green.50">
                    <Card.Body p={6}>
                      <HStack gap={3}>
                        <Icon as={FiCheck} color="green.600" boxSize={5} />
                        <VStack align="start" gap={1} flex={1}>
                          <Text fontWeight="bold" color="green.800">
                            Tone Analysis: Excellent Match
                          </Text>
                          <Text fontSize="sm" color="green.700">
                            Your writing style aligns well with the funder's values. The narrative is clear, empathetic, and data-driven.
                          </Text>
                        </VStack>
                      </HStack>
                    </Card.Body>
                  </Card.Root>
                </VStack>
              )}

              {currentSection === 2 && (
                <VStack gap={6} align="stretch">
                  <Card.Root>
                    <Card.Body p={6}>
                      <VStack gap={6} align="stretch">
                        <Text color={deepIndigo} fontWeight="semibold">
                          Budget Breakdown
                        </Text>

                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                          <Field.Root>
                            <Field.Label color={deepIndigo} fontSize="sm">
                              Personnel Costs
                            </Field.Label>
                            <Input
                              placeholder="$0"
                              type="number"
                              _focus={{ borderColor: softTeal }}
                            />
                          </Field.Root>

                          <Field.Root>
                            <Field.Label color={deepIndigo} fontSize="sm">
                              Equipment & Supplies
                            </Field.Label>
                            <Input
                              placeholder="$0"
                              type="number"
                              _focus={{ borderColor: softTeal }}
                            />
                          </Field.Root>

                          <Field.Root>
                            <Field.Label color={deepIndigo} fontSize="sm">
                              Travel & Training
                            </Field.Label>
                            <Input
                              placeholder="$0"
                              type="number"
                              _focus={{ borderColor: softTeal }}
                            />
                          </Field.Root>

                          <Field.Root>
                            <Field.Label color={deepIndigo} fontSize="sm">
                              Indirect Costs
                            </Field.Label>
                            <Input
                              placeholder="$0"
                              type="number"
                              _focus={{ borderColor: softTeal }}
                            />
                          </Field.Root>
                        </SimpleGrid>

                        <Box
                          p={4}
                          bg={`${softTeal}10`}
                          borderRadius="lg"
                          border="1px solid"
                          borderColor={`${softTeal}30`}
                        >
                          <HStack justify="space-between">
                            <Text fontWeight="bold" color={deepIndigo}>
                              Total Budget
                            </Text>
                            <Heading size="lg" color={softTeal}>
                              $0
                            </Heading>
                          </HStack>
                        </Box>

                        <Field.Root>
                          <Field.Label color={deepIndigo} fontWeight="semibold" fontSize="md">
                            Budget Justification
                          </Field.Label>
                          <Textarea
                            placeholder="Explain how each budget category supports your project goals..."
                            rows={8}
                            _focus={{ borderColor: softTeal }}
                          />
                          <HStack mt={2}>
                            <Button
                              size="xs"
                              variant="ghost"
                              color={softTeal}
                            >
                              <Icon as={FiZap} />
                              AI Generate Justification
                            </Button>
                          </HStack>
                        </Field.Root>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                </VStack>
              )}

              {currentSection === 3 && (
                <VStack gap={6} align="stretch">
                  <Card.Root>
                    <Card.Body p={6}>
                      <VStack gap={6} align="stretch">
                        <Field.Root>
                          <Field.Label color={deepIndigo} fontWeight="semibold" fontSize="md">
                            Expected Outcomes
                          </Field.Label>
                          <Textarea
                            placeholder="Describe the measurable outcomes you expect to achieve..."
                            rows={6}
                            _focus={{ borderColor: softTeal }}
                          />
                        </Field.Root>

                        <Field.Root>
                          <Field.Label color={deepIndigo} fontWeight="semibold" fontSize="md">
                            Evaluation Methods
                          </Field.Label>
                          <Textarea
                            placeholder="How will you measure success and track progress?"
                            rows={6}
                            _focus={{ borderColor: softTeal }}
                          />
                        </Field.Root>

                        <Field.Root>
                          <Field.Label color={deepIndigo} fontWeight="semibold" fontSize="md">
                            Long-term Sustainability
                          </Field.Label>
                          <Textarea
                            placeholder="Explain how the project will continue beyond the grant period..."
                            rows={6}
                            _focus={{ borderColor: softTeal }}
                          />
                        </Field.Root>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                </VStack>
              )}

              {currentSection === 4 && (
                <VStack gap={6} align="stretch">
                  <Card.Root>
                    <Card.Body p={6}>
                      <VStack gap={6} align="stretch">
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                          <Field.Root>
                            <Field.Label color={deepIndigo} fontWeight="semibold">
                              Project Start Date
                            </Field.Label>
                            <Input
                              type="date"
                              _focus={{ borderColor: softTeal }}
                            />
                          </Field.Root>

                          <Field.Root>
                            <Field.Label color={deepIndigo} fontWeight="semibold">
                              Project End Date
                            </Field.Label>
                            <Input
                              type="date"
                              _focus={{ borderColor: softTeal }}
                            />
                          </Field.Root>
                        </SimpleGrid>

                        <Field.Root>
                          <Field.Label color={deepIndigo} fontWeight="semibold" fontSize="md">
                            Key Milestones & Timeline
                          </Field.Label>
                          <Textarea
                            placeholder="List major milestones and when they'll be achieved..."
                            rows={8}
                            _focus={{ borderColor: softTeal }}
                          />
                          <HStack mt={2}>
                            <Button
                              size="xs"
                              variant="ghost"
                              color={softTeal}
                            >
                              <Icon as={FiZap} />
                              Generate Timeline
                            </Button>
                          </HStack>
                        </Field.Root>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                </VStack>
              )}

              {/* Navigation Buttons */}
              <HStack justify="space-between" pt={4}>
                <Button
                  variant="outline"
                  borderColor="gray.300"
                  disabled={currentSection === 0}
                  onClick={() => setCurrentSection(currentSection - 1)}
                >
                  Previous Section
                </Button>
                <Button
                  bgGradient={`linear(to-r, ${softTeal}, #4BC5CC)`}
                  color="white"
                  onClick={() => currentSection < sections.length - 1 && setCurrentSection(currentSection + 1)}
                  _hover={{
                    bgGradient: `linear(to-r, #4BC5CC, ${softTeal})`,
                    transform: 'translateY(-2px)',
                  }}
                >
                  {currentSection === sections.length - 1 ? 'Complete Draft' : 'Next Section'}
                </Button>
              </HStack>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </MainLayout>
  )
}
