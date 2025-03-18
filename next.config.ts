import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '220.76.100.99',
        port: '48160',
        pathname: '/api/category-logo/**',
        search: '',
      },
      {
        protocol: 'http',
        hostname: '220.76.100.99',
        port: '48162',
        pathname: '/api/category-logo/**',
        search: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '48160',
        pathname: '/api/category-logo/**',
        search: '',
      },
      {
        protocol: 'http',
        hostname: '220.76.100.99',
        port: '48160',
        pathname: '/api/service-page-image/**',
        search: '',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
