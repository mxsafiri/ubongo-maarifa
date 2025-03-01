import * as React from 'react'
import { Transition } from '@headlessui/react'
import { cn } from '@/lib/utils'

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  className?: string
}

const Tooltip = ({ content, children, className }: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setIsOpen(false), 100)
  }

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      <Transition
        show={isOpen}
        enter="transition duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div
          className={cn(
            'absolute z-50 -translate-y-full -translate-x-1/2 top-0 left-1/2 mt-0.5 px-2 py-1',
            'rounded border border-surface-200 bg-white text-sm text-surface-900 shadow-md',
            className
          )}
          role="tooltip"
        >
          {content}
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-surface-200 bg-white" />
        </div>
      </Transition>
    </div>
  )
}

export { Tooltip }
export type { TooltipProps }
