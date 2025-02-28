import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Head>
            <title>Maarifa AI | Ubongo</title>
            <meta name="description" content="Ubongo's AI-powered educational platform" />
          </Head>
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
