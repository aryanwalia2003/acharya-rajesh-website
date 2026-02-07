import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load env vars from the root .env
dotenv.config({ path: path.join(__dirname, '../.env') });

async function runMigrations() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('🚀 Starting Migrations...');

    // 1. Create tracking table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Read migration files
    const migrationsDir = path.join(__dirname, '../migrations');
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

    // 3. Get already executed migrations
    const { rows } = await client.query('SELECT name FROM _migrations');
    const executed = new Set(rows.map((r: any) => r.name));

    // 4. Run new migrations in a transaction
    for (const file of files) {
      if (!executed.has(file)) {
        console.log(`  ⌛ Running: ${file}...`);
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');

        await client.query('BEGIN');
        try {
          await client.query(sql);
          await client.query('INSERT INTO _migrations (name) VALUES ($1)', [file]);
          await client.query('COMMIT');
          console.log(`  ✅ Success: ${file}`);
        } catch (err) {
          await client.query('ROLLBACK');
          console.error(`  ❌ Failed: ${file}`);
          throw err;
        }
      } else {
        console.log(`  ⏭️  Skipping: ${file} (already executed)`);
      }
    }

    console.log('✨ All migrations are up to date.');
  } catch (error) {
    console.error('Migration Runner Error:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();