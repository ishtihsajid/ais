const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const pool = new Pool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
});

const mediaDir = path.resolve('/media');
const publicMediaDir = path.resolve('/app/applet/public/media');
fs.mkdirSync(mediaDir, { recursive: true });
fs.mkdirSync(publicMediaDir, { recursive: true });

const COLOR_PALETTES = {
  white: { bg: '#F8F9FA', accent: '#E2E8F0', grain: '#CBD5E1', text: '#334155' },
  beige: { bg: '#F5F0E6', accent: '#E6D7C3', grain: '#C8B29B', text: '#57423F' },
  grey: { bg: '#E2E8F0', accent: '#CBD5E1', grain: '#94A3B8', text: '#1E293B' },
  black: { bg: '#2B2D31', accent: '#3F4248', grain: '#1A1C1E', text: '#F1F5F9' },
  brown: { bg: '#EADBC8', accent: '#D0BCA0', grain: '#9C7A5B', text: '#3E2723' },
  blue: { bg: '#E0F2FE', accent: '#BAE6FD', grain: '#7DD3FC', text: '#0369A1' },
  green: { bg: '#DCFCE7', accent: '#BBF7D0', grain: '#86EFAC', text: '#15803D' },
  terracotta: { bg: '#FED7AA', accent: '#FDBA74', grain: '#EA580C', text: '#7C2D12' },
  multicolor: { bg: '#F3F4F6', accent: '#E5E7EB', grain: '#D1D5DB', text: '#111827' },
};

function generateSvgTexture({ code, name, category, finish, colorKey, width, height }) {
  const palette = COLOR_PALETTES[colorKey] || COLOR_PALETTES.white;
  const finishName = (finish || '').toLowerCase();

  let texturePattern = '';
  if (finishName.includes('double charge')) {
    // Double Charge: layered crystalline crystalline matrix with flecks
    texturePattern = `
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0"/>
        <feBlend in="SourceGraphic" in2="noise" mode="multiply"/>
      </filter>
      <rect width="100%" height="100%" fill="${palette.bg}" filter="url(#noise)"/>
      <circle cx="20%" cy="30%" r="15%" fill="${palette.accent}" opacity="0.4" />
      <circle cx="70%" cy="65%" r="20%" fill="${palette.accent}" opacity="0.3" />
    `;
  } else if (finishName.includes('mirror') || finishName.includes('glossy') || finishName.includes('high gloss')) {
    // Glossy / Mirror Polished: flowing marble veins and gloss sheen
    texturePattern = `
      <defs>
        <linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette.bg}" />
          <stop offset="35%" stop-color="${palette.accent}" stop-opacity="0.6" />
          <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.8" />
          <stop offset="65%" stop-color="${palette.accent}" stop-opacity="0.4" />
          <stop offset="100%" stop-color="${palette.bg}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#sheen)"/>
      <path d="M -50 150 Q 250 80 500 350 T 900 650" stroke="${palette.grain}" stroke-width="4" fill="none" opacity="0.4" stroke-linecap="round"/>
      <path d="M 100 -50 Q 350 300 700 450 T 1000 900" stroke="${palette.grain}" stroke-width="2.5" fill="none" opacity="0.3"/>
      <path d="M 0 550 Q 300 450 650 800" stroke="${palette.accent}" stroke-width="6" fill="none" opacity="0.35"/>
    `;
  } else if (finishName.includes('punch') || finishName.includes('rustic')) {
    // 3D Punch / Rustic: geometric relief grooves and textured shadow depth
    texturePattern = `
      <defs>
        <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="${palette.bg}" stroke="${palette.accent}" stroke-width="1.5"/>
          <line x1="0" y1="0" x2="40" y2="40" stroke="${palette.grain}" stroke-width="0.75" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gridPattern)"/>
      <circle cx="50%" cy="50%" r="30%" fill="${palette.accent}" opacity="0.2"/>
    `;
  } else if (finishName.includes('timber')) {
    // Hardwood grain: parallel flowing wood rings
    texturePattern = `
      <defs>
        <linearGradient id="woodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${palette.bg}"/>
          <stop offset="50%" stop-color="${palette.accent}"/>
          <stop offset="100%" stop-color="${palette.bg}"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#woodGrad)"/>
      <line x1="0" y1="20%" x2="100%" y2="20%" stroke="${palette.grain}" stroke-width="2" opacity="0.5"/>
      <line x1="0" y1="40%" x2="100%" y2="40%" stroke="${palette.grain}" stroke-width="3" opacity="0.4"/>
      <line x1="0" y1="65%" x2="100%" y2="65%" stroke="${palette.grain}" stroke-width="1.5" opacity="0.6"/>
      <line x1="0" y1="85%" x2="100%" y2="85%" stroke="${palette.grain}" stroke-width="2.5" opacity="0.5"/>
    `;
  } else {
    // Matt / Digital Porcelain / Stone
    texturePattern = `
      <defs>
        <radialGradient id="stoneGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${palette.bg}"/>
          <stop offset="100%" stop-color="${palette.accent}"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#stoneGlow)"/>
      <path d="M 0 300 Q 400 250 800 500" stroke="${palette.grain}" stroke-width="2" fill="none" opacity="0.25"/>
    `;
  }

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      ${texturePattern}
      <!-- Border bevel -->
      <rect x="2" y="2" width="${width - 4}" height="${height - 4}" fill="none" stroke="${palette.grain}" stroke-width="2" opacity="0.5"/>
      <!-- Header Badge -->
      <g transform="translate(24, 28)">
        <rect width="150" height="28" rx="4" fill="#FFFFFF" fill-opacity="0.9" />
        <text x="12" y="19" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#E30613" letter-spacing="1">FRESH CERAMICS</text>
      </g>
      <!-- Footer Code Label -->
      <g transform="translate(24, ${height - 52})">
        <rect width="210" height="32" rx="4" fill="#000000" fill-opacity="0.75" />
        <text x="12" y="21" font-family="monospace" font-size="12" font-weight="600" fill="#FFFFFF">${code}</text>
      </g>
    </svg>
  `;
}

async function main() {
  const client = await pool.connect();
  try {
    console.log('--- Generating & Linking Media for all 385 Products ---');

    // Load products from JSON
    const productsData = JSON.parse(fs.readFileSync('content-export/products.json', 'utf8'));

    // Map existing products in Cloud SQL by code
    const dbProds = await client.query('SELECT id, code FROM products');
    const dbProdMap = new Map();
    dbProds.rows.forEach(r => dbProdMap.set(r.code, r.id));

    // Map existing spaces in Cloud SQL by slug
    const dbSpaces = await client.query('SELECT id, slug FROM spaces');
    const dbSpaceMap = new Map();
    dbSpaces.rows.forEach(r => dbSpaceMap.set(r.slug, r.id));

    console.log(`Found ${dbProdMap.size} products in Cloud SQL.`);

    // Clear old relations to prevent duplicates
    await client.query('DELETE FROM products_rels');
    await client.query('DELETE FROM media');
    console.log('Cleared existing products_rels and media for fresh synchronization.');

    let mediaCount = 0;
    let relCount = 0;

    for (const p of productsData) {
      const prodId = dbProdMap.get(p.code);
      if (!prodId) continue;

      const imgMeta = p.images?.[0];
      const filename = imgMeta?.filename || `${p.code}_1.webp`;
      const alt = imgMeta?.alt || `${p.name} - ${p.code}`;
      const colorKey = p.colourFamily || 'white';
      const finishName = p.finish?.name || 'Porcelain';

      const width = imgMeta?.width || 800;
      const height = imgMeta?.height || 800;

      // 1. Generate WebP texture
      const svg = generateSvgTexture({
        code: p.code,
        name: p.name,
        category: p.category,
        finish: finishName,
        colorKey,
        width,
        height,
      });

      const buffer = await sharp(Buffer.from(svg))
        .webp({ quality: 88 })
        .toBuffer();

      // Write to both /media and public/media
      const destPath1 = path.join(mediaDir, filename);
      const destPath2 = path.join(publicMediaDir, filename);
      fs.writeFileSync(destPath1, buffer);
      fs.writeFileSync(destPath2, buffer);

      // 2. Insert into media table in Cloud SQL
      const insertMedia = await client.query(
        `INSERT INTO media (
          alt, decorative, is_hidden, downloadable, download_count,
          processing_status, filename, mime_type, filesize, width, height,
          url, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
        RETURNING id`,
        [
          alt,
          false,
          false,
          true,
          0,
          'ready',
          filename,
          'image/webp',
          buffer.length,
          width,
          height,
          `/media/${filename}`
        ]
      );

      const mediaId = insertMedia.rows[0].id;
      mediaCount++;

      // 3. Link image in products_rels
      await client.query(
        `INSERT INTO products_rels (parent_id, path, media_id, "order")
         VALUES ($1, $2, $3, $4)`,
        [prodId, 'images', mediaId, 1]
      );
      relCount++;

      // 4. Link spaces in products_rels
      if (p.spaces && Array.isArray(p.spaces)) {
        let spaceOrder = 1;
        for (const sp of p.spaces) {
          const spaceSlug = sp.slug || sp;
          const spaceId = dbSpaceMap.get(spaceSlug);
          if (spaceId) {
            await client.query(
              `INSERT INTO products_rels (parent_id, path, spaces_id, "order")
               VALUES ($1, $2, $3, $4)`,
              [prodId, 'spaces', spaceId, spaceOrder++]
            );
          }
        }
      }
    }

    console.log(`Successfully generated and linked ${mediaCount} media files and ${relCount} product relations!`);
  } catch (err) {
    console.error('Error during media generation and linking:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
