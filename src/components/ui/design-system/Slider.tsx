import * as React from 'react'
import { cn } from '@/lib/utils'

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  showValue?: boolean
  error?: boolean
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, showValue, error, value, ...props }, ref) => {
    return (
      <div className="w-full">
        {(label || showValue) && (
          <div className="mb-2 flex items-center justify-between">
            {label && (
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-sm text-gray-500 dark:text-gray-400">{value}</span>
            )}
          </div>
        )}
        <input
          type="range"
          ref={ref}
          value={value}
          className={cn(
            'h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            'dark:bg-gray-700',
            '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4',
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow',
            '[&::-webkit-slider-thumb]:transition-all',
            '[&::-webkit-slider-thumb]:hover:scale-110',
            error && 'focus:ring-red-500',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = 'Slider'

export { Slider }
export type { SliderProps }
