'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { MapPin, Truck, Store, Navigation, Phone, Clock, ArrowUpRight, MessageCircle } from 'lucide-react'
import { BangladeshSvgMap } from '@/components/map/BangladeshSvgMap'
import rawShowrooms from '@/data/showrooms.json'

interface Chapter6ReachProps {
  locale?: string
  isTouch?: boolean
}

// Meghnaghat Mother Plant Origin
const PLANT_ORIGIN = {
  id: 'meghnaghat-plant',
  name: 'Meghnaghat Mother Plant',
  nameBn: 'মেঘনাঘাট মাদার প্ল্যান্ট',
  tier: 'mother_plant',
  division: 'Dhaka',
  district: 'Narayanganj',
  thana: 'Sonargaon',
  address: 'Sonargaon, Narayanganj — 100% Surface Water & Zero Black Smoke',
  addressBn: 'সোনারগাঁ, নারায়ণগঞ্জ — শতভাগ সারফেস ওয়াটার ও ধোঁয়াহীন কারখানা',
  phone: '16595',
  hours: 'Sat - Thu: 8:00 AM - 6:00 PM',
  latitude: 23.60,
  longitude: 90.60,
  mapLink: 'https://maps.google.com/?q=Fresh+Ceramics+Plant+Meghnaghat',
}

export function Chapter6Reach({ locale = 'en', isTouch = false }: Chapter6ReachProps) {
  const [selectedDivision, setSelectedDivision] = useState<string>('all')
  const [activeShowroom, setActiveShowroom] = useState<any>(null)

  const isBn = locale === 'bn'

  // Pre-process showrooms data
  const showrooms = useMemo(() => {
    return (rawShowrooms as any[]).map((s) => {
      const isFlagship = s.tier === 'flagship'
      return {
        ...s,
        isFlagship,
      }
    })
  }, [])

  // Set default active showroom to Dhaka Flagship
  useEffect(() => {
    const dhakaFlagship = showrooms.find((s) => s.isFlagship && s.division?.toLowerCase() === 'dhaka')
    if (dhakaFlagship && !activeShowroom) {
      setActiveShowroom(dhakaFlagship)
    } else if (!activeShowroom && showrooms.length > 0) {
      setActiveShowroom(showrooms[0])
    }
  }, [showrooms, activeShowroom])

  return (
    <section
      id="reach"
      className="relative w-full h-[100dvh] max-h-[100dvh] bg-[#161618] text-paper select-none transition-colors duration-700 flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-6 px-4 sm:px-8 md:px-12 lg:px-14 overflow-hidden"
    >
      {/* Top Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-white/10 pb-3 shrink-0">
        <div>
          <span className="text-[11px] font-display font-semibold tracking-widest uppercase text-fresh-red">
            {isBn ? 'অধ্যায় ০৬: দেশব্যাপী উপস্থিতি' : 'Chapter 06: Nationwide Presence'}
          </span>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-light text-paper mt-0.5 tracking-tight">
            {isBn ? (
              <>আপনার নিকটেই: <span className="font-semibold text-white">ফ্রেশ সিরামিকস</span></>
            ) : (
              <>Within your reach: <span className="font-semibold text-white">Fresh Ceramics</span></>
            )}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-grey shrink-0">
          <Truck className="w-4 h-4 text-fresh-red" />
          <span>
            {isBn
              ? 'অনুমোদিত শোরুম থেকে ৪ দিনের মধ্যে ডেলিভারি'
              : 'Delivery within 4 days from authorised showrooms'}
          </span>
        </div>
      </div>

      {/* Center Grid: Left = Authentic Bangladesh Geographic SVG Map, Right = Stats & Interactive Showroom Finder */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 my-auto items-stretch py-2 min-h-0 flex-1 max-h-[calc(100dvh-11rem)]">
        {/* Left Column: Authentic Bangladesh Geographic SVG Map with 8 Divisions & 81 Real Showrooms */}
        <div className="lg:col-span-7 flex flex-col h-full min-h-[300px] bg-[#141416] border border-white/15 shadow-2xl relative overflow-hidden">
          <BangladeshSvgMap
            selectedDivision={selectedDivision}
            onSelectDivision={(divSlug) => setSelectedDivision(divSlug)}
            activeShowroom={activeShowroom}
            onSelectShowroom={(sh) => setActiveShowroom(sh)}
            locale={locale}
            className="w-full h-full"
          />
        </div>

        {/* Right Column: 3 Live Counters, Division Selector & Interactive Showroom Inspector */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3 overflow-hidden min-h-0">
          {/* 3 Stats Counters */}
          <div className="grid grid-cols-3 gap-2 shrink-0">
            <div className="bg-[#222226] p-2.5 sm:p-3 border-l-2 border-fresh-red shadow-md">
              <span className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">79</span>
              <p className="text-[10px] sm:text-xs font-display uppercase tracking-wider text-grey mt-0.5">
                {isBn ? 'এক্সক্লুসিভ শোরুম' : 'Exclusive Showrooms'}
              </p>
            </div>

            <div className="bg-[#222226] p-2.5 sm:p-3 border-l-2 border-fresh-red shadow-md">
              <span className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-fresh-red">02</span>
              <p className="text-[10px] sm:text-xs font-display uppercase tracking-wider text-grey mt-0.5">
                {isBn ? 'ফ্ল্যাগশিপ সেন্টার' : 'Flagship Centres'}
              </p>
            </div>

            <div className="bg-[#222226] p-2.5 sm:p-3 border-l-2 border-fresh-red shadow-md">
              <span className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">120+</span>
              <p className="text-[10px] sm:text-xs font-display uppercase tracking-wider text-grey mt-0.5">
                {isBn ? 'অনুমোদিত ডিলার' : 'Authorised Dealers'}
              </p>
            </div>
          </div>

          {/* Division Filter Bar */}
          <div className="flex items-center gap-2 bg-[#222226] p-2 border border-white/10 shrink-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-grey shrink-0">
              {isBn ? 'বিভাগ নির্বাচন:' : 'Filter Division:'}
            </span>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="bg-[#2C2C32] border border-white/15 text-paper text-xs py-1.5 px-2 focus:outline-none focus:border-fresh-red w-full font-mono cursor-pointer"
            >
              <option value="all">{isBn ? 'সমগ্র বাংলাদেশ (৮১টি শোরুম)' : 'All Bangladesh (81 Showrooms)'}</option>
              <option value="dhaka">Dhaka (ঢাকা - ১১টি শোরুম + ফ্ল্যাগশিপ)</option>
              <option value="chattogram">Chattogram (চট্টগ্রাম - ১৬টি শোরুম + ফ্ল্যাগশিপ)</option>
              <option value="mymensingh">Mymensingh (ময়মনসিংহ - ১৮টি শোরুম)</option>
              <option value="rajshahi">Rajshahi (রাজশাহী - ১১টি শোরুম)</option>
              <option value="barishal">Barishal (বরিশাল - ১১টি শোরুম)</option>
              <option value="khulna">Khulna (খুলনা - ৯টি শোরুম)</option>
              <option value="rangpur">Rangpur (রংপুর - ৩টি শোরুম)</option>
              <option value="sylhet">Sylhet (সিলেট - ২টি শোরুম)</option>
            </select>
          </div>

          {/* Active Selected Showroom Card */}
          {activeShowroom && (
            <div className="bg-[#222226] p-3 sm:p-4 border border-white/10 space-y-2 shadow-xl relative overflow-hidden flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 font-bold ${
                        activeShowroom.isFlagship
                          ? 'bg-fresh-red text-white'
                          : activeShowroom.tier === 'mother_plant'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/10 text-neutral-300'
                      }`}
                    >
                      {activeShowroom.isFlagship
                        ? isBn ? 'ফ্ল্যাগশিপ সেন্টার' : 'FLAGSHIP DISPLAY CENTRE'
                        : activeShowroom.tier === 'mother_plant'
                        ? isBn ? 'উৎপাদন কারখানা' : 'MOTHER PLANT'
                        : isBn ? 'এক্সক্লুসিভ শোরুম' : 'EXCLUSIVE SHOWROOM'}
                    </span>
                    <span className="text-[10px] font-mono text-grey">
                      {activeShowroom.district}, {activeShowroom.division}
                    </span>
                  </div>

                  {activeShowroom.mapLink && (
                    <a
                      href={activeShowroom.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 bg-fresh-red text-white text-[10px] font-mono uppercase font-semibold hover:bg-ember transition-colors shrink-0"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>{isBn ? 'দিকনির্দেশনা' : 'Navigate'}</span>
                    </a>
                  )}
                </div>

                <h3 className="text-sm sm:text-base font-display font-bold text-white mt-1">
                  {activeShowroom.name}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 flex items-start gap-1.5 leading-relaxed font-mono">
                  <Store className="w-3.5 h-3.5 text-fresh-red shrink-0 mt-0.5" />
                  <span>{activeShowroom.address}</span>
                </p>
              </div>

              <div className="border-t border-white/10 pt-2.5 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-grey">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{activeShowroom.hours || 'Sat - Thu: 9:00 AM - 8:00 PM'}</span>
                  </span>
                  <a href={`tel:${activeShowroom.phone || '16595'}`} className="flex items-center gap-1 text-fresh-red hover:underline font-bold">
                    <Phone className="w-3 h-3" />
                    <span>{activeShowroom.phone || '16595'}</span>
                  </a>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={`https://wa.me/8801700112233?text=${encodeURIComponent(
                      `Hello, inquiring about Fresh Ceramics tile stock at ${activeShowroom.name} (${activeShowroom.district}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp VIP Concierge</span>
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      activeShowroom.name + ', ' + activeShowroom.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Google Maps</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Dealership Link */}
          <div className="flex items-center justify-between text-[11px] bg-[#222226] p-2 border border-white/10 shrink-0">
            <span className="text-grey font-mono">
              {isBn ? 'ফ্রেশ সিরামিকস নেটওয়ার্কে যুক্ত হতে চান?' : 'Join our nationwide network:'}
            </span>
            <Link
              href={isBn ? '/bn/become-a-dealer' : '/become-a-dealer'}
              className="text-fresh-red hover:underline font-bold uppercase tracking-wider inline-flex items-center gap-1 text-xs"
            >
              <span>{isBn ? 'ডিলার আবেদন' : 'Become a Dealer'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10 text-[11px] sm:text-xs text-grey shrink-0">
        <span>
          {isBn
            ? 'সোনারগাঁ মেঘনাঘাট কারখানা থেকে সমগ্র বাংলাদেশ — ৪ দিনের ডেলিভারি গ্যারান্টি'
            : 'From Sonargaon Meghnaghat Plant to every corner of Bangladesh — 4-day delivery guaranteed'}
        </span>
        <div className="flex gap-4">
          <Link href={isBn ? '/bn/showrooms?type=flagship' : '/showrooms?type=flagship'} className="hover:text-paper uppercase tracking-wider">
            {isBn ? 'ফ্ল্যাগশিপ সেন্টারসমূহ' : 'Flagship Centres'}
          </Link>
          <Link href={isBn ? '/bn/showrooms' : '/showrooms'} className="hover:text-paper uppercase tracking-wider text-fresh-red font-semibold">
            {isBn ? 'সকল শোরুম তালিকা (৮১)' : 'All 81 Showrooms'}
          </Link>
        </div>
      </div>
    </section>
  )
}
