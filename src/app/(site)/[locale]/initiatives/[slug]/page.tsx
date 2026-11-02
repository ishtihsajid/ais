import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Tag, CheckCircle2, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

const STATIC_INITIATIVE_DETAILS: Record<string, {
  title: string
  year: string
  category: string
  summary: string
  paragraphs: string[]
  isStub?: boolean
}> = {
  'nationwide-fitter-meets': {
    title: 'Nationwide Fitter Meets: Empowering Bangladesh Tile Craftsmen',
    year: '2023 - Present',
    category: 'Craftsmen & People',
    summary: 'A continuous community program bringing together thousands of professional tile fitters across all 64 districts under the banner "নান্দনিকতার কারিগর".',
    paragraphs: [
      'In building construction, a tile is only as enduring and aesthetic as the craftsmanship of the fitter who sets it. At Fresh Ceramics, we recognize that fitters and masons are the true guardians of architectural aesthetics—নান্দনিকতার কারিগর (Craftsmen of Aesthetics).',
      'Beginning in 2023, Fresh Ceramics launched a continuous series of regional and district-level Fitter Meets, convening master tile layers in Dhaka, Chattogram, Sylhet, Rajshahi, Khulna, Barishal, Rangpur and Mymensingh divisions.',
      'Workshops focus on technical mastery: deploying precision tile leveling systems, maintaining consistent thin-set mortar beds, and leveraging Ultra Fine Squaring Technology to eliminate corner gaps without edge lippage.',
      'Each participant receives hands-on instruction, technical safety equipment, and recognition for their dedication to elevating building standards across Bangladesh.'
    ],
  },
  'eid-express-campaign': {
    title: 'Eid Express: Seamless Festive Delivery Across the Nation',
    year: '2024 - 2026',
    category: 'Community & Service',
    summary: 'Ensuring homeowners and project sites receive guaranteed 4-day delivery from our Meghnaghat plant through authorized dealer networks.',
    paragraphs: [
      'The weeks leading up to Eid represent the most urgent renovation and home-finishing period of the year for Bangladeshi families. Delayed materials or broken cartons can halt progress right before celebrations.',
      'Through the Eid Express initiative, Fresh Ceramics guarantees streamlined delivery within 4 days from authorized and exclusive dealer showrooms upon stock availability.',
      'Cartons equipped with heavy-duty corner caps and protective poly wrap ensure zero transit damage, allowing homeowners to complete their spaces with total peace of mind.'
    ],
  },
  'knowledge-sharing-series': {
    title: 'The Ceramic Knowledge Sharing Series',
    year: '2023 - Present',
    category: 'Learning & Knowledge',
    summary: 'A public educational initiative demystifying ceramic science, water absorption standards, and sustainable building materials.',
    paragraphs: [
      'Modern homeowners and aspiring architects deserve transparent, accessible knowledge about the materials they specify.',
      'Our multimedia knowledge series explores the complete lifecycle of a tile: from raw mineral selection and hydraulic compaction to digital glaze printing, nano-polishing, and sustainable recycling at our Meghnaghat plant.',
      'By explaining international ISO 13006 quality standards and the practical benefits of Slim and Heatproof tiles, we empower clients to make informed, responsible choices for their living environments.'
    ],
  },
  'the-fresh-pod': {
    title: 'The Fresh Pod Architectural Installation',
    year: '2025',
    category: 'Architectural Innovation',
    summary: '[OWNER TO SUPPLY: name, what it is, where, when, photographs]',
    paragraphs: [
      '[OWNER TO SUPPLY: name, what it is, where, when, photographs]',
      'This initiative showcases avant-garde porcelain applications in modern modular architecture. Detailed specifications and site documentation will be published upon confirmation from the project directors.'
    ],
    isStub: true,
  },
  'community-and-csr-initiatives': {
    title: 'Responsible Community & CSR Programs',
    year: '2022 - Present',
    category: 'Community & CSR',
    summary: '[OWNER TO SUPPLY: detail of community welfare, river protection, and health initiatives around Meghnaghat plant]',
    paragraphs: [
      '[OWNER TO SUPPLY: detail of community welfare, river protection, and health initiatives around Meghnaghat plant]',
      'Fresh Ceramics is committed to sustainable industrial stewardship, surface water conservation, and community health in Sonargaon and the surrounding Meghnaghat river basin.'
    ],
    isStub: true,
  },
}

import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function InitiativeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const isBn = locale === 'bn'
  const payload = await getPayload({ config })

  let dbDoc: any = null
  try {
    const res = await payload.find({
      collection: 'initiatives',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (res.docs.length > 0) {
      dbDoc = res.docs[0]
    }
  } catch {}

  const staticItem = STATIC_INITIATIVE_DETAILS[slug]

  if (!dbDoc && !staticItem) {
    notFound()
  }

  const item = dbDoc
    ? {
        title: dbDoc.title,
        year: dbDoc.year || '2024 - 2026',
        category: dbDoc.category || 'Initiative',
        summary: dbDoc.summary || dbDoc.story,
        paragraphs: dbDoc.story ? [dbDoc.story] : [dbDoc.summary],
        isStub: dbDoc.sample || false,
      }
    : staticItem

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-stone/15 pb-6 mb-8 flex items-center justify-between">
          <Link
            href={isBn ? '/bn/initiatives' : '/initiatives'}
            className="inline-flex items-center gap-2 text-xs font-mono text-stone hover:text-fresh-red transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isBn ? 'সকল ইনিশিয়েটিভে ফিরে যান' : 'Back to Initiatives'}</span>
          </Link>
          <span className="text-[10px] font-mono text-fresh-red uppercase font-bold bg-fresh-red/10 px-2 py-0.5">
            {item.category}
          </span>
        </div>

        {/* Initiative Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-dark/60 mb-2">
            <span>{item.year}</span>
            {item.isStub && (
              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 font-bold">
                [Owner Detail Pending]
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone tracking-tight leading-tight">
            {item.title}
          </h1>
          <p className="text-base sm:text-lg text-stone-dark font-light mt-4 leading-relaxed bg-mist/60 p-6 border-l-4 border-fresh-red">
            {item.summary}
          </p>
        </div>

        {/* Initiative Content */}
        <div className="prose prose-stone max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-stone-dark/90">
          {item.paragraphs.map((p, idx) => (
            <p key={idx} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {/* Back Link CTA */}
        <div className="mt-12 pt-8 border-t border-stone/15 flex items-center justify-between">
          <Link
            href="/initiatives"
            className="text-xs font-display font-semibold uppercase text-fresh-red hover:underline inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View All Brand Initiatives</span>
          </Link>

          <Link
            href="/contact"
            className="px-5 py-2.5 bg-stone hover:bg-stone-dark text-paper text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            Connect With Our Team
          </Link>
        </div>
      </div>
    </div>
  )
}
