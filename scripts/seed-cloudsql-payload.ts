// @ts-nocheck
import { getPayload } from 'payload';
import config from '../src/payload.config';
import fs from 'fs';
import path from 'path';

async function seed() {
  console.log('--- Initializing Payload on Cloud SQL PostgreSQL ---');
  const payload = await getPayload({ config });

  // 1. Users
  console.log('Seeding Users...');
  const adminEmail = 'admin@freshceramics.net';
  const adminPassword = 'freshceramics2026!';

  const existingAdmin = await payload.find({
    collection: 'users',
    where: { email: { equals: adminEmail } },
  });

  if (existingAdmin.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      },
    });
    console.log('Admin user created.');
  }

  const editorEmail = 'editor@freshceramics.net';
  const existingEditor = await payload.find({
    collection: 'users',
    where: { email: { equals: editorEmail } },
  });

  if (existingEditor.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: editorEmail,
        password: adminPassword,
        role: 'editor',
      },
    });
    console.log('Editor user created.');
  }

  // 2. Finishes
  console.log('Seeding Finishes...');
  const finishesMap: Record<string, number> = {};
  const finishesData = JSON.parse(fs.readFileSync('content-export/finishes.json', 'utf8'));
  for (const f of finishesData) {
    const existing = await payload.find({
      collection: 'finishes',
      where: { slug: { equals: f.slug } },
    });
    if (existing.totalDocs > 0) {
      finishesMap[f.slug] = existing.docs[0].id as number;
    } else {
      const doc = await payload.create({
        collection: 'finishes',
        data: {
          name: f.name,
          slug: f.slug,
          category: f.category || 'floor',
          description: f.description || '',
          order: f.order || 1,
        },
      });
      finishesMap[f.slug] = doc.id as number;
    }
  }

  // 3. Sizes
  console.log('Seeding Sizes...');
  const sizesMap: Record<string, number> = {};
  const sizesData = JSON.parse(fs.readFileSync('content-export/sizes.json', 'utf8'));
  for (const s of sizesData) {
    const existing = await payload.find({
      collection: 'sizes',
      where: { slug: { equals: s.slug } },
    });
    if (existing.totalDocs > 0) {
      sizesMap[s.slug] = existing.docs[0].id as number;
    } else {
      const doc = await payload.create({
        collection: 'sizes',
        data: {
          name: s.name,
          slug: s.slug,
          category: s.category || 'floor',
          widthCm: s.widthCm || 60,
          lengthCm: s.lengthCm || 60,
          sqmPerBox: s.sqmPerBox || 1.44,
          piecesPerBox: s.piecesPerBox || 4,
          weightKgPerBox: s.weightKgPerBox || 28,
        },
      });
      sizesMap[s.slug] = doc.id as number;
    }
  }

  // 4. Series
  console.log('Seeding Series...');
  const seriesMap: Record<string, number> = {};
  const seriesData = JSON.parse(fs.readFileSync('content-export/series.json', 'utf8'));
  for (const sr of seriesData) {
    const existing = await payload.find({
      collection: 'series',
      where: { slug: { equals: sr.slug } },
    });
    if (existing.totalDocs > 0) {
      seriesMap[sr.slug] = existing.docs[0].id as number;
    } else {
      const doc = await payload.create({
        collection: 'series',
        data: {
          name: sr.name,
          slug: sr.slug,
          subtitle: sr.subtitle || '',
          description: sr.description || '',
          order: sr.order || 1,
        },
      });
      seriesMap[sr.slug] = doc.id as number;
    }
  }

  // 5. Spaces
  console.log('Seeding Spaces...');
  const spacesData = JSON.parse(fs.readFileSync('content-export/spaces.json', 'utf8'));
  for (const sp of spacesData) {
    const existing = await payload.find({
      collection: 'spaces',
      where: { slug: { equals: sp.slug } },
    });
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'spaces',
        data: {
          name: sp.name,
          slug: sp.slug,
          description: sp.description || '',
          order: sp.order || 1,
        },
      });
    }
  }

  // 6. Products (385 authentic products)
  console.log('Seeding 385 Products into Cloud SQL...');
  const productsData = JSON.parse(fs.readFileSync('content-export/products.json', 'utf8'));
  let seededProducts = 0;
  for (const p of productsData) {
    const existing = await payload.find({
      collection: 'products',
      where: { code: { equals: p.code } },
    });
    if (existing.totalDocs === 0) {
      const finishId = p.finish?.slug ? finishesMap[p.finish.slug] : undefined;
      const sizeId = p.size?.slug ? sizesMap[p.size.slug] : undefined;
      const seriesId = p.series?.slug ? seriesMap[p.series.slug] : undefined;

      await payload.create({
        collection: 'products',
        data: {
          code: p.code,
          name: p.name,
          slug: p.slug,
          category: p.category || 'floor',
          wallOrFloor: p.wallOrFloor || 'floor',
          finish: finishId,
          size: sizeId,
          series: seriesId,
          status: 'published',
          featured: !!p.featured,
          bestSeller: !!p.bestSeller,
          newArrival: !!p.newArrival,
          faceCount: p.faceCount || 1,
          waterAbsorptionPct: p.waterAbsorptionPct || 0.08,
          breakingStrengthN: p.breakingStrengthN || 2200,
          frostResistant: true,
          chemicalResistant: true,
          surfaceScratchMohs: 7,
          stainResistanceClass: 5,
        },
      });
      seededProducts++;
    }
  }
  console.log(`Seeded ${seededProducts} products into Cloud SQL.`);

  // 7. Showrooms (81 showrooms)
  console.log('Seeding 81 Showrooms...');
  const showroomsData = JSON.parse(fs.readFileSync('content-export/showrooms.json', 'utf8'));
  for (const s of showroomsData) {
    const existing = await payload.find({
      collection: 'showrooms',
      where: { name: { equals: s.name } },
    });
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'showrooms',
        data: {
          name: s.name,
          tier: s.tier || 'flagship',
          division: s.division || 'Dhaka',
          area: s.area || '',
          address: s.address || '',
          phone: s.phone || '16595',
          latitude: s.lat || 23.8103,
          longitude: s.lng || 90.4125,
          daysOpen: 'Saturday - Thursday',
          hours: '9:00 AM - 8:00 PM',
        },
      });
    }
  }

  // 8. Catalogs
  console.log('Seeding Catalogs & Downloadables...');
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
  ];

  for (const cat of defaultCatalogs) {
    const existing = await payload.find({
      collection: 'catalogs',
      where: { title: { equals: cat.title } },
    });
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'catalogs',
        data: cat,
      });
    }
  }

  // 9. Dynamic Pages
  console.log('Seeding Dynamic Pages with Block Builder...');
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
  ];

  for (const p of defaultPages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: p.slug } },
    });
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'pages',
        data: p as any,
      });
    }
  }

  // 10. Globals: SiteSettings & Stats
  console.log('Seeding Globals: SiteSettings & Stats...');
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
    } as any,
  });

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
  });

  console.log('--- Cloud SQL Payload Seeding Successfully Finished! ---');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
