/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "livspace.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/design-ideas/trending",
        destination: "/design-ideas/trending-designs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
