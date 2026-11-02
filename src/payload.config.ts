import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Finishes } from './collections/Finishes'
import { Sizes } from './collections/Sizes'
import { Series } from './collections/Series'
import { Spaces } from './collections/Spaces'
import { Products } from './collections/Products'
import { Interiors } from './collections/Interiors'
import { Catalogs } from './collections/Catalogs'
import { Showrooms } from './collections/Showrooms'
import { Initiatives } from './collections/Initiatives'
import { Voices } from './collections/Voices'
import { Articles } from './collections/Articles'
import { Claims } from './collections/Claims'
import { Enquiries } from './collections/Enquiries'
import { Pages as PagesCollection } from './collections/Pages'

import { SiteSettings } from './globals/SiteSettings'
import { Stats } from './globals/Stats'
import { Journey } from './globals/Journey'
import { Navigation } from './globals/Navigation'
import { Pages as LegacyPagesGlobal } from './globals/Pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    autoLogin: {
      email: 'admin@freshceramics.net',
      password: 'freshceramics2026!',
      prefillOnly: true,
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'বাংলা (Bengali)', code: 'bn' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: [
    PagesCollection,
    Products,
    Finishes,
    Sizes,
    Series,
    Spaces,
    Interiors,
    Catalogs,
    Showrooms,
    Initiatives,
    Voices,
    Articles,
    Claims,
    Enquiries,
    Media,
    Users,
  ],
  globals: [
    SiteSettings,
    Stats,
    Journey,
    Navigation,
    LegacyPagesGlobal,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fresh_ceramics_secret_change_me_in_production_f7a8b9c0d1e2f3',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: process.env.SQL_HOST
    ? postgresAdapter({
        pool: {
          host: process.env.SQL_HOST,
          user: process.env.SQL_USER,
          password: process.env.SQL_PASSWORD,
          database: process.env.SQL_DB_NAME,
          max: 10,
          connectionTimeoutMillis: 15000,
        },
        push: false,
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || 'file:./data/fresh.db',
        },
      }),
  sharp,
})
