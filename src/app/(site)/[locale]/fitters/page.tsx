import React from 'react'
import Link from 'next/link'
import { Hammer, ShieldCheck, Box, Users, Phone, MessageSquare, Check, ArrowRight, Award } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function FittersPage({
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
            <span className="text-stone-dark/70">Community</span>
          </div>
          <span className="text-sm font-display font-semibold tracking-wider text-fresh-red block">
            নান্দনিকতার কারিগর • Craftsmen of Aesthetics
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-1 tracking-tight">
            For Fitters & <span className="font-semibold text-stone">Master Craftsmen</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            {isBn
              ? 'টাইলস কারিগরদের বিশ্বস্ত সহযোগী। নিখুঁত সাইজিং ও কর্নার ক্যাপ প্রটেকশন নিশ্চিত করে প্রতিটি প্রজেক্টে জিরো-গ্যাপ ফিনিশিং।'
              : 'Fitters like our tiles because corners and edges meet seamlessly. Engineered with Ultra Fine Squaring Technology so every joint aligns without frustrating recutting or edge lippage.'}
          </p>
        </div>

        {/* 3 Pillars for Fitters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-stone/15 p-6 sm:p-8 shadow-sm">
            <div className="w-10 h-10 bg-fresh-red/10 text-fresh-red flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-stone">
              Ultra Fine Squaring
            </h3>
            <p className="text-xs text-stone-dark/70 mt-2 leading-relaxed">
              Every tile undergoes precision automated rectification. Orthogonal 90° edges eliminate corner gaps and uneven grouting on floor and wall runs.
            </p>
            <div className="mt-4 pt-3 border-t border-stone/10 text-[10px] font-mono text-fresh-red font-semibold">
              Zero Corner Gaps
            </div>
          </div>

          <div className="bg-white border border-stone/15 p-6 sm:p-8 shadow-sm">
            <div className="w-10 h-10 bg-stone/10 text-stone flex items-center justify-center mb-4">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-stone">
              Corner Caps & Poly Wrap
            </h3>
            <p className="text-xs text-stone-dark/70 mt-2 leading-relaxed">
              Every carton is reinforced with high-impact corner caps and protective moisture-proof poly shrink wrap so tiles arrive intact without site breakage.
            </p>
            <div className="mt-4 pt-3 border-t border-stone/10 text-[10px] font-mono text-stone font-semibold">
              Site Ready Packaging
            </div>
          </div>

          <div className="bg-white border border-stone/15 p-6 sm:p-8 shadow-sm">
            <div className="w-10 h-10 bg-fresh-red/10 text-fresh-red flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-stone">
              Nationwide Fitter Meets
            </h3>
            <p className="text-xs text-stone-dark/70 mt-2 leading-relaxed">
              Regular hands-on skill development workshops, technical tools demonstrations, and community rewards across all 64 districts in Bangladesh.
            </p>
            <div className="mt-4 pt-3 border-t border-stone/10 text-[10px] font-mono text-fresh-red font-semibold">
              64 Districts Active
            </div>
          </div>
        </div>

        {/* Fitter Registration / Join Form */}
        <div className="bg-white border border-stone/15 p-8 md:p-12 shadow-sm mb-12">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-fresh-red font-bold">
                কমিউনিটি রেজিস্ট্রেশন
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone mt-1">
                {isBn ? 'নান্দনিকতার কারিগর ক্লাবে যোগ দিন' : 'Join Nanadnikatar Karigor Community'}
              </h2>
              <p className="text-xs text-stone-dark/70 mt-2">
                Register as an authorized Fresh Ceramics certified tile craftsman for workshop invitations, technical training, and priority project leads.
              </p>
            </div>

            <form
              action="/contact?type=fitter"
              method="GET"
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-display font-semibold uppercase tracking-wider text-stone mb-1">
                  {isBn ? 'আপনার পূর্ণ নাম' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Md. Jahangir Alam"
                  className="w-full py-2.5 px-4 bg-stone/5 border border-stone/20 text-stone text-xs focus:outline-none focus:border-fresh-red"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-display font-semibold uppercase tracking-wider text-stone mb-1">
                    {isBn ? 'মোবাইল নম্বর' : 'Phone Number'} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="017xxxxxxxx"
                    className="w-full py-2.5 px-4 bg-stone/5 border border-stone/20 text-stone text-xs focus:outline-none focus:border-fresh-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-display font-semibold uppercase tracking-wider text-stone mb-1">
                    {isBn ? 'জেলা' : 'District'} *
                  </label>
                  <input
                    type="text"
                    name="district"
                    required
                    placeholder="e.g. Narayanganj / Dhaka"
                    className="w-full py-2.5 px-4 bg-stone/5 border border-stone/20 text-stone text-xs focus:outline-none focus:border-fresh-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-display font-semibold uppercase tracking-wider text-stone mb-1">
                  {isBn ? 'কাজের অভিজ্ঞতা (বছর)' : 'Years of Experience'}
                </label>
                <input
                  type="text"
                  name="experience"
                  placeholder="e.g. 8 years"
                  className="w-full py-2.5 px-4 bg-stone/5 border border-stone/20 text-stone text-xs focus:outline-none focus:border-fresh-red"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>{isBn ? 'নিবন্ধন সম্পন্ন করুন' : 'Submit Fitter Registration'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Fitter Hotline & Direct Support */}
        <div className="bg-stone text-paper p-6 sm:p-8 border border-stone-dark flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h4 className="text-lg font-display font-bold text-white">
              Direct Technical Assistance Hotline
            </h4>
            <p className="text-xs text-grey mt-1">
              Need technical advice on surface subfloor leveling, thin-set mortar or grout widths? Call our Meghnaghat technical team directly.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:16595"
              className="inline-flex items-center gap-2 px-6 py-3 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Hotline 16595</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
