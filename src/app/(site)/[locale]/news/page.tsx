import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Newspaper, Calendar, ArrowRight, Store, Sparkles } from 'lucide-react'

export const dynamic = 'force-dynamic'

const STATIC_NEWS = [
  {
    slug: 'flagship-display-centre-openings',
    title: 'Fresh Ceramics Inaugurates Flagship Display Centres in Banani and Agrabad',
    date: 'March 2026',
    category: 'Showroom Network',
    summary: 'Expanding experiential architectural luxury across Dhaka and Chattogram with dedicated visualizer spaces, double-charge monoliths, and specifier consultation suites.',
  },
  {
    slug: 'double-charge-full-line-launch',
    title: 'Bangladesh First Full-Line Double Charge Porcelain in 3 Strategic Sizes',
    date: 'January 2026',
    category: 'Product Innovation',
    summary: 'Fresh Ceramics becomes the first manufacturer in Bangladesh to produce a complete line across 60x60, 80x80, and 60x120 cm Double Charge formats.',
  },
  {
    slug: 'largest-polishing-line-commissioned',
    title: 'Nation Largest Single-Shade Automated Polishing Line Operates at Meghnaghat',
    date: 'November 2025',
    category: 'Manufacturing Excellence',
    summary: 'Commissioning Italian and German finishing technology under the biggest single production shed in the country, delivering 18.6 million square meters annually.',
  },
]

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isBn = locale === 'bn'
  const payload = await getPayload({ config })

  let docs: any[] = []
  try {
    const res = await payload.find({
      collection: 'articles',
      where: { kind: { equals: 'news' } },
      limit: 20,
    })
    docs = res.docs
  } catch {}

  const newsItems = docs.length > 0 ? docs : STATIC_NEWS

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header Breadcrumb */}
        <div className="border-b border-stone/15 pb-8 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-fresh-red mb-1">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-stone-dark/70">Press & News</span>
          </div>
          <span className="text-xs font-display font-bold uppercase tracking-wider text-fresh-red block">
            {isBn ? 'সংবাদ ও আপডেট' : 'Corporate News & Media'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-1 tracking-tight">
            News & <span className="font-semibold text-stone">Events</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            Stay informed with the latest showroom expansions, manufacturing milestones, and product collection launches from Fresh Ceramics.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsItems.map((item: any) => (
            <Link
              key={item.slug}
              href={isBn ? `/bn/news/${item.slug}` : `/news/${item.slug}`}
              className="group bg-white border border-stone/15 hover:border-fresh-red p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-fresh-red uppercase font-bold bg-fresh-red/10 px-2 py-0.5">
                    {item.category || 'News'}
                  </span>
                  <span className="text-xs font-mono text-stone-dark/50">{item.date}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-stone group-hover:text-fresh-red transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-dark/70 mt-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone/10 flex items-center justify-between text-xs font-display font-semibold uppercase tracking-wider text-stone group-hover:text-fresh-red">
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
