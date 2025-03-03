import * as React from 'react'
import { CheckIcon, MinusIcon } from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  indeterminate?: boolean
  error?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
  description?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate, error, size = 'md', label, description, ...props }, ref) => {
    const checkboxRef = React.useRef<HTMLInputElement | null>(null)

    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = !!indeterminate
      }
    }, [indeterminate])

    const sizes = {
      sm: {
        checkbox: 'h-4 w-4',
        icon: 'h-3 w-3',
        label: 'text-sm',
        description: 'text-xs'
      },
      md: {
        checkbox: 'h-5 w-5',
        icon: 'h-4 w-4',
        label: 'text-base',
        description: 'text-sm'
      },
      lg: {
        checkbox: 'h-6 w-6',
        icon: 'h-5 w-5',
        label: 'text-lg',
        description: 'text-base'
      }
    }

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            ref={(e) => {
              checkboxRef.current = e
              if (typeof ref === 'function') ref(e)
              else if (ref) ref.current = e
            }}
            className={cn(
              'form-checkbox rounded border-2 border-surface-300 text-primary-600 transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-600 focus:ring-red-600',
              sizes[size].checkbox,
              className
            )}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="ml-3">
            {label && (
              <label
                htmlFor={props.id}
                className={cn(
                  'font-medium text-surface-900',
                  props.disabled && 'opacity-50',
                  sizes[size].label
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                className={cn(
                  'text-surface-500',
                  props.disabled && 'opacity-50',
                  sizes[size].description
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
        {(props.checked || indeterminate) && (
          <div
            className={cn(
              'pointer-events-none absolute flex items-center justify-center',
              sizes[size].checkbox
            )}
          >
            {indeterminate ? (
              <MinusIcon className={cn('text-white', sizes[size].icon)} />
            ) : (
              <CheckIcon className={cn('text-white', sizes[size].icon)} />
            )}
          </div>
        )}
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
export type { CheckboxProps }
