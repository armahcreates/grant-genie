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
  InputLeftElement,
  Select,
  Card,
  CardBody,
  Badge,
  Icon,
  SimpleGrid,
  Flex,
  Checkbox,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  FormControl,
  FormLabel,
  Divider,
  useColorModeValue,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { useState } from 'react'
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

interface Grant {
  id: string
  title: string
  organization: string
  amount: string
  deadline: string
  category: string
  location: string
  description: string
  eligibility: string[]
  status: 'open' | 'closing-soon' | 'closed'
}

export default function GrantSearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [fundingRange, setFundingRange] = useState([0, 500000])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const grants: Grant[] = [
    {
      id: '1',
      title: 'Community Development Grant Program',
      organization: 'Federal Housing Authority',
      amount: '$50,000 - $500,000',
      deadline: 'March 15, 2025',
      category: 'Community Development',
      location: 'National',
      description:
        'Funding for community-based organizations working on affordable housing, economic development, and community facilities.',
      eligibility: ['Non-profit', '501(c)(3)', 'Community-based'],
      status: 'open',
    },
    {
      id: '2',
      title: 'Education Innovation Fund',
      organization: 'Department of Education',
      amount: '$25,000 - $150,000',
      deadline: 'February 28, 2025',
      category: 'Education',
      location: 'State-wide',
      description:
        'Support innovative educational programs that improve student outcomes in underserved communities.',
      eligibility: ['Schools', 'Educational Non-profits', 'Universities'],
      status: 'closing-soon',
    },
    {
      id: '3',
      title: 'Environmental Sustainability Initiative',
      organization: 'Green Earth Foundation',
      amount: '$10,000 - $100,000',
      deadline: 'April 30, 2025',
      category: 'Environment',
      location: 'Regional',
      description:
        'Grants for projects focused on renewable energy, conservation, and environmental education.',
      eligibility: ['Non-profit', 'Environmental Groups', 'Research Institutions'],
      status: 'open',
    },
    {
      id: '4',
      title: 'Healthcare Access Program',
      organization: 'National Health Foundation',
      amount: '$75,000 - $300,000',
      deadline: 'March 31, 2025',
      category: 'Healthcare',
      location: 'National',
      description:
        'Funding to expand healthcare access and services in rural and underserved urban communities.',
      eligibility: ['Healthcare Organizations', 'Clinics', 'Non-profit'],
      status: 'open',
    },
    {
      id: '5',
      title: 'Arts & Culture Preservation Grant',
      organization: 'National Endowment for the Arts',
      amount: '$5,000 - $75,000',
      deadline: 'May 15, 2025',
      category: 'Arts & Culture',
      location: 'National',
      description:
        'Support for arts organizations, cultural heritage projects, and community arts programs.',
      eligibility: ['Arts Organizations', 'Museums', 'Cultural Centers'],
      status: 'open',
    },
    {
      id: '6',
      title: 'Youth Development Fund',
      organization: 'Youth Opportunity Foundation',
      amount: '$20,000 - $200,000',
      deadline: 'March 1, 2025',
      category: 'Youth Services',
      location: 'State-wide',
      description:
        'Grants for programs serving at-risk youth, including mentoring, education, and workforce development.',
      eligibility: ['Youth Organizations', 'Non-profit', 'Schools'],
      status: 'closing-soon',
    },
  ]

  const categories = [
    'All Categories',
    'Community Development',
    'Education',
    'Environment',
    'Healthcare',
    'Arts & Culture',
    'Youth Services',
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'green'
      case 'closing-soon':
        return 'orange'
      default:
        return 'gray'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return 'Open'
      case 'closing-soon':
        return 'Closing Soon'
      default:
        return 'Closed'
    }
  }

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter))
  }

  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const cardHoverBg = useColorModeValue('gray.50', 'gray.700')

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="lg" mb={2}>
              Grant Search
            </Heading>
            <Text color="gray.600">
              Discover funding opportunities tailored to your organization's mission
            </Text>
          </Box>

          {/* Search Bar */}
          <Card>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiSearch} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    placeholder="Search grants by keyword, organization, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>

                <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((cat, index) => (
                      <option key={index} value={cat.toLowerCase()}>
                        {cat}
                      </option>
                    ))}
                  </Select>

                  <Select placeholder="Funding Amount">
                    <option value="0-25k">$0 - $25,000</option>
                    <option value="25k-100k">$25,000 - $100,000</option>
                    <option value="100k-500k">$100,000 - $500,000</option>
                    <option value="500k+">$500,000+</option>
                  </Select>

                  <Select placeholder="Deadline">
                    <option value="30days">Next 30 days</option>
                    <option value="60days">Next 60 days</option>
                    <option value="90days">Next 90 days</option>
                    <option value="all">All deadlines</option>
                  </Select>

                  <Select placeholder="Location">
                    <option value="national">National</option>
                    <option value="state">State-wide</option>
                    <option value="regional">Regional</option>
                    <option value="local">Local</option>
                  </Select>
                </SimpleGrid>

                <HStack justify="space-between">
                  <Button
                    leftIcon={<Icon as={FiFilter} />}
                    variant="outline"
                    size="sm"
                  >
                    Advanced Filters
                  </Button>
                  <Button
                    leftIcon={<Icon as={FiBookmark} />}
                    variant="outline"
                    size="sm"
                  >
                    Saved Searches
                  </Button>
                </HStack>

                {/* Active Filters */}
                {selectedFilters.length > 0 && (
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Active Filters:
                    </Text>
                    <Wrap>
                      {selectedFilters.map((filter, index) => (
                        <WrapItem key={index}>
                          <Tag size="md" colorScheme="blue" borderRadius="full">
                            <TagLabel>{filter}</TagLabel>
                            <TagCloseButton onClick={() => removeFilter(filter)} />
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </Box>
                )}
              </VStack>
            </CardBody>
          </Card>

          {/* Results Header */}
          <Flex justify="space-between" align="center">
            <Text fontWeight="medium" color="gray.600">
              Showing {grants.length} grants
            </Text>
            <HStack spacing={2}>
              <Text fontSize="sm" color="gray.600">
                Sort by:
              </Text>
              <Select size="sm" w="180px" defaultValue="relevance">
                <option value="relevance">Relevance</option>
                <option value="deadline">Deadline</option>
                <option value="amount">Funding Amount</option>
                <option value="recent">Recently Added</option>
              </Select>
            </HStack>
          </Flex>

          {/* Grant Results */}
          <VStack spacing={4} align="stretch">
            {grants.map((grant) => (
              <Card
                key={grant.id}
                cursor="pointer"
                _hover={{ bg: cardHoverBg }}
                transition="all 0.2s"
              >
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <Flex justify="space-between" align="start">
                      <Box flex={1}>
                        <HStack mb={2}>
                          <Heading size="md">{grant.title}</Heading>
                          <Badge colorScheme={getStatusColor(grant.status)}>
                            {getStatusLabel(grant.status)}
                          </Badge>
                        </HStack>
                        <Text color="gray.600" fontSize="sm" mb={2}>
                          {grant.organization}
                        </Text>
                        <Text color="gray.700" mb={3}>
                          {grant.description}
                        </Text>

                        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={3}>
                          <HStack>
                            <Icon as={FiDollarSign} color="gray.500" />
                            <Box>
                              <Text fontSize="xs" color="gray.500">
                                Funding Amount
                              </Text>
                              <Text fontSize="sm" fontWeight="medium">
                                {grant.amount}
                              </Text>
                            </Box>
                          </HStack>

                          <HStack>
                            <Icon as={FiCalendar} color="gray.500" />
                            <Box>
                              <Text fontSize="xs" color="gray.500">
                                Deadline
                              </Text>
                              <Text fontSize="sm" fontWeight="medium">
                                {grant.deadline}
                              </Text>
                            </Box>
                          </HStack>

                          <HStack>
                            <Icon as={FiMapPin} color="gray.500" />
                            <Box>
                              <Text fontSize="xs" color="gray.500">
                                Location
                              </Text>
                              <Text fontSize="sm" fontWeight="medium">
                                {grant.location}
                              </Text>
                            </Box>
                          </HStack>

                          <HStack>
                            <Icon as={FiStar} color="gray.500" />
                            <Box>
                              <Text fontSize="xs" color="gray.500">
                                Category
                              </Text>
                              <Text fontSize="sm" fontWeight="medium">
                                {grant.category}
                              </Text>
                            </Box>
                          </HStack>
                        </SimpleGrid>

                        <Box>
                          <Text fontSize="xs" color="gray.500" mb={2}>
                            Eligibility:
                          </Text>
                          <Wrap>
                            {grant.eligibility.map((item, index) => (
                              <WrapItem key={index}>
                                <Badge colorScheme="blue" variant="subtle">
                                  {item}
                                </Badge>
                              </WrapItem>
                            ))}
                          </Wrap>
                        </Box>
                      </Box>

                      <VStack spacing={2} ml={4}>
                        <IconButton
                          aria-label="Bookmark grant"
                          icon={<Icon as={FiBookmark} />}
                          variant="ghost"
                          colorScheme="blue"
                        />
                      </VStack>
                    </Flex>

                    <Divider />

                    <HStack justify="flex-end" spacing={3}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button colorScheme="blue" size="sm">
                        Start Application
                      </Button>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </VStack>

          {/* Pagination */}
          <Flex justify="center" align="center" gap={2}>
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <HStack spacing={1}>
              <Button size="sm" colorScheme="blue">
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
