import { motion } from 'framer-motion'
import AppLayout from '@/components/layout/AppLayout'
import {
  SearchIcon,
  FilterIcon,
  DocumentDownloadIcon,
  BookmarkIcon,
  ShareIcon,
  DocumentDuplicateIcon,
  TagIcon,
  CollectionIcon,
} from '@heroicons/react/outline'
import { useState } from 'react'

interface Resource {
  id: string
  title: string
  description: string
  type: string
  category: string
  tags: string[]
  downloadCount: number
  fileSize: string
  lastUpdated: string
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Olympic Values Education Guide',
    description: 'Comprehensive guide for teaching Olympic values through interactive activities',
    type: 'PDF',
    category: 'Teaching Guide',
    tags: ['Olympic Values', 'Education', 'Activities'],
    downloadCount: 1234,
    fileSize: '2.5 MB',
    lastUpdated: '2025-02-20',
  },
  {
    id: '2',
    title: 'Sport Ethics Workshop Materials',
    description: 'Workshop materials for teaching ethics in sport to young athletes',
    type: 'ZIP',
    category: 'Workshop',
    tags: ['Ethics', 'Sport', 'Workshop'],
    downloadCount: 856,
    fileSize: '15 MB',
    lastUpdated: '2025-02-18',
  },
  // Add more resources as needed
]

const categories = [
  'Teaching Guide',
  'Workshop',
  'Video',
  'Presentation',
  'Activity Sheet',
  'Research Paper',
]

const tags = [
  'Olympic Values',
  'Education',
  'Activities',
  'Ethics',
  'Sport',
  'Workshop',
  'Youth',
  'Leadership',
]

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategories = selectedCategories.length === 0 ||
      selectedCategories.includes(resource.category)
    
    const matchesTags = selectedTags.length === 0 ||
      resource.tags.some(tag => selectedTags.includes(tag))
    
    return matchesSearch && matchesCategories && matchesTags
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
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Resource Library</h1>
            <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
              Upload Resource
            </button>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-6">
            {/* Filters Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="col-span-3 space-y-6"
            >
              {/* Search */}
              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <div className="relative">
                  <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h3 className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                  <CollectionIcon className="mr-2 h-5 w-5 text-gray-500" />
                  Categories
                </h3>
                <div className="mt-4 space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, category])
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category))
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h3 className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                  <TagIcon className="mr-2 h-5 w-5 text-gray-500" />
                  Tags
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        if (selectedTags.includes(tag)) {
                          setSelectedTags(selectedTags.filter(t => t !== tag))
                        } else {
                          setSelectedTags([...selectedTags, tag])
                        }
                      }}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        selectedTags.includes(tag)
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Resources Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="col-span-9"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-lg dark:bg-gray-800"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                          {resource.type}
                        </span>
                        <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                          <BookmarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                        {resource.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {resource.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {resource.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            <DocumentDownloadIcon className="mr-1.5 h-4 w-4" />
                            {resource.downloadCount}
                          </button>
                          <button className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            <ShareIcon className="mr-1.5 h-4 w-4" />
                            Share
                          </button>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {resource.fileSize}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  )
}
