import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'error'
  showValue?: boolean
  label?: string
  animated?: boolean
  indeterminate?: boolean
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    value, 
    max = 100, 
    size = 'md',
    variant = 'default',
    showValue = false,
    label,
    animated = true,
    indeterminate = false,
    className,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3'
    }

    const variants = {
      default: 'bg-primary-600',
      success: 'bg-green-600',
      warning: 'bg-yellow-600',
      error: 'bg-red-600'
    }

    return (
      <div className="w-full" ref={ref} {...props}>
        {(label || showValue) && (
          <div className="mb-2 flex items-center justify-between text-sm">
            {label && <div className="font-medium text-surface-900">{label}</div>}
            {showValue && (
              <div className="text-surface-500">{Math.round(percentage)}%</div>
            )}
          </div>
        )}
        <div
          className={cn(
            'overflow-hidden rounded-full bg-surface-100',
            sizes[size],
            className
          )}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              variants[variant],
              {
                'animate-progress': animated && !indeterminate,
                'animate-indeterminate': indeterminate
              }
            )}
            style={{
              width: indeterminate ? '100%' : `${percentage}%`,
              transition: animated ? 'width 500ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
            }}
          />
        </div>
      </div>
    )
  }
)
Progress.displayName = 'Progress'

export { Progress }
export type { ProgressProps }
