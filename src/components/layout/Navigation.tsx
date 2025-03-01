'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Lessons', href: '/lessons' },
  { name: 'Students', href: '/students' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 z-40 w-full border-b border-gray-800 bg-[#0A1017]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-semibold text-white">
            ECD Platform
          </Link>
          
          <nav className="hidden md:flex md:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
