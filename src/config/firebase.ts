import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDRbd_O1wNRKz76AfXjp8ivbwHv9eVInv0",
  authDomain: "ubongo-maarifa.firebaseapp.com",
  projectId: "ubongo-maarifa",
  storageBucket: "ubongo-maarifa.firebasestorage.app",
  messagingSenderId: "935935138588",
  appId: "1:935935138588:web:31c6a4f1ab07ff61d5b8d9",
  measurementId: "G-5J11Q3C4F9"
}

// Initialize Firebase only on client side
let app = null
let auth = null
let db = null
let storage = null

if (typeof window !== 'undefined') {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
}

export { app, auth, db, storage }
