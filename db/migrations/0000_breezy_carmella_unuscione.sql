CREATE TABLE "activity_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"action" text NOT NULL,
	"entity_type" text,
	"entity_id" integer,
	"details" text,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "budget_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"grant_budget_id" integer NOT NULL,
	"category" text NOT NULL,
	"description" text NOT NULL,
	"quantity" integer,
	"unit_cost" numeric(12, 2),
	"total_cost" numeric(12, 2) NOT NULL,
	"justification" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "compliance_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"grant_id" integer,
	"user_id" text NOT NULL,
	"grant_name" text NOT NULL,
	"requirement" text NOT NULL,
	"description" text,
	"due_date" timestamp NOT NULL,
	"priority" text DEFAULT 'Medium' NOT NULL,
	"status" text DEFAULT 'Upcoming' NOT NULL,
	"completed_at" timestamp,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"entity_type" text,
	"entity_id" integer,
	"file_name" text NOT NULL,
	"file_type" text,
	"file_size" integer,
	"file_url" text NOT NULL,
	"category" text,
	"description" text,
	"tags" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "donor_interactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"donor_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"interaction_type" text NOT NULL,
	"subject" text,
	"notes" text,
	"outcome" text,
	"next_steps" text,
	"interaction_date" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "donor_meeting_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"donor_id" integer,
	"donor_profile" text,
	"donor_type" text,
	"warmth_factor" text,
	"practice_format" text,
	"conversation_history" jsonb,
	"coaching_tips" jsonb,
	"score" integer,
	"feedback" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "donors" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text,
	"organization" text,
	"title" text,
	"address" text,
	"city" text,
	"state" text,
	"zip_code" text,
	"donor_type" text,
	"total_contributions" numeric(12, 2),
	"relationship_status" text,
	"interests" jsonb,
	"notes" text,
	"last_contact_date" timestamp,
	"next_follow_up_date" timestamp,
	"rating" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "email_templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"name" text NOT NULL,
	"subject" text NOT NULL,
	"body" text NOT NULL,
	"purpose" text,
	"variables" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grant_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"grant_opportunity_id" integer,
	"grant_title" text NOT NULL,
	"organization" text NOT NULL,
	"funder_name" text NOT NULL,
	"focus_area" text,
	"amount" numeric(12, 2),
	"deadline" timestamp,
	"status" text DEFAULT 'Draft' NOT NULL,
	"rfp_text" text,
	"teaching_materials" text,
	"project_name" text,
	"proposal_content" text,
	"submitted_at" timestamp,
	"approved_at" timestamp,
	"rejected_at" timestamp,
	"rejection_reason" text,
	"award_amount" numeric(12, 2),
	"project_start_date" timestamp,
	"project_end_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grant_bookmarks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"grant_opportunity_id" integer NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grant_budgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"grant_application_id" integer NOT NULL,
	"total_budget" numeric(12, 2) NOT NULL,
	"personnel_costs" numeric(12, 2),
	"program_costs" numeric(12, 2),
	"administrative_costs" numeric(12, 2),
	"indirect_costs" numeric(12, 2),
	"other_costs" numeric(12, 2),
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grant_milestones" (
	"id" serial PRIMARY KEY NOT NULL,
	"grant_application_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"due_date" timestamp NOT NULL,
	"status" text DEFAULT 'pending',
	"completed_at" timestamp,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grant_opportunities" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"organization" text NOT NULL,
	"description" text NOT NULL,
	"amount" text,
	"min_amount" numeric(12, 2),
	"max_amount" numeric(12, 2),
	"deadline" timestamp,
	"category" text NOT NULL,
	"focus_areas" jsonb,
	"eligibility" jsonb,
	"geographic_scope" text,
	"location" text,
	"status" text DEFAULT 'Open',
	"match_score" integer,
	"source_url" text,
	"application_url" text,
	"contact_email" text,
	"contact_phone" text,
	"requirements" text,
	"guidelines" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grant_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"grant_application_id" integer NOT NULL,
	"report_type" text NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"reporting_period_start" timestamp,
	"reporting_period_end" timestamp,
	"due_date" timestamp,
	"submitted_at" timestamp,
	"status" text DEFAULT 'draft',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grant_search_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"search_query" text NOT NULL,
	"filters" jsonb,
	"results_count" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "knowledge_base" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"category" text,
	"tags" jsonb,
	"attachments" jsonb,
	"is_public" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"category" text,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"entity_type" text,
	"entity_id" integer,
	"action_url" text,
	"read" boolean DEFAULT false,
	"read_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"legal_name" text NOT NULL,
	"ein" text,
	"address" text,
	"city" text,
	"state" text,
	"zip_code" text,
	"phone" text,
	"website" text,
	"mission_statement" text,
	"year_established" integer,
	"annual_budget" numeric(12, 2),
	"staff_count" integer,
	"board_size" integer,
	"service_area" text,
	"population_served" text,
	"program_areas" jsonb,
	"logo" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_searches" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"search_query" text,
	"filters" jsonb,
	"notify_on_new_matches" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"member_user_id" text,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"permissions" jsonb,
	"status" text DEFAULT 'active',
	"invited_at" timestamp DEFAULT now() NOT NULL,
	"joined_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"name" text NOT NULL,
	"description" text,
	"template_type" text NOT NULL,
	"category" text,
	"content" text NOT NULL,
	"variables" jsonb,
	"is_public" boolean DEFAULT false,
	"is_system" boolean DEFAULT false,
	"usage_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"email_notifications" boolean DEFAULT true,
	"in_app_notifications" boolean DEFAULT true,
	"notification_digest" text DEFAULT 'daily',
	"theme" text DEFAULT 'light',
	"timezone" text DEFAULT 'America/New_York',
	"language" text DEFAULT 'en',
	"dashboard_layout" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_preferences_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"organization_name" text,
	"role" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "activity_log" ADD CONSTRAINT "activity_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget_items" ADD CONSTRAINT "budget_items_grant_budget_id_grant_budgets_id_fk" FOREIGN KEY ("grant_budget_id") REFERENCES "public"."grant_budgets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "compliance_items" ADD CONSTRAINT "compliance_items_grant_id_grant_applications_id_fk" FOREIGN KEY ("grant_id") REFERENCES "public"."grant_applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "compliance_items" ADD CONSTRAINT "compliance_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "donor_interactions" ADD CONSTRAINT "donor_interactions_donor_id_donors_id_fk" FOREIGN KEY ("donor_id") REFERENCES "public"."donors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "donor_interactions" ADD CONSTRAINT "donor_interactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "donor_meeting_sessions" ADD CONSTRAINT "donor_meeting_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "donor_meeting_sessions" ADD CONSTRAINT "donor_meeting_sessions_donor_id_donors_id_fk" FOREIGN KEY ("donor_id") REFERENCES "public"."donors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "donors" ADD CONSTRAINT "donors_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "email_templates" ADD CONSTRAINT "email_templates_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grant_applications" ADD CONSTRAINT "grant_applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grant_applications" ADD CONSTRAINT "grant_applications_grant_opportunity_id_grant_opportunities_id_fk" FOREIGN KEY ("grant_opportunity_id") REFERENCES "public"."grant_opportunities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grant_bookmarks" ADD CONSTRAINT "grant_bookmarks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grant_bookmarks" ADD CONSTRAINT "grant_bookmarks_grant_opportunity_id_grant_opportunities_id_fk" FOREIGN KEY ("grant_opportunity_id") REFERENCES "public"."grant_opportunities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grant_budgets" ADD CONSTRAINT "grant_budgets_grant_application_id_grant_applications_id_fk" FOREIGN KEY ("grant_application_id") REFERENCES "public"."grant_applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grant_milestones" ADD CONSTRAINT "grant_milestones_grant_application_id_grant_applications_id_fk" FOREIGN KEY ("grant_application_id") REFERENCES "public"."grant_applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grant_reports" ADD CONSTRAINT "grant_reports_grant_application_id_grant_applications_id_fk" FOREIGN KEY ("grant_application_id") REFERENCES "public"."grant_applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grant_search_history" ADD CONSTRAINT "grant_search_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "knowledge_base" ADD CONSTRAINT "knowledge_base_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_profiles" ADD CONSTRAINT "organization_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_searches" ADD CONSTRAINT "saved_searches_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_member_user_id_users_id_fk" FOREIGN KEY ("member_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "templates" ADD CONSTRAINT "templates_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;