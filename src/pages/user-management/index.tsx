import { useState } from 'react'
import { Dialog } from '@/components/ui/design-system/Dialog'
import { Input } from '@/components/ui/design-system/Input'
import { Button } from '@/components/ui/design-system/Button'
import { Select } from '@/components/ui/design-system/Select'
import type { TeacherProfile, StudentProfile } from '@/types/user'

const sampleUsers = [
  {
    id: '1',
    userId: 'T123',
    email: 'john.teacher@school.com',
    name: 'John Smith',
    role: 'teacher' as const,
    status: 'active' as const,
    createdAt: '2025-01-01',
    lastLogin: '2025-02-28',
    stats: {
      lastActive: '2025-02-28',
      loginCount: 150,
      totalTimeSpent: 360000,
      classesCreated: 12,
      studentsManaged: 120,
      assignmentsCreated: 45,
      averageResponseTime: 24,
      feedbackGiven: 230,
      coursesCreated: 8,
      totalStudentsReached: 350,
      averageRating: 4.8,
      activitiesCompleted: 180,
      resourcesShared: 65
    },
    preferences: {
      theme: 'light' as const,
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      language: 'en',
      region: 'East Africa',
      accessibility: {
        fontSize: 'medium' as const,
        contrast: 'normal' as const,
        reduceMotion: false
      }
    },
    department: 'Science',
    subjects: ['Physics', 'Chemistry'],
    classrooms: ['10A', '10B', '11A', '11B'],
    schedule: {
      'Monday': ['8:00-9:30', '10:00-11:30'],
      'Wednesday': ['9:00-10:30', '13:00-14:30'],
      'Friday': ['11:00-12:30', '14:00-15:30']
    },
    teachingDetails: {
      yearsOfExperience: 5,
      specializations: ['Physics', 'Chemistry'],
      certifications: ['Teaching License', 'Science Education'],
      education: {
        degree: 'Masters in Education',
        institution: 'University of Education',
        year: 2020
      },
      school: 'Main High School',
      subjects: ['Physics', 'Chemistry', 'General Science'],
      grades: ['10th', '11th']
    }
  } as TeacherProfile,
  {
    id: '2',
    userId: 'S456',
    email: 'sarah.student@school.com',
    name: 'Sarah Student',
    role: 'student' as const,
    status: 'active' as const,
    createdAt: '2023-01-15',
    lastLogin: '2023-03-01',
    stats: {
      lastActive: '2023-03-01',
      loginCount: 45,
      totalTimeSpent: 3600,
      assignmentsCompleted: 15,
      quizzesTaken: 10,
      averageQuizScore: 85,
      totalLearningTime: 2800,
      participationRate: 90,
      coursesEnrolled: [],
      coursesCompleted: 3,
      certificatesEarned: 2,
      badges: ['quick_learner', 'team_player']
    },
    preferences: {
      language: 'en',
      region: 'East Africa',
      theme: 'light' as const,
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      accessibility: {
        fontSize: 'medium' as const,
        contrast: 'normal' as const,
        reduceMotion: false
      }
    },
    learningPreferences: {
      preferredSubjects: ['math', 'science'],
      learningStyle: 'visual',
      pacePreference: 'moderate',
      groupWork: 'sometimes'
    }
  } as StudentProfile
]

export default function UserManagement() {
  const [users, setUsers] = useState(sampleUsers)
  const [selectedRole, setSelectedRole] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [newUser, setNewUser] = useState({
    role: 'student'
  })

  const filteredUsers = users.filter(user => {
    if (selectedRole !== 'all' && user.role !== selectedRole) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      )
    }
    return true
  })

  const renderUserDetails = (user: Partial<TeacherProfile | StudentProfile>) => {
    switch (user.role) {
      case 'student':
        const studentProfile = user as StudentProfile
        return (
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
              <span className="text-sm text-surface-500">Certificates</span>
              <span className="font-medium">{studentProfile.stats.certificatesEarned}</span>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Department</span>
              <span className="font-medium">{(user as TeacherProfile).department}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-500">Subjects</span>
              <span className="font-medium">{(user as TeacherProfile).subjects.join(', ')}</span>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={() => setShowUserDialog(true)}>Add User</Button>
      </div>

      <div className="flex gap-4">
        <div className="space-y-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">Role</label>
          <Select
            value={selectedRole}
            onChange={(value) => setSelectedRole(Array.isArray(value) ? value[0] : value)}
            options={[
              { value: 'all', label: 'All Roles' },
              { value: 'student', label: 'Student' },
              { value: 'teacher', label: 'Teacher' },
              { value: 'admin', label: 'Admin' },
              { value: 'content_creator', label: 'Content Creator' },
              { value: 'parent', label: 'Parent' }
            ]}
          />
        </div>
        <Input
          type="search"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map(user => (
          <div key={user.id} className="hover:shadow-lg transition-shadow">
            <div className="p-4">
              <h2 className="text-lg font-bold">{user.name}</h2>
            </div>
            <div className="p-4 space-y-2">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Status:</strong> {user.status}</p>
              {renderUserDetails(user)}
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={showUserDialog}
        onOpenChange={setShowUserDialog}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Add New User</h2>
          <div className="space-y-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">Role</label>
            <Select
              value={newUser.role}
              onChange={(value) =>
                setNewUser((prev) => ({
                  ...prev,
                  role: Array.isArray(value) ? value[0] : value
                }))
              }
              options={[
                { value: 'student', label: 'Student' },
                { value: 'teacher', label: 'Teacher' },
                { value: 'admin', label: 'Admin' },
                { value: 'content_creator', label: 'Content Creator' },
                { value: 'parent', label: 'Parent' }
              ]}
            />
          </div>
        </div>
      </Dialog>
    </div>
  )
}
