import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import sharp from 'sharp'
import { createClient } from '@libsql/client'

const db = createClient({ url: 'file:data/fresh.db' })

function walk(dir) {
  let results = []
  if (!fs.existsSync(dir)) return results
  const list = fs.readdirSync(dir)
  list.forEach((file) => {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath))
    } else {
      results.push(fullPath)
    }
  })
  return results
}

function cleanString(str) {
  return str.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()
}

async function run() {
  console.log('=== Building Authentic Catalog from Fresh Ceramics Assets ===\n')

  const baseDir = path.resolve('Fresh-Ceramics-Assets/products/Tiles Images of Fresh Ceramics')
  const allFiles = walk(baseDir)
  const validExts = ['.jpg', '.jpeg', '.png', '.webp']

  const realImageFiles = allFiles.filter((f) => {
    const base = path.basename(f)
    return validExts.includes(path.extname(f).toLowerCase()) && !base.startsWith('._') && !base.startsWith('Copy of')
  })

  console.log(`Found ${realImageFiles.length} real tile images.`)

  const outMediaDir = path.resolve('media/real_tiles')
  const outPublicMediaDir = path.resolve('public/media/real_tiles')
  fs.mkdirSync(outMediaDir, { recursive: true })
  fs.mkdirSync(outPublicMediaDir, { recursive: true })

  const products = []
  const seenCodes = new Set()

  for (const srcPath of realImageFiles) {
    const rel = path.relative(baseDir, srcPath)
    const ext = path.extname(srcPath)
    const rawName = cleanString(path.basename(srcPath, ext))
    const lowerRel = cleanString(rel.toLowerCase().replace(/\\/g, '/'))

    let category = lowerRel.includes('floor tiles') ? 'floor' : 'wall'
    let finishName = ''
    let finishSlug = ''
    let sizeName = ''
    let sizeCode = ''
    let aspectRatio = '1:1'
    let scale = 1.0
    let isSlim = false
    let isHeatproof = false

    if (category === 'floor') {
      if (lowerRel.includes('double charge')) {
        finishName = 'Double Charge'
        finishSlug = 'double-charge'
        if (rawName.startsWith('12') || rawName.startsWith('12 ') || rawName.includes('12_DC') || rawName.includes('12 DC')) {
          sizeName = '60x120 cm'
          sizeCode = '60x120'
          aspectRatio = '1:2'
          scale = 1.0
        } else if (rawName.startsWith('8') || rawName.startsWith('8 ') || rawName.includes('8_DC') || rawName.includes('8 DC')) {
          sizeName = '80x80 cm'
          sizeCode = '80x80'
          aspectRatio = '1:1'
          scale = 1.0
        } else {
          sizeName = '60x60 cm'
          sizeCode = '60x60'
          aspectRatio = '1:1'
          scale = 0.75
        }
      } else if (lowerRel.includes('60x120 pgvt') || lowerRel.includes('60x120')) {
        finishName = 'PGVT (Mirror Polished)'
        finishSlug = 'pgvt'
        sizeName = '60x120 cm'
        sizeCode = '60x120'
        aspectRatio = '1:2'
        scale = 1.0
      } else if (lowerRel.includes('80x80 slim')) {
        finishName = 'Slim'
        finishSlug = 'slim'
        sizeName = '80x80 cm'
        sizeCode = '80x80'
        aspectRatio = '1:1'
        scale = 1.0
        isSlim = true
      } else if (lowerRel.includes('80x80 matt') || lowerRel.includes('80x80 matt')) {
        finishName = 'Matt'
        finishSlug = 'matt'
        sizeName = '80x80 cm'
        sizeCode = '80x80'
        aspectRatio = '1:1'
        scale = 1.0
      } else if (lowerRel.includes('80x80 pgvt') || lowerRel.includes('80x80')) {
        finishName = 'PGVT (Mirror Polished)'
        finishSlug = 'pgvt'
        sizeName = '80x80 cm'
        sizeCode = '80x80'
        aspectRatio = '1:1'
        scale = 1.0
      } else if (lowerRel.includes('zainamaj')) {
        finishName = 'Zainamaj'
        finishSlug = 'zainamaj'
        sizeName = '60x60 cm'
        sizeCode = '60x60'
        aspectRatio = '1:1'
        scale = 0.75
      } else if (lowerRel.includes('60x60 matt')) {
        finishName = 'Matt'
        finishSlug = 'matt'
        sizeName = '60x60 cm'
        sizeCode = '60x60'
        aspectRatio = '1:1'
        scale = 0.75
      } else if (lowerRel.includes('60x60 pgvt') || lowerRel.includes('60x60')) {
        finishName = 'PGVT (Mirror Polished)'
        finishSlug = 'pgvt'
        sizeName = '60x60 cm'
        sizeCode = '60x60'
        aspectRatio = '1:1'
        scale = 0.75
      } else if (lowerRel.includes('40x40 high glossy')) {
        finishName = 'High Glossy'
        finishSlug = 'high-gloss'
        sizeName = '40x40 cm'
        sizeCode = '40x40'
        aspectRatio = '1:1'
        scale = 0.5
      } else if (lowerRel.includes('40x40 digital porcelain') || lowerRel.includes('40x40')) {
        finishName = 'Digital Porcelain'
        finishSlug = 'digital-porcelain'
        sizeName = '40x40 cm'
        sizeCode = '40x40'
        aspectRatio = '1:1'
        scale = 0.5
      } else if (lowerRel.includes('30x30 digital porcelain') || lowerRel.includes('30x30')) {
        finishName = 'Digital Porcelain'
        finishSlug = 'digital-porcelain'
        sizeName = '30x30 cm'
        sizeCode = '30x30'
        aspectRatio = '1:1'
        scale = 0.375
      } else if (lowerRel.includes('stair') || lowerRel.includes('30 (h) x 60')) {
        finishName = 'Stair Tiles'
        finishSlug = 'matt'
        sizeName = '30x60 cm'
        sizeCode = '30x60'
        aspectRatio = '1:2'
        scale = 0.65
      } else {
        finishName = 'PGVT (Mirror Polished)'
        finishSlug = 'pgvt'
        sizeName = '60x60 cm'
        sizeCode = '60x60'
        aspectRatio = '1:1'
        scale = 0.75
      }
    } else {
      // Wall Tiles
      if (lowerRel.includes('20x30')) {
        sizeName = '20x30 cm'
        sizeCode = '20x30'
        aspectRatio = '2:3'
        scale = 0.45
        finishName = (rawName.includes('P') || rawName.includes('WP')) ? 'Glossy Punch' : 'Glossy'
        finishSlug = (rawName.includes('P') || rawName.includes('WP')) ? 'glossy-punch' : 'glossy'
      } else if (lowerRel.includes('25x40')) {
        sizeName = '25x40 cm'
        sizeCode = '25x40'
        aspectRatio = '5:8'
        scale = 0.60
        finishName = 'Glossy Punch'
        finishSlug = 'glossy-punch'
      } else if (lowerRel.includes('30x45')) {
        sizeName = '30x45 cm'
        sizeCode = '30x45'
        aspectRatio = '2:3'
        scale = 0.65
        finishName = 'Glossy Punch'
        finishSlug = 'glossy-punch'
      } else if (lowerRel.includes('30x50 candy') || lowerRel.includes('candy')) {
        sizeName = '30x50 cm'
        sizeCode = '30x50'
        aspectRatio = '3:5'
        scale = 0.70
        finishName = 'Candy'
        finishSlug = 'candy'
      } else if (lowerRel.includes('30x50 rustic') || lowerRel.includes('rustic')) {
        sizeName = '30x50 cm'
        sizeCode = '30x50'
        aspectRatio = '3:5'
        scale = 0.70
        finishName = 'Rustic'
        finishSlug = 'rustic'
      } else if (lowerRel.includes('30x50 matte') || lowerRel.includes('matte')) {
        sizeName = '30x50 cm'
        sizeCode = '30x50'
        aspectRatio = '3:5'
        scale = 0.70
        finishName = 'Matt'
        finishSlug = 'matt'
      } else if (lowerRel.includes('30x50 plain punch') || lowerRel.includes('plain punch')) {
        sizeName = '30x50 cm'
        sizeCode = '30x50'
        aspectRatio = '3:5'
        scale = 0.70
        finishName = 'Glossy Punch'
        finishSlug = 'glossy-punch'
      } else if (lowerRel.includes('30x50 glossy punch') || lowerRel.includes('30x50')) {
        sizeName = '30x50 cm'
        sizeCode = '30x50'
        aspectRatio = '3:5'
        scale = 0.70
        finishName = 'Glossy Punch'
        finishSlug = 'glossy-punch'
      } else if (lowerRel.includes('30x60 mattestic')) {
        sizeName = '30x60 cm'
        sizeCode = '30x60'
        aspectRatio = '1:2'
        scale = 0.85
        finishName = 'Mattestic'
        finishSlug = 'mattestic'
      } else if (lowerRel.includes('30x60 rustic punch') || lowerRel.includes('rustic')) {
        sizeName = '30x60 cm'
        sizeCode = '30x60'
        aspectRatio = '1:2'
        scale = 0.85
        finishName = 'Rustic Punch'
        finishSlug = 'rustic'
      } else if (lowerRel.includes('30x60 matt')) {
        sizeName = '30x60 cm'
        sizeCode = '30x60'
        aspectRatio = '1:2'
        scale = 0.85
        finishName = 'Matt'
        finishSlug = 'matt'
      } else if (lowerRel.includes('30x60 glossy punch') || lowerRel.includes('30x60')) {
        sizeName = '30x60 cm'
        sizeCode = '30x60'
        aspectRatio = '1:2'
        scale = 0.85
        finishName = 'Glossy Punch'
        finishSlug = 'glossy-punch'
      } else {
        sizeName = '30x60 cm'
        sizeCode = '30x60'
        aspectRatio = '1:2'
        scale = 0.85
        finishName = 'Glossy'
        finishSlug = 'glossy'
      }
    }

    const sanitizedBase = rawName.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_')
    const code = rawName
    const slug = sanitizedBase.toLowerCase().replace(/_/g, '-')
    const hash = crypto.createHash('md5').update(lowerRel).digest('hex').slice(0, 5)
    const outFilename = `tile_${category}_${sanitizedBase}_${hash}.webp`
    const destPathMedia = path.join(outMediaDir, outFilename)
    const destPathPublic = path.join(outPublicMediaDir, outFilename)

    // Convert with sharp maintaining aspect ratio
    if (!fs.existsSync(destPathPublic)) {
      try {
        const buf = await sharp(srcPath)
          .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85 })
          .toBuffer()
        fs.writeFileSync(destPathPublic, buf)
        fs.writeFileSync(destPathMedia, buf)
      } catch (e) {
        console.error('Error converting image:', srcPath, e.message)
      }
    }

    const prod = {
      id: `fc-${category}-${sanitizedBase}-${hash}`,
      code: code,
      name: code,
      slug: slug,
      category: category,
      finishName: finishName,
      finishSlug: finishSlug,
      sizeName: sizeName,
      sizeCode: sizeCode,
      aspectRatio: aspectRatio,
      scale: scale,
      imageUrl: `/media/real_tiles/${outFilename}`,
      imageAlt: `Fresh Ceramics ${code} (${sizeName}, ${finishName})`,
      isSlim: isSlim,
      isHeatproof: isHeatproof,
      waterAbsorption: category === 'floor' ? '< 0.5%' : '< 10%',
      mor: category === 'floor' ? '≥ 35 N/mm²' : '≥ 18 N/mm²',
      sqftPerBox: sizeCode === '60x120' ? 15.5 : sizeCode === '80x80' ? 20.66 : sizeCode === '60x60' ? 15.5 : 16.0,
    }

    // deduplicate identical codes within same folder
    const uniqueKey = `${category}_${code}`
    if (!seenCodes.has(uniqueKey)) {
      seenCodes.add(uniqueKey)
      products.push(prod)
    }
  }

  console.log(`Classified ${products.length} unique authentic products from folders!`)
  
  // Breakdown
  const floorProds = products.filter(p => p.category === 'floor')
  const wallProds = products.filter(p => p.category === 'wall')
  console.log(`Floor tiles: ${floorProds.length}, Wall tiles: ${wallProds.length}`)

  // Save to src/data/authentic_products.json
  const outJsonPath = path.resolve('src/data/authentic_products.json')
  fs.writeFileSync(outJsonPath, JSON.stringify(products, null, 2))
  console.log(`Saved authentic products to ${outJsonPath}`)
}

run().catch(console.error)
