import type { CollectionConfig } from 'payload'

export const Voices: CollectionConfig = {
  slug: 'voices',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'sample'],
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
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'Tile Fitter (নান্দনিকতার কারিগর)', value: 'fitter' },
        { label: 'Dealer', value: 'dealer' },
        { label: 'Architect / Designer', value: 'designer' },
        { label: 'Homeowner / Customer', value: 'customer' },
        { label: 'Factory Team', value: 'plant team' },
      ],
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'sample',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
