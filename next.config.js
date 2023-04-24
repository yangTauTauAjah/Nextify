/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.scdn.co',
        port: '',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig
