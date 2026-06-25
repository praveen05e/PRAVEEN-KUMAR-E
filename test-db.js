
const postgres = require('postgres');

async function test() {
  console.log("Connecting to:", process.env.DATABASE_URL.replace(/:[^:@]{1,}@/, ':***@'));
  try {
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    const result = await sql`SELECT 1 as connected`;
    console.log("SUCCESS!", result);
    process.exit(0);
  } catch (error) {
    console.error("CONNECTION ERROR:", error);
    process.exit(1);
  }
}

test();
