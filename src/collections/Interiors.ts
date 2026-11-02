import type { CollectionConfig } from 'payload'

export const Interiors: CollectionConfig = {
  slug: 'interiors',
  admin: {
    useAsTitle: 'caption',
    defaultColumns: ['caption', 'space', 'createdAt'],
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
      name: 'space',
      type: 'relationship',
      relationTo: 'spaces',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
    {
      name: 'altText',
      type: 'text',
      required: true,
    },
    {
      name: 'hotspots',
      type: 'array',
      fields: [
        {
          name: 'x',
          type: 'number',
          required: true,
          admin: { description: 'X position in percentage (0-100)' },
        },
        {
          name: 'y',
          type: 'number',
          required: true,
          admin: { description: 'Y position in percentage (0-100)' },
        },
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}
