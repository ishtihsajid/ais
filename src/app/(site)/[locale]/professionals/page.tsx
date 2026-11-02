import React from 'react'
import Link from 'next/link'
import { Layers, FileSpreadsheet, Download, Send, Sparkles, Building, Phone, ArrowRight, ShieldCheck } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ProfessionalsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isBn = locale === 'bn'

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header Breadcrumb */}
        <div className="border-b border-stone/15 pb-8 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-fresh-red mb-1">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-stone-dark/70">Architectural Services</span>
          </div>
          <span className="text-xs font-display font-bold uppercase tracking-wider text-fresh-red block">
            Architect & Designer Trade Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-1 tracking-tight">
            Engineering & Aesthetics for <span className="font-semibold text-stone">Specifiers</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            Comprehensive specification support, full-scale architectural sample boards, custom dead-load calculations, and guaranteed batch shade consistency for high-rise commercial and residential projects.
          </p>
        </div>

        {/* 4 Professional Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border border-stone/15 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-fresh-red/10 text-fresh-red flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-stone">
                Sample Requisition
              </h3>
              <p className="text-xs text-stone-dark/70 mt-2 leading-relaxed">
                Direct dispatch of physical tile swatches, finish folios and architectural presentation boxes to your studio within 48 hours.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone/10">
              <Link
                href="/contact?type=samples"
                className="text-xs font-display font-semibold uppercase text-fresh-red hover:underline inline-flex items-center gap-1"
              >
                <span>Request Swatches</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-white border border-stone/15 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-stone/10 text-stone flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-stone">
                CSI 09 30 00 Specs
              </h3>
              <p className="text-xs text-stone-dark/70 mt-2 leading-relaxed">
                Standardized master specifications, CAD details, slip-resistance certifications, and water absorption test schedules ready for tender documentation.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone/10">
              <Link
                href="/downloads"
                className="text-xs font-display font-semibold uppercase text-stone hover:text-fresh-red inline-flex items-center gap-1"
              >
                <span>Browse Documents</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-white border border-stone/15 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-fresh-red/10 text-fresh-red flex items-center justify-center mb-4">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-stone">
                Dead-Load Consulting
              </h3>
              <p className="text-xs text-stone-dark/70 mt-2 leading-relaxed">
                Structural load optimization with Slim Tiles yielding up to 29% dead load reduction for multistory shear walls and beam matrices.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone/10">
              <Link
                href="/slim-tiles"
                className="text-xs font-display font-semibold uppercase text-fresh-red hover:underline inline-flex items-center gap-1"
              >
                <span>Launch Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-white border border-stone/15 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-stone/10 text-stone flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-stone">
                Batch Consistency
              </h3>
              <p className="text-xs text-stone-dark/70 mt-2 leading-relaxed">
                Dedicated factory sort packing guarantees single-firing lot assignment and zero shade variance across large-scale commercial floor plans.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone/10 text-[10px] font-mono text-stone-dark/60 font-semibold">
              98% Grade A Export Quality
            </div>
          </div>
        </div>

        {/* Project Specification Desk Contact */}
        <div className="bg-stone text-paper p-8 md:p-12 border border-stone-dark shadow-md mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-fresh-red font-bold">
              Architectural Project Desk
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              Connect with our Senior Specification Consultant
            </h2>
            <p className="text-xs sm:text-sm text-grey mt-2 leading-relaxed">
              For high-rise residential towers, corporate headquarters, hospitality developments or institutional projects, our Meghnaghat technical team provides direct BOQ analysis and factory delivery coordination.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contact?type=project"
                className="px-6 py-3.5 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Project Brief</span>
              </Link>
              <a
                href="https://wa.me/8801700112233?text=Hello%20Fresh%20Ceramics%20Trade%20Desk,%20I%20am%20an%20architect/designer%20looking%20to%20specify%20materials%20for%20an%20upcoming%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <span>WhatsApp Trade Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
