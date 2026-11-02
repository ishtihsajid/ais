import React from 'react'
import Link from 'next/link'
import { Sparkles, Eye, Compass, ArrowRight, Store, MessageSquare } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function VisualizerPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isBn = locale === 'bn'

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16 flex items-center">
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full text-center">
        {/* Visualizer Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-fresh-red/10 border border-fresh-red/20 text-fresh-red text-xs font-mono uppercase tracking-widest font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Architectural Studio • Coming Soon</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-light text-stone tracking-tight">
          Virtual Room <span className="font-semibold text-stone">Visualizer</span>
        </h1>

        <p className="text-sm sm:text-base text-stone-dark/80 mt-4 max-w-2xl mx-auto font-light leading-relaxed">
          {isBn
            ? 'আপনার নিজের ঘরে ফ্রেশ টাইলসের বিভিন্ন সাইজ ও ফিনিশ ভার্চুয়ালি ট্রাই করার জন্য আধুনিক অগমেন্টেড ভিজ্যুয়ালাইজার তৈরি হচ্ছে।'
            : 'We are engineering an ultra-responsive 3D surface visualizer. Soon, you will be able to upload your living room, bathroom, kitchen or commercial facade and test all 385 Fresh Ceramics designs with true raking lighting and zero-gap alignment.'}
        </p>

        {/* Feature Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 text-left">
          <div className="bg-white border border-stone/15 p-6 shadow-sm">
            <span className="text-[10px] font-mono text-fresh-red uppercase font-bold">Feature 01</span>
            <h3 className="text-base font-display font-bold text-stone mt-1">
              Custom Room Mapping
            </h3>
            <p className="text-xs text-stone-dark/70 mt-2 leading-relaxed">
              Upload smartphone photos and automatically detect floor and wall planes with perspective correction.
            </p>
          </div>

          <div className="bg-white border border-stone/15 p-6 shadow-sm">
            <span className="text-[10px] font-mono text-stone uppercase font-bold">Feature 02</span>
            <h3 className="text-base font-display font-bold text-stone mt-1">
              Tactile Grout & Angle Controls
            </h3>
            <p className="text-xs text-stone-dark/70 mt-2 leading-relaxed">
              Adjust joint width down to 1 mm (Ultra Fine Squaring) and switch between 0°, 45° diagonal, and herringbone lay patterns.
            </p>
          </div>

          <div className="bg-white border border-stone/15 p-6 shadow-sm">
            <span className="text-[10px] font-mono text-fresh-red uppercase font-bold">Feature 03</span>
            <h3 className="text-base font-display font-bold text-stone mt-1">
              Instant BOQ Generation
            </h3>
            <p className="text-xs text-stone-dark/70 mt-2 leading-relaxed">
              Calculate exact carton quantities, dead-load estimates, and send the spec sheet directly to your nearest showroom.
            </p>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/tiles"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-md"
          >
            <Compass className="w-4 h-4" />
            <span>Browse 385 Tile Designs</span>
          </Link>

          <Link
            href="/showrooms"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-stone hover:bg-stone-dark text-paper text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Store className="w-4 h-4" />
            <span>Visit Physical Display Centre</span>
          </Link>

          <Link
            href="/contact?type=visualizer-notification"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-stone/20 hover:border-fresh-red text-stone text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Notify Me on Launch</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
