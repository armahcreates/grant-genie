/**
 * LoadingSpinner Component
 * 
 * Displays animated spinners for action loading states.
 * Used for button actions, form submissions, and inline loading.
 */

import { Box, Spinner, Stack, Text } from '@chakra-ui/react'
import { colors } from '@/theme/tokens'

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  message?: string
  overlay?: boolean
  fullscreen?: boolean
}

export function LoadingSpinner({ 
  size = 'md',
  color = colors.brand.deepIndigo,
  message,
  overlay = false,
  fullscreen = false
}: LoadingSpinnerProps) {
  
  const spinner = (
    <Stack align="center" gap={3}>
      <Spinner
        size={size}
        color={color}
      />
      {message && (
        <Text 
          fontSize="sm" 
          color="gray.600"
          textAlign="center"
        >
          {message}
        </Text>
      )}
    </Stack>
  )

  // Fullscreen loading overlay
  if (fullscreen) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="rgba(255, 255, 255, 0.9)"
        backdropFilter="blur(4px)"
        zIndex={9999}
      >
        {spinner}
      </Box>
    )
  }

  // Overlay loading (covers parent container)
  if (overlay) {
    return (
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="rgba(255, 255, 255, 0.8)"
        backdropFilter="blur(2px)"
        borderRadius="xl"
        zIndex={10}
      >
        {spinner}
      </Box>
    )
  }

  // Inline spinner
  return (
    <Box display="flex" alignItems="center" justifyContent="center" py={4}>
      {spinner}
    </Box>
  )
}

/**
 * Specialized spinner variants for common use cases
 */

// Button spinner - for loading buttons
export function ButtonSpinner({ size = 'sm' }: { size?: 'xs' | 'sm' | 'md' }) {
  return (
    <Spinner
      size={size}
      color="white"
    />
  )
}

// Page spinner - for page-level loading
export function PageSpinner({ message }: { message?: string }) {
  return (
    <Box
      minH="400px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={12}
    >
      <Stack align="center" gap={4}>
        <Spinner
          size="xl"
          color={colors.brand.deepIndigo}
        />
        {message && (
          <Text 
            fontSize="md" 
            color="gray.600"
            textAlign="center"
          >
            {message}
          </Text>
        )}
      </Stack>
    </Box>
  )
}

// Inline spinner - for inline loading indicators
export function InlineSpinner({ 
  message, 
  size = 'sm' 
}: { 
  message?: string
  size?: 'xs' | 'sm' | 'md'
}) {
  return (
    <Stack direction="row" align="center" gap={2}>
      <Spinner
        size={size}
        color={colors.brand.deepIndigo}
      />
      {message && (
        <Text fontSize="sm" color="gray.600">
          {message}
        </Text>
      )}
    </Stack>
  )
}

// Card spinner - for card/section loading
export function CardSpinner({ message }: { message?: string }) {
  return (
    <Box
      p={8}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="xl"
      bg="gray.50"
    >
      <Stack align="center" gap={3}>
        <Spinner
          size="lg"
          color={colors.brand.deepIndigo}
        />
        {message && (
          <Text 
            fontSize="sm" 
            color="gray.600"
            textAlign="center"
          >
            {message}
          </Text>
        )}
      </Stack>
    </Box>
  )
}

// Upload spinner - for file upload progress
export function UploadSpinner({ 
  message = "Uploading..." 
}: { 
  message?: string 
}) {
  return (
    <Stack align="center" gap={3} py={6}>
      <Box position="relative">
        <Spinner
          size="lg"
          color={colors.brand.softTeal}
        />
      </Box>
      <Text 
        fontSize="sm" 
        color="gray.600"
        fontWeight="medium"
        textAlign="center"
      >
        {message}
      </Text>
    </Stack>
  )
}