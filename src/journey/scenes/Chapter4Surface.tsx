'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Compass, Sparkles, Download, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Chapter4SurfaceProps {
  locale?: string
  isTouch?: boolean
}

// Curated authentic floor tiles directly from factory folders with authentic physical ratios & sizes
const AUTHENTIC_FLOOR_TILES = [
  {
    id: 'fl-12-pgvt-02',
    name: '12 PGVT 02',
    finish: 'PGVT (Mirror Polished)',
    finishSlug: 'pgvt',
    size: '60x120 cm',
    ratioClass: 'w-20 sm:w-24 h-40 sm:h-48 aspect-[1/2]',
    sizeBadge: '60x120 (1:2)',
    image: '/media/real_tiles/tile_floor_12_PGVT_02_a8af3.webp',
  },
  {
    id: 'fl-12-dc-be',
    name: '12 DC BE',
    finish: 'Double Charge',
    finishSlug: 'double-charge',
    size: '60x120 cm',
    ratioClass: 'w-20 sm:w-24 h-40 sm:h-48 aspect-[1/2]',
    sizeBadge: '60x120 (1:2)',
    image: '/media/real_tiles/tile_floor_12_DC_BE_ca7ab.webp',
  },
  {
    id: 'fl-8-dc-be',
    name: '8 DC BE',
    finish: 'Double Charge',
    finishSlug: 'double-charge',
    size: '80x80 cm',
    ratioClass: 'w-32 sm:w-36 h-32 sm:h-36 aspect-square',
    sizeBadge: '80x80',
    image: '/media/real_tiles/tile_floor_8_DC_BE_dea2b.webp',
  },
  {
    id: 'fl-6-dc-be',
    name: '6 DC BE',
    finish: 'Double Charge',
    finishSlug: 'double-charge',
    size: '60x60 cm',
    ratioClass: 'w-24 sm:w-28 h-24 sm:h-28 aspect-square',
    sizeBadge: '60x60',
    image: '/media/real_tiles/tile_floor_6_DC_BE_20aae.webp',
  },
  {
    id: 'fl-4-hg-34',
    name: '4 HG 34',
    finish: 'High Glossy',
    finishSlug: 'high-gloss',
    size: '40x40 cm',
    ratioClass: 'w-18 sm:w-20 h-18 sm:h-20 aspect-square',
    sizeBadge: '40x40',
    image: '/media/real_tiles/tile_floor_4_HG_34_7ce70.webp',
  },
  {
    id: 'fl-stp-6-dpm-02',
    name: 'STP 6 DPM 02',
    finish: 'Stair Tiles',
    finishSlug: 'matt',
    size: '30x60 cm',
    ratioClass: 'w-18 sm:w-22 h-36 sm:h-44 aspect-[1/2]',
    sizeBadge: '30x60 (1:2)',
    image: '/media/real_tiles/tile_floor_STP_6_DPM_02_13c7d.webp',
  },
]

// Curated authentic wall tiles directly from factory folders with authentic physical ratios & sizes
const AUTHENTIC_WALL_TILES = [
  {
    id: 'wl-w-6001',
    name: 'W 6001',
    finish: 'Glossy Punch',
    finishSlug: 'glossy-punch',
    size: '30x60 cm',
    ratioClass: 'w-18 sm:w-22 h-36 sm:h-44 aspect-[1/2]',
    sizeBadge: '30x60 (1:2)',
    image: '/media/real_tiles/tile_wall_2023_PBL_612b6.webp',
  },
  {
    id: 'wl-w-5027',
    name: 'W 5027',
    finish: 'Glossy Punch',
    finishSlug: 'glossy-punch',
    size: '30x50 cm',
    ratioClass: 'w-20 sm:w-24 h-34 sm:h-40 aspect-[3/5]',
    sizeBadge: '30x50 (3:5)',
    image: '/media/real_tiles/tile_wall_W_2105_DGY_3e6e5.webp',
  },
  {
    id: 'wl-w-4023',
    name: 'W 4023',
    finish: 'Glossy Punch',
    finishSlug: 'glossy-punch',
    size: '30x45 cm',
    ratioClass: 'w-20 sm:w-24 h-30 sm:h-36 aspect-[2/3]',
    sizeBadge: '30x45 (2:3)',
    image: '/media/real_tiles/tile_wall_W_2105_LGY_7665d.webp',
  },
  {
    id: 'wl-w-2110-wbk',
    name: 'W 2110 WBK',
    finish: 'Glossy Punch & Glossy',
    finishSlug: 'glossy-punch',
    size: '20x30 cm',
    ratioClass: 'w-16 sm:w-18 h-24 sm:h-28 aspect-[2/3]',
    sizeBadge: '20x30 (2:3)',
    image: '/media/real_tiles/tile_wall_W_2106_DGY_9e7dc.webp',
  },
  {
    id: 'wl-wp-2107-dbr',
    name: 'WP 2107 DBR',
    finish: 'Glossy Punch',
    finishSlug: 'glossy-punch',
    size: '20x30 cm',
    ratioClass: 'w-16 sm:w-18 h-24 sm:h-28 aspect-[2/3]',
    sizeBadge: '20x30 (2:3)',
    image: '/media/real_tiles/tile_wall_WP_2107_DBR_3ba44.webp',
  },
  {
    id: 'wl-2023-pbl',
    name: '2023 PBL',
    finish: 'Glossy Punch',
    finishSlug: 'glossy-punch',
    size: '20x30 cm',
    ratioClass: 'w-16 sm:w-18 h-24 sm:h-28 aspect-[2/3]',
    sizeBadge: '20x30 (2:3)',
    image: '/media/real_tiles/tile_wall_2023_PBL_612b6.webp',
  },
]

export function Chapter4Surface({ locale = 'en', isTouch = false }: Chapter4SurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const [category, setCategory] = useState<'floor' | 'wall'>('floor')

  const isBn = locale === 'bn'
  const currentTiles = category === 'floor' ? AUTHENTIC_FLOOR_TILES : AUTHENTIC_WALL_TILES

  useEffect(() => {
    const container = containerRef.current
    const scene = sceneRef.current
    if (!container || !scene) return

    const pinDistance = () => window.innerHeight * (isTouch ? 1.5 : 2.5)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${pinDistance()}`,
          pin: scene,
          scrub: 0.5,
          anticipatePin: 0,
        },
      })

      // Elegant arrival of tiles
      tl.fromTo(
        '.mosaic-card',
        { opacity: 0.6, y: 25 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.35, ease: 'power2.out' },
        0
      )

      // Double charge highlight beat
      tl.fromTo(
        '.dc-banner',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        0.35
      )

      // Door row reveal (finishes before 1.0, holding at mould 1.0)
      tl.fromTo(
        '.door-row',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        0.70
      )
    }, container)

    return () => ctx.revert()
  }, [isTouch])

  return (
    <section
      id="surface"
      ref={containerRef}
      className="relative w-full bg-[#FFFFFF] text-[#4A4A4A] select-none transition-colors duration-700"
    >
      <div
        ref={sceneRef}
        className="w-full h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between relative pt-16 sm:pt-20 pb-4 sm:pb-6 px-4 sm:px-8 md:px-12 lg:px-14 bg-[#FAFAFA]"
      >
        {/* Top Header: Title and Floor/Wall Live Toggle */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-stone/15 pb-3 shrink-0">
          <div>
            <span className="text-[11px] font-display font-semibold tracking-widest uppercase text-fresh-red">
              {isBn ? 'অধ্যায় ০৪: সারফেস কালেকশন' : 'Chapter 04: Surface Collections'}
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-light text-stone mt-0.5 tracking-tight">
              {isBn ? (
                <>প্রতিটি জীবনের জন্য <span className="font-semibold text-stone">নান্দনিক তল</span></>
              ) : (
                <>Surfaces for <span className="font-semibold text-stone">every kind of life</span></>
              )}
            </h2>
          </div>

          {/* Floor / Wall Live Counts Toggle */}
          <div className="flex items-center gap-1.5 bg-white p-1 border border-stone/20 shadow-sm shrink-0">
            <button
              onClick={() => setCategory('floor')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-display uppercase tracking-wider font-semibold transition-all ${
                category === 'floor'
                  ? 'bg-fresh-red text-white shadow-sm'
                  : 'text-stone hover:text-fresh-red'
              }`}
            >
              {isBn ? 'ফ্লোর টাইলস (২০৪)' : 'Floor (204 designs)'}
            </button>
            <button
              onClick={() => setCategory('wall')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-display uppercase tracking-wider font-semibold transition-all ${
                category === 'wall'
                  ? 'bg-fresh-red text-white shadow-sm'
                  : 'text-stone hover:text-fresh-red'
              }`}
            >
              {isBn ? 'ওয়াল টাইলস (১৮১)' : 'Wall (181 designs)'}
            </button>
          </div>
        </div>

        {/* Center: Curated Authentic Material Surface Mosaic with TRUE aspect ratios & relative physical scales */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 lg:gap-4 my-auto py-1 sm:py-2 shrink-0 items-end">
          {currentTiles.map((tile, idx) => (
            <Link
              key={tile.id}
              href={isBn ? `/bn/tiles?finish=${tile.finishSlug}` : `/tiles?finish=${tile.finishSlug}`}
              className={`mosaic-card group bg-white border border-stone/20 hover:border-fresh-red shadow-sm hover:shadow-lg transition-all duration-300 p-2 sm:p-3 flex-col justify-between h-[150px] sm:h-[190px] lg:h-[240px] ${
                idx >= 4 ? 'hidden sm:flex' : 'flex'
              }`}
            >
              {/* Proportional Tile Canvas Container */}
              <div className="w-full flex-1 flex items-center justify-center p-1 bg-[#F4F4F5] overflow-hidden relative">
                <div className={`relative ${tile.ratioClass} shadow-md border border-black/10 overflow-hidden transition-transform duration-300 group-hover:scale-105`}>
                  <Image
                    src={tile.image}
                    alt={tile.name}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Bottom Metadata & Ratio Indicator */}
              <div className="pt-2 border-t border-stone/10 mt-2 shrink-0">
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="font-bold text-stone group-hover:text-fresh-red transition-colors">
                    {tile.name}
                  </span>
                  <span className="bg-stone/10 text-stone px-1 py-0.5 font-semibold text-[9px]">
                    {tile.sizeBadge}
                  </span>
                </div>
                <p className="text-[10px] text-stone-dark/70 font-display truncate">
                  {tile.finish}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Double Charge Line Highlight Beat */}
        <div className="dc-banner relative z-10 bg-[#2D2D30] text-paper p-3 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-l-4 border-fresh-red shadow-lg shrink-0">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-fresh-red shrink-0" />
              <h3 className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-white">
                {isBn
                  ? 'বাংলাদেশের একমাত্র পূর্ণাঙ্গ ডাবল চার্জ রেঞ্জ'
                  : 'The Only Full Double Charge Line in Bangladesh'}
              </h3>
            </div>
            <p className="text-xs text-grey font-light">
              {isBn
                ? 'তিনটি আন্তর্জাতিক সাইজেই ডুয়াল-লেয়ার পোর্সেলিন উৎপাদনে বাংলাদেশে প্রথম প্রস্তুতকারক।'
                : 'First manufacturer in Bangladesh producing all three sizes with dual-layer porcelain durability.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {['60 x 60 cm', '80 x 80 cm', '60 x 120 cm'].map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 bg-white/10 border border-white/20 text-[11px] font-mono text-paper"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Door Row: 4 Clear Catalogue Entrances */}
        <div className="door-row relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone/15 shrink-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              href={isBn ? '/bn/tiles' : '/tiles'}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{isBn ? 'সকল টাইলস দেখুন (৩৮৫)' : 'Explore All Tiles (385)'}</span>
            </Link>

            <Link
              href={isBn ? '/bn/tiles?finish=double-charge' : '/tiles?finish=double-charge'}
              className="inline-flex items-center gap-1 px-3 py-2 bg-white hover:bg-stone/5 text-stone text-xs font-display font-medium uppercase tracking-wider border border-stone/20 transition-colors"
            >
              <span>{isBn ? 'ডাবল চার্জ' : 'Double Charge'}</span>
            </Link>

            <Link
              href={isBn ? '/bn/tiles?finish=pgvt' : '/tiles?finish=pgvt'}
              className="inline-flex items-center gap-1 px-3 py-2 bg-white hover:bg-stone/5 text-stone text-xs font-display font-medium uppercase tracking-wider border border-stone/20 transition-colors"
            >
              <span>{isBn ? 'মিরর পলিশড' : 'Mirror Polished'}</span>
            </Link>

            <Link
              href={isBn ? '/bn/downloads' : '/downloads'}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-stone/5 text-stone text-xs font-display font-medium uppercase tracking-wider border border-stone/20 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-stone-dark" />
              <span>{isBn ? 'ক্যাটালগ ডাউনলোড' : 'Download Catalogs'}</span>
            </Link>
          </div>

          <div className="text-xs font-display text-stone-dark flex items-center gap-2">
            <span className="text-fresh-red font-semibold uppercase tracking-wider">
              {isBn ? 'রুম ভিজ্যুয়ালাইজার' : 'View In Your Room'}
            </span>
            <span className="text-[10px] font-mono uppercase bg-fresh-red/10 text-fresh-red border border-fresh-red/30 px-1.5 py-0.5">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
