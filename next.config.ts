import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "~/exercises/*": "./public/exercises/*",
    },
    rules: {
      "*.svg": {
        condition: { query: "?raw" },
        type: "raw",
      },
    },
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "~/exercises": "./public/exercises",
    };

    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /raw/,
      type: "asset/source",
    });

    return config;
  },
};

const withNextIntl = createNextIntlPlugin(
  './localization/i18n/request.ts'
);
export default withNextIntl(nextConfig);
