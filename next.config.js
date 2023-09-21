/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
