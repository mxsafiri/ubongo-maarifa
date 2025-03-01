import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/design-system/Card'
import { Button } from '@/components/ui/design-system/Button'
import { Input } from '@/components/ui/design-system/Input'
import { Textarea } from '@/components/ui/design-system/Textarea'
import { Select } from '@/components/ui/design-system/Select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/design-system/Tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/design-system/Dialog'
import { Loading } from '@/components/ui/design-system/Loading'
import { MediaUploader } from '@/components/ui/MediaUploader'
import { ResourceCard, type Resource, type ResourceType } from '@/components/ui/ResourceCard'
import { ResourceForm } from '@/components/ui/ResourceForm'
import { cn } from '@/lib/utils'

interface Course {
  id: string
  title: string
  description: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  thumbnail: string
  status: 'draft' | 'published' | 'archived'
  lastModified: Date
}

interface MediaFile {
  id: string
  name: string
  type: string
  url: string
  size: number
  uploadedAt: Date
}

interface LocalResource {
  id: string
  title: string
  description: string
  type: ResourceType
  url: string
  courseId?: string
  createdAt: Date
  updatedAt: Date
  size: number
  downloadCount: number
  status: 'draft' | 'published' | 'archived'
}

export default function ContentManagement() {
  const [selectedTab, setSelectedTab] = useState(0)
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Introduction to Python',
      description: 'Learn the basics of Python programming language',
      category: 'Programming',
      level: 'Beginner',
      thumbnail: '🐍',
      status: 'published',
      lastModified: new Date(),
    },
    {
      id: '2',
      title: 'Advanced Mathematics',
      description: 'Complex mathematical concepts and problem-solving',
      category: 'Mathematics',
      level: 'Advanced',
      thumbnail: '📐',
      status: 'draft',
      lastModified: new Date(),
    },
  ])

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'sample-image.jpg',
      type: 'image/jpeg',
      url: '#',
      size: 1024 * 1024 * 2, // 2MB
      uploadedAt: new Date(),
    },
  ])

  const [resources, setResources] = useState<LocalResource[]>([
    {
      id: '1',
      title: 'Python Basics Handbook',
      description: 'A comprehensive guide to Python fundamentals',
      type: 'document',
      url: '#',
      courseId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      size: 1024 * 1024 * 2, // 2MB
      downloadCount: 150,
      status: 'published',
    },
    {
      id: '2',
      title: 'Mathematics Formulas',
      description: 'Essential formulas for advanced mathematics',
      type: 'document',
      url: '#',
      courseId: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
      size: 1024 * 1024, // 1MB
      downloadCount: 75,
      status: 'published',
    },
  ])

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: '',
    description: '',
    category: '',
    level: 'Beginner',
    status: 'draft',
  })

  const [selectedResource, setSelectedResource] = useState<LocalResource | null>(null)
  const [isCreatingResource, setIsCreatingResource] = useState(false)
  const [isEditingResource, setIsEditingResource] = useState(false)

  const categories = [
    'Programming',
    'Mathematics',
    'Science',
    'Language',
    'Arts',
    'History',
  ]

  const handleCreateCourse = () => {
    if (!newCourse.title || !newCourse.description || !newCourse.category) return

    const course: Course = {
      id: Date.now().toString(),
      title: newCourse.title,
      description: newCourse.description,
      category: newCourse.category,
      level: newCourse.level as Course['level'],
      thumbnail: '📚',
      status: newCourse.status as Course['status'],
      lastModified: new Date(),
    }

    setCourses((prev) => [...prev, course])
    setIsCreating(false)
    resetCourseForm()
  }

  const handleEditCourse = () => {
    if (!selectedCourse || !newCourse.title || !newCourse.description || !newCourse.category) return

    const updatedCourse: Course = {
      ...selectedCourse,
      title: newCourse.title,
      description: newCourse.description,
      category: newCourse.category,
      level: newCourse.level as Course['level'],
      status: newCourse.status as Course['status'],
      lastModified: new Date(),
    }

    setCourses((prev) =>
      prev.map((course) =>
        course.id === selectedCourse.id ? updatedCourse : course
      )
    )
    setIsEditing(false)
    resetCourseForm()
  }

  const handleDeleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== courseId))
  }

  const resetCourseForm = () => {
    setNewCourse({
      title: '',
      description: '',
      category: '',
      level: 'Beginner',
      status: 'draft',
    })
    setSelectedCourse(null)
  }

  const handleMediaUpload = async (files: File[]) => {
    // Simulate file upload
    const newFiles: MediaFile[] = files.map((file) => ({
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      size: file.size,
      uploadedAt: new Date(),
    }))

    setMediaFiles((prev) => [...prev, ...newFiles])
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleCreateResource = (data: Partial<LocalResource>) => {
    const newResource: LocalResource = {
      id: Date.now().toString(),
      title: data.title!,
      description: data.description!,
      type: data.type as ResourceType,
      url: data.url!,
      courseId: data.courseId,
      createdAt: new Date(),
      updatedAt: new Date(),
      size: data.size,
      downloadCount: 0,
      status: data.status! as LocalResource['status'],
    }

    setResources((prev) => [...prev, newResource])
    setIsCreatingResource(false)
  }

  const handleEditResource = (data: Partial<LocalResource>) => {
    if (!selectedResource) return

    const updatedResource: LocalResource = {
      ...selectedResource,
      ...data,
      type: data.type as ResourceType,
      updatedAt: new Date(),
    }

    setResources((prev) =>
      prev.map((resource) =>
        resource.id === selectedResource.id ? updatedResource : resource
      )
    )
    setIsEditingResource(false)
    setSelectedResource(null)
  }

  const handleDeleteResource = (id: string) => {
    setResources((prev) => prev.filter((resource) => resource.id !== id))
  }

  const tabPanels = [
    {
      title: 'Courses',
      content: (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="group cursor-pointer transition-all hover:shadow-soft-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{course.thumbnail}</span>
                    <div className="flex items-center space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedCourse(course)
                          setNewCourse(course)
                          setIsEditing(true)
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="mt-2">{course.title}</CardTitle>
                  <p className="text-sm text-surface-500">{course.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700">
                      {course.category}
                    </span>
                    <span className="rounded-full bg-secondary-50 px-2 py-1 text-xs font-medium text-secondary-700">
                      {course.level}
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-2 py-1 text-xs font-medium',
                        course.status === 'published'
                          ? 'bg-success-100 text-success-700'
                          : course.status === 'draft'
                          ? 'bg-surface-100 text-surface-700'
                          : 'bg-surface-100 text-surface-700'
                      )}
                    >
                      {course.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-surface-500">
                    Last modified: {course.lastModified.toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      title: 'Resources',
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Learning Resources</h2>
            <Button onClick={() => setIsCreatingResource(true)}>
              Add Resource
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onEdit={(resource) => {
                  setSelectedResource({ 
                    ...resource, 
                    size: resource.size || 0,
                    downloadCount: resource.downloadCount || 0 
                  })
                  setIsEditingResource(true)
                }}
                onDelete={handleDeleteResource}
                onView={(resource) => {
                  // In a real app, we would handle viewing the resource here
                  window.open(resource.url, '_blank')
                }}
              />
            ))}
          </div>

          <Dialog
            open={isCreatingResource || isEditingResource}
            onClose={() => {
              setIsCreatingResource(false)
              setIsEditingResource(false)
              setSelectedResource(null)
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditingResource ? 'Edit Resource' : 'Add Resource'}
                </DialogTitle>
              </DialogHeader>

              <ResourceForm
                initialData={selectedResource || undefined}
                onSubmit={isEditingResource ? handleEditResource : handleCreateResource}
                onCancel={() => {
                  setIsCreatingResource(false)
                  setIsEditingResource(false)
                  setSelectedResource(null)
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      ),
    },
    {
      title: 'Assessments',
      content: (
        <Card>
          <CardContent className="flex h-40 items-center justify-center">
            <p className="text-surface-500">Assessment tools coming soon...</p>
          </CardContent>
        </Card>
      ),
    },
    {
      title: 'Media Library',
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Media</CardTitle>
            </CardHeader>
            <CardContent>
              <MediaUploader onUpload={handleMediaUpload} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {mediaFiles.map((file) => (
              <Card key={file.id} className="overflow-hidden">
                <div className="aspect-video bg-surface-100 dark:bg-surface-800">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-4xl">
                        {file.type.startsWith('video/')
                          ? '🎥'
                          : file.type.startsWith('audio/')
                          ? '🎵'
                          : '📄'}
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="space-y-2">
                  <p className="truncate font-medium">{file.name}</p>
                  <div className="flex items-center justify-between text-xs text-surface-500">
                    <span>{formatFileSize(file.size)}</span>
                    <span>{file.uploadedAt.toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Content Management</h1>
        <Button onClick={() => setIsCreating(true)}>Create New Course</Button>
      </div>

      <Tabs defaultIndex={0} onChange={setSelectedTab}>
        <TabsList className="w-full justify-start">
          {tabPanels.map((panel, index) => (
            <TabsTrigger key={panel.title}>{panel.title}</TabsTrigger>
          ))}
        </TabsList>
        {tabPanels.map((panel, index) => (
          <TabsContent key={panel.title}>{panel.content}</TabsContent>
        ))}
      </Tabs>

      <Dialog open={isCreating || isEditing} onClose={() => {
        setIsCreating(false)
        setIsEditing(false)
        resetCourseForm()
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Course' : 'Create New Course'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Course title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Course description"
              />
            </div>

            <div className="space-y-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
              <Select
                value={newCourse.category}
                onChange={(value) =>
                  setNewCourse((prev) => ({ 
                    ...prev, 
                    category: Array.isArray(value) ? value[0] : value 
                  }))
                }
                options={[
                  { value: 'math', label: 'Mathematics' },
                  { value: 'science', label: 'Science' },
                  { value: 'english', label: 'English' },
                  { value: 'history', label: 'History' },
                  { value: 'art', label: 'Art' }
                ]}
              />
            </div>

            <div className="space-y-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">Level</label>
              <Select
                value={newCourse.level}
                onChange={(value) =>
                  setNewCourse((prev) => ({ 
                    ...prev, 
                    level: (Array.isArray(value) ? value[0] : value) as Course['level']
                  }))
                }
                options={[
                  { value: 'Beginner', label: 'Beginner' },
                  { value: 'Intermediate', label: 'Intermediate' },
                  { value: 'Advanced', label: 'Advanced' },
                ]}
              />
            </div>

            <div className="space-y-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
              <Select
                value={newCourse.status}
                onChange={(value) =>
                  setNewCourse((prev) => ({ 
                    ...prev, 
                    status: (Array.isArray(value) ? value[0] : value) as Course['status']
                  }))
                }
                options={[
                  { value: 'draft', label: 'Draft' },
                  { value: 'published', label: 'Published' },
                  { value: 'archived', label: 'Archived' }
                ]}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreating(false)
                setIsEditing(false)
                resetCourseForm()
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={isEditing ? handleEditCourse : handleCreateCourse}
            >
              {isEditing ? 'Save Changes' : 'Create Course'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
