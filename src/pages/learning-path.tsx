import { motion } from 'framer-motion'
import AppLayout from '@/components/layout/AppLayout'
import {
  AcademicCapIcon,
  ArrowRightIcon,
  LockClosedIcon,
  StarIcon,
  ChevronRightIcon,
  CheckIcon,
  BookOpenIcon,
  ClockIcon,
  UserIcon,
  Cog6ToothIcon as CogIcon,
  ArrowRightOnRectangleIcon as LogoutIcon,
  CheckBadgeIcon as BadgeCheckIcon,
  ChatBubbleLeftIcon as ChatIcon,
  DocumentTextIcon,
  BoltIcon as LightningBoltIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

interface Module {
  id: string
  title: string
  description: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  status: 'completed' | 'in-progress' | 'locked'
  progress: number
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  prerequisites: string[]
  skills: string[]
}

const modules: Module[] = [
  {
    id: '1',
    title: 'Educational Foundations',
    description: 'Learn the fundamental principles of effective teaching and learning',
    duration: '4 weeks',
    level: 'Beginner',
    status: 'completed',
    progress: 100,
    icon: AcademicCapIcon,
    prerequisites: [],
    skills: ['Teaching Methods', 'Core Values', 'Ethics in Education'],
  },
  {
    id: '2',
    title: 'Educational Leadership',
    description: 'Develop leadership skills through innovative education',
    duration: '6 weeks',
    level: 'Intermediate',
    status: 'in-progress',
    progress: 60,
    icon: ChevronRightIcon,
    prerequisites: ['Educational Foundations'],
    skills: ['Leadership', 'Team Management', 'Communication'],
  },
  {
    id: '3',
    title: 'Advanced Teaching Studies',
    description: 'Deep dive into modern educational practices and their impact',
    duration: '8 weeks',
    level: 'Advanced',
    status: 'locked',
    progress: 0,
    icon: LockClosedIcon,
    prerequisites: ['Educational Leadership'],
    skills: ['Research', 'Analysis', 'Strategic Planning'],
  },
]

const stats = [
  {
    name: 'Completion Rate',
    value: '85%',
    icon: ChevronRightIcon,
    change: '+12%',
    trend: 'up',
  },
  {
    name: 'Active Modules',
    value: '3',
    icon: AcademicCapIcon,
    change: '+1',
    trend: 'up',
  },
  {
    name: 'Time Invested',
    value: '45h',
    icon: ClockIcon,
    change: '+5h',
    trend: 'up',
  },
  {
    name: 'Skills Mastered',
    value: '12',
    icon: StarIcon,
    change: '+3',
    trend: 'up',
  },
]

export default function LearningPath() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all')

  const filteredModules = modules.filter(
    (module) => selectedLevel === 'all' || module.level.toLowerCase() === selectedLevel.toLowerCase()
  )

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Learning Path</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Your personalized journey through interactive education
              </p>
            </div>
            <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
              Download Certificate
            </button>
          </div>

          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800"
              >
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
                    <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div
                    className={`inline-flex items-center text-sm ${
                      stat.trend === 'up'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {stat.trend === 'up' ? '+' : '-'} {stat.change}
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">vs last month</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Level Filter */}
          <div className="mt-8 flex items-center space-x-4">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Modules */}
          <div className="mt-8 space-y-8">
            {filteredModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800 ${
                  module.status === 'locked' ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
                      <module.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="flex items-center text-lg font-medium text-gray-900 dark:text-white">
                        {module.title}
                        {module.status === 'locked' && (
                          <LockClosedIcon className="ml-2 h-4 w-4 text-gray-400" />
                        )}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {module.description}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                          {module.level}
                        </span>
                        <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <ClockIcon className="mr-1.5 h-4 w-4" />
                          {module.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  {module.status !== 'locked' && (
                    <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                      {module.status === 'completed' ? 'Review' : 'Continue'}
                    </button>
                  )}
                </div>

                {/* Progress Bar */}
                {module.status !== 'locked' && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {module.progress}%
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <motion.div
                          className="h-2 rounded-full bg-primary-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${module.progress}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Skills</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {module.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                {module.prerequisites.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Prerequisites
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {module.prerequisites.map((prereq) => (
                        <span
                          key={prereq}
                          className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        >
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  )
}
