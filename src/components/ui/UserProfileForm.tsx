import { useState, useEffect } from 'react'
import { Input } from './design-system/Input'
import { Textarea } from './design-system/Textarea'
import { Select } from './design-system/Select'
import { Button } from './design-system/Button'
import { MediaUploader } from './MediaUploader'
import type { UserProfile, TeacherProfile, StudentProfile, ContentCreatorProfile, ParentProfile, AdminProfile, UserRole } from '@/types/user'

export interface UserProfileFormProps {
  initialData?: Partial<UserProfile>
  onSubmit: (data: Partial<UserProfile>) => void
  onCancel: () => void
  mode: 'create' | 'edit'
}

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'student', label: 'Student' },
  { value: 'content_creator', label: 'Content Creator' },
  { value: 'parent', label: 'Parent' }
]

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'sw', label: 'Swahili' },
  { value: 'fr', label: 'French' }
]

function getDefaultProfileForRole(role: UserRole): Partial<UserProfile> {
  const baseProfile = {
    role,
    preferences: {
      language: 'en',
      region: 'East Africa',
      theme: 'light' as const,
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      accessibility: {
        fontSize: 'medium' as const,
        contrast: 'normal' as const,
        reduceMotion: false,
      },
    }
  }

  switch (role) {
    case 'student':
      return {
        ...baseProfile,
        stats: {
          lastActive: new Date().toISOString(),
          loginCount: 0,
          totalTimeSpent: 0,
          assignmentsCompleted: 0,
          quizzesTaken: 0,
          averageQuizScore: 0,
          totalLearningTime: 0,
          participationRate: 0,
          coursesEnrolled: [],
          coursesCompleted: 0,
          certificatesEarned: 0,
          badges: []
        }
      } as Partial<StudentProfile>

    case 'teacher':
      return {
        ...baseProfile,
        stats: {
          lastActive: new Date().toISOString(),
          loginCount: 0,
          totalTimeSpent: 0,
          coursesCreated: 0,
          totalStudentsReached: 0,
          averageRating: 0,
          activitiesCompleted: 0,
          resourcesShared: 0,
          classesCreated: 0,
          studentsManaged: 0,
          assignmentsCreated: 0,
          averageResponseTime: 0,
          feedbackGiven: 0
        }
      } as Partial<TeacherProfile>

    case 'content_creator':
      return {
        ...baseProfile,
        stats: {
          lastActive: new Date().toISOString(),
          loginCount: 0,
          totalTimeSpent: 0,
          contentPiecesCreated: 0,
          totalEngagement: 0,
          averageContentRating: 0,
          publishedResources: 0,
          resourcesCreated: 0,
          totalDownloads: 0,
          averageRating: 0,
          feedbackReceived: 0,
          revisionsMade: 0
        }
      } as Partial<ContentCreatorProfile>

    case 'parent':
      return {
        ...baseProfile,
        stats: {
          lastActive: new Date().toISOString(),
          loginCount: 0,
          totalTimeSpent: 0,
          parentalEngagement: 0,
          meetingsAttended: 0,
          feedbacksProvided: 0,
          childrenMonitored: 0,
          reportsViewed: 0,
          feedbackGiven: 0,
          parentalControlsModified: 0
        }
      } as Partial<ParentProfile>

    case 'admin':
      return {
        ...baseProfile,
        stats: {
          lastActive: new Date().toISOString(),
          loginCount: 0,
          totalTimeSpent: 0,
          usersManaged: 0,
          actionsPerformed: 0,
          reportsResolved: 0,
          systemUpdates: 0,
          issuesResolved: 0,
          reportsGenerated: 0,
          configurationChanges: 0
        },
        permissions: []
      } as Partial<AdminProfile>

    default:
      return baseProfile
  }
}

export function UserProfileForm({ initialData, onSubmit, onCancel, mode }: UserProfileFormProps) {
  // Use a more flexible type for formData
  const [formData, setFormData] = useState<any>(() => {
    if (initialData?.role === 'admin') {
      return initialData as Partial<AdminProfile>
    }
    
    // Default to student role if no initialData or role is provided
    const defaultRole: UserRole = 'student'
    const role: UserRole = initialData && 'role' in initialData && typeof initialData.role === 'string' 
      ? initialData.role as UserRole 
      : defaultRole
      
    return initialData || getDefaultProfileForRole(role)
  })

  useEffect(() => {
    if (initialData) {
      if (initialData.role === 'admin') {
        setFormData(initialData as Partial<AdminProfile>)
      } else {
        setFormData(initialData)
      }
    }
  }, [initialData])

  const handleAvatarUpload = async (files: File[]) => {
    if (files.length > 0) {
      // In a real app, we would upload to a server
      const file = files[0]
      setFormData((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(file),
      }))
    }
  }

  const handleRoleChange = (value: string | string[]) => {
    if (Array.isArray(value)) return // We don't support multiple roles
    
    const role = value as UserRole
    setFormData(getDefaultProfileForRole(role))
  }

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case 'teacher':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Teaching Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">School</label>
                <Input
                  value={(formData as Partial<TeacherProfile>)?.teachingDetails?.school || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      teachingDetails: {
                        ...(prev as TeacherProfile)?.teachingDetails,
                        school: e.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Years of Experience</label>
                <Input
                  type="number"
                  value={(formData as Partial<TeacherProfile>)?.teachingDetails?.yearsOfExperience || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      teachingDetails: {
                        ...(prev as TeacherProfile)?.teachingDetails,
                        yearsOfExperience: parseInt(e.target.value),
                      },
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Subjects</label>
                <Input
                  placeholder="Comma-separated subjects"
                  value={(formData as Partial<TeacherProfile>)?.teachingDetails?.subjects?.join(', ') || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      teachingDetails: {
                        ...(prev as TeacherProfile)?.teachingDetails,
                        subjects: e.target.value.split(',').map((s) => s.trim()),
                      },
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Grades</label>
                <Input
                  placeholder="Comma-separated grades"
                  value={(formData as Partial<TeacherProfile>)?.teachingDetails?.grades?.join(', ') || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      teachingDetails: {
                        ...(prev as TeacherProfile)?.teachingDetails,
                        grades: e.target.value.split(',').map((s) => s.trim()),
                      },
                    }))
                  }
                />
              </div>
            </div>
          </div>
        )

      case 'student':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Learning Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Learning Style</label>
                <Select
                  value={(formData as Partial<StudentProfile>)?.learningPreferences?.learningStyle || ''}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      learningPreferences: {
                        ...(prev as Partial<StudentProfile>)?.learningPreferences,
                        learningStyle: value
                      }
                    }))
                  }
                  options={[
                    { value: 'visual', label: 'Visual' },
                    { value: 'auditory', label: 'Auditory' },
                    { value: 'kinesthetic', label: 'Kinesthetic' },
                    { value: 'reading', label: 'Reading/Writing' }
                  ]}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Pace Preference</label>
                <Select
                  value={(formData as Partial<StudentProfile>)?.learningPreferences?.pacePreference || ''}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      learningPreferences: {
                        ...(prev as Partial<StudentProfile>)?.learningPreferences,
                        pacePreference: value
                      }
                    }))
                  }
                  options={[
                    { value: 'slow', label: 'Slow' },
                    { value: 'moderate', label: 'Moderate' },
                    { value: 'fast', label: 'Fast' }
                  ]}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Group Work</label>
                <Select
                  value={(formData as Partial<StudentProfile>)?.learningPreferences?.groupWork || ''}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      learningPreferences: {
                        ...(prev as Partial<StudentProfile>)?.learningPreferences,
                        groupWork: value
                      }
                    }))
                  }
                  options={[
                    { value: 'always', label: 'Always' },
                    { value: 'sometimes', label: 'Sometimes' },
                    { value: 'rarely', label: 'Rarely' }
                  ]}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Preferred Subjects</label>
                <Select
                  value={(formData as Partial<StudentProfile>)?.learningPreferences?.preferredSubjects || []}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      learningPreferences: {
                        ...(prev as Partial<StudentProfile>)?.learningPreferences,
                        preferredSubjects: Array.isArray(value) ? value : [value]
                      }
                    }))
                  }
                  options={[
                    { value: 'math', label: 'Mathematics' },
                    { value: 'science', label: 'Science' },
                    { value: 'english', label: 'English' },
                    { value: 'history', label: 'History' },
                    { value: 'art', label: 'Art' }
                  ]}
                  multiple
                />
              </div>
            </div>
          </div>
        )

      case 'content_creator':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Content Creator Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Subjects</label>
                <Input
                  placeholder="Comma-separated subjects"
                  value={(formData as Partial<ContentCreatorProfile>)?.expertise?.subjects?.join(', ') || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      expertise: {
                        ...(prev as ContentCreatorProfile)?.expertise,
                        subjects: e.target.value.split(',').map((s) => s.trim()),
                      },
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Grade Ranges</label>
                <Input
                  placeholder="Comma-separated grades"
                  value={(formData as Partial<ContentCreatorProfile>)?.expertise?.gradeRanges?.join(', ') || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      expertise: {
                        ...(prev as ContentCreatorProfile)?.expertise,
                        gradeRanges: e.target.value.split(',').map((s) => s.trim()),
                      },
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Languages</label>
                <Input
                  placeholder="Comma-separated languages"
                  value={(formData as Partial<ContentCreatorProfile>)?.expertise?.languages?.join(', ') || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      expertise: {
                        ...(prev as ContentCreatorProfile)?.expertise,
                        languages: e.target.value.split(',').map((s) => s.trim()),
                      },
                    }))
                  }
                />
              </div>
            </div>
          </div>
        )

      case 'admin':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Administrator Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Admin Level</label>
                <Select
                  value={(formData as Partial<AdminProfile>)?.adminLevel || 'regular'}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      adminLevel: value as AdminProfile['adminLevel'],
                    }))
                  }
                  options={[
                    { value: 'regular', label: 'Regular Admin' },
                    { value: 'moderator', label: 'Moderator' },
                    { value: 'super', label: 'Super Admin' }
                  ]}
                />
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Permissions</h4>
              <div className="grid gap-2">
                {['userManagement', 'contentModeration', 'systemConfiguration', 'analytics', 'billing'].map(
                  (permission) => (
                    <label key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={
                          ((formData as Partial<AdminProfile>)?.permissions || []).includes(permission) || false
                        }
                        onChange={(e) => {
                          const currentPermissions = (formData as Partial<AdminProfile>)?.permissions || []
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              permissions: [...currentPermissions, permission]
                            })
                          } else {
                            setFormData({
                              ...formData,
                              permissions: currentPermissions.filter(p => p !== permission)
                            })
                          }
                        }}
                        className="rounded border-surface-200 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm">
                        {permission.charAt(0).toUpperCase() + permission.slice(1).replace(/([A-Z])/g, ' $1')}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>
        )

      case 'parent':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Parent Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Children</label>
                {(formData as Partial<ParentProfile>)?.children?.map((child, index) => (
                  <div key={index} className="mt-2 grid gap-2 md:grid-cols-3">
                    <Input
                      placeholder="Name"
                      value={child.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          children: (prev as ParentProfile)?.children?.map((c, i) =>
                            i === index ? { ...c, name: e.target.value } : c
                          ),
                        }))
                      }
                    />
                    <Input
                      placeholder="Grade"
                      value={child.grade}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          children: (prev as ParentProfile)?.children?.map((c, i) =>
                            i === index ? { ...c, grade: e.target.value } : c
                          ),
                        }))
                      }
                    />
                    <Input
                      placeholder="School"
                      value={child.school}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          children: (prev as ParentProfile)?.children?.map((c, i) =>
                            i === index ? { ...c, school: e.target.value } : c
                          ),
                        }))
                      }
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      children: [
                        ...(((prev as ParentProfile)?.children || []) as ParentProfile['children']),
                        { studentId: '', name: '', grade: '', school: '' },
                      ],
                    }))
                  }
                >
                  Add Child
                </Button>
              </div>
            </div>
          </div>
        )
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Basic Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              value={formData.name || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <Input
              type="tel"
              value={formData.phoneNumber || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Role</label>
            <Select
              value={formData.role || 'student'}
              onChange={handleRoleChange}
              disabled={mode === 'edit'}
              options={roleOptions}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Profile Picture</h3>
        <MediaUploader
          onUpload={handleAvatarUpload}
          accept={{
            'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
          }}
          maxFiles={1}
        />
        {formData.avatar && (
          <div className="mt-2">
            <img
              src={formData.avatar}
              alt="Profile preview"
              className="h-20 w-20 rounded-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Preferences</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Language</label>
            <Select
              value={formData.preferences?.language || 'en'}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  preferences: {
                    ...prev.preferences,
                    language: Array.isArray(value) ? value[0] : value
                  }
                }))
              }
              options={[
                { value: 'en', label: 'English' },
                { value: 'sw', label: 'Swahili' },
                { value: 'fr', label: 'French' }
              ]}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Region</label>
            <Select
              value={formData.preferences?.region || 'East Africa'}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  preferences: {
                    ...prev.preferences,
                    region: Array.isArray(value) ? value[0] : value
                  }
                }))
              }
              options={[
                { value: 'East Africa', label: 'East Africa' },
                { value: 'West Africa', label: 'West Africa' },
                { value: 'Southern Africa', label: 'Southern Africa' },
                { value: 'Central Africa', label: 'Central Africa' }
              ]}
            />
          </div>
        </div>
      </div>

      {renderRoleSpecificFields()}

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{mode === 'create' ? 'Create User' : 'Save Changes'}</Button>
      </div>
    </form>
  )
}
