import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, query, where, orderBy, CollectionReference, DocumentData } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '@/config/firebase'
import type { LocalResource } from '@/types/resource'

export const resourceService = {
  async createResource(resource: Omit<LocalResource, 'id' | 'createdAt' | 'updatedAt'>): Promise<LocalResource> {
    const resourceData = {
      ...resource,
      createdAt: new Date(),
      updatedAt: new Date(),
      downloadCount: 0
    }
    
    if (!db) throw new Error('Firebase database not initialized');
    const docRef = await addDoc(collection(db, 'resources'), resourceData)
    return {
      ...resourceData,
      id: docRef.id
    } as LocalResource
  },

  async updateResource(id: string, data: Partial<LocalResource>): Promise<void> {
    if (!db) throw new Error('Firebase database not initialized');
    const resourceRef = doc(db, 'resources', id)
    await updateDoc(resourceRef, {
      ...data,
      updatedAt: new Date()
    })
  },

  async deleteResource(id: string): Promise<void> {
    if (!db) throw new Error('Firebase database not initialized');
    const resourceRef = doc(db, 'resources', id)
    const resource = await getDoc(resourceRef)
    
    if (resource.exists()) {
      // Delete the file from storage if it exists
      if (!storage) throw new Error('Firebase storage not initialized');
      const storageRef = ref(storage, `resources/${id}`)
      try {
        await deleteObject(storageRef)
      } catch (error) {
        console.log('No file to delete or error deleting file:', error)
      }
      
      // Delete the document
      await deleteDoc(resourceRef)
    }
  },

  async getResources(courseId?: string): Promise<LocalResource[]> {
    if (!db) throw new Error('Firebase database not initialized');
    const resourcesRef = collection(db, 'resources') as CollectionReference<LocalResource>
    let queryRef = query(resourcesRef)
    
    if (courseId) {
      queryRef = query(queryRef, where('courseId', '==', courseId))
    }
    
    queryRef = query(queryRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(queryRef)
    
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))
  },

  async getResource(id: string): Promise<LocalResource | null> {
    if (!db) throw new Error('Firebase database not initialized');
    const resourceRef = doc(db, 'resources', id)
    const resource = await getDoc(resourceRef)
    
    if (!resource.exists()) {
      return null
    }
    
    return {
      ...resource.data(),
      id: resource.id
    } as LocalResource
  },

  async uploadFile(file: File, path: string): Promise<string> {
    if (!storage) throw new Error('Firebase storage not initialized');
    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
  },

  async incrementDownloadCount(id: string): Promise<void> {
    if (!db) throw new Error('Firebase database not initialized');
    const resourceRef = doc(db, 'resources', id)
    const resource = await getDoc(resourceRef)
    
    if (resource.exists()) {
      const currentCount = resource.data().downloadCount || 0
      await updateDoc(resourceRef, {
        downloadCount: currentCount + 1
      })
    }
  }
}
