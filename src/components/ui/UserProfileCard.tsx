import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './design-system/Card'
import { Button } from './design-system/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './design-system/Dialog'
import type { UserProfile, TeacherProfile, StudentProfile, ContentCreatorProfile, ParentProfile } from '@/types/user'

interface UserProfileCardProps {
  profile: UserProfile
  onEdit?: (profile: UserProfile) => void
}

export function UserProfileCard({ profile, onEdit }: UserProfileCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getRoleColor = (role: UserProfile['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700'
      case 'teacher':
        return 'bg-blue-100 text-blue-700'
      case 'student':
        return 'bg-green-100 text-green-700'
      case 'content_creator':
        return 'bg-purple-100 text-purple-700'
      case 'parent':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-surface-100 text-surface-700'
    }
  }

  const renderRoleSpecificDetails = () => {
    switch (profile.role) {
      case 'teacher':
        const teacherProfile = profile as TeacherProfile
        return (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Department</span>
              <span className="font-medium">{teacherProfile.department}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Subjects</span>
              <span className="font-medium">{teacherProfile.subjects.join(', ')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Classrooms</span>
              <span className="font-medium">{teacherProfile.classrooms.join(', ')}</span>
            </div>
          </>
        )

      case 'student':
        const studentProfile = profile as StudentProfile
        return (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-surface-500">Courses Completed</span>
                <span className="font-medium">{studentProfile.stats.coursesCompleted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-surface-500">Learning Style</span>
                <span className="font-medium">{studentProfile.learningPreferences.learningStyle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-surface-500">Pace Preference</span>
                <span className="font-medium">{studentProfile.learningPreferences.pacePreference}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-surface-500">Certificates</span>
                <span className="font-medium">{studentProfile.stats.certificatesEarned}</span>
              </div>
            </div>
          </>
        )

      case 'content_creator':
        const creatorProfile = profile as ContentCreatorProfile
        return (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Content Types</span>
              <span className="font-medium">{creatorProfile.contentTypes.join(', ')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Published Resources</span>
              <span className="font-medium">{creatorProfile.publishedResources}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Rating</span>
              <span className="font-medium">{creatorProfile.rating.toFixed(1)}/5.0</span>
            </div>
          </>
        )

      case 'parent':
        const parentProfile = profile as ParentProfile
        return (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Children</span>
              <span className="font-medium">{parentProfile.children.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Screen Time Limit</span>
              <span className="font-medium">{parentProfile.parentalControls.screenTime} hours</span>
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-surface-100">
                {/* Avatar placeholder */}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{profile.name}</h3>
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getRoleColor(profile.role)}`}>
                  {profile.role.replace('_', ' ')}
                </span>
              </div>
            </div>
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(profile)}
              >
                Edit
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Email</span>
              <span className="font-medium">{profile.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Status</span>
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                profile.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {profile.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Last Login</span>
              <span className="font-medium">{new Date(profile.lastLogin).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            {renderRoleSpecificDetails()}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Theme</span>
              <span className="font-medium capitalize">{profile.preferences.theme}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Language</span>
              <span className="font-medium">{profile.preferences.language}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Notifications</span>
              <span className="font-medium">{profile.preferences.notifications ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
