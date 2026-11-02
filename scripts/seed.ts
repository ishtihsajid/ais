import { getPayload } from 'payload'
import config from '../src/payload.config'
import dotenv from 'dotenv'
import ExcelJS from 'exceljs'
import path from 'path'
import fs from 'fs'

dotenv.config()

async function seed() {
  console.log('Seeding comprehensive data for Fresh Ceramics...')

  const payload = await getPayload({ config })

  // 1. Users
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@freshceramics.net'
  const adminPassword = process.env.ADMIN_PASSWORD || 'freshceramics2026!'

  const existingAdmin = await payload.find({
    collection: 'users',
    where: { email: { equals: adminEmail } },
  })

  if (existingAdmin.totalDocs === 0) {
    console.log(`Creating initial admin user: ${adminEmail}`)
    await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      },
    })
    console.log(`Admin user created. Please change your password in the admin panel.`)
  }

  const editorEmail = 'editor@freshceramics.net'
  const existingEditor = await payload.find({
    collection: 'users',
    where: { email: { equals: editorEmail } },
  })
  if (existingEditor.totalDocs === 0) {
    console.log(`Creating editor user: ${editorEmail}`)
    await payload.create({
      collection: 'users',
      data: {
        email: editorEmail,
        password: adminPassword,
        role: 'editor',
      },
    })
  }

  // 2. Finishes
  const finishesData = [
    // Floor
    { name: 'Double Charge', slug: 'double-charge', category: 'floor', order: 1, description: 'Dual layer porcelain body engineered with heavy-duty pressed granules for high-traffic longevity and deep luminous surface.' },
    { name: 'Mirror Polished', slug: 'mirror-polished', category: 'floor', order: 2, description: 'Diamond nano-polished glazed porcelain surface delivering glass-like 95+ gloss reflection and optical clarity.' },
    { name: 'Matt', slug: 'matt', category: 'both', order: 3, description: 'Micro-textured tactile matte finish engineered for natural warmth, anti-slip resistance and subtle haptic visual weight.' },
    { name: 'Zainamaj', slug: 'zainamaj', category: 'floor', order: 4, description: 'Specialized sacred prayer mat motif tiles crafted with acoustic dampening and ergonomic surface comfort.' },
    { name: 'Digital Porcelain', slug: 'digital-porcelain', category: 'floor', order: 5, description: 'High-definition digital printed vitrified porcelain body offering hyper-realistic architectural stone and marble veining.' },
    { name: 'High Gloss', slug: 'high-gloss', category: 'floor', order: 6, description: 'Ultra-reflective crystalline glaze imparting dramatic light transmission to contemporary residential spaces.' },
    // Wall
    { name: 'Mattestic', slug: 'mattestic', category: 'wall', order: 7, description: 'Velvety architectural wall ceramic featuring understated eggshell sheen and soft light diffusion.' },
    { name: 'DewDrop', slug: 'dewdrop', category: 'wall', order: 8, description: 'Tactile relief glaze mimicking morning condensation droplets with refractive visual depth.' },
    { name: 'Glossy', slug: 'glossy', category: 'wall', order: 9, description: 'Classic radiant wall glaze offering exceptional washability and hygienic stain resistance.' },
    { name: 'Rustic', slug: 'rustic', category: 'wall', order: 10, description: 'Artisanal coarse ceramic texture recalling organic terracotta and chiseled stone masonry.' },
    { name: 'Candy', slug: 'candy', category: 'wall', order: 11, description: 'Vibrant chromatic vitreous glaze with playful translucent luster for dynamic feature walls.' },
    { name: 'Glossy Punch', slug: 'glossy-punch', category: 'wall', order: 12, description: '3D punch textured wall tile combining sculpted physical relief with brilliant glossy finish.' },
  ]

  const finishMap: Record<string, string | number> = {}
  for (const f of finishesData) {
    const existing = await payload.find({
      collection: 'finishes',
      where: { slug: { equals: f.slug } },
    })
    if (existing.totalDocs > 0) {
      finishMap[f.name] = existing.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'finishes',
        data: f as any,
      })
      finishMap[f.name] = created.id
    }
  }

  // 3. Sizes
  const sizesData = [
    // Floor: width x height
    { category: 'floor', widthCm: 60, heightCm: 120, label: '60(W) x 120(H) cm', slug: '60x120' },
    { category: 'floor', widthCm: 80, heightCm: 80, label: '80(W) x 80(H) cm', slug: '80x80' },
    { category: 'floor', widthCm: 60, heightCm: 60, label: '60(W) x 60(H) cm', slug: '60x60' },
    { category: 'floor', widthCm: 40, heightCm: 40, label: '40(W) x 40(H) cm', slug: '40x40' },
    { category: 'floor', widthCm: 30, heightCm: 30, label: '30(W) x 30(H) cm', slug: '30x30' },
    { category: 'floor', widthCm: 20, heightCm: 120, label: '20(W) x 120(H) cm', slug: '20x120' },
    // Wall: height x width
    { category: 'wall', widthCm: 60, heightCm: 30, label: '30(H) x 60(W) cm', slug: '30x60' },
    { category: 'wall', widthCm: 50, heightCm: 30, label: '30(H) x 50(W) cm', slug: '30x50' },
    { category: 'wall', widthCm: 45, heightCm: 30, label: '30(H) x 45(W) cm', slug: '30x45' },
    { category: 'wall', widthCm: 40, heightCm: 25, label: '25(H) x 40(W) cm', slug: '25x40' },
    { category: 'wall', widthCm: 30, heightCm: 20, label: '20(H) x 30(W) cm', slug: '20x30' },
  ]

  const sizeMap: Record<string, string | number> = {}
  for (const s of sizesData) {
    const existing = await payload.find({
      collection: 'sizes',
      where: { slug: { equals: s.slug } },
    })
    if (existing.totalDocs > 0) {
      sizeMap[s.slug] = existing.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'sizes',
        data: s as any,
      })
      sizeMap[s.slug] = created.id
    }
  }

  // 4. Series
  const seriesData = [
    { name: 'Royal Onyx Series', slug: 'royal-onyx', description: 'Translucent cloud veining and gemological depth for luxury living and master suites.' },
    { name: 'Grand Statuario Series', slug: 'grand-statuario', description: 'Dramatic grey-gold linear veining over pure white porcelain inspired by Italian Apuan marble.' },
    { name: 'Terrazzo Naturale', slug: 'terrazzo-naturale', description: 'Contemporary speckled aggregates composed of river stone pigments in warm earth tones.' },
    { name: 'Urban Cement Series', slug: 'urban-cement', description: 'Minimalist industrial polished concrete aesthetic for contemporary architectural spaces.' },
    { name: 'Timber Craft Series', slug: 'timber-craft', description: 'Photorealistic hardwood grain planks with authentic tactile bark ridges in 20x120 format.' },
  ]

  const seriesMap: Record<string, string | number> = {}
  for (const s of seriesData) {
    const existing = await payload.find({
      collection: 'series',
      where: { slug: { equals: s.slug } },
    })
    if (existing.totalDocs > 0) {
      seriesMap[s.slug] = existing.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'series',
        data: s as any,
      })
      seriesMap[s.slug] = created.id
    }
  }

  // 5. Spaces
  const spacesData = [
    { name: 'Living Room', slug: 'living-room', order: 1, description: 'Expansive grand formats and light-amplifying surfaces for gracious hosting.' },
    { name: 'Bathroom', slug: 'bathroom', order: 2, description: 'Serene spa-like moisture-resistant surfaces with anti-slip footing and elegant wall punches.' },
    { name: 'Kitchen', slug: 'kitchen', order: 3, description: 'Stain-resistant hygienic vitrified slabs that shrug off oil splatters and heat.' },
    { name: 'Commercial & Lobby', slug: 'commercial', order: 4, description: 'Ultra-durable Double Charge formulations built for heavy daily pedestrian traffic.' },
    { name: 'Outdoor & Terrace', slug: 'outdoor', order: 5, description: 'All-weather low-porosity tiles with elevated slip resistance and thermal resilience.' },
  ]

  const spaceMap: Record<string, string | number> = {}
  for (const sp of spacesData) {
    const existing = await payload.find({
      collection: 'spaces',
      where: { slug: { equals: sp.slug } },
    })
    if (existing.totalDocs > 0) {
      spaceMap[sp.slug] = existing.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'spaces',
        data: sp as any,
      })
      spaceMap[sp.slug] = created.id
    }
  }

  // 6. Claims
  const claimsData = [
    {
      key: 'sales_leadership',
      enText: 'Highest selling tiles brand in Bangladesh every year since 2023.',
      bnText: '২০২৩ সাল থেকে প্রতি বছর বাংলাদেশে সর্বাধিক বিক্রিত টাইলস ব্র্যান্ড।',
      asOfDate: '2026',
      internalSourceNote: 'Confirmed by owner per Section 3.1 of BUILD_PLAN.md',
    },
    {
      key: 'double_charge_first',
      enText: 'First manufacturer in Bangladesh to produce a full line or all three sizes of Double Charge tiles: 60x60, 80x80 and 60x120 cm.',
      bnText: 'বাংলাদেশে প্রথম প্রস্তুতকারক যারা ডাবল চার্জ টাইলসের তিনটি সাইজের পূর্ণাঙ্গ লাইন তৈরি করে: ৬০x৬০, ৮০x৮০ এবং ৬০x১২০ সেমি।',
      asOfDate: '2026',
      internalSourceNote: 'Factory production benchmark per Section 3.1',
    },
    {
      key: 'annual_production',
      enText: '18.6 million square metres of wall and floor tiles.',
      bnText: 'প্রতি বছর ১ কোটি ৮৬ লাখ বর্গমিটার দেয়াল ও মেঝের টাইলস উৎপাদন ক্ষমতা।',
      asOfDate: '2026',
      internalSourceNote: 'Plant operational output',
    },
    {
      key: 'quality_tests',
      enText: '14 global standard tests in the factory.',
      bnText: 'কারখানায় ১৪টি আন্তর্জাতিক মানসম্পন্ন মান নিয়ন্ত্রণ পরীক্ষা।',
      asOfDate: '2026',
      internalSourceNote: 'QC laboratory protocol',
    },
    {
      key: 'export_grade',
      enText: '98% A grade export quality.',
      bnText: '৯৮% এ গ্রেড রপ্তানি মান।',
      asOfDate: '2026',
      internalSourceNote: 'Automated optical sorting output',
    },
    {
      key: 'squaring_tech',
      enText: 'Ultra Fine Squaring Technology so no corner gaps.',
      bnText: 'আল্ট্রা ফাইন স্কয়ারিং প্রযুক্তি যার ফলে কোণায় কোণায় নিখুঁত মিলন।',
      asOfDate: '2026',
      internalSourceNote: 'Rectification line specs',
    },
    {
      key: 'delivery_commitment',
      enText: 'Delivery within 4 days from authorised and exclusive dealer showrooms.',
      bnText: 'অনুমোদিত ও এক্সক্লুসিভ ডিলার শোরুম থেকে ৪ দিনের মধ্যে ডেলিভারি।',
      asOfDate: '2026',
      internalSourceNote: 'Logistics SLA (upon stock availability)',
    },
  ]

  for (const c of claimsData) {
    const existing = await payload.find({
      collection: 'claims',
      where: { key: { equals: c.key } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'claims',
        data: c as any,
      })
    }
  }

  // 7. Globals: SiteSettings & Stats
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      hotline: '16595',
      email: 'info@freshceramics.net',
      factoryLocation: 'Meghnaghat, Sonargaon, Narayanganj, Bangladesh',
      headOffice: 'Fresh Villa, House 12, Road 11, Block G, Banani, Dhaka, Bangladesh',
      legalEntityLine: 'Fresh Ceramics is a brand of Meghna Ceramic Industries Ltd.',
      wasteAllowancePct: 10,
      carEquivalentKg: 1330,
      featureVisualizer: false,
      socialLinks: [
        { platform: 'Facebook', url: 'https://facebook.com/freshceramics' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/company/fresh-ceramics' },
        { platform: 'Instagram', url: 'https://instagram.com/freshceramicsbd' },
      ],
    } as any,
  })

  await payload.updateGlobal({
    slug: 'stats',
    data: {
      exclusiveShowrooms: 79,
      flagshipCentres: 2,
      authorisedDealers: 120,
      floorDesignCount: 204,
      wallDesignCount: 181,
      totalDesignCount: 385,
      annualProductionM2: '18.6 million',
      establishedYear: 2021,
      globalStandardTests: 14,
      exportQualityGradePct: 98,
    } as any,
  })

  // 8. Import Showrooms from Excel
  const showroomExcelPath = path.resolve('Fresh-Ceramics-Assets/data/Showroom Address .xlsx')
  if (fs.existsSync(showroomExcelPath)) {
    console.log('Reading real showroom records from Showroom Address .xlsx...')
    const wb = new ExcelJS.Workbook()
    await wb.xlsx.readFile(showroomExcelPath)
    const ws = wb.worksheets[0]

    let importedShowrooms = 0
    let currentTier: 'flagship' | 'exclusive' | 'dealer' = 'flagship'

    for (let r = 1; r <= ws.rowCount; r++) {
      const row = ws.getRow(r)
      const slText = row.getCell(1).text?.trim()
      const divisionText = row.getCell(2).text?.trim()
      const areaText = row.getCell(3).text?.trim()
      const nameText = row.getCell(4).text?.trim()
      const addressText = row.getCell(5).text?.trim()
      const mapCell = row.getCell(6)

      if (slText?.includes('Exclusive') || divisionText?.includes('Exclusive')) {
        currentTier = 'exclusive'
        continue
      }
      if (slText?.includes('Own Operated') || divisionText?.includes('Own Operated')) {
        currentTier = 'flagship'
        continue
      }
      if (!slText || slText === 'SL' || isNaN(Number(slText))) {
        continue
      }

      const slNum = Number(slText)
      const division = divisionText || 'Dhaka'
      const area = areaText || ''
      const name = currentTier === 'flagship' 
        ? `Fresh Ceramics House of Aesthetics (${area.split(',')[0].trim()})`
        : nameText || `Fresh Ceramics Exclusive Showroom (${area})`
      const address = addressText || area

      let mapLink = ''
      if (typeof mapCell.value === 'object' && mapCell.value !== null && 'hyperlink' in mapCell.value) {
        mapLink = (mapCell.value as any).hyperlink
      } else if (mapCell.text && !mapCell.text.includes('#N/A') && !mapCell.text.includes('N/A')) {
        mapLink = mapCell.text.trim()
      }

      // Check if showroom already exists
      const existing = await payload.find({
        collection: 'showrooms',
        where: { name: { equals: name } },
      })

      if (existing.totalDocs === 0) {
        const divisionCoords: Record<string, { lat: number; lng: number }> = {
          Dhaka: { lat: 23.8103, lng: 90.4125 },
          Chattogram: { lat: 22.3569, lng: 91.7832 },
          Sylhet: { lat: 24.8949, lng: 91.8687 },
          Rajshahi: { lat: 24.3636, lng: 88.6241 },
          Khulna: { lat: 22.8456, lng: 89.5403 },
          Barisal: { lat: 22.7010, lng: 90.3535 },
          Barishal: { lat: 22.7010, lng: 90.3535 },
          Rangpur: { lat: 25.7439, lng: 89.2752 },
          Mymensingh: { lat: 24.7471, lng: 90.4203 },
        }
        const base = divisionCoords[division] || divisionCoords.Dhaka
        const lat = base.lat + ((slNum % 10) - 5) * 0.03
        const lng = base.lng + (((slNum * 3) % 10) - 5) * 0.03

        await payload.create({
          collection: 'showrooms',
          data: {
            name,
            tier: currentTier,
            division: division === 'Barisal' ? 'Barishal' : division,
            district: area.split(',')[1]?.trim() || area.split(' ')[0] || division,
            thana: area.split(',')[0]?.trim() || area,
            address,
            phone: '16595',
            hours: 'Sat - Thu: 9:00 AM - 8:00 PM',
            latitude: Number(lat.toFixed(6)),
            longitude: Number(lng.toFixed(6)),
            mapLink: mapLink || undefined,
            placeholder: false,
          } as any,
        })
        importedShowrooms++
      }
    }
    console.log(`Seeded/verified ${importedShowrooms} real showrooms from excel.`)
  }

  // 9. Voices
  const voicesData = [
    {
      name: 'Master Craftsman Kabir Hossain',
      role: 'fitter',
      location: 'Dhanmondi, Dhaka',
      quote: 'আল্ট্রা ফাইন স্কয়ারিং প্রযুক্তির কারণে ফ্রেশ সিরামিকসের প্রতিটি কোণ নিখুঁতভাবে মিলে যায়। দীর্ঘ ২৫ বছরের অভিজ্ঞতায় এই মসৃণতা সত্যিই অতুলনীয়।',
      sample: true,
    },
    {
      name: 'Architect Samira Rahman',
      role: 'designer',
      location: 'Gulshan, Dhaka',
      quote: 'For contemporary luxury residences, the 60x120 Double Charge series provides unparalleled haptic elegance, structural stability and authentic stone depth.',
      sample: true,
    },
    {
      name: 'Anwarul Karim',
      role: 'dealer',
      location: 'Anderkilla, Chattogram',
      quote: 'The 4-day delivery commitment from the Meghnaghat plant has transformed customer trust across our dealership network.',
      sample: true,
    },
  ]
  for (const v of voicesData) {
    const existing = await payload.find({
      collection: 'voices',
      where: { name: { equals: v.name } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'voices', data: v as any })
    }
  }

  // 10. Initiatives
  const initiativesData = [
    {
      title: 'Craftsmen of Aesthetics (নান্দনিকতার কারিগর)',
      slug: 'craftsmen-of-aesthetics',
      year: '2024 - 2026',
      category: 'people',
      summary: 'Nationwide empowerment, safety workshops and advanced installation certification for Bangladesh tile fitters.',
      story: 'Empowering over 12,000 professional tile fitters across all 64 districts with modern leveling tools, ergonomic safety training and craftsmanship awards.',
      sample: true,
    },
    {
      title: 'Green Kiln & Surface Water Initiative',
      slug: 'surface-water-initiative',
      year: '2023 - Ongoing',
      category: 'environment',
      summary: '100% surface water recycling and zero black smoke emission at the Meghnaghat manufacturing plant.',
      story: 'Our state-of-the-art closed-loop water treatment recycling facility prevents groundwater depletion and purifies process water to pristine standards.',
      sample: true,
    },
    {
      title: 'Architectural Knowledge & Specification Series',
      slug: 'knowledge-series',
      year: '2025 - 2026',
      category: 'learning',
      summary: 'Technical design masterclasses covering large-format slab handling, acoustic tile layouts and seismic load reduction.',
      story: 'Collaborating with leading architectural faculties and practicing interior architects to elevate material understanding and sustainable specifications.',
      sample: true,
    },
  ]
  for (const init of initiativesData) {
    const existing = await payload.find({
      collection: 'initiatives',
      where: { slug: { equals: init.slug } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'initiatives', data: init as any })
    }
  }

  // 11. Catalogs
  const defaultCatalogs = [
    {
      title: 'Fresh Ceramics Master Product Catalogue 2026',
      pages: 148,
      filesizeMb: 14.8,
      date: 'January 2026',
      isHidden: false,
      downloadCount: 1420,
    },
    {
      title: 'Double Charge Architectural Specification Sheet',
      pages: 32,
      filesizeMb: 4.2,
      date: 'February 2026',
      isHidden: false,
      downloadCount: 890,
    },
    {
      title: 'Porcelain Slim Tiles Technical Brochure',
      pages: 24,
      filesizeMb: 6.1,
      date: 'March 2026',
      isHidden: false,
      downloadCount: 654,
    },
    {
      title: 'Dealer & Fitter Technical Installation Handbook',
      pages: 48,
      filesizeMb: 8.5,
      date: 'April 2026',
      isHidden: false,
      downloadCount: 512,
    },
  ]
  for (const cat of defaultCatalogs) {
    const existing = await payload.find({
      collection: 'catalogs',
      where: { title: { equals: cat.title } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'catalogs', data: cat as any })
    }
  }

  // 12. Articles
  const defaultArticles = [
    {
      title: 'The Art of Double Charge Vitrification: Engineering Megastructures',
      slug: 'art-of-double-charge-vitrification',
      kind: 'guide',
      summary: 'How dual-layer hydraulic compression at 1250°C creates Bangladesh’s highest load-bearing commercial surface.',
      date: '2026-01-15',
    },
    {
      title: 'Thermal Insulation & Urban Rooftop Cooling with Fresh Heatproof Tiles',
      slug: 'thermal-insulation-heatproof-tiles',
      kind: 'guide',
      summary: 'Sub-surface heat rejection reduces interior AC consumption by up to 28% across tropical climates.',
      date: '2026-02-10',
    },
    {
      title: 'Zero-Gap Rectification: The Science Behind Ultra Fine Squaring',
      slug: 'zero-gap-rectification-science',
      kind: 'news',
      summary: 'Diamond calibrated squaring lines deliver perfect 90° edges for seamless monolithic room continuity.',
      date: '2026-03-01',
    },
  ]
  for (const art of defaultArticles) {
    const existing = await payload.find({
      collection: 'articles',
      where: { slug: { equals: art.slug } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'articles', data: art as any })
    }
  }

  // 13. Dynamic Pages with Section Block Builder
  const defaultPages = [
    {
      title: 'Home Showcase',
      slug: 'home',
      status: 'published',
      meta: {
        metaTitle: 'Fresh Ceramics | A Fresh Start to an Aesthetic Life',
        metaDescription: 'Highest selling tiles brand in Bangladesh every year since 2023.',
      },
      sections: [
        {
          blockType: 'heroScene',
          badge: 'MEGHNAGHAT, FIRST LIGHT',
          headline: 'A Fresh Start to an Aesthetic Life',
          subtext: 'Every surface in a home begins somewhere. Ours begins with sunlight on a rooftop in Meghnaghat.',
          primaryCtaText: 'Explore Journey',
          primaryCtaLink: '#journey',
          secondaryCtaText: 'View Catalogue',
          secondaryCtaLink: '/tiles',
          isHidden: false,
        },
        {
          blockType: 'statsBanner',
          metric1Value: 'Since 2021',
          metric1Label: 'TILE PLANT ESTABLISHED',
          metric2Value: '18.6M sq m a year',
          metric2Label: 'ANNUAL PRODUCTION CAPACITY',
          metric3Value: 'Market Sales Leadership',
          metric3Label: 'Highest selling tiles brand in Bangladesh every year since 2023.',
          isHidden: false,
        },
        {
          blockType: 'tileGridShowcase',
          heading: 'Signature Architectural Collections',
          subheading: 'Precision engineered porcelain for living spaces, commercial lobbies, and serene sanctuaries.',
          filterCategory: 'all',
          limit: 12,
          isHidden: false,
        },
        {
          blockType: 'showroomNetwork',
          heading: 'Find a Showroom Near You',
          subheading: 'Over 81 exclusive showrooms and authorised dealers across 8 divisions in Bangladesh.',
          isHidden: false,
        },
      ],
    },
    {
      title: 'Quality & Technology',
      slug: 'quality-and-technology',
      status: 'published',
      meta: {
        metaTitle: '14 Global Standard Quality Tests | Fresh Ceramics',
        metaDescription: 'State-of-the-art Italian SACMI machinery and robotic glazing lines at Meghnaghat.',
      },
      sections: [
        {
          blockType: 'richTextSection',
          heading: 'Pioneering Ceramic Precision in Bangladesh',
          body: 'From automated clay slurry filtration to laser-measured edge rectification, every tile is subjected to 14 rigorous international durability and water absorption benchmarks.',
          isHidden: false,
        },
      ],
    },
  ]
  for (const page of defaultPages) {
    const existing = await payload.find({
      collection: 'pages' as any,
      where: { slug: { equals: page.slug } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'pages' as any, data: page as any })
    }
  }

  console.log('Seed completed successfully.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
