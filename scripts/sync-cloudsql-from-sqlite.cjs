const { Pool } = require('pg');
const Database = require('better-sqlite3');
const fs = require('fs');

async function sync() {
  console.log('=== Syncing SQLite authentic data to Cloud SQL PostgreSQL ===');

  if (!process.env.SQL_HOST) {
    console.log('No SQL_HOST configured, skipping Postgres sync.');
    return;
  }

  const pool = new Pool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME,
    connectionTimeoutMillis: 10000,
  });

  const client = await pool.connect();
  const sqlite = new Database('data/fresh.db');

  try {
    await client.query('BEGIN');

    // Tables to sync
    const tables = [
      'sizes',
      'finishes',
      'finishes_locales',
      'series',
      'series_locales',
      'media',
      'products',
      'products_locales',
      'products_rels',
    ];

    for (const t of tables) {
      console.log(`Syncing ${t}...`);
      await client.query(`DELETE FROM "${t}"`);

      const rows = sqlite.prepare(`SELECT * FROM "${t}"`).all();
      if (rows.length === 0) continue;

      const cols = Object.keys(rows[0]);
      const quotedCols = cols.map(c => `"${c}"`).join(', ');
      const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');

      const insertSql = `INSERT INTO "${t}" (${quotedCols}) VALUES (${placeholders}) ON CONFLICT DO NOTHING`;

      // Batch insert in chunks of 100
      for (let i = 0; i < rows.length; i += 100) {
        const chunk = rows.slice(i, i + 100);
        for (const row of chunk) {
          const values = cols.map(c => row[c]);
          await client.query(insertSql, values);
        }
      }
      console.log(`  Inserted ${rows.length} rows into PostgreSQL ${t}.`);
    }

    await client.query('COMMIT');
    console.log('Successfully synced SQLite to PostgreSQL!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Sync failed:', err);
  } finally {
    client.release();
    sqlite.close();
    await pool.end();
  }
}

sync().catch(console.error);
