import { motion } from 'framer-motion'
import AppLayout from '@/components/layout/AppLayout'
import {
  AcademicCapIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon,
  UserGroupIcon,
  LightBulbIcon,
  ChevronRightIcon,
  BookOpenIcon,
  UserAddIcon,
  CalendarIcon,
  ChatIcon,
  CogIcon,
  DocumentReportIcon,
  PuzzleIcon,
} from '@heroicons/react/outline'
import QuickAction from '@/components/dashboard/QuickAction'

const stats = [
  {
    name: 'Active Activities',
    value: '12',
    icon: AcademicCapIcon,
    change: '+3 this week',
    changeType: 'positive',
  },
  {
    name: 'Students Impacted',
    value: '156',
    icon: UserGroupIcon,
    change: '+28 this month',
    changeType: 'positive',
  },
  {
    name: 'Hours of Teaching',
    value: '45.5',
    icon: ClockIcon,
    change: '+12.5 this week',
    changeType: 'positive',
  },
  {
    name: 'Olympic Values Covered',
    value: '8',
    icon: LightBulbIcon,
    change: '+2 this month',
    changeType: 'positive',
  },
]

const recentActivities = [
  {
    id: 1,
    name: 'Fair Play in Sports',
    description: 'Teaching Olympic values through interactive games',
    date: '3 days ago',
    status: 'Completed',
    statusColor: 'green',
  },
  {
    id: 2,
    name: 'Team Building Exercise',
    description: 'Group activities focusing on collaboration',
    date: '5 days ago',
    status: 'In Progress',
    statusColor: 'blue',
  },
  {
    id: 3,
    name: 'Olympic History',
    description: 'Interactive timeline of Olympic achievements',
    date: '1 week ago',
    status: 'Completed',
    statusColor: 'green',
  },
]

const quickActions = [
  {
    title: 'Create New Activity',
    description: 'Design and set up a new Olympic-themed educational activity',
    href: '/activities/new',
    icon: AcademicCapIcon,
    color: 'primary',
  },
  {
    title: 'Browse Resources',
    description: 'Access Olympic education materials and teaching guides',
    href: '/library',
    icon: BookOpenIcon,
    color: 'blue',
  },
  {
    title: 'Track Progress',
    description: 'Monitor student engagement and learning outcomes',
    href: '/progress',
    icon: ChartBarIcon,
    color: 'green',
  },
  {
    title: 'Manage Students',
    description: 'Add, remove, or organize student groups',
    href: '/students',
    icon: UserAddIcon,
    color: 'purple',
  },
  {
    title: 'Schedule Sessions',
    description: 'Plan and organize upcoming Olympic education sessions',
    href: '/calendar',
    icon: CalendarIcon,
    color: 'primary',
  },
  {
    title: 'Community Chat',
    description: 'Connect with other Olympic educators worldwide',
    href: '/community',
    icon: ChatIcon,
    color: 'blue',
  },
  {
    title: 'Generate Reports',
    description: 'Create detailed reports on student progress and activities',
    href: '/reports',
    icon: DocumentReportIcon,
    color: 'green',
  },
  {
    title: 'Interactive Games',
    description: 'Access Olympic-themed educational games and activities',
    href: '/games',
    icon: PuzzleIcon,
    color: 'purple',
  },
]

export default function Dashboard() {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Welcome back, Teacher
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Here's what's happening with your Olympic education activities
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div
                  className={`text-sm ${
                    stat.changeType === 'positive'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Recent Activities
              </h3>
              <div className="mt-6 flow-root">
                <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                  {recentActivities.map((activity) => (
                    <li key={activity.id} className="py-5">
                      <div className="relative focus-within:ring-2 focus-within:ring-primary-500">
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                          {activity.name}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {activity.date}
                          </span>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              activity.statusColor === 'green'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            }`}
                          >
                            {activity.status}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <a
                  href="/activities"
                  className="flex items-center justify-center text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  View all activities
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Quick Actions
                </h3>
                <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                  Customize
                </button>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4">
                {quickActions.map((action) => (
                  <QuickAction
                    key={action.title}
                    icon={action.icon}
                    title={action.title}
                    description={action.description}
                    href={action.href}
                    color={action.color}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AppLayout>
  )
}
