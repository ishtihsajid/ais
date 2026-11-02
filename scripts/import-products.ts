import { getPayload } from 'payload'
import config from '../src/payload.config'
import dotenv from 'dotenv'
import ExcelJS from 'exceljs'
import fs from 'fs'
import path from 'path'

dotenv.config()

interface ImportRow {
  code: string
  name: string
  category: 'floor' | 'wall'
  finish: string
  size_width_cm: number
  size_height_cm: number
  series?: string
  colour_family?: string
  spaces?: string
  slim?: boolean
  heatproof?: boolean
  pcs_per_carton?: number
  sqm_per_carton?: number
  carton_kg?: number
  name_bn?: string
}

async function run() {
  const isDryRun = process.argv.includes('--dry-run')
  const generateTemplate = process.argv.includes('--template')
  const filePath = process.argv.find((arg) => arg.endsWith('.csv') || arg.endsWith('.xlsx')) || 'assets/inbox/products/products_import.xlsx'

  console.log(`\n========================================`)
  console.log(`Fresh Ceramics Product Import Utility`)
  console.log(`Mode: ${isDryRun ? 'DRY RUN (Validation only)' : 'LIVE IMPORT'}`)
  console.log(`Target: ${filePath}`)
  console.log(`========================================\n`)

  if (generateTemplate) {
    const templatePath = path.resolve('assets/inbox/products/product_import_template.xlsx')
    const wb = new ExcelJS.Workbook()
    const ws = wb.addWorksheet('Products Template')
    ws.columns = [
      { header: 'code', key: 'code', width: 20 },
      { header: 'name', key: 'name', width: 25 },
      { header: 'category', key: 'category', width: 12 },
      { header: 'finish', key: 'finish', width: 18 },
      { header: 'size_width_cm', key: 'size_width_cm', width: 15 },
      { header: 'size_height_cm', key: 'size_height_cm', width: 15 },
      { header: 'series', key: 'series', width: 20 },
      { header: 'colour_family', key: 'colour_family', width: 15 },
      { header: 'spaces', key: 'spaces', width: 20 },
      { header: 'slim', key: 'slim', width: 10 },
      { header: 'heatproof', key: 'heatproof', width: 12 },
      { header: 'pcs_per_carton', key: 'pcs_per_carton', width: 15 },
      { header: 'sqm_per_carton', key: 'sqm_per_carton', width: 15 },
      { header: 'carton_kg', key: 'carton_kg', width: 12 },
      { header: 'name_bn', key: 'name_bn', width: 25 },
    ]
    ws.addRow({
      code: 'FC-FL-60120-DC01',
      name: 'Statuario Imperiale',
      category: 'floor',
      finish: 'Double Charge',
      size_width_cm: 60,
      size_height_cm: 120,
      series: 'Grand Statuario Series',
      colour_family: 'white',
      spaces: 'Living Room, Commercial & Lobby',
      slim: false,
      heatproof: false,
      pcs_per_carton: 2,
      sqm_per_carton: 1.44,
      carton_kg: 34,
      name_bn: 'স্ট্যাচুয়ারিও ইম্পেরিয়ালে',
    })
    fs.mkdirSync(path.dirname(templatePath), { recursive: true })
    await wb.xlsx.writeFile(templatePath)
    console.log(`Sample template generated at: ${templatePath}`)
    process.exit(0)
  }

  const payload = await getPayload({ config })

  // Ensure inbox directory exists
  const inboxDir = path.resolve('assets/inbox/products')
  if (!fs.existsSync(inboxDir)) {
    fs.mkdirSync(inboxDir, { recursive: true })
  }

  // Check inbox files
  const inboxFiles = fs.readdirSync(inboxDir)
  const normalizedInboxFiles = new Map<string, string[]>()
  for (const f of inboxFiles) {
    const ext = path.extname(f).toLowerCase()
    if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      const base = path.basename(f, ext)
      const cleanBase = base.replace(/[\s_-]+/g, '').toLowerCase()
      // e.g. FC-FL-60120-DC01_1 -> fcfl60120dc01
      const codePart = cleanBase.replace(/\d+$/, '')
      if (!normalizedInboxFiles.has(codePart)) {
        normalizedInboxFiles.set(codePart, [])
      }
      normalizedInboxFiles.get(codePart)!.push(f)
    }
  }

  if (!fs.existsSync(filePath)) {
    console.log(`Notice: No import file found at ${filePath}. Creating sample file for validation run.`)
    const wb = new ExcelJS.Workbook()
    const ws = wb.addWorksheet('Products')
    ws.columns = [
      { header: 'code', key: 'code' },
      { header: 'name', key: 'name' },
      { header: 'category', key: 'category' },
      { header: 'finish', key: 'finish' },
      { header: 'size_width_cm', key: 'size_width_cm' },
      { header: 'size_height_cm', key: 'size_height_cm' },
      { header: 'series', key: 'series' },
      { header: 'colour_family', key: 'colour_family' },
      { header: 'spaces', key: 'spaces' },
      { header: 'slim', key: 'slim' },
      { header: 'heatproof', key: 'heatproof' },
      { header: 'pcs_per_carton', key: 'pcs_per_carton' },
      { header: 'sqm_per_carton', key: 'sqm_per_carton' },
      { header: 'carton_kg', key: 'carton_kg' },
      { header: 'name_bn', key: 'name_bn' },
    ]
    ws.addRow({
      code: 'FC-FL-60120-SAMPLE01',
      name: 'Onyx Alabaster Sample',
      category: 'floor',
      finish: 'Double Charge',
      size_width_cm: 60,
      size_height_cm: 120,
      series: 'Royal Onyx Series',
      colour_family: 'beige',
      spaces: 'Living Room',
      slim: false,
      heatproof: false,
      pcs_per_carton: 2,
      sqm_per_carton: 1.44,
      carton_kg: 34,
      name_bn: 'অনিক্স অ্যালাবাস্টার',
    })
    await wb.xlsx.writeFile(filePath)
    console.log(`Created sample input at: ${filePath}`)
  }

  // Read input
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(filePath)
  const ws = wb.worksheets[0]

  const rows: ImportRow[] = []
  const headerMap: Record<string, number> = {}

  const headerRow = ws.getRow(1)
  headerRow.eachCell((cell, colNumber) => {
    headerMap[String(cell.value).trim()] = colNumber
  })

  for (let r = 2; r <= ws.rowCount; r++) {
    const row = ws.getRow(r)
    const code = row.getCell(headerMap['code'] || 1).text?.trim()
    if (!code) continue

    rows.push({
      code,
      name: row.getCell(headerMap['name'] || 2).text?.trim() || code,
      category: (row.getCell(headerMap['category'] || 3).text?.trim().toLowerCase() as any) || 'floor',
      finish: row.getCell(headerMap['finish'] || 4).text?.trim(),
      size_width_cm: Number(row.getCell(headerMap['size_width_cm'] || 5).value) || 60,
      size_height_cm: Number(row.getCell(headerMap['size_height_cm'] || 6).value) || 60,
      series: row.getCell(headerMap['series'] || 7).text?.trim(),
      colour_family: row.getCell(headerMap['colour_family'] || 8).text?.trim().toLowerCase(),
      spaces: row.getCell(headerMap['spaces'] || 9).text?.trim(),
      slim: String(row.getCell(headerMap['slim'] || 10).value).toLowerCase() === 'true',
      heatproof: String(row.getCell(headerMap['heatproof'] || 11).value).toLowerCase() === 'true',
      pcs_per_carton: Number(row.getCell(headerMap['pcs_per_carton'] || 12).value) || undefined,
      sqm_per_carton: Number(row.getCell(headerMap['sqm_per_carton'] || 13).value) || undefined,
      carton_kg: Number(row.getCell(headerMap['carton_kg'] || 14).value) || undefined,
      name_bn: row.getCell(headerMap['name_bn'] || 15).text?.trim(),
    })
  }

  console.log(`Found ${rows.length} rows to evaluate.`)

  const finishes = await payload.find({ collection: 'finishes', limit: 100 })
  const finishMap = new Map(finishes.docs.map((f: any) => [f.name.toLowerCase(), f.id]))

  const sizes = await payload.find({ collection: 'sizes', limit: 100 })
  const sizeMap = new Map(sizes.docs.map((s: any) => [`${s.widthCm}x${s.heightCm}`, s.id]))

  let createdCount = 0
  let updatedCount = 0
  let rejectedCount = 0

  for (const item of rows) {
    const reasons: string[] = []
    if (!item.code) reasons.push('Missing product code')
    if (!['floor', 'wall'].includes(item.category)) reasons.push(`Invalid category: ${item.category}`)
    
    const finishId = finishMap.get(item.finish?.toLowerCase())
    if (!finishId) reasons.push(`Unknown finish: ${item.finish}`)

    const sizeKey = `${item.size_width_cm}x${item.size_height_cm}`
    const sizeId = sizeMap.get(sizeKey)
    if (!sizeId) reasons.push(`Unknown size: ${sizeKey}`)

    if (reasons.length > 0) {
      rejectedCount++
      console.warn(`[REJECTED] Row ${item.code}: ${reasons.join('; ')}`)
      continue
    }

    const existing = await payload.find({
      collection: 'products',
      where: { code: { equals: item.code } },
    })

    if (existing.totalDocs > 0) {
      updatedCount++
      if (!isDryRun) {
        await payload.update({
          collection: 'products',
          id: existing.docs[0].id,
          data: {
            name: item.name,
            finish: finishId,
            size: sizeId,
            pcsPerCarton: item.pcs_per_carton,
            sqmPerCarton: item.sqm_per_carton,
            cartonKg: item.carton_kg,
            slim: item.slim,
            heatproof: item.heatproof,
          } as any,
        })
      }
    } else {
      createdCount++
      if (!isDryRun) {
        await payload.create({
          collection: 'products',
          data: {
            code: item.code,
            name: item.name,
            slug: item.code.toLowerCase(),
            category: item.category,
            finish: finishId,
            size: sizeId,
            pcsPerCarton: item.pcs_per_carton,
            sqmPerCarton: item.sqm_per_carton,
            cartonKg: item.carton_kg,
            slim: item.slim,
            heatproof: item.heatproof,
            status: 'published',
          } as any,
        })
      }
    }
  }

  console.log(`\n========================================`)
  console.log(`PRODUCT IMPORT REPORT (${isDryRun ? 'DRY RUN' : 'EXECUTED'}):`)
  console.log(`Rows to create:  ${createdCount}`)
  console.log(`Rows to update:  ${updatedCount}`)
  console.log(`Rows rejected:   ${rejectedCount}`)
  console.log(`========================================\n`)

  process.exit(0)
}

run().catch((err) => {
  console.error('Import failed:', err)
  process.exit(1)
})
