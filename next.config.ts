import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'randomuser.me',
      'images.unsplash.com',
      'images.pexels.com',
      // add other domains as needed
    ],
  },
};

export default nextConfig;
