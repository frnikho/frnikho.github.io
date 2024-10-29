import createNextIntlPlugin from "next-intl/plugin";
import {NextConfig} from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    }
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
