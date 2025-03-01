import * as React from 'react'
import { RadioGroup } from '@headlessui/react'
import { cn } from '@/lib/utils'

interface RadioOption {
  id: string
  label: string
  description?: string
  disabled?: boolean
}

interface RadioProps {
  value: string
  onChange: (value: string) => void
  options: RadioOption[]
  label?: string
  className?: string
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
}

const Radio = React.forwardRef<HTMLDivElement, RadioProps>(
  ({ value, onChange, options, label, className, orientation = 'vertical', size = 'md' }, ref) => {
    const sizes = {
      sm: {
        radio: 'h-4 w-4',
        label: 'text-sm',
        description: 'text-xs'
      },
      md: {
        radio: 'h-5 w-5',
        label: 'text-base',
        description: 'text-sm'
      },
      lg: {
        radio: 'h-6 w-6',
        label: 'text-lg',
        description: 'text-base'
      }
    }

    return (
      <RadioGroup
        ref={ref}
        value={value}
        onChange={onChange}
        className={cn('flex flex-col gap-2', className)}
      >
        {label && (
          <RadioGroup.Label className="text-sm font-medium text-surface-900">
            {label}
          </RadioGroup.Label>
        )}
        <div
          className={cn(
            'flex gap-4',
            orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
          )}
        >
          {options.map((option) => (
            <RadioGroup.Option
              key={option.id}
              value={option.id}
              disabled={option.disabled}
              className={({ active, checked }) =>
                cn(
                  'relative flex cursor-pointer focus:outline-none',
                  option.disabled && 'opacity-50 cursor-not-allowed'
                )
              }
            >
              {({ active, checked }) => (
                <div className="flex items-start">
                  <div className="flex items-center">
                    <span
                      className={cn(
                        'flex items-center justify-center rounded-full border',
                        checked
                          ? 'border-primary-600 bg-primary-600'
                          : 'border-surface-300 bg-white',
                        active && 'ring-2 ring-offset-2 ring-primary-600',
                        sizes[size].radio
                      )}
                    >
                      {checked && (
                        <span className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </span>
                  </div>
                  <div className="ml-3">
                    <RadioGroup.Label
                      as="span"
                      className={cn(
                        'font-medium text-surface-900',
                        sizes[size].label
                      )}
                    >
                      {option.label}
                    </RadioGroup.Label>
                    {option.description && (
                      <RadioGroup.Description
                        as="span"
                        className={cn(
                          'block text-surface-500',
                          sizes[size].description
                        )}
                      >
                        {option.description}
                      </RadioGroup.Description>
                    )}
                  </div>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    )
  }
)
Radio.displayName = 'Radio'

export { Radio }
export type { RadioProps, RadioOption }
