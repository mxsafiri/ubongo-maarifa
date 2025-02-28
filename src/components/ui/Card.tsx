import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  title: string
  subtitle?: string
  image?: string
  color?: 'pink' | 'green' | 'blue'
  link?: string
  children?: ReactNode
}

export default function Card({
  title,
  subtitle,
  image,
  color = 'pink',
  link,
  children,
}: CardProps) {
  const bgColors = {
    pink: 'bg-pink-50',
    green: 'bg-green-50',
    blue: 'bg-blue-50',
  }

  const textColors = {
    pink: 'text-pink-600',
    green: 'text-green-600',
    blue: 'text-blue-600',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl overflow-hidden ${bgColors[color]}`}
    >
      {image && (
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-display font-semibold text-gray-900">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-2 text-base text-gray-600">{subtitle}</p>
        )}
        {children}
        {link && (
          <a
            href={link}
            className={`mt-4 inline-flex items-center ${textColors[color]} hover:underline`}
          >
            Learn more
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  )
}
