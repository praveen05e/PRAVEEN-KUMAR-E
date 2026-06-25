const postgres = require('postgres');

async function checkUsers() {
  const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
  try {
    const users = await sql`SELECT id, email, name, role FROM "user"`;
    console.log("USERS IN DATABASE:", users);
  } catch (err) {
    console.error("ERROR:", err);
  } finally {
    process.exit(0);
  }
}
checkUsers();
