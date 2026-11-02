import React from 'react'
import Link from 'next/link'
import { Check, ShieldCheck, Cpu, Sparkles, Layers, Award, Truck, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

const LAB_TESTS = [
  'Dimensions & Surface Flatness (ISO 10545-2)',
  'Water Absorption Rate < 0.5% (ISO 10545-3)',
  'Modulus of Rupture MOR ≥ 35 N/mm² (ISO 10545-4)',
  'Breaking Strength ≥ 1300 N (ISO 10545-4)',
  'Deep Abrasion Resistance (ISO 10545-6)',
  'Thermal Shock Resistance (ISO 10545-9)',
  'Chemical & Stain Resistance (ISO 10545-13/14)',
  'Frost Resistance (ISO 10545-12)',
  'Linear Thermal Expansion (ISO 10545-8)',
  'Glaze Crazing Resistance (ISO 10545-11)',
  'Moisture Expansion Coefficient (ISO 10545-10)',
  'Impact Resistance by Coefficient of Restitution',
  'Slip Resistance (Pendulum & Ramp Method)',
  'Surface Glaze Scratch Hardness (Mohs Scale 6-7)',
]

export default async function QualityAndTechnologyPage({
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
            {isBn ? 'প্রযুক্তি ও মান নিয়ন্ত্রণ' : 'Technology & Standards'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-2 tracking-tight">
            Quality & <span className="font-semibold text-stone">Precision Technology</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            Automated production lines, the country’s largest polishing line, and 14 global standard laboratory tests guarantee 98% A-grade export quality.
          </p>
        </div>

        {/* 14 Laboratory Tests Grid */}
        <div className="bg-white border border-stone/15 p-8 md:p-12 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone/15 pb-6 mb-8">
            <div>
              <span className="text-xs font-mono font-bold text-fresh-red uppercase tracking-wider">
                ISO Certified Factory Lab
              </span>
              <h2 className="text-2xl font-display font-bold text-stone mt-1">
                14 Global Standard Factory Tests
              </h2>
            </div>
            <div className="text-right">
              <span className="text-3xl font-display font-bold text-fresh-red">98%</span>
              <p className="text-xs font-mono text-stone-dark/70">A-Grade Export Certification</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LAB_TESTS.map((testName, i) => (
              <div
                key={testName}
                className="flex items-start gap-3 p-3 bg-stone/5 border border-stone/10 text-xs font-display"
              >
                <div className="w-5 h-5 bg-fresh-red text-white flex items-center justify-center font-mono text-[10px] shrink-0 font-bold">
                  {i + 1}
                </div>
                <span className="text-stone font-medium">{testName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Technological Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 border border-stone/15 shadow-sm space-y-3">
            <Cpu className="w-6 h-6 text-fresh-red" />
            <h3 className="text-base font-display font-bold text-stone">Ultra Fine Squaring</h3>
            <p className="text-xs text-stone-dark/70 leading-relaxed font-light">
              Sub-millimeter laser-guided squaring eliminates corner gaps and guarantees laser-flat rectified joints.
            </p>
          </div>

          <div className="bg-white p-6 border border-stone/15 shadow-sm space-y-3">
            <Sparkles className="w-6 h-6 text-fresh-red" />
            <h3 className="text-base font-display font-bold text-stone">Nano Mirror Polish</h3>
            <p className="text-xs text-stone-dark/70 leading-relaxed font-light">
              Diamond multi-head polishing line with molecular nano-sealing delivering 95+ gloss reflection and scratch protection.
            </p>
          </div>

          <div className="bg-white p-6 border border-stone/15 shadow-sm space-y-3">
            <Layers className="w-6 h-6 text-fresh-red" />
            <h3 className="text-base font-display font-bold text-stone">Full Double Charge Line</h3>
            <p className="text-xs text-stone-dark/70 leading-relaxed font-light">
              First in Bangladesh producing all 3 sizes: 60x60, 80x80, and 60x120 cm with dual-layer pressed porcelain durability.
            </p>
          </div>
        </div>

        {/* Origin Statement */}
        <div className="bg-stone text-paper p-8 border border-stone-dark shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-display font-bold text-white">Global Engineering Heritage</h3>
            <p className="text-xs text-grey mt-1 max-w-xl font-light">
              Machinery sourced from the USA, Germany, Italy, and China. Premium raw materials and pigments from China, Malaysia, Thailand, Taiwan, India, and Spain.
            </p>
          </div>
          <Link
            href="/tiles"
            className="px-6 py-3 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm shrink-0"
          >
            Explore Tested Tiles
          </Link>
        </div>
      </div>
    </div>
  )
}
