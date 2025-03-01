import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  HomeIcon,
  UserIcon,
  Cog6ToothIcon as CogIcon,
  ArrowRightOnRectangleIcon as LogoutIcon,
  AcademicCapIcon,
  CheckBadgeIcon as BadgeCheckIcon,
  BookOpenIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon as ChatIcon,
  ClockIcon,
  DocumentTextIcon,
  BoltIcon as LightningBoltIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import ThemeToggle from '../ThemeToggle'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Learning Path', href: '/learning-path', icon: AcademicCapIcon },
  { name: 'Library', href: '/library', icon: BookOpenIcon },
  { name: 'Progress', href: '/progress', icon: ChartBarIcon },
  { name: 'Community', href: '/community', icon: UserIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  const isCurrentPath = (path: string) => {
    return router.pathname === path
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="fixed left-0 top-0 z-40 hidden h-screen w-64 transform flex-col justify-between border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-800 dark:bg-gray-900 lg:flex">
        {/* Logo and Navigation */}
        <div>
          <div className="flex h-16 items-center justify-between px-6">
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white"
            >
              <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                Maarifa AI
              </span>
            </Link>
          </div>
          <nav className="space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = isCurrentPath(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-0 h-full w-1 rounded-r-lg bg-primary-500"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 transition-colors ${
                      isActive
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300'
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <Link
          href="/"
          className="text-lg font-bold text-gray-900 dark:text-white"
        >
          Maarifa AI
        </Link>
        <ThemeToggle />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 z-50 h-full w-64 bg-white p-4 shadow-xl dark:bg-gray-900"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className="text-lg font-bold text-gray-900 dark:text-white"
                  >
                    Maarifa AI
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <nav className="mt-8 space-y-1">
                  {navigation.map((item) => {
                    const isActive = isCurrentPath(item.href)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50'
                        }`}
                      >
                        <item.icon
                          className={`h-5 w-5 flex-shrink-0 transition-colors ${
                            isActive
                              ? 'text-primary-600 dark:text-primary-400'
                              : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300'
                          }`}
                        />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
