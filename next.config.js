/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org', 'lh3.googleusercontent.com']
  },
  env: {
    API_KEY: process.env.API_KEY
  }
}

module.exports = nextConfig
