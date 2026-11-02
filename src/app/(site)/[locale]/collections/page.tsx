import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { ArrowRight, Sparkles } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isBn = locale === 'bn'
  const payload = await getPayload({ config })

  const finishes = await payload.find({
    collection: 'finishes',
    sort: 'order',
    limit: 100,
  })

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-b border-stone/15 pb-8 mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-fresh-red">
            {isBn ? 'আর্কিটেকচারাল সারফেস ফিনিশ' : 'Architectural Surface Finishes'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-2 tracking-tight">
            Curated <span className="font-semibold text-stone">Collections</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            Explore our precision-crafted finishes engineered for demanding architectural specifications and lasting visual depth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {finishes.docs.map((f: any) => (
            <Link
              key={f.slug}
              href={isBn ? `/bn/tiles?finish=${f.slug}` : `/tiles?finish=${f.slug}`}
              className="group bg-white border border-stone/15 hover:border-fresh-red p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-fresh-red uppercase font-bold bg-fresh-red/10 px-2 py-0.5">
                    {f.category.toUpperCase()}
                  </span>
                  <Sparkles className="w-4 h-4 text-stone-dark/40 group-hover:text-fresh-red transition-colors" />
                </div>
                <h3 className="text-2xl font-display font-bold text-stone group-hover:text-fresh-red transition-colors">
                  {f.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-dark/70 mt-3 leading-relaxed">
                  {f.description || 'Precision engineered porcelain surface crafted with Ultra Fine Squaring.'}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone/10 flex items-center justify-between text-xs font-display font-semibold uppercase tracking-wider text-stone group-hover:text-fresh-red">
                <span>View {f.name} Tiles</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
