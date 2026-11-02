import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Tag, Share2, Store } from 'lucide-react'

export const dynamic = 'force-dynamic'

const STATIC_NEWS_DETAILS: Record<string, {
  title: string
  date: string
  category: string
  summary: string
  paragraphs: string[]
}> = {
  'flagship-display-centre-openings': {
    title: 'Fresh Ceramics Inaugurates Flagship Display Centres in Banani and Agrabad',
    date: 'March 2026',
    category: 'Showroom Network',
    summary: 'Expanding experiential architectural luxury across Dhaka and Chattogram with dedicated visualizer spaces, double-charge monoliths, and specifier consultation suites.',
    paragraphs: [
      'To provide architects, interior designers and discerning homeowners an authentic sensory tactile experience, Fresh Ceramics has officially opened two flagship display centres: one on Banani / Gulshan Link Road in Dhaka, and another in Agrabad Commercial Area, Chattogram.',
      'Unlike conventional retail tile stores, these flagship spaces showcase full-scale mockups of architectural living rooms, commercial atriums, ensuite bathrooms, and modern culinary studios.',
      'Visitors can inspect micro-surface reliefs under variable raking lighting, test tactile anti-slip textures, and request complimentary physical sample swatches for ongoing projects.',
      'Both centres operate from 10:00 AM to 8:00 PM (Saturday through Thursday) with senior architectural design consultants on site.'
    ],
  },
  'double-charge-full-line-launch': {
    title: 'Bangladesh First Full-Line Double Charge Porcelain in 3 Strategic Sizes',
    date: 'January 2026',
    category: 'Product Innovation',
    summary: 'Fresh Ceramics becomes the first manufacturer in Bangladesh to produce a complete line across 60x60, 80x80, and 60x120 cm Double Charge formats.',
    paragraphs: [
      'Engineered for perpetual resilience in high-footfall commercial and residential spaces, Double Charge porcelain features a dual-layer pressing process where the design and pigment layer penetrates 3 to 4 mm into the porcelain body.',
      'With the commissioning of cutting-edge automated hydraulic presses from Italy, Fresh Ceramics is proud to be the first manufacturer in Bangladesh to produce all three market-defining sizes: 60x60 cm, 80x80 cm, and 60x120 cm.',
      'The collection encompasses 204 precision-calibrated floor designs, combining timeless Italian marble veining with zero-gap Ultra Fine Squaring Technology.'
    ],
  },
  'largest-polishing-line-commissioned': {
    title: 'Nation Largest Single-Shade Automated Polishing Line Operates at Meghnaghat',
    date: 'November 2025',
    category: 'Manufacturing Excellence',
    summary: 'Commissioning Italian and German finishing technology under the biggest single production shed in the country, delivering 18.6 million square meters annually.',
    paragraphs: [
      'Fresh Ceramics state-of-the-art manufacturing plant at Meghnaghat, Sonargaon, Narayanganj now houses the largest continuous tile polishing line in Bangladesh.',
      'Operating under the country biggest single-roof industrial production shed, the automated facility incorporates inline optical nano-coating chambers and robotic sorting systems.',
      'Achieving an annual capacity of 18.6 million square meters, the plant enforces 14 international standard laboratory tests on every firing batch, ensuring 98% A-grade export quality across wall and floor porcelain.'
    ],
  },
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const isBn = locale === 'bn'

  const item = STATIC_NEWS_DETAILS[slug]
  if (!item) {
    notFound()
  }

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-stone/15 pb-6 mb-8 flex items-center justify-between">
          <Link
            href={isBn ? '/bn/news' : '/news'}
            className="inline-flex items-center gap-2 text-xs font-mono text-stone hover:text-fresh-red transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isBn ? 'সকল সংবাদে ফিরে যান' : 'Back to News'}</span>
          </Link>
          <span className="text-[10px] font-mono text-fresh-red uppercase font-bold bg-fresh-red/10 px-2 py-0.5">
            {item.category}
          </span>
        </div>

        {/* Article Header */}
        <div className="mb-10">
          <div className="text-xs font-mono text-stone-dark/60 mb-2 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-fresh-red" />
            <span>{item.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone tracking-tight leading-tight">
            {item.title}
          </h1>
          <p className="text-base sm:text-lg text-stone-dark font-light mt-4 leading-relaxed bg-mist/60 p-6 border-l-4 border-fresh-red">
            {item.summary}
          </p>
        </div>

        {/* Article Body */}
        <div className="prose prose-stone max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-stone-dark/90">
          {item.paragraphs.map((p, idx) => (
            <p key={idx} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 pt-8 border-t border-stone/15 flex items-center justify-between">
          <Link
            href="/news"
            className="text-xs font-display font-semibold uppercase text-fresh-red hover:underline inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All News</span>
          </Link>

          <Link
            href="/showrooms"
            className="px-5 py-2.5 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Visit Our Showrooms</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
