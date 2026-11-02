// @ts-nocheck
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { db } from '../src/db/index';
import {
  users,
  finishes,
  sizes,
  series,
  spaces,
  products,
  showrooms,
  catalogs,
  articles,
  pages,
  media,
} from '../src/db/schema';
import { eq } from 'drizzle-orm';

dotenv.config();

async function runMigration() {
  console.log('--- Starting Cloud SQL PostgreSQL Migration & Seeding ---');

  // 1. Users
  console.log('Seeding Users...');
  await db.insert(users)
    .values([
      {
        uid: 'admin_initial_uid',
        email: 'admin@freshceramics.net',
        role: 'admin',
      },
      {
        uid: 'editor_initial_uid',
        email: 'editor@freshceramics.net',
        role: 'editor',
      },
    ])
    .onConflictDoUpdate({
      target: users.uid,
      set: { role: 'admin' },
    });

  // 2. Finishes
  console.log('Migrating Finishes...');
  const finishesPath = path.resolve('content-export/finishes.json');
  if (fs.existsSync(finishesPath)) {
    const finishesData = JSON.parse(fs.readFileSync(finishesPath, 'utf8'));
    for (const item of finishesData) {
      await db.insert(finishes)
        .values({
          id: typeof item.id === 'number' ? item.id : undefined,
          name: item.name || item.slug,
          slug: item.slug,
          description: item.description || '',
          textureUrl: item.textureUrl || '',
        })
        .onConflictDoNothing();
    }
    console.log(`Migrated ${finishesData.length} finishes.`);
  }

  // 3. Sizes
  console.log('Migrating Sizes...');
  const sizesPath = path.resolve('content-export/sizes.json');
  if (fs.existsSync(sizesPath)) {
    const sizesData = JSON.parse(fs.readFileSync(sizesPath, 'utf8'));
    for (const item of sizesData) {
      await db.insert(sizes)
        .values({
          id: typeof item.id === 'number' ? item.id : undefined,
          name: item.name || item.slug,
          slug: item.slug,
          length: item.length || 600,
          width: item.width || 600,
          unit: item.unit || 'mm',
        })
        .onConflictDoNothing();
    }
    console.log(`Migrated ${sizesData.length} sizes.`);
  }

  // 4. Series
  console.log('Migrating Series...');
  const seriesPath = path.resolve('content-export/series.json');
  if (fs.existsSync(seriesPath)) {
    const seriesData = JSON.parse(fs.readFileSync(seriesPath, 'utf8'));
    for (const item of seriesData) {
      await db.insert(series)
        .values({
          id: typeof item.id === 'number' ? item.id : undefined,
          name: item.name || item.slug,
          slug: item.slug,
          description: item.description || '',
          image: typeof item.heroImage === 'string' ? item.heroImage : '',
        })
        .onConflictDoNothing();
    }
    console.log(`Migrated ${seriesData.length} series.`);
  }

  // 5. Spaces
  console.log('Migrating Spaces...');
  const spacesPath = path.resolve('content-export/spaces.json');
  if (fs.existsSync(spacesPath)) {
    const spacesData = JSON.parse(fs.readFileSync(spacesPath, 'utf8'));
    for (const item of spacesData) {
      await db.insert(spaces)
        .values({
          id: typeof item.id === 'number' ? item.id : undefined,
          name: item.name || item.slug,
          slug: item.slug,
          description: item.description || '',
          icon: item.icon || 'home',
        })
        .onConflictDoNothing();
    }
    console.log(`Migrated ${spacesData.length} spaces.`);
  }

  // 6. Products
  console.log('Migrating Products...');
  const productsPath = path.resolve('content-export/products.json');
  if (fs.existsSync(productsPath)) {
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    let imported = 0;
    for (const p of productsData) {
      const finishId = typeof p.finish === 'number' ? p.finish : typeof p.finish === 'object' && p.finish?.id ? p.finish.id : null;
      const sizeId = typeof p.size === 'number' ? p.size : typeof p.size === 'object' && p.size?.id ? p.size.id : null;
      const seriesId = typeof p.series === 'number' ? p.series : typeof p.series === 'object' && p.series?.id ? p.series.id : null;

      await db.insert(products)
        .values({
          code: p.code || `FC-${p.slug || Math.random().toString(36).substring(7)}`,
          name: p.name || 'Ceramic Tile',
          banglaName: p.banglaName || null,
          slug: p.slug || p.code?.toLowerCase(),
          category: p.category || 'floor',
          finishId: finishId,
          sizeId: sizeId,
          seriesId: seriesId,
          tileType: p.tileType || 'porcelain',
          description: p.description || '',
          price: typeof p.price === 'number' ? p.price : 120.0,
          isFeatured: !!p.featured,
          isBestSeller: !!p.bestSeller,
          isNewArrival: !!p.newArrival,
          isHidden: false,
          imageUrl: typeof p.faceImage === 'string' ? p.faceImage : (p.faceImage?.url || null),
        })
        .onConflictDoNothing();
      imported++;
    }
    console.log(`Migrated ${imported} products.`);
  }

  // 7. Showrooms
  console.log('Migrating Showrooms...');
  const showroomsPath = path.resolve('content-export/showrooms.json');
  if (fs.existsSync(showroomsPath)) {
    const showroomsData = JSON.parse(fs.readFileSync(showroomsPath, 'utf8'));
    for (const s of showroomsData) {
      await db.insert(showrooms)
        .values({
          name: s.name,
          division: s.division || 'Dhaka',
          district: s.district || s.area || 'Dhaka',
          address: s.address || s.area || '',
          phone: s.phone || '16595',
          email: s.email || 'info@freshceramics.net',
          lat: s.lat || 23.8103,
          lng: s.lng || 90.4125,
          isDealer: s.tier === 'dealer' || s.tier === 'exclusive',
        })
        .onConflictDoNothing();
    }
    console.log(`Migrated ${showroomsData.length} showrooms.`);
  }

  // 8. Catalogs
  console.log('Seeding Master Catalogs & Downloadables...');
  const defaultCatalogs = [
    {
      title: 'Fresh Ceramics Master Product Catalogue 2026',
      category: 'master',
      fileUrl: '/brand/Company & Brand_Profile Fresh Ceramics.pdf',
      fileSize: '14.8 MB',
      year: 2026,
      isHidden: false,
      downloadCount: 1420,
    },
    {
      title: 'Double Charge Architectural Specification Sheet',
      category: 'technical',
      fileUrl: '/brand/Company & Brand_Profile Fresh Ceramics.pdf',
      fileSize: '4.2 MB',
      year: 2026,
      isHidden: false,
      downloadCount: 890,
    },
    {
      title: 'Porcelain Slim Tiles Technical Brochure',
      category: 'brochure',
      fileUrl: '/brand/Company & Brand_Profile Fresh Ceramics.pdf',
      fileSize: '6.1 MB',
      year: 2026,
      isHidden: false,
      downloadCount: 654,
    },
    {
      title: 'Dealer & Fitter Technical Installation Handbook',
      category: 'installation',
      fileUrl: '/brand/Company & Brand_Profile Fresh Ceramics.pdf',
      fileSize: '8.5 MB',
      year: 2026,
      isHidden: false,
      downloadCount: 512,
    },
  ];

  for (const cat of defaultCatalogs) {
    await db.insert(catalogs).values(cat).onConflictDoNothing();
  }
  console.log(`Seeded ${defaultCatalogs.length} master catalogs.`);

  // 9. Articles
  console.log('Seeding Articles...');
  const defaultArticles = [
    {
      title: 'The Art of Double Charge Vitrification: Engineering Megastructures',
      slug: 'art-of-double-charge-vitrification',
      excerpt: 'How dual-layer hydraulic compression at 1250°C creates Bangladesh’s highest load-bearing commercial surface.',
      content: 'Fresh Ceramics pioneered full-line Double Charge production in Bangladesh across 60x60, 80x80, and 60x120 cm formats. Our automated SACMI presses from Italy ensure 98% A-grade export fidelity.',
      coverImage: '/brand/logo-fresh-ceramics.png',
      author: 'Materials Engineering Division',
      publishedAt: new Date('2026-01-15'),
      isHidden: false,
    },
    {
      title: 'Thermal Insulation & Urban Rooftop Cooling with Fresh Heatproof Tiles',
      slug: 'thermal-insulation-heatproof-tiles',
      excerpt: 'Sub-surface heat rejection reduces interior AC consumption by up to 28% across tropical climates.',
      content: 'Engineered with specialized micro-porous ceramic foam layers, our Heatproof series reflects solar irradiation while preventing thermal expansion cracks on exposed terraces and roofs.',
      coverImage: '/brand/logo-fresh-ceramics.png',
      author: 'Architectural Innovation Lab',
      publishedAt: new Date('2026-02-10'),
      isHidden: false,
    },
    {
      title: 'Zero-Gap Rectification: The Science Behind Ultra Fine Squaring',
      slug: 'zero-gap-rectification-science',
      excerpt: 'Diamond calibrated squaring lines deliver perfect 90° edges for seamless monolithic room continuity.',
      content: 'Laser-guided edge rectification eliminates corner height deviations, giving designers and homeowners the freedom to lay grout lines as narrow as 1mm for continuous visual flow.',
      coverImage: '/brand/logo-fresh-ceramics.png',
      author: 'Quality & Technology Team',
      publishedAt: new Date('2026-03-01'),
      isHidden: false,
    },
  ];

  for (const art of defaultArticles) {
    await db.insert(articles).values(art).onConflictDoNothing();
  }
  console.log(`Seeded ${defaultArticles.length} articles.`);

  // 10. Dynamic Pages
  console.log('Seeding Dynamic Pages...');
  const defaultPages = [
    {
      title: 'Home Showcase',
      slug: 'home',
      status: 'published',
      metaTitle: 'Fresh Ceramics | A Fresh Start to an Aesthetic Life',
      metaDescription: 'Highest selling tiles brand in Bangladesh every year since 2023. Double Charge, Mirror Polished, and Vitrified architectural tiles.',
      layoutJson: [
        {
          blockType: 'hero_scene',
          headline: 'A Fresh Start to an Aesthetic Life',
          subtext: 'Every surface in a home begins somewhere. Ours begins with sunlight on a rooftop in Meghnaghat.',
          badge: 'MEGHNAGHAT, FIRST LIGHT',
          primaryCtaText: 'Explore Journey',
          primaryCtaLink: '#journey',
          secondaryCtaText: 'View Catalogue',
          secondaryCtaLink: '/tiles',
          isHidden: false,
        },
        {
          blockType: 'stats_banner',
          establishedYear: 2021,
          annualProduction: '18.6M sq m a year',
          marketLeadership: 'Highest selling tiles brand in Bangladesh every year since 2023.',
          isHidden: false,
        },
        {
          blockType: 'tile_showcase_grid',
          title: 'Signature Architectural Collections',
          subtitle: 'Precision engineered porcelain for living spaces, commercial lobbies, and serene sanctuaries.',
          limit: 8,
          isHidden: false,
        },
        {
          blockType: 'showroom_locator_preview',
          title: 'Find Fresh Ceramics Near You',
          subtitle: 'Over 81 exclusive showrooms and authorised dealers across 8 divisions in Bangladesh.',
          ctaText: 'Open Full Interactive Map',
          ctaLink: '/showrooms',
          isHidden: false,
        },
      ],
    },
    {
      title: 'Quality & Technology',
      slug: 'quality-and-technology',
      status: 'published',
      metaTitle: '14 Global Standard Quality Tests | Fresh Ceramics',
      metaDescription: 'State-of-the-art Italian SACMI machinery and robotic glazing lines at Meghnaghat.',
      layoutJson: [
        {
          blockType: 'rich_text_block',
          title: 'Pioneering Ceramic Precision in Bangladesh',
          content: 'From automated clay slurry filtration to laser-measured edge rectification, every tile is subjected to 14 rigorous international durability and water absorption benchmarks.',
          isHidden: false,
        },
      ],
    },
  ];

  for (const page of defaultPages) {
    await db.insert(pages).values(page).onConflictDoNothing();
  }
  console.log(`Seeded ${defaultPages.length} dynamic pages.`);

  console.log('--- Cloud SQL PostgreSQL Migration & Seeding Complete! ---');
}

runMigration()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
