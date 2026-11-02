import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BookOpen, Clock, ShieldCheck, CheckCircle2, Share2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

const STATIC_GUIDE_CONTENT: Record<string, {
  title: string
  category: string
  date: string
  summary: string
  content: string[]
}> = {
  'water-absorption-porcelain-vs-ceramic': {
    title: 'Understanding Water Absorption: Porcelain vs Conventional Ceramic',
    category: 'Material Science',
    date: '2026',
    summary: 'Why water absorption under 0.5% (ISO 10545-3) is critical for structural strength, frost resistance, and permanent stain resistance in tropical climates.',
    content: [
      'In architectural ceramic science, water absorption is the single most definitive parameter governing a tile durability and structural density. Under ISO 13006 and BDS EN 14411 international standards, porcelain is categorized as Group BIa, requiring a water absorption rate of less than 0.5% by weight.',
      'Conventional ceramic wall tiles, by contrast, frequently absorb between 10% and 18% water. When installed in high-humidity tropical zones or exposed outdoor environments, porous tiles absorb ambient moisture, expanding microscopically and risking crazing, internal stress fractures, and adhesive detachment.',
      'At Fresh Ceramics Meghnaghat plant, ultra-purified raw clay minerals from India, Thailand and Malaysia are processed under high-pressure hydraulic compaction and fired at temperatures reaching 1,200°C. The resulting vitrified porcelain body achieves near-zero porosity (<0.5%), making it virtually impervious to water, fungal growth, and sub-surface staining.',
      'Specifying Group BIa porcelain for floors and demanding wet environments ensures lifelong structural integrity and eliminates mold growth behind tile joints.'
    ],
  },
  'ultra-fine-squaring-joint-alignment': {
    title: 'Ultra Fine Squaring: The Geometry of Zero Corner Gaps',
    category: 'Installation & Craft',
    date: '2026',
    summary: 'How precision automated rectification at our Meghnaghat plant eliminates edge lippage and guarantees perfect 90-degree orthogonal corners.',
    content: [
      'During high-temperature kiln firing, natural ceramic bodies contract non-uniformly. Without post-firing rectification, uncalibrated tiles exhibit slight edge curvature (warping) and dimensional tolerances of ±1.5 mm, resulting in unsightly staggered joints and wide grout lines on site.',
      'Fresh Ceramics deploys Ultra Fine Squaring Technology utilizing diamond-tipped automated squaring and chamfering lines. Each fired slab is measured with laser micrometers and mechanically ground on all four edges to exact 90.0° orthogonal precision.',
      'The result is zero corner variance. Fitters and contractors achieve crisp, razor-sharp butt joints with minimal 1 mm to 1.5 mm grout lines, delivering uninterrupted monolithic stone floors across expansive residential and commercial spaces.',
      'Every carton is equipped with protective corner caps and heavy-gauge poly shrink wrap to safeguard these calibrated edges during transport and handling on site.'
    ],
  },
  'mirror-polished-nano-care': {
    title: 'Maintaining Mirror Polished Tiles: Nano-Technology Protection',
    category: 'Care & Maintenance',
    date: '2026',
    summary: 'The science behind our nano-coatings that seal microscopic surface pores, delivering optical clarity, deep specular reflection and effortless cleaning.',
    content: [
      'Mirror polished porcelain tiles are celebrated for their luminous, reflective brilliance. However, the abrasive grinding discs used in polishing traditionally expose microscopic micropores on the tile surface, which can trap dirt, spilled tea, and particulate soot if left unsealed.',
      'Fresh Ceramics operates the largest automated polishing line in Bangladesh, equipped with integrated inline Nano-Technology. Sub-micron silica compounds are bonded into the surface under extreme mechanical pressure and temperature, hermetically sealing every open pore.',
      'To maintain this specular clarity, daily maintenance requires only warm water and a neutral pH micro-fiber mop. Harsh acidic cleaners and abrasive scouring powders should never be used, as they degrade grout lines.',
      'Spills of tea, coffee, or oils can be wiped clean with a damp cloth with zero residual ghosting, preserving the pristine architectural finish for decades.'
    ],
  },
  'choosing-tiles-by-space': {
    title: 'Selecting Surfaces: From High-Footfall Lobbies to Wet Zones',
    category: 'Selection Guide',
    date: '2026',
    summary: 'A specifier guide on matching tile slip resistance (R10), MOR breaking strength, and aesthetic finishes across residential and commercial spaces.',
    content: [
      'Successful architectural interior design requires pairing the right functional surface with the specific traffic, moisture, and cleaning demands of each space.',
      'For grand living rooms and master suites, Double Charge porcelain in 60x120 cm or 80x80 cm formats provides a deep, wear-resistant surface that never loses its pattern because the pigment matrix runs deep through the upper body.',
      'For ensuite bathrooms and wet zones, pairing high-gloss wall ceramics with matt or tactile anti-slip porcelain floors (R10 slip rating) ensures personal safety while preventing soap scum buildup.',
      'In high-traffic commercial atriums and retail spaces, high modulus of rupture (MOR ≥ 35 N/mm²) prevents cracking under heavy concentrated static and rolling loads.'
    ],
  },
}

export default async function LearnDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const isBn = locale === 'bn'

  const guide = STATIC_GUIDE_CONTENT[slug]
  if (!guide) {
    notFound()
  }

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-stone/15 pb-6 mb-8 flex items-center justify-between">
          <Link
            href={isBn ? '/bn/learn' : '/learn'}
            className="inline-flex items-center gap-2 text-xs font-mono text-stone hover:text-fresh-red transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isBn ? 'সকল গাইডে ফিরে যান' : 'Back to Knowledge Hub'}</span>
          </Link>
          <span className="text-[10px] font-mono text-fresh-red uppercase font-bold bg-fresh-red/10 px-2 py-0.5">
            {guide.category}
          </span>
        </div>

        {/* Article Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone tracking-tight leading-tight">
            {guide.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-xs font-mono text-stone-dark/60 border-b border-stone/15 pb-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Published {guide.date}</span>
            </span>
            <span>•</span>
            <span>Fresh Ceramics Technical Desk</span>
          </div>
          <p className="text-base sm:text-lg text-stone-dark font-light mt-4 leading-relaxed bg-mist/60 p-6 border-l-4 border-fresh-red">
            {guide.summary}
          </p>
        </div>

        {/* Article Body */}
        <div className="prose prose-stone max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-stone-dark/90">
          {guide.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 pt-8 border-t border-stone/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-display font-bold text-stone">
              Have questions about tile specifications?
            </h4>
            <p className="text-xs text-stone-dark/70">
              Our architectural advisors are ready to assist with samples and technical consultations.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            Contact Technical Desk
          </Link>
        </div>
      </div>
    </div>
  )
}
