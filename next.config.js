/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
}

module.exports = nextConfig
