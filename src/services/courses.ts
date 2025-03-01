import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, query, where, orderBy, CollectionReference } from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { Course } from '@/types/course'

export const courseService = {
  async createCourse(course: Omit<Course, 'id' | 'lastModified'>): Promise<Course> {
    const courseData = {
      ...course,
      lastModified: new Date()
    }
    
    const docRef = await addDoc(collection(db, 'courses'), courseData)
    return {
      ...courseData,
      id: docRef.id
    } as Course
  },

  async updateCourse(id: string, data: Partial<Course>): Promise<void> {
    const courseRef = doc(db, 'courses', id)
    await updateDoc(courseRef, {
      ...data,
      lastModified: new Date()
    })
  },

  async deleteCourse(id: string): Promise<void> {
    const courseRef = doc(db, 'courses', id)
    await deleteDoc(courseRef)
  },

  async getCourses(filters?: { category?: string; level?: Course['level']; status?: Course['status'] }): Promise<Course[]> {
    const coursesRef = collection(db, 'courses') as CollectionReference<Course>
    let queryRef = query(coursesRef)
    
    if (filters) {
      if (filters.category) {
        queryRef = query(queryRef, where('category', '==', filters.category))
      }
      if (filters.level) {
        queryRef = query(queryRef, where('level', '==', filters.level))
      }
      if (filters.status) {
        queryRef = query(queryRef, where('status', '==', filters.status))
      }
    }
    
    queryRef = query(queryRef, orderBy('lastModified', 'desc'))
    const querySnapshot = await getDocs(queryRef)
    
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))
  },

  async getCourse(id: string): Promise<Course | null> {
    const courseRef = doc(db, 'courses', id)
    const course = await getDoc(courseRef)
    
    if (!course.exists()) {
      return null
    }
    
    return {
      ...course.data(),
      id: course.id
    } as Course
  }
}
