import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Head from 'next/head'
import { MainLayout } from '@/components/layout/MainLayout'

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Head>
            <title>Maarifa AI | The AI Backbone for Education</title>
            <meta name="description" content="Empowering educators and learners with AI-powered guidance, content, and personalized learning experiences. Your AI-powered learning companion." />
            <meta name="keywords" content="AI education, personalized learning, educational technology, teacher tools, AI tutoring, Ubongo, African education" />
            <meta property="og:title" content="Maarifa AI | The AI Backbone for Education" />
            <meta property="og:description" content="Empowering educators and learners with AI-powered guidance, content, and personalized learning experiences." />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Maarifa AI | The AI Backbone for Education" />
            <meta name="twitter:description" content="Your AI-powered learning companion from Ubongo." />
          </Head>
          <MainLayout>
            <main className={inter.className}>
              <Component {...pageProps} />
            </main>
          </MainLayout>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
