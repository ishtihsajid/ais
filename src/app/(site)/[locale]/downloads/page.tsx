import React from 'react'
import Link from 'next/link'
import { Download, FileText, ArrowRight, ShieldCheck } from 'lucide-react'

const CATALOGS = [
  {
    id: 'master-2026',
    titleEn: 'Fresh Ceramics Master Architectural Catalogue 2026',
    titleBn: 'ফ্রেশ সিরামিকস মাস্টার ক্যাটালগ ২০২৬',
    descriptionEn: 'Complete collection guide including Double Charge, Mirror Polished, Matt, and Wall series.',
    descriptionBn: 'সকল অনন্য ডিজাইনের পূর্ণাঙ্গ ক্যাটালগ ও আর্কিটেকচারাল স্পেসিফিকেশন গাইড।',
    fileSize: '265 MB',
    pages: 'Full Catalogue',
    date: '2026 Edition',
    version: 'Official Master',
    category: 'Product Catalogue',
    fileUrl: '/catalogue/FRESH%20CERAMICS%202026.pdf',
    fileName: 'FRESH CERAMICS 2026.pdf',
  },
  {
    id: 'sanitaryware-leaflet',
    titleEn: 'Fresh Sanitaryware Leaflet Catalogue',
    titleBn: 'ফ্রেশ স্যানিটারিওয়্যার লিফলেট ক্যাটালগ',
    descriptionEn: 'Official luxury sanitaryware collection catalogue, water-saving technology and specifications.',
    descriptionBn: 'প্রিমিয়াম স্যানিটারিওয়্যার সংগ্রহ, ওয়াটার সেভিং প্রযুক্তি ও স্পেসিফিকেশন গাইড।',
    fileSize: '155 MB',
    pages: 'Leaflet Edition',
    date: '2026 Edition',
    version: 'Official Leaflet',
    category: 'Sanitaryware Catalogue',
    fileUrl: '/catalogue/Fresh%20Sanitaryware%20Leaflet%20Catalogue.pdf',
    fileName: 'Fresh Sanitaryware Leaflet Catalogue.pdf',
  },
  {
    id: 'brand-profile',
    titleEn: 'Fresh Ceramics Company & Brand Profile',
    titleBn: 'ফ্রেশ সিরামিকস কোম্পানি ও ব্র্যান্ড প্রোফাইল',
    descriptionEn: 'Meghnaghat plant infrastructure, eco-manufacturing standards, and corporate capabilities overview.',
    descriptionBn: 'মেঘনাঘাট প্ল্যান্ট, পরিবেশবান্ধব উৎপাদন প্রক্রিয়া এবং প্রাতিষ্ঠানিক পরিচিতি।',
    fileSize: '7.5 MB',
    pages: 'Corporate Profile',
    date: '2026 Edition',
    version: 'Corporate 2026',
    category: 'Corporate Overview',
    fileUrl: '/catalogue/Company%20&%20Brand_Profile%20Fresh%20Ceramics.pdf',
    fileName: 'Company & Brand_Profile Fresh Ceramics.pdf',
  },
]

export default async function DownloadsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isBn = locale === 'bn'

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-b border-stone/15 pb-8 mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-fresh-red">
            {isBn ? 'ডাউনলোড ও ব্রোশিউর' : 'Brochures & Technical Literature'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-2 tracking-tight">
            Downloads & <span className="font-semibold text-stone">Catalogs</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            Download our latest high-resolution product catalogs, structural specifier guides, and technical test summaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATALOGS.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-stone/15 p-8 shadow-sm flex flex-col justify-between gap-6 hover:border-fresh-red transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-fresh-red font-bold bg-fresh-red/10 px-2 py-0.5">
                    {cat.category}
                  </span>
                  <span className="text-xs font-mono text-stone-dark/60">
                    {cat.date}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-stone">
                  {isBn ? cat.titleBn : cat.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-stone-dark/70 mt-2 leading-relaxed">
                  {isBn ? cat.descriptionBn : cat.descriptionEn}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-stone-dark/80">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-fresh-red" />
                    PDF format
                  </span>
                  <span>{cat.fileSize}</span>
                  <span>{cat.pages}</span>
                  <span className="text-stone font-semibold">{cat.version}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone/10 flex items-center justify-between">
                <a
                  href={cat.fileUrl}
                  download={cat.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>{isBn ? 'পিডিএফ ডাউনলোড' : 'Download PDF'}</span>
                </a>

                <span className="text-[11px] font-mono text-stone-dark/50">
                  Self-hosted PDF
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
