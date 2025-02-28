import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ParallaxHeroProps {
  title: string
  subtitle: string
  image: string
}

export default function ParallaxHero({ title, subtitle, image }: ParallaxHeroProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </motion.div>

      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-white">
        <div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-xl text-gray-200"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex justify-center gap-x-6"
          >
            <a
              href="/library"
              className="rounded-full bg-primary px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="rounded-full bg-white/10 px-8 py-3 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
