import { motion } from 'framer-motion'
import { SunIcon, MoonIcon } from '@heroicons/react/outline'
import { useTheme } from '@/context/ThemeContext'

const iconVariants = {
  initial: { scale: 0.6, rotate: -90 },
  animate: { scale: 1, rotate: 0, transition: { duration: 0.3 } },
  exit: { scale: 0.6, rotate: 90, transition: { duration: 0.3 } },
}

const containerVariants = {
  light: {
    backgroundColor: '#f3f4f6',
    transition: { duration: 0.3 },
  },
  dark: {
    backgroundColor: '#374151',
    transition: { duration: 0.3 },
  },
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
      variants={containerVariants}
      animate={theme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={iconVariants}
        key={theme === 'dark' ? 'dark' : 'light'}
      >
        {theme === 'dark' ? (
          <MoonIcon className="h-5 w-5 text-indigo-400" />
        ) : (
          <SunIcon className="h-5 w-5 text-amber-400" />
        )}
      </motion.div>
      <motion.div
        className="absolute h-full w-full rounded-lg"
        animate={{
          boxShadow: theme === 'dark'
            ? '0 0 8px rgba(139, 92, 246, 0.3)'
            : '0 0 8px rgba(251, 191, 36, 0.3)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
