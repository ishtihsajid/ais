import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

async function captureAll() {
  const tmpDir = path.resolve('tmp')
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true })

  const browser = await chromium.launch()
  
  // 1. Desktop Journey
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:3100', { waitUntil: 'domcontentloaded' })
  // Skip prelude
  await page.keyboard.press('Escape')
  await page.waitForTimeout(600)
  await page.screenshot({ path: 'tmp/1_desktop_journey_header.png' })
  
  // Open menu on desktop
  const menuBtn = page.locator('header button').last()
  await menuBtn.click()
  await page.waitForTimeout(400)
  await page.screenshot({ path: 'tmp/2_desktop_menu_open.png' })
  await page.locator('button[aria-label="Close menu"]').click()
  await page.waitForTimeout(400)

  // Scroll to Chapter 4 (Surface)
  await page.evaluate(() => {
    document.getElementById('surface')?.scrollIntoView()
  })
  await page.waitForTimeout(600)
  await page.screenshot({ path: 'tmp/3_chapter4_surface.png' })

  // Scroll to Chapter 6 (Reach)
  await page.evaluate(() => {
    document.getElementById('reach')?.scrollIntoView()
  })
  await page.waitForTimeout(600)
  await page.screenshot({ path: 'tmp/4_chapter6_reach.png' })

  // Scroll to Chapter 8 (Home / Lived Space)
  await page.evaluate(() => {
    document.getElementById('home')?.scrollIntoView()
  })
  await page.waitForTimeout(600)
  await page.screenshot({ path: 'tmp/4b_chapter8_home.png' })

  // Scroll to Chapter 10 (Horizon)
  await page.evaluate(() => {
    document.getElementById('horizon')?.scrollIntoView()
  })
  await page.waitForTimeout(600)
  await page.screenshot({ path: 'tmp/4c_chapter10_horizon.png' })

  // Scroll to Footer
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })
  await page.waitForTimeout(600)
  await page.screenshot({ path: 'tmp/5_footer.png' })

  // 2. Catalogue Page
  await page.goto('http://localhost:3100/tiles', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1000)
  await page.screenshot({ path: 'tmp/6_catalogue_page.png' })

  // 2b. Product Detail Page
  await page.goto('http://localhost:3100/tiles/fc-fl-60120-dc01', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1000)
  await page.screenshot({ path: 'tmp/6b_pdp_page.png' })

  // 3. Mobile Journey
  const mPage = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await mPage.goto('http://localhost:3100', { waitUntil: 'domcontentloaded' })
  await mPage.keyboard.press('Escape')
  await mPage.waitForTimeout(600)
  await mPage.screenshot({ path: 'tmp/7_mobile_journey_header.png' })

  // Open mobile menu
  const mMenuBtn = mPage.locator('header button').last()
  await mMenuBtn.click()
  await mPage.waitForTimeout(400)
  await mPage.screenshot({ path: 'tmp/8_mobile_menu_open.png' })

  await browser.close()
  console.log('All screenshots captured!')
}

captureAll().catch(console.error)
