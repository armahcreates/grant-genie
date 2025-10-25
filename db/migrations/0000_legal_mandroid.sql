CREATE TABLE "activity_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"action" text NOT NULL,
	"entity_type" text,
	"entity_id" integer,
	"details" text,
	"created_at" timestamp DEFAULT now() NOT NULL
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
	"donor_type" text,
	"total_contributions" numeric(12, 2),
	"relationship_status" text,
	"notes" text,
	"last_contact_date" timestamp,
	"next_follow_up_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grant_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
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
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grant_search_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"search_query" text NOT NULL,
	"filters" jsonb,
	"results" jsonb,
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
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
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
ALTER TABLE "compliance_items" ADD CONSTRAINT "compliance_items_grant_id_grant_applications_id_fk" FOREIGN KEY ("grant_id") REFERENCES "public"."grant_applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "compliance_items" ADD CONSTRAINT "compliance_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "donor_meeting_sessions" ADD CONSTRAINT "donor_meeting_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "donor_meeting_sessions" ADD CONSTRAINT "donor_meeting_sessions_donor_id_donors_id_fk" FOREIGN KEY ("donor_id") REFERENCES "public"."donors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "donors" ADD CONSTRAINT "donors_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grant_applications" ADD CONSTRAINT "grant_applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grant_search_history" ADD CONSTRAINT "grant_search_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "knowledge_base" ADD CONSTRAINT "knowledge_base_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;