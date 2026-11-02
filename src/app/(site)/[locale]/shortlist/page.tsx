'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Heart, Trash2, Share2, Check, ArrowRight, Compass, MessageSquareQuote, Download, Calculator, Building2, Scale, Store, MessageCircle } from 'lucide-react'

function ShortlistContent() {
  const searchParams = useSearchParams()
  const [shortlist, setShortlist] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [boqArea, setBoqArea] = useState<number>(1000)
  const [boqUnit, setBoqUnit] = useState<'sqft' | 'sqm'>('sqft')

  useEffect(() => {
    // 1. Add item if ?add=... is in URL
    const addCode = searchParams.get('add')
    const queryShortlist = searchParams.get('shortlist') || searchParams.get('items')

    let current: string[] = []
    try {
      const stored = localStorage.getItem('fresh_shortlist')
      if (stored) current = JSON.parse(stored)
    } catch {}

    if (queryShortlist) {
      const incoming = queryShortlist.split(',').filter(Boolean)
      current = Array.from(new Set([...current, ...incoming]))
    }

    if (addCode && !current.includes(addCode)) {
      current.push(addCode)
    }

    setShortlist(current)
    try {
      localStorage.setItem('fresh_shortlist', JSON.stringify(current))
    } catch {}
  }, [searchParams])

  const removeItem = (code: string) => {
    const next = shortlist.filter((c) => c !== code)
    setShortlist(next)
    try {
      localStorage.setItem('fresh_shortlist', JSON.stringify(next))
    } catch {}
  }

  const clearAll = () => {
    setShortlist([])
    try {
      localStorage.removeItem('fresh_shortlist')
    } catch {}
  }

  const copyShareLink = () => {
    const url = new URL(window.location.origin + '/tiles')
    url.searchParams.set('shortlist', shortlist.join(','))
    navigator.clipboard.writeText(url.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone/15 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-fresh-red mb-1">
              <Link href="/tiles" className="hover:underline">
                Catalogue
              </Link>
              <span>/</span>
              <span className="text-stone-dark/70">Project Specifier Schedule</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-light text-stone tracking-tight">
              Curated <span className="font-semibold text-stone">Shortlist</span>
            </h1>
            <p className="text-sm text-stone-dark/80 mt-1">
              Architectural material schedule for sample requisition, dealer quotation, and project specs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {shortlist.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={copyShareLink}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone hover:bg-stone-dark text-paper text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied' : 'Share Permlink'}</span>
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-stone-dark/60 hover:text-fresh-red uppercase font-display font-semibold px-2 py-1"
                >
                  Clear All
                </button>
              </>
            )}
          </div>
        </div>

        {/* Shortlist Content */}
        {shortlist.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <Heart className="w-12 h-12 text-stone-dark/30 mx-auto" />
            <h3 className="text-xl font-display font-bold text-stone">Your Shortlist is Empty</h3>
            <p className="text-xs text-stone-dark/70 max-w-sm mx-auto">
              Explore our architectural catalogue of 776 authentic designs and tap the heart icon to save products here.
            </p>
            <Link
              href="/tiles"
              className="inline-flex items-center gap-2 px-6 py-3 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-md"
            >
              <Compass className="w-4 h-4" />
              <span>Explore All 776 Tiles</span>
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="bg-white border border-stone/15 divide-y divide-stone/10 shadow-sm">
              {shortlist.map((code, idx) => (
                <div key={code} className="p-4 sm:p-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-bold text-stone-dark/40 w-6">
                      0{idx + 1}
                    </span>
                    <div className="w-16 h-16 bg-stone/10 border border-stone/15 flex items-center justify-center font-mono text-[10px] text-stone-dark/60">
                      FC
                    </div>
                    <div>
                      <h4 className="text-base font-display font-bold text-stone">
                        Tile SKU {code}
                      </h4>
                      <p className="text-xs text-stone-dark/70 font-mono mt-0.5">
                        Ultra Fine Squaring • 98% Grade A Export Quality
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/tiles?search=${code}`}
                      className="text-xs font-display font-semibold uppercase text-fresh-red hover:underline"
                    >
                      View Specs
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeItem(code)}
                      className="p-2 text-stone-dark/40 hover:text-fresh-red transition-colors"
                      title="Remove from shortlist"
                      aria-label={`Remove ${code}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Material BOQ Schedule & Estimation */}
            <div className="bg-white border border-stone/15 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone/15 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-fresh-red" />
                    <span className="text-xs font-mono uppercase tracking-widest text-fresh-red font-bold">
                      Material BOQ Schedule
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-stone mt-1">
                    Coverage, Waste & Structural Dead-Load Schedule
                  </h3>
                  <p className="text-xs text-stone-dark/70 mt-1">
                    Calculated with industry-standard 10% cutting and layout waste allowance.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-stone/5 p-1 border border-stone/15">
                    <button
                      type="button"
                      onClick={() => setBoqUnit('sqft')}
                      className={`px-3 py-1 text-xs font-mono font-semibold uppercase ${
                        boqUnit === 'sqft' ? 'bg-white shadow-sm text-stone font-bold' : 'text-stone-dark/60'
                      }`}
                    >
                      Sq. Ft
                    </button>
                    <button
                      type="button"
                      onClick={() => setBoqUnit('sqm')}
                      className={`px-3 py-1 text-xs font-mono font-semibold uppercase ${
                        boqUnit === 'sqm' ? 'bg-white shadow-sm text-stone font-bold' : 'text-stone-dark/60'
                      }`}
                    >
                      Sq. M
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Area Input */}
                <div className="lg:col-span-4 space-y-3">
                  <label className="block text-xs font-display font-semibold uppercase tracking-wider text-stone">
                    Net Project Floor / Wall Area:
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={10}
                      step={10}
                      value={boqArea}
                      onChange={(e) => setBoqArea(Math.max(1, Number(e.target.value) || 0))}
                      className="w-full py-2.5 px-4 pr-16 bg-stone/5 border border-stone/20 text-stone font-mono text-sm focus:outline-none focus:border-fresh-red"
                    />
                    <span className="absolute right-4 top-2.5 text-xs font-mono text-stone-dark/60 uppercase">
                      {boqUnit}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-dark/60 block">
                    +10% allowance added for diagonal cuts and joint perimeter.
                  </span>
                </div>

                {/* Calculated Metrics Cards */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(() => {
                    const effectiveSqft = boqUnit === 'sqft' ? boqArea * 1.1 : boqArea * 10.7639 * 1.1
                    const totalCartons = Math.ceil(effectiveSqft / 15.5)
                    const deadLoadMT = ((totalCartons * 24.5) / 1000).toFixed(2)

                    return (
                      <>
                        <div className="bg-mist/60 border border-stone/10 p-4">
                          <span className="text-[10px] font-mono uppercase text-stone-dark/60 block">
                            Gross Coverage (Inc. 10% Waste)
                          </span>
                          <span className="text-xl font-display font-bold text-stone mt-1 block">
                            {Math.round(effectiveSqft).toLocaleString()}{' '}
                            <span className="text-xs font-mono text-stone-dark/70">sq ft</span>
                          </span>
                          <span className="text-[10px] font-mono text-stone-dark/50">
                            ~{(effectiveSqft * 0.092903).toFixed(1)} m² gross
                          </span>
                        </div>

                        <div className="bg-mist/60 border border-stone/10 p-4">
                          <span className="text-[10px] font-mono uppercase text-stone-dark/60 block">
                            Total Cartons Required
                          </span>
                          <span className="text-xl font-display font-bold text-fresh-red mt-1 block">
                            {totalCartons.toLocaleString()}{' '}
                            <span className="text-xs font-mono text-stone-dark/70">boxes</span>
                          </span>
                          <span className="text-[10px] font-mono text-stone-dark/50">
                            Based on 15.5 sq ft / carton
                          </span>
                        </div>

                        <div className="bg-mist/60 border border-stone/10 p-4">
                          <span className="text-[10px] font-mono uppercase text-stone-dark/60 block">
                            Total Dead Load
                          </span>
                          <span className="text-xl font-display font-bold text-stone mt-1 block">
                            {deadLoadMT}{' '}
                            <span className="text-xs font-mono text-stone-dark/70">Metric Tons</span>
                          </span>
                          <span className="text-[10px] font-mono text-stone-dark/50">
                            At ~24.5 kg / carton standard
                          </span>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>

              {/* Nearest Showroom Stock Inquiry CTA */}
              <div className="mt-6 pt-4 border-t border-stone/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-stone-dark/80">
                  Ready to verify batch availability for this BOQ schedule at your nearest display centre?
                </p>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href={`/showrooms?inquire=boq&items=${shortlist.join(',')}&cartons=${Math.ceil(
                      (boqUnit === 'sqft' ? boqArea * 1.1 : boqArea * 10.7639 * 1.1) / 15.5
                    )}`}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-stone hover:bg-stone-dark text-paper text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <Store className="w-3.5 h-3.5 text-fresh-red" />
                    <span>Inquire Nearest Showroom Stock</span>
                  </Link>

                  <a
                    href={`https://wa.me/8801700112233?text=${encodeURIComponent(
                      `Hello Fresh Ceramics Concierge, please check stock availability for Shortlist BOQ: ${shortlist.join(
                        ', '
                      )} | Estimated ${Math.ceil(
                        (boqUnit === 'sqft' ? boqArea * 1.1 : boqArea * 10.7639 * 1.1) / 15.5
                      )} cartons for ${boqArea} ${boqUnit}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
                    title="WhatsApp BOQ Concierge"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">WhatsApp BOQ</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Conversion Actions */}
            <div className="bg-stone text-paper p-6 sm:p-8 border border-stone-dark flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
              <div>
                <h3 className="text-lg font-display font-bold text-white">
                  Ready to specify or request samples?
                </h3>
                <p className="text-xs text-grey mt-1">
                  Send your {shortlist.length} curated tile selections directly to our architectural project desk.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/contact?type=specification&items=${shortlist.join(',')}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-lg"
                >
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>Submit Specification Enquiry</span>
                </Link>

                <Link
                  href="/tiles"
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-stone-dark hover:bg-stone-light/20 text-paper text-xs font-display font-semibold uppercase tracking-wider border border-stone-light/30 transition-colors"
                >
                  <span>Continue Browsing</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ShortlistPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-fresh-red border-t-transparent animate-spin" />
        </div>
      }
    >
      <ShortlistContent />
    </Suspense>
  )
}
