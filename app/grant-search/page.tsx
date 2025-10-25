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
  Badge,
  Icon,
  SimpleGrid,
  Flex,
  Card,
  Separator,
  NativeSelectRoot,
  NativeSelectField,
  IconButton,
  Tag,
  Wrap,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  FiSearch,
  FiFilter,
  FiBookmark,
  FiCalendar,
  FiDollarSign,
  FiMapPin,
  FiStar,
} from 'react-icons/fi'
import MainLayout from '@/components/layout/MainLayout'
import { mockGrants, type Grant } from '@/lib/mockData'

export default function GrantSearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [fundingRange, setFundingRange] = useState([0, 500000])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [bookmarked, setBookmarked] = useState<string[]>([])

  const toggleBookmark = (grantId: string) => {
    setBookmarked(prev =>
      prev.includes(grantId)
        ? prev.filter(id => id !== grantId)
        : [...prev, grantId]
    )
  }

  // Filter grants based on search query and category
  const filteredGrants = mockGrants.filter((grant) => {
    const matchesSearch =
      searchQuery === '' ||
      grant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grant.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grant.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === 'all' ||
      selectedCategory === 'all categories' ||
      grant.category.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  const categories = [
    'All Categories',
    'Community Development',
    'Education',
    'Environment',
    'Healthcare',
    'Arts & Culture',
    'Technology',
    'Economic Development',
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'green'
      case 'Closing Soon':
        return 'orange'
      case 'Closed':
        return 'gray'
      default:
        return 'gray'
    }
  }

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter))
  }

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <VStack gap={8} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="lg" mb={2} color="purple.900">
              Grant Search
            </Heading>
            <Text color="purple.800">
              Discover funding opportunities tailored to your organization's mission
            </Text>
          </Box>

          {/* Search Bar */}
          <Card.Root>
            <Card.Body>
              <VStack gap={4} align="stretch">
                <HStack>
                  <Icon as={FiSearch} color="purple.400" />
                  <Input
                    size="lg"
                    placeholder="Search grants by keyword, organization, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </HStack>

                <SimpleGrid columns={{ base: 1, md: 4 }} gap={4}>
                  <NativeSelectRoot>
                    <NativeSelectField
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map((cat, index) => (
                        <option key={index} value={cat.toLowerCase()}>
                          {cat}
                        </option>
                      ))}
                    </NativeSelectField>
                  </NativeSelectRoot>

                  <NativeSelectRoot>
                    <NativeSelectField placeholder="Funding Amount">
                      <option value="0-25k">$0 - $25,000</option>
                      <option value="25k-100k">$25,000 - $100,000</option>
                      <option value="100k-500k">$100,000 - $500,000</option>
                      <option value="500k+">$500,000+</option>
                    </NativeSelectField>
                  </NativeSelectRoot>

                  <NativeSelectRoot>
                    <NativeSelectField placeholder="Deadline">
                      <option value="30days">Next 30 days</option>
                      <option value="60days">Next 60 days</option>
                      <option value="90days">Next 90 days</option>
                      <option value="all">All deadlines</option>
                    </NativeSelectField>
                  </NativeSelectRoot>

                  <NativeSelectRoot>
                    <NativeSelectField placeholder="Location">
                      <option value="national">National</option>
                      <option value="state">State-wide</option>
                      <option value="regional">Regional</option>
                      <option value="local">Local</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </SimpleGrid>

                <HStack justify="space-between">
                  <Button variant="outline" size="sm">
                    <Icon as={FiFilter} />
                    Advanced Filters
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon as={FiBookmark} />
                    Saved Searches
                  </Button>
                </HStack>

                {/* Active Filters */}
                {selectedFilters.length > 0 && (
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Active Filters:
                    </Text>
                    <Wrap gap={2}>
                      {selectedFilters.map((filter, index) => (
                        <Tag.Root key={index} size="md" colorScheme="purple" borderRadius="full">
                          <Tag.Label>{filter}</Tag.Label>
                          <Tag.CloseTrigger onClick={() => removeFilter(filter)} />
                        </Tag.Root>
                      ))}
                    </Wrap>
                  </Box>
                )}
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Results Header */}
          <Flex justify="space-between" align="center">
            <Text fontWeight="medium" color="purple.800">
              Showing {filteredGrants.length} grants
            </Text>
            <HStack gap={2}>
              <Text fontSize="sm" color="purple.800">
                Sort by:
              </Text>
              <NativeSelectRoot w="180px" size="sm">
                <NativeSelectField defaultValue="relevance">
                  <option value="relevance">Relevance</option>
                  <option value="deadline">Deadline</option>
                  <option value="amount">Funding Amount</option>
                  <option value="recent">Recently Added</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </HStack>
          </Flex>

          {/* Grant Results */}
          <VStack gap={4} align="stretch">
            {filteredGrants.map((grant) => (
              <Card.Root
                key={grant.id}
                cursor="pointer"
                _hover={{ bg: 'purple.50', transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.3s"
              >
                <Card.Body>
                  <VStack gap={4} align="stretch">
                    <Flex justify="space-between" align="start">
                      <Box flex={1}>
                        <HStack mb={2}>
                          <Heading size="md">{grant.title}</Heading>
                          <Badge colorScheme={getStatusColor(grant.status)}>
                            {grant.status}
                          </Badge>
                        </HStack>
                        <Text color="purple.800" fontSize="sm" mb={2}>
                          {grant.organization}
                        </Text>
                        <Text color="purple.900" mb={3}>
                          {grant.description}
                        </Text>

                        <SimpleGrid columns={{ base: 1, md: 4 }} gap={4} mb={3}>
                          <HStack>
                            <Icon as={FiDollarSign} color="purple.600" />
                            <Box>
                              <Text fontSize="xs" color="purple.700">
                                Funding Amount
                              </Text>
                              <Text fontSize="sm" fontWeight="medium" color="purple.900">
                                {grant.amount}
                              </Text>
                            </Box>
                          </HStack>

                          <HStack>
                            <Icon as={FiCalendar} color="purple.600" />
                            <Box>
                              <Text fontSize="xs" color="purple.700">
                                Deadline
                              </Text>
                              <Text fontSize="sm" fontWeight="medium" color="purple.900">
                                {new Date(grant.deadline).toLocaleDateString()}
                              </Text>
                            </Box>
                          </HStack>

                          <HStack>
                            <Icon as={FiStar} color="purple.600" />
                            <Box>
                              <Text fontSize="xs" color="purple.700">
                                Match Score
                              </Text>
                              <Text fontSize="sm" fontWeight="medium" color="green.600">
                                {grant.matchScore}%
                              </Text>
                            </Box>
                          </HStack>

                          <HStack>
                            <Icon as={FiStar} color="purple.600" />
                            <Box>
                              <Text fontSize="xs" color="purple.700">
                                Category
                              </Text>
                              <Text fontSize="sm" fontWeight="medium" color="purple.900">
                                {grant.category}
                              </Text>
                            </Box>
                          </HStack>
                        </SimpleGrid>

                        <Box>
                          <Text fontSize="xs" color="purple.700" mb={2}>
                            Eligibility:
                          </Text>
                          <Wrap gap={2}>
                            {grant.eligibility.map((item, index) => (
                              <Badge key={index} colorScheme="purple" variant="subtle">
                                {item}
                              </Badge>
                            ))}
                          </Wrap>
                        </Box>
                      </Box>

                      <VStack gap={2} ml={4}>
                        <IconButton
                          aria-label="Bookmark grant"
                          variant={bookmarked.includes(grant.id) ? 'solid' : 'ghost'}
                          colorScheme="purple"
                          onClick={() => toggleBookmark(grant.id)}
                        >
                          <Icon as={FiBookmark} fill={bookmarked.includes(grant.id) ? 'currentColor' : 'none'} />
                        </IconButton>
                      </VStack>
                    </Flex>

                    <Separator />

                    <HStack justify="flex-end" gap={3}>
                      <Button variant="outline" size="sm" colorScheme="purple">
                        View Details
                      </Button>
                      <Button
                        colorScheme="purple"
                        size="sm"
                        onClick={() => router.push('/grant-application')}
                      >
                        Start Application
                      </Button>
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            ))}
          </VStack>

          {/* Pagination */}
          <Flex justify="center" align="center" gap={2}>
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <HStack gap={1}>
              <Button size="sm" colorScheme="purple">
                1
              </Button>
              <Button size="sm" variant="ghost">
                2
              </Button>
              <Button size="sm" variant="ghost">
                3
              </Button>
              <Button size="sm" variant="ghost">
                4
              </Button>
            </HStack>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </Flex>
        </VStack>
      </Container>
    </MainLayout>
  )
}
