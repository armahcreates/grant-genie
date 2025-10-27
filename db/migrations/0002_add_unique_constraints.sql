-- Migration: Add Unique Constraints
-- Date: 2025-10-27
-- Description: Add unique constraints to prevent duplicate data

-- Grant Bookmarks: User cannot bookmark the same grant opportunity twice
ALTER TABLE grant_bookmarks
ADD CONSTRAINT grant_bookmarks_user_grant_unique
UNIQUE (user_id, grant_opportunity_id);

-- Saved Searches: User cannot have two saved searches with the same name
ALTER TABLE saved_searches
ADD CONSTRAINT saved_searches_user_name_unique
UNIQUE (user_id, name);

-- Team Members: User cannot add the same member twice
ALTER TABLE team_members
ADD CONSTRAINT team_members_user_member_unique
UNIQUE (user_id, member_user_id);

-- User Preferences: User can only have one preference record
ALTER TABLE user_preferences
ADD CONSTRAINT user_preferences_user_unique
UNIQUE (user_id);
