/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Netlify
  output: 'export',
  reactStrictMode: true,
  env: {
    APP_NAME: 'Maarifa AI',
    APP_DESCRIPTION: 'The AI Backbone for Holistic Training and Development. Empowering educators and learners with AI-powered guidance, content, and personalized learning experiences.',
    APP_TAGLINE: 'Your AI-Powered Learning Companion'
  },
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },
  // Add trailingSlash for better compatibility with Netlify
  trailingSlash: true,
}

module.exports = nextConfig
