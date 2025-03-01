export interface Activity {
  id: string
  title: string
  description: string
  type: 'lesson' | 'quiz' | 'project' | 'workshop'
  subject: string
  grade: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  objectives: string[]
  materials: string[]
  instructions: string[]
  assessment: {
    type: 'self' | 'peer' | 'teacher'
    criteria: string[]
    rubric?: string
  }
  resources: {
    title: string
    type: 'video' | 'document' | 'link'
    url: string
  }[]
  metadata: {
    author: string
    createdAt: string
    updatedAt: string
    views: number
    rating: number
    tags: string[]
  }
}

export interface ActivityFilter {
  type?: string[]
  duration?: {
    min?: number
    max?: number
  }
  age?: {
    min?: number
    max?: number
  }
  difficulty?: string[]
  olympicValues?: string[]
  language?: string[]
  category?: string[]
  tags?: string[]
}

export interface ActivityProgress {
  activityId: string
  userId: string
  status: 'not_started' | 'in_progress' | 'completed'
  progress: number
  startedAt: string
  lastUpdated: string
  completedAt?: string
  score?: number
  feedback?: string
  timeSpent: number
  attempts: number
}
