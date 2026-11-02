import { createClient } from '@libsql/client'

const db = createClient({ url: 'file:data/fresh.db' })

async function run() {
  const prods = await db.execute("SELECT count(*) as count FROM products")
  console.log('Total products:', prods.rows[0].count)
  const realMedia = await db.execute("SELECT count(*) as count FROM media WHERE filename LIKE 'real_%'")
  console.log('Real media count:', realMedia.rows[0].count)
  const sample = await db.execute("SELECT p.id, p.code, p.category, pl.name, m.filename, m.url FROM products p JOIN products_rels pr ON pr.parent_id = p.id AND pr.path = 'images' JOIN media m ON m.id = pr.media_id JOIN products_locales pl ON pl._parent_id = p.id AND pl._locale = 'en' LIMIT 20")
  console.log('Sample linked products:', sample.rows)
}

run()

