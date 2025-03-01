import * as React from 'react'
import { Transition } from '@headlessui/react'
import { 
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon as XIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'info' | 'warning' | 'error'
  open?: boolean
  onClose?: () => void
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = 'default', children, open = false, onClose, ...props }, ref) => {
    const icons = {
      default: null,
      success: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
      info: <InformationCircleIcon className="h-5 w-5 text-blue-500" />,
      warning: <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />,
      error: <XCircleIcon className="h-5 w-5 text-red-500" />
    }

    const variants = {
      default: 'bg-white border-surface-200',
      success: 'bg-green-50 border-green-200',
      info: 'bg-blue-50 border-blue-200',
      warning: 'bg-yellow-50 border-yellow-200',
      error: 'bg-red-50 border-red-200'
    }

    return (
      <Transition
        show={open}
        enter="transition-all duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition-all duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div
          ref={ref}
          className={cn(
            'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
            variants[variant],
            className
          )}
          {...props}
        >
          <div className="flex items-start gap-3">
            {icons[variant]}
            <div className="flex-1">{children}</div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-2 top-2 rounded-md p-1 text-surface-400 opacity-0 transition-opacity hover:text-surface-500 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </Transition>
    )
  }
)
Toast.displayName = 'Toast'

const ToastGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ToastGroup.displayName = 'ToastGroup'

const ToastProvider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ToastProvider.displayName = 'ToastProvider'

const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ToastViewport.displayName = 'ToastViewport'

const ToastTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-lg font-bold', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ToastTitle.displayName = 'ToastTitle'

const ToastDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-sm', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ToastDescription.displayName = 'ToastDescription'

const ToastAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-sm', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ToastAction.displayName = 'ToastAction'

const ToastClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('absolute right-2 top-2 rounded-md p-1 text-surface-400 opacity-0 transition-opacity hover:text-surface-500 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100', className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
ToastClose.displayName = 'ToastClose'

export {
  Toast,
  ToastGroup,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose
}
export type { ToastProps }
