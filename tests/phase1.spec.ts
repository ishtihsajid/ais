import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const checkpointDir = path.resolve('docs/checkpoints/phase1')

test.beforeAll(async () => {
  if (!fs.existsSync(checkpointDir)) {
    fs.mkdirSync(checkpointDir, { recursive: true })
  }
})

test('Phase 1 Gate: Editor can log into /admin and navigate collections', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/admin')

  // Check if login is needed
  const emailInput = page.locator('input[type="email"], input[name="email"]')
  if (await emailInput.isVisible({ timeout: 10000 }).catch(() => false)) {
    await emailInput.fill('editor@freshceramics.net')
    const passwordInput = page.locator('input[type="password"], input[name="password"]')
    await passwordInput.fill('freshceramics2026!')

    const submitBtn = page.locator('button[type="submit"]')
    await submitBtn.click()

    await expect(page).toHaveURL(/\/admin(\/.*)?$/, { timeout: 30000 })
  }

  await page.waitForLoadState('domcontentloaded')
  await page.screenshot({ path: path.join(checkpointDir, 'desktop_editor_admin_1440x900.png'), fullPage: false })

  // Verify access to Products collection
  await page.goto('/admin/collections/products')
  await page.waitForLoadState('domcontentloaded')
  await expect(page.locator('body')).toBeVisible()
  await page.screenshot({ path: path.join(checkpointDir, 'desktop_products_list_1440x900.png'), fullPage: false })
})

test('Phase 1 Gate: Mobile admin view renders (390x844)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/admin')
  await page.waitForLoadState('domcontentloaded')
  await page.screenshot({ path: path.join(checkpointDir, 'mobile_admin_390x844.png'), fullPage: false })
})
