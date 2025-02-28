import api from './api'
import type { Activity, ActivityFilter } from '@/types/activity'
import type { ActivityProgress } from '@/types/user'

export const activityService = {
  // Activity retrieval
  async getActivities(filters?: ActivityFilter): Promise<Activity[]> {
    const response = await api.get('/activities', { params: filters })
    return response.data
  },

  async getActivityById(id: string): Promise<Activity> {
    const response = await api.get(`/activities/${id}`)
    return response.data
  },

  // Activity progress
  async startActivity(activityId: string): Promise<ActivityProgress> {
    const response = await api.post(`/activities/${activityId}/start`)
    return response.data
  },

  async completeActivity(
    activityId: string,
    data: {
      rating?: number
      feedback?: string
      adaptations?: string[]
    }
  ): Promise<ActivityProgress> {
    const response = await api.post(`/activities/${activityId}/complete`, data)
    return response.data
  },

  // Activity feedback
  async submitFeedback(
    activityId: string,
    data: {
      rating: number
      feedback: string
      improvements?: string[]
    }
  ) {
    const response = await api.post(`/activities/${activityId}/feedback`, data)
    return response.data
  },

  // Activity search
  async searchActivities(query: string): Promise<Activity[]> {
    const response = await api.get('/activities/search', {
      params: { q: query },
    })
    return response.data
  },

  // Get recommended activities
  async getRecommendedActivities(): Promise<Activity[]> {
    const response = await api.get('/activities/recommended')
    return response.data
  },
}
