import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    group: 'Content & Page Studio',
    description: 'Create, edit, organize and publish dynamic website pages and customized landing paths.',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Page title displayed in browser tab and search results.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'The URL path segment for this page (e.g. "about", "heatproof-tiles", "quality-and-technology").',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Published (Live)', value: 'published' },
        { label: 'Draft (Hidden)', value: 'draft' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO & Social Metadata',
      fields: [
        { name: 'metaTitle', type: 'text', localized: true },
        { name: 'metaDescription', type: 'textarea', localized: true },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'sections',
      type: 'blocks',
      label: 'Page Sections (Drag to reorder, add or hide)',
      blocks: [
        {
          slug: 'heroScene',
          labels: { singular: 'Hero Scene Section', plural: 'Hero Scene Sections' },
          fields: [
            { name: 'badge', type: 'text', localized: true, defaultValue: 'FRESH CERAMICS' },
            { name: 'headline', type: 'text', localized: true, required: true },
            { name: 'subtext', type: 'textarea', localized: true },
            { name: 'primaryCtaText', type: 'text', localized: true },
            { name: 'primaryCtaLink', type: 'text' },
            { name: 'secondaryCtaText', type: 'text', localized: true },
            { name: 'secondaryCtaLink', type: 'text' },
            { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
            { name: 'isHidden', type: 'checkbox', defaultValue: false, label: 'Hide this section from visitors' },
          ],
        },
        {
          slug: 'tileGridShowcase',
          labels: { singular: 'Tile Showcase Grid', plural: 'Tile Showcase Grids' },
          fields: [
            { name: 'heading', type: 'text', localized: true },
            { name: 'subheading', type: 'text', localized: true },
            {
              name: 'filterCategory',
              type: 'select',
              options: [
                { label: 'All Tiles', value: 'all' },
                { label: 'Floor Tiles Only', value: 'floor' },
                { label: 'Wall Tiles Only', value: 'wall' },
                { label: 'Featured Only', value: 'featured' },
              ],
              defaultValue: 'all',
            },
            { name: 'limit', type: 'number', defaultValue: 12 },
            { name: 'isHidden', type: 'checkbox', defaultValue: false, label: 'Hide this section' },
          ],
        },
        {
          slug: 'statsBanner',
          labels: { singular: 'KPI & Stats Banner', plural: 'KPI & Stats Banners' },
          fields: [
            { name: 'metric1Value', type: 'text', defaultValue: 'Since 2021' },
            { name: 'metric1Label', type: 'text', defaultValue: 'TILE PLANT ESTABLISHED' },
            { name: 'metric2Value', type: 'text', defaultValue: '18.6M sq m a year' },
            { name: 'metric2Label', type: 'text', defaultValue: 'ANNUAL PRODUCTION CAPACITY' },
            { name: 'metric3Value', type: 'text', defaultValue: 'Market Sales Leadership' },
            { name: 'metric3Label', type: 'text', defaultValue: 'Highest selling tiles brand in Bangladesh' },
            { name: 'isHidden', type: 'checkbox', defaultValue: false, label: 'Hide this banner' },
          ],
        },
        {
          slug: 'storyChapter',
          labels: { singular: 'Journey & Story Chapter', plural: 'Journey & Story Chapters' },
          fields: [
            { name: 'chapterNumber', type: 'text', defaultValue: '01' },
            { name: 'title', type: 'text', localized: true },
            { name: 'content', type: 'textarea', localized: true },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'isHidden', type: 'checkbox', defaultValue: false, label: 'Hide this chapter' },
          ],
        },
        {
          slug: 'richTextSection',
          labels: { singular: 'Rich Content Block', plural: 'Rich Content Blocks' },
          fields: [
            { name: 'heading', type: 'text', localized: true },
            { name: 'body', type: 'textarea', localized: true },
            { name: 'media', type: 'upload', relationTo: 'media' },
            { name: 'isHidden', type: 'checkbox', defaultValue: false, label: 'Hide this section' },
          ],
        },
        {
          slug: 'downloadCenter',
          labels: { singular: 'Catalog Downloads Section', plural: 'Catalog Downloads Sections' },
          fields: [
            { name: 'heading', type: 'text', localized: true, defaultValue: 'Official Catalogues & Brochures' },
            { name: 'subheading', type: 'text', localized: true, defaultValue: 'Download technical specification sheets and master product catalogs.' },
            { name: 'isHidden', type: 'checkbox', defaultValue: false, label: 'Hide this section' },
          ],
        },
        {
          slug: 'showroomNetwork',
          labels: { singular: 'Showroom & Dealer Locator', plural: 'Showroom & Dealer Locators' },
          fields: [
            { name: 'heading', type: 'text', localized: true, defaultValue: 'Find a Showroom Near You' },
            { name: 'subheading', type: 'text', localized: true, defaultValue: 'Over 81 exclusive showrooms and authorised dealers across Bangladesh.' },
            { name: 'isHidden', type: 'checkbox', defaultValue: false, label: 'Hide this locator' },
          ],
        },
      ],
    },
  ],
}
