import { motion } from 'framer-motion'
import AppLayout from '@/components/layout/AppLayout'
import {
  DocumentTextIcon,
  PhotographIcon,
  VideoCameraIcon,
  DocumentDownloadIcon,
  TagIcon,
  FolderIcon,
  SearchIcon,
  CloudUploadIcon,
  EyeIcon,
  CalendarIcon,
  PencilAltIcon,
  TrashIcon,
  FilterIcon,
} from '@heroicons/react/outline'
import { useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import of the rich text editor to avoid SSR issues
const Editor = dynamic(() => import('@/components/editor/RichTextEditor'), { ssr: false })

interface ContentItem {
  id: string
  title: string
  type: 'text' | 'image' | 'video' | 'pdf'
  status: 'draft' | 'published' | 'scheduled'
  category: string
  tags: string[]
  lastModified: string
  size: string
  thumbnail?: string
}

const contentItems: ContentItem[] = [
  {
    id: '1',
    title: 'Olympic Values Introduction',
    type: 'text',
    status: 'published',
    category: 'Lesson Plans',
    tags: ['Values', 'Introduction', 'Ethics'],
    lastModified: '2025-02-25',
    size: '45 KB',
  },
  {
    id: '2',
    title: 'Training Session Video',
    type: 'video',
    status: 'draft',
    category: 'Training Materials',
    tags: ['Training', 'Exercise', 'Technique'],
    lastModified: '2025-02-24',
    size: '256 MB',
    thumbnail: '/thumbnails/training.jpg',
  },
  // Add more items as needed
]

export default function ContentManagement() {
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [showBulkUpload, setShowBulkUpload] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [editorContent, setEditorContent] = useState('')
  const [editorTitle, setEditorTitle] = useState('')

  const filteredContent = contentItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = selectedType === 'all' || item.type === selectedType
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const typeIcons = {
    text: DocumentTextIcon,
    image: PhotographIcon,
    video: VideoCameraIcon,
    pdf: DocumentDownloadIcon,
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Content Management
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage and organize your educational content
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowBulkUpload(true)}
                className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <CloudUploadIcon className="mr-2 h-5 w-5" />
                Bulk Upload
              </button>
              <button
                onClick={() => setShowEditor(true)}
                className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              >
                <PencilAltIcon className="mr-2 h-5 w-5" />
                New Content
              </button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="mt-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="all">All Types</option>
                <option value="text">Text</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="pdf">PDFs</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedView(selectedView === 'grid' ? 'list' : 'grid')}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {selectedView === 'grid' ? 'List View' : 'Grid View'}
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid/List */}
          <div className={`mt-8 ${selectedView === 'grid' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}`}>
            {filteredContent.map((item) => {
              const Icon = typeIcons[item.type]
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`group overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-lg dark:bg-gray-800 ${
                    selectedView === 'list' ? 'flex items-center justify-between p-4' : ''
                  }`}
                >
                  <div className={selectedView === 'list' ? 'flex items-center space-x-4' : 'p-6'}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
                      <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className={selectedView === 'list' ? 'flex-1' : 'mt-4'}>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      {selectedView === 'grid' && (
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-4 flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">{item.size}</span>
                            <span className="text-gray-500 dark:text-gray-400">
                              {item.lastModified}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`${selectedView === 'list' ? 'flex items-center space-x-4' : 'mt-4 flex justify-end space-x-2'}`}>
                    <button className="rounded-md bg-primary-100 p-2 text-primary-600 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400">
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                      <PencilAltIcon className="h-5 w-5" />
                    </button>
                    <button className="rounded-md bg-red-100 p-2 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bulk Upload Modal */}
          {showBulkUpload && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900"></div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
                >
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Bulk Upload
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Drag and drop multiple files here, or click to select files
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      onClick={() => setShowBulkUpload(false)}
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-sm"
                    >
                      Upload Files
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* Rich Text Editor Modal */}
          {showEditor && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900"></div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-4xl sm:p-6 sm:align-middle"
                >
                  <div>
                    <div className="mt-3 sm:mt-5">
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Create New Content
                      </h3>
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Enter title..."
                          value={editorTitle}
                          onChange={(e) => setEditorTitle(e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <div className="mt-4 min-h-[400px] rounded-md border border-gray-300 dark:border-gray-600">
                          <Editor
                            initialValue={editorContent}
                            onChange={setEditorContent}
                            placeholder="Write your content here..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-end space-x-4 sm:mt-6">
                    <button
                      type="button"
                      onClick={() => setShowEditor(false)}
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-sm"
                    >
                      Save & Publish
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AppLayout>
  )
}
