const publicOcdnBucketName =
  process.env.NEXT_PUBLIC_OCDN_BUCKET_NAME ||
  process.env.bamboo_NEXT_PUBLIC_OCDN_BUCKET_NAME;

const nextConfig = {
  images: {
    domains: ["ocdn.eu"],
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? `https://ocdn.eu/${publicOcdnBucketName}/hatstatic/`
      : "",
  transpilePackages: ["hat-ring-components", "hat-example-components"],
};

module.exports = nextConfig;
