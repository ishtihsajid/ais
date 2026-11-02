import fs from 'fs'
import path from 'path'
import { DatabaseSync } from 'node:sqlite'

async function testRestore() {
  console.log('Testing restore from backup on a clean directory...')

  const backupBaseDir = process.env.BACKUP_DIR || 'E:\\FreshBackups'
  if (!fs.existsSync(backupBaseDir)) {
    throw new Error(`Backup base directory does not exist: ${backupBaseDir}`)
  }

  // Find latest backup folder
  const backups = fs
    .readdirSync(backupBaseDir)
    .filter((f) => f.startsWith('backup_'))
    .sort()
    .reverse()

  if (backups.length === 0) {
    throw new Error('No backup folders found in ' + backupBaseDir)
  }

  const latestBackup = path.join(backupBaseDir, backups[0])
  const backupDb = path.join(latestBackup, 'fresh.db')
  console.log(`Using latest backup: ${latestBackup}`)

  if (!fs.existsSync(backupDb)) {
    throw new Error(`Backup DB does not exist at: ${backupDb}`)
  }

  // Clean test folder
  const testRestoreDir = path.resolve('tmp/restore_test')
  if (fs.existsSync(testRestoreDir)) {
    fs.rmSync(testRestoreDir, { recursive: true, force: true })
  }
  fs.mkdirSync(testRestoreDir, { recursive: true })

  // Restore DB file
  const restoredDbPath = path.join(testRestoreDir, 'fresh.db')
  fs.copyFileSync(backupDb, restoredDbPath)
  console.log(`✓ Restored fresh.db to clean folder: ${restoredDbPath}`)

  // Verify integrity and product count
  const db = new DatabaseSync(restoredDbPath)
  const result = db.prepare('SELECT count(*) as count FROM products').get() as { count: number }
  console.log(`✓ Integrity check: Found ${result.count} products in restored database.`)

  if (result.count !== 385) {
    throw new Error(`Expected 385 products, but found ${result.count}`)
  }

  // Verify showroom count
  const showroomResult = db.prepare('SELECT count(*) as count FROM showrooms').get() as { count: number }
  console.log(`✓ Integrity check: Found ${showroomResult.count} showrooms in restored database.`)

  db.close()
  fs.rmSync(testRestoreDir, { recursive: true, force: true })
  console.log('✓ Cleaned up temporary test folder.')
  console.log('Phase 10 Restore Gate PASSED successfully!')
}

testRestore().catch((err) => {
  console.error('Restore test failed:', err)
  process.exit(1)
})
