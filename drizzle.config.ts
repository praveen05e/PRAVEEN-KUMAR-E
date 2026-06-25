import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!.includes('sslmode') ? process.env.DATABASE_URL! : `${process.env.DATABASE_URL}?sslmode=require`,
  },
})
