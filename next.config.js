/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['sketchok.com']
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
