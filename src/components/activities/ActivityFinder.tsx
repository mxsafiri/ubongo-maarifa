import { useState } from 'react'
import { motion } from 'framer-motion'
import { SearchIcon, FilterIcon } from '@heroicons/react/outline'

interface Activity {
  id: string
  title: string
  description: string
  themes: string[]
  values: string[]
  learningOutcomes: string[]
  ageRange: string
  duration: string
  studentCount: string
  isFavorite: boolean
}

export default function ActivityFinder() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    theme: '',
    value: '',
    ageRange: '',
    duration: '',
  })
  const [activities, setActivities] = useState<Activity[]>([])

  const handleSearch = async () => {
    // TODO: Implement activity search logic
  }

  const toggleFavorite = (activityId: string) => {
    setActivities(
      activities.map((activity) =>
        activity.id === activityId
          ? { ...activity, isFavorite: !activity.isFavorite }
          : activity
      )
    )
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for activities..."
                className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <select
              className="rounded-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              value={filters.theme}
              onChange={(e) => setFilters({ ...filters, theme: e.target.value })}
            >
              <option value="">All Themes</option>
              {/* Add theme options */}
            </select>

            <select
              className="rounded-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              value={filters.value}
              onChange={(e) => setFilters({ ...filters, value: e.target.value })}
            >
              <option value="">All Values</option>
              {/* Add value options */}
            </select>

            <select
              className="rounded-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              value={filters.ageRange}
              onChange={(e) => setFilters({ ...filters, ageRange: e.target.value })}
            >
              <option value="">All Ages</option>
              {/* Add age range options */}
            </select>

            <select
              className="rounded-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              value={filters.duration}
              onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
            >
              <option value="">Any Duration</option>
              {/* Add duration options */}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {activity.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{activity.description}</p>
              </div>
              <button
                onClick={() => toggleFavorite(activity.id)}
                className={`rounded-full p-2 ${
                  activity.isFavorite
                    ? 'text-yellow-500 hover:text-yellow-600'
                    : 'text-gray-400 hover:text-gray-500'
                }`}
              >
                <svg
                  className="h-6 w-6"
                  fill={activity.isFavorite ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {activity.themes.map((theme) => (
                <span
                  key={theme}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {theme}
                </span>
              ))}
              {activity.values.map((value) => (
                <span
                  key={value}
                  className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  {value}
                </span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <span className="font-medium">Age Range:</span> {activity.ageRange}
              </div>
              <div>
                <span className="font-medium">Duration:</span> {activity.duration}
              </div>
              <div>
                <span className="font-medium">Students:</span> {activity.studentCount}
              </div>
            </div>

            <div className="mt-4">
              <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                View Activity
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
