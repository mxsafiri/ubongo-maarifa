import * as React from 'react'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import { cn } from '@/lib/utils'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
  className?: string
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onChange, disabled, label, className }, ref) => {
    return (
      <HeadlessSwitch.Group>
        <div className="flex items-center">
          <HeadlessSwitch
            ref={ref}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={cn(
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              checked ? 'bg-primary-600' : 'bg-gray-200',
              disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
          >
            <span
              className={cn(
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                checked ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </HeadlessSwitch>
          {label && (
            <HeadlessSwitch.Label className="ml-3 text-sm text-gray-700 dark:text-gray-200">
              {label}
            </HeadlessSwitch.Label>
          )}
        </div>
      </HeadlessSwitch.Group>
    )
  }
)
Switch.displayName = 'Switch'

export { Switch }
export type { SwitchProps }
