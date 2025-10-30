-- Add user sessions table for tracking login sessions
CREATE TABLE IF NOT EXISTS "user_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"session_token" text NOT NULL,
	"device" text,
	"browser" text,
	"os" text,
	"location" text,
	"ip_address" text,
	"user_agent" text,
	"is_current" boolean DEFAULT false,
	"last_active" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_sessions_session_token_unique" UNIQUE("session_token")
);

-- Add foreign key constraint (only if table exists and constraint doesn't)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_sessions') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'user_sessions_user_id_users_id_fk'
    ) THEN
      ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_users_id_fk"
      FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    END IF;
  END IF;
END $$;

-- Add indexes (only if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_sessions') THEN
    CREATE INDEX IF NOT EXISTS "user_sessions_user_id_idx" ON "user_sessions" ("user_id");
    CREATE INDEX IF NOT EXISTS "user_sessions_session_token_idx" ON "user_sessions" ("session_token");
    CREATE INDEX IF NOT EXISTS "user_sessions_last_active_idx" ON "user_sessions" ("last_active");
  END IF;
END $$;
