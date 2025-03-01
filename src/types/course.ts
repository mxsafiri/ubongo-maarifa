export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type CourseStatus = 'draft' | 'published' | 'archived'

export interface Course {
  id: string
  title: string
  description: string
  category: string
  level: CourseLevel
  thumbnail: string
  status: CourseStatus
  lastModified: Date
  createdBy: string
  updatedBy: string
  objectives: string[]
  prerequisites?: string[]
  duration?: number // in minutes
  language: string
  tags?: string[]
  rating?: number
  enrollmentCount?: number
  completionRate?: number
  isPublic: boolean
  price?: number
  curriculum: {
    sections: {
      id: string
      title: string
      order: number
      lessons: {
        id: string
        title: string
        type: 'video' | 'text' | 'quiz' | 'assignment'
        duration?: number
        order: number
        content: string
        resources?: string[] // resource IDs
      }[]
    }[]
  }
}
