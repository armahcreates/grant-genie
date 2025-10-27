/**
 * Form Helper Utilities
 *
 * Utilities for working with react-hook-form across the application
 */

import { FieldError, FieldErrors } from 'react-hook-form'

/**
 * Get error message from react-hook-form field error
 */
export const getErrorMessage = (error?: FieldError): string | undefined => {
  if (!error) return undefined
  if (typeof error.message === 'string') return error.message
  return undefined
}

/**
 * Check if a form field has an error
 */
export const hasError = (errors: FieldErrors, fieldName: string): boolean => {
  return !!errors[fieldName]
}

/**
 * Get nested error message (for nested form fields)
 */
export const getNestedError = (
  errors: FieldErrors,
  path: string
): string | undefined => {
  const keys = path.split('.')
  let current: any = errors

  for (const key of keys) {
    if (!current[key]) return undefined
    current = current[key]
  }

  return getErrorMessage(current as FieldError)
}

/**
 * Format form data for API submission
 */
export const formatFormData = <T extends Record<string, any>>(
  data: T
): FormData => {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value))
      } else if (typeof value === 'object' && !(value instanceof File)) {
        formData.append(key, JSON.stringify(value))
      } else {
        formData.append(key, value)
      }
    }
  })

  return formData
}

/**
 * Create default values from partial data
 */
export const createDefaultValues = <T extends Record<string, any>>(
  defaults: Partial<T>,
  schema: Record<keyof T, any>
): T => {
  const result = { ...schema } as T

  Object.keys(defaults).forEach((key) => {
    if (defaults[key as keyof T] !== undefined) {
      result[key as keyof T] = defaults[key as keyof T] as T[keyof T]
    }
  })

  return result
}
