import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { authService } from '@/services/auth'
import type { UserProfile } from '@/types/user'

interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  error: string | null
  login: (code: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('olympic_token')
      if (!token) {
        setLoading(false)
        return
      }

      const profile = await authService.getUserProfile()
      setUser(profile)
    } catch (err) {
      setError('Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const login = async (code: string) => {
    try {
      setLoading(true)
      const { token, user: profile } = await authService.loginWithOlympicId(code)
      localStorage.setItem('olympic_token', token)
      setUser(profile)
      router.push('/dashboard')
    } catch (err) {
      setError('Login failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
      router.push('/auth/login')
    } catch (err) {
      setError('Logout failed')
    }
  }

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      const updated = await authService.updateUserProfile(data)
      setUser(updated)
    } catch (err) {
      setError('Profile update failed')
      throw err
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
