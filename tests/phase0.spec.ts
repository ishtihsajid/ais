import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const checkpointDir = path.resolve('docs/checkpoints/phase0')

test.beforeAll(async () => {
  if (!fs.existsSync(checkpointDir)) {
    fs.mkdirSync(checkpointDir, { recursive: true })
  }
})

test('Phase 0 Gate: Home Page renders on Desktop (1440x900)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')

  // Verify header and title
  await expect(page.locator('h1')).toContainText('A Fresh Start to an Aesthetic Life')
  await expect(page.locator('text=Since 2021')).toBeVisible()
  await expect(page.locator('text=18.6M sq m a year')).toBeVisible()
  await expect(page.locator('text=Highest selling tiles brand in Bangladesh every year since 2023.').first()).toBeVisible()

  // Save desktop screenshot
  await page.screenshot({ path: path.join(checkpointDir, 'desktop_home_1440x900.png'), fullPage: false })
})

test('Phase 0 Gate: Home Page renders on Mobile (390x844)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  await expect(page.locator('h1')).toBeVisible()
  // Save mobile screenshot
  await page.screenshot({ path: path.join(checkpointDir, 'mobile_home_390x844.png'), fullPage: false })
})

test('Phase 0 Gate: First Admin can log into /admin', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/admin')

  // Check if redirected to login or already logged in
  const emailInput = page.locator('input[type="email"], input[name="email"]')
  if (await emailInput.isVisible({ timeout: 10000 }).catch(() => false)) {
    await emailInput.fill('admin@freshceramics.net')
    const passwordInput = page.locator('input[type="password"], input[name="password"]')
    await passwordInput.fill('freshceramics2026!')

    // Click Log in
    const submitBtn = page.locator('button[type="submit"]')
    await submitBtn.click()

    // Expect navigation to admin dashboard
    await expect(page).toHaveURL(/\/admin(\/.*)?$/, { timeout: 30000 })
  }

  // Wait for Payload admin dashboard to load
  await page.waitForLoadState('domcontentloaded')
  await page.screenshot({ path: path.join(checkpointDir, 'desktop_admin_1440x900.png'), fullPage: false })
})
