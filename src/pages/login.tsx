import { motion } from 'framer-motion'
import Head from 'next/head'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login - Maarifa AI</title>
        <meta
          name="description"
          content="Log in to access our comprehensive educational resources and activities"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img className="mx-auto h-12 w-auto" src="/logo-white.svg" alt="Indaba" />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                Welcome to Maarifa AI
              </h2>
              <p className="mt-2 text-center text-sm text-gray-200">
                Interactive Learning Platform
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <LoginForm />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
