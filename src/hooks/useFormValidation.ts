import { useState, useCallback } from 'react'
import { z } from 'zod'
import type { UserProfile } from '@/types/user'
import {
  userSchema,
  teacherSchema,
  studentSchema,
  contentCreatorSchema,
  adminSchema,
  parentSchema,
} from '@/schemas/userValidation'

export interface ValidationError {
  path: string[]
  message: string
}

export interface UseFormValidationReturn {
  errors: ValidationError[]
  validateField: (path: string[], value: any) => boolean
  validateForm: (data: Partial<UserProfile>) => ValidationError[]
  clearErrors: () => void
  hasErrors: boolean
}

export function useFormValidation(role: UserProfile['role']): UseFormValidationReturn {
  const [errors, setErrors] = useState<ValidationError[]>([])

  const getSchemaForRole = useCallback(() => {
    switch (role) {
      case 'teacher':
        return teacherSchema
      case 'student':
        return studentSchema
      case 'content_creator':
        return contentCreatorSchema
      case 'admin':
        return adminSchema
      case 'parent':
        return parentSchema
      default:
        return userSchema
    }
  }, [role])

  const validateField = useCallback(
    (path: string[], value: any): boolean => {
      const schema = getSchemaForRole()
      let fieldSchema: z.ZodType<any>
      try {
        fieldSchema = path.reduce((schema: any, path) => {
          if (schema.shape?.[path]) {
            return schema.shape[path]
          }
          return schema
        }, schema)
      } catch (error) {
        return true // Field not found in schema
      }

      try {
        fieldSchema.parse(value)
        // Remove any existing errors for this field
        setErrors((prev) =>
          prev.filter((error) => !error.path.every((segment, i) => segment === path[i]))
        )
        return true
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newError: ValidationError = {
            path: path.map(p => String(p)),
            message: error.errors[0]?.message || 'Invalid value',
          }
          // Update errors, replacing any existing errors for this field
          setErrors((prev) => [
            ...prev.filter((error) => !error.path.every((segment, i) => segment === path[i])),
            newError,
          ])
          return false
        }
        return true
      }
    },
    [getSchemaForRole]
  )

  const validateForm = useCallback(
    (data: Partial<UserProfile>): ValidationError[] => {
      const schema = getSchemaForRole()
      try {
        schema.parse(data)
        setErrors([])
        return []
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: ValidationError[] = error.errors.map((err) => ({
            path: err.path.map(p => String(p)),
            message: err.message,
          }))
          setErrors(newErrors)
          return newErrors
        }
        return []
      }
    },
    [getSchemaForRole]
  )

  const clearErrors = useCallback(() => {
    setErrors([])
  }, [])

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    hasErrors: errors.length > 0,
  }
}

// Helper function to get nested object value by path
export function getNestedValue(obj: any, path: string[]): any {
  return path.reduce((current, key) => {
    return current?.[key]
  }, obj)
}

// Helper function to set nested object value by path
export function setNestedValue(obj: any, path: string[], value: any): any {
  if (path.length === 0) return value
  const [head, ...rest] = path
  return {
    ...obj,
    [head]: rest.length === 0 ? value : setNestedValue(obj[head] || {}, rest, value),
  }
}
