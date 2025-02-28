import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HomeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  UserCircleIcon,
  CogIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PageTransition from './PageTransition'
import ThemeToggle from '../ThemeToggle'
import { useTheme } from '@/context/ThemeContext'

interface NavItem {
  name: string
  href: string
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Activities', href: '/activities', icon: AcademicCapIcon },
  { name: 'Library', href: '/library', icon: BookOpenIcon },
  { name: 'Progress', href: '/progress', icon: ChartBarIcon },
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.nav
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed inset-y-0 left-0 z-40 w-64 flex-shrink-0 overflow-y-auto bg-white dark:bg-gray-800"
            >
              <div className="flex h-16 flex-shrink-0 items-center px-6">
                <img className="h-8 w-auto" src="/logo.svg" alt="Indaba" />
              </div>
              <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">
                <nav className="flex-1 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                        router.pathname === item.href
                          ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-6 w-6 flex-shrink-0 ${
                          router.pathname === item.href
                            ? 'text-gray-500 dark:text-gray-300'
                            : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                        }`}
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-16 flex-shrink-0 items-center px-6">
            <img className="h-8 w-auto" src="/logo.svg" alt="Indaba" />
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                    router.pathname === item.href
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-6 w-6 flex-shrink-0 ${
                      router.pathname === item.href
                        ? 'text-gray-500 dark:text-gray-300'
                        : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow dark:bg-gray-800">
          <button
            type="button"
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="flex flex-1 items-center justify-between px-4">
            <div className="flex flex-1">
              {/* Add search or other header content here */}
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Add notifications, profile dropdown, etc. here */}
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{
              backgroundColor: theme === 'dark' ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)',
            }}
            className="rounded-lg shadow-sm"
          >
            <PageTransition>
              {children}
            </PageTransition>
          </motion.div>
        </main>
      </div>
      <div className="fixed bottom-6 right-6">
        <ThemeToggle />
      </div>
    </div>
  )
}
