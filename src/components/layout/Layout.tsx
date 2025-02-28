import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Navigation from './Navigation'
import Footer from './Footer'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-gray-900 transition-colors dark:bg-gray-900 dark:text-white">
      <Navigation />
      <div className="lg:pl-64">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen px-4 pt-20 pb-12 sm:px-6 lg:px-8 lg:pt-8"
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </div>
  )
}
