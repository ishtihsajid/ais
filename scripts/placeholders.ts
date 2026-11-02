import { getPayload } from 'payload'
import config from '../src/payload.config'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

dotenv.config()

// SKU Matrix defined strictly per Section 3.5 of docs/BUILD_PLAN.md
const MATRIX_CONFIG = [
  // Floor Tiles: 204 total
  { category: 'floor', sizeSlug: '60x120', finishName: 'Double Charge', count: 3, pcs: 2, sqm: 1.44, kg: 34 },
  { category: 'floor', sizeSlug: '60x120', finishName: 'Mirror Polished', count: 19, pcs: 2, sqm: 1.44, kg: 34 },
  { category: 'floor', sizeSlug: '60x120', finishName: 'Matt', count: 3, pcs: 2, sqm: 1.44, kg: 34 },
  { category: 'floor', sizeSlug: '60x120', finishName: 'Zainamaj', count: 2, pcs: 2, sqm: 1.44, kg: 34 },

  { category: 'floor', sizeSlug: '80x80', finishName: 'Double Charge', count: 3, pcs: 3, sqm: 1.92, kg: 45 },
  { category: 'floor', sizeSlug: '80x80', finishName: 'Mirror Polished', count: 19, pcs: 3, sqm: 1.92, kg: 45 },

  { category: 'floor', sizeSlug: '60x60', finishName: 'Double Charge', count: 8, pcs: 4, sqm: 1.44, kg: 31 },
  { category: 'floor', sizeSlug: '60x60', finishName: 'Mirror Polished', count: 24, pcs: 4, sqm: 1.44, kg: 31 },
  { category: 'floor', sizeSlug: '60x60', finishName: 'Matt', count: 5, pcs: 4, sqm: 1.44, kg: 31 },
  { category: 'floor', sizeSlug: '60x60', finishName: 'Zainamaj', count: 4, pcs: 4, sqm: 1.44, kg: 31 },

  { category: 'floor', sizeSlug: '40x40', finishName: 'Digital Porcelain', count: 24, pcs: 6, sqm: 0.96, kg: 19 },
  { category: 'floor', sizeSlug: '40x40', finishName: 'High Gloss', count: 20, pcs: 6, sqm: 0.96, kg: 19 },

  { category: 'floor', sizeSlug: '30x30', finishName: 'Digital Porcelain', count: 64, pcs: 11, sqm: 0.99, kg: 18 },

  { category: 'floor', sizeSlug: '20x120', finishName: 'Matt', count: 6, pcs: 5, sqm: 1.20, kg: 27 },

  // Wall Tiles: 181 total
  { category: 'wall', sizeSlug: '30x60', finishName: 'Mattestic', count: 3, pcs: 8, sqm: 1.44, kg: 21 },
  { category: 'wall', sizeSlug: '30x60', finishName: 'DewDrop', count: 2, pcs: 8, sqm: 1.44, kg: 21 },
  { category: 'wall', sizeSlug: '30x60', finishName: 'Glossy', count: 12, pcs: 8, sqm: 1.44, kg: 21 },
  { category: 'wall', sizeSlug: '30x60', finishName: 'Matt', count: 4, pcs: 8, sqm: 1.44, kg: 21 },
  { category: 'wall', sizeSlug: '30x60', finishName: 'Rustic', count: 2, pcs: 8, sqm: 1.44, kg: 21 },
  { category: 'wall', sizeSlug: '30x60', finishName: 'Glossy Punch', count: 20, pcs: 8, sqm: 1.44, kg: 21 },

  { category: 'wall', sizeSlug: '30x50', finishName: 'Glossy', count: 9, pcs: 8, sqm: 1.20, kg: 18 },
  { category: 'wall', sizeSlug: '30x50', finishName: 'Matt', count: 6, pcs: 8, sqm: 1.20, kg: 18 },
  { category: 'wall', sizeSlug: '30x50', finishName: 'Candy', count: 4, pcs: 8, sqm: 1.20, kg: 18 },
  { category: 'wall', sizeSlug: '30x50', finishName: 'Glossy Punch', count: 6, pcs: 8, sqm: 1.20, kg: 18 },

  { category: 'wall', sizeSlug: '30x45', finishName: 'Glossy', count: 13, pcs: 9, sqm: 1.215, kg: 17 },
  { category: 'wall', sizeSlug: '30x45', finishName: 'Glossy Punch', count: 8, pcs: 9, sqm: 1.215, kg: 17 },

  { category: 'wall', sizeSlug: '25x40', finishName: 'Glossy', count: 9, pcs: 10, sqm: 1.00, kg: 14 },
  { category: 'wall', sizeSlug: '25x40', finishName: 'Glossy Punch', count: 6, pcs: 10, sqm: 1.00, kg: 14 },

  { category: 'wall', sizeSlug: '20x30', finishName: 'Glossy', count: 44, pcs: 15, sqm: 0.90, kg: 12 },
  { category: 'wall', sizeSlug: '20x30', finishName: 'Matt', count: 2, pcs: 15, sqm: 0.90, kg: 12 },
  { category: 'wall', sizeSlug: '20x30', finishName: 'Rustic', count: 4, pcs: 15, sqm: 0.90, kg: 12 },
  { category: 'wall', sizeSlug: '20x30', finishName: 'Glossy Punch', count: 27, pcs: 15, sqm: 0.90, kg: 12 },
]

const COLOR_PALETTES = [
  { name: 'white', bg: '#F8F9FA', vein: '#E2E8F0', label: 'White / Ivory' },
  { name: 'beige', bg: '#F5F0E6', vein: '#D6C7B2', label: 'Beige / Cream' },
  { name: 'grey', bg: '#E2E8F0', vein: '#718096', label: 'Grey / Charcoal' },
  { name: 'brown', bg: '#EADBC8', vein: '#8C6D58', label: 'Brown / Earth' },
  { name: 'black', bg: '#454548', vein: '#5E5E5E', label: 'Stone Slate' },
]

async function generateTileTexture(code: string, color: typeof COLOR_PALETTES[0], width = 800, height = 800) {
  const isDev = process.env.NODE_ENV !== 'production'
  const watermark = isDev ? `<text x="20" y="40" font-family="sans-serif" font-size="16" font-weight="bold" fill="#E30613" opacity="0.65">PLACEHOLDER SAMPLE</text>` : ''
  const codeLabel = `<text x="20" y="${height - 25}" font-family="sans-serif" font-size="18" font-weight="600" fill="#5E5E5E">${code}</text>`

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color.bg}" />
          <stop offset="50%" stop-color="${color.vein}" stop-opacity="0.25" />
          <stop offset="100%" stop-color="${color.bg}" />
        </linearGradient>
        <pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 0 20 Q 30 10 60 40 T 100 80" stroke="${color.vein}" stroke-width="0.75" fill="none" opacity="0.3"/>
          <path d="M 20 0 Q 50 40 80 20 T 100 50" stroke="${color.vein}" stroke-width="0.5" fill="none" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <rect width="100%" height="100%" fill="url(#grain)" />
      <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="#B3B3B3" stroke-width="2" />
      ${watermark}
      ${codeLabel}
    </svg>
  `
  return sharp(Buffer.from(svg)).webp({ quality: 85 }).toBuffer()
}

const FINISH_CODES: Record<string, string> = {
  'Double Charge': 'DC',
  'Mirror Polished': 'MP',
  'Matt': 'MAT',
  'Zainamaj': 'ZAI',
  'Digital Porcelain': 'DP',
  'High Gloss': 'HG',
  'Mattestic': 'MTC',
  'DewDrop': 'DD',
  'Glossy': 'GLS',
  'Rustic': 'RST',
  'Candy': 'CND',
  'Glossy Punch': 'GP',
}

async function runPlaceholders() {
  console.log('Generating exact 385 SKU placeholder catalog per Section 3.5...')

  const payload = await getPayload({ config })

  // Clean old products if count mismatch to guarantee clean 385 SKU matrix
  const existingCount = await payload.find({ collection: 'products', limit: 1 })
  if (existingCount.totalDocs > 0 && process.argv.includes('--clean')) {
    console.log('Cleaning existing products for fresh matrix alignment...')
    const allExisting = await payload.find({ collection: 'products', limit: 1000 })
    for (const doc of allExisting.docs) {
      await payload.delete({ collection: 'products', id: doc.id })
    }
  }

  // Build lookups for finishes and sizes
  const finishes = await payload.find({ collection: 'finishes', limit: 100 })
  const finishMap = new Map(finishes.docs.map((f: any) => [f.name, f.id]))

  const sizes = await payload.find({ collection: 'sizes', limit: 100 })
  const sizeMap = new Map(sizes.docs.map((s: any) => [s.slug, s.id]))

  const series = await payload.find({ collection: 'series', limit: 100 })
  const seriesIds = series.docs.map((s: any) => s.id)

  const spaces = await payload.find({ collection: 'spaces', limit: 100 })
  const spaceIds = spaces.docs.map((sp: any) => sp.id)

  const mediaDir = path.resolve('media')
  if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true })
  }

  let totalFloor = 0
  let totalWall = 0
  let globalIndex = 1

  for (const block of MATRIX_CONFIG) {
    const finishId = finishMap.get(block.finishName)
    const sizeId = sizeMap.get(block.sizeSlug)

    if (!finishId || !sizeId) {
      console.error(`Missing finish (${block.finishName}) or size (${block.sizeSlug}) reference!`)
      continue
    }

    const prefix = block.category === 'floor' ? 'FL' : 'WL'
    const finishCode = FINISH_CODES[block.finishName] || block.finishName.replace(/[^A-Za-z0-9]/g, '').slice(0, 3).toUpperCase()
    const sizeCode = block.sizeSlug.replace('x', '')

    for (let i = 1; i <= block.count; i++) {
      const code = `FC-${prefix}-${sizeCode}-${finishCode}${String(i).padStart(2, '0')}`
      const slug = code.toLowerCase()
      const color = COLOR_PALETTES[globalIndex % COLOR_PALETTES.length]
      const seriesId = seriesIds[globalIndex % seriesIds.length]
      const assignedSpaces = [spaceIds[globalIndex % spaceIds.length]]

      // Check if product exists
      const existingProduct = await payload.find({
        collection: 'products',
        where: { code: { equals: code } },
      })

      if (existingProduct.totalDocs === 0) {
        // Generate image buffer and write to disk
        const imgBuffer = await generateTileTexture(code, color)
        const filename = `${code}_1.webp`
        const filePath = path.join(mediaDir, filename)
        fs.writeFileSync(filePath, imgBuffer)

        // Create Media doc
        const mediaDoc = await payload.create({
          collection: 'media',
          data: {
            alt: `Fresh Ceramics ${block.finishName} ${block.sizeSlug} - ${code}`,
            decorative: false,
            processingStatus: 'ready',
          } as any,
          file: {
            data: imgBuffer,
            name: filename,
            mimetype: 'image/webp',
            size: imgBuffer.length,
          },
        })

        // Flag Slim or Heatproof on select designs
        const isSlim = (globalIndex % 12 === 0)
        const isHeatproof = (globalIndex % 15 === 0)

        // Parse dimensions for Visualizer hooks
        const [w, h] = block.sizeSlug.split('x').map(Number)

        await payload.create({
          collection: 'products',
          data: {
            code,
            name: `Fresh ${block.finishName} ${block.sizeSlug.toUpperCase()} Design ${i}`,
            slug,
            category: block.category as any,
            finish: finishId,
            size: sizeId,
            series: seriesId,
            colourFamily: color.name as any,
            spaces: assignedSpaces,
            images: [mediaDoc.id],
            zoomable: true,
            pcsPerCarton: block.pcs,
            sqmPerCarton: block.sqm,
            cartonKg: block.kg,
            slim: isSlim,
            heatproof: isHeatproof,
            wallOrFloor: block.category as any,
            widthCm: w,
            heightCm: h,
            groutWidthMm: 2,
            status: 'published',
          } as any,
        })
      }

      if (block.category === 'floor') totalFloor++
      else totalWall++
      globalIndex++
    }
  }

  console.log(`\n========================================`)
  console.log(`SKU MATRIX GENERATION SUMMARY:`)
  console.log(`Floor tiles generated: ${totalFloor} (Target: 204)`)
  console.log(`Wall tiles generated:  ${totalWall} (Target: 181)`)
  console.log(`Total SKU catalog:     ${totalFloor + totalWall} (Target: 385)`)
  console.log(`========================================\n`)

  // Update Stats global
  await payload.updateGlobal({
    slug: 'stats',
    data: {
      floorDesignCount: totalFloor,
      wallDesignCount: totalWall,
      totalDesignCount: totalFloor + totalWall,
    } as any,
  })

  // Update docs/PLACEHOLDERS.md
  const placeholdersDoc = `# Fresh Ceramics: Placeholders Register

Generated on: ${new Date().toISOString()}

## Product Placeholders (385 SKUs)
- **Floor tiles (204 designs)**:
  - 60x120: 27 (Double Charge: 3, Mirror Polished: 19, Matt: 3, Zainamaj: 2)
  - 80x80: 22 (Double Charge: 3, Mirror Polished: 19)
  - 60x60: 41 (Double Charge: 8, Mirror Polished: 24, Matt: 5, Zainamaj: 4)
  - 40x40: 44 (Digital Porcelain: 24, High Gloss: 20)
  - 30x30: 64 (Digital Porcelain: 64)
  - 20x120: 6 (Matt: 6)
- **Wall tiles (181 designs)**:
  - 30x60: 43 (Mattestic: 3, DewDrop: 2, Glossy: 12, Matt: 4, Rustic: 2, Glossy Punch: 20)
  - 30x50: 25 (Glossy: 9, Matt: 6, Candy: 4, Glossy Punch: 6)
  - 30x45: 21 (Glossy: 13, Glossy Punch: 8)
  - 25x40: 15 (Glossy: 9, Glossy Punch: 6)
  - 20x30: 77 (Glossy: 44, Matt: 2, Rustic: 4, Glossy Punch: 27)

All placeholder textures are procedurally generated in WebP format with sharp, incorporating the subtle watermark 'PLACEHOLDER SAMPLE' in development mode.

## Showrooms
- 2 Own Operated Flagship Centres (Hatirpool Dhaka & Kazir Dewri Chattogram)
- 79 Exclusive Showrooms across Bangladesh imported from official owner records
- 120 Authorised Dealers (Stats counter representation)

## Voices and Initiatives
- Craftsman Kabir Hossain (Fitter), Architect Samira Rahman (Designer), Anwarul Karim (Dealer) marked [sample]
- Initiatives: Craftsmen of Aesthetics, Green Kiln Surface Water, Architectural Series marked [sample]
`
  fs.writeFileSync(path.resolve('docs/PLACEHOLDERS.md'), placeholdersDoc)
  console.log('Updated docs/PLACEHOLDERS.md')

  process.exit(0)
}

runPlaceholders().catch((err) => {
  console.error('Placeholder generation failed:', err)
  process.exit(1)
})
