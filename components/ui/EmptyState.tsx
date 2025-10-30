/**
 * EmptyState Component
 * 
 * Displays friendly empty states for various scenarios.
 * Used when lists/tables/collections have no data.
 */

import { Box, Stack, Text, Button } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { FiInbox, FiSearch, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { colors } from '@/theme/tokens'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  variant?: 'default' | 'search' | 'success' | 'error'
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  action,
  variant = 'default'
}: EmptyStateProps) {
  
  const getDefaultIcon = () => {
    switch (variant) {
      case 'search':
        return <FiSearch size={48} />
      case 'success':
        return <FiCheckCircle size={48} />
      case 'error':
        return <FiAlertCircle size={48} />
      default:
        return <FiInbox size={48} />
    }
  }

  return (
    <Box
      py={12}
      px={6}
      textAlign="center"
      borderRadius="xl"
      bg="gray.50"
      borderWidth="2px"
      borderColor="gray.200"
      borderStyle="dashed"
    >
      <Stack align="center" gap={4} maxW="md" mx="auto">
        {/* Icon */}
        <Box color="gray.400">
          {icon || getDefaultIcon()}
        </Box>

        {/* Title */}
        <Text 
          fontSize="lg" 
          fontWeight="semibold"
          color="gray.700"
        >
          {title}
        </Text>

        {/* Description */}
        {description && (
          <Text 
            fontSize="sm" 
            color="gray.600"
            lineHeight="tall"
          >
            {description}
          </Text>
        )}

        {/* Action Button */}
        {action && (
          <Button
            mt={2}
            colorPalette="purple"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </Stack>
    </Box>
  )
}

/**
 * Specialized empty state components for common scenarios
 */

// Dashboard - No applications
export function NoApplicationsEmptyState({ onCreateNew }: { onCreateNew: () => void }) {
  return (
    <EmptyState
      title="No Grant Applications Yet"
      description="Start your first grant application to track your progress and manage deadlines."
      action={{
        label: "Create Application",
        onClick: onCreateNew
      }}
    />
  )
}

// Dashboard - No upcoming deadlines
export function NoDeadlinesEmptyState() {
  return (
    <EmptyState
      icon={<FiCheckCircle size={48} />}
      title="All Caught Up!"
      description="You have no upcoming deadlines. Great work staying on top of your applications!"
      variant="success"
    />
  )
}

// Grant Search - No results
export function NoSearchResultsEmptyState({ searchTerm }: { searchTerm?: string }) {
  return (
    <EmptyState
      variant="search"
      title="No Grants Found"
      description={
        searchTerm 
          ? `No grants match "${searchTerm}". Try adjusting your filters or search terms.`
          : "No grants match your current filters. Try adjusting your search criteria."
      }
    />
  )
}

// Grant Search - No bookmarks
export function NoBookmarksEmptyState() {
  return (
    <EmptyState
      title="No Bookmarked Grants"
      description="Bookmark grants you're interested in to easily find them later."
    />
  )
}

// Compliance Tracker - No pending tasks
export function NoPendingTasksEmptyState() {
  return (
    <EmptyState
      icon={<FiCheckCircle size={48} />}
      title="No Pending Tasks"
      description="All compliance tasks are complete! Check back later for new requirements."
      variant="success"
    />
  )
}

// Compliance Tracker - No overdue tasks
export function NoOverdueTasksEmptyState() {
  return (
    <EmptyState
      icon={<FiCheckCircle size={48} />}
      title="No Overdue Tasks"
      description="Great job! You're on top of all your compliance requirements."
      variant="success"
    />
  )
}

// Compliance Tracker - No tasks at all
export function NoComplianceTasksEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <EmptyState
      title="No Compliance Tasks"
      description="Create compliance tasks to track reporting requirements and deadlines."
      action={{
        label: "Add Task",
        onClick: onCreate
      }}
    />
  )
}

// Generic - No data
export function NoDataEmptyState({ 
  message = "No data available",
  description
}: { 
  message?: string
  description?: string
}) {
  return (
    <EmptyState
      title={message}
      description={description}
    />
  )
}

// Generic - Error state
export function ErrorEmptyState({ 
  message = "Something went wrong",
  description = "We couldn't load the data. Please try again.",
  onRetry
}: { 
  message?: string
  description?: string
  onRetry?: () => void
}) {
  return (
    <EmptyState
      variant="error"
      title={message}
      description={description}
      action={onRetry ? {
        label: "Try Again",
        onClick: onRetry
      } : undefined}
    />
  )
}