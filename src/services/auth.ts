import api from './api'
import type { UserProfile } from '@/types/user'

export const authService = {
  // Olympic ID authentication
  async loginWithOlympicId(code: string) {
    const response = await api.post('/auth/olympic', { code })
    return response.data
  },

  // Profile management
  async getUserProfile(): Promise<UserProfile> {
    const response = await api.get('/user/profile')
    return response.data
  },

  async updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    const response = await api.put('/user/profile', profile)
    return response.data
  },

  // Preferences
  async updatePreferences(preferences: UserProfile['preferences']) {
    const response = await api.put('/user/preferences', preferences)
    return response.data
  },

  // Teaching details
  async updateTeachingDetails(details: UserProfile['teachingDetails']) {
    const response = await api.put('/user/teaching-details', details)
    return response.data
  },

  // Session management
  async logout() {
    await api.post('/auth/logout')
    localStorage.removeItem('olympic_token')
  },
}
