import type { GlobalConfig } from 'payload'

export const Journey: GlobalConfig = {
  slug: 'journey',
  admin: {
    group: 'Globals',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'preludeSkippabble',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'chapters',
      type: 'array',
      fields: [
        { name: 'slug', type: 'text', required: true },
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'kicker', type: 'text', localized: true },
        { name: 'pinLengthVh', type: 'number', required: true },
        {
          name: 'theme',
          type: 'select',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
          ],
          defaultValue: 'dark',
        },
        { name: 'body', type: 'textarea', localized: true },
        { name: 'closingLine', type: 'text', localized: true },
        { name: 'desktopVideo', type: 'upload', relationTo: 'media' },
        { name: 'mobileVideo', type: 'upload', relationTo: 'media' },
        { name: 'poster', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'slimVariants',
      type: 'array',
      fields: [
        { name: 'variant', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'conventionalKgPerSqm', type: 'number', required: true },
        { name: 'slimKgPerSqm', type: 'number', required: true },
        { name: 'reductionPct', type: 'number', required: true },
      ],
    },
    {
      name: 'carEquivalentKg',
      type: 'number',
      defaultValue: 1330,
    },
  ],
}
