import type { CollectionConfig } from 'payload'

export const Showrooms: CollectionConfig = {
  slug: 'showrooms',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tier', 'division', 'district', 'phone'],
    group: 'Locations & Network',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'tier',
      type: 'select',
      required: true,
      options: [
        { label: 'Flagship Display Centre', value: 'flagship' },
        { label: 'Exclusive Showroom', value: 'exclusive' },
        { label: 'Authorised Dealer', value: 'dealer' },
      ],
    },
    {
      name: 'division',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'district',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'thana',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'hours',
      type: 'text',
    },
    {
      name: 'latitude',
      type: 'number',
    },
    {
      name: 'longitude',
      type: 'number',
    },
    {
      name: 'mapLink',
      type: 'text',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'openedDate',
      type: 'text',
    },
    {
      name: 'placeholder',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Flags test/sample entries. Excluded from production builds.',
      },
    },
  ],
}
