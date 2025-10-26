/**
 * Toast Notification System
 * 
 * Custom toast implementation for HeadspaceGenie.ai
 * Provides success, error, warning, and info notifications.
 */

'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Box, Stack, Text, IconButton } from '@chakra-ui/react'
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi'
import { colors } from '@/theme/tokens'

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  description: string
  duration?: number
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void
  success: (description: string, title?: string) => void
  error: (description: string, title?: string) => void
  warning: (description: string, title?: string) => void
  info: (description: string, title?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = { ...toast, id }
    
    setToasts((prev) => [...prev, newToast])

    // Auto-dismiss after duration (default 5s)
    const duration = toast.duration ?? 5000
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    }
  }, [])

  const success = useCallback((description: string, title?: string) => {
    showToast({ type: 'success', description, title })
  }, [showToast])

  const error = useCallback((description: string, title?: string) => {
    showToast({ type: 'error', description, title })
  }, [showToast])

  const warning = useCallback((description: string, title?: string) => {
    showToast({ type: 'warning', description, title })
  }, [showToast])

  const info = useCallback((description: string, title?: string) => {
    showToast({ type: 'info', description, title })
  }, [showToast])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
      {children}
      
      {/* Toast Container */}
      <Box
        position="fixed"
        bottom={4}
        right={4}
        zIndex={9999}
        pointerEvents="none"
      >
        <Stack gap={3}>
          {toasts.map((toast) => (
            <ToastItem 
              key={toast.id} 
              toast={toast} 
              onClose={() => removeToast(toast.id)} 
            />
          ))}
        </Stack>
      </Box>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

// Toast Item Component
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'white',
          borderColor: colors.status.success,
          icon: FiCheckCircle,
          iconColor: colors.status.success,
        }
      case 'error':
        return {
          bg: 'white',
          borderColor: colors.status.error,
          icon: FiAlertCircle,
          iconColor: colors.status.error,
        }
      case 'warning':
        return {
          bg: 'white',
          borderColor: colors.status.warning,
          icon: FiAlertTriangle,
          iconColor: colors.status.warning,
        }
      case 'info':
        return {
          bg: 'white',
          borderColor: colors.status.info,
          icon: FiInfo,
          iconColor: colors.status.info,
        }
    }
  }

  const styles = getToastStyles()
  const Icon = styles.icon

  return (
    <Box
      bg={styles.bg}
      borderRadius="lg"
      borderLeftWidth="4px"
      borderLeftColor={styles.borderColor}
      boxShadow="lg"
      p={4}
      pr={10}
      minW="300px"
      maxW="400px"
      position="relative"
      pointerEvents="auto"
      animation="slideIn 0.3s ease-out"
    >
      <Stack direction="row" gap={3} align="start">
        <Box color={styles.iconColor} mt={0.5}>
          <Icon size={20} />
        </Box>
        
        <Box flex={1}>
          {toast.title && (
            <Text fontWeight="semibold" fontSize="sm" mb={1}>
              {toast.title}
            </Text>
          )}
          <Text fontSize="sm" color="gray.700">
            {toast.description}
          </Text>
        </Box>
      </Stack>

      <IconButton
        aria-label="Close notification"
        position="absolute"
        top={2}
        right={2}
        size="sm"
        variant="ghost"
        onClick={onClose}
      >
        <FiX />
      </IconButton>
    </Box>
  )
}

// Add animation styles to global CSS
const styles = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}