import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: '📊',
    },
    {
      name: 'Content Library',
      href: '/content-library',
      icon: '📚',
    },
    {
      name: 'AI Assistants',
      href: '/ai-assistants',
      icon: '🤖',
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: '📈',
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: '⚙️',
    },
  ]

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      {/* Header */}
      <header className="fixed top-0 z-40 w-full border-b border-surface-200 bg-white/80 backdrop-blur-sm dark:border-surface-700 dark:bg-surface-800/80">
        <div className="flex h-16 items-center px-4 sm:px-6">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 rounded-md p-2 text-surface-500 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800"
          >
            {isSidebarOpen ? '←' : '→'}
          </button>
          
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="font-display text-xl font-bold">Maarifa AI</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="rounded-full bg-surface-100 p-2 text-surface-500 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700">
                🔍
              </button>
              <button className="rounded-full bg-surface-100 p-2 text-surface-500 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700">
                🔔
              </button>
              <div className="h-8 w-8 rounded-full bg-primary-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-800"
          >
            <nav className="space-y-1 p-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    router.pathname === item.href
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800'
                  }`}
                >
                  <span role="img" aria-label={item.name}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={`min-h-[calc(100vh-4rem)] transition-all duration-200 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        } pt-16`}
      >
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  )
}
