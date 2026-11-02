import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import dotenv from 'dotenv'

dotenv.config()

async function backup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupDir = process.env.BACKUP_DIR || 'E:\\FreshBackups'
  const targetDir = path.join(backupDir, `backup_${timestamp}`)

  console.log(`Starting Fresh Ceramics backup to: ${targetDir}`)

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  // 1. Copy SQLite database
  const dbFile = path.resolve('data/fresh.db')
  if (fs.existsSync(dbFile)) {
    const targetDb = path.join(targetDir, 'fresh.db')
    fs.copyFileSync(dbFile, targetDb)
    console.log(`✓ Database backed up to: ${targetDb}`)
  } else {
    console.log('Notice: No fresh.db found yet to back up.')
  }

  // 2. Mirror media directory if it exists
  const mediaDir = path.resolve('media')
  if (fs.existsSync(mediaDir)) {
    const targetMedia = path.join(targetDir, 'media')
    try {
      execSync(`robocopy "${mediaDir}" "${targetMedia}" /E /NP /R:1 /W:1`, { stdio: 'ignore' })
    } catch {
      // robocopy returns non-zero on successful file copy (codes 1-7)
    }
    console.log(`✓ Media files mirrored to: ${targetMedia}`)
  }

  const logMessage = `Backup created on ${new Date().toLocaleString()} at ${targetDir}\n`
  fs.writeFileSync(path.join(targetDir, 'backup.log'), logMessage)
  console.log(`Backup completed successfully! Location: ${targetDir}`)
  console.log(`Tip: For maximum safety, keep a second copy on an external drive or network storage.`)
}

backup().catch((err) => {
  console.error('Backup failed:', err)
  process.exit(1)
})
