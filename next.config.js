/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['dummyjson.com', 
    'unpkg.com', 
    'raw.githubusercontent.com', 
    'images.amcnetworks.com',
    'vignette.wikia.nocookie.net',
    's-i.huffpost.com',
    'media1.popsugar-assets.com']
  }
}

module.exports = nextConfig
