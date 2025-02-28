import { motion } from 'framer-motion'
import AppLayout from '@/components/layout/AppLayout'
import {
  LightBulbIcon,
  UserIcon,
  AcademicCapIcon,
  ClockIcon,
  TagIcon,
  ChartBarIcon,
  FilterIcon,
  AdjustmentsIcon,
} from '@heroicons/react/outline'
import { useState } from 'react'

interface Activity {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  category: string
  tags: string[]
  aiRecommended: boolean
  matchScore: number
  learningStyle: string
}

const activities: Activity[] = [
  {
    id: '1',
    title: 'Olympic Values in Daily Life',
    description: 'Interactive workshop exploring how Olympic values apply to everyday situations',
    difficulty: 'Beginner',
    duration: '45 mins',
    category: 'Values Education',
    tags: ['Interactive', 'Group Activity', 'Values'],
    aiRecommended: true,
    matchScore: 95,
    learningStyle: 'Visual-Interactive',
  },
  {
    id: '2',
    title: 'Sports Leadership Challenge',
    description: 'Team-based activity developing leadership skills through sports scenarios',
    difficulty: 'Intermediate',
    duration: '60 mins',
    category: 'Leadership',
    tags: ['Team Building', 'Leadership', 'Problem Solving'],
    aiRecommended: true,
    matchScore: 88,
    learningStyle: 'Kinesthetic',
  },
  // Add more activities as needed
]

const categories = ['Values Education', 'Leadership', 'Team Building', 'Ethics', 'Sports History']
const learningStyles = ['Visual', 'Auditory', 'Kinesthetic', 'Reading/Writing']
const difficulties = ['Beginner', 'Intermediate', 'Advanced']

export default function PersonalizedActivity() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStyle, setSelectedStyle] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [showAiRecommended, setShowAiRecommended] = useState(true)

  const filteredActivities = activities.filter((activity) => {
    if (showAiRecommended && !activity.aiRecommended) return false
    if (selectedCategory !== 'all' && activity.category !== selectedCategory) return false
    if (selectedStyle !== 'all' && !activity.learningStyle.includes(selectedStyle)) return false
    if (selectedDifficulty !== 'all' && activity.difficulty !== selectedDifficulty) return false
    return true
  })

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
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Personalized Activities
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                AI-powered recommendations based on your teaching style and preferences
              </p>
            </div>
            <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
              Create New Activity
            </button>
          </div>

          {/* Filters */}
          <div className="mt-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedStyle('all')
                  setSelectedDifficulty('all')
                }}
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                Reset All
              </button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="all">All Learning Styles</option>
                {learningStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="all">All Difficulties</option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showAiRecommended}
                  onChange={(e) => setShowAiRecommended(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Show AI Recommended Only
                </span>
              </label>
            </div>
          </div>

          {/* Activities Grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredActivities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-lg dark:bg-gray-800"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        activity.aiRecommended
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {activity.aiRecommended ? 'AI Recommended' : 'Standard Activity'}
                    </span>
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {activity.matchScore}% Match
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {activity.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activity.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <ClockIcon className="mr-1.5 h-4 w-4" />
                        {activity.duration}
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <AcademicCapIcon className="mr-1.5 h-4 w-4" />
                        {activity.difficulty}
                      </span>
                    </div>
                    <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                      Start
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  )
}
