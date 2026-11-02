const { Pool } = require('pg');
const fs = require('fs');

async function main() {
  if (!process.env.SQL_HOST) {
    console.log('No SQL_HOST configured.');
    return;
  }

  console.log('--- Fast Multi-Row Pusher to Cloud SQL PostgreSQL ---');
  const pool = new Pool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME,
    connectionTimeoutMillis: 15000,
  });

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    console.log('Clearing catalog tables cleanly...');
    await client.query('DELETE FROM products_rels');
    await client.query('DELETE FROM products_locales');
    await client.query('DELETE FROM products');
    await client.query("DELETE FROM media WHERE mime_type LIKE 'image/%'");
    await client.query('DELETE FROM finishes_locales');
    await client.query('DELETE FROM finishes');
    await client.query('DELETE FROM series_locales');
    await client.query('DELETE FROM series');
    await client.query('DELETE FROM sizes');
    await client.query('DELETE FROM spaces_locales');
    await client.query('DELETE FROM spaces');

    const tables = [
      'sizes',
      'finishes',
      'finishes_locales',
      'series',
      'series_locales',
      'spaces',
      'spaces_locales',
      'media',
      'products',
      'products_locales',
      'products_rels',
    ];

    for (const t of tables) {
      const rows = JSON.parse(fs.readFileSync(`data/dumps/${t}.json`, 'utf8'));
      if (rows.length === 0) continue;

      const cols = Object.keys(rows[0]);
      const quotedCols = cols.map(c => `"${c}"`).join(', ');

      const CHUNK_SIZE = 100;
      for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
        const chunk = rows.slice(i, i + CHUNK_SIZE);
        const valuePlaceholders = [];
        const flatValues = [];

        chunk.forEach((row, rIdx) => {
          const rowPlaceholders = [];
          cols.forEach((col, cIdx) => {
            flatValues.push(row[col]);
            rowPlaceholders.push(`$${rIdx * cols.length + cIdx + 1}`);
          });
          valuePlaceholders.push(`(${rowPlaceholders.join(', ')})`);
        });

        const query = `INSERT INTO "${t}" (${quotedCols}) VALUES ${valuePlaceholders.join(', ')} ON CONFLICT DO NOTHING`;
        await client.query(query, flatValues);
      }
      console.log(`Pushed ${rows.length} rows to ${t}`);
    }

    await client.query('COMMIT');
    console.log('Successfully updated Cloud SQL PostgreSQL in seconds!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error during push:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
