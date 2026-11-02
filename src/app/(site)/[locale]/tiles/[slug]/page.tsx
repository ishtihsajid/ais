import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { DeepZoomViewer } from '@/components/DeepZoomViewer'
import { PDPInteractiveControls } from '@/components/catalogue/PDPInteractiveControls'
import authenticData from '@/data/authentic_products.json'
import { ArrowLeft, Check, Heart, Shield, Maximize2, MessageSquare, Download, Layers, Sparkles } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function TileDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const isBn = locale === 'bn'

  let product: any = null
  let finishName = 'Porcelain Finish'
  let sizeName = '60x60 cm'
  let imageUrl: string | undefined = undefined
  let imageAlt = ''
  let primaryImage: any = null

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'products',
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    })

    if (result.totalDocs > 0) {
      product = result.docs[0] as any
      finishName = typeof product.finish === 'object' && product.finish ? product.finish.name : 'Porcelain Finish'
      sizeName = typeof product.size === 'object' && product.size ? product.size.name : '60x60 cm'
      primaryImage = product.images?.[0]
      imageUrl = primaryImage?.url || (primaryImage?.filename ? `/media/${primaryImage.filename}` : undefined)
      imageAlt = primaryImage?.alt || product.name || product.code
    }
  } catch (err) {
    // If Payload database is offline or not seeded, gracefully fallback to authentic catalog
  }

  if (!product) {
    const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const staticItem = (authenticData as any[]).find(
      (p) =>
        p.slug === slug ||
        p.id === slug ||
        p.slug === normalizedSlug ||
        p.code?.toLowerCase().replace(/[^a-z0-9]+/g, '-') === normalizedSlug
    )

    if (!staticItem) {
      notFound()
    }

    product = {
      code: staticItem.code,
      name: staticItem.name || staticItem.code,
      category: staticItem.category || 'floor',
      waterAbsorption: staticItem.waterAbsorption || '< 0.5%',
      modulusOfRuptureNmm2: 35,
      sqftPerBox: staticItem.sqftPerBox || 16,
      isSlim: staticItem.isSlim || false,
      isHeatproof: staticItem.isHeatproof || false,
      images: [{ url: staticItem.imageUrl, alt: staticItem.imageAlt }],
    }
    finishName = staticItem.finishName || 'Porcelain Finish'
    sizeName = staticItem.sizeName || '60x60 cm'
    imageUrl = staticItem.imageUrl
    imageAlt = staticItem.imageAlt || staticItem.name
  }

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-24 pb-16">
      {/* Top Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 border-b border-stone/15 flex items-center justify-between text-xs font-mono">
        <Link
          href={isBn ? '/bn/tiles' : '/tiles'}
          className="inline-flex items-center gap-2 text-stone hover:text-fresh-red transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isBn ? 'সকল টাইলসে ফিরে যান' : 'Back to All Tiles'}</span>
        </Link>
        <div className="flex items-center gap-2 text-stone-dark/60">
          <span>{product.category === 'floor' ? 'Floor' : 'Wall'}</span>
          <span>/</span>
          <span>{finishName}</span>
          <span>/</span>
          <span className="text-fresh-red font-bold">{product.code}</span>
        </div>
      </div>

      {/* Main Product Stage */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Tile Canvas Preview & Deep Zoom */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-square w-full bg-stone/5 border border-stone/20 overflow-hidden shadow-lg p-8 flex flex-col justify-between">
            {imageUrl && (
              <>
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </>
            )}

            {/* Visualizer watermark */}
            <div className="flex justify-between items-start z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-fresh-red bg-white/95 px-2 py-1 shadow-sm font-bold">
                {product.code}
              </span>
              <span className="text-xs font-display uppercase tracking-widest text-stone bg-white/95 px-2 py-1 shadow-sm">
                98% A-Grade Export Quality
              </span>
            </div>

            {!imageUrl ? (
              <div className="my-auto text-center z-10">
                <span className="text-3xl sm:text-5xl font-display font-light tracking-tight text-stone">
                  {product.name}
                </span>
                <p className="text-sm font-mono mt-2 text-stone-dark/70">
                  {sizeName} • {finishName}
                </p>
              </div>
            ) : (
              <div className="flex-1" />
            )}

            <div className={`flex justify-between items-end z-10 text-xs font-mono ${imageUrl ? 'text-white' : 'text-stone-dark/80'}`}>
              <span className={imageUrl ? 'bg-black/50 backdrop-blur-sm px-2 py-0.5' : ''}>Ultra Fine Squaring</span>
              <span className={imageUrl ? 'bg-black/50 backdrop-blur-sm px-2 py-0.5' : ''}>ISO 13006 Verified</span>
            </div>
          </div>

          {/* Deep Zoom Viewer Integration */}
          <div className="bg-white p-6 border border-stone/15 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-fresh-red" />
                <h3 className="text-sm font-display font-bold uppercase tracking-wider text-stone">
                  {isBn ? 'মাইক্রো টেক্সচার জুম পরিদর্শন' : 'High Resolution Texture Zoom'}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-grey">OpenSeadragon Engine</span>
            </div>
            <DeepZoomViewer
              tileSource={primaryImage?.zoomTilesPath || '/media/dz/placeholder.dzi'}
              fallbackSrc={imageUrl || '/brand/logo-fresh-ceramics.png'}
              alt={`${product.name} High Resolution Surface`}
            />
          </div>

          {/* Tactile Lighting & TDS Tearsheet */}
          <PDPInteractiveControls
            productCode={product.code}
            productName={product.name}
            sizeName={sizeName}
            finishName={finishName}
            category={product.category || 'floor'}
            waterAbsorption={product.waterAbsorption}
            mor={product.modulusOfRuptureNmm2 ? `${product.modulusOfRuptureNmm2} N/mm²` : undefined}
            sqftPerBox={product.sqftPerBox}
            isSlim={product.isSlim}
            isHeatproof={product.isHeatproof}
            locale={locale}
          />
        </div>

        {/* Right: Technical Specification & Actions */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-fresh-red font-semibold mb-2">
              <span>{product.category === 'floor' ? 'Floor Porcelain' : 'Wall Ceramic'}</span>
              {product.isSlim && <span>• SLIM ARCHITECTURAL</span>}
              {product.isHeatproof && <span>• HEATPROOF THERMAL</span>}
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-stone tracking-tight">
              {product.name}
            </h1>
            <p className="text-sm text-stone-dark/80 mt-3 leading-relaxed">
              {isBn
                ? 'আল্ট্রা ফাইন স্কয়ারিং প্রযুক্তিতে তৈরি প্রিমিয়াম চীনামাটির টাইলস। নিখুঁত সোজা এজ এবং শূন্য কোণা ফাঁক নিশ্চিত করে দীর্ঘস্থায়ী নান্দনিক রূপ।'
                : 'Premium calibrated porcelain engineered with Ultra Fine Squaring Technology ensuring zero corner gaps, flawless joint alignment, and enduring aesthetic depth.'}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href={isBn ? `/bn/shortlist?add=${product.code}` : `/shortlist?add=${product.code}`}
              className="flex-1 py-3.5 px-6 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider text-center transition-all shadow-md inline-flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              <span>{isBn ? 'শর্টলিস্টে যুক্ত করুন' : 'Add to Shortlist'}</span>
            </Link>

            <Link
              href={isBn ? `/bn/contact?product=${product.code}` : `/contact?product=${product.code}`}
              className="flex-1 py-3.5 px-6 bg-stone hover:bg-stone-dark text-paper text-xs font-display font-semibold uppercase tracking-wider text-center transition-all shadow-md inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isBn ? 'প্রোডাক্ট অনুসন্ধান' : 'Enquire Now'}</span>
            </Link>
          </div>

          {/* Technical Data Specification Table */}
          <div className="bg-white border border-stone/15 p-6 shadow-sm">
            <h3 className="text-xs font-display font-bold uppercase tracking-widest text-stone mb-4 border-b border-stone/15 pb-2">
              {isBn ? 'কারিগরি মানদণ্ড ও স্পেসিফিকেশন' : 'Technical Specifications'}
            </h3>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
              <div className="border-b border-stone/10 pb-2">
                <dt className="text-stone-dark/60 font-mono">Product Code</dt>
                <dd className="font-mono font-bold text-stone">{product.code}</dd>
              </div>
              <div className="border-b border-stone/10 pb-2">
                <dt className="text-stone-dark/60 font-mono">Dimensions</dt>
                <dd className="font-mono font-bold text-stone">{sizeName}</dd>
              </div>
              <div className="border-b border-stone/10 pb-2">
                <dt className="text-stone-dark/60 font-mono">Surface Finish</dt>
                <dd className="font-mono font-bold text-stone">{finishName}</dd>
              </div>
              <div className="border-b border-stone/10 pb-2">
                <dt className="text-stone-dark/60 font-mono">Water Absorption</dt>
                <dd className="font-mono font-bold text-stone">{product.waterAbsorption || '< 0.5%'}</dd>
              </div>
              <div className="border-b border-stone/10 pb-2">
                <dt className="text-stone-dark/60 font-mono">Modulus of Rupture (MOR)</dt>
                <dd className="font-mono font-bold text-stone">
                  {product.modulusOfRuptureNmm2 ? `${product.modulusOfRuptureNmm2} N/mm²` : '≥ 35 N/mm²'}
                </dd>
              </div>
              <div className="border-b border-stone/10 pb-2">
                <dt className="text-stone-dark/60 font-mono">Squaring Quality</dt>
                <dd className="font-mono font-bold text-fresh-red">Ultra Fine Squaring</dd>
              </div>
              <div className="border-b border-stone/10 pb-2">
                <dt className="text-stone-dark/60 font-mono">Coverage Per Box</dt>
                <dd className="font-mono font-bold text-stone">{product.sqftPerBox || 15.5} sq ft</dd>
              </div>
              <div className="border-b border-stone/10 pb-2">
                <dt className="text-stone-dark/60 font-mono">Quality Grade</dt>
                <dd className="font-mono font-bold text-stone">98% Grade A Export</dd>
              </div>
            </dl>

            <div className="mt-4 pt-3 border-t border-stone/10 flex items-center justify-between text-[11px] text-stone-dark/70">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-fresh-red" />
                Zero Shade Variance
              </span>
              <span>4-Day Nationwide Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
