import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const checkpointDir = path.resolve('docs/checkpoints/phase10')

test.beforeAll(async () => {
  if (!fs.existsSync(checkpointDir)) {
    fs.mkdirSync(checkpointDir, { recursive: true })
  }
})

test('Phase 10 Gate: Production Smoke - Journey, Catalogue & Shortlist BOQ Schedule', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })

  // 1. Home / Journey
  await page.goto('/')
  await expect(page.locator('h1, h2').first()).toBeVisible()

  // 2. Master Catalogue
  await page.goto('/tiles')
  await expect(page.locator('h1')).toContainText('Architectural Surfaces Catalogue')
  await expect(page.locator('text=385 Designs').first()).toBeVisible()

  // 3. Shortlist with BOQ Schedule
  await page.goto('/shortlist?add=FC-TEST-1')
  await expect(page.locator('text=Material BOQ Schedule').first()).toBeVisible()
  await expect(page.locator('text=Gross Coverage (Inc. 10% Waste)').first()).toBeVisible()
  await expect(page.locator('text=Total Dead Load').first()).toBeVisible()

  // 4. Verify Site Footer
  await expect(page.locator('footer[role="contentinfo"]')).toBeVisible()
  await expect(page.locator('footer').getByText('16595').first()).toBeVisible()
  await expect(page.locator('footer').getByText('Meghnaghat, Sonargaon, Narayanganj').first()).toBeVisible()

  // Save desktop checkpoint
  await page.screenshot({ path: path.join(checkpointDir, 'desktop_phase10_1440x900.png'), fullPage: false })
})

test('Phase 10 Gate: Production Smoke - Showroom Locator & Admin Panel', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })

  // Showroom Locator
  await page.goto('/showrooms')
  await expect(page.locator('h1')).toContainText('Nearest Showroom')
  await expect(page.locator('text=Flagship Display Centres').first()).toBeVisible()

  // Admin Panel
  await page.goto('/admin')
  await page.waitForLoadState('domcontentloaded')
  await expect(page.locator('body')).toBeVisible()
})

test('Phase 10 Gate: Production Smoke - Mobile Profile Checkpoint (390x844)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.locator('main').first()).toBeVisible()
  await page.screenshot({ path: path.join(checkpointDir, 'mobile_phase10_390x844.png'), fullPage: false })
})
