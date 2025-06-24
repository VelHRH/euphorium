import type { NextConfig } from 'next'

import './scripts/envValidation'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
}

export default nextConfig
