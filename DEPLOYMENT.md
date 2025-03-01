# Ubongo Maarifa Deployment Guide

This guide explains how to deploy the Ubongo Maarifa platform using Firebase.

## Prerequisites

1. Node.js 16 or higher
2. Firebase CLI installed (`npm install -g firebase-tools`)
3. Firebase project created at [Firebase Console](https://console.firebase.google.com)

## Environment Setup

1. Copy the environment example file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in the Firebase configuration values from your Firebase project settings:
   - NEXT_PUBLIC_FIREBASE_API_KEY
   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   - NEXT_PUBLIC_FIREBASE_APP_ID
   - NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

## Build and Deploy

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. Login to Firebase:
   ```bash
   firebase login
   ```

4. Initialize Firebase (if not already done):
   ```bash
   firebase init
   ```

5. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Security Rules

The deployment includes:
- Firestore security rules (`firestore.rules`)
- Storage security rules (`storage.rules`)

Review these files to ensure they match your security requirements.

## Post-Deployment

1. Verify the deployment by visiting your Firebase hosting URL
2. Test authentication flows
3. Verify file uploads and downloads
4. Check course creation and management
5. Test user role permissions

## Monitoring

Monitor your application using:
- Firebase Console
- Firebase Analytics
- Firebase Performance Monitoring
- Firebase Crashlytics

## Troubleshooting

Common issues and solutions:

1. **Build Errors**
   - Check Node.js version
   - Clear `.next` directory
   - Remove `node_modules` and reinstall

2. **Deployment Errors**
   - Verify Firebase CLI is up to date
   - Check project permissions
   - Validate configuration files

3. **Runtime Errors**
   - Check environment variables
   - Verify Firebase configuration
   - Review security rules

## Local Development

Run the Firebase emulators for local development:
```bash
firebase emulators:start
```

This will start:
- Authentication emulator on port 9099
- Firestore emulator on port 8080
- Storage emulator on port 9199
- Hosting emulator on port 5000
- Emulator UI on port 4000

## Contact

For support or questions, please contact the development team.
