/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '',
  trailingSlash: false,
  distDir: 'out',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year for static images
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
