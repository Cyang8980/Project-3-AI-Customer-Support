/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        META_API_URL: process.env.META_API_URL,
        META_API_KEY: process.env.META_API_KEY,
        MODEL_ID: process.env.MODEL_ID
    }
};

export default nextConfig;
