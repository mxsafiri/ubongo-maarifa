import { motion, Variants } from 'framer-motion'

const circleVariants: Variants = {
  start: {
    y: '0%'
  },
  bounce: {
    y: ['0%', '-50%', '0%'],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  }
}

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <motion.div
        variants={circleVariants}
        initial="start"
        animate="bounce"
        className="h-3 w-3 rounded-full bg-primary"
      />
      <motion.div
        variants={circleVariants}
        initial="start"
        animate="bounce"
        transition={{ delay: 0.2 }}
        className="h-3 w-3 rounded-full bg-primary"
      />
      <motion.div
        variants={circleVariants}
        initial="start"
        animate="bounce"
        transition={{ delay: 0.4 }}
        className="h-3 w-3 rounded-full bg-primary"
      />
    </div>
  )
}
