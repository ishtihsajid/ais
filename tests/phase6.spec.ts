import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const checkpointDir = path.resolve('docs/checkpoints/phase6')

test.beforeAll(async () => {
  if (!fs.existsSync(checkpointDir)) {
    fs.mkdirSync(checkpointDir, { recursive: true })
  }
})

test('Phase 6 Gate: Catalogue Core Desktop (1440x900) - 385 Product Filters & Shortlist Roundtrip', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })

  // 1. Visit /tiles
  await page.goto('/tiles')

  // Verify catalogue header and initial 385 count
  await expect(page.locator('h1')).toContainText('Architectural Surfaces')
  await expect(page.locator('button:has-text("All Designs (385)")')).toBeVisible()
  await expect(page.locator('text=Showing 385 of 385 designs')).toBeVisible()

  // 2. Filter by Floor Tiles (204) without reload
  await page.locator('button:has-text("Floor Tiles (204)")').click()
  await expect(page.locator('text=Showing 204 of 385 designs')).toBeVisible()

  // 3. Filter by Wall Tiles (181) without reload
  await page.locator('button:has-text("Wall Tiles (181)")').click()
  await expect(page.locator('text=Showing 181 of 385 designs')).toBeVisible()

  // 4. Return to All and test search filtering
  await page.locator('button:has-text("All Designs (385)")').click()
  const searchInput = page.locator('input[placeholder*="Search name, code, finish"]')
  await searchInput.fill('DC01')
  // Should instantly filter
  await expect(page.locator('.product-card').first()).toBeVisible()

  // 5. Shortlist a product
  const shortlistBtn = page.locator('.product-card button[aria-label*="Shortlist"]').first()
  await shortlistBtn.click()
  await expect(page.locator('a:has-text("Shortlist (1)")').first()).toBeVisible()

  // 6. Navigate to /shortlist
  await page.goto('/shortlist')
  await expect(page.locator('h1')).toContainText('Curated Shortlist')
  await expect(page.locator('text=Ready to specify or request samples?')).toBeVisible()

  // 7. Verify round trip back to catalogue
  await page.goto('/tiles')
  await expect(page.locator('a:has-text("Shortlist (1)")').first()).toBeVisible()

  // Save desktop screenshot
  await page.screenshot({ path: path.join(checkpointDir, 'desktop_catalogue_phase6_1440x900.png'), fullPage: false })
})

test('Phase 6 Gate: Ancillary Catalogue Routes (/collections, /spaces, /downloads, /search)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })

  // Collections
  await page.goto('/collections')
  await expect(page.locator('h1')).toContainText('Curated Collections')
  await expect(page.locator('h3:has-text("Double Charge")')).toBeVisible()

  // Spaces
  await page.goto('/spaces')
  await expect(page.locator('h1')).toContainText('Explore by Space')
  await expect(page.locator('text=Architectural Living Spaces')).toBeVisible()

  // Downloads
  await page.goto('/downloads')
  await expect(page.locator('h1')).toContainText('Downloads & Catalogs')
  await expect(page.locator('text=Fresh Ceramics Master Architectural Catalogue 2026')).toBeVisible()

  // Search
  await page.goto('/search?q=Double')
  await expect(page.locator('h1')).toContainText('Search Fresh Ceramics')
  await expect(page.locator('text=RESULTS')).toBeVisible()
})

test('Phase 6 Gate: Catalogue Mobile View (390x844)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/tiles')
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.locator('button:has-text("Floor Tiles (204)")')).toBeVisible()

  // Save mobile screenshot
  await page.screenshot({ path: path.join(checkpointDir, 'mobile_catalogue_phase6_390x844.png'), fullPage: false })
})
