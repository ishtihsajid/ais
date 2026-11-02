import type { CollectionConfig } from 'payload'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'phone', 'status', 'createdAt'],
    group: 'Governance & Settings',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // Public forms can submit enquiries
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Tile Shortlist Enquiry', value: 'tile' },
        { label: 'General Enquiry', value: 'general' },
        { label: 'Architect / Project Specification', value: 'project' },
        { label: 'Dealership Application', value: 'dealer' },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'shortlist',
      type: 'json',
      admin: {
        description: 'Captured shortlist items payload at the time of submission',
      },
    },
    {
      name: 'nearestShowroom',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Resolved', value: 'resolved' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
