import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { ArrowLeft, Sparkles, ArrowRight, Compass } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const isBn = locale === 'bn'
  const payload = await getPayload({ config })

  // Find finish or series
  let finishDoc: any = null
  try {
    const res = await payload.find({
      collection: 'finishes',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (res.docs.length > 0) {
      finishDoc = res.docs[0]
    }
  } catch {}

  const finishName = finishDoc?.name || slug.replace(/-/g, ' ').toUpperCase()
  const finishCategory = finishDoc?.category || 'Porcelain'
  const description = finishDoc?.description || `Explore our signature ${finishName} collection, precision engineered with Ultra Fine Squaring Technology for lasting luxury and architectural depth.`

  // Fetch products with this finish
  let products: any[] = []
  try {
    const prodRes = await payload.find({
      collection: 'products',
      where: finishDoc ? { finish: { equals: finishDoc.id } } : { 'finish.slug': { equals: slug } },
      limit: 24,
    })
    products = prodRes.docs
  } catch {}

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-stone/15 pb-6 mb-8 flex items-center justify-between">
          <Link
            href={isBn ? '/bn/collections' : '/collections'}
            className="inline-flex items-center gap-2 text-xs font-mono text-stone hover:text-fresh-red transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isBn ? 'সকল কালেকশনে ফিরে যান' : 'Back to Collections'}</span>
          </Link>
          <span className="text-[10px] font-mono text-fresh-red uppercase font-bold bg-fresh-red/10 px-2 py-0.5">
            {finishCategory}
          </span>
        </div>

        {/* Collection Hero */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-fresh-red font-bold">
            Architectural Finish Series
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-1 tracking-tight">
            {finishName} <span className="font-semibold text-stone">Collection</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-3 max-w-2xl font-light leading-relaxed">
            {description}
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white border border-stone/15 p-12 text-center shadow-sm space-y-4">
            <Sparkles className="w-8 h-8 text-fresh-red mx-auto" />
            <h3 className="text-xl font-display font-bold text-stone">
              Explore {finishName} in the Master Catalogue
            </h3>
            <p className="text-xs text-stone-dark/70 max-w-md mx-auto">
              All {finishName} designs are available in the master catalogue with instant filtering by size, space, and category.
            </p>
            <Link
              href={isBn ? `/bn/tiles?finish=${slug}` : `/tiles?finish=${slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Compass className="w-4 h-4" />
              <span>Browse {finishName} Tiles</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p: any) => (
              <Link
                key={p.slug}
                href={isBn ? `/bn/tiles/${p.slug}` : `/tiles/${p.slug}`}
                className="group bg-white border border-stone/15 hover:border-fresh-red p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square bg-stone/5 border border-stone/10 p-4 flex flex-col justify-between mb-4">
                    <span className="text-[10px] font-mono text-fresh-red font-bold uppercase">
                      {p.code}
                    </span>
                    <div className="text-center my-auto">
                      <span className="text-base font-display font-bold text-stone group-hover:text-fresh-red transition-colors">
                        {p.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-stone-dark/60 text-right">
                      98% Grade A
                    </span>
                  </div>
                  <h4 className="text-sm font-display font-bold text-stone group-hover:text-fresh-red">
                    {p.name}
                  </h4>
                  <p className="text-xs font-mono text-stone-dark/60 mt-0.5">
                    {p.category === 'floor' ? 'Floor Porcelain' : 'Wall Ceramic'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone/10 flex items-center justify-between text-xs font-display font-semibold uppercase text-fresh-red">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
