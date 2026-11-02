import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Globals',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'hotline',
      type: 'text',
      defaultValue: '16595',
      required: true,
      admin: { description: 'Toll-free customer hotline' },
    },
    {
      name: 'email',
      type: 'text',
      defaultValue: 'info@freshceramics.net',
      required: true,
    },
    {
      name: 'factoryLocation',
      type: 'text',
      defaultValue: 'Meghnaghat, Sonargaon, Narayanganj, Bangladesh',
      localized: true,
      required: true,
    },
    {
      name: 'headOffice',
      type: 'text',
      defaultValue: 'Fresh Villa, House 12, Road 11, Block G, Banani, Dhaka, Bangladesh',
      localized: true,
      required: true,
    },
    {
      name: 'legalEntityLine',
      type: 'text',
      defaultValue: 'Fresh Ceramics is a brand of Meghna Ceramic Industries Ltd.',
      localized: true,
    },
    {
      name: 'wasteAllowancePct',
      type: 'number',
      defaultValue: 10,
      admin: { description: 'Default tile wastage buffer percentage for calculator (default 10%)' },
    },
    {
      name: 'carEquivalentKg',
      type: 'number',
      defaultValue: 1330,
      admin: { description: 'Toyota Corolla equivalent weight in kg for Slim calculation' },
    },
    {
      name: 'featureVisualizer',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Enable 3D room visualizer feature flag' },
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
