/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL || "https://austinhowardapi.azurewebsites.net/api/v1",
    ENV: "production",
    // ENV: "development",
    ENCRYPTION_KEY: 'asdf234as2342asdf2i;lk342342;$23423',
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
