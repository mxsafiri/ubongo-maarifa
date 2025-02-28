import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  image?: string
  stats?: {
    label: string
    value: string | number
  }[]
}

export default function FeatureCard({
  title,
  description,
  icon,
  image,
  stats,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {image && (
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
              {icon}
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
        {stats && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
