-- Migration: Add Performance Indexes
-- Date: 2025-10-27
-- Description: Add indexes to improve query performance on frequently accessed columns

-- Grant Applications indexes
CREATE INDEX IF NOT EXISTS grant_applications_user_id_idx ON grant_applications(user_id);
CREATE INDEX IF NOT EXISTS grant_applications_status_idx ON grant_applications(status);
CREATE INDEX IF NOT EXISTS grant_applications_deadline_idx ON grant_applications(deadline);
CREATE INDEX IF NOT EXISTS grant_applications_created_at_idx ON grant_applications(created_at);
CREATE INDEX IF NOT EXISTS grant_applications_user_status_idx ON grant_applications(user_id, status);

-- Compliance Items indexes
CREATE INDEX IF NOT EXISTS compliance_items_user_id_idx ON compliance_items(user_id);
CREATE INDEX IF NOT EXISTS compliance_items_status_idx ON compliance_items(status);
CREATE INDEX IF NOT EXISTS compliance_items_due_date_idx ON compliance_items(due_date);
CREATE INDEX IF NOT EXISTS compliance_items_user_status_idx ON compliance_items(user_id, status);
CREATE INDEX IF NOT EXISTS compliance_items_grant_id_idx ON compliance_items(grant_id);

-- Donors indexes
CREATE INDEX IF NOT EXISTS donors_user_id_idx ON donors(user_id);
CREATE INDEX IF NOT EXISTS donors_relationship_status_idx ON donors(relationship_status);
CREATE INDEX IF NOT EXISTS donors_email_idx ON donors(email);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_read_idx ON notifications(read);
CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON notifications(created_at);
CREATE INDEX IF NOT EXISTS notifications_user_read_idx ON notifications(user_id, read);

-- Grant Opportunities indexes
CREATE INDEX IF NOT EXISTS grant_opportunities_category_idx ON grant_opportunities(category);
CREATE INDEX IF NOT EXISTS grant_opportunities_status_idx ON grant_opportunities(status);
CREATE INDEX IF NOT EXISTS grant_opportunities_deadline_idx ON grant_opportunities(deadline);
CREATE INDEX IF NOT EXISTS grant_opportunities_created_at_idx ON grant_opportunities(created_at);

-- Documents indexes
CREATE INDEX IF NOT EXISTS documents_user_id_idx ON documents(user_id);
CREATE INDEX IF NOT EXISTS documents_entity_type_idx ON documents(entity_type);
CREATE INDEX IF NOT EXISTS documents_entity_id_idx ON documents(entity_id);
CREATE INDEX IF NOT EXISTS documents_entity_type_id_idx ON documents(entity_type, entity_id);

-- Activity Log indexes
CREATE INDEX IF NOT EXISTS activity_log_user_id_idx ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS activity_log_created_at_idx ON activity_log(created_at);
CREATE INDEX IF NOT EXISTS activity_log_entity_type_idx ON activity_log(entity_type);
CREATE INDEX IF NOT EXISTS activity_log_user_created_idx ON activity_log(user_id, created_at);

-- Grant Bookmarks indexes
CREATE INDEX IF NOT EXISTS grant_bookmarks_user_id_idx ON grant_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS grant_bookmarks_grant_opp_id_idx ON grant_bookmarks(grant_opportunity_id);

-- Saved Searches indexes
CREATE INDEX IF NOT EXISTS saved_searches_user_id_idx ON saved_searches(user_id);

-- Team Members indexes
CREATE INDEX IF NOT EXISTS team_members_user_id_idx ON team_members(user_id);
CREATE INDEX IF NOT EXISTS team_members_member_user_id_idx ON team_members(member_user_id);

-- Budget Items indexes
CREATE INDEX IF NOT EXISTS budget_items_grant_budget_id_idx ON budget_items(grant_budget_id);

-- Grant Milestones indexes (table name is grant_milestones)
CREATE INDEX IF NOT EXISTS grant_milestones_grant_application_id_idx ON grant_milestones(grant_application_id);
CREATE INDEX IF NOT EXISTS grant_milestones_due_date_idx ON grant_milestones(due_date);
CREATE INDEX IF NOT EXISTS grant_milestones_status_idx ON grant_milestones(status);

-- Donor Interactions indexes
CREATE INDEX IF NOT EXISTS donor_interactions_donor_id_idx ON donor_interactions(donor_id);
CREATE INDEX IF NOT EXISTS donor_interactions_user_id_idx ON donor_interactions(user_id);
CREATE INDEX IF NOT EXISTS donor_interactions_interaction_date_idx ON donor_interactions(interaction_date);

-- Donor Meeting Sessions indexes
CREATE INDEX IF NOT EXISTS donor_meeting_sessions_user_id_idx ON donor_meeting_sessions(user_id);
CREATE INDEX IF NOT EXISTS donor_meeting_sessions_donor_id_idx ON donor_meeting_sessions(donor_id);
CREATE INDEX IF NOT EXISTS donor_meeting_sessions_created_at_idx ON donor_meeting_sessions(created_at);
