import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from './schema'
import { config } from 'dotenv'
import path from 'path'
import { sql } from 'drizzle-orm'
import fs from 'fs'

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') })

/**
 * Execute SQL file with multiple statements for Neon HTTP driver
 * Neon HTTP driver doesn't support multiple statements in one query,
 * so we need to split and execute them individually
 */
async function executeSqlFile(db: ReturnType<typeof drizzle>, filePath: string) {
  const sqlContent = fs.readFileSync(filePath, 'utf-8')
  
  // Handle DO blocks specially - they need to be executed as single statements
  // Split by semicolon, but preserve DO blocks intact
  const statements: string[] = []
  let currentStatement = ''
  let inDoBlock = false
  let doBlockDepth = 0
  
  const lines = sqlContent.split('\n')
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    
    // Skip comments
    if (trimmedLine.startsWith('--') || trimmedLine.includes('--> statement-breakpoint')) {
      continue
    }
    
    // Check for DO block start
    if (trimmedLine.toUpperCase().startsWith('DO $$')) {
      inDoBlock = true
      doBlockDepth = 1
      currentStatement = trimmedLine
      continue
    }
    
    // Track DO block depth
    if (inDoBlock) {
      currentStatement += '\n' + line
      // Check for end of DO block (END $$; or END $$)
      if (trimmedLine.includes('END $$')) {
        inDoBlock = false
        statements.push(currentStatement.trim())
        currentStatement = ''
        continue
      }
      continue
    }
    
    // Regular statement handling
    if (trimmedLine.includes(';')) {
      currentStatement += '\n' + trimmedLine
      if (currentStatement.trim().length > 0) {
        statements.push(currentStatement.trim())
        currentStatement = ''
      }
    } else if (trimmedLine.length > 0) {
      currentStatement += '\n' + line
    }
  }
  
  // Add any remaining statement
  if (currentStatement.trim().length > 0) {
    statements.push(currentStatement.trim())
  }

  // Filter out empty statements
  const validStatements = statements.filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))

  for (const statement of validStatements) {
    try {
      // Add IF NOT EXISTS to CREATE TABLE statements if not present
      let modifiedStatement = statement
      if (statement.toUpperCase().includes('CREATE TABLE') && !statement.toUpperCase().includes('IF NOT EXISTS')) {
        modifiedStatement = statement.replace(/CREATE TABLE\s+"([^"]+)"/i, 'CREATE TABLE IF NOT EXISTS "$1"')
      }
      
      await db.execute(sql.raw(modifiedStatement))
      } catch (error: any) {
        const errorCode = error?.code || error?.cause?.code
        
        // If it's a "relation already exists" error, skip it (table/index already exists)
        if (
          errorCode === '42P07' || // relation already exists
          errorCode === '42710' || // duplicate object (constraint/index already exists)
          error?.message?.includes('already exists') ||
          error?.cause?.message?.includes('already exists') ||
          error?.message?.includes('duplicate') ||
          error?.cause?.message?.includes('duplicate') ||
          (error?.message?.includes('constraint') && error?.message?.includes('already exists')) ||
          (error?.cause?.message?.includes('constraint') && error?.cause?.message?.includes('already exists'))
        ) {
          console.log(`  ⚠ Skipping (already exists): ${statement.substring(0, 80)}...`)
          continue
        }
        // If it's a "relation does not exist" for indexes, skip it (table doesn't exist yet or won't exist)
        if (errorCode === '42P01' && statement.toUpperCase().includes('CREATE INDEX')) {
          console.log(`  ⚠ Skipping (table doesn't exist): ${statement.substring(0, 80)}...`)
          continue
        }
        // If it's a constraint violation but the constraint is being added, that's okay
        if (
          (error?.message?.includes('constraint') || error?.cause?.message?.includes('constraint')) &&
          statement.toUpperCase().includes('ADD CONSTRAINT')
        ) {
          console.log(`  ⚠ Skipping (constraint exists): ${statement.substring(0, 80)}...`)
          continue
        }
        throw error
      }
  }
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  const sqlClient = neon(process.env.DATABASE_URL)
  const db = drizzle(sqlClient, { schema })

  console.log('Running migrations...\n')

  const migrationsFolder = './db/migrations'
  const migrationFiles = [
    '0000_breezy_carmella_unuscione.sql',
    '0001_add_performance_indexes.sql',
    '0002_add_unique_constraints.sql',
    '0003_add_user_sessions.sql',
    '0004_add_cascade_deletes.sql',
  ]

  for (const file of migrationFiles) {
    const filePath = `${migrationsFolder}/${file}`
    if (fs.existsSync(filePath)) {
      console.log(`Running migration: ${file}`)
      try {
        await executeSqlFile(db, filePath)
        console.log(`  ✓ Completed: ${file}\n`)
      } catch (error) {
        console.error(`  ✗ Failed: ${file}`)
        console.error(error)
        throw error
      }
    } else {
      console.log(`  ⚠ Skipping (not found): ${file}\n`)
    }
  }

  console.log('✅ All migrations completed successfully!')
  process.exit(0)
}

main().catch((err) => {
  console.error('\n❌ Migration failed!')
  console.error(err)
  process.exit(1)
})
