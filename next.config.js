/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['cdn.cosmicjs.com', 'imgix.cosmicjs.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig