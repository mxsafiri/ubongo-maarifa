import * as React from 'react'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface DropdownMenuProps {
  children: React.ReactNode
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  return <Menu as="div" className="relative inline-block text-left">{children}</Menu>
}

interface DropdownMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const DropdownMenuButton = React.forwardRef<HTMLButtonElement, DropdownMenuButtonProps>(
  ({ className, children, ...props }, ref) => (
    <Menu.Button
      ref={ref}
      className={cn(
        'inline-flex w-full items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-100',
        'dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
    </Menu.Button>
  )
)
DropdownMenuButton.displayName = 'DropdownMenuButton'

const DropdownMenuItems = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Menu.Items
    ref={ref}
    className={cn(
      'absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
      'dark:bg-gray-800 dark:ring-gray-700',
      className
    )}
    {...props}
  />
))
DropdownMenuItems.displayName = 'DropdownMenuItems'

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <Menu.Item>
    {({ active }) => (
      <div
        ref={ref}
        className={cn(
          'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200',
          active && 'bg-gray-100 dark:bg-gray-700',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )}
  </Menu.Item>
))
DropdownMenuItem.displayName = 'DropdownMenuItem'

DropdownMenu.Button = DropdownMenuButton
DropdownMenu.Items = DropdownMenuItems
DropdownMenu.Item = DropdownMenuItem

export { DropdownMenu }
export type { DropdownMenuProps, DropdownMenuButtonProps }
