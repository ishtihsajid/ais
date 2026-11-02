import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'category', 'finish', 'size', 'status'],
    group: 'Catalogue Data',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Unique SKU / product code (e.g. FC-60120-DC01)',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Floor', value: 'floor' },
        { label: 'Wall', value: 'wall' },
      ],
    },
    {
      name: 'finish',
      type: 'relationship',
      relationTo: 'finishes',
      required: true,
    },
    {
      name: 'size',
      type: 'relationship',
      relationTo: 'sizes',
      required: true,
    },
    {
      name: 'series',
      type: 'relationship',
      relationTo: 'series',
    },
    {
      name: 'colourFamily',
      type: 'select',
      options: [
        { label: 'White / Ivory', value: 'white' },
        { label: 'Beige / Cream', value: 'beige' },
        { label: 'Grey / Charcoal', value: 'grey' },
        { label: 'Black', value: 'black' },
        { label: 'Brown / Earth', value: 'brown' },
        { label: 'Blue / Aqua', value: 'blue' },
        { label: 'Green', value: 'green' },
        { label: 'Terracotta / Rust', value: 'terracotta' },
        { label: 'Multicolor', value: 'multicolor' },
      ],
    },
    {
      name: 'spaces',
      type: 'relationship',
      relationTo: 'spaces',
      hasMany: true,
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'zoomable',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable deep zoom inspection for this tile',
      },
    },
    // Packaging specifications
    {
      name: 'pcsPerCarton',
      type: 'number',
      admin: { description: 'Pieces per carton' },
    },
    {
      name: 'sqmPerCarton',
      type: 'number',
      admin: { description: 'Square metres per carton' },
    },
    {
      name: 'cartonKg',
      type: 'number',
      admin: { description: 'Gross weight per carton in kg' },
    },
    // Sustainability flags
    {
      name: 'slim',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Slim Tile innovation: reduced weight and dead load' },
    },
    {
      name: 'heatproof',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Heatproof Tile innovation: up to 30% thermal barrier' },
    },
    // Reserved for Visualizer
    {
      name: 'wallOrFloor',
      type: 'select',
      options: [
        { label: 'Floor', value: 'floor' },
        { label: 'Wall', value: 'wall' },
      ],
      admin: { description: 'Visualizer surface application tag' },
    },
    {
      name: 'widthCm',
      type: 'number',
      admin: { description: 'Width in cm for 3D visualizer scaling' },
    },
    {
      name: 'heightCm',
      type: 'number',
      admin: { description: 'Height in cm for 3D visualizer scaling' },
    },
    {
      name: 'tileableTexture',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Seamless texture map for 3D visualizer' },
    },
    {
      name: 'groutWidthMm',
      type: 'number',
      defaultValue: 2,
      admin: { description: 'Default grout joint width in mm' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
