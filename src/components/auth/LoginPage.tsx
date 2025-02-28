import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const router = useRouter()
  const { login, loading, error } = useAuth()
  const { code } = router.query

  useEffect(() => {
    if (code && typeof code === 'string') {
      handleOlympicLogin(code)
    }
  }, [code])

  const handleOlympicLogin = async (code: string) => {
    try {
      await login(code)
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  const initiateOlympicLogin = () => {
    const olympicAuthUrl = process.env.NEXT_PUBLIC_OLYMPIC_AUTH_URL
    const clientId = process.env.NEXT_PUBLIC_OLYMPIC_CLIENT_ID
    const redirectUri = `${window.location.origin}/auth/login`
    
    window.location.href = `${olympicAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.img
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto h-12 w-auto"
          src="/olympic-rings.svg"
          alt="Olympic Rings"
        />
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-center text-3xl font-extrabold text-gray-900"
        >
          Sign in to OVEP Platform
        </motion.h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error logging in
                  </h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={initiateOlympicLogin}
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Sign in with Olympic ID'
            )}
          </motion.button>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Protected by Olympic ID
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
