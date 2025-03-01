import * as React from 'react'
import * as DialogPrimitive from '@headlessui/react'
import { XMarkIcon as XIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
  children?: React.ReactNode
}

interface DialogContentProps {
  children?: React.ReactNode
  className?: string
  onClose?: () => void
}

interface DialogHeaderProps {
  className?: string
  children?: React.ReactNode
}

interface DialogFooterProps {
  className?: string
  children?: React.ReactNode
}

interface DialogTitleProps {
  className?: string
  children?: React.ReactNode
}

interface DialogDescriptionProps {
  className?: string
  children?: React.ReactNode
}

const Dialog = ({ open, onOpenChange, onClose, children }: DialogProps) => {
  const handleClose = () => {
    onClose?.()
    onOpenChange?.(false)
  }

  return (
    <DialogPrimitive.Dialog open={open} onClose={handleClose}>
      {children}
    </DialogPrimitive.Dialog>
  )
}

const DialogContent = ({ children, className, onClose }: DialogContentProps) => {
  return (
    <DialogPrimitive.Dialog.Panel
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'bg-black/50 backdrop-blur-sm'
      )}
    >
      <div
        className={cn(
          'relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800',
          'transform transition-all',
          className
        )}
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
        {children}
      </div>
    </DialogPrimitive.Dialog.Panel>
  )
}

const DialogHeader = ({ className, children }: DialogHeaderProps) => {
  return <div className={cn('mb-4', className)}>{children}</div>
}

const DialogFooter = ({ className, children }: DialogFooterProps) => {
  return <div className={cn('mt-6 flex justify-end space-x-2', className)}>{children}</div>
}

const DialogTitle = ({ className, children }: DialogTitleProps) => {
  return (
    <DialogPrimitive.Dialog.Title className={cn('text-lg font-semibold', className)}>
      {children}
    </DialogPrimitive.Dialog.Title>
  )
}

const DialogDescription = ({ className, children }: DialogDescriptionProps) => {
  return (
    <DialogPrimitive.Dialog.Description className={cn('text-sm text-gray-500', className)}>
      {children}
    </DialogPrimitive.Dialog.Description>
  )
}

Dialog.Content = DialogContent
Dialog.Header = DialogHeader
Dialog.Footer = DialogFooter
Dialog.Title = DialogTitle
Dialog.Description = DialogDescription

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  type DialogProps,
  type DialogContentProps,
  type DialogHeaderProps,
  type DialogFooterProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
}
