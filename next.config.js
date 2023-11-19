/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  reactStrictMode: false,

  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
    
  env: {
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
  },
}

module.exports = nextConfig