import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Home, Sparkles, Check } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SpaceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const isBn = locale === 'bn'

  const formattedName = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-6">
          <Link
            href={isBn ? '/bn/spaces' : '/spaces'}
            className="inline-flex items-center gap-2 text-xs font-mono text-stone hover:text-fresh-red transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isBn ? 'সকল স্পেসে ফিরে যান' : 'Back to Spaces'}</span>
          </Link>
        </div>

        <div className="border-b border-stone/15 pb-8 mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-fresh-red">
            {isBn ? 'আর্কিটেকচারাল স্পেস গ্যালারি' : 'Architectural Space Gallery'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-stone mt-2 tracking-tight">
            {formattedName}
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            Curated tile specifications engineered for {formattedName.toLowerCase()} environments, balancing light reflection, surface grip, and durability.
          </p>
        </div>

        {/* Space Mockup & Palette Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8 aspect-[16/10] bg-stone/10 border border-stone/20 p-8 flex flex-col justify-between shadow-sm">
            <span className="text-xs font-mono uppercase tracking-widest text-fresh-red bg-white/90 px-2 py-1 self-start shadow-sm font-bold">
              Architectural Concept View
            </span>
            <div className="bg-white/95 backdrop-blur-md p-6 max-w-lg border-l-4 border-fresh-red shadow-md">
              <h3 className="text-xl font-display font-bold text-stone">
                Material Palette: {formattedName}
              </h3>
              <p className="text-xs text-stone-dark/80 mt-2 leading-relaxed">
                Featuring 60x120 Double Charge porcelain floor plains with calibrated joints and mirror polished accent walls.
              </p>
            </div>
            <div className="flex gap-4 text-xs font-mono text-stone-dark/70">
              <span>Ultra Fine Squaring</span>
              <span>Zero Shade Variance</span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-stone/15 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-display font-bold uppercase tracking-wider text-stone mb-4 border-b border-stone/10 pb-2">
                Recommended Finishes
              </h3>
              <ul className="space-y-3 text-xs">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-fresh-red shrink-0" />
                  <span>Double Charge (High Durability)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-fresh-red shrink-0" />
                  <span>Mirror Polished (Reflective Depth)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-fresh-red shrink-0" />
                  <span>Tactile Matt (Anti-Slip Safe)</span>
                </li>
              </ul>
            </div>

            <Link
              href={isBn ? '/bn/tiles' : '/tiles'}
              className="mt-6 w-full py-3 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider text-center transition-colors shadow-md inline-flex items-center justify-center gap-2"
            >
              <span>Browse Compatible Tiles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
