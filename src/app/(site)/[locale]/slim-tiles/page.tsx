'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Feather, Car, Building2, ShieldCheck, ArrowRight } from 'lucide-react'

const SQFT_TO_SQM = 0.092903
const CAR_EQUIVALENT_KG = 1330

const VARIANTS = {
  A: {
    name: 'Variant A (Standard Architectural Slim)',
    conventionalKg: 21.83,
    slimKg: 16.38,
    reductionPercent: 25,
  },
  B: {
    name: 'Variant B (Heavy Duty Commercial Slim)',
    conventionalKg: 25.04,
    slimKg: 17.83,
    reductionPercent: 29,
  },
}

export default function SlimTilesPage() {
  const [selectedVariant, setSelectedVariant] = useState<'A' | 'B'>('A')
  const [storeys, setStoreys] = useState(10)
  const [areaSqft, setAreaSqft] = useState(5000)

  const variant = VARIANTS[selectedVariant]
  const diffPerSqm = variant.conventionalKg - variant.slimKg
  const totalSqm = areaSqft * storeys * SQFT_TO_SQM
  const savedKg = totalSqm * diffPerSqm
  const savedMT = (savedKg / 1000).toFixed(1)
  const cars = Math.round(savedKg / CAR_EQUIVALENT_KG)

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="border-b border-stone/15 pb-8 mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-fresh-red">
            Sustainable Innovation
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-2 tracking-tight">
            Slim Tiles: <span className="font-semibold text-stone">Reduced Dead Load</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            Engineered ultra-slim porcelain delivering 25% to 29% weight reduction. Less gravitational stress on beams, critical seismic safety, and direct renovation over legacy flooring.
          </p>
        </div>

        {/* Live Structural Dead-Load Calculator */}
        <div className="bg-white border border-stone/15 p-8 md:p-12 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone/15 pb-6 mb-8">
            <div>
              <span className="text-xs font-mono font-bold text-fresh-red uppercase tracking-wider">
                Structural Engineering Model
              </span>
              <h2 className="text-2xl font-display font-bold text-stone mt-1">
                Dead-Load & Car Load Reduction Calculator
              </h2>
            </div>
            <div className="flex gap-2">
              {(['A', 'B'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-4 py-2 text-xs font-display font-semibold uppercase tracking-wider transition-all ${
                    selectedVariant === v
                      ? 'bg-fresh-red text-white shadow-sm'
                      : 'bg-stone/5 text-stone hover:bg-stone/10'
                  }`}
                >
                  Variant {v} (-{VARIANTS[v].reductionPercent}%)
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-display font-medium text-stone mb-1">
                  <span>Number of Building Storeys:</span>
                  <span className="font-mono font-bold text-fresh-red">{storeys} storeys</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={storeys}
                  onChange={(e) => setStoreys(Number(e.target.value))}
                  className="w-full accent-fresh-red cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-display font-medium text-stone mb-1">
                  <span>Floor Area Per Storey (sq ft):</span>
                  <span className="font-mono font-bold text-stone">{areaSqft.toLocaleString()} sq ft</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="500"
                  value={areaSqft}
                  onChange={(e) => setAreaSqft(Number(e.target.value))}
                  className="w-full accent-fresh-red cursor-pointer"
                />
              </div>

              <div className="text-xs font-mono text-stone-dark/70 space-y-1 pt-2 border-t border-stone/10">
                <p>Conventional weight: {variant.conventionalKg} kg/m²</p>
                <p>Fresh Slim weight: {variant.slimKg} kg/m² (-{variant.reductionPercent}%)</p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-stone text-paper p-8 border border-stone-dark shadow-md flex flex-col justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-fresh-red font-bold">
                  Structural Weight Removed
                </span>
                <p className="text-4xl sm:text-5xl font-mono font-bold text-white mt-1">
                  {savedMT} <span className="text-base font-normal text-grey">MT</span>
                </p>
                <p className="text-xs text-grey mt-1">
                  {(savedKg).toLocaleString(undefined, { maximumFractionDigits: 0 })} kg dead-load removed
                </p>
              </div>

              <div className="pt-4 border-t border-stone-light/20 flex items-center gap-4">
                <Car className="w-8 h-8 text-fresh-red shrink-0" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-grey block">
                    Automobile Equivalence
                  </span>
                  <p className="text-2xl font-mono font-bold text-white">
                    {cars} <span className="text-sm font-normal text-grey">Toyota Corollas</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-stone/15 shadow-sm space-y-2">
            <h3 className="text-base font-display font-bold text-stone">Seismic Safety</h3>
            <p className="text-xs text-stone-dark/70 leading-relaxed font-light">
              Lighter wall tiles significantly reduce gravitational shear stress and detachment hazard during seismic tremors.
            </p>
          </div>
          <div className="bg-white p-6 border border-stone/15 shadow-sm space-y-2">
            <h3 className="text-base font-display font-bold text-stone">Over-Tile Renovation</h3>
            <p className="text-xs text-stone-dark/70 leading-relaxed font-light">
              Slim profile permits overlaying directly on existing tiles without removing legacy flooring or altering door thresholds.
            </p>
          </div>
          <div className="bg-white p-6 border border-stone/15 shadow-sm space-y-2">
            <h3 className="text-base font-display font-bold text-stone">LEED Green Credits</h3>
            <p className="text-xs text-stone-dark/70 leading-relaxed font-light">
              Lower embodied transport carbon and reduced raw mineral extraction contribute directly toward LEED green building points.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
