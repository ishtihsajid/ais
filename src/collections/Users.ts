import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'createdAt'],
    group: 'Governance & Settings',
  },
  auth: {
    cookies: {
      sameSite: 'None',
      secure: true,
    },
  },
  access: {
    // Only admins can delete or create users
    delete: ({ req: { user } }) => user?.role === 'admin',
    create: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      options: [
        { label: 'Admin (Full access)', value: 'admin' },
        { label: 'Editor (Content editor)', value: 'editor' },
      ],
      admin: {
        description: 'Admin has full system access; Editor can edit content but cannot delete permanently or manage users.',
      },
    },
  ],
}
