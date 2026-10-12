/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.rpeptide.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'rpeptide.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
