import { motion } from 'framer-motion'
import AppLayout from '@/components/layout/AppLayout'
import {
  ArrowTrendingUpIcon as TrendingUpIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CalendarIcon,
  HomeIcon,
  UserIcon,
  Cog6ToothIcon as CogIcon,
  ArrowRightOnRectangleIcon as LogoutIcon,
  CheckBadgeIcon as BadgeCheckIcon,
  BookOpenIcon,
  ChatBubbleLeftIcon as ChatIcon,
  DocumentTextIcon,
  BoltIcon as LightningBoltIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

interface ProgressData {
  id: string
  student: string
  course: string
  progress: number
  lastActivity: string
  timeSpent: string
  status: 'completed' | 'in-progress' | 'not-started'
  score: number
}

const progressData: ProgressData[] = [
  {
    id: '1',
    student: 'Alex Johnson',
    course: 'Values and Ethics in Education',
    progress: 85,
    lastActivity: '2 hours ago',
    timeSpent: '12h 30m',
    status: 'in-progress',
    score: 92,
  },
  {
    id: '2',
    student: 'Maria Garcia',
    course: 'Sports Leadership',
    progress: 100,
    lastActivity: '1 day ago',
    timeSpent: '15h 45m',
    status: 'completed',
    score: 95,
  },
  // Add more progress data as needed
]

const stats = [
  {
    name: 'Average Progress',
    value: '78%',
    icon: ChartBarIcon,
    change: '+12%',
    changeType: 'positive',
  },
  {
    name: 'Active Students',
    value: '156',
    icon: UserGroupIcon,
    change: '+23',
    changeType: 'positive',
  },
  {
    name: 'Completion Rate',
    value: '92%',
    icon: CheckCircleIcon,
    change: '+5%',
    changeType: 'positive',
  },
  {
    name: 'Avg. Time per Course',
    value: '14h',
    icon: ClockIcon,
    change: '-2h',
    changeType: 'negative',
  },
]

export default function Progress() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('progress')

  const filteredData = progressData
    .filter((item) => selectedStatus === 'all' || item.status === selectedStatus)
    .sort((a, b) => {
      if (sortBy === 'progress') return b.progress - a.progress
      if (sortBy === 'score') return b.score - a.score
      return 0
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
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Progress Tracking</h1>
            <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
              Export Report
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
                      stat.changeType === 'positive'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {stat.changeType === 'positive' ? (
                      <TrendingUpIcon className="mr-1.5 h-4 w-4" />
                    ) : (
                      <ExclamationCircleIcon className="mr-1.5 h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">vs last month</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filters and Sort */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="not-started">Not Started</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="progress">Sort by Progress</option>
                <option value="score">Sort by Score</option>
              </select>
            </div>
          </div>

          {/* Progress Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"
          >
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Time Spent
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {filteredData.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.1)' }}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
                            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                              {item.student.split(' ').map((n) => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.student}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">{item.course}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="w-full">
                        <div className="relative pt-1">
                          <div className="h-2 overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
                            <motion.div
                              className="h-2 rounded bg-primary-600"
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                            />
                          </div>
                          <div className="mt-1 text-right text-xs font-semibold text-gray-600 dark:text-gray-400">
                            {item.progress}%
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">{item.score}%</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.lastActivity}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.timeSpent}</div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  )
}
