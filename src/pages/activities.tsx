import { motion } from 'framer-motion'
import AppLayout from '@/components/layout/AppLayout'
import ActivityFinder from '@/components/activities/ActivityFinder'

export default function ActivitiesPage() {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Olympic Activities
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Browse and search through our collection of Olympic-themed educational activities
          </p>
        </div>

        <ActivityFinder />
      </motion.div>
    </AppLayout>
  )
}
