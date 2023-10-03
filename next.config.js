/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL || "https://austinhowardapi.azurewebsites.net/api/v1",
    ENV: 'production',
    // ENV: "development",
  },
  images: {
    domains: ["austinhoward.dev", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
