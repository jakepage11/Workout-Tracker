/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
      // TODO: figure out how to redirect all auth calls from 8888 to 3000
      // {
      //   source: 'http://localhost8888/api/auth/:slug*',
      //   destination: 'http://localhost3000/api/auth/:slug*',
      //   permanent: false, 
      // }
    ]
  },
  images: {
    domains: ['lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
