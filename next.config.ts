import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/estimate-project-timeline',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
