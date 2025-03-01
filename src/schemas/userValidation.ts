import { z } from 'zod'

const baseUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z.string().email('Invalid email address'),
  olympicId: z
    .string()
    .min(3, 'Olympic ID must be at least 3 characters')
    .max(20, 'Olympic ID must be less than 20 characters'),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional(),
  avatar: z.string().url('Invalid avatar URL').optional(),
  preferences: z.object({
    language: z.enum(['English', 'Swahili'], {
      errorMap: () => ({ message: 'Please select a valid language' }),
    }),
    region: z.enum(['East Africa', 'West Africa', 'Southern Africa', 'North Africa'], {
      errorMap: () => ({ message: 'Please select a valid region' }),
    }),
    theme: z.enum(['light', 'dark', 'system']),
    notifications: z.object({
      email: z.boolean(),
      push: z.boolean(),
      sms: z.boolean(),
    }),
    accessibility: z.object({
      fontSize: z.enum(['small', 'medium', 'large']),
      contrast: z.enum(['normal', 'high']),
      reduceMotion: z.boolean(),
    }),
  }),
})

export const teacherSchema = baseUserSchema.extend({
  role: z.literal('teacher'),
  teachingDetails: z.object({
    school: z.string().min(3, 'School name must be at least 3 characters'),
    district: z.string().min(2, 'District must be at least 2 characters'),
    state: z.string().min(2, 'State must be at least 2 characters'),
    licenseInfo: z.string().optional(),
    specializations: z.array(z.string()).min(1, 'At least one specialization is required'),
    yearsOfExperience: z.number().min(0).max(50),
    grades: z.array(z.string()).min(1, 'At least one grade is required'),
    subjects: z.array(z.string()).min(1, 'At least one subject is required'),
  }),
  classrooms: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, 'Classroom name is required'),
      grade: z.string(),
      subject: z.string(),
      studentCount: z.number().min(0),
    })
  ),
})

export const studentSchema = baseUserSchema.extend({
  role: z.literal('student'),
  educationDetails: z.object({
    grade: z.string().min(1, 'Grade is required'),
    school: z.string().min(3, 'School name must be at least 3 characters').optional(),
    enrollmentYear: z.number().min(2000).max(new Date().getFullYear()),
    guardianEmail: z.string().email('Invalid guardian email').optional(),
  }),
  learningPreferences: z.object({
    preferredSubjects: z.array(z.string()).min(1, 'At least one preferred subject is required'),
    learningStyle: z.enum(['visual', 'auditory', 'reading', 'kinesthetic']),
    pacePreference: z.enum(['slow', 'medium', 'fast']),
    difficultyPreference: z.enum(['beginner', 'intermediate', 'advanced']),
  }),
})

export const contentCreatorSchema = baseUserSchema.extend({
  role: z.literal('content_creator'),
  expertise: z.object({
    subjects: z.array(z.string()).min(1, 'At least one subject is required'),
    gradeRanges: z.array(z.string()).min(1, 'At least one grade range is required'),
    contentTypes: z.array(z.string()).min(1, 'At least one content type is required'),
    languages: z.array(z.string()).min(1, 'At least one language is required'),
  }),
  portfolio: z.object({
    resourcesCreated: z.number().min(0),
    totalDownloads: z.number().min(0),
    averageRating: z.number().min(0).max(5),
    featuredContent: z.array(z.string()),
  }),
})

export const adminSchema = baseUserSchema.extend({
  role: z.literal('admin'),
  permissions: z.object({
    userManagement: z.boolean(),
    contentModeration: z.boolean(),
    systemConfiguration: z.boolean(),
    analytics: z.boolean(),
    billing: z.boolean(),
  }),
  adminLevel: z.enum(['super', 'regular', 'moderator']),
})

export const parentSchema = baseUserSchema.extend({
  role: z.literal('parent'),
  children: z
    .array(
      z.object({
        studentId: z.string(),
        name: z.string().min(2, 'Child name must be at least 2 characters'),
        grade: z.string().min(1, 'Grade is required'),
        school: z.string().min(3, 'School name must be at least 3 characters'),
      })
    )
    .min(1, 'At least one child is required'),
  parentalControls: z.object({
    screenTimeLimit: z.number().min(0).optional(),
    contentRestrictions: z.array(z.string()),
    notificationPreferences: z.object({
      progressUpdates: z.boolean(),
      assessmentResults: z.boolean(),
      behaviorReports: z.boolean(),
    }),
  }),
})

export const userSchema = z.discriminatedUnion('role', [
  teacherSchema,
  studentSchema,
  contentCreatorSchema,
  adminSchema,
  parentSchema,
])

export type UserValidationSchema = typeof userSchema
export type TeacherValidationSchema = typeof teacherSchema
export type StudentValidationSchema = typeof studentSchema
export type ContentCreatorValidationSchema = typeof contentCreatorSchema
export type AdminValidationSchema = typeof adminSchema
export type ParentValidationSchema = typeof parentSchema
