import sharp from 'sharp'
import { processImage, processVideo } from '../src/lib/media-processor'
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'

async function runFfmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const ffmpegPath = process.env.FFMPEG_PATH || 'ffmpeg'
    const proc = spawn(ffmpegPath, args, { stdio: 'ignore' })
    proc.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`FFmpeg exited with code ${code}`))
    })
    proc.on('error', (err) => {
      console.warn('FFmpeg not found:', err.message)
      resolve()
    })
  })
}

async function testPipeline() {
  console.log('\n========================================')
  console.log('Testing Media Pipelines (Phase 2 Gate)')
  console.log('========================================\n')

  const testDir = path.resolve('media/test')
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true })
  }

  // 1. Synthesize 24 MP Image (6000 x 4000 = 24,000,000 pixels)
  const image24mpPath = path.join(testDir, 'test_24mp_source.jpg')
  console.log('1. Synthesizing 24 Megapixel architectural tile scan (6000x4000)...')
  
  const svgTile = `
    <svg width="6000" height="4000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glaze" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#F5F0E6"/>
          <stop offset="60%" stop-color="#E2E8F0"/>
          <stop offset="100%" stop-color="#5E5E5E"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#glaze)"/>
      <circle cx="3000" cy="2000" r="1200" fill="none" stroke="#E30613" stroke-width="40" opacity="0.3"/>
      <text x="3000" y="2000" font-family="sans-serif" font-size="240" font-weight="bold" fill="#3B0A10" text-anchor="middle">FRESH CERAMICS 24MP MACRO SCAN</text>
    </svg>
  `
  await sharp(Buffer.from(svgTile))
    .jpeg({ quality: 90 })
    .toFile(image24mpPath)
  console.log(`24 MP image synthesized: ${image24mpPath}`)

  // Process 24 MP image through pipeline
  console.log('Processing 24 MP image through Sharp pipeline (sizes + Deep Zoom DZI)...')
  const imgStart = Date.now()
  const imageResult = await processImage('test_24mp', image24mpPath, true)
  const imgDuration = ((Date.now() - imgStart) / 1000).toFixed(2)
  console.log(`Image processing completed in ${imgDuration}s:`, imageResult)

  // Verify Deep Zoom DZI exists
  const dziPath = path.resolve('media/zoom/test_24mp.dzi')
  const dziFilesDir = path.resolve('media/zoom/test_24mp_files')
  if (!fs.existsSync(dziPath) || !fs.existsSync(dziFilesDir)) {
    throw new Error('Deep Zoom DZI pyramid files were not produced!')
  }
  console.log(`Deep Zoom DZI pyramid verified at: ${dziPath}`)

  // 2. Synthesize 30-Second Video using FFmpeg testsrc
  const video30sPath = path.join(testDir, 'test_30s_source.mp4')
  console.log('\n2. Synthesizing 30-second test video (1280x720, 30fps)...')
  await runFfmpeg([
    '-y',
    '-f', 'lavfi',
    '-i', 'testsrc=duration=30:size=1280x720:rate=30',
    '-c:v', 'libx264',
    '-t', '30',
    '-pix_fmt', 'yuv420p',
    video30sPath,
  ])
  console.log(`30s video synthesized: ${video30sPath}`)

  // Process video through pipeline
  console.log('Processing 30-second video through FFmpeg pipeline (poster + desktop + mobile + scrub)...')
  const vidStart = Date.now()
  const videoResult = await processVideo('test_30s', video30sPath)
  const vidDuration = ((Date.now() - vidStart) / 1000).toFixed(2)
  console.log(`Video processing completed in ${vidDuration}s:`, videoResult)

  // Verify all video output files
  const expectedVideoFiles = [
    'media/videos/test_30s_poster.webp',
    'media/videos/test_30s_desktop.mp4',
    'media/videos/test_30s_mobile.mp4',
    'media/videos/test_30s_scrub.mp4',
  ]
  for (const vf of expectedVideoFiles) {
    if (!fs.existsSync(path.resolve(vf))) {
      throw new Error(`Expected video output missing: ${vf}`)
    }
    const stat = fs.statSync(path.resolve(vf))
    console.log(`Verified ${vf}: ${(stat.size / 1024 / 1024).toFixed(2)} MB`)
  }

  console.log('\n========================================')
  console.log('MEDIA PIPELINE GATE PASSED SUCCESSFULLY!')
  console.log('========================================\n')
  process.exit(0)
}

testPipeline().catch((err) => {
  console.error('Media pipeline test failed:', err)
  process.exit(1)
})
