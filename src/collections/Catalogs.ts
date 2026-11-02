import type { CollectionConfig } from 'payload'

export const Catalogs: CollectionConfig = {
  slug: 'catalogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'series', 'pages', 'date'],
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
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'series',
      type: 'relationship',
      relationTo: 'series',
    },
    {
      name: 'pdf',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'pages',
      type: 'number',
    },
    {
      name: 'filesizeMb',
      type: 'number',
    },
    {
      name: 'date',
      type: 'text',
    },
    {
      name: 'isHidden',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Hide this catalogue from public download lists.',
      },
    },
    {
      name: 'downloadCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Total number of downloads recorded.',
      },
    },
  ],
}
