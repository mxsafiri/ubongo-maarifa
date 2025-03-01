import * as React from 'react'
import { cn } from '@/lib/utils'

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'surface'
}

export function Loading({ 
  size = 'md', 
  variant = 'primary',
  className,
  ...props 
}: LoadingProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  const variants = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    surface: 'text-surface-600'
  }

  return (
    <div
      role="status"
      className={cn('animate-spin', sizes[size], variants[variant], className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-surface-950/80">
      <Loading size="lg" />
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="flex h-[200px] items-center justify-center rounded-lg border border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-950">
      <Loading />
    </div>
  )
}
