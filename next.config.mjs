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
  },
  reactStrictMode: true,
}

export default nextConfig
