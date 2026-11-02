import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const checkpointDir = path.resolve('docs/checkpoints/phase2')

test.beforeAll(async () => {
  if (!fs.existsSync(checkpointDir)) {
    fs.mkdirSync(checkpointDir, { recursive: true })
  }
})

test('Phase 2 Gate: OpenSeadragon Deep Zoom renders on Desktop (1440x900)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/en/test-zoom')

  await expect(page.locator('h1')).toContainText('OpenSeadragon Deep Zoom')
  await expect(page.locator('#osd-zoom-in')).toBeVisible({ timeout: 15000 })
  await expect(page.locator('#osd-zoom-out')).toBeVisible()

  // Save desktop screenshot
  await page.screenshot({ path: path.join(checkpointDir, 'desktop_deep_zoom_1440x900.png'), fullPage: false })
})

test('Phase 2 Gate: OpenSeadragon Deep Zoom renders on Mobile (390x844)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en/test-zoom')

  await expect(page.locator('h1')).toBeVisible()
  await page.screenshot({ path: path.join(checkpointDir, 'mobile_deep_zoom_390x844.png'), fullPage: false })
})

test('Phase 2 Gate: Slot Manifest SLOTS.md is complete', async () => {
  const slotsPath = path.resolve('docs/SLOTS.md')
  expect(fs.existsSync(slotsPath)).toBe(true)
  const content = fs.readFileSync(slotsPath, 'utf-8')
  expect(content).toContain('Chapter 1: Dawn')
  expect(content).toContain('Chapter 10: Horizon')
  expect(content).toContain('Keyframe Scrub Scenes')
})
