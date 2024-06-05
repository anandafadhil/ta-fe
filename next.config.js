/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/',
            },
            {
                source: '/statisticpage',
                destination: '/statisticpage',
            },
        ];
    },
};
export default nextConfig;
