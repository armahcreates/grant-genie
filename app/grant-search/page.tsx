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
import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useKeyboardShortcuts } from '@/lib/utils/keyboard-shortcuts'
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
import { GrantCardSkeleton } from '@/components/ui/LoadingSkeleton'
import { NoSearchResultsEmptyState } from '@/components/ui/EmptyState'
import { useAppToast } from '@/lib/utils/toast'
import { formatDate, getDaysUntil, isWithinDays } from '@/lib/utils/dates'
import { useGrantsStore } from '@/lib/stores/grantsStore'
import { useGrants, type Grant } from '@/lib/api/grants'

type SortOption = 'relevance' | 'deadline' | 'amount' | 'recent'

export default function GrantSearchPage() {
  const router = useRouter()
  const toast = useAppToast()
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Zustand store for grant filters
  const filters = useGrantsStore((state) => state.filters)
  const setFilters = useGrantsStore((state) => state.setFilters)
  const resetFilters = useGrantsStore((state) => state.resetFilters)
  const selectedGrantIds = useGrantsStore((state) => state.selectedGrantIds)
  const toggleGrantSelection = useGrantsStore((state) => state.toggleGrantSelection)
  const addRecentSearch = useGrantsStore((state) => state.addRecentSearch)

  // Local UI state
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  // TanStack Query - Fetch grants from API
  const { data: grantsData = [], isLoading, error } = useGrants(filters)

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: '/',
      description: 'Focus search input',
      action: () => {
        searchInputRef.current?.focus()
      },
      category: 'Search',
    },
  ])
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters, sortBy])

  // Add search to recent searches when it changes
  useEffect(() => {
    if (filters.searchQuery && filters.searchQuery.length > 2) {
      const timeoutId = setTimeout(() => {
        addRecentSearch(filters.searchQuery)
      }, 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [filters.searchQuery, addRecentSearch])

  const toggleBookmark = (grantId: string, grantTitle: string) => {
    const wasBookmarked = selectedGrantIds.includes(grantId)

    toggleGrantSelection(grantId)

    // Show toast notification
    if (wasBookmarked) {
      toast.bookmarkRemoved(grantTitle)
    } else {
      toast.bookmarkAdded(grantTitle)
    }
  }

  // Parse funding amount from string (e.g., "$250,000" -> 250000)
  const parseFundingAmount = (amount: string): number => {
    return parseInt(amount.replace(/[$,]/g, '')) || 0
  }

  // Filter and sort grants
  const { filteredAndSortedGrants, activeFilterChips } = useMemo(() => {
    const chips: string[] = []

    // Apply all filters
    let filtered = grantsData.filter((grant) => {
      // Search query filter
      const matchesSearch =
        filters.searchQuery === '' ||
        grant.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        grant.organization.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        grant.description.toLowerCase().includes(filters.searchQuery.toLowerCase())

      // Category filter
      const matchesCategory =
        filters.category === 'all' ||
        filters.category === 'all categories' ||
        grant.category.toLowerCase() === filters.category.toLowerCase()

      // Funding amount filter
      let matchesFunding = true
      const amount = parseFundingAmount(grant.amount)
      if (amount < filters.amountRange.min || amount > filters.amountRange.max) {
        matchesFunding = false
      }

      // Deadline filter
      let matchesDeadline = true
      if (filters.deadline !== 'all') {
        switch (filters.deadline) {
          case '30days':
            matchesDeadline = isWithinDays(grant.deadline, 30)
            break
          case '60days':
            matchesDeadline = isWithinDays(grant.deadline, 60)
            break
          case '90days':
            matchesDeadline = isWithinDays(grant.deadline, 90)
            break
        }
      }

      // Status filter
      const matchesStatus = filters.status === 'all' || grant.status.toLowerCase() === filters.status

      return matchesSearch && matchesCategory && matchesFunding && matchesDeadline && matchesStatus
    })

    // Build active filter chips
    if (filters.category !== 'all' && filters.category !== 'all categories') {
      chips.push(`Category: ${filters.category}`)
    }
    if (filters.amountRange.min > 0 || filters.amountRange.max < 1000000) {
      chips.push(`Funding: $${filters.amountRange.min.toLocaleString()} - $${filters.amountRange.max.toLocaleString()}`)
    }
    if (filters.deadline !== 'all') {
      const deadlineLabels = {
        '30days': 'Next 30 days',
        '60days': 'Next 60 days',
        '90days': 'Next 90 days'
      }
      chips.push(`Deadline: ${deadlineLabels[filters.deadline]}`)
    }
    if (filters.status !== 'all') {
      chips.push(`Status: ${filters.status}`)
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return b.matchScore - a.matchScore
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        case 'amount':
          return parseFundingAmount(b.amount) - parseFundingAmount(a.amount)
        case 'recent':
          // In real app, would sort by date added. Using ID as proxy
          return b.id.localeCompare(a.id)
        default:
          return 0
      }
    })

    return { filteredAndSortedGrants: sorted, activeFilterChips: chips }
  }, [grantsData, filters, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedGrants.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedGrants = filteredAndSortedGrants.slice(startIndex, endIndex)

  // Calculate display range
  const displayStart = filteredAndSortedGrants.length === 0 ? 0 : startIndex + 1
  const displayEnd = Math.min(endIndex, filteredAndSortedGrants.length)

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

  const removeFilterChip = (chip: string) => {
    if (chip.startsWith('Category:')) {
      setFilters({ category: 'all' })
    } else if (chip.startsWith('Funding:')) {
      setFilters({ amountRange: { min: 0, max: 1000000 } })
    } else if (chip.startsWith('Deadline:')) {
      setFilters({ deadline: 'all' })
    } else if (chip.startsWith('Status:')) {
      setFilters({ status: 'all' })
    }
  }

  const clearAllFilters = () => {
    resetFilters()
  }
  
  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
                    ref={searchInputRef}
                    size="lg"
                    placeholder="Search grants by keyword, organization, or category... (Press / to focus)"
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({ searchQuery: e.target.value })}
                  />
                </HStack>

                <SimpleGrid columns={{ base: 1, md: 4 }} gap={4}>
                  <NativeSelectRoot>
                    <NativeSelectField
                      value={filters.category}
                      onChange={(e) => setFilters({ category: e.target.value })}
                    >
                      {categories.map((cat, index) => (
                        <option key={index} value={cat.toLowerCase()}>
                          {cat}
                        </option>
                      ))}
                    </NativeSelectField>
                  </NativeSelectRoot>

                  <NativeSelectRoot>
                    <NativeSelectField
                      placeholder="Funding Amount"
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === 'all') {
                          setFilters({ amountRange: { min: 0, max: 1000000 } })
                        } else if (value === '0-25k') {
                          setFilters({ amountRange: { min: 0, max: 25000 } })
                        } else if (value === '25k-100k') {
                          setFilters({ amountRange: { min: 25000, max: 100000 } })
                        } else if (value === '100k-500k') {
                          setFilters({ amountRange: { min: 100000, max: 500000 } })
                        } else if (value === '500k+') {
                          setFilters({ amountRange: { min: 500000, max: 1000000 } })
                        }
                      }}
                    >
                      <option value="all">All Amounts</option>
                      <option value="0-25k">$0 - $25,000</option>
                      <option value="25k-100k">$25,000 - $100,000</option>
                      <option value="100k-500k">$100,000 - $500,000</option>
                      <option value="500k+">$500,000+</option>
                    </NativeSelectField>
                  </NativeSelectRoot>

                  <NativeSelectRoot>
                    <NativeSelectField
                      placeholder="Deadline"
                      value={filters.deadline}
                      onChange={(e) => setFilters({ deadline: e.target.value as any })}
                    >
                      <option value="all">All Deadlines</option>
                      <option value="30days">Next 30 days</option>
                      <option value="60days">Next 60 days</option>
                      <option value="90days">Next 90 days</option>
                    </NativeSelectField>
                  </NativeSelectRoot>

                  <NativeSelectRoot>
                    <NativeSelectField
                      placeholder="Status"
                      value={filters.status}
                      onChange={(e) => setFilters({ status: e.target.value as any })}
                    >
                      <option value="all">All Statuses</option>
                      <option value="open">Open</option>
                      <option value="closing soon">Closing Soon</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="closed">Closed</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </SimpleGrid>

                <HStack justify="space-between">
                  <Button variant="outline" size="md" aria-label="Open advanced filters">
                    <Icon as={FiFilter} />
                    Advanced Filters
                  </Button>
                  <Button variant="outline" size="md" aria-label="View saved searches">
                    <Icon as={FiBookmark} />
                    Saved Searches
                  </Button>
                </HStack>

                {/* Active Filters */}
                {activeFilterChips.length > 0 && (
                  <Box>
                    <Flex justify="space-between" align="center" mb={2}>
                      <Text fontSize="sm" fontWeight="medium">
                        Active Filters:
                      </Text>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorPalette="purple"
                        onClick={clearAllFilters}
                      >
                        Clear All
                      </Button>
                    </Flex>
                    <Wrap gap={2}>
                      {activeFilterChips.map((chip, index) => (
                        <Tag.Root key={index} size="md" colorPalette="purple" borderRadius="full">
                          <Tag.Label>{chip}</Tag.Label>
                          <Tag.CloseTrigger onClick={() => removeFilterChip(chip)} />
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
              Showing {displayStart}-{displayEnd} of {filteredAndSortedGrants.length} grants
            </Text>
            <HStack gap={2}>
              <Text fontSize="sm" color="purple.800">
                Sort by:
              </Text>
              <NativeSelectRoot w="180px" size="sm">
                <NativeSelectField
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="deadline">Deadline</option>
                  <option value="amount">Funding Amount</option>
                  <option value="recent">Recently Added</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </HStack>
          </Flex>

          {/* Grant Results */}
          {isLoading ? (
            <GrantCardSkeleton count={5} />
          ) : filteredAndSortedGrants.length === 0 ? (
            <NoSearchResultsEmptyState searchTerm={filters.searchQuery} />
          ) : (
          <VStack gap={4} align="stretch">
            {paginatedGrants.map((grant) => (
              <Card.Root
                key={grant.id}
                cursor="pointer"
                tabIndex={0}
                role="article"
                aria-label={`Grant opportunity: ${grant.title}`}
                _hover={{ bg: 'purple.50', transform: 'translateY(-4px) scale(1.01)', boxShadow: 'xl' }}
                _focusVisible={{
                  outline: '3px solid',
                  outlineColor: 'purple.500',
                  outlineOffset: '2px',
                  bg: 'purple.50'
                }}
                transition="all 0.3s"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    router.push('/grant-application')
                  }
                }}
              >
                <Card.Body>
                  <VStack gap={4} align="stretch">
                    <Flex justify="space-between" align="start">
                      <Box flex={1}>
                        <HStack mb={2}>
                          <Heading size="md">{grant.title}</Heading>
                          <Badge colorPalette={getStatusColor(grant.status)}>
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
                                {formatDate(grant.deadline)}
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
                              <Badge key={index} colorPalette="purple" variant="subtle">
                                {item}
                              </Badge>
                            ))}
                          </Wrap>
                        </Box>
                      </Box>

                      <VStack gap={2} ml={4}>
                        <IconButton
                          aria-label={selectedGrantIds.includes(grant.id) ? `Remove ${grant.title} from bookmarks` : `Bookmark ${grant.title}`}
                          variant={selectedGrantIds.includes(grant.id) ? 'solid' : 'ghost'}
                          colorPalette="purple"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleBookmark(grant.id, grant.title)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              e.stopPropagation()
                              toggleBookmark(grant.id, grant.title)
                            }
                          }}
                          _focusVisible={{
                            outline: '3px solid',
                            outlineColor: 'purple.500',
                            outlineOffset: '2px'
                          }}
                        >
                          <Icon as={FiBookmark} fill={selectedGrantIds.includes(grant.id) ? 'currentColor' : 'none'} />
                        </IconButton>
                      </VStack>
                    </Flex>

                    <Separator />

                    <HStack justify="flex-end" gap={3}>
                      <Button
                        variant="outline"
                        size="md"
                        colorPalette="purple"
                        aria-label={`View details for ${grant.title}`}
                        _focusVisible={{
                          outline: '3px solid',
                          outlineColor: 'purple.500',
                          outlineOffset: '2px'
                        }}
                      >
                        View Grant Details
                      </Button>
                      <Button
                        colorPalette="purple"
                        size="lg"
                        aria-label={`Start application for ${grant.title}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push('/grant-application')
                        }}
                        _focusVisible={{
                          outline: '3px solid',
                          outlineColor: 'purple.500',
                          outlineOffset: '2px'
                        }}
                      >
                        Start Application
                      </Button>
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            ))}
          </VStack>
          )}

          {/* Pagination */}
          {filteredAndSortedGrants.length > 0 && (
            <Flex justify="center" align="center" gap={2} role="navigation" aria-label="Pagination">
              <Button
                variant="outline"
                size="md"
                aria-label="Go to previous page"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                _focusVisible={{
                  outline: '3px solid',
                  outlineColor: 'purple.500',
                  outlineOffset: '2px'
                }}
              >
                Previous
              </Button>
              <HStack gap={1}>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  // Show first page, last page, current page, and pages around current
                  let pageNum: number
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  
                  const isCurrentPage = pageNum === currentPage
                  
                  return (
                    <Button
                      key={pageNum}
                      size="md"
                      colorPalette={isCurrentPage ? 'purple' : undefined}
                      variant={isCurrentPage ? 'solid' : 'ghost'}
                      aria-label={isCurrentPage ? `Page ${pageNum}, current page` : `Go to page ${pageNum}`}
                      aria-current={isCurrentPage ? 'page' : undefined}
                      onClick={() => goToPage(pageNum)}
                      _focusVisible={{
                        outline: '3px solid',
                        outlineColor: 'purple.500',
                        outlineOffset: '2px'
                      }}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </HStack>
              <Button
                variant="outline"
                size="md"
                aria-label="Go to next page"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
                _focusVisible={{
                  outline: '3px solid',
                  outlineColor: 'purple.500',
                  outlineOffset: '2px'
                }}
              >
                Next
              </Button>
            </Flex>
          )}
        </VStack>
      </Container>
    </MainLayout>
  )
}
