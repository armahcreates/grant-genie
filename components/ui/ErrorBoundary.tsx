/**
 * ErrorBoundary Component
 * 
 * Catches React errors and displays a friendly fallback UI.
 * Prevents the entire app from crashing when components error.
 */

'use client'

import { Component, ReactNode } from 'react'
import { Box, Stack, Text, Button, Heading } from '@chakra-ui/react'
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi'
import { colors } from '@/theme/tokens'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onReset?: () => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo,
    })

    // Log to error reporting service (e.g., Sentry)
    // logErrorToService(error, errorInfo)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
    
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  handleGoHome = () => {
    window.location.href = '/dashboard'
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <Box
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="gray.50"
          p={6}
        >
          <Stack align="center" gap={6} maxW="lg" textAlign="center">
            {/* Error Icon */}
            <Box
              p={6}
              borderRadius="full"
              bg="red.50"
              color={colors.status.error}
            >
              <FiAlertTriangle size={48} />
            </Box>

            {/* Error Message */}
            <Stack gap={3}>
              <Heading size="xl" color="gray.800">
                Oops! Something went wrong
              </Heading>
              <Text fontSize="md" color="gray.600" lineHeight="tall">
                We encountered an unexpected error. Don't worry, your data is safe. 
                Try refreshing the page or return to the dashboard.
              </Text>
            </Stack>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box
                w="100%"
                p={4}
                bg="gray.100"
                borderRadius="md"
                textAlign="left"
                overflowX="auto"
              >
                <Text fontSize="sm" fontWeight="semibold" mb={2} color="gray.700">
                  Error Details:
                </Text>
                <Text fontSize="xs" fontFamily="mono" color="red.600">
                  {this.state.error.toString()}
                </Text>
                {this.state.errorInfo && (
                  <Text fontSize="xs" fontFamily="mono" color="gray.600" mt={2}>
                    {this.state.errorInfo.componentStack}
                  </Text>
                )}
              </Box>
            )}

            {/* Action Buttons */}
            <Stack direction={{ base: 'column', sm: 'row' }} gap={3} w="100%">
              <Button
                flex={1}
                colorPalette="purple"
                onClick={this.handleReset}
              >
                <FiRefreshCw />
                Try Again
              </Button>
              <Button
                flex={1}
                variant="outline"
                onClick={this.handleGoHome}
              >
                <FiHome />
                Go to Dashboard
              </Button>
            </Stack>

            {/* Support Link */}
            <Text fontSize="sm" color="gray.500">
              If this problem persists, please{' '}
              <Text as="span" color="purple.600" fontWeight="semibold" cursor="pointer">
                contact support
              </Text>
            </Text>
          </Stack>
        </Box>
      )
    }

    return this.props.children
  }
}

/**
 * Functional wrapper for ErrorBoundary with reset key
 */
export function ErrorBoundaryWithReset({ 
  children, 
  resetKeys = [] 
}: { 
  children: ReactNode
  resetKeys?: unknown[]
}) {
  const key = resetKeys.join('-')
  
  return (
    <ErrorBoundary key={key}>
      {children}
    </ErrorBoundary>
  )
}

/**
 * Page-level ErrorBoundary with custom styling
 */
export function PageErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <Box
          minH="calc(100vh - 80px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={6}
        >
          <Stack align="center" gap={6} maxW="md" textAlign="center">
            <Box
              p={6}
              borderRadius="full"
              bg="red.50"
              color={colors.status.error}
            >
              <FiAlertTriangle size={40} />
            </Box>

            <Stack gap={3}>
              <Heading size="lg" color="gray.800">
                Unable to Load Page
              </Heading>
              <Text fontSize="sm" color="gray.600">
                We're having trouble loading this page. Please try refreshing or return to the dashboard.
              </Text>
            </Stack>

            <Stack direction="row" gap={3}>
              <Button
                colorPalette="purple"
                onClick={() => window.location.reload()}
              >
                <FiRefreshCw />
                Refresh Page
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/dashboard'}
              >
                <FiHome />
                Dashboard
              </Button>
            </Stack>
          </Stack>
        </Box>
      }
    >
      {children}
    </ErrorBoundary>
  )
}

/**
 * Section/Component-level ErrorBoundary
 */
export function SectionErrorBoundary({ 
  children,
  title = "Unable to load content"
}: { 
  children: ReactNode
  title?: string
}) {
  return (
    <ErrorBoundary
      fallback={
        <Box
          p={8}
          borderRadius="xl"
          bg="red.50"
          borderWidth="1px"
          borderColor="red.200"
        >
          <Stack align="center" gap={4} textAlign="center">
            <Box color={colors.status.error}>
              <FiAlertTriangle size={32} />
            </Box>
            <Stack gap={2}>
              <Text fontWeight="semibold" color="gray.800">
                {title}
              </Text>
              <Text fontSize="sm" color="gray.600">
                This section encountered an error. Try refreshing the page.
              </Text>
            </Stack>
            <Button
              size="sm"
              colorPalette="purple"
              variant="outline"
              onClick={() => window.location.reload()}
            >
              <FiRefreshCw />
              Refresh
            </Button>
          </Stack>
        </Box>
      }
    >
      {children}
    </ErrorBoundary>
  )
}