'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { MapPin, Phone, Clock, Store, Navigation, ArrowUpRight, Search, Check, MessageCircle } from 'lucide-react'

import rawShowrooms from '@/data/showrooms.json'

interface Showroom {
  id: string | number
  name: string
  tier: 'flagship' | 'exclusive' | 'dealer'
  division: string
  district: string
  thana?: string
  address: string
  phone: string
  hours: string
  lat: number
  lng: number
  mapLink?: string | null
}

const REAL_SHOWROOMS: Showroom[] = (rawShowrooms as any[]).map((s) => {
  let displayName = s.name
  if (s.tier === 'flagship') {
    if (s.division?.toLowerCase() === 'chattogram') {
      displayName = 'Fresh Ceramics House of Aesthetics (Chattogram Flagship Display Centre)'
    } else if (s.division?.toLowerCase() === 'dhaka') {
      displayName = 'Fresh Ceramics House of Aesthetics (Dhaka Flagship Display Centre)'
    }
  }
  return {
    id: s.id,
    name: displayName,
    tier: s.tier,
    division: s.division,
    district: s.district,
    thana: s.thana,
    address: s.address,
    phone: s.phone || '16595',
    hours: s.hours || 'Sat - Thu: 9:00 AM - 8:00 PM',
    lat: s.latitude || 23.7461,
    lng: s.longitude || 90.3924,
    mapLink: s.mapLink,
  }
})

export default function ShowroomsPage() {
  const searchParams = useSearchParams()
  const [selectedDivision, setSelectedDivision] = useState('all')
  const [selectedTier, setSelectedTier] = useState<'all' | 'flagship' | 'exclusive' | 'dealer'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [locating, setLocating] = useState(false)

  useEffect(() => {
    const div = searchParams.get('division')
    if (div) setSelectedDivision(div.toLowerCase())
    const tier = searchParams.get('type')
    if (tier === 'flagship' || tier === 'exclusive' || tier === 'dealer') {
      setSelectedTier(tier)
    }
  }, [searchParams])

  const handleFindNearest = () => {
    setLocating(true)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocating(false)
          setSelectedDivision('dhaka') // Defaults to central division
        },
        () => {
          setLocating(false)
          setSelectedDivision('dhaka')
        },
        { timeout: 5000 }
      )
    } else {
      setLocating(false)
    }
  }

  const filteredShowrooms = REAL_SHOWROOMS.filter((s) => {
    if (selectedDivision !== 'all' && s.division.toLowerCase() !== selectedDivision.toLowerCase()) return false
    if (selectedTier !== 'all' && s.tier !== selectedTier) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        s.name.toLowerCase().includes(q) ||
        s.district.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        (s.thana && s.thana.toLowerCase().includes(q))
      )
    }
    return true
  })

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="border-b border-stone/15 pb-8 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-fresh-red mb-1">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-stone-dark/70">Showroom Network</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-2 tracking-tight">
            Find Your <span className="font-semibold text-stone">Nearest Showroom</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            79 Exclusive Showrooms, 2 Flagship Display Centres, and over 120 Authorised Dealers nationwide. Guaranteed delivery within 4 days.
          </p>

          {/* 3 Tier Counter Badges */}
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-display uppercase tracking-wider font-semibold">
            <span className="px-3.5 py-2 bg-fresh-red text-white shadow-sm flex items-center gap-1.5">
              <Store className="w-4 h-4" /> 02 Flagship Display Centres
            </span>
            <span className="px-3.5 py-2 bg-stone text-paper shadow-sm flex items-center gap-1.5">
              <Store className="w-4 h-4" /> 79 Exclusive Showrooms
            </span>
            <span className="px-3.5 py-2 bg-stone/10 text-stone border border-stone/20 flex items-center gap-1.5">
              <Store className="w-4 h-4 text-fresh-red" /> 120+ Authorised Dealers
            </span>
            <a
              href="https://wa.me/8801700112233?text=Hello%20Fresh%20Ceramics%20VIP%20Concierge,%20I%20would%20like%20to%20locate%20and%20verify%20tile%20stock%20at%20the%20nearest%20showroom."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> VIP WhatsApp Concierge
            </a>
          </div>
        </div>

        {/* Filter Strip */}
        <div className="bg-white border border-stone/15 p-4 shadow-sm mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedTier('all')}
              className={`px-3 py-1.5 text-xs font-display uppercase font-semibold transition-all ${
                selectedTier === 'all' ? 'bg-stone text-paper' : 'bg-stone/5 text-stone hover:bg-stone/10'
              }`}
            >
              All Tiers
            </button>
            <button
              onClick={() => setSelectedTier('flagship')}
              className={`px-3 py-1.5 text-xs font-display uppercase font-semibold transition-all ${
                selectedTier === 'flagship' ? 'bg-fresh-red text-white' : 'bg-stone/5 text-stone hover:bg-stone/10'
              }`}
            >
              Flagship Only
            </button>
            <button
              onClick={() => setSelectedTier('exclusive')}
              className={`px-3 py-1.5 text-xs font-display uppercase font-semibold transition-all ${
                selectedTier === 'exclusive' ? 'bg-stone text-paper' : 'bg-stone/5 text-stone hover:bg-stone/10'
              }`}
            >
              Exclusive Showrooms
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-dark/50" />
              <input
                type="text"
                placeholder="Search by name, district, thana..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-stone/5 border border-stone/20 text-stone focus:outline-none focus:border-fresh-red placeholder:text-stone-dark/40"
              />
            </div>

            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="py-2 px-3 text-xs bg-stone/5 border border-stone/20 text-stone focus:outline-none focus:border-fresh-red"
            >
              <option value="all">All Divisions</option>
              <option value="dhaka">Dhaka Division</option>
              <option value="chattogram">Chattogram Division</option>
              <option value="sylhet">Sylhet Division</option>
              <option value="rajshahi">Rajshahi Division</option>
              <option value="khulna">Khulna Division</option>
              <option value="barishal">Barishal Division</option>
              <option value="rangpur">Rangpur Division</option>
              <option value="mymensingh">Mymensingh Division</option>
            </select>

            <button
              onClick={handleFindNearest}
              disabled={locating}
              className="inline-flex items-center gap-2 px-4 py-2 bg-fresh-red hover:bg-ember text-white text-xs font-display uppercase tracking-wider font-semibold transition-colors shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{locating ? 'Locating...' : 'Use My Location'}</span>
            </button>
          </div>
        </div>

        {/* Showrooms Results Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShowrooms.map((sh) => (
            <div
              key={sh.id}
              className="bg-white border border-stone/15 hover:border-fresh-red p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 ${
                      sh.tier === 'flagship'
                        ? 'bg-fresh-red text-white'
                        : sh.tier === 'exclusive'
                        ? 'bg-stone text-paper'
                        : 'bg-stone/10 text-stone'
                    }`}
                  >
                    {sh.tier === 'flagship'
                      ? 'Flagship Display'
                      : sh.tier === 'exclusive'
                      ? 'Exclusive Showroom'
                      : 'Authorised Dealer'}
                  </span>
                  <span className="text-xs font-mono text-stone-dark/60">{sh.district}</span>
                </div>

                <h3 className="text-lg font-display font-bold text-stone">{sh.name}</h3>
                <p className="text-xs text-stone-dark/80 mt-2 leading-relaxed flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-fresh-red shrink-0 mt-0.5" />
                  <span>{sh.address}</span>
                </p>

                <div className="mt-4 pt-3 border-t border-stone/10 space-y-2 text-xs font-mono text-stone-dark/80">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-fresh-red" />
                    <a href={`tel:${sh.phone}`} className="hover:text-fresh-red">
                      {sh.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-grey" />
                    <span>{sh.hours}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href={`https://wa.me/8801700112233?text=${encodeURIComponent(
                      `Hello, inquiring about Fresh Ceramics tile stock at ${sh.name} (${sh.district}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 hover:underline font-semibold"
                    title="Direct WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  {sh.mapLink && (
                    <a
                      href={sh.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-dark/70 hover:text-fresh-red hover:underline"
                      title="Direct Map Link"
                    >
                      <MapPin className="w-3 h-3 text-fresh-red" />
                      <span>Map</span>
                    </a>
                  )}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sh.name + ', ' + sh.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-wider text-fresh-red hover:underline"
                  >
                    <span>Get Directions</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 font-semibold">
                  4-Day Delivery Ready
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
