/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_API_ENDPOINT: process.env.GITHUB_API_ENDPOINT,
    GITHUB_API_ACCESS_TOKEN: process.env.GITHUB_API_ACCESS_TOKEN,
  },
};

module.exports = nextConfig;
