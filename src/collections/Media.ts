import type { CollectionConfig } from 'payload'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'processingStatus'],
    group: 'Governance & Settings',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create' || doc.processingStatus === 'pending') {
          // Trigger asynchronous media pipeline in background
          const sourcePath = path.resolve(dirname, '../../media', doc.filename)
          if (!fs.existsSync(sourcePath)) return doc

          // Process without blocking the upload response
          ;(async () => {
            try {
              const { processImage, processVideo } = await import('../lib/media-processor')
              if (doc.mimeType?.startsWith('image/')) {
                const result = await processImage(doc.id, sourcePath, true)
                await req.payload.update({
                  collection: 'media',
                  id: doc.id,
                  data: {
                    processingStatus: 'ready',
                    generatedSizes: result.generatedSizes,
                    zoomTilesPath: result.zoomTilesPath,
                  } as any,
                })
              } else if (doc.mimeType?.startsWith('video/')) {
                const result = await processVideo(doc.id, sourcePath)
                await req.payload.update({
                  collection: 'media',
                  id: doc.id,
                  data: {
                    processingStatus: 'ready',
                    videoVariants: result,
                  } as any,
                })
              }
            } catch (err) {
              console.error(`Media processing error for doc ${doc.id}:`, err)
              await req.payload.update({
                collection: 'media',
                id: doc.id,
                data: { processingStatus: 'error' } as any,
              }).catch(() => {})
            }
          })()
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      admin: {
        description: 'Alternative text for screen readers. Required unless marked decorative.',
      },
    },
    {
      name: 'decorative',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check if this image or video is purely decorative and should be hidden from screen readers.',
      },
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'tile_texture',
      options: [
        { label: 'Tile Texture', value: 'tile_texture' },
        { label: 'Room & Interior Scene', value: 'room_scene' },
        { label: 'Catalogue & Brochure (PDF)', value: 'catalog_pdf' },
        { label: 'Brand & Factory Photography', value: 'brand_photo' },
        { label: 'Fitter & Technical Guide', value: 'fitter_guide' },
        { label: 'General Asset', value: 'general' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Categorization for digital asset filtering.',
      },
    },
    {
      name: 'rotation',
      type: 'select',
      defaultValue: '0',
      options: [
        { label: '0° (Original)', value: '0' },
        { label: '90° CW (Right)', value: '90' },
        { label: '180° (Inverted)', value: '180' },
        { label: '270° CW (Left)', value: '270' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Rotate tile texture or image orientation.',
      },
    },
    {
      name: 'isHidden',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Hide this asset from all public galleries and catalogues.',
      },
    },
    {
      name: 'downloadable',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Expose in the public Download Center.',
      },
    },
    {
      name: 'downloadCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Total number of public user downloads.',
      },
    },
    {
      name: 'processingStatus',
      type: 'select',
      defaultValue: 'ready',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Ready', value: 'ready' },
        { label: 'Error', value: 'error' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'generatedSizes',
      type: 'json',
      admin: {
        description: 'Generated responsive WebP/AVIF variants mapping',
      },
    },
    {
      name: 'zoomTilesPath',
      type: 'text',
      admin: {
        description: 'OpenSeadragon Deep Zoom DZI path (media/zoom/<id>/dz.dzi)',
      },
    },
    {
      name: 'videoVariants',
      type: 'json',
      admin: {
        description: 'Generated video outputs (poster, desktop, mobile, scrub)',
      },
    },
  ],
}
