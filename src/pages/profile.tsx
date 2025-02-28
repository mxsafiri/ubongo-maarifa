import Layout from '@/components/layout/Layout'
import { motion } from 'framer-motion'
import {
  UserIcon as UserCircleIcon,
  AcademicCapIcon,
  BadgeCheckIcon as TrophyIcon,
  ChartBarIcon,
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
} from '@heroicons/react/outline'

const achievements = [
  {
    id: 1,
    name: 'Quick Learner',
    description: 'Completed 5 courses in one month',
    date: 'Earned on Feb 15, 2025',
    icon: TrophyIcon,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 2,
    name: 'AI Master',
    description: 'Achieved excellence in AI specialization',
    date: 'Earned on Jan 30, 2025',
    icon: ChartBarIcon,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 3,
    name: 'Coding Expert',
    description: 'Completed advanced programming track',
    date: 'Earned on Jan 15, 2025',
    icon: AcademicCapIcon,
    color: 'from-blue-500 to-cyan-500',
  },
]

const settings = [
  {
    id: 'account',
    name: 'Account Settings',
    description: 'Manage your account details and preferences',
    icon: UserCircleIcon,
    href: '/settings/account',
  },
  {
    id: 'notifications',
    name: 'Notifications',
    description: 'Configure your notification preferences',
    icon: BellIcon,
    href: '/settings/notifications',
  },
  {
    id: 'privacy',
    name: 'Privacy & Security',
    description: 'Manage your privacy and security settings',
    icon: ShieldCheckIcon,
    href: '/settings/privacy',
  },
  {
    id: 'preferences',
    name: 'Learning Preferences',
    description: 'Customize your learning experience',
    icon: CogIcon,
    href: '/settings/preferences',
  },
]

export default function Profile() {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
        {/* Header */}
        <div className="py-12">
          <div className="flex items-center space-x-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 ring-4 ring-white dark:ring-gray-700 shadow-lg"
            >
              <img
                src="/images/profile.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div>
              <motion.h1
                className="text-4xl font-semibold text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Sarah Johnson
              </motion.h1>
              <motion.p
                className="mt-2 text-lg text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                AI & Machine Learning Enthusiast
              </motion.p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <section className="py-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${achievement.color}`} />
                <div className="relative">
                  <achievement.icon className={`h-8 w-8 bg-gradient-to-br ${achievement.color} rounded-lg p-1.5 text-white`} />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{achievement.name}</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">{achievement.description}</p>
                  <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">{achievement.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Settings Section */}
        <section className="py-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settings.map((setting) => (
              <motion.a
                key={setting.id}
                href={setting.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-start space-x-4 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <setting.icon className="h-8 w-8 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {setting.name}
                  </h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">{setting.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
