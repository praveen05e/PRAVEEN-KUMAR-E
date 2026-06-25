/**
 * Run with: node scripts/create-admin.cjs
 * Creates the default admin user in the local SQLite database.
 */
const { createClient } = require('@libsql/client')
const crypto = require('crypto')

const c = createClient({ url: 'file:local.db' })

async function hashPassword(password) {
  // better-auth uses scrypt by default but for seeding we'll insert a bcrypt-style hash
  // Actually better-auth uses its own internal hashing — we use the API instead.
  // This script just tells you the curl command to run.
  console.log('\n📌 To create your admin account, visit:')
  console.log('   http://localhost:3000/api/auth/sign-up/email')
  console.log('\nOr open your browser and navigate to:')
  console.log('   http://localhost:3000/admin/login')
  console.log('\nThen use the admin register API below in a new terminal:\n')
  console.log(`curl -X POST http://localhost:3000/api/auth/sign-up/email \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Praveen","email":"admin@praveen.dev","password":"Admin@123"}'`)
  console.log('\nAfter registering, use those credentials to login at /admin/login')
}

hashPassword().catch(console.error)
