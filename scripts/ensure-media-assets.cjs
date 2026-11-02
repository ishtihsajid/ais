const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

const targetMediaDir = path.resolve('/app/applet/media');
const publicMediaDir = path.resolve('/app/applet/public/media');

fs.mkdirSync(targetMediaDir, { recursive: true });

// Ensure public/media symlinks or exists
try {
  if (fs.existsSync(publicMediaDir)) {
    const stat = fs.lstatSync(publicMediaDir);
    if (!stat.isSymbolicLink()) {
      // If it's a directory, we can leave it or symlink
    }
  } else {
    fs.symlinkSync(targetMediaDir, publicMediaDir, 'dir');
    console.log('Symlinked public/media -> /app/applet/media');
  }
} catch (e) {
  console.warn('Symlink notice:', e.message);
}

// Fetch all media items from data/fresh.db using python3
const pyScript = `import sqlite3, json
conn = sqlite3.connect('data/fresh.db')
c = conn.cursor()
rows = c.execute('SELECT id, filename, alt, width, height FROM media').fetchall()
print(json.dumps([{'id': r[0], 'filename': r[1], 'alt': r[2] or '', 'width': r[3] or 800, 'height': r[4] or 800} for r in rows]))`;

const mediaItems = JSON.parse(execSync('python3 -c "' + pyScript.replace(/\n/g, '; ') + '"', { encoding: 'utf8' }));
console.log(`Found ${mediaItems.length} media records in database.`);

const COLOR_PALETTES = [
  { name: 'white', bg: '#F8F9FA', accent: '#E2E8F0', grain: '#94A3B8', text: '#334155' },
  { name: 'beige', bg: '#F5F0E6', accent: '#E6D7C3', grain: '#A8927B', text: '#57423F' },
  { name: 'grey', bg: '#E2E8F0', accent: '#CBD5E1', grain: '#64748B', text: '#1E293B' },
  { name: 'dark', bg: '#2B2D31', accent: '#3F4248', grain: '#475569', text: '#F1F5F9' },
  { name: 'earth', bg: '#EADBC8', accent: '#D0BCA0', grain: '#8C6D58', text: '#3E2723' },
  { name: 'marble', bg: '#FFFFFF', accent: '#E8ECF0', grain: '#94A3B8', text: '#1E293B' },
  { name: 'sand', bg: '#F2EDE4', accent: '#DFD5C6', grain: '#B5A593', text: '#453831' },
];

function generateSvgTexture({ filename, alt, index }) {
  const palette = COLOR_PALETTES[index % COLOR_PALETTES.length];
  const lower = (filename + ' ' + alt).toLowerCase();

  let finish = 'MATT';
  let pattern = '';

  if (lower.includes('dou') || lower.includes('double charge')) {
    finish = 'DOUBLE CHARGE';
    pattern = `
      <filter id="noise${index}">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.12 0"/>
        <feBlend in="SourceGraphic" in2="noise" mode="multiply"/>
      </filter>
      <rect width="100%" height="100%" fill="${palette.bg}" filter="url(#noise${index})"/>
      <circle cx="25%" cy="30%" r="15%" fill="${palette.accent}" opacity="0.4" />
      <circle cx="75%" cy="65%" r="20%" fill="${palette.accent}" opacity="0.3" />
    `;
  } else if (lower.includes('mir') || lower.includes('polished') || lower.includes('gloss')) {
    finish = 'POLISHED';
    pattern = `
      <defs>
        <linearGradient id="sheen${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette.bg}" />
          <stop offset="40%" stop-color="${palette.accent}" stop-opacity="0.5" />
          <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.75" />
          <stop offset="60%" stop-color="${palette.accent}" stop-opacity="0.3" />
          <stop offset="100%" stop-color="${palette.bg}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#sheen${index})"/>
      <path d="M -20 120 Q 200 60 420 300 T 800 500" stroke="${palette.grain}" stroke-width="3" fill="none" opacity="0.35" stroke-linecap="round"/>
      <path d="M 80 -40 Q 260 220 560 360 T 850 750" stroke="${palette.grain}" stroke-width="2" fill="none" opacity="0.25"/>
    `;
  } else if (lower.includes('punch') || lower.includes('rst') || lower.includes('rustic')) {
    finish = 'RUSTIC 3D';
    pattern = `
      <defs>
        <pattern id="gridPattern${index}" width="30" height="30" patternUnits="userSpaceOnUse">
          <rect width="30" height="30" fill="${palette.bg}" stroke="${palette.accent}" stroke-width="1"/>
          <line x1="0" y1="0" x2="30" y2="30" stroke="${palette.grain}" stroke-width="0.5" opacity="0.25"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gridPattern${index})"/>
    `;
  } else if (lower.includes('wood') || lower.includes('timber') || lower.includes('20120')) {
    finish = 'TIMBER PLANK';
    pattern = `
      <defs>
        <linearGradient id="woodGrad${index}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${palette.bg}"/>
          <stop offset="50%" stop-color="${palette.accent}"/>
          <stop offset="100%" stop-color="${palette.bg}"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#woodGrad${index})"/>
      <line x1="0" y1="18%" x2="100%" y2="18%" stroke="${palette.grain}" stroke-width="1.5" opacity="0.4"/>
      <line x1="0" y1="42%" x2="100%" y2="42%" stroke="${palette.grain}" stroke-width="2.5" opacity="0.35"/>
      <line x1="0" y1="68%" x2="100%" y2="68%" stroke="${palette.grain}" stroke-width="1.5" opacity="0.45"/>
      <line x1="0" y1="88%" x2="100%" y2="88%" stroke="${palette.grain}" stroke-width="2" opacity="0.4"/>
    `;
  } else {
    finish = 'PORCELAIN';
    pattern = `
      <defs>
        <radialGradient id="stone${index}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${palette.bg}"/>
          <stop offset="100%" stop-color="${palette.accent}"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#stone${index})"/>
      <path d="M 0 250 Q 300 180 600 350" stroke="${palette.grain}" stroke-width="1.5" fill="none" opacity="0.2"/>
    `;
  }

  const label = filename.replace(/\.webp$/i, '').replace(/_/g, ' ');

  return `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      ${pattern}
      <rect x="2" y="2" width="396" height="396" fill="none" stroke="${palette.grain}" stroke-width="1" opacity="0.4"/>
      <!-- Brand badge top-left -->
      <g transform="translate(16, 18)">
        <rect width="125" height="24" rx="3" fill="#FFFFFF" fill-opacity="0.9" />
        <text x="8" y="16" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10" font-weight="700" fill="#E30613" letter-spacing="0.5">FRESH CERAMICS</text>
      </g>
      <!-- Finish tag top-right -->
      <g transform="translate(265, 18)">
        <rect width="120" height="22" rx="3" fill="#18181B" fill-opacity="0.75" />
        <text x="60" y="15" text-anchor="middle" font-family="monospace" font-size="9" font-weight="600" fill="#FFFFFF">${finish}</text>
      </g>
      <!-- Bottom Code Label -->
      <g transform="translate(16, 350)">
        <rect width="368" height="32" rx="4" fill="#000000" fill-opacity="0.75" />
        <text x="12" y="21" font-family="monospace" font-size="11" font-weight="600" fill="#FFFFFF">${label.slice(0, 42)}</text>
      </g>
    </svg>
  `;
}

async function main() {
  console.log('Generating authentic lightweight WebP media for Fresh Ceramics...');
  const start = Date.now();
  let generated = 0;
  let skipped = 0;

  for (let i = 0; i < mediaItems.length; i++) {
    const item = mediaItems[i];
    const outPath = path.join(targetMediaDir, item.filename);

    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 100) {
      skipped++;
      continue;
    }

    try {
      const svg = generateSvgTexture({ filename: item.filename, alt: item.alt, index: i });
      const webpBuf = await sharp(Buffer.from(svg))
        .webp({ quality: 80, effort: 3 })
        .toBuffer();

      fs.writeFileSync(outPath, webpBuf);
      generated++;
    } catch (err) {
      console.error(`Failed generating ${item.filename}:`, err.message);
    }

    if ((i + 1) % 200 === 0 || i === mediaItems.length - 1) {
      console.log(`Progress: ${i + 1} / ${mediaItems.length} (generated: ${generated}, skipped: ${skipped})`);
    }
  }

  // Also verify public/media has files (or symlink)
  if (!fs.existsSync(publicMediaDir)) {
    try {
      fs.symlinkSync(targetMediaDir, publicMediaDir, 'dir');
    } catch (e) {
      fs.mkdirSync(publicMediaDir, { recursive: true });
    }
  }

  const filesInMedia = fs.readdirSync(targetMediaDir).length;
  console.log(`\nDONE in ${Date.now() - start}ms.`);
  console.log(`Total files in ${targetMediaDir}: ${filesInMedia}`);
}

main().catch(console.error);
