import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const checkpointDir = path.resolve('docs/checkpoints/phase7')

test.beforeAll(async () => {
  if (!fs.existsSync(checkpointDir)) {
    fs.mkdirSync(checkpointDir, { recursive: true })
  }
})

test('Phase 7 Gate: Showroom Locator Desktop (1440x900) - 3 Tiers, Nearest Search & Direction Links', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/showrooms')

  // Verify headers and tier counters
  await expect(page.locator('h1')).toContainText('Nearest Showroom')
  await expect(page.locator('text=02 Flagship Display Centres').first()).toBeVisible()
  await expect(page.locator('text=79 Exclusive Showrooms').first()).toBeVisible()
  await expect(page.locator('text=120+ Authorised Dealers').first()).toBeVisible()

  // Filter by Division: Chattogram
  const divisionSelect = page.locator('select')
  await divisionSelect.selectOption('chattogram')
  await expect(page.locator('h3:has-text("Chattogram Flagship Display Centre")')).toBeVisible()

  // Filter by Tier: Flagship Only
  await page.locator('button:has-text("Flagship Only")').click()
  await expect(page.locator('h3:has-text("Chattogram Flagship Display Centre")')).toBeVisible()

  // Verify phone and directions link
  await expect(page.locator('a[href*="maps/search"]').first()).toBeVisible()

  // Save desktop screenshot
  await page.screenshot({ path: path.join(checkpointDir, 'desktop_places_phase7_1440x900.png'), fullPage: false })
})

test('Phase 7 Gate: Contact & Project Specification Form Submission', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/contact')

  await expect(page.locator('h1')).toContainText('Connect with Fresh Ceramics')
  await expect(page.locator('text=16595').first()).toBeVisible()

  // Fill and submit form
  await page.fill('input[placeholder*="Rafiqul"]', 'Ar. Test Specifier')
  await page.fill('input[placeholder*="017"]', '01711998877')
  await page.fill('input[placeholder*="name@studio.com"]', 'specifier@architecture.com')
  await page.fill('input[placeholder*="Gulshan"]', 'Dhaka')
  await page.fill('textarea', 'Requesting full specification schedule and samples for 10-storey commercial tower.')

  await page.click('button:has-text("Submit Enquiry")')

  // Verify confirmation view
  await expect(page.locator('text=Enquiry Received')).toBeVisible({ timeout: 30000 })
  await expect(page.locator('text=Reference ID:')).toBeVisible()
})

test('Phase 7 Gate: Become a Dealer Application Submission', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/become-a-dealer')

  await expect(page.locator('h1')).toContainText('Become an Authorised Fresh Dealer')

  // Fill dealer application
  await page.fill('input[placeholder*="Modern Ceramics"]', 'Apex Tile Gallery')
  await page.fill('input[placeholder*="Mohammad"]', 'Md. Kamal Uddin')
  await page.fill('input[placeholder*="017"]', '01822334455')
  await page.fill('input[placeholder*="Bogura"]', 'Chattogram')
  await page.fill('input[placeholder*="2500"]', '3200')
  await page.fill('input[placeholder*="8"]', '12')

  await page.click('button:has-text("Submit Dealership Application")')

  // Verify confirmation view
  await expect(page.locator('text=Application Submitted')).toBeVisible({ timeout: 30000 })
})

test('Phase 7 Gate: Showroom Locator Mobile View (390x844)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/showrooms')
  await expect(page.locator('h1')).toBeVisible()
  await page.screenshot({ path: path.join(checkpointDir, 'mobile_places_phase7_390x844.png'), fullPage: false })
})
