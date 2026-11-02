import type { GlobalConfig } from 'payload'

export const Pages: GlobalConfig = {
  slug: 'legacy-page-settings',
  label: 'Static Page Defaults',
  admin: {
    group: 'Globals',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'about',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
        { name: 'content', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'sustainability',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
        { name: 'content', type: 'textarea', localized: true },
        {
          name: 'pillars',
          type: 'array',
          fields: [
            { name: 'number', type: 'text' },
            { name: 'title', type: 'text', localized: true },
            { name: 'detail', type: 'text', localized: true },
          ],
        },
      ],
    },
    {
      name: 'qualityAndTechnology',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
        { name: 'content', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'slimTiles',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
        { name: 'content', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'heatproofTiles',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
        { name: 'content', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'fitters',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
        { name: 'content', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'professionals',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
        { name: 'content', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
        { name: 'content', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'privacy',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'content', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'terms',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'content', type: 'textarea', localized: true },
      ],
    },
  ],
}
