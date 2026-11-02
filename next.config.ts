import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    localPatterns: [
      {
        pathname: '/brand/**',
      },
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/media/**',
      },
      {
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  productionBrowserSourceMaps: false,
  // Ensure square corners and clean rendering
  reactStrictMode: true,
}

export default withPayload(nextConfig)
