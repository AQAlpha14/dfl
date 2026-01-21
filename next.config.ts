/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: ["my-lib"],
  },
  skipProxyUrlNormalize: true,
  skipTrailingSlashRedirect: true,
  reactStrictMode: false,
  compress: true,
  // swcMinify: true,
  // output: "export",
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=9999999999, immutable",
          },
        ],
      },
    ];
  },
  trailingSlash: false,
  images: {
    minimumCacheTTL: 60,
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "carsolution.hatchtechs.ae",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
