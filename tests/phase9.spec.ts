import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const checkpointDir = path.resolve('docs/checkpoints/phase9')

test.beforeAll(async () => {
  if (!fs.existsSync(checkpointDir)) {
    fs.mkdirSync(checkpointDir, { recursive: true })
  }
})

test('Phase 9 Gate: Dynamic Sitemap & Robots.txt SEO Routing', async ({ request }) => {
  // 1. Verify robots.txt
  const robotsRes = await request.get('/robots.txt')
  expect(robotsRes.status()).toBe(200)
  const robotsText = await robotsRes.text()
  expect(robotsText).toContain('Disallow: /admin/')
  expect(robotsText).toContain('sitemap.xml')

  // 2. Verify sitemap.xml
  const sitemapRes = await request.get('/sitemap.xml')
  expect(sitemapRes.status()).toBe(200)
  const sitemapText = await sitemapRes.text()
  expect(sitemapText).toContain('<urlset')
  expect(sitemapText).toContain('/bn/tiles')
  expect(sitemapText).toContain('/heatproof-tiles')
  expect(sitemapText).toContain('/showrooms')
})

test('Phase 9 Gate: Bengali Localization & Typography', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/bn')

  // Verify Bengali texts and skip link
  await expect(page.locator('a:has-text("ক্যাটালগ")').first()).toBeVisible()

  // Navigate to Bengali Tiles Catalog
  await page.goto('/bn/tiles')
  await expect(page.locator('h1')).toBeVisible()

  // Navigate to Bengali Fitters page
  await page.goto('/bn/fitters')
  await expect(page.locator('text=নান্দনিকতার কারিগর').first()).toBeVisible()
})

test('Phase 9 Gate: Reduced Motion & Low-Power Accessibility', async ({ page }) => {
  // Emulate prefers-reduced-motion: reduce
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')

  // Verify Journey mounts without errors under reduced motion
  await expect(page.locator('main').first()).toBeVisible()
  await expect(page.locator('text=A Fresh Start').first()).toBeVisible()

  // Save desktop checkpoint
  await page.screenshot({ path: path.join(checkpointDir, 'desktop_phase9_1440x900.png'), fullPage: false })

  // Emulate Mobile profile
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/bn/tiles')
  await page.screenshot({ path: path.join(checkpointDir, 'mobile_phase9_390x844.png'), fullPage: false })
})
