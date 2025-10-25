'use client'

import { Tooltip as ChakraTooltip } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface TooltipProviderProps {
  children: React.ReactNode
}

export const TooltipProvider = ({ children }: TooltipProviderProps) => {
  return <>{children}</>
}

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  openDelay?: number
  closeDelay?: number
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, openDelay = 200, closeDelay = 0, placement = 'top', ...props }, ref) => {
    return (
      <ChakraTooltip.Root openDelay={openDelay} closeDelay={closeDelay} positioning={{ placement }}>
        <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
        <ChakraTooltip.Positioner>
          <ChakraTooltip.Content>{content}</ChakraTooltip.Content>
        </ChakraTooltip.Positioner>
      </ChakraTooltip.Root>
    )
  }
)

Tooltip.displayName = 'Tooltip'
