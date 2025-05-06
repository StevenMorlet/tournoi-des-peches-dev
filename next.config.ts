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

const nextConfig = {
   // React strict mode
   reactStrictMode: true,

   // Enable experimental features
   experimental: {
      serverActions: {}, // Server actions
      optimizeCss: true, // CSS Optimization
   },

   // Configure image optimization
   images: {
      formats: [
         // https://nextjs.org/docs/app/api-reference/components/image#formats
         'image/avif',
         'image/webp',
      ],
      remotePatterns: [
         //TODO: Add remote patterns for external images
         // https://nextjs.org/docs/app/api-reference/components/image#remotepatterns
         {
            protocol: 'https',
            hostname: '**',
         },
      ],
      localPatterns: [
         //TODO: Add local patterns for internal images
         // https://nextjs.org/docs/app/api-reference/components/image#localpatterns
      ],
   },

   // Configure headers for security
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
                             "img-src 'self' https: data: blob:",
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
                             "require-trusted-types-for 'script'",
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
      ]
   },

   // Configure compiler options
   compiler: {
      // Remove console logs and warns in production
      removeConsole: process.env.NODE_ENV === 'production',
      // Support styled components
      styledComponents: true,
   },

   //TODO: i18n (internationalization) config
   // For App Router, internationalization is handled through the app directory structure
   // See: https://nextjs.org/docs/app/building-your-application/routing/internationalization

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
}

export default nextConfig
