import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

const settings = pgTable('settings', {
  id: text('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

const url = "postgresql://postgres.opgudmroltzpjxfjcbos:aKdsN65cTuz56DyH@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres"
const client = postgres(url, { prepare: false, ssl: 'require', max_buffer: 50 * 1024 * 1024 })
const db = drizzle(client)

async function run() {
  try {
    console.log('Testing Drizzle ORM large setting insert (2MB base64 string)...')
    const largeValue = 'data:application/pdf;base64,' + 'B'.repeat(2 * 1024 * 1024)
    await db.insert(settings).values({
      id: `set_${Date.now()}_drizzle`,
      key: 'test_drizzle_large',
      value: largeValue,
      updatedAt: new Date()
    })
    console.log('Drizzle large insert succeeded!')
  } catch (err) {
    console.error('Drizzle insert failed with error:', err.message, err.code, err.cause)
  } finally {
    await client.end()
  }
}

run()
