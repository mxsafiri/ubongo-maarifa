export interface TeacherAnalytics {
  completedActivities: number
  totalTimeSpent: number
  averageRating: number
  popularActivities: {
    activityId: string
    timesUsed: number
    rating: number
  }[]
  recentActivities: {
    activityId: string
    completedAt: string
    studentCount: number
  }[]
  studentDemographics: {
    totalStudents: number
    ageGroups: Record<string, number>
    genderSplit: Record<string, number>
  }
  regionalStats: {
    state: string
    district: string
    schoolCount: number
    studentReach: number
  }
}

export interface SchoolAnalytics {
  schoolId: string
  name: string
  location: {
    state: string
    district: string
  }
  stats: {
    totalTeachers: number
    totalStudents: number
    activitiesCompleted: number
    averageEngagement: number
    popularValues: string[]
  }
  timeline: {
    date: string
    activities: number
    teachers: number
    students: number
  }[]
}

export interface ActivityAnalytics {
  id: string
  usage: {
    total: number
    byRegion: Record<string, number>
    byAge: Record<string, number>
    bySchoolType: Record<string, number>
  }
  ratings: {
    average: number
    distribution: Record<number, number>
  }
  feedback: {
    positive: number
    negative: number
    common: string[]
  }
  adaptations: {
    used: number
    popular: string[]
  }
}
