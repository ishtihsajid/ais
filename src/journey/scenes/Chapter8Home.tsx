'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Home, Eye } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Chapter8HomeProps {
  locale?: string
  isTouch?: boolean
}

const SPACES = [
  {
    id: 'living',
    nameEn: 'Architectural Living Room',
    nameBn: 'আভিজাত্যময় লিভিং রুম',
    captionEn: 'Expansive open plan with seamless 60x120 Double Charge porcelain floor plains.',
    captionBn: 'বিশাল উন্মুক্ত লিভিং স্পেসে ৬০x১২০ ডাবল চার্জ চীনামাটির মসৃণ বিস্তার।',
    bg: 'linear-gradient(135deg, #EAE6DF 0%, #D8D2C7 100%)',
    hotspots: [
      { x: 35, y: 70, tile: '12 DC BE', size: '60x120 cm', finish: 'Double Charge', slug: '12-dc-be' },
      { x: 68, y: 55, tile: '8 DC BE', size: '80x80 cm', finish: 'Double Charge', slug: '8-dc-be' },
    ],
  },
  {
    id: 'bathroom',
    nameEn: 'Master Ensuite Bathroom',
    nameBn: 'মাস্টার বাথরুম স্যুট',
    captionEn: 'Water-impervious mirror polished walls pairing with tactile anti-slip floor.',
    captionBn: 'পানি-অভেদ্য মিরর পলিশড ওয়াল টাইলসের সঙ্গে অ্যান্টি-স্লিপ ফ্লোরের মেলবন্ধন।',
    bg: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)',
    hotspots: [
      { x: 45, y: 40, tile: 'W CANDY 5073 LGR', size: '30x50 cm', finish: 'Candy Finish', slug: 'w-candy-5073-lgr' },
      { x: 50, y: 78, tile: '6 DC BE', size: '60x60 cm', finish: 'Double Charge', slug: '6-dc-be' },
    ],
  },
  {
    id: 'kitchen',
    nameEn: 'Culinary Studio Kitchen',
    nameBn: 'আধুনিক কিচেন স্টুডিও',
    captionEn: 'Stain-resistant high density ceramic surfaces ready for demanding culinary heat.',
    captionBn: 'দাগ-প্রতিরোধী উচ্চ ঘনত্বের সিরামিক সারফেস যা রান্নার উত্তাপ সহ্য করে।',
    bg: 'linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 100%)',
    hotspots: [
      { x: 40, y: 65, tile: '12 PGVT 02', size: '60x120 cm', finish: 'PGVT (Mirror Polished)', slug: '12-pgvt-02' },
    ],
  },
  {
    id: 'lobby',
    nameEn: 'Commercial Corporate Atrium',
    nameBn: 'বাণিজ্যিক কর্পোরেট লবি',
    captionEn: 'Heavy traffic resilience engineered for high-footfall prestige corporate lobbies.',
    captionBn: 'সর্বোচ্চ ফুটফল সহ্য করার সক্ষমতাসম্পন্ন প্রিমিয়াম বাণিজ্যিক ফ্লোরিং।',
    bg: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)',
    hotspots: [
      { x: 55, y: 60, tile: '8 PGVT 02', size: '80x80 cm', finish: 'PGVT (Mirror Polished)', slug: '8-pgvt-02' },
    ],
  },
  {
    id: 'exterior',
    nameEn: 'Balcony, Terrace & Exterior Facade',
    nameBn: 'ব্যালকনি, টেরেস ও বহির্মুখী ফাসাদ',
    captionEn: 'Weatherproof exterior porcelain engineered for monsoon resilience, UV stability and anti-slip safety.',
    captionBn: 'বৃষ্টি, রোদ ও আবহাওয়া-সহনশীল এক্সটেরিয়র চীনামাটি টাইলস যা দীর্ঘস্থায়ী নিরাপত্তা প্রদান করে।',
    bg: 'linear-gradient(135deg, #DDD6CE 0%, #C8BFB3 100%)',
    hotspots: [
      { x: 42, y: 55, tile: 'STP 6 DPM 02', size: '30x60 cm', finish: 'Stair & Terrace Tiles', slug: 'stp-6-dpm-02' },
      { x: 70, y: 45, tile: '4DP 1002', size: '40x40 cm', finish: 'Digital Porcelain', slug: '4dp-1002' },
    ],
  },
]

export function Chapter8Home({ locale = 'en', isTouch = false }: Chapter8HomeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const [activeSpaceIdx, setActiveSpaceIdx] = useState(0)
  const [selectedHotspot, setSelectedHotspot] = useState<{
    tile: string
    size: string
    finish: string
    slug: string
  } | null>(null)

  const isBn = locale === 'bn'

  useEffect(() => {
    const container = containerRef.current
    const scene = sceneRef.current
    if (!container || !scene) return

    const pinDistance = () => window.innerHeight * (isTouch ? 2.5 : 4.0)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => `+=${pinDistance()}`,
        pin: scene,
        scrub: 0.5,
        anticipatePin: 0,
        onUpdate: (self) => {
          const progress = self.progress
          const idx = Math.min(
            SPACES.length - 1,
            Math.max(0, Math.round(progress * (SPACES.length - 1)))
          )
          setActiveSpaceIdx(idx)
        },
      })
    }, container)

    return () => ctx.revert()
  }, [isTouch])

  const space = SPACES[activeSpaceIdx]

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full bg-paper text-stone select-none transition-colors duration-700"
    >
      <div
        ref={sceneRef}
        className="w-full h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between relative pt-20 sm:pt-24 pb-8 sm:pb-10 px-4 sm:px-8 md:px-12 lg:px-14 bg-[#F8F8F9]"
      >
        {/* Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone/15 pb-4 shrink-0">
          <div>
            <span className="text-[11px] font-display font-semibold tracking-widest uppercase text-fresh-red">
              {isBn ? 'অধ্যায় ০৮: জীবন্ত গৃহ' : 'Chapter 08: The Lived Space'}
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-light text-stone mt-1 tracking-tight">
              {isBn ? (
                <>প্রতিটি কক্ষে <span className="font-semibold text-stone">একটি ফ্রেশ সূচনা</span></>
              ) : (
                <>A fresh start, <span className="font-semibold text-stone">room by room</span></>
              )}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {SPACES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveSpaceIdx(idx)}
                className={`w-3 h-3 transition-all ${
                  activeSpaceIdx === idx
                    ? 'bg-fresh-red scale-125'
                    : 'bg-stone/30 hover:bg-stone'
                }`}
                title={s.nameEn}
                aria-label={s.nameEn}
              />
            ))}
          </div>
        </div>

        {/* Center: Full-Screen Architectural Space with Interactive Hotspots */}
        <div
          className="relative z-10 w-full flex-1 my-4 border border-stone/15 shadow-inner p-8 flex flex-col justify-between transition-all duration-700 overflow-hidden"
          style={{ background: space.bg }}
        >
          {/* Subtle architectural perspective grid overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, #454548 0px, transparent 1px, transparent 32px)',
            }}
          />

          {/* Space Name & Caption Badge */}
          <div className="relative z-10 bg-white/90 backdrop-blur-md p-4 max-w-md border-l-4 border-fresh-red shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest text-fresh-red font-bold">
              Space {activeSpaceIdx + 1} of {SPACES.length}
            </span>
            <h3 className="text-lg md:text-xl font-display font-bold text-stone mt-0.5">
              {isBn ? space.nameBn : space.nameEn}
            </h3>
            <p className="text-xs text-stone-dark/80 mt-1 leading-relaxed">
              {isBn ? space.captionBn : space.captionEn}
            </p>
          </div>

          {/* Interactive Red Square Hotspots */}
          {space.hotspots.map((hs, idx) => (
            <div
              key={idx}
              className="absolute z-20"
              style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
            >
              <button
                type="button"
                onClick={() => setSelectedHotspot(selectedHotspot?.tile === hs.tile ? null : hs)}
                className="group relative w-6 h-6 bg-fresh-red text-white flex items-center justify-center shadow-lg hover:scale-125 transition-transform"
                aria-label={`Inspect tile: ${hs.tile}`}
              >
                <span className="w-2 h-2 bg-white" />
                <span className="absolute -inset-2 bg-fresh-red/30 animate-ping rounded-none pointer-events-none" />
              </button>

              {/* Hotspot Popover Card */}
              {selectedHotspot?.tile === hs.tile && (
                <div className="absolute left-8 bottom-0 w-64 bg-stone text-paper p-4 shadow-2xl border-l-2 border-fresh-red z-30 animate-fadeIn">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-fresh-red font-bold">
                      {hs.finish}
                    </span>
                    <span className="text-[9px] font-mono text-grey">{hs.size}</span>
                  </div>
                  <h4 className="text-sm font-display font-bold text-white mt-1">
                    {hs.tile}
                  </h4>
                  <p className="text-[10px] text-grey mt-1">
                    Lab-certified 98% A-grade porcelain with Ultra Fine Squaring.
                  </p>
                  <Link
                    href={isBn ? `/bn/tiles/${hs.slug}` : `/tiles/${hs.slug}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-fresh-red hover:underline font-semibold uppercase tracking-wider"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}

          {/* Hint */}
          <div className="relative z-10 self-end bg-white/80 backdrop-blur px-3 py-1 text-[10px] font-mono text-stone-dark">
            Tap red markers to view tiles used in this space
          </div>
        </div>

        {/* Footer Bar: Link to /spaces */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone/15 text-xs font-display shrink-0">
          <p className="text-stone-dark/80">
            {isBn ? 'বাস্তব বাসগৃহ ও বাণিজ্যিক স্পেসে ফ্রেশ টাইলসের ব্যবহার' : 'Curated residential & commercial spaces designed with Fresh Ceramics'}
          </p>
          <Link
            href={isBn ? '/bn/spaces' : '/spaces'}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-fresh-red text-white hover:bg-ember font-semibold uppercase tracking-wider transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{isBn ? 'সকল স্পেস দেখুন' : 'See Every Space'}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
