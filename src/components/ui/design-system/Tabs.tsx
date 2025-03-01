import * as React from 'react'
import { Tab } from '@headlessui/react'
import { cn } from '@/lib/utils'

const Tabs = Tab.Group

const TabsList = React.forwardRef<
  React.ElementRef<typeof Tab.List>,
  React.ComponentPropsWithoutRef<typeof Tab.List>
>(({ className, ...props }, ref) => (
  <Tab.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-lg bg-surface-100 p-1 text-surface-500',
      className
    )}
    {...props}
  />
))
TabsList.displayName = Tab.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof Tab>,
  React.ComponentPropsWithoutRef<typeof Tab>
>(({ className, ...props }, ref) => (
  <Tab
    ref={ref}
    className={({ selected }) =>
      cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        selected
          ? 'bg-white text-surface-900 shadow-sm'
          : 'text-surface-500 hover:text-surface-900',
        className
      )
    }
    {...props}
  />
))
TabsTrigger.displayName = Tab.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof Tab.Panel>,
  React.ComponentPropsWithoutRef<typeof Tab.Panel>
>(({ className, ...props }, ref) => (
  <Tab.Panel
    ref={ref}
    className={cn(
      'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-400 focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = Tab.Panel.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
