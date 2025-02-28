import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

interface CarouselProps {
  items: {
    id: number
    title: string
    description: string
    image: string
    testimonial?: string
    author?: string
    role?: string
  }[]
}

export default function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [items.length])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex >= items.length) nextIndex = 0
      if (nextIndex < 0) nextIndex = items.length - 1
      return nextIndex
    })
  }

  return (
    <div className="relative h-[600px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
          className="absolute inset-0"
        >
          <div className="relative h-full">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${items[currentIndex].image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative flex h-full items-center justify-center px-4">
              <div className="max-w-4xl text-center text-white">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  {items[currentIndex].title}
                </h2>
                <p className="mt-4 text-xl">
                  {items[currentIndex].description}
                </p>
                {items[currentIndex].testimonial && (
                  <blockquote className="mt-8">
                    <p className="italic">"{items[currentIndex].testimonial}"</p>
                    <footer className="mt-4">
                      <p className="font-semibold">{items[currentIndex].author}</p>
                      <p className="text-sm opacity-75">{items[currentIndex].role}</p>
                    </footer>
                  </blockquote>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30"
        onClick={() => paginate(-1)}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30"
        onClick={() => paginate(1)}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}
