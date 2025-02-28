import { motion } from 'framer-motion'
import {
  BeakerIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  UserGroupIcon,
  BadgeCheckIcon as TrophyIcon,
  LightningBoltIcon as BoltIcon,
  ChatIcon as ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/outline'

const features = [
  {
    name: 'Olympic Values',
    description:
      'Learn about excellence, respect, and friendship through interactive lessons and real-world examples.',
    icon: TrophyIcon,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    name: 'Interactive Learning',
    description:
      'Engage with multimedia content, quizzes, and hands-on activities designed for different learning styles.',
    icon: BoltIcon,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    name: 'Global Community',
    description:
      'Connect with educators and students worldwide, sharing experiences and best practices.',
    icon: UserGroupIcon,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    name: 'Resource Library',
    description:
      'Access a vast collection of Olympic-themed educational materials, lesson plans, and activities.',
    icon: BookOpenIcon,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  {
    name: 'AI-Powered Learning',
    description:
      'Experience personalized learning paths and recommendations powered by advanced AI technology.',
    icon: BeakerIcon,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
  {
    name: 'Mentorship',
    description:
      'Get guidance from experienced educators and Olympic athletes through our mentorship program.',
    icon: ChatBubbleBottomCenterTextIcon,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function FeatureGrid() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to succeed
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Discover the tools and resources that will help you bring Olympic values to life in your
            classroom.
          </p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24"
        >
          <dl className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                variants={item}
                className="relative group"
              >
                <div
                  className={`absolute -inset-y-6 -inset-x-4 z-0 scale-95 ${feature.bg} opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl`}
                />
                <div className="relative z-10">
                  <dt className="flex gap-x-3">
                    <feature.icon
                      className={`h-7 w-7 ${feature.color}`}
                      aria-hidden="true"
                    />
                    <span className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                      {feature.name}
                    </span>
                  </dt>
                  <dd className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </dd>
                </div>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  )
}
