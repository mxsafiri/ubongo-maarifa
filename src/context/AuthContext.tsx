'use client';

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/config/firebase'
import type { UserProfile, UserRole, BaseUserProfile } from '@/types/user'

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  error: string | null
  userRole: UserRole | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>
  isAuthenticated: boolean
  isAuthorized: (allowedRoles: UserRole[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid: string) => {
    try {
      const userDocRef = doc(db!, 'users', uid)
      const userDoc = await getDoc(userDocRef)
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserProfile
        setUserProfile(userData)
        setUserRole(userData.role)
        return userData
      } else {
        console.error('User profile not found')
        return null
      }
    } catch (err) {
      console.error('Error fetching user profile:', err)
      return null
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth!, async (user) => {
      setUser(user)
      if (user) {
        try {
          const profile = await fetchUserProfile(user.uid)
          setIsAuthenticated(true)
        } catch (err) {
          console.error('Error fetching user profile:', err)
        }
      } else {
        setUserProfile(null)
        setUserRole(null)
        setIsAuthenticated(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const userCredential = await signInWithEmailAndPassword(auth!, email, password)
      const profile = await fetchUserProfile(userCredential.user.uid)
      
      // Redirect based on user role
      if (profile) {
        switch (profile.role) {
          case 'teacher':
          case 'admin':
          case 'content_creator':
            router.push('/')
            break
          case 'student':
            router.push('/student-dashboard')
            break
          case 'parent':
            router.push('/parent-dashboard')
            break
          default:
            router.push('/')
        }
      }
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth!)
      router.push('/auth')
    } catch (err) {
      setError('Logout failed')
      throw err
    }
  }

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      setLoading(true)
      setError(null)
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth!, email, password)
      const user = userCredential.user
      
      // Update display name
      await updateFirebaseProfile(user, {
        displayName: name
      })
      
      // Create base user profile
      const now = new Date().toISOString()
      const baseProfile: BaseUserProfile = {
        id: user.uid,
        userId: user.uid,
        email: email,
        name: name,
        role: role,
        status: 'active',
        createdAt: now,
        lastLogin: now,
        stats: {
          lastActive: now,
          loginCount: 1,
          totalTimeSpent: 0
        },
        preferences: {
          theme: 'light',
          notifications: {
            email: true,
            push: true,
            sms: false
          },
          language: 'en',
          region: 'TZ',
          accessibility: {
            fontSize: 'medium',
            contrast: 'normal',
            reduceMotion: false
          }
        }
      }
      
      // Save user profile to Firestore
      await setDoc(doc(db!, 'users', user.uid), baseProfile)
      
      // Fetch the complete profile
      await fetchUserProfile(user.uid)
      
    } catch (err) {
      setError('Registration failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth!, email)
    } catch (err) {
      setError('Password reset failed')
      throw err
    }
  }

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    try {
      if (!user) throw new Error('No user logged in')
      
      const userDocRef = doc(db!, 'users', user.uid)
      await updateDoc(userDocRef, data)
      
      // Refresh user profile
      const updatedProfile = await fetchUserProfile(user.uid)
      setUserProfile(updatedProfile)
      
      return updatedProfile
    } catch (err) {
      setError('Profile update failed')
      throw err
    }
  }

  const isAuthorized = (allowedRoles: UserRole[]): boolean => {
    if (!isAuthenticated || !userRole) return false
    return allowedRoles.includes(userRole)
  }

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        userProfile, 
        loading, 
        error, 
        userRole,
        login, 
        logout, 
        register,
        resetPassword,
        updateUserProfile: updateUserProfile,
        isAuthenticated,
        isAuthorized
      }}
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
