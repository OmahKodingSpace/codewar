import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

// Base Next.js configuration
const baseConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      }
    ]
  },
  transpilePackages: ['geist']
};

// Only "true"/"1" disable Sentry — a plain env string like "false" is truthy in JS,
// so compare by value instead of testing presence.
const sentryDisabled = ['1', 'true'].includes(
  (process.env.NEXT_PUBLIC_SENTRY_DISABLED ?? '').trim().toLowerCase()
);

// Skip Sentry entirely when explicitly disabled (e.g. local dev)
const nextConfig = sentryDisabled
  ? baseConfig
  : withSentryConfig(baseConfig, {
      // For all available options, see:
      // https://www.npmjs.com/package/@sentry/webpack-plugin#options
      org: process.env.NEXT_PUBLIC_SENTRY_ORG,
      project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,

      // Source map upload auth token (build-time secret)
      authToken: process.env.SENTRY_AUTH_TOKEN,

      // Only print logs for uploading source maps in CI
      silent: !process.env.CI,

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
      // Middleware already whitelists /monitoring so client error reporting is not blocked.
      tunnelRoute: '/monitoring',

      // Disable Sentry telemetry
      telemetry: false,

      // Webpack-only build options (ignored under Turbopack). Nested form replaces the
      // deprecated top-level reactComponentAnnotation / disableLogger keys.
      webpack: {
        // Annotate React components in the DOM for easier debugging
        reactComponentAnnotation: {
          enabled: true
        },
        treeshake: {
          // Tree-shake Sentry logger statements to reduce bundle size
          removeDebugLogging: true
        }
      }
    });

export default nextConfig;
