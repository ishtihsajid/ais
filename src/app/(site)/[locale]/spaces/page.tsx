import React from 'react'
import Link from 'next/link'
import { ArrowRight, Home, Sparkles } from 'lucide-react'

export const dynamic = 'force-dynamic'

const SPACES = [
  {
    slug: 'living-room',
    nameEn: 'Architectural Living Spaces',
    nameBn: 'লিভিং রুম ও লাউঞ্জ',
    descriptionEn: 'Expansive porcelain plains combining Double Charge longevity with refined marble veining.',
    descriptionBn: 'উন্মুক্ত লিভিং রুমে ডাবল চার্জ চীনামাটির আভিজাত্য ও স্থায়িত্ব।',
    count: '14 Designs',
    bg: 'linear-gradient(135deg, #EAE6DF 0%, #D8D2C7 100%)',
  },
  {
    slug: 'bathroom',
    nameEn: 'Master Ensuite & Bathrooms',
    nameBn: 'বাথরুম ও ওয়াশরুম',
    descriptionEn: 'Water-impervious mirror polished walls paired with tactile anti-slip floor ceramics.',
    descriptionBn: 'পানি-অভেদ্য মিরর পলিশড দেয়াল এবং স্লিপ-প্রতিরোধী মেঝে।',
    count: '18 Designs',
    bg: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)',
  },
  {
    slug: 'kitchen',
    nameEn: 'Gourmet Kitchens & Studios',
    nameBn: 'কিচেন ও ডাইনিং',
    descriptionEn: 'Stain-resistant high-density surfaces engineered for culinary heat and daily life.',
    descriptionBn: 'দাগ-প্রতিরোধী ও তাপসহনশীল উচ্চ ঘনত্বের টেকসই সিরামিক সারফেস।',
    count: '12 Designs',
    bg: 'linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 100%)',
  },
  {
    slug: 'commercial',
    nameEn: 'Commercial & High-Footfall Lobbies',
    nameBn: 'বাণিজ্যিক ও কর্পোরেট স্পেস',
    descriptionEn: 'Heavy traffic durability with high modulus of rupture for corporate towers and hospitality.',
    descriptionBn: 'উচ্চ ফুটফল ও ভারী চাপ সহ্য করার সক্ষমতাসম্পন্ন প্রিমিয়াম ফ্লোরিং।',
    count: '24 Designs',
    bg: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)',
  },
  {
    slug: 'outdoor',
    nameEn: 'Exterior Facades & Terraces',
    nameBn: 'বহিরাঙ্গন ও টেরাস',
    descriptionEn: 'Weatherproof UV-stable structured porcelain resistant to thermal expansion and monsoon rain.',
    descriptionBn: 'আবহাওয়া-সহনশীল ও রোদ-বৃষ্টি প্রতিরোধী নান্দনিক এক্সটেরিয়র টাইলস।',
    count: '10 Designs',
    bg: 'linear-gradient(135deg, #D7CCC8 0%, #BCAAA4 100%)',
  },
]

export default async function SpacesPage({
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
            {isBn ? 'আর্কিটেকচারাল স্পেস ডিজাইন' : 'Architectural Spatial Inspiration'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-2 tracking-tight">
            Explore by <span className="font-semibold text-stone">Space</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            Discover curated environments designed with Fresh Ceramics. Each space illustrates optimal lighting, joint alignments, and material palettes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPACES.map((space) => (
            <Link
              key={space.slug}
              href={isBn ? `/bn/spaces/${space.slug}` : `/spaces/${space.slug}`}
              className="group bg-white border border-stone/15 hover:border-fresh-red shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Space Visualization Header */}
              <div
                className="aspect-[16/10] w-full p-6 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.02]"
                style={{ background: space.bg }}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase tracking-widest bg-white/90 text-stone px-2 py-0.5 shadow-sm font-bold">
                    {space.count}
                  </span>
                  <Home className="w-4 h-4 text-stone-dark/60 group-hover:text-fresh-red transition-colors" />
                </div>
                <div className="bg-white/90 backdrop-blur-sm p-3 shadow-sm border-l-2 border-fresh-red">
                  <h3 className="text-lg font-display font-bold text-stone">
                    {isBn ? space.nameBn : space.nameEn}
                  </h3>
                </div>
              </div>

              {/* Space Details */}
              <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                <p className="text-xs sm:text-sm text-stone-dark/80 leading-relaxed font-light">
                  {isBn ? space.descriptionBn : space.descriptionEn}
                </p>

                <div className="pt-4 border-t border-stone/10 flex items-center justify-between text-xs font-display font-semibold uppercase tracking-wider text-stone group-hover:text-fresh-red">
                  <span>{isBn ? 'স্পেস বিস্তারিত দেখুন' : 'Explore Space Tiles'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
