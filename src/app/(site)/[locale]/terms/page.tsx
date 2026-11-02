import React from 'react'
import Link from 'next/link'
import { ShieldCheck, ArrowLeft, FileText } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isBn = locale === 'bn'

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-stone/15 pb-6 mb-8 flex items-center justify-between">
          <Link
            href={isBn ? '/bn' : '/'}
            className="inline-flex items-center gap-2 text-xs font-mono text-stone hover:text-fresh-red transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isBn ? 'হোমে ফিরে যান' : 'Back to Home'}</span>
          </Link>
          <span className="text-[10px] font-mono text-fresh-red uppercase font-bold bg-fresh-red/10 px-2 py-0.5">
            Terms of Service
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-stone tracking-tight">
            Terms of Service & Warranty Standards
          </h1>
          <p className="text-xs font-mono text-stone-dark/60 mt-2">
            Fresh Ceramics (Meghnaghat, Sonargaon, Narayanganj, Bangladesh)
          </p>
        </div>

        <div className="prose prose-stone max-w-none space-y-6 text-xs sm:text-sm leading-relaxed text-stone-dark/90">
          <div className="bg-mist/70 p-6 border-l-4 border-fresh-red">
            <h3 className="font-display font-bold text-stone text-base mb-2">
              98% A-Grade Export Quality & 14 Factory Tests
            </h3>
            <p>
              Every carton of Fresh Ceramics tiles delivered from our Meghnaghat plant or authorized showrooms conforms to rigorous international standards (ISO 13006 / BDS EN 14411) and undergoes 14 dedicated global standard tests before dispatch.
            </p>
          </div>

          <h3 className="font-display font-bold text-stone text-base">
            1. Ultra Fine Squaring & Calibre Guarantees
          </h3>
          <p>
            All rectified wall and floor tiles are manufactured using Ultra Fine Squaring Technology to ensure strict orthogonal tolerances and zero corner deviation. Minor nominal shade variances between different manufacturing batches are managed by our sorting team. For monolithic consistency, always ensure all cartons for a single contiguous area originate from the same production lot.
          </p>

          <h3 className="font-display font-bold text-stone text-base">
            2. 4-Day Nationwide Showroom Delivery
          </h3>
          <p>
            Standard delivery across Bangladesh is scheduled within 4 days from authorized and exclusive dealer showrooms upon stock availability. Unloading and on-site handling must preserve the reinforced corner caps and poly wrap until setting.
          </p>

          <h3 className="font-display font-bold text-stone text-base">
            3. Intellectual Property & Brand Usage
          </h3>
          <p>
            The Fresh Ceramics combination mark, reverse logo, product photography, digital surface patterns, and narrative media are the exclusive intellectual property of Fresh Ceramics. Reproduction without prior written consent is strictly prohibited.
          </p>

          <h3 className="font-display font-bold text-stone text-base">
            4. Hotline & Claims Support
          </h3>
          <p>
            For product inquiries, technical specification consultations, or customer support, please contact our dedicated national hotline at <strong className="text-fresh-red">16595</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
