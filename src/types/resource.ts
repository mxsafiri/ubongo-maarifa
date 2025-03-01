export type ResourceType = 'document' | 'video' | 'image' | 'audio' | 'link' | 'other'
export type ResourceStatus = 'draft' | 'published' | 'archived'

export interface LocalResource {
  id: string
  title: string
  description: string
  type: ResourceType
  url: string
  courseId?: string
  createdAt: Date
  updatedAt: Date
  size: number // in bytes
  downloadCount: number
  status: ResourceStatus
  tags?: string[]
  language?: string
  duration?: number // for video/audio in seconds
  thumbnail?: string
  metadata?: {
    format?: string
    dimensions?: {
      width: number
      height: number
    }
    duration?: number
    fileSize?: number
    encoding?: string
    [key: string]: any
  }
  createdBy: string
  updatedBy: string
  visibility: 'public' | 'private' | 'restricted'
  accessRoles?: string[] // user roles that can access this resource
  license?: string
}
