import type { CollectionConfig } from 'payload'

export const Sizes: CollectionConfig = {
  slug: 'sizes',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'category', 'widthCm', 'heightCm'],
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Floor (W x H)', value: 'floor' },
        { label: 'Wall (H x W)', value: 'wall' },
      ],
    },
    {
      name: 'widthCm',
      type: 'number',
      required: true,
      admin: { description: 'Width in centimeters' },
    },
    {
      name: 'heightCm',
      type: 'number',
      required: true,
      admin: { description: 'Height in centimeters' },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'Trade format: Wall = Height x Width (e.g. 30x60), Floor = Width x Height (e.g. 60x120)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
