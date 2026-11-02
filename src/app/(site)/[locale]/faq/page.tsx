import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { HelpCircle, ChevronDown, Phone, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

const STATIC_FAQS = [
  {
    category: 'Company & Manufacturing',
    question: 'Where is the Fresh Ceramics manufacturing facility located?',
    answer: 'Our manufacturing plant is located at Meghnaghat, Sonargaon, Narayanganj, Bangladesh. Established in 2021, the automated plant operates under the biggest production shed under a single roof in the country, with an annual capacity of 18.6 million square metres of wall and floor tiles.',
  },
  {
    category: 'Company & Manufacturing',
    question: 'What is Fresh Ceramics market sales position in Bangladesh?',
    answer: 'Fresh Ceramics is the highest selling tiles brand in Bangladesh every year since 2023. Our products achieve 98% A-grade export quality verified across 14 rigorous global standard tests.',
  },
  {
    category: 'Product & Technology',
    question: 'What is Ultra Fine Squaring Technology?',
    answer: 'Ultra Fine Squaring is an automated diamond-rectification process that calibrates all four edges of every tile to strict orthogonal 90-degree angles. This eliminates edge curvature and ensures zero corner gaps when tiles are laid side-by-side.',
  },
  {
    category: 'Product & Technology',
    question: 'What sizes are available in Double Charge porcelain?',
    answer: 'Fresh Ceramics is the first manufacturer in Bangladesh to produce a full line across all three standard Double Charge sizes: 60x60 cm, 80x80 cm, and 60x120 cm. The Double Charge range offers 204 precision designs.',
  },
  {
    category: 'Product & Technology',
    question: 'What are the benefits of Slim Tiles and Heatproof Tiles?',
    answer: 'Slim Tiles deliver a 25% to 29% weight reduction compared to conventional tiles, reducing structural dead load on building beams and simplifying renovations over existing surfaces. Heatproof Tiles deliver up to 30% energy cost savings through a year-round thermal barrier aligned with UN SDG 11.',
  },
  {
    category: 'Orders & Showrooms',
    question: 'How fast is delivery upon ordering?',
    answer: 'Fresh Ceramics guarantees delivery within 4 days from authorised and exclusive dealer showrooms upon stock availability across Bangladesh.',
  },
  {
    category: 'Orders & Showrooms',
    question: 'Where can I see physical tile samples?',
    answer: 'You can visit our 2 flagship display centres (Banani/Gulshan in Dhaka and Agrabad in Chattogram), any of our 79 exclusive showrooms, or over 120 authorised dealers across all divisions.',
  },
  {
    category: 'Craftsmanship & Installation',
    question: 'How can professional tile fitters register with Fresh Ceramics?',
    answer: 'Professional fitters can join our "নান্দনিকতার কারিগর" (Craftsmen of Aesthetics) community through our fitters portal or by contacting our hotline at 16595 for workshop invitations, technical training, and rewards.',
  },
]

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isBn = locale === 'bn'

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header Breadcrumb */}
        <div className="border-b border-stone/15 pb-8 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-fresh-red mb-1">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-stone-dark/70">Support</span>
          </div>
          <span className="text-xs font-display font-bold uppercase tracking-wider text-fresh-red block">
            {isBn ? 'সাধারণ প্রশ্নোত্তর' : 'Frequently Asked Questions'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-1 tracking-tight">
            Questions & <span className="font-semibold text-stone">Answers</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            Everything you need to know about Fresh Ceramics manufacturing standards, sizes, finishes, showroom delivery and architectural specifications.
          </p>
        </div>

        {/* FAQs Accordion / List */}
        <div className="space-y-4 mb-12">
          {STATIC_FAQS.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group bg-white border border-stone/15 p-6 transition-all duration-200 open:border-fresh-red open:shadow-sm"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none font-display font-bold text-base sm:text-lg text-stone group-hover:text-fresh-red transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-fresh-red font-bold">
                    Q{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <span>{faq.question}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-stone-dark/60 transition-transform duration-200 group-open:rotate-180 group-open:text-fresh-red shrink-0 ml-4" />
              </summary>
              <div className="mt-4 pt-4 border-t border-stone/10 text-xs sm:text-sm text-stone-dark/80 leading-relaxed font-light">
                <p>{faq.answer}</p>
                <span className="inline-block mt-3 text-[10px] font-mono text-stone-dark/50 uppercase">
                  Category: {faq.category}
                </span>
              </div>
            </details>
          ))}
        </div>

        {/* Still Have Questions Card */}
        <div className="bg-stone text-paper p-8 border border-stone-dark shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-display font-bold text-white">
              Still have questions or need custom project advice?
            </h4>
            <p className="text-xs text-grey mt-1">
              Call our official hotline 16595 or talk directly with our customer concierge on WhatsApp.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:16595"
              className="inline-flex items-center gap-2 px-5 py-3 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Hotline 16595</span>
            </a>
            <a
              href="https://wa.me/8801700112233"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
