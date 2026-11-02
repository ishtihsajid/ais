import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { TilesCatalogClient, TileProduct, WallTileSet } from '@/components/catalogue/TilesCatalogClient'
import exportData from '../../../../../content-export/products.json'
import wallSetsExport from '../../../../../content-export/wall_sets.json'

export const dynamic = 'force-dynamic'

export default async function TilesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  let tileProducts: TileProduct[] = []

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'products',
      limit: 1000,
      depth: 1,
      sort: 'code',
    })

    if (result.docs && result.docs.length > 0) {
      tileProducts = result.docs.map((doc: any) => ({
        id: String(doc.id),
        code: doc.code,
        name: doc.name || doc.code,
        slug: doc.slug || doc.code.toLowerCase(),
        category: doc.category || 'floor',
        finishName: typeof doc.finish === 'object' && doc.finish ? (doc.finish.name || doc.finish.slug) : 'Polished',
        finishSlug: typeof doc.finish === 'object' && doc.finish ? doc.finish.slug : 'polished',
        sizeName: typeof doc.size === 'object' && doc.size ? (doc.size.label || doc.size.name || '60x60 cm') : '60x60 cm',
        sizeCode: typeof doc.size === 'object' && doc.size ? (doc.size.slug || doc.size.code || '60x60') : '60x60',
        widthCm: doc.widthCm || (typeof doc.size === 'object' && doc.size?.widthCm) || 60,
        heightCm: doc.heightCm || (typeof doc.size === 'object' && doc.size?.heightCm) || 60,
        imageUrl: doc.images?.[0]?.url || (doc.images?.[0]?.filename ? `/media/${doc.images[0].filename}` : undefined),
        imageAlt: doc.images?.[0]?.alt || doc.name || doc.code,
        isSlim: Boolean(doc.slim),
        isHeatproof: Boolean(doc.heatproof),
        waterAbsorption: doc.waterAbsorption || (doc.category === 'floor' ? '< 0.5%' : '10-15%'),
        mor: doc.modulusOfRuptureNmm2 ? `${doc.modulusOfRuptureNmm2} N/mm²` : (doc.category === 'floor' ? '≥ 35 N/mm²' : '≥ 15 N/mm²'),
        sqftPerBox: doc.sqftPerBox || 15.5,
      }))
    }
  } catch (err) {
    console.warn('Payload CMS query notice, falling back to authentic static export:', err)
  }

  if (tileProducts.length === 0) {
    tileProducts = (exportData as any[]).map((doc: any) => ({
      id: String(doc.id),
      code: doc.code,
      name: doc.name || doc.code,
      slug: doc.slug || doc.code.toLowerCase(),
      category: doc.category || 'floor',
      finishName: doc.finishName || 'Polished',
      finishSlug: doc.finishSlug || 'polished',
      sizeName: doc.sizeName || '60x60 cm',
      sizeCode: doc.sizeCode || '60x60',
      widthCm: doc.widthCm || 60,
      heightCm: doc.heightCm || 60,
      wallSetName: doc.wallSetName,
      wallTileRole: doc.wallTileRole,
      imageUrl: doc.imageUrl,
      imageAlt: doc.imageAlt || doc.name || doc.code,
      isSlim: Boolean(doc.isSlim),
      isHeatproof: Boolean(doc.isHeatproof),
      waterAbsorption: doc.waterAbsorption || '< 0.5%',
      mor: doc.mor || '≥ 35 N/mm²',
      sqftPerBox: doc.sqftPerBox || 15.5,
    }))
  }

  // Ensure wallSetName and wallTileRole are populated from exportData if payload doc was generic
  const exportMap = new Map((exportData as any[]).map((d: any) => [d.code, d]))
  tileProducts = tileProducts.map(p => {
    const matched = exportMap.get(p.code)
    if (matched) {
      return {
        ...p,
        wallSetName: matched.wallSetName || p.wallSetName,
        wallTileRole: matched.wallTileRole || p.wallTileRole,
        widthCm: matched.widthCm || p.widthCm,
        heightCm: matched.heightCm || p.heightCm,
      }
    }
    return p
  })

  const wallSets: WallTileSet[] = (wallSetsExport as any[]).map((s: any) => ({
    setName: s.setName,
    finishName: s.finishName || 'Polished',
    sizeName: s.sizeName || '30x60 cm',
    widthCm: s.widthCm || 60,
    heightCm: s.heightCm || 30,
    tiles: s.tiles || [],
  }))

  return <TilesCatalogClient initialProducts={tileProducts} initialWallSets={wallSets} locale={locale} />
}
