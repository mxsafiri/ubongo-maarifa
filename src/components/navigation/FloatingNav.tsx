import { motion } from 'framer-motion'
import {
  HomeIcon,
  BookOpenIcon,
  ChartBarIcon,
  AcademicCapIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navItems = [
  { href: '/', icon: HomeIcon, label: 'Home' },
  { href: '/library', icon: BookOpenIcon, label: 'Library' },
  { href: '/progress', icon: ChartBarIcon, label: 'Progress' },
  { href: '/learning-path', icon: AcademicCapIcon, label: 'Learning' },
  { href: '/profile', icon: UserIcon, label: 'Profile' },
]

export default function FloatingNav() {
  const router = useRouter()

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform"
    >
      <nav className="flex items-center space-x-2 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm dark:bg-gray-800/90">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative rounded-full p-2 transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 transform rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-700">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </motion.div>
  )
}
