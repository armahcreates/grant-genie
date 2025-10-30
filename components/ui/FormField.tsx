/**
 * FormField Component
 * 
 * Reusable form field wrapper with consistent styling and accessibility
 * Provides Field.Root, Label, HelperText, and ErrorText in one component
 */

import {
  Field,
  Input,
  Textarea,
  NativeSelectRoot,
  NativeSelectField,
  Text,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'

interface FormFieldProps<T extends FieldValues> {
  label: string
  helperText?: string
  error?: string
  required?: boolean
  field: ControllerRenderProps<T, FieldPath<T>>
  children: ReactNode
  id?: string
}

export function FormField<T extends FieldValues>({
  label,
  helperText,
  error,
  required,
  field,
  children,
  id,
}: FormFieldProps<T>) {
  return (
    <Field.Root invalid={!!error} required={required}>
      <Field.Label fontWeight="medium">{label}</Field.Label>
      {children}
      {helperText && !error && (
        <Field.HelperText>{helperText}</Field.HelperText>
      )}
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  )
}

/**
 * FormInput - Input field with FormField wrapper
 */
interface FormInputProps<T extends FieldValues> {
  label: string
  helperText?: string
  error?: string
  required?: boolean
  field: ControllerRenderProps<T, FieldPath<T>>
  type?: string
  placeholder?: string
  id?: string
}

export function FormInput<T extends FieldValues>({
  label,
  helperText,
  error,
  required,
  field,
  type = 'text',
  placeholder,
  id,
}: FormInputProps<T>) {
  return (
    <FormField
      label={label}
      helperText={helperText}
      error={error}
      required={required}
      field={field}
      id={id}
    >
      <Input
        {...field}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        id={id}
      />
    </FormField>
  )
}

/**
 * FormTextarea - Textarea field with FormField wrapper
 */
interface FormTextareaProps<T extends FieldValues> {
  label: string
  helperText?: string
  error?: string
  required?: boolean
  field: ControllerRenderProps<T, FieldPath<T>>
  placeholder?: string
  rows?: number
  id?: string
}

export function FormTextarea<T extends FieldValues>({
  label,
  helperText,
  error,
  required,
  field,
  placeholder,
  rows = 4,
  id,
}: FormTextareaProps<T>) {
  return (
    <FormField
      label={label}
      helperText={helperText}
      error={error}
      required={required}
      field={field}
      id={id}
    >
      <Textarea
        {...field}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!!error}
        id={id}
      />
    </FormField>
  )
}

/**
 * FormSelect - Native select field with FormField wrapper
 */
interface FormSelectProps<T extends FieldValues> {
  label: string
  helperText?: string
  error?: string
  required?: boolean
  field: ControllerRenderProps<T, FieldPath<T>>
  options: Array<{ value: string; label: string }>
  placeholder?: string
  id?: string
}

export function FormSelect<T extends FieldValues>({
  label,
  helperText,
  error,
  required,
  field,
  options,
  placeholder,
  id,
}: FormSelectProps<T>) {
  return (
    <FormField
      label={label}
      helperText={helperText}
      error={error}
      required={required}
      field={field}
      id={id}
    >
      <NativeSelectRoot>
        <NativeSelectField {...field} aria-invalid={!!error} id={id}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelectField>
      </NativeSelectRoot>
    </FormField>
  )
}

