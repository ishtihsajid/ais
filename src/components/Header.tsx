'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'
import { Phone, Search, Menu, X, ChevronDown, ChevronRight, ArrowRight, MapPin, Download, Layers, ShieldCheck, Sparkles } from 'lucide-react'

function normalizePathname(pathname: string | null | undefined): string {
  if (!pathname) return '/'
  if (pathname === '/en' || pathname === '/en/') return '/'
  if (pathname.startsWith('/en/')) return pathname.slice(3)
  return pathname
}

type HeaderProps = {
  locale?: 'en' | 'bn'
  activeMode?: 'journey' | 'catalogue'
}

export function Header({ locale = 'en', activeMode }: HeaderProps) {
  const rawPathname = usePathname()
  const pathname = normalizePathname(rawPathname)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileTab, setMobileTab] = useState<'products' | 'brand' | 'connect' | 'all'>('products')
  const [accordionOpen, setAccordionOpen] = useState<{ products: boolean; brand: boolean; connect: boolean }>({
    products: true,
    brand: true,
    connect: true,
  })

  // Listen for Escape key to close menu and lock body scroll
  React.useEffect(() => {
    if (!mobileMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [mobileMenuOpen])

  // Determine active view mode
  const isBn = locale === 'bn' || pathname.startsWith('/bn')
  const currentLocale = isBn ? 'bn' : 'en'
  const isJourney = activeMode ? activeMode === 'journey' : (pathname === '/' || pathname === '/bn')

  const basePrefix = isBn ? '/bn' : ''
  const homePath = isBn ? '/bn' : '/'
  const cataloguePath = `${basePrefix}/tiles`

  const pathWithoutBn = pathname.startsWith('/bn')
    ? pathname.replace(/^\/bn(\/|$)/, '$1') || '/'
    : pathname

  const enHref = pathWithoutBn
  const bnHref = pathname.startsWith('/bn')
    ? pathname
    : (pathWithoutBn === '/' ? '/bn' : `/bn${pathWithoutBn}`)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 sm:h-20 px-3 sm:px-4 md:px-8 bg-[#18181B] border-b border-white/10 shadow-xl pointer-events-auto select-none">
        {/* 1. Left: Solid Red Brand Plate */}
        <div className="w-auto md:w-1/3 flex items-center justify-start shrink-0">
          <Link
            href={homePath}
            className="flex items-center justify-center bg-[#E30613] h-9 sm:h-11 px-2.5 sm:px-4 hover:bg-[#c40510] transition-colors shadow-md"
            title="Fresh Ceramics"
          >
            <Logo variant="white" locale={currentLocale} height={22} width={100} priority />
          </Link>
        </div>

        {/* 2. Centre: Mathematically Centered Segmented Control (Desktop Only) */}
        <div className="hidden md:flex w-1/3 items-center justify-center">
          <nav
            aria-label="Experience switcher"
            className="flex items-center h-10 bg-white/10 p-1 border border-white/15 text-xs font-semibold uppercase tracking-wider"
          >
            <Link
              href={homePath}
              className={`h-full flex items-center px-4 transition-all ${
                isJourney
                  ? 'bg-[#E30613] text-white shadow-sm font-bold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              {isBn ? 'জার্নি' : 'Journey'}
            </Link>
            <Link
              href={cataloguePath}
              className={`h-full flex items-center px-4 transition-all ${
                !isJourney
                  ? 'bg-[#E30613] text-white shadow-sm font-bold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              {isBn ? 'ক্যাটালগ' : 'Catalogue'}
            </Link>
          </nav>
        </div>

        {/* 3. Right: Balanced Uniform Height Controls with Full Mobile Clearance */}
        <div className="flex-1 md:w-1/3 flex items-center justify-end space-x-1.5 sm:space-x-2.5">
          {/* Hotline (Desktop) */}
          <a
            href="tel:16595"
            className="hidden lg:flex items-center space-x-1.5 h-10 px-3.5 bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 text-xs font-semibold"
            title={isBn ? 'হটলাইন কল করুন' : 'Call Hotline 16595'}
          >
            <Phone className="w-3.5 h-3.5 text-[#E30613]" />
            <span>16595</span>
          </a>

          {/* Language switch (Always Visible on both Mobile and Desktop) */}
          <div className="flex items-center h-9 sm:h-10 bg-white/5 border border-white/15 text-xs font-semibold overflow-hidden shrink-0">
            <Link
              href={enHref}
              className={`h-full px-2 sm:px-3 flex items-center transition-colors ${
                !isBn ? 'bg-[#E30613] text-white font-bold' : 'text-neutral-300 hover:text-white'
              }`}
            >
              EN
            </Link>
            <Link
              href={bnHref}
              className={`h-full px-2 sm:px-3 flex items-center transition-colors ${
                isBn ? 'bg-[#E30613] text-white font-bold' : 'text-neutral-300 hover:text-white'
              }`}
            >
              বাং
            </Link>
          </div>

          {/* Search */}
          <Link
            href={`${basePrefix}/search`}
            className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 shrink-0"
            aria-label={isBn ? 'অনুসন্ধান' : 'Search'}
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>

          {/* Menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-9 sm:h-10 flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-4 bg-[#E30613] text-white hover:bg-[#c40510] transition-colors text-xs font-bold uppercase tracking-wider shadow-sm shrink-0"
            aria-expanded={mobileMenuOpen}
            aria-label={isBn ? 'মেনু' : 'Menu'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span className="hidden sm:inline">{isBn ? 'মেনু' : 'Menu'}</span>
          </button>
        </div>
      </header>

      {/* Full screen / Overlay Menu Modal - 100% Solid Opaque #141416 with Zero Background Bleed */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 h-[100dvh] max-h-[100dvh] w-full bg-[#141416] opacity-100 z-[9999] pointer-events-auto flex flex-col text-white shadow-2xl">
          {/* Sticky Top Header: Logo, Language Switcher, and Close Button */}
          <div className="sticky top-0 bg-[#18181B] border-b border-white/10 px-4 sm:px-6 md:px-12 py-3 sm:py-4 z-40 shrink-0 shadow-lg">
            <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
              <div className="flex items-center gap-2.5 sm:gap-4">
                <div className="bg-[#E30613] h-9 sm:h-10 px-2.5 sm:px-3.5 flex items-center shadow-md">
                  <Logo variant="white" locale={currentLocale} height={22} width={100} />
                </div>

                {/* Prominent Language Switcher inside Menu Modal */}
                <div className="flex items-center h-9 sm:h-10 bg-white/10 border border-white/20 text-xs font-semibold overflow-hidden">
                  <Link
                    href={enHref}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`h-full px-2.5 sm:px-3.5 flex items-center transition-colors ${
                      !isBn ? 'bg-[#E30613] text-white font-bold' : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    EN
                  </Link>
                  <Link
                    href={bnHref}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`h-full px-2.5 sm:px-3.5 flex items-center transition-colors ${
                      isBn ? 'bg-[#E30613] text-white font-bold' : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    বাংলা
                  </Link>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 sm:p-2.5 bg-white/10 hover:bg-[#E30613] text-white transition-colors flex items-center gap-1.5 border border-white/15"
                aria-label="Close menu"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="text-xs uppercase font-display font-semibold tracking-wider">
                  {isBn ? 'বন্ধ করুন' : 'Close'}
                </span>
              </button>
            </div>
          </div>

          {/* Scrollable Body: with generous pb-72 bottom clearance and h-[100dvh] so phone chrome and floating buttons NEVER occlude items */}
          <div
            className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 md:px-12 py-4 md:py-8 pb-72 max-w-5xl mx-auto w-full"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* MOBILE ONLY NAVIGATION (< md) */}
            <div className="block md:hidden space-y-4">
              {/* Experience Switcher */}
              <div className="flex items-center h-10 bg-white/10 p-1 border border-white/15 text-xs font-semibold uppercase tracking-wider">
                <Link
                  href={homePath}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`h-full flex-1 flex items-center justify-center transition-all ${
                    isJourney ? 'bg-[#E30613] text-white font-bold' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {isBn ? 'জার্নি' : 'Journey'}
                </Link>
                <Link
                  href={cataloguePath}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`h-full flex-1 flex items-center justify-center transition-all ${
                    !isJourney ? 'bg-[#E30613] text-white font-bold' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {isBn ? 'ক্যাটালগ' : 'Catalogue'}
                </Link>
              </div>

              {/* Mobile Category Tabs for Instant Fit without endless scroll */}
              <div className="grid grid-cols-4 gap-1 bg-white/5 p-1 border border-white/10 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setMobileTab('products')}
                  className={`py-2 px-1 text-center transition-all ${
                    mobileTab === 'products'
                      ? 'bg-[#E30613] text-white font-bold shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {isBn ? 'পণ্য' : 'Products'}
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab('brand')}
                  className={`py-2 px-1 text-center transition-all ${
                    mobileTab === 'brand'
                      ? 'bg-[#E30613] text-white font-bold shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {isBn ? 'ব্র্যান্ড' : 'Brand'}
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab('connect')}
                  className={`py-2 px-1 text-center transition-all ${
                    mobileTab === 'connect'
                      ? 'bg-[#E30613] text-white font-bold shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {isBn ? 'কানেক্ট' : 'Connect'}
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab('all')}
                  className={`py-2 px-1 text-center transition-all ${
                    mobileTab === 'all'
                      ? 'bg-[#E30613] text-white font-bold shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {isBn ? 'সব' : 'All'}
                </button>
              </div>

              {/* TAB 1: Products */}
              {mobileTab === 'products' && (
                <div className="space-y-3 pt-1 animate-fadeIn">
                  <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                    <span className="text-[#E30613] font-bold tracking-widest text-xs uppercase">
                      {isBn ? 'পণ্য ও স্পেস (৫)' : 'Products & Spaces (5)'}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {isBn ? 'সব টাইলস কালেকশন' : 'All Tile Collections'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Link
                      href={`${basePrefix}/tiles`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {isBn ? 'সকল টাইলস' : 'All Tiles'}
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          {isBn ? 'সিরামিক, পোরসেলিন ও টেক্সচার' : 'Complete portfolio, porcelain & wall'}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>

                    <Link
                      href={`${basePrefix}/spaces`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {isBn ? 'স্পেস অনুযায়ী অনুপ্রেরণা' : 'Inspiration by Space'}
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          {isBn ? 'লিভিং, কিচেন, বাথ ও কমার্শিয়াল' : 'Living, Kitchen, Bath & Commercial'}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>

                    <Link
                      href={`${basePrefix}/slim-tiles`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                          <span>{isBn ? 'স্লিম টাইলস' : 'Slim Tiles'}</span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Eco-Tech
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          {isBn ? 'হালকা ও আধুনিক পরিবেশবান্ধব টাইলস' : '40% lighter, ultra-thin precision'}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>

                    <Link
                      href={`${basePrefix}/heatproof-tiles`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                          <span>{isBn ? 'হিটপ্রুফ টাইলস' : 'Heatproof Tiles'}</span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            45°C Barrier
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          {isBn ? 'ছাদ ও আউটডোর তাপ প্রতিরোধী' : 'Rooftop thermal solar reflection'}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>

                    <Link
                      href={`${basePrefix}/downloads`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                          <Download className="w-3.5 h-3.5 text-[#E30613]" />
                          <span>{isBn ? 'ক্যাটালগ ডাউনলোড' : 'Catalogs & Downloads'}</span>
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          {isBn ? 'পিডিএফ ব্রোশার ও টেকনিক্যাল স্পেক্স' : 'PDF brochures & technical specs'}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>
                  </div>

                  <Link
                    href={`${basePrefix}/tiles`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 bg-[#E30613] hover:bg-[#c40510] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors mt-2"
                  >
                    <span>{isBn ? 'সকল টাইলস এক্সপ্লোর করুন' : 'Explore All Tiles'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* TAB 2: Brand */}
              {mobileTab === 'brand' && (
                <div className="space-y-3 pt-1 animate-fadeIn">
                  <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                    <span className="text-[#E30613] font-bold tracking-widest text-xs uppercase">
                      {isBn ? 'ব্র্যান্ড ও মানদণ্ড (৪)' : 'Brand & Standards (4)'}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {isBn ? 'উৎকর্ষ ও টেকনোলজি' : 'Factory & Innovation'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Link
                      href={`${basePrefix}/about`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {isBn ? 'আমাদের সম্পর্কে' : 'About Fresh'}
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          {isBn ? 'মেঘনা গ্রুপ ও ফ্রেশ সিরামিকস ঐতিহ্য' : 'Heritage & Meghna Group of Industries'}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>

                    <Link
                      href={`${basePrefix}/sustainability`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                          <span>{isBn ? 'সাসটেইনেবিলিটি ও কারখানা' : 'Sustainability & Plant'}</span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            0% Discharge
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          {isBn ? 'পরিবেশবান্ধব উৎপাদন ও জিরো ওয়েস্ট' : 'Zero effluent discharge & heat recovery'}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>

                    <Link
                      href={`${basePrefix}/quality-and-technology`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                          <span>{isBn ? 'প্রযুক্তি ও মানদণ্ড' : 'Quality & Technology'}</span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            14 Tests
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          {isBn ? 'ইতালীয় SACMI প্রযুক্তি ও ১৪টি পরীক্ষা' : 'Italian SACMI line & 98% Grade A'}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>

                    <Link
                      href={`${basePrefix}/initiatives`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {isBn ? 'উদ্যোগ ও কার্যক্রম' : 'Initiatives'}
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          {isBn ? 'সমাজ, দক্ষতা বৃদ্ধি ও কারিগর উন্নয়ন' : 'Mason academy & community stewardship'}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>
                  </div>

                  <Link
                    href={homePath}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors mt-2 border border-white/15"
                  >
                    <span>{isBn ? 'ব্র্যান্ড জার্নি দেখুন' : 'Experience Brand Journey'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* TAB 3: Connect */}
              {mobileTab === 'connect' && (
                <div className="space-y-3 pt-1 animate-fadeIn">
                  <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                    <span className="text-[#E30613] font-bold tracking-widest text-xs uppercase">
                      {isBn ? 'যোগাযোগ ও নেটওয়ার্ক (৫)' : 'Connect & Support (5)'}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {isBn ? 'দেশব্যাপী সহায়তা' : 'Nationwide Reach'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Link
                      href={`${basePrefix}/showrooms`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#E30613]" />
                          <span>{isBn ? 'শোরুম খুঁজুন' : 'Find a Showroom'}</span>
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          {isBn ? 'দেশব্যাপী সকল ডিসপ্লে সেন্টার ও জোন' : 'Flagship showrooms across 8 divisions'}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>

                    <Link
                      href={`${basePrefix}/fitters`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {isBn ? 'নান্দনিকতার কারিগর (ফিটার)' : 'For Fitters'}
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          {isBn ? 'টাইলস কারিগর গিল্ড ও প্রশিক্ষণ' : 'Fitter guild, training & rewards'}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>

                    <Link
                      href={`${basePrefix}/professionals`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {isBn ? 'স্থপতি ও ডিজাইনার' : 'For Professionals'}
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          {isBn ? 'আর্কিটেকচারাল স্যাম্পল ও বিআইএম' : 'BIM library, textures & specs'}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>

                    <Link
                      href={`${basePrefix}/become-a-dealer`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-[#E30613]/10 hover:bg-[#E30613]/20 border border-[#E30613]/30 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                          <span className="text-[#E30613] font-bold">★</span>
                          <span>{isBn ? 'ডিলারশিপ আবেদন' : 'Become a Dealer'}</span>
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          {isBn ? 'ফ্রেশ পরিবারের পার্টনার হতে আবেদন করুন' : 'Join our authorized dealer network'}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#E30613]" />
                    </Link>

                    <Link
                      href={`${basePrefix}/contact`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {isBn ? 'যোগাযোগ' : 'Contact'}
                        </div>
                        <div className="text-xs text-neutral-400 mt-0.5">
                          {isBn ? 'কর্পোরেট অফিস ও সাধারণ অনুসন্ধান' : 'Corporate headquarters & inquiry form'}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>
                  </div>

                  <a
                    href="tel:16595"
                    className="w-full py-2.5 px-4 bg-[#E30613] hover:bg-[#c40510] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors mt-2 shadow"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{isBn ? 'হটলাইনে কল করুন: ১৬৫৯৫' : 'Call Nationwide Hotline: 16595'}</span>
                  </a>
                </div>
              )}

              {/* TAB 4: All Sections with Accordion */}
              {mobileTab === 'all' && (
                <div className="space-y-3 pt-1 animate-fadeIn">
                  {/* Products Accordion */}
                  <div className="border border-white/10 bg-white/5">
                    <button
                      type="button"
                      onClick={() => setAccordionOpen(prev => ({ ...prev, products: !prev.products }))}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="text-[#E30613] font-bold text-xs uppercase tracking-wider">
                        {isBn ? 'পণ্য ও স্পেস (৫)' : 'Products & Spaces (5)'}
                      </span>
                      {accordionOpen.products ? (
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-neutral-400" />
                      )}
                    </button>
                    {accordionOpen.products && (
                      <div className="p-3 pt-0 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                        <Link
                          href={`${basePrefix}/tiles`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2 bg-black/30 border border-white/5 hover:border-[#E30613] transition-colors"
                        >
                          {isBn ? 'সকল টাইলস' : 'All Tiles'}
                        </Link>
                        <Link
                          href={`${basePrefix}/spaces`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2 bg-black/30 border border-white/5 hover:border-[#E30613] transition-colors"
                        >
                          {isBn ? 'স্পেস অনুপ্রেরণা' : 'Inspiration'}
                        </Link>
                        <Link
                          href={`${basePrefix}/slim-tiles`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2 bg-black/30 border border-white/5 hover:border-[#E30613] transition-colors"
                        >
                          {isBn ? 'স্লিম টাইলস' : 'Slim Tiles'}
                        </Link>
                        <Link
                          href={`${basePrefix}/heatproof-tiles`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2 bg-black/30 border border-white/5 hover:border-[#E30613] transition-colors"
                        >
                          {isBn ? 'হিটপ্রুফ টাইলস' : 'Heatproof'}
                        </Link>
                        <Link
                          href={`${basePrefix}/downloads`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="col-span-2 p-2 bg-black/30 border border-white/5 hover:border-[#E30613] transition-colors flex items-center justify-between"
                        >
                          <span>{isBn ? 'ক্যাটালগ ডাউনলোড' : 'Catalogs & Downloads'}</span>
                          <Download className="w-3 h-3 text-[#E30613]" />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Brand Accordion */}
                  <div className="border border-white/10 bg-white/5">
                    <button
                      type="button"
                      onClick={() => setAccordionOpen(prev => ({ ...prev, brand: !prev.brand }))}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="text-[#E30613] font-bold text-xs uppercase tracking-wider">
                        {isBn ? 'ব্র্যান্ড ও মানদণ্ড (৪)' : 'Brand & Standards (4)'}
                      </span>
                      {accordionOpen.brand ? (
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-neutral-400" />
                      )}
                    </button>
                    {accordionOpen.brand && (
                      <div className="p-3 pt-0 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                        <Link
                          href={`${basePrefix}/about`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2 bg-black/30 border border-white/5 hover:border-[#E30613] transition-colors"
                        >
                          {isBn ? 'আমাদের সম্পর্কে' : 'About Fresh'}
                        </Link>
                        <Link
                          href={`${basePrefix}/sustainability`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2 bg-black/30 border border-white/5 hover:border-[#E30613] transition-colors"
                        >
                          {isBn ? 'সাসটেইনেবিলিটি' : 'Sustainability'}
                        </Link>
                        <Link
                          href={`${basePrefix}/quality-and-technology`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2 bg-black/30 border border-white/5 hover:border-[#E30613] transition-colors"
                        >
                          {isBn ? 'প্রযুক্তি ও মান' : 'Quality & Tech'}
                        </Link>
                        <Link
                          href={`${basePrefix}/initiatives`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2 bg-black/30 border border-white/5 hover:border-[#E30613] transition-colors"
                        >
                          {isBn ? 'উদ্যোগ ও সিএসআর' : 'Initiatives'}
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Connect Accordion */}
                  <div className="border border-white/10 bg-white/5">
                    <button
                      type="button"
                      onClick={() => setAccordionOpen(prev => ({ ...prev, connect: !prev.connect }))}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="text-[#E30613] font-bold text-xs uppercase tracking-wider">
                        {isBn ? 'যোগাযোগ ও নেটওয়ার্ক (৫)' : 'Connect & Support (5)'}
                      </span>
                      {accordionOpen.connect ? (
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-neutral-400" />
                      )}
                    </button>
                    {accordionOpen.connect && (
                      <div className="p-3 pt-0 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                        <Link
                          href={`${basePrefix}/showrooms`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2 bg-black/30 border border-white/5 hover:border-[#E30613] transition-colors"
                        >
                          {isBn ? 'শোরুম খুঁজুন' : 'Showrooms'}
                        </Link>
                        <Link
                          href={`${basePrefix}/fitters`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2 bg-black/30 border border-white/5 hover:border-[#E30613] transition-colors"
                        >
                          {isBn ? 'ফিটার গিল্ড' : 'For Fitters'}
                        </Link>
                        <Link
                          href={`${basePrefix}/professionals`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2 bg-black/30 border border-white/5 hover:border-[#E30613] transition-colors"
                        >
                          {isBn ? 'স্থপতি ও ডিজাইনার' : 'Professionals'}
                        </Link>
                        <Link
                          href={`${basePrefix}/become-a-dealer`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2 bg-[#E30613]/10 border border-[#E30613]/30 text-white font-semibold transition-colors"
                        >
                          {isBn ? 'ডিলার আবেদন' : 'Become Dealer'}
                        </Link>
                        <Link
                          href={`${basePrefix}/contact`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="col-span-2 p-2 bg-black/30 border border-white/5 hover:border-[#E30613] transition-colors"
                        >
                          {isBn ? 'যোগাযোগ' : 'Contact'}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Quick Contacts Footer */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <a
                  href="tel:16595"
                  className="flex items-center justify-between p-3 bg-[#E30613]/15 border border-[#E30613]/30 text-white hover:bg-[#E30613]/25 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#E30613]" />
                    <span className="text-xs font-semibold">{isBn ? 'হটলাইন কল করুন' : 'Toll-Free Hotline'}</span>
                  </div>
                  <span className="text-sm font-bold text-white tracking-wider">16595</span>
                </a>
                <div className="flex items-center justify-between text-xs text-neutral-400 px-1 pt-1">
                  <span>{isBn ? 'দেশব্যাপী শোরুম ও ডিলার নেটওয়ার্ক' : 'Nationwide 8 Division Reach'}</span>
                  <span>© 2026 Fresh Ceramics</span>
                </div>
              </div>
              {/* Extra mobile safe bottom buffer */}
              <div className="h-28 w-full shrink-0" aria-hidden="true" />
            </div>

            {/* DESKTOP ONLY NAVIGATION (>= md) - 100% UNCHANGED AND IDENTICAL TO ORIGINAL */}
            <div className="hidden md:block">
              <nav className="grid grid-cols-3 gap-8 md:gap-12 py-5 sm:py-8 max-w-5xl mx-auto w-full">
                <div className="space-y-3">
                  <h3 className="kicker text-[#E30613] pb-1.5 border-b border-white/10 font-bold tracking-widest text-xs uppercase">
                    {isBn ? 'পণ্য ও স্পেস' : 'Products & Spaces'}
                  </h3>
                  <ul className="space-y-2 text-sm sm:text-base font-normal">
                    <li>
                      <Link
                        href={`${basePrefix}/tiles`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[#E30613] transition-colors block py-0.5"
                      >
                        {isBn ? 'সকল টাইলস' : 'All Tiles'}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`${basePrefix}/spaces`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[#E30613] transition-colors block py-0.5"
                      >
                        {isBn ? 'স্পেস অনুযায়ী অনুপ্রেরণা' : 'Inspiration by Space'}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`${basePrefix}/slim-tiles`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[#E30613] transition-colors block py-0.5"
                      >
                        {isBn ? 'স্লিম টাইলস' : 'Slim Tiles'}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`${basePrefix}/heatproof-tiles`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[#E30613] transition-colors block py-0.5"
                      >
                        {isBn ? 'হিটপ্রুফ টাইলস' : 'Heatproof Tiles'}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`${basePrefix}/downloads`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[#E30613] transition-colors block py-0.5"
                      >
                        {isBn ? 'ক্যাটালগ ডাউনলোড' : 'Catalogs & Downloads'}
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="kicker text-[#E30613] pb-1.5 border-b border-white/10 font-bold tracking-widest text-xs uppercase">
                    {isBn ? 'ব্র্যান্ড ও মানদণ্ড' : 'Brand & Standards'}
                  </h3>
                  <ul className="space-y-2 text-sm sm:text-base font-normal">
                    <li>
                      <Link
                        href={`${basePrefix}/about`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[#E30613] transition-colors block py-0.5"
                      >
                        {isBn ? 'আমাদের সম্পর্কে' : 'About Fresh'}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`${basePrefix}/sustainability`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[#E30613] transition-colors block py-0.5"
                      >
                        {isBn ? 'সাসটেইনেবিলিটি ও কারখানা' : 'Sustainability & Plant'}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`${basePrefix}/quality-and-technology`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[#E30613] transition-colors block py-0.5"
                      >
                        {isBn ? 'প্রযুক্তি ও মানদণ্ড' : 'Quality & Technology'}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`${basePrefix}/initiatives`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[#E30613] transition-colors block py-0.5"
                      >
                        {isBn ? 'উদ্যোগ ও কার্যক্রম' : 'Initiatives'}
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="kicker text-[#E30613] pb-1.5 border-b border-white/10 font-bold tracking-widest text-xs uppercase">
                    {isBn ? 'যোগাযোগ ও নেটওয়ার্ক' : 'Connect'}
                  </h3>
                  <ul className="space-y-2 text-sm sm:text-base font-normal">
                    <li>
                      <Link
                        href={`${basePrefix}/showrooms`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[#E30613] transition-colors block py-0.5"
                      >
                        {isBn ? 'শোরুম খুঁজুন' : 'Find a Showroom'}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`${basePrefix}/fitters`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[#E30613] transition-colors block py-0.5"
                      >
                        {isBn ? 'নান্দনিকতার কারিগর (ফিটার)' : 'For Fitters'}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`${basePrefix}/professionals`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[#E30613] transition-colors block py-0.5"
                      >
                        {isBn ? 'স্থপতি ও ডিজাইনার' : 'For Professionals'}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`${basePrefix}/become-a-dealer`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[#E30613] transition-colors block py-0.5"
                      >
                        {isBn ? 'ডিলারশিপ আবেদন' : 'Become a Dealer'}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`${basePrefix}/contact`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:text-[#E30613] transition-colors block py-0.5"
                      >
                        {isBn ? 'যোগাযোগ' : 'Contact'}
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>

              {/* Desktop Footer Bar with Direct Hotline */}
              <div className="flex items-center justify-between border-t border-white/10 pt-6 text-sm text-neutral-400 max-w-5xl mx-auto w-full">
                <a
                  href="tel:16595"
                  className="flex items-center gap-2 text-white hover:text-[#E30613] transition-colors py-1"
                >
                  <Phone className="w-4 h-4 text-[#E30613]" />
                  <span>{isBn ? 'হটলাইন' : 'Hotline'}: <strong className="text-white tracking-wider">16595</strong> (Nationwide)</span>
                </a>
                <p className="text-xs">© 2026 Fresh Ceramics. All rights reserved.</p>
              </div>
              <div className="h-20 w-full shrink-0" aria-hidden="true" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
