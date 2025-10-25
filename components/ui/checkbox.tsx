'use client'

import { Checkbox as ChakraCheckbox } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (details: { checked: boolean }) => void
  disabled?: boolean
  children?: React.ReactNode
}

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  ({ checked, onCheckedChange, disabled, children, ...props }, ref) => {
    return (
      <ChakraCheckbox.Root
        ref={ref}
        checked={checked}
        disabled={disabled}
        onCheckedChange={(details) => {
          if (onCheckedChange) {
            onCheckedChange({ checked: !!details.checked })
          }
        }}
        {...props}
      >
        <ChakraCheckbox.HiddenInput />
        <ChakraCheckbox.Control />
        {children && <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>}
      </ChakraCheckbox.Root>
    )
  }
)

Checkbox.displayName = 'Checkbox'
