import React from 'react'
import Link from 'next/link'
import { Droplet, Wind, Flame, Sparkles, Sun, Eye, ArrowRight, ShieldCheck } from 'lucide-react'

export const dynamic = 'force-dynamic'

const PILLARS = [
  {
    num: '01',
    title: 'Use of surface water',
    detail: '100% surface water recycling prevents groundwater depletion at our Meghnaghat plant.',
    icon: Droplet,
  },
  {
    num: '02',
    title: 'No black smoke',
    detail: 'Automated multi-stage exhaust filtration ensures zero black smoke discharge into the atmosphere.',
    icon: Wind,
  },
  {
    num: '03',
    title: 'Smart heat control',
    detail: 'Thermal recapture ducting harnesses kiln exhaust energy to preheat dryers, drastically reducing fossil fuel draw.',
    icon: Flame,
  },
  {
    num: '04',
    title: 'Dust free workplace',
    detail: 'Industrial negative-pressure dust extraction protects artisan health across every production bay.',
    icon: Sparkles,
  },
  {
    num: '05',
    title: 'Use of solar energy',
    detail: 'Fully covered solar power unit spanning the immense production shed roof generates clean renewable megawatts.',
    icon: Sun,
  },
  {
    num: '06',
    title: 'Natural light design',
    detail: 'Architectural roof clerestory skylights maximize daytime natural illumination across sorting and packaging lines.',
    icon: Eye,
  },
]

export default async function SustainabilityPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isBn = locale === 'bn'

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="border-b border-stone/15 pb-8 mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-fresh-red">
            {isBn ? 'দায়িত্বশীল উৎপাদন' : 'Responsible Stewardship'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-2 tracking-tight">
            Sustainability & <span className="font-semibold text-stone">Six Plant Choices</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            Quality and responsibility meet at our Meghnaghat plant. How we manufacture is as important as the surfaces we create.
          </p>
        </div>

        {/* The 6 Choices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.num}
                className="bg-white border border-stone/15 p-8 shadow-sm flex flex-col justify-between hover:border-fresh-red transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-fresh-red bg-fresh-red/10 px-2 py-0.5">
                      Pillar {p.num}
                    </span>
                    <Icon className="w-5 h-5 text-stone-dark/40" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-stone">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-dark/70 mt-3 leading-relaxed font-light">
                    {p.detail}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-stone/10 text-[10px] font-mono text-stone-dark/60 uppercase">
                  Meghnaghat Ceramic Plant
                </div>
              </div>
            )
          })}
        </div>

        {/* Sustainable Products Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-stone text-paper p-8 border border-stone-dark shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-fresh-red font-bold">
                Material Efficiency
              </span>
              <h3 className="text-2xl font-display font-bold text-white mt-1">Slim Tiles</h3>
              <p className="text-xs text-grey mt-3 leading-relaxed font-light">
                25% to 29% reduction in tile dead load. Less stress on structural beams, lower embodied carbon during transport, and simplified renovation directly over legacy tiles.
              </p>
            </div>
            <Link
              href="/slim-tiles"
              className="mt-6 inline-flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-wider text-fresh-red hover:underline"
            >
              <span>Explore Slim Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-stone text-paper p-8 border border-stone-dark shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-fresh-red font-bold">
                Energy Conservation
              </span>
              <h3 className="text-2xl font-display font-bold text-white mt-1">Heatproof Tiles</h3>
              <p className="text-xs text-grey mt-3 leading-relaxed font-light">
                Delivers up to 30% HVAC energy cost savings through a specialized ceramic thermal barrier that repels summer heat and retains winter ambient warmth. Aligned with UN SDG 11.
              </p>
            </div>
            <Link
              href="/heatproof-tiles"
              className="mt-6 inline-flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-wider text-fresh-red hover:underline"
            >
              <span>Explore Thermal Barrier Specs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
