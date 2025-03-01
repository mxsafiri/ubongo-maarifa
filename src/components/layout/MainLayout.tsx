import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ThemeProvider } from '../providers/ThemeProvider'
import { GlassCard } from '../ui/design-system/GlassCard'

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
    <ThemeProvider>
      {/* Header */}
      <header className="fixed top-0 z-40 w-full">
        <GlassCard className="m-4 flex h-14 items-center px-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 rounded-md p-2 text-white/80 hover:bg-white/10"
          >
            {isSidebarOpen ? '←' : '→'}
          </button>
          
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="font-display text-xl font-bold text-white">Maarifa AI</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="rounded-full p-2 text-white/80 hover:bg-white/10">
                🔍
              </button>
              <button className="rounded-full p-2 text-white/80 hover:bg-white/10">
                🔔
              </button>
              <div className="h-8 w-8 rounded-full bg-white/20" />
            </div>
          </div>
        </GlassCard>
      </header>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-24 z-30 h-[calc(100vh-6rem)] w-64 px-4"
          >
            <GlassCard className="h-full">
              <nav className="space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      router.pathname === item.href
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <span role="img" aria-label={item.name}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </GlassCard>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={`min-h-[calc(100vh-4rem)] transition-all duration-200 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        } pt-24`}
      >
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </ThemeProvider>
  )
}
