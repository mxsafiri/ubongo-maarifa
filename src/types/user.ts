export type UserRole = 'admin' | 'teacher' | 'student' | 'content_creator' | 'parent'

export interface BaseStats {
  lastActive: string
  loginCount: number
  totalTimeSpent: number
}

export interface StudentStats extends BaseStats {
  assignmentsCompleted: number
  quizzesTaken: number
  averageQuizScore: number
  totalLearningTime: number
  participationRate: number
  coursesEnrolled: string[]
  coursesCompleted: number
  certificatesEarned: number
  badges: string[]
}

export interface TeacherStats extends BaseStats {
  coursesCreated: number
  totalStudentsReached: number
  averageRating: number
  activitiesCompleted: number
  resourcesShared: number
  classesCreated: number
  studentsManaged: number
  assignmentsCreated: number
  averageResponseTime: number
  feedbackGiven: number
}

export interface ContentCreatorStats extends BaseStats {
  contentPiecesCreated: number
  totalEngagement: number
  averageContentRating: number
  publishedResources: number
  resourcesCreated: number
  totalDownloads: number
  averageRating: number
  feedbackReceived: number
  revisionsMade: number
}

export interface ParentStats extends BaseStats {
  parentalEngagement: number
  meetingsAttended: number
  feedbacksProvided: number
  childrenMonitored: number
  reportsViewed: number
  feedbackGiven: number
  parentalControlsModified: number
}

export interface AdminStats extends BaseStats {
  usersManaged: number
  actionsPerformed: number
  reportsResolved: number
  systemUpdates: number
  issuesResolved: number
  reportsGenerated: number
  configurationChanges: number
}

export interface BaseUserProfile {
  id: string
  userId: string
  email: string
  name: string
  phoneNumber?: string
  avatar?: string
  role: UserRole
  status: 'active' | 'inactive'
  createdAt: string
  lastLogin: string
  stats: BaseStats
  preferences: {
    theme: 'light' | 'dark'
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
    language: string
    region: string
    accessibility: {
      fontSize: 'small' | 'medium' | 'large'
      contrast: 'normal' | 'high'
      reduceMotion: boolean
    }
  }
}

export type UserProfile = BaseUserProfile

export interface TeacherProfile extends BaseUserProfile {
  role: 'teacher'
  stats: TeacherStats
  department: string
  subjects: string[]
  classrooms: string[]
  schedule: {
    [key: string]: string[]
  }
  teachingDetails: {
    yearsOfExperience: number
    specializations: string[]
    certifications: string[]
    education: {
      degree: string
      institution: string
      year: number
    }
    school: string
    subjects: string[]
    grades: string[]
  }
}

export interface StudentProfile extends BaseUserProfile {
  role: 'student'
  stats: StudentStats
  learningPreferences: {
    preferredSubjects: string[]
    learningStyle: string
    pacePreference: string
    groupWork: string
  }
}

export interface ContentCreatorProfile extends BaseUserProfile {
  role: 'content_creator'
  stats: ContentCreatorStats
  contentTypes: string[]
  publishedResources: number
  rating: number
  expertise: {
    subjects: string[]
    levels: string[]
    languages: string[]
    tools: string[]
    gradeRanges: string[]
  }
}

export interface ParentProfile extends BaseUserProfile {
  role: 'parent'
  stats: ParentStats
  children: Array<{
    studentId: string
    name: string
    grade: string
    school: string
  }>
  parentalControls: {
    screenTime: number
    contentRestrictions: string[]
  }
}

export interface AdminProfile extends BaseUserProfile {
  role: 'admin'
  stats: AdminStats
  adminLevel: 'super' | 'regular' | 'moderator'
  permissions: string[]
  activityLog: {
    lastAction: string
    actionCount: number
  }
}

export type UserTypes = TeacherProfile | StudentProfile | ContentCreatorProfile | ParentProfile | AdminProfile
