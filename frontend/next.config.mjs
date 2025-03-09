/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.abdos.cloud/api/:path*',
      },
    ];
  },
};

export default nextConfig; 