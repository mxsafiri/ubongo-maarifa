export interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedAt: Date;
  courseId: string;
  type: 'completion' | 'milestone' | 'excellence';
}

export interface CourseEnrollment {
  courseId: string;
  level: string;
  progress: number;
  lastActivity: Date;
  achievements: Achievement[];
}

export interface Student {
  id: string;
  name: string;
  profilePic?: string;
  enrolledCourses: CourseEnrollment[];
  createdAt: Date;
  lastActive: Date;
}

export interface CourseLevel {
  id: string;
  name: string;
  requirements?: string[];
}

export interface StudentProgress {
  overallProgress: number;
  meetingGoals: boolean;
  needsSupport: boolean;
  recentMilestones: Achievement[];
}
