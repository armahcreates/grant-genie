/**
 * API Validation Schemas using TypeBox
 * 
 * Centralized validation schemas for all API endpoints
 */

import { Type, Static } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

// ============================================================================
// GRANT VALIDATION SCHEMAS
// ============================================================================

export const CreateGrantSchema = Type.Object({
  grantTitle: Type.String({ minLength: 1, maxLength: 500 }),
  organization: Type.String({ minLength: 1, maxLength: 200 }),
  funderName: Type.String({ minLength: 1, maxLength: 200 }),
  focusArea: Type.Optional(Type.String({ maxLength: 100 })),
  amount: Type.Optional(Type.String()),
  deadline: Type.Optional(Type.String({ format: 'date-time' })),
  status: Type.Optional(Type.Union([
    Type.Literal('Draft'),
    Type.Literal('Submitted'),
    Type.Literal('Under Review'),
    Type.Literal('Approved'),
    Type.Literal('Rejected')
  ])),
  rfpText: Type.Optional(Type.String()),
  teachingMaterials: Type.Optional(Type.String()),
  projectName: Type.Optional(Type.String({ maxLength: 200 })),
  proposalContent: Type.Optional(Type.String()),
})

export type CreateGrantDto = Static<typeof CreateGrantSchema>

// ============================================================================
// GRANT OPPORTUNITY VALIDATION SCHEMAS
// ============================================================================

export const CreateGrantOpportunitySchema = Type.Object({
  title: Type.String({ minLength: 1, maxLength: 500 }),
  organization: Type.String({ minLength: 1, maxLength: 200 }),
  description: Type.String({ minLength: 1 }),
  category: Type.String({ minLength: 1, maxLength: 100 }),
  amount: Type.Optional(Type.String()),
  minAmount: Type.Optional(Type.Number()),
  maxAmount: Type.Optional(Type.Number()),
  deadline: Type.Optional(Type.String({ format: 'date-time' })),
  focusAreas: Type.Optional(Type.Array(Type.String())),
  eligibility: Type.Optional(Type.Array(Type.String())),
  geographicScope: Type.Optional(Type.String()),
  location: Type.Optional(Type.String()),
  status: Type.Optional(Type.Union([
    Type.Literal('Open'),
    Type.Literal('Closing Soon'),
    Type.Literal('Closed')
  ])),
  sourceUrl: Type.Optional(Type.String({ format: 'uri' })),
  applicationUrl: Type.Optional(Type.String({ format: 'uri' })),
  contactEmail: Type.Optional(Type.String({ format: 'email' })),
  contactPhone: Type.Optional(Type.String()),
})

export type CreateGrantOpportunityDto = Static<typeof CreateGrantOpportunitySchema>

// ============================================================================
// COMPLIANCE VALIDATION SCHEMAS
// ============================================================================

export const CreateComplianceItemSchema = Type.Object({
  grantId: Type.Optional(Type.Number()),
  grantName: Type.String({ minLength: 1, maxLength: 200 }),
  requirement: Type.String({ minLength: 1, maxLength: 500 }),
  description: Type.Optional(Type.String()),
  dueDate: Type.String({ format: 'date-time' }),
  priority: Type.Union([
    Type.Literal('Low'),
    Type.Literal('Medium'),
    Type.Literal('High')
  ]),
  status: Type.Optional(Type.Union([
    Type.Literal('Completed'),
    Type.Literal('In Progress'),
    Type.Literal('Overdue'),
    Type.Literal('Upcoming')
  ])),
  notes: Type.Optional(Type.String()),
})

export type CreateComplianceItemDto = Static<typeof CreateComplianceItemSchema>

// ============================================================================
// DONOR VALIDATION SCHEMAS
// ============================================================================

export const CreateDonorSchema = Type.Object({
  name: Type.String({ minLength: 1, maxLength: 200 }),
  email: Type.Optional(Type.String({ format: 'email' })),
  phone: Type.Optional(Type.String()),
  organization: Type.Optional(Type.String({ maxLength: 200 })),
  title: Type.Optional(Type.String({ maxLength: 100 })),
  address: Type.Optional(Type.String()),
  city: Type.Optional(Type.String({ maxLength: 100 })),
  state: Type.Optional(Type.String({ maxLength: 50 })),
  zipCode: Type.Optional(Type.String({ maxLength: 20 })),
  donorType: Type.Optional(Type.Union([
    Type.Literal('Individual'),
    Type.Literal('Foundation'),
    Type.Literal('Corporate'),
    Type.Literal('Government')
  ])),
  relationshipStatus: Type.Optional(Type.Union([
    Type.Literal('Prospective'),
    Type.Literal('Active'),
    Type.Literal('Major'),
    Type.Literal('Lapsed')
  ])),
  interests: Type.Optional(Type.Array(Type.String())),
  notes: Type.Optional(Type.String()),
  rating: Type.Optional(Type.Number({ minimum: 1, maximum: 5 })),
})

export type CreateDonorDto = Static<typeof CreateDonorSchema>

// ============================================================================
// DOCUMENT VALIDATION SCHEMAS
// ============================================================================

export const CreateDocumentSchema = Type.Object({
  entityType: Type.Optional(Type.String({ maxLength: 50 })),
  entityId: Type.Optional(Type.Number()),
  fileName: Type.String({ minLength: 1, maxLength: 255 }),
  fileType: Type.Optional(Type.String({ maxLength: 50 })),
  fileSize: Type.Optional(Type.Number()),
  fileUrl: Type.String({ format: 'uri' }),
  category: Type.Optional(Type.String({ maxLength: 100 })),
  description: Type.Optional(Type.String()),
  tags: Type.Optional(Type.Array(Type.String())),
})

export type CreateDocumentDto = Static<typeof CreateDocumentSchema>

// ============================================================================
// PAGINATION SCHEMAS
// ============================================================================

export const PaginationSchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1 })),
  limit: Type.Optional(Type.Number({ minimum: 1, maximum: 100 })),
})

export type PaginationParams = Static<typeof PaginationSchema>

// ============================================================================
// VALIDATION HELPER FUNCTIONS
// ============================================================================

/**
 * Validate data against a TypeBox schema
 * @param schema TypeBox schema
 * @param data Data to validate
 * @returns Validation result with typed data or errors
 */
export function validate<T>(schema: any, data: unknown): {
  success: boolean
  data?: T
  errors?: Array<{ path: string; message: string }>
} {
  const errors = [...Value.Errors(schema, data)]
  
  if (errors.length > 0) {
    return {
      success: false,
      errors: errors.map(error => ({
        path: error.path,
        message: error.message,
      })),
    }
  }
  
  return {
    success: true,
    data: data as T,
  }
}

/**
 * Sanitize string input
 * - Trim whitespace
 * - Remove null bytes
 * - Normalize unicode
 */
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/\0/g, '') // Remove null bytes
    .normalize('NFC') // Normalize unicode
}

/**
 * Sanitize object with string fields
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj }

  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      (sanitized as any)[key] = sanitizeString(sanitized[key] as string)
    }
  }

  return sanitized
}