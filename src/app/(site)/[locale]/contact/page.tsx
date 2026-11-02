'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { MessageSquare, Phone, Mail, MapPin, CheckCircle2, AlertCircle, ArrowRight, Clock } from 'lucide-react'

export default function ContactPage() {
  const searchParams = useSearchParams()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState('general')
  const [district, setDistrict] = useState('')
  const [message, setMessage] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submittedId, setSubmittedId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const pCode = searchParams.get('product')
    const items = searchParams.get('items')
    const qType = searchParams.get('type')

    if (qType === 'specification' || items) {
      setType('project')
      if (items) {
        setMessage(`Inquiring about shortlisted specifications: ${items}`)
      }
    } else if (pCode) {
      setType('tile')
      setMessage(`Interested in tile specifications and pricing for SKU: ${pCode}`)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) {
      setErrorMessage('Please provide your name and phone number.')
      return
    }

    setSubmitting(true)
    setErrorMessage(null)

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          type,
          message: `${message}${district ? ` (District: ${district})` : ''}`,
          nearestShowroom: district,
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setSubmittedId(data.id || 'REF-OK')
      } else {
        setErrorMessage(data.error || 'Failed to submit enquiry. Please try again.')
      }
    } catch (err: any) {
      setErrorMessage('Connection error. Please call our hotline at 16595 directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="border-b border-stone/15 pb-8 mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-fresh-red">
            Contact & Enquiries
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-2 tracking-tight">
            Connect with <span className="font-semibold text-stone">Fresh Ceramics</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            Whether specifying for high-profile architectural projects or requesting showroom sample kits, our specialist team responds within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Hotline */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone text-paper p-8 border border-stone-dark shadow-md space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-fresh-red font-bold">
                  Direct Helpline
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-1">
                  Call Hotline 16595
                </h3>
                <p className="text-xs text-grey mt-1">
                  Toll-free customer care available 9:00 AM - 8:00 PM (Saturday - Thursday).
                </p>
              </div>

              <div className="pt-4 border-t border-stone-light/20 space-y-3 text-xs font-mono">
                <p className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-fresh-red shrink-0" />
                  <span>16595 / +880 960 9016595</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-fresh-red shrink-0" />
                  <span>info@freshceramics.net</span>
                </p>
                <p className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-fresh-red shrink-0 mt-0.5" />
                  <span>Plant: Meghnaghat, Sonargaon, Narayanganj, Bangladesh</span>
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone/15 p-6 shadow-sm space-y-3">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-stone">
                Nationwide 4-Day Delivery Commitment
              </span>
              <p className="text-xs text-stone-dark/70 leading-relaxed font-light">
                Orders dispatched across our 79 exclusive showrooms and 2 flagship display centres are delivered within 4 days (subject to stock availability).
              </p>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="lg:col-span-7 bg-white border border-stone/15 p-8 shadow-sm">
            {submittedId ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-2xl font-display font-bold text-stone">Enquiry Received</h3>
                <p className="text-xs font-mono text-stone-dark/70">
                  Reference ID: <span className="font-bold text-fresh-red">{submittedId}</span>
                </p>
                <p className="text-xs sm:text-sm text-stone-dark/80 max-w-md mx-auto leading-relaxed">
                  Thank you for connecting with Fresh Ceramics. An architectural consultant from your nearest exclusive showroom will contact you within 24 hours.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setSubmittedId(null)
                      setName('')
                      setPhone('')
                      setMessage('')
                    }}
                    className="px-5 py-2.5 bg-stone text-paper text-xs font-display uppercase tracking-wider font-semibold"
                  >
                    Send Another Message
                  </button>
                  <Link
                    href="/tiles"
                    className="px-5 py-2.5 bg-fresh-red text-white text-xs font-display uppercase tracking-wider font-semibold"
                  >
                    Browse Tiles
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-display font-bold text-stone border-b border-stone/10 pb-3">
                  Submit Specification or General Inquiry
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
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Architect Rafiqul Islam"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone/5 border border-stone/20 text-stone focus:outline-none focus:border-fresh-red"
                    />
                  </div>

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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-dark/70 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@studio.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone/5 border border-stone/20 text-stone focus:outline-none focus:border-fresh-red"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-dark/70 uppercase mb-1">
                      Enquiry Purpose
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone/5 border border-stone/20 text-stone focus:outline-none focus:border-fresh-red"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="project">Architect / Project Specification</option>
                      <option value="tile">Tile Sample Requisition</option>
                      <option value="dealer">Dealership Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-dark/70 uppercase mb-1">
                    District / Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gulshan, Dhaka / Agrabad, Chattogram"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone/5 border border-stone/20 text-stone focus:outline-none focus:border-fresh-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-dark/70 uppercase mb-1">
                    Message or Project Specification Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide details about your project square footage, preferred tile finishes, or required delivery timeframe..."
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
                  {submitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
