/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ['image.tmdb.org']
  },
  env: {
    API_KEY: process.env.API_KEY
  }
}

module.exports = nextConfig
