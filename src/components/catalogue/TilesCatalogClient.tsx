'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import {
  Search,
  SlidersHorizontal,
  Heart,
  Check,
  Share2,
  ArrowRight,
  X,
  Layers,
  Maximize2,
  Eye,
  Sparkles,
  Info,
  Grid,
  Columns
} from 'lucide-react'

export interface TileProduct {
  id: string
  code: string
  name: string
  slug: string
  category: 'floor' | 'wall'
  finishName: string
  finishSlug: string
  sizeName: string
  sizeCode: string
  widthCm?: number
  heightCm?: number
  wallSetName?: string
  wallTileRole?: 'light' | 'deep' | 'decor-01' | 'decor-02' | 'general'
  imageUrl?: string
  imageAlt?: string
  isSlim?: boolean
  isHeatproof?: boolean
  waterAbsorption?: string
  mor?: string
  sqftPerBox?: number
}

export interface WallTileSet {
  setName: string
  finishName: string
  sizeName: string
  widthCm: number
  heightCm: number
  tiles: TileProduct[]
}

// Proportional Aspect Ratio helper respecting vertical Floor and horizontal Wall
function getTileProportionClass(category: 'floor' | 'wall', sizeCode?: string) {
  const c = (sizeCode || '').toLowerCase()
  if (category === 'floor') {
    // Floor is vertical: Width x Height
    if (c.includes('60x120')) return 'w-24 h-48 aspect-[1/2]' // 60cm W x 120cm H
    if (c.includes('20x120')) return 'w-12 h-52 aspect-[1/6]' // 20cm W x 120cm H plank
    if (c.includes('80x80')) return 'w-40 h-40 aspect-square' // 80x80
    if (c.includes('60x60')) return 'w-34 h-34 aspect-square' // 60x60
    if (c.includes('40x40')) return 'w-26 h-26 aspect-square' // 40x40
    if (c.includes('30x30')) return 'w-20 h-20 aspect-square' // 30x30
    if (c.includes('30x60')) return 'w-24 h-44 aspect-[1/2]' // stair
    return 'w-32 h-32 aspect-square'
  } else {
    // Wall is horizontal: Height x Width
    if (c.includes('30x60')) return 'w-48 h-24 aspect-[2/1]' // 30cm H x 60cm W
    if (c.includes('30x50')) return 'w-44 h-26 aspect-[5/3]' // 30cm H x 50cm W
    if (c.includes('30x45')) return 'w-40 h-26 aspect-[3/2]' // 30cm H x 45cm W
    if (c.includes('25x40')) return 'w-38 h-24 aspect-[8/5]' // 25cm H x 40cm W
    if (c.includes('20x30')) return 'w-32 h-22 aspect-[3/2]' // 20cm H x 30cm W
    return 'w-40 h-24 aspect-[5/3]'
  }
}

interface TilesCatalogClientProps {
  initialProducts: TileProduct[]
  initialWallSets?: WallTileSet[]
  locale?: string
}

export function TilesCatalogClient({
  initialProducts,
  initialWallSets = [],
  locale = 'en',
}: TilesCatalogClientProps) {
  const searchParams = useSearchParams()
  const isBn = locale === 'bn'

  // View Mode: 'individual' vs 'sets'
  const [viewMode, setViewMode] = useState<'individual' | 'sets'>('individual')

  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'floor' | 'wall'>('all')
  const [selectedFinish, setSelectedFinish] = useState<string>('all')
  const [selectedSize, setSelectedSize] = useState<string>('all')
  const [selectedFeature, setSelectedFeature] = useState<'all' | 'slim' | 'heatproof'>('all')

  // Shortlist state
  const [shortlist, setShortlist] = useState<string[]>([])
  const [copiedLink, setCopiedLink] = useState(false)

  // Modals state
  const [selectedScaleTile, setSelectedScaleTile] = useState<TileProduct | null>(null)
  const [isScaleGuideOpen, setIsScaleGuideOpen] = useState(false)
  const [activeWallSet, setActiveWallSet] = useState<WallTileSet | null>(null)
  const [wallDecorChoice, setWallDecorChoice] = useState<'decor-01' | 'decor-02'>('decor-01')

  // Sync shortlist
  useEffect(() => {
    const syncShortlist = () => {
      try {
        const stored = localStorage.getItem('fresh_shortlist')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) setShortlist(parsed)
        }
      } catch {}
    }
    syncShortlist()
    window.addEventListener('storage', syncShortlist)
    window.addEventListener('focus', syncShortlist)
    return () => {
      window.removeEventListener('storage', syncShortlist)
      window.removeEventListener('focus', syncShortlist)
    }
  }, [])

  // Sync URL search params
  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat === 'floor' || cat === 'wall') setCategoryFilter(cat)

    const finish = searchParams.get('finish')
    if (finish) setSelectedFinish(finish)

    const size = searchParams.get('size')
    if (size) setSelectedSize(size)

    const mode = searchParams.get('view')
    if (mode === 'sets') setViewMode('sets')
  }, [searchParams])

  const toggleShortlist = (code: string) => {
    let next: string[]
    if (shortlist.includes(code)) {
      next = shortlist.filter((c) => c !== code)
    } else {
      next = [...shortlist, code]
    }
    setShortlist(next)
    try {
      localStorage.setItem('fresh_shortlist', JSON.stringify(next))
    } catch {}
  }

  const copyShareableLink = () => {
    if (shortlist.length === 0) return
    const url = new URL(window.location.href)
    url.searchParams.set('shortlist', shortlist.join(','))
    navigator.clipboard.writeText(url.toString())
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  // Derive filter options
  const finishOptions = useMemo(() => {
    const map = new Map<string, string>()
    initialProducts.forEach((p) => {
      if (p.finishSlug && p.finishName) map.set(p.finishSlug, p.finishName)
    })
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }))
  }, [initialProducts])

  const sizeOptions = useMemo(() => {
    const map = new Map<string, string>()
    initialProducts.forEach((p) => {
      if (p.sizeCode && p.sizeName) map.set(p.sizeCode, p.sizeName)
    })
    return Array.from(map.entries()).map(([code, name]) => ({ code, name }))
  }, [initialProducts])

  // Filter individual products
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false
      if (selectedFinish !== 'all' && p.finishSlug !== selectedFinish) return false
      if (selectedSize !== 'all' && p.sizeCode !== selectedSize) return false
      if (selectedFeature === 'slim' && !p.isSlim) return false
      if (selectedFeature === 'heatproof' && !p.isHeatproof) return false

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchName = (p.name || '').toLowerCase().includes(q)
        const matchCode = (p.code || '').toLowerCase().includes(q)
        const matchFinish = (p.finishName || '').toLowerCase().includes(q)
        const matchSize = (p.sizeName || '').toLowerCase().includes(q)
        const matchSet = (p.wallSetName || '').toLowerCase().includes(q)
        if (!matchName && !matchCode && !matchFinish && !matchSize && !matchSet) return false
      }
      return true
    })
  }, [initialProducts, categoryFilter, selectedFinish, selectedSize, selectedFeature, searchQuery])

  // Filter wall sets
  const filteredWallSets = useMemo(() => {
    return initialWallSets.filter((ws) => {
      if (categoryFilter === 'floor') return false
      if (selectedSize !== 'all' && !ws.sizeName.toLowerCase().includes(selectedSize.toLowerCase())) return false

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchSet = ws.setName.toLowerCase().includes(q)
        const matchTiles = ws.tiles.some(t => t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q))
        if (!matchSet && !matchTiles) return false
      }
      return true
    })
  }, [initialWallSets, categoryFilter, selectedSize, searchQuery])

  const resetFilters = () => {
    setSearchQuery('')
    setCategoryFilter('all')
    setSelectedFinish('all')
    setSelectedSize('all')
    setSelectedFeature('all')
  }

  const hasActiveFilters =
    categoryFilter !== 'all' ||
    selectedFinish !== 'all' ||
    selectedSize !== 'all' ||
    selectedFeature !== 'all' ||
    searchQuery.trim().length > 0

  // Standard sizes list for relative size comparison guide
  const RELATIVE_SIZES_GUIDE = [
    { cat: 'Floor', label: '60x120 cm', w: 60, h: 120, note: 'Largest floor format (Vertical)', aspect: 'aspect-[1/2]', wClass: 'w-20', hClass: 'h-40' },
    { cat: 'Floor', label: '80x80 cm', w: 80, h: 80, note: 'Grand format square', aspect: 'aspect-square', wClass: 'w-32', hClass: 'h-32' },
    { cat: 'Floor', label: '60x60 cm', w: 60, h: 60, note: 'Standard vitrified porcelain', aspect: 'aspect-square', wClass: 'w-24', hClass: 'h-24' },
    { cat: 'Floor', label: '20x120 cm', w: 20, h: 120, note: 'Narrow plank (Smallest width)', aspect: 'aspect-[1/6]', wClass: 'w-10', hClass: 'h-40' },
    { cat: 'Floor', label: '40x40 cm', w: 40, h: 40, note: 'Medium floor square', aspect: 'aspect-square', wClass: 'w-18', hClass: 'h-18' },
    { cat: 'Floor', label: '30x30 cm', w: 30, h: 30, note: 'Smallest floor format', aspect: 'aspect-square', wClass: 'w-14', hClass: 'h-14' },
    { cat: 'Wall', label: '30x60 cm', w: 60, h: 30, note: 'Largest wall format (Horizontal)', aspect: 'aspect-[2/1]', wClass: 'w-36', hClass: 'h-18' },
    { cat: 'Wall', label: '30x50 cm', w: 50, h: 30, note: 'Horizontal architectural wall', aspect: 'aspect-[5/3]', wClass: 'w-32', hClass: 'h-18' },
    { cat: 'Wall', label: '30x45 cm', w: 45, h: 30, note: 'Horizontal wall set series', aspect: 'aspect-[3/2]', wClass: 'w-28', hClass: 'h-18' },
    { cat: 'Wall', label: '25x40 cm', w: 40, h: 25, note: 'Horizontal bath & kitchen tile', aspect: 'aspect-[8/5]', wClass: 'w-26', hClass: 'h-16' },
    { cat: 'Wall', label: '20x30 cm', w: 30, h: 20, note: 'Smallest wall format (Horizontal)', aspect: 'aspect-[3/2]', wClass: 'w-20', hClass: 'h-13' },
  ]

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-[#18181B]">
      {/* Top Hero Banner */}
      <div className="bg-[#18181B] text-white pt-28 pb-12 px-4 sm:px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E30613] mb-2">
              <Link href={isBn ? '/bn' : '/'} className="hover:underline">
                {isBn ? 'হোম' : 'Home'}
              </Link>
              <span>/</span>
              <span className="text-neutral-400">
                {isBn ? 'অথেনটিক ক্যাটালগ' : 'Official Fresh Ceramics Catalog'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-light text-white tracking-tight">
              {isBn ? (
                <>আর্কিটেকচারাল সারফেস <strong className="font-bold text-[#E30613]">ক্যাটালগ</strong></>
              ) : (
                <>Architectural Surfaces <strong className="font-bold text-[#E30613]">Catalogue</strong></>
              )}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-neutral-300 mt-2 max-w-2xl font-light">
              {isBn
                ? '৭৭৬টি সম্পূর্ণ গুগল ড্রাইভ সংগৃহীত অথেনটিক টাইলস ও ১৬০টি সমন্বিত ওয়াল সেট। নিখুঁত অনুপাত ও ফিনিশ।'
                : '776 authentic tile designs & 160 coordinated wall tile sets directly curated from the official Fresh Ceramics repository.'}
            </p>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Relative Scale Guide Button */}
            <button
              type="button"
              onClick={() => setIsScaleGuideOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              title="View proportional dimensions comparison"
            >
              <Maximize2 className="w-4 h-4 text-[#E30613]" />
              <span>{isBn ? 'সাইজ ও অনুপাত গাইড' : 'Relative Size Guide'}</span>
            </button>

            {/* Shortlist Button */}
            <Link
              href={isBn ? '/bn/shortlist' : '/shortlist'}
              className="inline-flex items-center gap-2 px-4 py-3 bg-[#E30613] hover:bg-[#c40510] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>
                {isBn ? 'শর্টলিস্ট' : 'Shortlist'} ({shortlist.length})
              </span>
            </Link>

            {shortlist.length > 0 && (
              <button
                type="button"
                onClick={copyShareableLink}
                className="inline-flex items-center gap-1.5 px-3 py-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                title="Copy shareable shortlist link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'Copied' : 'Share'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Sticky Filter & View Switcher Bar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-black/10 px-4 sm:px-6 md:px-12 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: View Mode Toggle & Category Filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Toggle: Sets vs Individual */}
            <div className="flex items-center bg-neutral-100 p-0.5 border border-black/10 text-xs font-semibold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setViewMode('individual')}
                className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                  viewMode === 'individual'
                    ? 'bg-[#E30613] text-white font-bold shadow-sm'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>{isBn ? 'সকল একক টাইলস' : 'All Individual Tiles'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('sets')}
                className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                  viewMode === 'sets'
                    ? 'bg-[#E30613] text-white font-bold shadow-sm'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>{isBn ? 'ওয়াল টাইল সেট' : 'Wall Tile Sets'} ({initialWallSets.length})</span>
              </button>
            </div>

            {/* Category Segmented Control (Only for Individual Mode) */}
            {viewMode === 'individual' && (
              <div className="flex items-center bg-neutral-100 p-0.5 border border-black/10 text-xs font-semibold uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setCategoryFilter('all')}
                  className={`px-3 py-1.5 transition-colors ${
                    categoryFilter === 'all'
                      ? 'bg-[#18181B] text-white font-bold shadow-sm'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {isBn ? 'সব' : 'All'} ({initialProducts.length})
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryFilter('floor')}
                  className={`px-3 py-1.5 transition-colors ${
                    categoryFilter === 'floor'
                      ? 'bg-[#E30613] text-white font-bold shadow-sm'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {isBn ? 'ফ্লোর' : 'Floor'} (284)
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryFilter('wall')}
                  className={`px-3 py-1.5 transition-colors ${
                    categoryFilter === 'wall'
                      ? 'bg-[#E30613] text-white font-bold shadow-sm'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {isBn ? 'ওয়াল' : 'Wall'} (492)
                </button>
              </div>
            )}
          </div>

          {/* Right: Search Input & Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative min-w-[180px] flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder={isBn ? 'মডেল বা কোড খুঁজুন...' : 'Search model or SKU...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-neutral-50 border border-black/15 text-[#18181B] focus:outline-none focus:border-[#E30613]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Finish Filter */}
            {viewMode === 'individual' && (
              <select
                value={selectedFinish}
                onChange={(e) => setSelectedFinish(e.target.value)}
                className="py-1.5 px-2.5 text-xs bg-neutral-50 border border-black/15 text-[#18181B] focus:outline-none focus:border-[#E30613]"
              >
                <option value="all">{isBn ? 'সকল ফিনিশ' : 'All Finishes'}</option>
                {finishOptions.map((f) => (
                  <option key={f.slug} value={f.slug}>
                    {f.name}
                  </option>
                ))}
              </select>
            )}

            {/* Size Filter */}
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="py-1.5 px-2.5 text-xs bg-neutral-50 border border-black/15 text-[#18181B] focus:outline-none focus:border-[#E30613]"
            >
              <option value="all">{isBn ? 'সকল সাইজ' : 'All Sizes'}</option>
              {sizeOptions.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#E30613] hover:underline uppercase font-bold tracking-wider px-1.5 py-1"
              >
                {isBn ? 'রিসেট' : 'Reset'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8">
        {/* VIEW 1: Wall Tile Sets View */}
        {viewMode === 'sets' ? (
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
              <div>
                <h2 className="text-lg font-bold text-[#18181B] uppercase tracking-wide">
                  {isBn ? 'ওয়াল টাইল সেট সমন্বয়' : 'Coordinated Wall Tile Sets'}
                </h2>
                <p className="text-xs text-neutral-500">
                  {isBn
                    ? 'প্রতিটি সেটে রয়েছে লাইট, ডিপ ও স্পেস-ভিত্তিক ডেকর (কিচেন ও ওয়াশরুম)।'
                    : 'Each set features matching Light, Deep, and targeted Decor tiles for 9ft architectural elevation.'}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#E30613]">
                {filteredWallSets.length} {isBn ? 'টি সেট' : 'Sets Found'}
              </span>
            </div>

            {filteredWallSets.length === 0 ? (
              <div className="py-16 text-center text-neutral-500">
                <p>{isBn ? 'কোনো সেট পাওয়া যায়নি।' : 'No wall sets match your criteria.'}</p>
                <button
                  onClick={resetFilters}
                  className="mt-3 px-4 py-2 bg-[#E30613] text-white text-xs font-bold uppercase tracking-wider"
                >
                  {isBn ? 'ফিল্টার রিসেট' : 'Reset Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWallSets.map((ws) => {
                  const lightTile = ws.tiles.find((t) => t.wallTileRole === 'light')
                  const deepTile = ws.tiles.find((t) => t.wallTileRole === 'deep')
                  const decor01 = ws.tiles.find((t) => t.wallTileRole === 'decor-01')
                  const decor02 = ws.tiles.find((t) => t.wallTileRole === 'decor-02')

                  return (
                    <div
                      key={ws.setName}
                      className="bg-white border border-black/10 hover:border-[#E30613] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                    >
                      {/* Set Header */}
                      <div className="p-4 border-b border-black/5 bg-neutral-50 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-[#E30613] font-bold uppercase tracking-widest">
                            WALL SET • {ws.sizeName}
                          </span>
                          <h3 className="font-bold text-sm text-[#18181B]">{ws.setName}</h3>
                        </div>
                        <span className="text-[10px] font-semibold bg-black/5 px-2 py-0.5 border border-black/10">
                          {ws.finishName}
                        </span>
                      </div>

                      {/* Multi-Tile Showcase: Uniform Height Swatches */}
                      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-neutral-100/60 min-h-[160px] items-center">
                        {ws.tiles.slice(0, 4).map((t) => (
                          <div
                            key={t.code}
                            className="bg-white p-2 border border-black/10 shadow-sm flex flex-col items-center justify-between text-center h-[140px]"
                          >
                            <div className="relative w-full h-[85px] bg-neutral-50 flex items-center justify-center overflow-hidden">
                              {t.imageUrl ? (
                                <Image
                                  src={t.imageUrl}
                                  alt={t.name}
                                  fill
                                  sizes="160px"
                                  className="object-contain"
                                />
                              ) : (
                                <div className="text-[10px] text-neutral-400">No Image</div>
                              )}
                            </div>
                            <div className="w-full pt-1.5 border-t border-black/5">
                              <span
                                className={`inline-block text-[9px] font-mono font-bold px-1 py-0.2 uppercase ${
                                  t.wallTileRole === 'decor-02'
                                    ? 'bg-amber-100 text-amber-800'
                                    : t.wallTileRole === 'decor-01'
                                    ? 'bg-blue-100 text-blue-800'
                                    : t.wallTileRole === 'light'
                                    ? 'bg-neutral-200 text-neutral-800'
                                    : 'bg-neutral-800 text-white'
                                }`}
                              >
                                {t.wallTileRole === 'decor-02'
                                  ? 'Kitchen Decor'
                                  : t.wallTileRole === 'decor-01'
                                  ? 'Washroom Decor'
                                  : t.wallTileRole === 'light'
                                  ? 'Light'
                                  : t.wallTileRole === 'deep'
                                  ? 'Deep'
                                  : 'Tile'}
                              </span>
                              <div className="text-[10px] font-mono font-semibold text-neutral-800 truncate mt-0.5">
                                {t.name}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Set Footer Action */}
                      <div className="p-3.5 border-t border-black/10 bg-white flex items-center justify-between">
                        <span className="text-[11px] text-neutral-500 font-mono">
                          {ws.tiles.length} {isBn ? 'টি টাইলস' : 'Pieces Set'}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveWallSet(ws)
                            setWallDecorChoice(decor01 ? 'decor-01' : 'decor-02')
                          }}
                          className="px-3 py-1.5 bg-[#E30613] hover:bg-[#c40510] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isBn ? '৯-ফিট ওয়াল প্রিভিউ' : 'Stack 9ft Wall'}</span>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          /* VIEW 2: Individual Tiles Grid (Uniform Card Heights) */
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
              <p className="text-xs font-medium text-neutral-600">
                {isBn ? 'প্রদর্শিত হচ্ছে' : 'Showing'}{' '}
                <strong className="text-[#E30613] font-bold">{filteredProducts.length}</strong>{' '}
                {isBn ? `টি ডিজাইন (মোট ${initialProducts.length} টির মধ্যে)` : `of ${initialProducts.length} calibrated models`}
              </p>
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                {categoryFilter !== 'all' ? `${categoryFilter} Collection` : 'All Tiles'}
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <SlidersHorizontal className="w-8 h-8 text-neutral-400 mx-auto" />
                <h3 className="text-base font-bold text-[#18181B]">
                  {isBn ? 'কোনো পণ্য পাওয়া যায়নি' : 'No tiles found matching your search'}
                </h3>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 bg-[#E30613] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#c40510]"
                >
                  {isBn ? 'ফিল্টার রিসেট করুন' : 'Reset All Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((p) => {
                  const isShortlisted = shortlist.includes(p.code)
                  return (
                    <div
                      key={p.code}
                      className="product-card group bg-white border border-black/10 hover:border-[#E30613] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md h-[400px]"
                    >
                      {/* Uniform Height Swatch / Tile Frame (h-[240px]) */}
                      <div className="relative h-[240px] w-full bg-[#F4F4F5] p-3 flex items-center justify-center overflow-hidden shrink-0">
                        {/* Proportional Physical Tile Frame */}
                        <div
                          className={`relative ${getTileProportionClass(
                            p.category,
                            p.sizeCode
                          )} shadow-md border border-black/15 overflow-hidden transition-transform duration-300 group-hover:scale-105 bg-white`}
                        >
                          {p.imageUrl ? (
                            <Image
                              src={p.imageUrl}
                              alt={p.imageAlt || p.name}
                              fill
                              sizes="260px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                              Preview
                            </div>
                          )}
                        </div>

                        {/* Top Badges & Actions */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-start justify-between pointer-events-none">
                          <span className="text-[10px] font-mono font-bold text-neutral-800 bg-white/95 px-1.5 py-0.5 border border-black/10 shadow-sm">
                            {p.code}
                          </span>

                          <button
                            type="button"
                            onClick={() => toggleShortlist(p.code)}
                            title={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
                            className={`pointer-events-auto p-1.5 transition-colors shadow-sm ${
                              isShortlisted
                                ? 'bg-[#E30613] text-white'
                                : 'bg-white/90 text-neutral-700 hover:text-[#E30613]'
                            }`}
                            aria-label={`Shortlist ${p.name}`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isShortlisted ? 'fill-white' : ''}`} />
                          </button>
                        </div>

                        {/* Bottom Tag Overlays */}
                        <div className="absolute bottom-2 left-2 z-10">
                          <span className="text-[9px] font-mono bg-black/80 text-white px-1.5 py-0.5 font-semibold">
                            {p.sizeName}
                          </span>
                        </div>

                        <div className="absolute bottom-2 right-2 z-10">
                          <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-[#E30613] text-white shadow-sm">
                            {p.finishName}
                          </span>
                        </div>
                      </div>

                      {/* Card Bottom Meta (h-[160px] uniform content) */}
                      <div className="p-3.5 border-t border-black/10 flex flex-col justify-between flex-1 bg-white">
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase">
                            <span>
                              {p.category === 'floor' ? 'Floor (Vertical)' : 'Wall (Horizontal)'}
                            </span>
                            {p.wallTileRole && p.wallTileRole !== 'general' && (
                              <span className="text-[#E30613] font-bold">
                                {p.wallTileRole.toUpperCase()}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold text-[#18181B] mt-1 line-clamp-2 group-hover:text-[#E30613] transition-colors">
                            {p.name}
                          </h3>
                        </div>

                        <div className="pt-2 border-t border-black/5 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setSelectedScaleTile(p)}
                            className="text-[11px] font-semibold text-neutral-600 hover:text-[#E30613] inline-flex items-center gap-1 transition-colors"
                          >
                            <Maximize2 className="w-3 h-3" />
                            <span>{isBn ? 'অনুপাত' : 'Scale'}</span>
                          </button>

                          <Link
                            href={isBn ? `/bn/tiles/${p.slug}` : `/tiles/${p.slug}`}
                            className="text-xs font-bold uppercase tracking-wider text-[#E30613] hover:underline inline-flex items-center gap-1"
                          >
                            <span>{isBn ? 'বিস্তারিত' : 'View'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL 1: 9-Foot Wall Installation Stacking Visualizer */}
      {activeWallSet && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#18181B] border border-white/15 text-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-none shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#18181B] z-20">
              <div>
                <span className="text-[10px] font-mono text-[#E30613] font-bold uppercase tracking-widest">
                  9-FOOT ARCHITECTURAL WALL PATTERN
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {activeWallSet.setName} • {activeWallSet.sizeName}
                </h3>
              </div>
              <button
                onClick={() => setActiveWallSet(null)}
                className="p-2 bg-white/10 hover:bg-[#E30613] text-white transition-colors"
                aria-label="Close wall visualizer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pattern Explainer & Decor Selector */}
            <div className="px-4 sm:px-6 py-3 bg-white/5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <Info className="w-4 h-4 text-[#E30613] shrink-0" />
                <span>
                  {isBn
                    ? 'নাইন-ফিট স্ট্যান্ডার্ড ওয়াল: উপরে ৪টি লাইট, মাঝে ১টি ডেকর, এবং নিচে ৪টি ডিপ টাইলস।'
                    : 'Standard 9ft elevation: 4 Light tiles on top, 1 Decor band in middle, 4 Deep tiles at bottom.'}
                </span>
              </div>

              {/* Toggle Decor 01 vs Decor 02 if set contains both */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-neutral-400">Decor:</span>
                <button
                  type="button"
                  onClick={() => setWallDecorChoice('decor-01')}
                  className={`px-2.5 py-1 text-xs font-semibold ${
                    wallDecorChoice === 'decor-01'
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-white/10 text-neutral-300 hover:text-white'
                  }`}
                >
                  Washroom (01)
                </button>
                <button
                  type="button"
                  onClick={() => setWallDecorChoice('decor-02')}
                  className={`px-2.5 py-1 text-xs font-semibold ${
                    wallDecorChoice === 'decor-02'
                      ? 'bg-amber-600 text-white font-bold'
                      : 'bg-white/10 text-neutral-300 hover:text-white'
                  }`}
                >
                  Kitchen (02)
                </button>
              </div>
            </div>

            {/* Visualizer Body: The 9-Foot Stacked Wall */}
            <div className="p-4 sm:p-8 flex flex-col md:flex-row items-center justify-center gap-8">
              {/* The Stacking Wall Frame */}
              <div className="relative w-64 sm:w-80 border-4 border-neutral-700 bg-neutral-900 shadow-2xl p-1 space-y-1">
                {/* 4 Light Tiles on Top */}
                <div className="space-y-1">
                  {[1, 2, 3, 4].map((i) => {
                    const tile = activeWallSet.tiles.find((t) => t.wallTileRole === 'light') || activeWallSet.tiles[0]
                    return (
                      <div key={`light-${i}`} className="relative h-12 w-full bg-neutral-800 border border-black/30 overflow-hidden">
                        {tile?.imageUrl && (
                          <Image src={tile.imageUrl} alt={tile.name} fill sizes="320px" className="object-cover" />
                        )}
                        <span className="absolute left-1 top-0.5 text-[8px] font-mono bg-black/60 px-1 text-neutral-300">
                          Light ({i})
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* 1 Decor Tile in Middle */}
                <div className="my-1">
                  {(() => {
                    const decorTile =
                      activeWallSet.tiles.find((t) => t.wallTileRole === wallDecorChoice) ||
                      activeWallSet.tiles.find((t) => t.wallTileRole?.startsWith('decor')) ||
                      activeWallSet.tiles[1] ||
                      activeWallSet.tiles[0]
                    return (
                      <div className="relative h-14 w-full bg-neutral-800 border-2 border-[#E30613] overflow-hidden shadow-lg">
                        {decorTile?.imageUrl && (
                          <Image src={decorTile.imageUrl} alt={decorTile.name} fill sizes="320px" className="object-cover" />
                        )}
                        <span className="absolute left-1 top-0.5 text-[8px] font-mono bg-[#E30613] px-1.5 text-white font-bold">
                          {wallDecorChoice === 'decor-02' ? 'Decor 02 (Kitchen)' : 'Decor 01 (Washroom)'}
                        </span>
                      </div>
                    )
                  })()}
                </div>

                {/* 4 Deep Tiles at Bottom */}
                <div className="space-y-1">
                  {[1, 2, 3, 4].map((i) => {
                    const tile = activeWallSet.tiles.find((t) => t.wallTileRole === 'deep') || activeWallSet.tiles[activeWallSet.tiles.length - 1]
                    return (
                      <div key={`deep-${i}`} className="relative h-12 w-full bg-neutral-800 border border-black/30 overflow-hidden">
                        {tile?.imageUrl && (
                          <Image src={tile.imageUrl} alt={tile.name} fill sizes="320px" className="object-cover" />
                        )}
                        <span className="absolute left-1 top-0.5 text-[8px] font-mono bg-black/60 px-1 text-neutral-300">
                          Deep ({i})
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Set Component Breakdown List */}
              <div className="space-y-3 w-full md:w-80">
                <h4 className="text-xs font-mono uppercase text-[#E30613] font-bold tracking-wider">
                  Set Specification ({activeWallSet.tiles.length} Models)
                </h4>
                <div className="space-y-2">
                  {activeWallSet.tiles.map((t) => (
                    <div key={t.code} className="flex items-center gap-3 p-2.5 bg-white/5 border border-white/10">
                      <div className="relative w-14 h-10 bg-neutral-800 shrink-0 border border-white/15 overflow-hidden">
                        {t.imageUrl && <Image src={t.imageUrl} alt={t.name} fill sizes="60px" className="object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] font-mono uppercase font-bold text-[#E30613]">
                          {t.wallTileRole?.toUpperCase()}
                        </div>
                        <div className="text-xs font-bold text-white truncate">{t.name}</div>
                        <div className="text-[10px] text-neutral-400 font-mono">{t.code}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Proportional Scale Guide Modal */}
      {(isScaleGuideOpen || selectedScaleTile) && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#18181B] border border-white/15 text-white max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-none shadow-2xl flex flex-col">
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#18181B] z-20">
              <div>
                <span className="text-[10px] font-mono text-[#E30613] font-bold uppercase tracking-widest">
                  PROPORTIONAL RELATIVE SCALE GUIDE
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {selectedScaleTile
                    ? `${selectedScaleTile.name} (${selectedScaleTile.sizeName}) Scale Comparison`
                    : 'True Relative Proportions of Fresh Ceramics Formats'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsScaleGuideOpen(false)
                  setSelectedScaleTile(null)
                }}
                className="p-2 bg-white/10 hover:bg-[#E30613] text-white transition-colors"
                aria-label="Close scale guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-8 space-y-8">
              {/* Note on orientation */}
              <div className="p-4 bg-white/5 border border-white/10 text-xs text-neutral-300 flex items-center gap-3">
                <Info className="w-5 h-5 text-[#E30613] shrink-0" />
                <span>
                  <strong>Floor tiles are vertical (Width x Height)</strong>: 60x120cm, 80x80cm, 60x60cm, 40x40cm, 30x30cm, 20x120cm.
                  <br />
                  <strong>Wall tiles are horizontal (Height x Width)</strong>: 30x60cm, 30x50cm, 30x45cm, 25x40cm, 20x30cm.
                </span>
              </div>

              {/* Side-by-side relative geometric swatches */}
              <div>
                <h4 className="text-xs font-mono uppercase text-[#E30613] font-bold tracking-wider mb-4">
                  All Formats Side-by-Side (Geometrically Proportional)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 items-end">
                  {RELATIVE_SIZES_GUIDE.map((fmt) => (
                    <div
                      key={fmt.label + fmt.cat}
                      className="p-3 bg-white/5 border border-white/10 flex flex-col items-center justify-between h-[230px]"
                    >
                      <div className="flex-1 flex items-center justify-center w-full">
                        <div
                          className={`${fmt.wClass} ${fmt.hClass} ${fmt.aspect} bg-gradient-to-br from-neutral-300 to-neutral-500 border-2 border-white shadow-md flex items-center justify-center text-center p-1 text-[9px] font-mono font-bold text-black`}
                        >
                          {fmt.w}x{fmt.h}
                        </div>
                      </div>
                      <div className="w-full text-center pt-2 border-t border-white/10 mt-2">
                        <span className="text-[9px] font-mono uppercase bg-[#E30613] text-white px-1.5 py-0.5">
                          {fmt.cat}
                        </span>
                        <div className="text-xs font-bold text-white mt-1">{fmt.label}</div>
                        <div className="text-[10px] text-neutral-400">{fmt.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
