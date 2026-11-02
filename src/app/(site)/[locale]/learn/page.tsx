import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { BookOpen, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Droplets } from 'lucide-react'

export const dynamic = 'force-dynamic'

const STATIC_GUIDES = [
  {
    slug: 'water-absorption-porcelain-vs-ceramic',
    title: 'Understanding Water Absorption: Porcelain vs Conventional Ceramic',
    summary: 'Why water absorption under 0.5% (ISO 10545-3) is critical for structural strength, frost resistance, and permanent stain resistance in tropical climates.',
    date: '2026',
    category: 'Material Science',
  },
  {
    slug: 'ultra-fine-squaring-joint-alignment',
    title: 'Ultra Fine Squaring: The Geometry of Zero Corner Gaps',
    summary: 'How precision automated rectification at our Meghnaghat plant eliminates edge lippage and guarantees perfect 90-degree orthogonal corners.',
    date: '2026',
    category: 'Installation & Craft',
  },
  {
    slug: 'mirror-polished-nano-care',
    title: 'Maintaining Mirror Polished Tiles: Nano-Technology Protection',
    summary: 'The science behind our nano-coatings that seal microscopic surface pores, delivering optical clarity, deep specular reflection and effortless cleaning.',
    date: '2026',
    category: 'Care & Maintenance',
  },
  {
    slug: 'choosing-tiles-by-space',
    title: 'Selecting Surfaces: From High-Footfall Lobbies to Wet Zones',
    summary: 'A specifier guide on matching tile slip resistance (R10), MOR breaking strength, and aesthetic finishes across residential and commercial spaces.',
    date: '2026',
    category: 'Selection Guide',
  },
]

export default async function LearnPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isBn = locale === 'bn'
  const payload = await getPayload({ config })

  let articles: any[] = []
  try {
    const res = await payload.find({
      collection: 'articles',
      where: { kind: { equals: 'guide' } },
      limit: 20,
    })
    articles = res.docs
  } catch {}

  const guides = articles.length > 0 ? articles : STATIC_GUIDES

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header Breadcrumb */}
        <div className="border-b border-stone/15 pb-8 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-fresh-red mb-1">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-stone-dark/70">Knowledge Hub</span>
          </div>
          <span className="text-xs font-display font-bold uppercase tracking-wider text-fresh-red block">
            {isBn ? 'টাইলস সহায়িকা ও শিক্ষা' : 'Architectural Knowledge Series'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-1 tracking-tight">
            Learn: <span className="font-semibold text-stone">Tile Selection, Science & Care</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            Comprehensive guides on ceramic physics, squaring tolerances, sustainable dead-load reduction, and daily maintenance practices.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {guides.map((g: any) => (
            <Link
              key={g.slug}
              href={isBn ? `/bn/learn/${g.slug}` : `/learn/${g.slug}`}
              className="group bg-white border border-stone/15 hover:border-fresh-red p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-fresh-red uppercase font-bold bg-fresh-red/10 px-2 py-0.5">
                    {g.category || 'Technical Guide'}
                  </span>
                  <span className="text-xs font-mono text-stone-dark/50">{g.date || '2026'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-stone group-hover:text-fresh-red transition-colors">
                  {g.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-dark/70 mt-3 leading-relaxed">
                  {g.summary}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone/10 flex items-center justify-between text-xs font-display font-semibold uppercase tracking-wider text-stone group-hover:text-fresh-red">
                <span>Read Architectural Guide</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* Technical Features & Standards Summary */}
        <div className="bg-stone text-paper p-8 md:p-12 border border-stone-dark shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-fresh-red font-bold">
                Standards & Laboratory Testing
              </span>
              <h3 className="text-2xl font-display font-bold text-white">
                14 Factory Tests Behind Every Tile
              </h3>
              <p className="text-xs sm:text-sm text-grey leading-relaxed">
                From dimensional rectangularity and modulus of rupture (MOR ≥ 35 N/mm²) to thermal shock cycling and chemical resilience, our Meghnaghat QA laboratory tests every production batch against international standards.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/quality-and-technology"
                className="px-6 py-3.5 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <span>View Quality & Technology</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
