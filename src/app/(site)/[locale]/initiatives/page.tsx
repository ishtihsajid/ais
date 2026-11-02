import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Sparkles, Calendar, ArrowRight, HeartHandshake, Compass, Users } from 'lucide-react'

export const dynamic = 'force-dynamic'

const STATIC_INITIATIVES = [
  {
    slug: 'nationwide-fitter-meets',
    title: 'Nationwide Fitter Meets: Empowering Bangladesh Tile Craftsmen',
    year: '2023 - Present',
    category: 'Craftsmen & People',
    summary: 'A continuous community program bringing together thousands of professional tile fitters across all 64 districts under the banner "নান্দনিকতার কারিগর" for hands-on technical training, corner-gap elimination, and safety workshops.',
    sample: false,
  },
  {
    slug: 'eid-express-campaign',
    title: 'Eid Express: Seamless Festive Delivery Across the Nation',
    year: '2024 - 2026',
    category: 'Community & Service',
    summary: 'Ensuring homeowners and project sites receive guaranteed 4-day delivery from our Meghnaghat plant through authorized dealer networks, even during peak festive renovation seasons.',
    sample: false,
  },
  {
    slug: 'knowledge-sharing-series',
    title: 'The Ceramic Knowledge Sharing Series',
    year: '2023 - Present',
    category: 'Learning & Knowledge',
    summary: 'A public educational initiative demystifying ceramic science, water absorption standards, surface finishes, and sustainable building materials for homeowners and design students.',
    sample: false,
  },
  {
    slug: 'the-fresh-pod',
    title: 'The Fresh Pod Architectural Installation',
    year: '2025',
    category: 'Architectural Innovation',
    summary: '[OWNER TO SUPPLY: name, what it is, where, when, photographs]',
    sample: true,
  },
  {
    slug: 'community-and-csr-initiatives',
    title: 'Responsible Community & CSR Programs',
    year: '2022 - Present',
    category: 'Community & CSR',
    summary: '[OWNER TO SUPPLY: detail of community welfare, river protection, and health initiatives around Meghnaghat plant]',
    sample: true,
  },
]

export default async function InitiativesPage({
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
      collection: 'initiatives',
      limit: 20,
    })
    docs = res.docs
  } catch {}

  const dbSlugs = new Set(docs.map((d: any) => d.slug))
  const initiatives = [
    ...docs,
    ...STATIC_INITIATIVES.filter((si) => !dbSlugs.has(si.slug)),
  ]

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header Breadcrumb */}
        <div className="border-b border-stone/15 pb-8 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-fresh-red mb-1">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-stone-dark/70">Responsibility</span>
          </div>
          <span className="text-xs font-display font-bold uppercase tracking-wider text-fresh-red block">
            {isBn ? 'ব্র্যান্ড ইনিশিয়েটিভ ও সামাজিক দায়বদ্ধতা' : 'Beyond the Tile: Brand Initiatives'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-1 tracking-tight">
            What We Owe <span className="font-semibold text-stone">Beyond the Tile</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            Our responsibility does not end when a tile leaves the kiln. Discover how Fresh Ceramics supports craftspeople, drives sustainability, and enriches communities nationwide.
          </p>
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {initiatives.map((item: any) => (
            <Link
              key={item.slug}
              href={isBn ? `/bn/initiatives/${item.slug}` : `/initiatives/${item.slug}`}
              className="group bg-white border border-stone/15 hover:border-fresh-red p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-fresh-red uppercase font-bold bg-fresh-red/10 px-2 py-0.5">
                    {item.category || 'Initiative'}
                  </span>
                  <span className="text-xs font-mono text-stone-dark/50">{item.year}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-stone group-hover:text-fresh-red transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-dark/70 mt-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone/10 flex items-center justify-between text-xs font-display font-semibold uppercase tracking-wider text-stone group-hover:text-fresh-red">
                <span>View Initiative Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* Environmental Commitment Note */}
        <div className="bg-stone text-paper p-8 md:p-12 border border-stone-dark shadow-md">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-fresh-red font-bold">
              Meghnaghat Industrial Ecology
            </span>
            <h3 className="text-2xl font-display font-bold text-white mt-1">
              Six Responsible Choices at the Plant
            </h3>
            <p className="text-xs sm:text-sm text-grey mt-2 leading-relaxed">
              Surface water utilization, zero black smoke, smart heat recapture, dust-free manufacturing spaces, fully covered rooftop solar energy generation, and natural daylight plant architecture.
            </p>
            <div className="mt-6">
              <Link
                href="/sustainability"
                className="px-6 py-3 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <span>Read Full Sustainability Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
