import { getPayload } from 'payload'
import config from '../src/payload.config'
import dotenv from 'dotenv'
import ExcelJS from 'exceljs'
import fs from 'fs'
import path from 'path'

dotenv.config()

interface ShowroomRow {
  name: string
  tier: 'flagship' | 'exclusive' | 'dealer'
  division: string
  district: string
  thana?: string
  address: string
  phone?: string
  hours?: string
  latitude?: number
  longitude?: number
  name_bn?: string
  address_bn?: string
}

async function run() {
  const isDryRun = process.argv.includes('--dry-run')
  const generateTemplate = process.argv.includes('--template')
  const filePath = process.argv.find((arg) => arg.endsWith('.csv') || arg.endsWith('.xlsx')) || 'assets/inbox/showrooms/showrooms_import.xlsx'

  console.log(`\n========================================`)
  console.log(`Fresh Ceramics Showroom Import Utility`)
  console.log(`Mode: ${isDryRun ? 'DRY RUN (Validation only)' : 'LIVE IMPORT'}`)
  console.log(`Target: ${filePath}`)
  console.log(`========================================\n`)

  if (generateTemplate) {
    const templatePath = path.resolve('assets/inbox/showrooms/showroom_import_template.xlsx')
    const wb = new ExcelJS.Workbook()
    const ws = wb.addWorksheet('Showrooms Template')
    ws.columns = [
      { header: 'name', key: 'name', width: 30 },
      { header: 'tier', key: 'tier', width: 15 },
      { header: 'division', key: 'division', width: 15 },
      { header: 'district', key: 'district', width: 15 },
      { header: 'thana', key: 'thana', width: 15 },
      { header: 'address', key: 'address', width: 40 },
      { header: 'phone', key: 'phone', width: 15 },
      { header: 'hours', key: 'hours', width: 25 },
      { header: 'latitude', key: 'latitude', width: 12 },
      { header: 'longitude', key: 'longitude', width: 12 },
      { header: 'name_bn', key: 'name_bn', width: 30 },
      { header: 'address_bn', key: 'address_bn', width: 40 },
    ]
    ws.addRow({
      name: 'Fresh Ceramics House of Aesthetics',
      tier: 'flagship',
      division: 'Dhaka',
      district: 'Dhaka',
      thana: 'Hatirpool',
      address: '22/1 Sonargaon Road, Hatirpool, Dhaka',
      phone: '16595',
      hours: 'Sat-Thu 9am-8pm',
      latitude: 23.7461,
      longitude: 90.3924,
      name_bn: 'ফ্রেশ সিরামিকস হাউস অব এস্থেটিকস',
      address_bn: '২২/১ সোনারগাঁও রোড, হাতিরপুল, ঢাকা',
    })
    fs.mkdirSync(path.dirname(templatePath), { recursive: true })
    await wb.xlsx.writeFile(templatePath)
    console.log(`Sample showroom template generated at: ${templatePath}`)
    process.exit(0)
  }

  const payload = await getPayload({ config })

  if (!fs.existsSync(filePath)) {
    console.log(`Notice: No import file found at ${filePath}. Creating sample file for validation run.`)
    const wb = new ExcelJS.Workbook()
    const ws = wb.addWorksheet('Showrooms')
    ws.columns = [
      { header: 'name', key: 'name' },
      { header: 'tier', key: 'tier' },
      { header: 'division', key: 'division' },
      { header: 'district', key: 'district' },
      { header: 'thana', key: 'thana' },
      { header: 'address', key: 'address' },
      { header: 'phone', key: 'phone' },
      { header: 'hours', key: 'hours' },
      { header: 'latitude', key: 'latitude' },
      { header: 'longitude', key: 'longitude' },
      { header: 'name_bn', key: 'name_bn' },
      { header: 'address_bn', key: 'address_bn' },
    ]
    ws.addRow({
      name: 'Sample Exclusive Showroom - Dhanmondi',
      tier: 'exclusive',
      division: 'Dhaka',
      district: 'Dhaka',
      thana: 'Dhanmondi',
      address: 'Road 27, Dhanmondi, Dhaka',
      phone: '16595',
      hours: 'Sat-Thu 9am-8pm',
      latitude: 23.7538,
      longitude: 90.3768,
      name_bn: 'স্যাম্পল এক্সক্লুসিভ শোরুম - ধানমন্ডি',
      address_bn: 'রোড ২৭, ধানমন্ডি, ঢাকা',
    })
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    await wb.xlsx.writeFile(filePath)
    console.log(`Created sample input at: ${filePath}`)
  }

  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(filePath)
  const ws = wb.worksheets[0]

  const rows: ShowroomRow[] = []
  const headerMap: Record<string, number> = {}

  const headerRow = ws.getRow(1)
  headerRow.eachCell((cell, colNumber) => {
    headerMap[String(cell.value).trim()] = colNumber
  })

  for (let r = 2; r <= ws.rowCount; r++) {
    const row = ws.getRow(r)
    const name = row.getCell(headerMap['name'] || 1).text?.trim()
    if (!name) continue

    const tier = (row.getCell(headerMap['tier'] || 2).text?.trim().toLowerCase() as any) || 'exclusive'
    const division = row.getCell(headerMap['division'] || 3).text?.trim() || 'Dhaka'
    const district = row.getCell(headerMap['district'] || 4).text?.trim() || division
    const thana = row.getCell(headerMap['thana'] || 5).text?.trim()
    const address = row.getCell(headerMap['address'] || 6).text?.trim() || name
    const phone = row.getCell(headerMap['phone'] || 7).text?.trim() || '16595'
    const hours = row.getCell(headerMap['hours'] || 8).text?.trim() || 'Sat - Thu: 9:00 AM - 8:00 PM'
    const lat = Number(row.getCell(headerMap['latitude'] || 9).value) || undefined
    const lng = Number(row.getCell(headerMap['longitude'] || 10).value) || undefined

    rows.push({
      name,
      tier: ['flagship', 'exclusive', 'dealer'].includes(tier) ? tier : 'exclusive',
      division,
      district,
      thana,
      address,
      phone,
      hours,
      latitude: lat,
      longitude: lng,
    })
  }

  let createdCount = 0
  let updatedCount = 0
  let rejectedCount = 0

  for (const item of rows) {
    const reasons: string[] = []
    if (!item.name) reasons.push('Missing showroom name')
    if (!item.address) reasons.push('Missing address')
    if (!item.division) reasons.push('Missing division')

    if (reasons.length > 0) {
      rejectedCount++
      console.warn(`[REJECTED] Showroom ${item.name}: ${reasons.join('; ')}`)
      continue
    }

    const existing = await payload.find({
      collection: 'showrooms',
      where: { name: { equals: item.name } },
    })

    if (existing.totalDocs > 0) {
      updatedCount++
      if (!isDryRun) {
        await payload.update({
          collection: 'showrooms',
          id: existing.docs[0].id,
          data: {
            tier: item.tier,
            division: item.division,
            district: item.district,
            thana: item.thana,
            address: item.address,
            phone: item.phone,
            hours: item.hours,
            latitude: item.latitude,
            longitude: item.longitude,
          } as any,
        })
      }
    } else {
      createdCount++
      if (!isDryRun) {
        await payload.create({
          collection: 'showrooms',
          data: {
            name: item.name,
            tier: item.tier,
            division: item.division,
            district: item.district,
            thana: item.thana,
            address: item.address,
            phone: item.phone,
            hours: item.hours,
            latitude: item.latitude,
            longitude: item.longitude,
            placeholder: false,
          } as any,
        })
      }
    }
  }

  console.log(`\n========================================`)
  console.log(`SHOWROOM IMPORT REPORT (${isDryRun ? 'DRY RUN' : 'EXECUTED'}):`)
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
