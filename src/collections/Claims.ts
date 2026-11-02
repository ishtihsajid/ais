import type { CollectionConfig } from 'payload'

export const Claims: CollectionConfig = {
  slug: 'claims',
  admin: {
    useAsTitle: 'key',
    defaultColumns: ['key', 'enText', 'asOfDate'],
    group: 'Governance & Settings',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique claim identifier (e.g. sales_leadership, double_charge_first)',
      },
    },
    {
      name: 'enText',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Binding English claim wording as registered in section 3 of BUILD_PLAN.md',
      },
    },
    {
      name: 'bnText',
      type: 'textarea',
      admin: {
        description: 'Bengali translation of the claim',
      },
    },
    {
      name: 'asOfDate',
      type: 'text',
      admin: {
        description: 'As of date / year (e.g. 2026)',
      },
    },
    {
      name: 'internalSourceNote',
      type: 'text',
      admin: {
        description: 'Internal verification note from the brand deck or lab testing',
      },
    },
  ],
}
