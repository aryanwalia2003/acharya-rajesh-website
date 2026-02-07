// acharya-astrology-blog/scripts/migrate.ts
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars from the root .env
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("Connected to database for migration...");

    // Path to your init.sql (adjust if needed)
    const sqlPath = path.join(__dirname, '../../db-init/init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log("Running init.sql...");
    await client.query(sql);
    
    console.log("✅ Database schema applied successfully!");
  } catch (err) {
    console.error("❌ Migration failed:", err);
  } finally {
    await client.end();
  }
}

migrate();