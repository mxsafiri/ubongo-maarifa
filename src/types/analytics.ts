export interface AnalyticsData {
  overview: {
    activeUsers: number
    totalLessons: number
    completionRate: number
    averageEngagement: number
  }
  learningMetrics: {
    topSubjects: {
      subject: string
      students: number
      completionRate: number
    }[]
    skillProgress: {
      skill: string
      proficiency: number
    }[]
    timeSpent: {
      date: string
      minutes: number
    }[]
  }
  engagement: {
    dailyActive: number
    weeklyActive: number
    monthlyActive: number
    averageSessionTime: number
  }
  performance: {
    averageScore: number
    skillGrowth: number
    conceptMastery: number
    participationRate: number
  }
}

export interface TeacherAnalytics {
  totalStudents: number
  activeStudents: number
  averageEngagement: number
  coursesCreated: number
  resourcesShared: number
  averageRating: number
  lastUpdated: string
}

export interface SchoolAnalytics {
  totalTeachers: number
  totalStudents: number
  activeTeachers: number
  activeStudents: number
  averageAttendance: number
  topPerformingClasses: string[]
  resourceUtilization: number
  lastUpdated: string
}

export interface ActivityAnalytics {
  totalParticipants: number
  completionRate: number
  averageScore: number
  timeSpent: number
  difficulty: 'easy' | 'medium' | 'hard'
  engagement: number
  feedback: {
    positive: number
    neutral: number
    negative: number
  }
  lastUpdated: string
}

export interface LearningAnalytics {
  studentProgress: {
    completed: number
    inProgress: number
    notStarted: number
  }
  timeSpent: {
    total: number
    average: number
    byModule: Record<string, number>
  }
  performance: {
    averageScore: number
    byModule: Record<string, number>
  }
  engagement: {
    daily: number
    weekly: number
    monthly: number
  }
  lastUpdated: string
}

export interface ContentAnalytics {
  views: number
  downloads: number
  shares: number
  averageRating: number
  completionRate: number
  timeSpent: number
  feedback: {
    helpful: number
    neutral: number
    unhelpful: number
  }
  demographics: {
    byAge: Record<string, number>
    byRegion: Record<string, number>
    byRole: Record<string, number>
  }
  lastUpdated: string
}
