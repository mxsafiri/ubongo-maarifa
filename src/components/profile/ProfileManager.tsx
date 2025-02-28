import { useState } from 'react'
import { motion } from 'framer-motion'

interface ProfileData {
  name: string
  email: string
  school: string
  country: string
  subjects: string[]
  gradeLevel: string
  preferredLanguage: string
  notifications: boolean
}

export default function ProfileManager() {
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    email: '',
    school: '',
    country: '',
    subjects: [],
    gradeLevel: '',
    preferredLanguage: 'en',
    notifications: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement profile update logic
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Management</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Update your profile information and preferences
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              School
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              value={profile.school}
              onChange={(e) => setProfile({ ...profile, school: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Country
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              value={profile.country}
              onChange={(e) => setProfile({ ...profile, country: e.target.value })}
            >
              <option value="">Select a country</option>
              {/* Add country options */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Preferred Language
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              value={profile.preferredLanguage}
              onChange={(e) => setProfile({ ...profile, preferredLanguage: e.target.value })}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              {/* Add more language options */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Grade Level
            </label>
            <select
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              value={profile.gradeLevel}
              onChange={(e) => setProfile({ ...profile, gradeLevel: e.target.value })}
            >
              <option value="">Select grade level</option>
              {/* Add grade level options */}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Subjects
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {['Physical Education', 'Mathematics', 'Science', 'Languages', 'Arts', 'Social Studies'].map(
              (subject) => (
                <label key={subject} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={profile.subjects.includes(subject)}
                    onChange={(e) => {
                      const newSubjects = e.target.checked
                        ? [...profile.subjects, subject]
                        : profile.subjects.filter((s) => s !== subject)
                      setProfile({ ...profile, subjects: newSubjects })
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{subject}</span>
                </label>
              )
            )}
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              checked={profile.notifications}
              onChange={(e) => setProfile({ ...profile, notifications: e.target.checked })}
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Receive notifications about new activities and updates
            </span>
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  )
}
