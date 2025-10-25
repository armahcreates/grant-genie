import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { migrate } from 'drizzle-orm/neon-http/migrator'
import * as schema from './schema'
import { config } from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') })

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  const sql = neon(process.env.DATABASE_URL)
  const db = drizzle(sql, { schema })

  console.log('Running migrations...')

  await migrate(db, { migrationsFolder: './db/migrations' })

  console.log('Migrations completed!')

  process.exit(0)
}

main().catch((err) => {
  console.error('Migration failed!')
  console.error(err)
  process.exit(1)
})
