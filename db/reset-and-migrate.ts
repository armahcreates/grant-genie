import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon, neonConfig } from '@neondatabase/serverless'
import { sql } from 'drizzle-orm'
import * as schema from './schema'
import { migrate } from 'drizzle-orm/neon-http/migrator'
import { config } from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') })

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  const sqlClient = neon(process.env.DATABASE_URL)
  const db = drizzle(sqlClient, { schema })

  console.log('Dropping all existing tables...')

  // Drop all tables in reverse dependency order
  const tablesToDrop = [
    'budget_items',
    'grant_budgets',
    'grant_milestones',
    'grant_reports',
    'grant_bookmarks',
    'saved_searches',
    'grant_search_history',
    'compliance_items',
    'donor_interactions',
    'donor_meeting_sessions',
    'donors',
    'grant_applications',
    'grant_opportunities',
    'documents',
    'templates',
    'email_templates',
    'knowledge_base',
    'notifications',
    'activity_log',
    'organization_profiles',
    'user_preferences',
    'team_members',
    'users',
  ]

  for (const table of tablesToDrop) {
    try {
      await db.execute(sql.raw(`DROP TABLE IF EXISTS "${table}" CASCADE`))
      console.log(`  Dropped table: ${table}`)
    } catch (error) {
      console.log(`  Skipped ${table} (may not exist)`)
    }
  }

  console.log('\nRunning migrations...')
  await migrate(db, { migrationsFolder: './db/migrations' })
  console.log('Migrations completed successfully!')

  process.exit(0)
}

main().catch((err) => {
  console.error('Migration failed!')
  console.error(err)
  process.exit(1)
})
