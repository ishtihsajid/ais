import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const checkpointDir = path.resolve('docs/checkpoints/phase4')

test.beforeAll(async () => {
  if (!fs.existsSync(checkpointDir)) {
    fs.mkdirSync(checkpointDir, { recursive: true })
  }
})

test('Phase 4 Gate: Journey II Desktop (1440x900) - Chapters 4-7, Slim Calculator Acceptance, Map & Hands', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/?noprelude=1')

  // 1. Chapter 4: Surface
  const ch4 = page.locator('#surface')
  await ch4.scrollIntoViewIfNeeded()
  await expect(ch4).toBeVisible()
  await expect(ch4.locator('h2')).toContainText('Surfaces for every kind of life')
  await expect(page.locator('button:has-text("Floor (204 designs)")')).toBeVisible()
  await expect(page.locator('button:has-text("Wall (181 designs)")')).toBeVisible()
  await expect(page.locator('text=The Only Full Double Charge Line in Bangladesh')).toBeVisible()

  // 2. Chapter 5: Lighter - Acceptance Test for Calculator (Section 7.3)
  const ch5 = page.locator('#lighter')
  await ch5.scrollIntoViewIfNeeded()
  await expect(ch5).toBeVisible()
  await expect(page.locator('text=Slim Tiles Dead-Load Calculator')).toBeVisible()

  // Variant A at default 5,000 sq ft & 10 storeys: expect 25.3 MT and 19 cars
  await expect(page.locator('text=25.3 MT')).toBeVisible()
  await expect(page.locator('text=19 cars')).toBeVisible()

  // Switch to Variant B: expect 33.5 MT and 25 cars
  await page.locator('button:has-text("Variant B")').click()
  await expect(page.locator('text=33.5 MT')).toBeVisible()
  await expect(page.locator('text=25 cars')).toBeVisible()

  // Verify Heatproof side and SDG 11
  await expect(page.locator('text=Up to 30% Energy Saving')).toBeVisible()
  await expect(page.locator('text=UN Sustainable Development Goal 11')).toBeVisible()

  // 3. Chapter 6: Reach
  const ch6 = page.locator('#reach')
  await ch6.scrollIntoViewIfNeeded()
  await expect(ch6).toBeVisible()
  await expect(ch6.locator('h2')).toContainText('Within your reach')
  await expect(page.locator('text=Exclusive Showrooms').first()).toBeVisible()
  await expect(page.locator('text=Flagship Centres').first()).toBeVisible()
  await expect(page.locator('text=Authorised Dealers').first()).toBeVisible()
  await expect(page.locator('text=Delivery within 4 days from authorised showrooms')).toBeVisible()

  // 4. Chapter 7: Hands
  const ch7 = page.locator('#hands')
  await ch7.scrollIntoViewIfNeeded()
  await expect(ch7).toBeVisible()
  await expect(page.locator('text=নান্দনিকতার কারিগর').first()).toBeVisible()
  await expect(ch7.locator('h2')).toContainText('Finished by hand')
  await expect(page.locator('text=For Fitters').first()).toBeVisible()

  // Save desktop screenshot
  await page.screenshot({ path: path.join(checkpointDir, 'desktop_journey_phase4_1440x900.png'), fullPage: false })
})

test('Phase 4 Gate: Journey II Mobile (390x844)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?noprelude=1')

  const ch5 = page.locator('#lighter')
  await ch5.scrollIntoViewIfNeeded()
  await expect(ch5).toBeVisible()
  await expect(page.locator('text=25.3 MT')).toBeVisible()

  // Save mobile screenshot
  await page.screenshot({ path: path.join(checkpointDir, 'mobile_journey_phase4_390x844.png'), fullPage: false })
})
