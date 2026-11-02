const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
});

async function main() {
  const client = await pool.connect();
  try {
    console.log('--- Starting Fast Seeder for Cloud SQL PostgreSQL ---');

    // 1. Fetch finishes map
    const finRes = await client.query('SELECT id, slug FROM finishes');
    const finishesMap = {};
    finRes.rows.forEach(r => { finishesMap[r.slug] = r.id; });

    // 2. Fetch sizes map
    const sizRes = await client.query('SELECT id, slug FROM sizes');
    const sizesMap = {};
    sizRes.rows.forEach(r => { sizesMap[r.slug] = r.id; });

    // 3. Fetch series map
    const serRes = await client.query('SELECT id, slug FROM series');
    const seriesMap = {};
    serRes.rows.forEach(r => { seriesMap[r.slug] = r.id; });

    // 4. Products
    console.log('Seeding remaining Products...');
    const existingCodesRes = await client.query('SELECT code FROM products');
    const existingCodes = new Set(existingCodesRes.rows.map(r => r.code));

    const productsData = JSON.parse(fs.readFileSync('content-export/products.json', 'utf8'));
    let productsAdded = 0;

    for (const p of productsData) {
      if (existingCodes.has(p.code)) continue;

      const finishId = p.finish?.slug ? finishesMap[p.finish.slug] || null : null;
      const sizeId = p.size?.slug ? sizesMap[p.size.slug] || null : null;
      const seriesId = p.series?.slug ? seriesMap[p.series.slug] || null : null;
      const cat = p.category === 'wall' ? 'wall' : 'floor';
      const wallFloor = p.wallOrFloor === 'wall' ? 'wall' : 'floor';

      const insertProd = await client.query(
        `INSERT INTO products (
          code, slug, category, wall_or_floor, finish_id, size_id, series_id,
          status, zoomable, slim, heatproof, grout_width_mm, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
        RETURNING id`,
        [
          p.code,
          p.slug || p.code.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          cat,
          wallFloor,
          finishId,
          sizeId,
          seriesId,
          'published',
          true,
          !!p.slim,
          !!p.heatproof,
          '2'
        ]
      );

      const newProdId = insertProd.rows[0].id;

      // Locales: en
      await client.query(
        `INSERT INTO products_locales (name, _locale, _parent_id)
         VALUES ($1, $2, $3)`,
        [p.name, 'en', newProdId]
      );

      existingCodes.add(p.code);
      productsAdded++;
    }
    console.log(`Added ${productsAdded} products. Total products now in DB: ${existingCodes.size}`);

    // 5. Showrooms
    console.log('Seeding Showrooms...');
    const existingShowroomsRes = await client.query('SELECT id FROM showrooms LIMIT 1');
    if (existingShowroomsRes.rows.length === 0 && fs.existsSync('content-export/showrooms.json')) {
      const showroomsData = JSON.parse(fs.readFileSync('content-export/showrooms.json', 'utf8'));
      let showroomsAdded = 0;
      for (const s of showroomsData) {
        const tier = (s.tier === 'elite' || s.tier === 'experience' || s.tier === 'flagship') ? s.tier : 'flagship';
        const ins = await client.query(
          `INSERT INTO showrooms (
            tier, division, district, thana, phone, hours, latitude, longitude,
            map_link, opened_date, placeholder, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
          RETURNING id`,
          [
            tier,
            s.division || 'Dhaka',
            s.district || '',
            s.thana || '',
            s.phone || '',
            s.hours || 'Sat - Thu: 9:00 AM - 8:00 PM',
            s.latitude || 23.8103,
            s.longitude || 90.4125,
            s.mapLink || '',
            s.openedDate || '',
            false
          ]
        );

        const showroomId = ins.rows[0].id;
        await client.query(
          `INSERT INTO showrooms_locales (name, address, _locale, _parent_id)
           VALUES ($1, $2, $3, $4)`,
          [s.name, s.address || '', 'en', showroomId]
        );
        showroomsAdded++;
      }
      console.log(`Added ${showroomsAdded} showrooms.`);
    } else {
      console.log('Showrooms already exist or content not found.');
    }

    // 6. Catalogs
    console.log('Seeding Catalogs...');
    const existingCats = await client.query('SELECT count(*) FROM catalogs');
    if (parseInt(existingCats.rows[0].count) === 0 && fs.existsSync('content-export/catalogs.json')) {
      const catalogsData = JSON.parse(fs.readFileSync('content-export/catalogs.json', 'utf8'));
      for (const c of catalogsData) {
        const seriesId = c.series?.slug ? seriesMap[c.series.slug] || null : null;
        const ins = await client.query(
          `INSERT INTO catalogs (
            series_id, pages, filesize_mb, date, is_hidden, download_count, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
          RETURNING id`,
          [
            seriesId,
            c.pages || 24,
            c.filesizeMb || 12.5,
            c.date || '2024-2025 Edition',
            false,
            0
          ]
        );
        const catId = ins.rows[0].id;
        await client.query(
          `INSERT INTO catalogs_locales (title, _locale, _parent_id)
           VALUES ($1, $2, $3)`,
          [c.title || 'Fresh Ceramics Master Catalogue', 'en', catId]
        );
      }
      console.log('Catalogs seeded.');
    }

    // 7. Articles
    console.log('Seeding Articles...');
    const existingArts = await client.query('SELECT count(*) FROM articles');
    if (parseInt(existingArts.rows[0].count) === 0 && fs.existsSync('content-export/articles.json')) {
      const articlesData = JSON.parse(fs.readFileSync('content-export/articles.json', 'utf8'));
      for (const a of articlesData) {
        const cat = (a.category === 'press' || a.category === 'knowledge' || a.category === 'news') ? a.category : 'news';
        const ins = await client.query(
          `INSERT INTO articles (
            slug, category, published_at, featured, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, NOW(), NOW())
          RETURNING id`,
          [
            a.slug || 'fresh-ceramics-update',
            cat,
            a.publishedAt || new Date().toISOString(),
            !!a.featured
          ]
        );
        const artId = ins.rows[0].id;
        await client.query(
          `INSERT INTO articles_locales (title, excerpt, _locale, _parent_id)
           VALUES ($1, $2, $3, $4)`,
          [a.title || 'Fresh Ceramics News', a.excerpt || '', 'en', artId]
        );
      }
      console.log('Articles seeded.');
    }

    // 8. Dynamic Pages Builder
    console.log('Seeding dynamic Pages builder...');
    const existingPages = await client.query('SELECT count(*) FROM pages');
    if (parseInt(existingPages.rows[0].count) === 0) {
      // Home Page
      const homeIns = await client.query(
        `INSERT INTO pages (slug, status, created_at, updated_at)
         VALUES ($1, $2, NOW(), NOW()) RETURNING id`,
        ['home', 'published']
      );
      const homeId = homeIns.rows[0].id;
      await client.query(
        `INSERT INTO pages_locales (title, meta_meta_title, meta_meta_description, _locale, _parent_id)
         VALUES ($1, $2, $3, $4, $5)`,
        ['Home Page', 'Fresh Ceramics - Premium Tiles of Bangladesh', 'Discover world-class ceramic and porcelain tiles engineered in Meghna River basin.', 'en', homeId]
      );

      // Hero block for home
      await client.query(
        `INSERT INTO pages_blocks_hero_scene (
          _order, _parent_id, _path, align, cta_primary_link, cta_secondary_link
        ) VALUES ($1, $2, $3, $4, $5, $6)`,
        [1, homeId, 'layout', 'center', '/en/collections', '/en/journey']
      );
      // Hero block locales
      const heroBlockRes = await client.query(
        `SELECT id FROM pages_blocks_hero_scene WHERE _parent_id = $1 LIMIT 1`,
        [homeId]
      );
      if (heroBlockRes.rows.length > 0) {
        await client.query(
          `INSERT INTO pages_blocks_hero_scene_locales (
            eyebrow, heading, subheading, cta_primary_label, cta_secondary_label, _locale, _parent_id
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            'MEGHNAGHAT, FIRST LIGHT',
            'A Fresh Start to an Aesthetic Life',
            'Every surface in a home begins somewhere. Ours begins with sunlight on a rooftop in Meghnaghat.',
            'Explore Catalogue',
            'Take Journey',
            'en',
            heroBlockRes.rows[0].id
          ]
        );
      }

      // Stats block for home
      await client.query(
        `INSERT INTO pages_blocks_stats_banner (
          _order, _parent_id, _path, stat1_value, stat1_label, stat2_value, stat2_label, stat3_value, stat3_label
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          2,
          homeId,
          'layout',
          'Since 2021',
          'Tile Plant Established',
          '18.6M sq m',
          'Annual Capacity',
          '#1 Brand',
          'Market Sales Leadership'
        ]
      );

      // Tile grid block for home
      await client.query(
        `INSERT INTO pages_blocks_tile_grid_showcase (
          _order, _parent_id, _path, filter_category, limit
        ) VALUES ($1, $2, $3, $4, $5)`,
        [3, homeId, 'layout', 'all', 12]
      );
      const gridBlockRes = await client.query(
        `SELECT id FROM pages_blocks_tile_grid_showcase WHERE _parent_id = $1 LIMIT 1`,
        [homeId]
      );
      if (gridBlockRes.rows.length > 0) {
        await client.query(
          `INSERT INTO pages_blocks_tile_grid_showcase_locales (
            heading, description, _locale, _parent_id
          ) VALUES ($1, $2, $3, $4)`,
          ['Signature Architectural Surfaces', 'Ultra-durable, slip-resistant, and high-aesthetic tiles designed for modern living.', 'en', gridBlockRes.rows[0].id]
        );
      }

      // Showroom network block for home
      await client.query(
        `INSERT INTO pages_blocks_showroom_network (
          _order, _parent_id, _path, show_search, max_display
        ) VALUES ($1, $2, $3, $4, $5)`,
        [4, homeId, 'layout', true, 81]
      );
      const showroomBlockRes = await client.query(
        `SELECT id FROM pages_blocks_showroom_network WHERE _parent_id = $1 LIMIT 1`,
        [homeId]
      );
      if (showroomBlockRes.rows.length > 0) {
        await client.query(
          `INSERT INTO pages_blocks_showroom_network_locales (
            heading, subtitle, _locale, _parent_id
          ) VALUES ($1, $2, $3, $4)`,
          ['Nationwide Display Network', '81 premier dealer experience centers and showrooms across all 8 divisions of Bangladesh.', 'en', showroomBlockRes.rows[0].id]
        );
      }

      // About Page
      const aboutIns = await client.query(
        `INSERT INTO pages (slug, status, created_at, updated_at)
         VALUES ($1, $2, NOW(), NOW()) RETURNING id`,
        ['about', 'published']
      );
      const aboutId = aboutIns.rows[0].id;
      await client.query(
        `INSERT INTO pages_locales (title, meta_meta_title, meta_meta_description, _locale, _parent_id)
         VALUES ($1, $2, $3, $4, $5)`,
        ['About Fresh Ceramics', 'About Us | Fresh Ceramics', 'The story, manufacturing prowess, and vision of Meghna Ceramics.', 'en', aboutId]
      );

      console.log('Dynamic Pages builder seeded with Home and About pages.');
    }

    console.log('--- Seeding Successfully Completed! ---');
  } catch (err) {
    console.error('Fast Seeder Error:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
