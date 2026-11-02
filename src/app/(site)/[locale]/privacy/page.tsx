import React from 'react'
import Link from 'next/link'
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PrivacyPage({
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
            Privacy Policy
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-stone tracking-tight">
            Privacy Policy & Data Transparency
          </h1>
          <p className="text-xs font-mono text-stone-dark/60 mt-2">
            Last Updated: 2026 • Fresh Ceramics Data Architecture
          </p>
        </div>

        <div className="prose prose-stone max-w-none space-y-6 text-xs sm:text-sm leading-relaxed text-stone-dark/90">
          <div className="bg-mist/70 p-6 border-l-4 border-fresh-red">
            <h3 className="font-display font-bold text-stone text-base mb-2">
              Zero Third-Party Tracking & Self-Hosted Architecture
            </h3>
            <p>
              Fresh Ceramics respects visitor privacy as a fundamental engineering principle. This website operates strictly without third-party tracking cookies, without external advertising pixels, and without third-party analytics trackers.
            </p>
          </div>

          <h3 className="font-display font-bold text-stone text-base">
            1. What Data We Store Locally on Your Device
          </h3>
          <p>
            When you use our architectural catalogue, your selected shortlisted tile codes are stored locally in your browser storage (HTML5 LocalStorage) under the key <code className="bg-stone/10 px-1.5 py-0.5 font-mono text-xs">fresh_shortlist</code>. This data never leaves your device unless you explicitly choose to submit an enquiry or share your shortlist permalink.
          </p>

          <h3 className="font-display font-bold text-stone text-base">
            2. Customer & Project Enquiries
          </h3>
          <p>
            When you voluntarily submit a project inquiry, showroom contact request, dealer application, or fitter registration, the contact information you provide (such as your name, phone number, email, and project location) is securely stored in our self-hosted database to facilitate sample dispatch and customer service. We do not sell or lease this data.
          </p>

          <h3 className="font-display font-bold text-stone text-base">
            3. Self-Hosted Media & Map Assets
          </h3>
          <p>
            All typography, product imagery, high-resolution deep zoom pyramids, and videos are hosted directly on our servers without external CDN dependencies. When locating showrooms, maps use open tiles and client-side distance calculations.
          </p>

          <h3 className="font-display font-bold text-stone text-base">
            4. Contact
          </h3>
          <p>
            If you have questions regarding our privacy practices or wish to update or delete your enquiry records, please contact our privacy desk through our official hotline at <strong className="text-fresh-red">16595</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
