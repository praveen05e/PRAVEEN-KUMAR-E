import postgres from 'postgres'

const url = "postgresql://postgres.opgudmroltzpjxfjcbos:aKdsN65cTuz56DyH@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres"
const client = postgres(url, { prepare: false, ssl: 'require', max_buffer: 50 * 1024 * 1024 })

async function run() {
  try {
    console.log('Connecting to Supabase and testing small setting insert...')
    await client`insert into "settings" ("id", "key", "value", "updatedAt") values ('test_small', 'test_key', 'test_value', now()) on conflict ("key") do update set "value" = 'test_value'`
    console.log('Small insert succeeded!')

    console.log('Testing large setting insert (2MB base64 string)...')
    const largeValue = 'data:application/pdf;base64,' + 'A'.repeat(2 * 1024 * 1024)
    await client`insert into "settings" ("id", "key", "value", "updatedAt") values ('test_large', 'test_large_key', ${largeValue}, now()) on conflict ("key") do update set "value" = ${largeValue}`
    console.log('Large insert succeeded!')
  } catch (err) {
    console.error('Insert failed with error:', err.message, err.code, err.cause)
  } finally {
    await client.end()
  }
}

run()
