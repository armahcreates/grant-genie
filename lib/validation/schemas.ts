import { Type, Static } from '@sinclair/typebox'

// Grant Application Schemas
export const GrantApplicationSchema = Type.Object({
  grantTitle: Type.String({ minLength: 1, maxLength: 500 }),
  organization: Type.String({ minLength: 1, maxLength: 300 }),
  funderName: Type.String({ minLength: 1, maxLength: 300 }),
  focusArea: Type.Optional(Type.String({ maxLength: 200 })),
  amount: Type.Optional(Type.String()),
  deadline: Type.Optional(Type.String({ format: 'date-time' })),
  status: Type.Union([
    Type.Literal('Draft'),
    Type.Literal('Submitted'),
    Type.Literal('Under Review'),
    Type.Literal('Approved'),
    Type.Literal('Rejected'),
  ]),
  rfpText: Type.Optional(Type.String()),
  teachingMaterials: Type.Optional(Type.String()),
  projectName: Type.Optional(Type.String({ maxLength: 300 })),
})

export const CreateGrantApplicationSchema = Type.Pick(GrantApplicationSchema, [
  'grantTitle',
  'organization',
  'funderName',
  'focusArea',
  'amount',
  'deadline',
  'rfpText',
  'teachingMaterials',
  'projectName',
])

export const UpdateGrantApplicationSchema = Type.Partial(GrantApplicationSchema)

export type GrantApplication = Static<typeof GrantApplicationSchema>
export type CreateGrantApplication = Static<typeof CreateGrantApplicationSchema>
export type UpdateGrantApplication = Static<typeof UpdateGrantApplicationSchema>

// Compliance Item Schemas
export const ComplianceItemSchema = Type.Object({
  grantId: Type.Optional(Type.Number()),
  grantName: Type.String({ minLength: 1, maxLength: 300 }),
  requirement: Type.String({ minLength: 1, maxLength: 500 }),
  description: Type.Optional(Type.String()),
  dueDate: Type.String({ format: 'date-time' }),
  priority: Type.Union([
    Type.Literal('Low'),
    Type.Literal('Medium'),
    Type.Literal('High'),
  ]),
  status: Type.Union([
    Type.Literal('Completed'),
    Type.Literal('Upcoming'),
    Type.Literal('Overdue'),
  ]),
  notes: Type.Optional(Type.String()),
})

export const CreateComplianceItemSchema = Type.Pick(ComplianceItemSchema, [
  'grantId',
  'grantName',
  'requirement',
  'description',
  'dueDate',
  'priority',
])

export const UpdateComplianceItemSchema = Type.Partial(ComplianceItemSchema)

export type ComplianceItem = Static<typeof ComplianceItemSchema>
export type CreateComplianceItem = Static<typeof CreateComplianceItemSchema>
export type UpdateComplianceItem = Static<typeof UpdateComplianceItemSchema>

// Donor Schemas
export const DonorSchema = Type.Object({
  name: Type.String({ minLength: 1, maxLength: 200 }),
  email: Type.Optional(Type.String({ format: 'email' })),
  phone: Type.Optional(Type.String({ maxLength: 20 })),
  donorType: Type.Optional(Type.Union([
    Type.Literal('Individual'),
    Type.Literal('Foundation'),
    Type.Literal('Corporate'),
    Type.Literal('Government'),
  ])),
  totalContributions: Type.Optional(Type.String()),
  relationshipStatus: Type.Optional(Type.Union([
    Type.Literal('Prospective'),
    Type.Literal('Active'),
    Type.Literal('Lapsed'),
  ])),
  notes: Type.Optional(Type.String()),
  lastContactDate: Type.Optional(Type.String({ format: 'date-time' })),
  nextFollowUpDate: Type.Optional(Type.String({ format: 'date-time' })),
})

export const CreateDonorSchema = Type.Pick(DonorSchema, [
  'name',
  'email',
  'phone',
  'donorType',
  'notes',
])

export const UpdateDonorSchema = Type.Partial(DonorSchema)

export type Donor = Static<typeof DonorSchema>
export type CreateDonor = Static<typeof CreateDonorSchema>
export type UpdateDonor = Static<typeof UpdateDonorSchema>

// Donor Meeting Session Schemas
export const DonorMeetingSessionSchema = Type.Object({
  donorId: Type.Optional(Type.Number()),
  donorProfile: Type.String({ minLength: 1 }),
  donorType: Type.String({ minLength: 1 }),
  warmthFactor: Type.String({ minLength: 1 }),
  practiceFormat: Type.String({ minLength: 1 }),
  conversationHistory: Type.Optional(Type.Array(Type.Object({
    role: Type.String(),
    content: Type.String(),
  }))),
  coachingTips: Type.Optional(Type.Array(Type.String())),
  score: Type.Optional(Type.Number({ minimum: 0, maximum: 100 })),
})

export const CreateDonorMeetingSessionSchema = Type.Pick(DonorMeetingSessionSchema, [
  'donorId',
  'donorProfile',
  'donorType',
  'warmthFactor',
  'practiceFormat',
])

export type DonorMeetingSession = Static<typeof DonorMeetingSessionSchema>
export type CreateDonorMeetingSession = Static<typeof CreateDonorMeetingSessionSchema>

// Knowledge Base Schemas
export const KnowledgeBaseSchema = Type.Object({
  title: Type.String({ minLength: 1, maxLength: 300 }),
  content: Type.String({ minLength: 1 }),
  category: Type.Optional(Type.Union([
    Type.Literal('writing_style'),
    Type.Literal('organization_info'),
    Type.Literal('past_proposals'),
    Type.Literal('donor_info'),
    Type.Literal('other'),
  ])),
  tags: Type.Optional(Type.Array(Type.String())),
})

export const CreateKnowledgeBaseSchema = Type.Pick(KnowledgeBaseSchema, [
  'title',
  'content',
  'category',
  'tags',
])

export type KnowledgeBase = Static<typeof KnowledgeBaseSchema>
export type CreateKnowledgeBase = Static<typeof CreateKnowledgeBaseSchema>

// Activity Log Schema
export const ActivityLogSchema = Type.Object({
  action: Type.String({ minLength: 1, maxLength: 500 }),
  entityType: Type.Optional(Type.String({ maxLength: 50 })),
  entityId: Type.Optional(Type.Number()),
  details: Type.Optional(Type.String()),
})

export type ActivityLog = Static<typeof ActivityLogSchema>

// Grant Search Schema
export const GrantSearchSchema = Type.Object({
  searchQuery: Type.String({ minLength: 1 }),
  filters: Type.Optional(Type.Object({
    focusArea: Type.Optional(Type.String()),
    minAmount: Type.Optional(Type.Number()),
    maxAmount: Type.Optional(Type.Number()),
    deadline: Type.Optional(Type.String()),
  })),
})

export type GrantSearch = Static<typeof GrantSearchSchema>
