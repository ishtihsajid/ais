import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const checkpointDir = path.resolve('docs/checkpoints/phase5')

test.beforeAll(async () => {
  if (!fs.existsSync(checkpointDir)) {
    fs.mkdirSync(checkpointDir, { recursive: true })
  }
})

test('Phase 5 Gate: Journey III Desktop (1440x900) - Chapters 8-10, Header Mode Control, Deep Links & Vision', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/?noprelude=1')

  // 1. Header and Journey / Catalogue segmented control
  const header = page.locator('header')
  await expect(header).toBeVisible()
  const catalogueBtn = page.locator('a:has-text("Catalogue")').first()
  await expect(catalogueBtn).toBeVisible()
  await expect(catalogueBtn).toHaveAttribute('href', '/tiles')

  // 2. Chapter 8: Home
  const ch8 = page.locator('#home')
  await ch8.scrollIntoViewIfNeeded()
  await expect(ch8).toBeVisible()
  await expect(ch8.locator('h2')).toContainText('room by room')
  await expect(page.locator('text=See Every Space')).toBeVisible()

  // 3. Chapter 9: Beyond
  const ch9 = page.locator('#beyond')
  await ch9.scrollIntoViewIfNeeded()
  await expect(ch9).toBeVisible()
  await expect(ch9.locator('h2')).toContainText('What we owe beyond the tile')
  await expect(page.locator('text=Knowledge Sharing Masterclass Series')).toBeVisible()
  await expect(page.locator('text=Nationwide Fitter Meets')).toBeVisible()

  // 4. Chapter 10: Horizon
  const ch10 = page.locator('#horizon')
  await ch10.scrollIntoViewIfNeeded()
  await expect(ch10).toBeVisible()
  await expect(ch10.locator('h2')).toContainText('Dawn again')
  await expect(page.locator('text=Fresh stands for superior quality and strong sustainability values.')).toBeVisible()
  await expect(page.locator('text=To choose Fresh is to choose better quality, responsible manufacturing and a more sustainable future.')).toBeVisible()

  // Conversion action buttons
  await expect(ch10.locator('a:has-text("Find a Showroom")')).toBeVisible()
  await expect(ch10.locator('a:has-text("Browse All Tiles")')).toBeVisible()
  await expect(ch10.locator('a:has-text("Download Catalog")')).toBeVisible()

  // Save desktop screenshot
  await page.screenshot({ path: path.join(checkpointDir, 'desktop_journey_phase5_1440x900.png'), fullPage: false })
})

test('Phase 5 Gate: Journey III Mobile (390x844) - Full Narrative Flow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?noprelude=1')

  const ch10 = page.locator('#horizon')
  await ch10.scrollIntoViewIfNeeded()
  await expect(ch10).toBeVisible()
  await expect(page.locator('text=Fresh stands for superior quality and strong sustainability values.')).toBeVisible()

  // Save mobile screenshot
  await page.screenshot({ path: path.join(checkpointDir, 'mobile_journey_phase5_390x844.png'), fullPage: false })
})
