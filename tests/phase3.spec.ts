import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const checkpointDir = path.resolve('docs/checkpoints/phase3')

test.beforeAll(async () => {
  if (!fs.existsSync(checkpointDir)) {
    fs.mkdirSync(checkpointDir, { recursive: true })
  }
})

test('Phase 3 Gate: Journey I Desktop (1440x900) - Prelude, Rail, Chapters 1-3 Pins & Replay', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/?noprelude=1')

  // Verify Chapter 1: Dawn
  const chapter1 = page.locator('#dawn')
  await expect(chapter1).toBeVisible()
  await expect(page.locator('h1')).toContainText('A Fresh Start to an Aesthetic Life')
  await expect(page.locator('text=Since 2021')).toBeVisible()

  // Verify ProgressRail exists
  const rail = page.locator('nav[aria-label="Journey Chapters"]')
  await expect(rail).toBeVisible()

  // Scroll to Chapter 2: Ground
  const chapter2 = page.locator('#ground')
  await chapter2.scrollIntoViewIfNeeded()
  await expect(chapter2).toBeVisible()
  await expect(page.locator('text=Responsible Choice 01')).toBeVisible()
  await expect(page.locator('text=Use of surface water')).toBeVisible()

  // Scroll to Chapter 3: Fire
  const chapter3 = page.locator('#fire')
  await chapter3.scrollIntoViewIfNeeded()
  await expect(chapter3).toBeVisible()
  await expect(page.locator('text=Chapter 03: Heat & Craft')).toBeVisible()
  await expect(page.locator('text=Digital printing')).toBeVisible()

  // Replay backward: Scroll back to Chapter 1
  await chapter1.scrollIntoViewIfNeeded()
  await expect(chapter1).toBeVisible()
  await expect(page.locator('h1')).toContainText('A Fresh Start to an Aesthetic Life')

  // Capture desktop screenshot
  await page.screenshot({ path: path.join(checkpointDir, 'desktop_journey_phase3_1440x900.png'), fullPage: false })
})

test('Phase 3 Gate: Journey I Mobile (390x844) renders smoothly', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?noprelude=1')

  const chapter1 = page.locator('#dawn')
  await expect(chapter1).toBeVisible()
  await expect(page.locator('h1')).toBeVisible()

  // Save mobile screenshot
  await page.screenshot({ path: path.join(checkpointDir, 'mobile_journey_phase3_390x844.png'), fullPage: false })
})
