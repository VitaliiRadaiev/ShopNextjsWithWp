/** @type {import('next').NextConfig} */
const nextConfig = {
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
