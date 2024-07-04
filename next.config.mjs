/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        KV_URL: process.env.KV_URL,
        KV_REST_API_URL: process.env.KV_REST_API_URL,
        KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
        KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
        ADMIN_USERNAME: process.env.ADMIN_USERNAME,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        GAME_NAME: process.env.GAME_NAME,
    }
};

export default nextConfig;
