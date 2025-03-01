import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface QuickActionProps {
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element
  title: string
  description: string
  href: string
  color?: string
}

export default function QuickAction({
  icon: Icon,
  title,
  description,
  href,
  color = 'primary',
}: QuickActionProps) {
  const [isHovered, setIsHovered] = useState(false)

  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  }

  return (
    <motion.a
      href={href}
      className="group relative flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`rounded-lg p-2 transition-colors ${
            colorClasses[color as keyof typeof colorClasses]
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <motion.div
        animate={{ x: isHovered ? 5 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <ChevronRightIcon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300" />
      </motion.div>

      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 transform">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          className="rounded-md bg-gray-900 px-3 py-1 text-sm text-white shadow-lg dark:bg-gray-700"
        >
          {description}
        </motion.div>
      </div>
    </motion.a>
  )
}
