import sharp from 'sharp'
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'

export interface ImageProcessingResult {
  generatedSizes: {
    webp: Record<string, string>
    avif: Record<string, string>
  }
  zoomTilesPath?: string
}

export interface VideoProcessingResult {
  posterUrl: string
  desktopUrl: string
  mobileUrl: string
  scrubUrl: string
}

const MEDIA_ROOT = path.resolve('media')
const SIZES_DIR = path.join(MEDIA_ROOT, 'sizes')
const ZOOM_DIR = path.join(MEDIA_ROOT, 'zoom')
const VIDEOS_DIR = path.join(MEDIA_ROOT, 'videos')

// Ensure directory tree exists
;[MEDIA_ROOT, SIZES_DIR, ZOOM_DIR, VIDEOS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
})

export async function processImage(
  mediaId: string | number,
  sourcePath: string,
  generateZoom = true
): Promise<ImageProcessingResult> {
  const baseName = path.basename(sourcePath, path.extname(sourcePath))
  const metadata = await sharp(sourcePath).metadata()
  const origWidth = metadata.width || 1200

  const webpSizes = [400, 800, 1600, 2400].filter((w) => w <= origWidth * 1.5 || w === 400)
  const avifSizes = [800, 1600].filter((w) => w <= origWidth * 1.5 || w === 800)

  const generatedSizes: ImageProcessingResult['generatedSizes'] = {
    webp: {},
    avif: {},
  }

  // 1. Generate WebP variants
  for (const w of webpSizes) {
    const outFilename = `${baseName}_${w}w.webp`
    const outPath = path.join(SIZES_DIR, outFilename)
    await sharp(sourcePath)
      .resize({ width: w, withoutEnlargement: false })
      .webp({ quality: 85 })
      .toFile(outPath)
    generatedSizes.webp[`${w}w`] = `/media/sizes/${outFilename}`
  }

  // 2. Generate AVIF variants
  for (const w of avifSizes) {
    const outFilename = `${baseName}_${w}w.avif`
    const outPath = path.join(SIZES_DIR, outFilename)
    await sharp(sourcePath)
      .resize({ width: w, withoutEnlargement: false })
      .avif({ quality: 75 })
      .toFile(outPath)
    generatedSizes.avif[`${w}w`] = `/media/sizes/${outFilename}`
  }

  // 3. Generate Deep Zoom pyramid
  let zoomTilesPath: string | undefined
  if (generateZoom) {
    const targetBase = path.join(ZOOM_DIR, String(mediaId))
    await sharp(sourcePath)
      .tile({ layout: 'dz', size: 256, overlap: 1 })
      .toFile(targetBase)
    zoomTilesPath = `/media/zoom/${mediaId}.dzi`
  }

  return {
    generatedSizes,
    zoomTilesPath,
  }
}

function runFfmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const ffmpegCmd = process.env.FFMPEG_PATH || 'ffmpeg'
    const proc = spawn(ffmpegCmd, args, { stdio: 'ignore' })
    proc.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`FFmpeg process exited with code ${code}`))
    })
    proc.on('error', (err) => {
      console.warn('FFmpeg binary not found or execution skipped:', err.message)
      resolve()
    })
  })
}

export async function processVideo(
  mediaId: string | number,
  sourcePath: string
): Promise<VideoProcessingResult> {
  const posterFile = `${mediaId}_poster.webp`
  const desktopFile = `${mediaId}_desktop.mp4`
  const mobileFile = `${mediaId}_mobile.mp4`
  const scrubFile = `${mediaId}_scrub.mp4`

  const posterPath = path.join(VIDEOS_DIR, posterFile)
  const desktopPath = path.join(VIDEOS_DIR, desktopFile)
  const mobilePath = path.join(VIDEOS_DIR, mobileFile)
  const scrubPath = path.join(VIDEOS_DIR, scrubFile)

  // 1. Poster WebP at 1s
  await runFfmpeg([
    '-y',
    '-ss', '00:00:01',
    '-i', sourcePath,
    '-vframes', '1',
    '-vf', 'scale=1280:-2',
    posterPath,
  ])

  // 2. Desktop MP4: 720p, crf 26, -an, +faststart
  await runFfmpeg([
    '-y',
    '-i', sourcePath,
    '-vf', 'scale=1280:-2',
    '-c:v', 'libx264',
    '-crf', '26',
    '-preset', 'fast',
    '-an',
    '-movflags', '+faststart',
    desktopPath,
  ])

  // 3. Mobile MP4: 480p, crf 28, -an, +faststart
  await runFfmpeg([
    '-y',
    '-i', sourcePath,
    '-vf', 'scale=854:-2',
    '-c:v', 'libx264',
    '-crf', '28',
    '-preset', 'fast',
    '-an',
    '-movflags', '+faststart',
    mobilePath,
  ])

  // 4. Scrub MP4: 720p, crf 26, keyframe every frame (-g 1)
  await runFfmpeg([
    '-y',
    '-i', sourcePath,
    '-vf', 'scale=1280:-2',
    '-c:v', 'libx264',
    '-crf', '26',
    '-g', '1',
    '-preset', 'fast',
    '-an',
    '-movflags', '+faststart',
    scrubPath,
  ])

  return {
    posterUrl: `/media/videos/${posterFile}`,
    desktopUrl: `/media/videos/${desktopFile}`,
    mobileUrl: `/media/videos/${mobileFile}`,
    scrubUrl: `/media/videos/${scrubFile}`,
  }
}
