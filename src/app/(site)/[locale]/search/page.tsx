'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, Compass, Store, Sparkles, ArrowRight, X } from 'lucide-react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) setQuery(q)
  }, [searchParams])

  const sampleResults = [
    { title: 'Carrara Statuario Double Charge', type: 'Tile SKU', code: 'FC-60120-DC01', link: '/tiles?search=Carrara' },
    { title: 'Double Charge Sizing & Polish', type: 'Finish', code: '60x60, 80x80, 60x120', link: '/collections/double-charge' },
    { title: 'Dhaka Flagship Display Centre', type: 'Showroom', code: 'Gulshan, Dhaka', link: '/showrooms' },
    { title: 'Slim Tiles Dead-Load Reduction', type: 'Innovation', code: '25-29% Lighter', link: '/slim-tiles' },
    { title: 'Heatproof Ceramic Thermal Barrier', type: 'Innovation', code: '30% Energy Saving', link: '/heatproof-tiles' },
    { title: 'Meghnaghat Tile Plant Six Choices', type: 'Sustainability', code: 'Sonargaon', link: '/sustainability' },
  ]

  const filtered = query.trim()
    ? sampleResults.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.type.toLowerCase().includes(query.toLowerCase()) ||
          r.code.toLowerCase().includes(query.toLowerCase())
      )
    : sampleResults

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="border-b border-stone/15 pb-8 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-fresh-red">
            Site-wide Search
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-light text-stone mt-2 tracking-tight">
            Search <span className="font-semibold text-stone">Fresh Ceramics</span>
          </h1>

          {/* Search Input */}
          <div className="mt-6 relative">
            <Search className="w-5 h-5 text-stone-dark/50 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tiles, finishes, showrooms, sustainability, guides..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-white border border-stone/20 text-stone text-sm shadow-sm focus:outline-none focus:border-fresh-red"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-dark/50 hover:text-stone"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-dark/70 font-mono pb-2">
            <span>RESULTS ({filtered.length})</span>
            {query && <span>QUERY: &ldquo;{query}&rdquo;</span>}
          </div>

          <div className="bg-white border border-stone/15 divide-y divide-stone/10 shadow-sm">
            {filtered.map((r) => (
              <Link
                key={r.title}
                href={r.link}
                className="p-5 flex items-center justify-between hover:bg-stone/5 transition-colors group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-fresh-red bg-fresh-red/10 px-1.5 py-0.5">
                      {r.type}
                    </span>
                    <span className="text-xs font-mono text-stone-dark/60">{r.code}</span>
                  </div>
                  <h3 className="text-base font-display font-bold text-stone group-hover:text-fresh-red transition-colors mt-1">
                    {r.title}
                  </h3>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-dark/40 group-hover:text-fresh-red group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
