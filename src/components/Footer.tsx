'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

function normalizePathname(pathname: string | null | undefined): string {
  if (!pathname) return '/'
  if (pathname === '/en' || pathname === '/en/') return '/'
  if (pathname.startsWith('/en/')) return pathname.slice(3)
  return pathname
}

interface FooterProps {
  locale?: string
}

export function Footer({ locale = 'en' }: FooterProps) {
  const rawPathname = usePathname()
  const pathname = normalizePathname(rawPathname)
  const isBn = locale === 'bn' || pathname.startsWith('/bn')
  const basePrefix = isBn ? '/bn' : ''

  const pathWithoutBn = pathname.startsWith('/bn')
    ? pathname.replace(/^\/bn(\/|$)/, '$1') || '/'
    : pathname

  const switchHref = isBn
    ? pathWithoutBn
    : (pathWithoutBn === '/' ? '/bn' : `/bn${pathWithoutBn}`)

  return (
    <footer
      className="w-full bg-white text-stone-700 selection:bg-fresh-red selection:text-white relative"
      role="contentinfo"
    >
      {/* Architectural Transition Seam Plinth between deep Ember and White Footer */}
      <div className="w-full bg-[#18181B] text-neutral-300 border-b-2 border-fresh-red py-3.5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-fresh-red inline-block" />
            <span className="font-semibold text-white tracking-wider uppercase">
              {isBn ? 'মেঘনা সিরামিক ইন্ডাস্ট্রিজ লিমিটেড' : 'Meghna Ceramic Industries Ltd.'}
            </span>
            <span className="hidden sm:inline text-neutral-500">•</span>
            <span className="hidden sm:inline text-neutral-400">
              {isBn ? 'সোনারগাঁ মেঘনাঘাট প্ল্যান্ট' : 'Sonargaon Meghnaghat Plant'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-neutral-400">
            <span>{isBn ? 'সারাদেশে ৪ দিনের ডেলিভারি' : '4-Day Delivery Guaranteed'}</span>
            <span>•</span>
            <span className="text-white font-bold">{isBn ? 'হটলাইন: ১৬৫৯৫' : 'Hotline: 16595'}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 pt-14 pb-12 px-6 md:px-12">
        {/* Top Row: Brand & Quick Hotline */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-stone-200">
          <div className="space-y-2">
            <div className="inline-block">
              <Logo variant="full" locale={isBn ? 'bn' : 'en'} height={48} width={180} />
            </div>
            <p className="text-xs md:text-sm text-stone-500 max-w-md font-light">
              {isBn
                ? 'নান্দনিক জীবনের ফ্রেশ সূচনা। মেঘনা সিরামিক ইন্ডাস্ট্রিজ লিমিটেড-এর একটি প্রিমিয়াম ব্র্যান্ড।'
                : 'A Fresh Start to an Aesthetic Life. Highest selling tiles brand in Bangladesh every year since 2023.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:16595"
              className="inline-flex items-center gap-2.5 px-5 py-3 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{isBn ? 'হটলাইন: ১৬৫৯৫' : 'Hotline: 16595'}</span>
            </a>
            <a
              href={`https://wa.me/8801700112233?text=${encodeURIComponent(
                'Hello Fresh Ceramics VIP Concierge, I am requesting architectural specification guidance.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isBn ? 'ভিআইপি হোয়াটসঅ্যাপ' : 'VIP WhatsApp'}</span>
            </a>
          </div>
        </div>

        {/* Four Column Nav Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-xs">
          {/* Col 1: Manufacturing Plant & Contacts */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-stone-900 uppercase tracking-wider">
              {isBn ? 'উৎপাদন প্ল্যান্ট ও যোগাযোগ' : 'Plant & Headquarters'}
            </h4>
            <ul className="space-y-2.5 text-stone-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-fresh-red shrink-0 mt-0.5" />
                <span>Meghnaghat, Sonargaon, Narayanganj, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-fresh-red shrink-0" />
                <span>16595 (Toll Free / Nationwide)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-fresh-red shrink-0" />
                <span>info@freshceramics.net</span>
              </li>
              <li className="text-[11px] text-stone-500 pt-1">
                <span>{isBn ? 'বাৎসরিক উৎপাদন: ১ কোটি ৮৬ লাখ বর্গমিটার' : 'Annual Capacity: 18.6 Million Sq.M.'}</span>
              </li>
            </ul>
          </div>

          {/* Col 2: Architectural Surfaces */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-stone-900 uppercase tracking-wider">
              {isBn ? 'সারফেস ও স্পেস' : 'Surfaces & Spaces'}
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <Link href={`${basePrefix}/tiles`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'সকল টাইলস ক্যাটালগ (৪৬৮)' : 'All Tiles Catalogue (468)'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/spaces`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'স্পেস অনুযায়ী টাইলস' : 'Inspiration by Space'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/slim-tiles`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'স্লিম টাইলস (ওজন ক্যালকুলেটর)' : 'Slim Tiles (Dead-Load Specs)'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/heatproof-tiles`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'হিটপ্রুফ টাইলস (ইউএন এসডিজি ১১)' : 'Heatproof Tiles (UN SDG 11)'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/downloads`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'ক্যাটালগ ডাউনলোড' : 'PDF Catalogs & Brochures'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/visualizer`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'ভার্চুয়াল ভিজ্যুয়ালাইজার' : 'Virtual Room Visualizer (Studio)'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Trade & Specifiers */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-stone-900 uppercase tracking-wider">
              {isBn ? 'পেশাদার ও কারিগর' : 'Trade & Specifiers'}
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <Link href={`${basePrefix}/professionals`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'স্থপতি ও ইন্টেরিয়র ডিজাইনার' : 'Architects & Designers Portal'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/fitters`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'নান্দনিকতার কারিগর (ফিটার ক্লাব)' : 'Fitter Community (নান্দনিকতার কারিগর)'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/showrooms`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'শোরুম লোকেটর (৮১ কেন্দ্র)' : 'Showroom Locator (81 Locations)'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/become-a-dealer`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'ডিলারশিপ আবেদন' : 'Become an Authorised Dealer'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/learn`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'টাইলস সিলেকশন ও কেয়ার গাইড' : 'Technical Learning Hub'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/shortlist`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'প্রজেক্ট শর্টলিস্ট ও বিওকিউ' : 'Project Shortlist & BOQ'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Sustainability & Governance */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-stone-900 uppercase tracking-wider">
              {isBn ? 'কোম্পানি ও মানদণ্ড' : 'Company & Standards'}
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <Link href={`${basePrefix}/about`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'আমাদের সম্পর্কে' : 'About Fresh Ceramics'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/sustainability`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'টেকসই উৎপাদনের ৬টি নিয়ম' : '6 Responsible Factory Choices'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/quality-and-technology`} className="hover:text-fresh-red transition-colors">
                  {isBn ? '১৪টি গ্লোবাল পরীক্ষা' : 'Quality & 14 Factory Tests'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/initiatives`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'সামাজিক উদ্যোগ' : 'Brand Initiatives'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/news`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'সংবাদ ও ঘোষণা' : 'News & Announcements'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/faq`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'সাধারণ জিজ্ঞাসা' : 'Frequently Asked Questions'}
                </Link>
              </li>
              <li>
                <Link href={`${basePrefix}/contact`} className="hover:text-fresh-red transition-colors">
                  {isBn ? 'যোগাযোগ ও সহায়তা' : 'Corporate Contact'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div className="space-y-0.5 text-center md:text-left">
            <p>© 2026 Fresh Ceramics. All rights reserved.</p>
            <p className="text-[10px] text-stone-400">
              Meghna Ceramic Industries Ltd. (A Concern of Meghna Group of Industries - MGI)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href={`${basePrefix}/privacy`} className="hover:text-fresh-red transition-colors">
              {isBn ? 'গোপনীয়তা নীতিমালা' : 'Privacy Policy'}
            </Link>
            <Link href={`${basePrefix}/terms`} className="hover:text-fresh-red transition-colors">
              {isBn ? 'ব্যবহারের শর্তাবলী' : 'Terms of Service'}
            </Link>
            <Link
              href={switchHref}
              className="text-stone-900 font-semibold hover:text-fresh-red transition-colors"
            >
              {isBn ? 'English Version' : 'বাংলা ভার্সন'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
