/**
 * LoadingSkeleton Component
 * 
 * Displays animated skeleton loaders for data loading states.
 * Used in dashboard, grant-search, and compliance-tracker pages.
 */

import { Box, Stack, Skeleton, SkeletonText } from '@chakra-ui/react'

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'table' | 'text' | 'custom'
  count?: number
  height?: string | number
  width?: string | number
}

export function LoadingSkeleton({ 
  variant = 'card', 
  count = 3,
  height,
  width
}: LoadingSkeletonProps) {
  
  // Card skeleton - for dashboard cards, grant cards
  if (variant === 'card') {
    return (
      <Stack gap={4}>
        {Array.from({ length: count }).map((_, i) => (
          <Box
            key={i}
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            bg="white"
          >
            <Stack gap={3}>
              <Skeleton height="24px" width="60%" borderRadius="md" />
              <SkeletonText noOfLines={3} gap={2} />
              <Stack direction="row" gap={2} mt={2}>
                <Skeleton height="32px" width="80px" borderRadius="full" />
                <Skeleton height="32px" width="100px" borderRadius="full" />
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    )
  }
  
  // List skeleton - for simple list items
  if (variant === 'list') {
    return (
      <Stack gap={3}>
        {Array.from({ length: count }).map((_, i) => (
          <Box
            key={i}
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.200"
            bg="white"
          >
            <Stack direction="row" align="center" gap={3}>
              <Skeleton height="40px" width="40px" borderRadius="md" />
              <Box flex={1}>
                <Skeleton height="18px" width="70%" mb={2} borderRadius="md" />
                <Skeleton height="14px" width="50%" borderRadius="md" />
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    )
  }
  
  // Table skeleton - for data tables
  if (variant === 'table') {
    return (
      <Stack gap={2}>
        {/* Header */}
        <Box
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          bg="gray.50"
        >
          <Stack direction="row" gap={4}>
            <Skeleton height="16px" width="25%" borderRadius="md" />
            <Skeleton height="16px" width="20%" borderRadius="md" />
            <Skeleton height="16px" width="30%" borderRadius="md" />
            <Skeleton height="16px" width="15%" borderRadius="md" />
          </Stack>
        </Box>
        
        {/* Rows */}
        {Array.from({ length: count }).map((_, i) => (
          <Box
            key={i}
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.200"
            bg="white"
          >
            <Stack direction="row" gap={4} align="center">
              <Skeleton height="14px" width="25%" borderRadius="md" />
              <Skeleton height="14px" width="20%" borderRadius="md" />
              <Skeleton height="14px" width="30%" borderRadius="md" />
              <Skeleton height="32px" width="15%" borderRadius="md" />
            </Stack>
          </Box>
        ))}
      </Stack>
    )
  }
  
  // Text skeleton - for text content
  if (variant === 'text') {
    return <SkeletonText noOfLines={count} gap={2} />
  }
  
  // Custom skeleton - flexible for custom use cases
  return (
    <Stack gap={3}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton 
          key={i} 
          height={height || '60px'} 
          width={width || '100%'}
          borderRadius="md"
        />
      ))}
    </Stack>
  )
}

/**
 * Specialized skeleton components for common use cases
 */

// Dashboard stats skeleton
export function DashboardStatsSkeleton() {
  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Box
          key={i}
          flex={1}
          p={6}
          borderRadius="xl"
          borderWidth="1px"
          borderColor="gray.200"
          bg="white"
        >
          <Stack gap={3}>
            <Skeleton height="16px" width="60%" borderRadius="md" />
            <Skeleton height="32px" width="50%" borderRadius="md" />
            <Skeleton height="14px" width="40%" borderRadius="md" />
          </Stack>
        </Box>
      ))}
    </Stack>
  )
}

// Grant card skeleton
export function GrantCardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <Stack gap={4}>
      {Array.from({ length: count }).map((_, i) => (
        <Box
          key={i}
          p={6}
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="purple.100"
          bg="white"
          boxShadow="lg"
        >
          <Stack gap={4}>
            {/* Header */}
            <Stack direction="row" justify="space-between" align="start">
              <Box flex={1}>
                <Skeleton height="24px" width="80%" mb={2} borderRadius="md" />
                <Skeleton height="16px" width="50%" borderRadius="md" />
              </Box>
              <Skeleton height="40px" width="40px" borderRadius="lg" />
            </Stack>
            
            {/* Description */}
            <SkeletonText noOfLines={2} gap={2} />
            
            {/* Tags */}
            <Stack direction="row" gap={2}>
              <Skeleton height="28px" width="80px" borderRadius="full" />
              <Skeleton height="28px" width="100px" borderRadius="full" />
              <Skeleton height="28px" width="90px" borderRadius="full" />
            </Stack>
            
            {/* Footer */}
            <Stack direction="row" justify="space-between" align="center" mt={2}>
              <Skeleton height="16px" width="30%" borderRadius="md" />
              <Skeleton height="40px" width="120px" borderRadius="md" />
            </Stack>
          </Stack>
        </Box>
      ))}
    </Stack>
  )
}

// Compliance task skeleton
export function ComplianceTaskSkeleton({ count = 5 }: { count?: number }) {
  return (
    <Stack gap={3}>
      {Array.from({ length: count }).map((_, i) => (
        <Box
          key={i}
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          bg="white"
        >
          <Stack direction="row" align="center" gap={4}>
            <Skeleton height="20px" width="20px" borderRadius="sm" />
            <Box flex={1}>
              <Skeleton height="18px" width="70%" mb={2} borderRadius="md" />
              <Skeleton height="14px" width="40%" borderRadius="md" />
            </Box>
            <Skeleton height="32px" width="80px" borderRadius="full" />
          </Stack>
        </Box>
      ))}
    </Stack>
  )
}