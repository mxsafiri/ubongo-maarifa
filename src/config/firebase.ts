import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDRbd_O1wNRKz76AfXjp8ivbwHv9eVInv0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "ubongo-maarifa.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ubongo-maarifa",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "ubongo-maarifa.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "935935138588",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:935935138588:web:31c6a4f1ab07ff61d5b8d9",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-5J11Q3C4F9"
}

// Initialize Firebase only on client side
let firebaseApp: FirebaseApp | undefined = undefined
let auth: Auth | undefined = undefined
let db: Firestore | undefined = undefined
let storage: FirebaseStorage | undefined = undefined

if (typeof window !== 'undefined') {
  firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  auth = getAuth(firebaseApp)
  db = getFirestore(firebaseApp)
  storage = getStorage(firebaseApp)
}

export { firebaseApp, auth, db, storage }
