import { SelectHTMLAttributes } from 'react'

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  value: string | string[]
  onChange: (value: string | string[]) => void
  options: { value: string; label: string }[]
  multiple?: boolean
  className?: string
  error?: string
}

export function Select({ value, onChange, options, multiple, className, error, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`block w-full rounded-md border-surface-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
          error ? 'border-red-500' : ''
        } ${className || ''}`}
        value={multiple ? (Array.isArray(value) ? value : []) : value}
        onChange={(e) => {
          if (multiple) {
            const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value)
            onChange(selectedOptions)
          } else {
            onChange(e.target.value)
          }
        }}
        multiple={multiple}
        {...props}
      >
        {!multiple && <option value="">Select...</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
