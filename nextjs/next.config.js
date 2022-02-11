/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'pbs.twimg.com',
      'media.twitter.com',
      'abs.twimg.com',
    ],
  },
}

module.exports = nextConfig
