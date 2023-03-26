/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://hungnh1812dev.github.com/growing"
      : "",
};

module.exports = nextConfig;
