export interface Activity {
  id: string
  title: string
  description: string
  type: 'physical' | 'educational' | 'values' | 'mixed'
  duration: number // in minutes
  targetAge: {
    min: number
    max: number
  }
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  materials: string[]
  objectives: string[]
  olympicValues: string[]
  content: {
    warmUp: string
    mainActivity: string
    coolDown: string
    adaptations: string[]
    variations: string[]
  }
  media: {
    images: string[]
    videos: string[]
    documents: string[]
  }
  metadata: {
    created: string
    lastModified: string
    language: string
    tags: string[]
    category: string[]
  }
  stats: {
    timesUsed: number
    averageRating: number
    totalFeedback: number
    popularRegions: string[]
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
