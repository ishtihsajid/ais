'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Store, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Truck } from 'lucide-react'

export default function BecomeADealerPage() {
  const [businessName, setBusinessName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [district, setDistrict] = useState('')
  const [showroomSqft, setShowroomSqft] = useState('')
  const [tradeExperienceYears, setTradeExperienceYears] = useState('')
  const [message, setMessage] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submittedId, setSubmittedId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!businessName || !ownerName || !phone) {
      setErrorMessage('Please complete all required fields.')
      return
    }

    setSubmitting(true)
    setErrorMessage(null)

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${ownerName} (${businessName})`,
          phone,
          email,
          type: 'dealer',
          nearestShowroom: district,
          message: `Dealership Application:
Business Name: ${businessName}
Proprietor: ${ownerName}
District: ${district}
Showroom Space: ${showroomSqft} sq ft
Trade Experience: ${tradeExperienceYears} years
Notes: ${message}`,
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setSubmittedId(data.id || 'DEALER-OK')
      } else {
        setErrorMessage(data.error || 'Failed to submit application. Please try again.')
      }
    } catch (err) {
      setErrorMessage('Connection error. Please call our corporate desk at 16595.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="border-b border-stone/15 pb-8 mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-fresh-red">
            Business Association
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-2 tracking-tight">
            Become an Authorised <span className="font-semibold text-stone">Fresh Dealer</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            Join the highest-selling tiles brand network in Bangladesh. Access exclusive product lines, stable pricing, guaranteed 4-day delivery, and nationwide marketing backing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Dealer Benefits */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone text-paper p-8 border border-stone-dark shadow-md space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-fresh-red font-bold">
                Why Partner With Fresh
              </span>
              <ul className="space-y-4 text-xs font-display">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-fresh-red shrink-0 mt-0.5" />
                  <span>
                    <strong>Market Leadership:</strong> Highest selling tiles brand in Bangladesh every year since 2023.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Truck className="w-4 h-4 text-fresh-red shrink-0 mt-0.5" />
                  <span>
                    <strong>Rapid Logistics:</strong> Guaranteed 4-day delivery from modern central distribution hubs.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Store className="w-4 h-4 text-fresh-red shrink-0 mt-0.5" />
                  <span>
                    <strong>Complete SKU Matrix:</strong> First and only full 3-size Double Charge lines, Slim Tiles and Heatproof Tiles.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Dealership Application Form */}
          <div className="lg:col-span-7 bg-white border border-stone/15 p-8 shadow-sm">
            {submittedId ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-2xl font-display font-bold text-stone">Application Submitted</h3>
                <p className="text-xs font-mono text-stone-dark/70">
                  Application Reference: <span className="font-bold text-fresh-red">{submittedId}</span>
                </p>
                <p className="text-xs sm:text-sm text-stone-dark/80 max-w-md mx-auto leading-relaxed">
                  Thank you for your interest in joining the Fresh Ceramics dealer network. Our corporate dealer development manager will review your submission and contact you within 2 business days.
                </p>
                <Link
                  href="/"
                  className="mt-4 inline-block px-6 py-2.5 bg-stone text-paper text-xs font-display uppercase tracking-wider font-semibold"
                >
                  Return to Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-display font-bold text-stone border-b border-stone/10 pb-3">
                  Authorised Dealership Application
                </h3>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border-l-4 border-fresh-red text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-dark/70 uppercase mb-1">
                      Business / Showroom Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Modern Ceramics Gallery"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone/5 border border-stone/20 text-stone focus:outline-none focus:border-fresh-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-dark/70 uppercase mb-1">
                      Proprietor / Director Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Haji Mohammad Alam"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone/5 border border-stone/20 text-stone focus:outline-none focus:border-fresh-red"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-dark/70 uppercase mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone/5 border border-stone/20 text-stone focus:outline-none focus:border-fresh-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-dark/70 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="business@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone/5 border border-stone/20 text-stone focus:outline-none focus:border-fresh-red"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-dark/70 uppercase mb-1">
                      District / City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bogura"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone/5 border border-stone/20 text-stone focus:outline-none focus:border-fresh-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-dark/70 uppercase mb-1">
                      Showroom Area (sq ft)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2500"
                      value={showroomSqft}
                      onChange={(e) => setShowroomSqft(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone/5 border border-stone/20 text-stone focus:outline-none focus:border-fresh-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-dark/70 uppercase mb-1">
                      Years in Ceramic Trade
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 8"
                      value={tradeExperienceYears}
                      onChange={(e) => setTradeExperienceYears(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone/5 border border-stone/20 text-stone focus:outline-none focus:border-fresh-red"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-dark/70 uppercase mb-1">
                    Current Brands Carried & Additional Information
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details about your showroom location, key client types, and target annual sales..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone/5 border border-stone/20 text-stone focus:outline-none focus:border-fresh-red"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-md disabled:opacity-50"
                >
                  {submitting ? 'Submitting Dealership Application...' : 'Submit Dealership Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
