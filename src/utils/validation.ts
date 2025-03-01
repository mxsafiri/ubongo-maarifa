import { z } from 'zod'
import type {
  UserProfile,
  TeacherProfile,
  StudentProfile,
  ContentCreatorProfile,
  AdminProfile,
  ParentProfile,
} from '@/types/user'

export interface ValidationResult {
  isValid: boolean
  message?: string
  suggestions?: string[]
}

// Base user schema
const baseUserSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(2),
  phoneNumber: z.string().optional(),
  avatar: z.string().url().optional(),
  role: z.enum(['admin', 'teacher', 'student', 'content_creator', 'parent']),
  status: z.enum(['active', 'inactive']),
  createdAt: z.string().datetime(),
  lastLogin: z.string().datetime(),
  preferences: z.object({
    theme: z.enum(['light', 'dark']),
    notifications: z.object({
      email: z.boolean(),
      push: z.boolean(),
      sms: z.boolean(),
    }),
    language: z.string(),
    region: z.string(),
    accessibility: z.object({
      fontSize: z.enum(['small', 'medium', 'large']),
      contrast: z.enum(['normal', 'high']),
      reduceMotion: z.boolean(),
    }),
  }),
})

// Teacher specific schema
const teacherSchema = baseUserSchema.extend({
  role: z.literal('teacher'),
  department: z.string(),
  subjects: z.array(z.string()),
  classrooms: z.array(z.string()),
  schedule: z.record(z.array(z.string())),
  teachingDetails: z.object({
    yearsOfExperience: z.number().min(0),
    specializations: z.array(z.string()),
    certifications: z.array(z.string()),
    education: z.object({
      degree: z.string(),
      institution: z.string(),
      year: z.number(),
    }),
    school: z.string(),
    subjects: z.array(z.string()),
    grades: z.array(z.string()),
  }),
})

// Student specific schema
const studentSchema = baseUserSchema.extend({
  role: z.literal('student'),
  learningPreferences: z.object({
    preferredSubjects: z.array(z.string()),
    learningStyle: z.string(),
    pacePreference: z.string(),
    groupWork: z.string(),
  }),
})

// Content creator specific schema
const contentCreatorSchema = baseUserSchema.extend({
  role: z.literal('content_creator'),
  contentTypes: z.array(z.string()),
  publishedResources: z.number(),
  rating: z.number().min(0).max(5),
  expertise: z.object({
    subjects: z.array(z.string()),
    levels: z.array(z.string()),
    languages: z.array(z.string()),
    tools: z.array(z.string()),
    gradeRanges: z.array(z.string()),
  }),
})

// Parent specific schema
const parentSchema = baseUserSchema.extend({
  role: z.literal('parent'),
  children: z.array(
    z.object({
      studentId: z.string(),
      name: z.string(),
      grade: z.string(),
      school: z.string(),
    })
  ),
  parentalControls: z.object({
    screenTime: z.number(),
    contentRestrictions: z.array(z.string()),
  }),
})

// Admin specific schema
const adminSchema = baseUserSchema.extend({
  role: z.literal('admin'),
  adminLevel: z.enum(['super', 'regular', 'moderator']),
  permissions: z.array(z.string()),
  activityLog: z.object({
    lastAction: z.string(),
    actionCount: z.number(),
  }),
})

export function validateField(field: string, value: any, role: UserProfile['role']): ValidationResult {
  try {
    let schema
    switch (role) {
      case 'teacher':
        schema = teacherSchema
        break
      case 'student':
        schema = studentSchema
        break
      case 'content_creator':
        schema = contentCreatorSchema
        break
      case 'parent':
        schema = parentSchema
        break
      case 'admin':
        schema = adminSchema
        break
      default:
        schema = baseUserSchema
    }

    // Create a partial schema for the specific field
    const fieldPath = field.split('.')
    let fieldSchema = schema
    for (const path of fieldPath) {
      fieldSchema = fieldSchema.shape[path]
    }

    // Validate the field
    fieldSchema.parse(value)
    return { isValid: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        message: error.errors[0].message,
      }
    }
    return {
      isValid: false,
      message: 'Invalid field value',
    }
  }
}
