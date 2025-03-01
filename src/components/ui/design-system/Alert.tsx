import * as React from 'react'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon as XIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  onClose?: () => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, description, icon, action, onClose, ...props }, ref) => {
    const variants = {
      info: {
        container: 'bg-blue-50 border-blue-200',
        icon: 'text-blue-500',
        title: 'text-blue-800',
        description: 'text-blue-700',
        close: 'text-blue-500 hover:text-blue-600'
      },
      success: {
        container: 'bg-green-50 border-green-200',
        icon: 'text-green-500',
        title: 'text-green-800',
        description: 'text-green-700',
        close: 'text-green-500 hover:text-green-600'
      },
      warning: {
        container: 'bg-yellow-50 border-yellow-200',
        icon: 'text-yellow-500',
        title: 'text-yellow-800',
        description: 'text-yellow-700',
        close: 'text-yellow-500 hover:text-yellow-600'
      },
      error: {
        container: 'bg-red-50 border-red-200',
        icon: 'text-red-500',
        title: 'text-red-800',
        description: 'text-red-700',
        close: 'text-red-500 hover:text-red-600'
      }
    }

    const icons = {
      info: <InformationCircleIcon className={cn('h-5 w-5', variants[variant].icon)} />,
      success: <CheckCircleIcon className={cn('h-5 w-5', variants[variant].icon)} />,
      warning: <ExclamationCircleIcon className={cn('h-5 w-5', variants[variant].icon)} />,
      error: <XCircleIcon className={cn('h-5 w-5', variants[variant].icon)} />
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-lg border p-4',
          variants[variant].container,
          className
        )}
        {...props}
      >
        <div className="flex">
          {(icon || icons[variant]) && (
            <div className="flex-shrink-0">
              {icon || icons[variant]}
            </div>
          )}
          <div className="ml-3 flex-1">
            {title && (
              <h3 className={cn('text-sm font-medium', variants[variant].title)}>
                {title}
              </h3>
            )}
            {description && (
              <div className={cn('mt-2 text-sm', variants[variant].description)}>
                {description}
              </div>
            )}
            {action && (
              <div className="mt-4">
                {action}
              </div>
            )}
          </div>
          {onClose && (
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  className={cn(
                    'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                    variants[variant].close,
                    'focus:ring-' + variant + '-500 focus:ring-offset-' + variant + '-50'
                  )}
                  onClick={onClose}
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)
Alert.displayName = 'Alert'

export { Alert }
export type { AlertProps }
