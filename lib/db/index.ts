import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// For edge / serverless connection to Supabase
const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString, { prepare: false, ssl: 'require', max_buffer: 50 * 1024 * 1024 })

export const db = drizzle(client, { schema })
