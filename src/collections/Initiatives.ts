import type { CollectionConfig } from 'payload'

export const Initiatives: CollectionConfig = {
  slug: 'initiatives',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'category'],
    group: 'Brand Stories & Community',
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
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'year',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Learning & Knowledge', value: 'learning' },
        { label: 'Craftsmen & People', value: 'people' },
        { label: 'Community & CSR', value: 'community' },
        { label: 'Environment & Sustainability', value: 'environment' },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'story',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'link',
      type: 'text',
    },
    {
      name: 'sample',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
