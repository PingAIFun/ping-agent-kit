/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/jupag/:path*',
        destination: 'https://tokens.jup.ag/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
