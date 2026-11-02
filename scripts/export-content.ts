import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import dotenv from 'dotenv'

dotenv.config()

async function exportContent() {
  console.log('Starting content export (excluding users and enquiries)...')

  const exportDir = path.resolve('content-export')
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true })
  }

  const payload = await getPayload({ config })

  const collectionsToExport = [
    'products',
    'finishes',
    'sizes',
    'series',
    'spaces',
    'interiors',
    'catalogs',
    'showrooms',
    'initiatives',
    'voices',
    'articles',
    'claims',
  ] as const

  for (const slug of collectionsToExport) {
    try {
      const result = await payload.find({
        collection: slug,
        limit: 1000,
        depth: 1,
      })
      const filePath = path.join(exportDir, `${slug}.json`)
      fs.writeFileSync(filePath, JSON.stringify(result.docs, null, 2), 'utf-8')
      console.log(`✓ Exported ${result.totalDocs} records from '${slug}' to ${slug}.json`)
    } catch (err: any) {
      console.warn(`! Note for collection '${slug}':`, err.message)
    }
  }

  // Export globals
  const globalsToExport = ['stats', 'site-settings', 'journey'] as const
  for (const globalSlug of globalsToExport) {
    try {
      const data = await payload.findGlobal({
        slug: globalSlug,
      })
      const filePath = path.join(exportDir, `global_${globalSlug}.json`)
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
      console.log(`✓ Exported global '${globalSlug}' to global_${globalSlug}.json`)
    } catch (err: any) {
      console.warn(`! Note for global '${globalSlug}':`, err.message)
    }
  }

  console.log(`Content export completed successfully in: ${exportDir}`)
  process.exit(0)
}

exportContent().catch((err) => {
  console.error('Export failed:', err)
  process.exit(1)
})
