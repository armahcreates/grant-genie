import { pgTable, text, serial, timestamp, integer, boolean, jsonb, decimal } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Users table (extends Stack Auth)
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  organizationName: text('organization_name'),
  role: text('role'), // 'admin', 'grant_writer', 'fundraiser', etc.
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Grant Applications
export const grantApplications = pgTable('grant_applications', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  grantTitle: text('grant_title').notNull(),
  organization: text('organization').notNull(),
  funderName: text('funder_name').notNull(),
  focusArea: text('focus_area'),
  amount: decimal('amount', { precision: 12, scale: 2 }),
  deadline: timestamp('deadline'),
  status: text('status').notNull().default('Draft'), // 'Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected'
  rfpText: text('rfp_text'),
  teachingMaterials: text('teaching_materials'),
  projectName: text('project_name'),
  proposalContent: text('proposal_content'),
  submittedAt: timestamp('submitted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Compliance Tracker
export const complianceItems = pgTable('compliance_items', {
  id: serial('id').primaryKey(),
  grantId: integer('grant_id').references(() => grantApplications.id),
  userId: text('user_id').notNull().references(() => users.id),
  grantName: text('grant_name').notNull(),
  requirement: text('requirement').notNull(),
  description: text('description'),
  dueDate: timestamp('due_date').notNull(),
  priority: text('priority').notNull().default('Medium'), // 'Low', 'Medium', 'High'
  status: text('status').notNull().default('Upcoming'), // 'Completed', 'Upcoming', 'Overdue'
  completedAt: timestamp('completed_at'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Donor Profiles
export const donors = pgTable('donors', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  donorType: text('donor_type'), // 'Individual', 'Foundation', 'Corporate', etc.
  totalContributions: decimal('total_contributions', { precision: 12, scale: 2 }),
  relationshipStatus: text('relationship_status'), // 'Prospective', 'Active', 'Lapsed'
  notes: text('notes'),
  lastContactDate: timestamp('last_contact_date'),
  nextFollowUpDate: timestamp('next_follow_up_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Donor Meeting Practice Sessions
export const donorMeetingSessions = pgTable('donor_meeting_sessions', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  donorId: integer('donor_id').references(() => donors.id),
  donorProfile: text('donor_profile'),
  donorType: text('donor_type'),
  warmthFactor: text('warmth_factor'),
  practiceFormat: text('practice_format'),
  conversationHistory: jsonb('conversation_history'),
  coachingTips: jsonb('coaching_tips'),
  score: integer('score'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Knowledge Base / Teachings (for Grant Genie)
export const knowledgeBase = pgTable('knowledge_base', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  content: text('content').notNull(),
  category: text('category'), // 'writing_style', 'organization_info', 'past_proposals', etc.
  tags: jsonb('tags'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Activity Log
export const activityLog = pgTable('activity_log', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  action: text('action').notNull(),
  entityType: text('entity_type'), // 'grant', 'donor', 'compliance', etc.
  entityId: integer('entity_id'),
  details: text('details'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Grant Search History
export const grantSearchHistory = pgTable('grant_search_history', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  searchQuery: text('search_query').notNull(),
  filters: jsonb('filters'),
  results: jsonb('results'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  grantApplications: many(grantApplications),
  complianceItems: many(complianceItems),
  donors: many(donors),
  donorMeetingSessions: many(donorMeetingSessions),
  knowledgeBase: many(knowledgeBase),
  activityLog: many(activityLog),
  grantSearchHistory: many(grantSearchHistory),
}))

export const grantApplicationsRelations = relations(grantApplications, ({ one, many }) => ({
  user: one(users, {
    fields: [grantApplications.userId],
    references: [users.id],
  }),
  complianceItems: many(complianceItems),
}))

export const complianceItemsRelations = relations(complianceItems, ({ one }) => ({
  user: one(users, {
    fields: [complianceItems.userId],
    references: [users.id],
  }),
  grant: one(grantApplications, {
    fields: [complianceItems.grantId],
    references: [grantApplications.id],
  }),
}))

export const donorsRelations = relations(donors, ({ one, many }) => ({
  user: one(users, {
    fields: [donors.userId],
    references: [users.id],
  }),
  meetingSessions: many(donorMeetingSessions),
}))

export const donorMeetingSessionsRelations = relations(donorMeetingSessions, ({ one }) => ({
  user: one(users, {
    fields: [donorMeetingSessions.userId],
    references: [users.id],
  }),
  donor: one(donors, {
    fields: [donorMeetingSessions.donorId],
    references: [donors.id],
  }),
}))

export const knowledgeBaseRelations = relations(knowledgeBase, ({ one }) => ({
  user: one(users, {
    fields: [knowledgeBase.userId],
    references: [users.id],
  }),
}))

export const activityLogRelations = relations(activityLog, ({ one }) => ({
  user: one(users, {
    fields: [activityLog.userId],
    references: [users.id],
  }),
}))

export const grantSearchHistoryRelations = relations(grantSearchHistory, ({ one }) => ({
  user: one(users, {
    fields: [grantSearchHistory.userId],
    references: [users.id],
  }),
}))
