/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */

// const withNextIntl = require('next-intl/plugin')('./i18n/i18n.ts');

// module.exports = withNextIntl({});

// import nextIntl from 'next-intl/plugin';

// const withNextIntl = nextIntl('./i18n/i18n.ts');

// export default withNextIntl({});
