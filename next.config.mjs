/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/api/stripe_webhooks",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "POST" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: [{
                loader: '@svgr/webpack',
                options: {
                    dimensions: false
                }
            }],
        });
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'test.upro.space',
            },
        ]
    },
    reactStrictMode: false,
    // experimental: {
    //     typedRoutes: true
    // }
};

export default nextConfig;
