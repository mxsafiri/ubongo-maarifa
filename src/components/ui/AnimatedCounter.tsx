import { useEffect, useRef } from 'react'
import { useInView, motion, useAnimation } from 'framer-motion'

interface AnimatedCounterProps {
  start: number
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  title: string
  description: string
}

export default function AnimatedCounter({
  start = 0,
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  title,
  description,
}: AnimatedCounterProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const counterRef = useRef(start)

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      })

      const updateCounter = () => {
        const progress = Math.min(1, (Date.now() - startTime) / (duration * 1000))
        const currentCount = Math.floor(start + (end - start) * progress)
        counterRef.current = currentCount

        if (progress < 1) {
          requestAnimationFrame(updateCounter)
        }
      }

      const startTime = Date.now()
      requestAnimationFrame(updateCounter)
    }
  }, [isInView, start, end, duration, controls])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="text-center"
    >
      <motion.div
        className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl"
        key={counterRef.current}
      >
        {prefix}
        {counterRef.current}
        {suffix}
      </motion.div>
      <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </motion.div>
  )
}
