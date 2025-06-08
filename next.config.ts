/**
 * Next.js Configuration
 *
 * Security:
 * - CSP Headers for secure asset loading and script execution
 * - Strict CORS and transport security policies
 * - Frame protection and XSS prevention
 *
 * Assets & Media:
 * - Optimized image handling with WebP and AVIF support
 * - Remote patterns: only https for external resources
 *
 * Development & Production:
 * - Strict mode enabled
 * - Console cleanup in production
 * - Styled-components support
 *
 * Note: Some features are commented out but ready for:
 * - Webpack customization
 * - Redirects and rewrites
 */

import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {}, // Server actions
    optimizeCss: true, // CSS Optimization
  },

  images: {
    formats: [
      // https://nextjs.org/docs/app/api-reference/components/image#formats
      'image/avif',
      'image/webp',
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'minio',
        port: '9000',
        pathname: '/**',
      },
    ],
  },

  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value:
              process.env.NODE_ENV === 'development'
                ? [
                    "default-src 'self'",
                    "script-src 'self' 'unsafe-eval' 'unsafe-inline' 'wasm-unsafe-eval'",
                    "img-src 'self' https: data: blob: http://localhost:3000",
                    "connect-src 'self' ws: wss:",
                    "media-src 'self' blob:",
                    "frame-ancestors 'none'",
                    "base-uri 'self'",
                    "form-action 'self'",
                    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                    "font-src 'self' https://fonts.gstatic.com",
                  ].join('; ')
                : [
                    "default-src 'self'",
                    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
                    "img-src 'self' https: data: blob:",
                    "connect-src 'self' ws: wss:",
                    "media-src 'self' blob:",
                    "frame-ancestors 'none'",
                    "base-uri 'self'",
                    "form-action 'self'",
                    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                    "font-src 'self' https://fonts.gstatic.com",
                  ].join('; '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },

  //TODO: Redirections
  // redirects: async () => {
  //   return [];
  // },

  //TODO: Rewrites
  // rewrites: async () => {
  //   return [];
  // },

  //TODO: Configure webpack
  // webpack: (config, { isServer }) => {
  //     // Phaser shaders support
  //     config.module.rules.push({
  //       test: /\.(glsl|vs|fs|vert|frag)$/,
  //       exclude: /node_modules/,
  //       use: ['raw-loader'],
  //     });
  //     // Phaser audio assets support
  //     config.module.rules.push({
  //       test: /\.(ogg|mp3|wav|mpe?g)$/i,
  //       exclude: config.exclude,
  //       use: {
  //         loader: 'file-loader',
  //         options: {
  //           publicPath: '/_next/static/',
  //           outputPath: 'static/',
  //           name: '[name].[hash].[ext]',
  //         },
  //       },
  //     });
  //     return config;
  //   },
};

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
export default withNextIntl({
  ...nextConfig,
  env: { JWT_SECRET: process.env.JWT_SECRET },
});
