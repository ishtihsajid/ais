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

async function run() {
  console.log('=== Ingesting Authentic Fresh Ceramics Tile Images ===\n')

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

  const processedList = []

  for (const srcPath of realImageFiles) {
    const rel = path.relative(baseDir, srcPath)
    const ext = path.extname(srcPath)
    const rawName = path.basename(srcPath, ext).trim()
    const sanitizedCode = rawName.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_')
    const lowerRel = rel.toLowerCase().replace(/\\/g, '/')
    const relHash = crypto.createHash('md5').update(lowerRel).digest('hex').slice(0, 5)

    let category = lowerRel.includes('floor tiles') ? 'floor' : 'wall'
    let sizeId = null
    let finishId = null
    let isSlim = false

    if (category === 'floor') {
      if (lowerRel.includes('double charge')) {
        finishId = 1
        if (sanitizedCode.startsWith('12_') || lowerRel.includes('60x120') || sanitizedCode.includes('12_DC')) {
          sizeId = 1
        } else if (sanitizedCode.startsWith('8_') || lowerRel.includes('80x80') || sanitizedCode.includes('8_DC')) {
          sizeId = 2
        } else {
          sizeId = 3 // 60x60
        }
      } else if (lowerRel.includes('60x120')) {
        sizeId = 1
        finishId = 2 // mirror polished
      } else if (lowerRel.includes('80x80')) {
        sizeId = 2
        if (lowerRel.includes('matt')) finishId = 3
        else if (lowerRel.includes('slim')) { finishId = 2; isSlim = true }
        else finishId = 2 // pgvt
      } else if (lowerRel.includes('60x60')) {
        sizeId = 3
        if (lowerRel.includes('zainamaj') || sanitizedCode.includes('ZN')) finishId = 4
        else if (lowerRel.includes('matt') || sanitizedCode.includes('DPM')) finishId = 3
        else finishId = 2
      } else if (lowerRel.includes('40x40')) {
        sizeId = 4
        if (lowerRel.includes('high glossy') || sanitizedCode.includes('HG')) finishId = 6
        else finishId = 5 // digital porcelain
      } else if (lowerRel.includes('30x30')) {
        sizeId = 5
        finishId = 5
      } else if (lowerRel.includes('stair') || lowerRel.includes('30 (h) x 60')) {
        sizeId = 1 // stair
        finishId = 3
      } else {
        sizeId = 3
        finishId = 2
      }
    } else {
      // Wall
      if (lowerRel.includes('20x30')) {
        sizeId = 11
        finishId = (sanitizedCode.includes('P') || sanitizedCode.includes('WP')) ? 12 : 9
      } else if (lowerRel.includes('25x40')) {
        sizeId = 10
        finishId = 12
      } else if (lowerRel.includes('30x45')) {
        sizeId = 9
        finishId = (sanitizedCode.includes('P') || sanitizedCode.includes('WP')) ? 12 : 9
      } else if (lowerRel.includes('30x50')) {
        sizeId = 8
        if (lowerRel.includes('candy')) finishId = 11
        else if (lowerRel.includes('rustic')) finishId = 10
        else if (lowerRel.includes('matte')) finishId = 3
        else if (lowerRel.includes('glossy punch') || sanitizedCode.includes('WP')) finishId = 12
        else finishId = 9
      } else if (lowerRel.includes('30x60') || lowerRel.includes('w 600') || lowerRel.includes('w 600')) {
        sizeId = 7
        if (lowerRel.includes('mattestic')) finishId = 7
        else if (lowerRel.includes('rustic')) finishId = 10
        else if (lowerRel.includes('matt')) finishId = 3
        else if (lowerRel.includes('punch') || sanitizedCode.includes('P')) finishId = 12
        else finishId = 9
      } else {
        sizeId = 7
        finishId = 9
      }
    }

    const outFilename = `real_${category}_${sanitizedCode}_${relHash}.webp`
    const destPathMedia = path.join(outMediaDir, outFilename)
    const destPathPublic = path.join(outPublicMediaDir, outFilename)

    processedList.push({
      srcPath,
      rawName,
      sanitizedCode,
      category,
      sizeId,
      finishId,
      isSlim,
      outFilename,
      destPathMedia,
      destPathPublic,
      url: `/media/real_tiles/${outFilename}`,
    })
  }

  console.log(`Classified ${processedList.length} files. Converting images with sharp...`)

  let converted = 0
  for (const item of processedList) {
    try {
      if (!fs.existsSync(item.destPathMedia) || !fs.existsSync(item.destPathPublic)) {
        const buffer = await sharp(item.srcPath)
          .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 88 })
          .toBuffer()

        fs.writeFileSync(item.destPathMedia, buffer)
        fs.writeFileSync(item.destPathPublic, buffer)
        converted++
      }
    } catch (err) {
      // Ignore unsupported or corrupt formats
    }
  }

  console.log(`Converted/verified real tile images.`)

  // Register in media table and link to products in database
  console.log('Linking real images to SQLite database (media, products_rels)...')

  const now = new Date().toISOString()
  let linkedCount = 0

  // Group real tiles by category + sizeId + finishId
  const pool = new Map()
  for (const item of processedList) {
    if (fs.existsSync(item.destPathMedia)) {
      const key = `${item.category}_${item.sizeId}_${item.finishId}`
      if (!pool.has(key)) pool.set(key, [])
      pool.get(key).push(item)
    }
  }

  // Fetch all products
  const productsResult = await db.execute('SELECT id, code, slug, category, finish_id, size_id FROM products ORDER BY id ASC')
  const products = productsResult.rows

  for (const prod of products) {
    const key = `${prod.category}_${prod.size_id}_${prod.finish_id}`
    const available = pool.get(key)

    if (available && available.length > 0) {
      const realItem = available.shift() // Take next available real photo for this SKU group

      // 1. Check or Insert into media table
      const meta = fs.statSync(realItem.destPathMedia)
      const existingMedia = await db.execute({
        sql: `SELECT id FROM media WHERE filename = ?`,
        args: [realItem.outFilename],
      })

      let mediaId
      if (existingMedia.rows.length > 0) {
        mediaId = existingMedia.rows[0].id
      } else {
        const insertMedia = await db.execute({
          sql: `INSERT INTO media (alt, decorative, processing_status, url, filename, mime_type, filesize, width, height, updated_at, created_at)
                VALUES (?, 0, 'ready', ?, ?, 'image/webp', ?, 1200, 1200, ?, ?)
                RETURNING id`,
          args: [
            `Fresh Ceramics ${realItem.rawName} - authentic factory surface`,
            realItem.url,
            realItem.outFilename,
            meta.size,
            now,
            now,
          ],
        })
        mediaId = insertMedia.rows[0].id
      }

      // 2. Update products_rels path = 'images'
      await db.execute({
        sql: `UPDATE products_rels SET media_id = ? WHERE parent_id = ? AND path = 'images' AND "order" = 1`,
        args: [mediaId, prod.id],
      })

      // 3. Update products localized name to showcase the real tile code
      await db.execute({
        sql: `UPDATE products_locales SET name = ? WHERE _parent_id = ? AND _locale = 'en'`,
        args: [`Fresh Ceramics ${realItem.rawName}`, prod.id],
      })

      linkedCount++
    }
  }

  console.log(`\n Successfully linked ${linkedCount} authentic photos to catalogue products!`)
  console.log('Remaining products retain procedural textures as required per prompt.\n')
}

run().catch((err) => {
  console.error('Ingestion failed:', err)
  process.exit(1)
})
