-- Migration: Add Cascade Delete Behaviors
-- Date: 2025-01-27
-- Description: Add ON DELETE CASCADE to foreign keys for automatic cleanup

-- Compliance Items: Cascade delete when grant is deleted
ALTER TABLE compliance_items
DROP CONSTRAINT IF EXISTS compliance_items_grant_id_grant_applications_id_fk;

ALTER TABLE compliance_items
ADD CONSTRAINT compliance_items_grant_id_grant_applications_id_fk
FOREIGN KEY (grant_id) REFERENCES grant_applications(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- Grant Budgets: Cascade delete when grant is deleted
ALTER TABLE grant_budgets
DROP CONSTRAINT IF EXISTS grant_budgets_grant_application_id_grant_applications_id_fk;

ALTER TABLE grant_budgets
ADD CONSTRAINT grant_budgets_grant_application_id_grant_applications_id_fk
FOREIGN KEY (grant_application_id) REFERENCES grant_applications(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- Budget Items: Cascade delete when budget is deleted
ALTER TABLE budget_items
DROP CONSTRAINT IF EXISTS budget_items_grant_budget_id_grant_budgets_id_fk;

ALTER TABLE budget_items
ADD CONSTRAINT budget_items_grant_budget_id_grant_budgets_id_fk
FOREIGN KEY (grant_budget_id) REFERENCES grant_budgets(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- Grant Milestones: Cascade delete when grant is deleted
ALTER TABLE grant_milestones
DROP CONSTRAINT IF EXISTS grant_milestones_grant_application_id_grant_applications_id_fk;

ALTER TABLE grant_milestones
ADD CONSTRAINT grant_milestones_grant_application_id_grant_applications_id_fk
FOREIGN KEY (grant_application_id) REFERENCES grant_applications(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- Grant Reports: Cascade delete when grant is deleted
ALTER TABLE grant_reports
DROP CONSTRAINT IF EXISTS grant_reports_grant_application_id_grant_applications_id_fk;

ALTER TABLE grant_reports
ADD CONSTRAINT grant_reports_grant_application_id_grant_applications_id_fk
FOREIGN KEY (grant_application_id) REFERENCES grant_applications(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- Grant Bookmarks: Cascade delete when grant opportunity is deleted
ALTER TABLE grant_bookmarks
DROP CONSTRAINT IF EXISTS grant_bookmarks_grant_opportunity_id_grant_opportunities_id_fk;

ALTER TABLE grant_bookmarks
ADD CONSTRAINT grant_bookmarks_grant_opportunity_id_grant_opportunities_id_fk
FOREIGN KEY (grant_opportunity_id) REFERENCES grant_opportunities(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- Donor Interactions: Cascade delete when donor is deleted
ALTER TABLE donor_interactions
DROP CONSTRAINT IF EXISTS donor_interactions_donor_id_donors_id_fk;

ALTER TABLE donor_interactions
ADD CONSTRAINT donor_interactions_donor_id_donors_id_fk
FOREIGN KEY (donor_id) REFERENCES donors(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- Organization Profiles: Cascade delete when user is deleted
ALTER TABLE organization_profiles
DROP CONSTRAINT IF EXISTS organization_profiles_user_id_users_id_fk;

ALTER TABLE organization_profiles
ADD CONSTRAINT organization_profiles_user_id_users_id_fk
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- User Preferences: Cascade delete when user is deleted
ALTER TABLE user_preferences
DROP CONSTRAINT IF EXISTS user_preferences_user_id_users_id_fk;

ALTER TABLE user_preferences
ADD CONSTRAINT user_preferences_user_id_users_id_fk
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- Note: User deletion cascade is handled manually in delete-account route
-- due to Stack Auth integration, but these constraints ensure referential integrity
-- for other deletion scenarios

