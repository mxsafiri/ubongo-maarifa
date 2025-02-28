import { motion } from 'framer-motion'

interface HeroProps {
  title: string
  subtitle: string
  image?: string
}

export default function Hero({ title, subtitle, image }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl tracking-tight font-display font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
              >
                <span className="block">{title}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
              >
                {subtitle}
              </motion.p>
            </div>
          </main>
        </div>
      </div>
      {image && (
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={image}
            alt=""
          />
        </div>
      )}
    </div>
  )
}
