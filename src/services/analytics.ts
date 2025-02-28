import api from './api'
import type {
  TeacherAnalytics,
  SchoolAnalytics,
  ActivityAnalytics,
} from '@/types/analytics'

export const analyticsService = {
  // Teacher analytics
  async getTeacherAnalytics(): Promise<TeacherAnalytics> {
    const response = await api.get('/analytics/teacher')
    return response.data
  },

  // School analytics
  async getSchoolAnalytics(schoolId: string): Promise<SchoolAnalytics> {
    const response = await api.get(`/analytics/school/${schoolId}`)
    return response.data
  },

  // Activity analytics
  async getActivityAnalytics(activityId: string): Promise<ActivityAnalytics> {
    const response = await api.get(`/analytics/activity/${activityId}`)
    return response.data
  },

  // Regional analytics
  async getRegionalAnalytics(region: {
    state: string
    district?: string
  }): Promise<{
    totalTeachers: number
    totalStudents: number
    popularActivities: string[]
    engagementRate: number
  }> {
    const response = await api.get('/analytics/regional', {
      params: region,
    })
    return response.data
  },

  // Usage reports
  async generateUsageReport(params: {
    startDate: string
    endDate: string
    type: 'teacher' | 'school' | 'activity'
    id?: string
  }) {
    const response = await api.get('/analytics/report', { params })
    return response.data
  },
}
