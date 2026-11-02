import type { GlobalConfig } from 'payload'

export const Stats: GlobalConfig = {
  slug: 'stats',
  admin: {
    group: 'Globals',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'exclusiveShowrooms',
      type: 'number',
      defaultValue: 79,
      required: true,
      admin: { description: 'Exclusive Showroom count (Section 3.6)' },
    },
    {
      name: 'flagshipCentres',
      type: 'number',
      defaultValue: 2,
      required: true,
      admin: { description: 'Own operated flagship display centres (Section 3.6)' },
    },
    {
      name: 'authorisedDealers',
      type: 'number',
      defaultValue: 120,
      required: true,
      admin: { description: 'Authorised dealers count (Section 3.6)' },
    },
    {
      name: 'floorDesignCount',
      type: 'number',
      defaultValue: 204,
      required: true,
      admin: { description: 'Floor designs in current SKU matrix (Section 3.5)' },
    },
    {
      name: 'wallDesignCount',
      type: 'number',
      defaultValue: 181,
      required: true,
      admin: { description: 'Wall designs in current SKU matrix (Section 3.5)' },
    },
    {
      name: 'totalDesignCount',
      type: 'number',
      defaultValue: 385,
      required: true,
      admin: { description: 'Total designs (Section 3.5)' },
    },
    {
      name: 'annualProductionM2',
      type: 'text',
      defaultValue: '18.6 million',
      required: true,
      admin: { description: 'Annual production in square metres' },
    },
    {
      name: 'establishedYear',
      type: 'number',
      defaultValue: 2021,
      required: true,
      admin: { description: 'Tile plant established year' },
    },
    {
      name: 'globalStandardTests',
      type: 'number',
      defaultValue: 14,
      required: true,
      admin: { description: 'Global standard factory tests' },
    },
    {
      name: 'exportQualityGradePct',
      type: 'number',
      defaultValue: 98,
      required: true,
      admin: { description: 'A grade export quality percentage' },
    },
  ],
}
