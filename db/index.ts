/**
 * Database Connection
 * 
 * Configured for Neon PostgreSQL with connection pooling
 * Uses Drizzle ORM for type-safe database operations
 */

import 'server-only'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon, neonConfig } from '@neondatabase/serverless'
import * as schema from './schema'
import { env } from '@/lib/env'

// Configure Neon connection caching for better performance
neonConfig.fetchConnectionCache = true

// Create Neon SQL client with connection pooling
const sql = neon(env.DATABASE_URL, {
  fetchOptions: {
    cache: 'no-store', // Prevent caching for dynamic queries
  },
})

// Initialize Drizzle ORM with schema and logging
export const db = drizzle(sql, { 
  schema,
  logger: env.NODE_ENV === 'development',
})

// Export transaction helper for convenience
export async function withTransaction<T>(
  callback: (tx: typeof db) => Promise<T>
): Promise<T> {
  return db.transaction(callback)
}
