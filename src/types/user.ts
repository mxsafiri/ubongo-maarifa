export type UserRole = 'admin' | 'teacher' | 'editor'

export interface UserProfile {
  id: string
  olympicId: string // For Olympic ID integration
  email: string
  name: string
  role: UserRole
  preferences: {
    language: string
    region: string
    teachingLevel: string[]
    subjects: string[]
    notifications: boolean
  }
  teachingDetails: {
    school: string
    district: string
    state: string
    licenseInfo?: string
    specializations: string[]
  }
  stats: {
    activitiesCompleted: number
    totalStudentsReached: number
    averageRating: number
    lastActive: string
  }
}

export interface ActivityProgress {
  activityId: string
  status: 'not_started' | 'in_progress' | 'completed'
  startedAt: string
  completedAt?: string
  rating?: number
  feedback?: string
  adaptations?: string[]
}
