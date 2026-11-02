import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const checkpointDir = path.resolve('docs/checkpoints/phase8')

test.beforeAll(async () => {
  if (!fs.existsSync(checkpointDir)) {
    fs.mkdirSync(checkpointDir, { recursive: true })
  }
})

test('Phase 8 Gate: Heatproof Tiles Route Resolves & Matches Facts Register', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/heatproof-tiles')

  await expect(page.locator('h1')).toContainText('Heatproof Tiles')
  await expect(page.locator('text=Up to 30%').first()).toBeVisible()
  await expect(page.locator('text=SDG 11').first()).toBeVisible()
  await expect(page.locator('text=Lighter on the building').first()).toBeVisible()
})

test('Phase 8 Gate: Fitters Community Page (নান্দনিকতার কারিগর)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/fitters')

  await expect(page.locator('text=নান্দনিকতার কারিগর').first()).toBeVisible()
  await expect(page.locator('text=Ultra Fine Squaring').first()).toBeVisible()
  await expect(page.locator('text=Corner Caps & Poly Wrap').first()).toBeVisible()
  await expect(page.locator('input[name="phone"]')).toBeVisible()
})

test('Phase 8 Gate: Professionals Architecture & Specifier Portal', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/professionals')

  await expect(page.locator('h1')).toContainText('Specifiers')
  await expect(page.locator('text=Sample Requisition').first()).toBeVisible()
  await expect(page.locator('text=CSI 09 30 00 Specs').first()).toBeVisible()
  await expect(page.locator('text=WhatsApp Trade Desk').first()).toBeVisible()
})

test('Phase 8 Gate: Learn Knowledge Hub & Guide Detail Page', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/learn')

  await expect(page.locator('h1')).toContainText('Learn:')
  await expect(page.locator('text=Understanding Water Absorption').first()).toBeVisible()

  // Navigate to Guide Detail
  await page.goto('/learn/water-absorption-porcelain-vs-ceramic')
  await expect(page.locator('h1')).toContainText('Understanding Water Absorption')
  await expect(page.locator('text=Group BIa').first()).toBeVisible()
})

test('Phase 8 Gate: Brand Initiatives Index & Detail Page (Stubs Verified)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/initiatives')

  await expect(page.locator('h1')).toContainText('What We Owe')
  await expect(page.locator('text=Nationwide Fitter Meets').first()).toBeVisible()
  await expect(page.locator('text=Eid Express').first()).toBeVisible()

  // Detail Page with Owner Marker
  await page.goto('/initiatives/the-fresh-pod')
  await expect(page.locator('text=[OWNER TO SUPPLY: name, what it is, where, when, photographs]').first()).toBeVisible()
})

test('Phase 8 Gate: News & Events Route & Detail Page', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/news')

  await expect(page.locator('h1')).toContainText('News & Events')
  await expect(page.locator('text=Fresh Ceramics Inaugurates Flagship').first()).toBeVisible()

  await page.goto('/news/flagship-display-centre-openings')
  await expect(page.locator('h1')).toContainText('Flagship Display Centres')
})

test('Phase 8 Gate: FAQ, Visualizer, Privacy & Terms Routes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })

  // FAQ
  await page.goto('/faq')
  await expect(page.locator('h1')).toContainText('Questions & Answers')
  await expect(page.locator('text=Meghnaghat, Sonargaon, Narayanganj').first()).toBeVisible()

  // Visualizer Coming Soon
  await page.goto('/visualizer')
  await expect(page.locator('h1')).toContainText('Virtual Room Visualizer')
  await expect(page.locator('text=Coming Soon').first()).toBeVisible()

  // Privacy
  await page.goto('/privacy')
  await expect(page.locator('h1')).toContainText('Privacy Policy')
  await expect(page.locator('text=Zero Third-Party Tracking').first()).toBeVisible()

  // Terms
  await page.goto('/terms')
  await expect(page.locator('h1')).toContainText('Terms of Service')
  await expect(page.locator('text=98% A-Grade Export Quality').first()).toBeVisible()
})

test('Phase 8 Gate: Luxury UX Enhancements on Shortlist & PDP', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })

  // Shortlist Material BOQ Schedule
  await page.goto('/shortlist?add=FC-TEST-1')
  await expect(page.locator('text=Material BOQ Schedule').first()).toBeVisible()
  await expect(page.locator('text=Total Cartons Required').first()).toBeVisible()
  await expect(page.locator('text=Total Dead Load').first()).toBeVisible()

  // Capture Phase 8 Desktop Checkpoint
  await page.screenshot({ path: path.join(checkpointDir, 'desktop_phase8_1440x900.png'), fullPage: false })

  // Capture Phase 8 Mobile Checkpoint
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/heatproof-tiles')
  await page.screenshot({ path: path.join(checkpointDir, 'mobile_phase8_390x844.png'), fullPage: false })
})
