import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  User
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/config/firebase'
import type { UserProfile } from '@/types/user'

export const authService = {
  // Authentication service
  async loginWithEmail(email: string, password: string) {
    if (!auth) throw new Error('Firebase auth not initialized');
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const profile = await this.getUserProfile(userCredential.user.uid)
    return { user: profile }
  },

  async loginWithGoogle() {
    if (!auth) throw new Error('Firebase auth not initialized');
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    const profile = await this.getUserProfile(userCredential.user.uid)
    return { user: profile }
  },

  async register(data: { email: string; password: string; name: string }) {
    if (!auth) throw new Error('Firebase auth not initialized');
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
    
    // Create user profile
    await this.createUserProfile(userCredential.user, {
      name: data.name,
      email: data.email,
      role: 'student'
    })

    return this.getUserProfile(userCredential.user.uid)
  },

  async createUserProfile(user: User, profile: Partial<UserProfile>) {
    if (!db) throw new Error('Firebase database not initialized');
    const userRef = doc(db, 'users', user.uid)
    await setDoc(userRef, {
      ...profile,
      id: user.uid,
      userId: user.uid,
      status: 'active',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      stats: {
        lastActive: new Date().toISOString(),
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
        region: 'EA',
        accessibility: {
          fontSize: 'medium',
          contrast: 'normal',
          reduceMotion: false
        }
      }
    })
  },

  async getUserProfile(userId: string): Promise<UserProfile> {
    if (!db) throw new Error('Firebase database not initialized');
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) {
      throw new Error('User profile not found')
    }

    return userDoc.data() as UserProfile
  },

  async updateProfile(data: Partial<UserProfile>) {
    if (!auth) throw new Error('Firebase auth not initialized');
    const user = auth.currentUser
    if (!user) throw new Error('No authenticated user')

    // Update auth profile if name or avatar is being updated
    if (data.name || data.avatar) {
      await updateProfile(user, {
        displayName: data.name,
        photoURL: data.avatar
      })
    }

    // Update custom profile in Firestore
    if (!db) throw new Error('Firebase database not initialized');
    const profileRef = doc(db, 'users', user.uid)
    await updateDoc(profileRef, {
      ...data,
      lastLogin: new Date().toISOString(),
      'stats.lastActive': new Date().toISOString()
    })

    return this.getUserProfile(user.uid)
  },

  // Session management
  async logout() {
    if (!auth) throw new Error('Firebase auth not initialized');
    await signOut(auth)
  },

  getCurrentUser() {
    if (!auth) {
      return Promise.resolve(null);
    }
    
    return new Promise<User | null>((resolve, reject) => {
      const unsubscribe = auth!.onAuthStateChanged(user => {
        unsubscribe()
        resolve(user)
      }, reject)
    })
  }
}
