import * as React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Disclosure, Transition } from '@headlessui/react'
import { cn } from '@/lib/utils'

interface AccordionItemProps {
  value: string
  trigger: React.ReactNode
  children: React.ReactNode
  disabled?: boolean
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  children: React.ReactNode
  collapsible?: boolean
}

const AccordionContext = React.createContext<{
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  type?: 'single' | 'multiple'
  collapsible?: boolean
}>({})

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type = 'single', ...props }, ref) => {
    const [value, setValue] = React.useState<string | string[]>(
      props.defaultValue || (type === 'multiple' ? [] : '')
    )

    const handleValueChange = (itemValue: string) => {
      if (type === 'single') {
        setValue(value === itemValue && props.collapsible ? '' : itemValue)
      } else {
        setValue((prev: string | string[]) => {
          const array = Array.isArray(prev) ? prev : []
          return array.includes(itemValue)
            ? array.filter((v) => v !== itemValue)
            : [...array, itemValue]
        })
      }
    }

    return (
      <AccordionContext.Provider
        value={{
          value: props.value !== undefined ? props.value : value,
          onValueChange: props.onValueChange || handleValueChange,
          type,
          collapsible: props.collapsible
        }}
      >
        <div ref={ref} className={cn('space-y-1', className)} {...props}>
          {props.children}
        </div>
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = 'Accordion'

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, trigger, children, disabled, ...props }, ref) => {
    const context = React.useContext(AccordionContext)
    const isOpen = Array.isArray(context.value)
      ? context.value.includes(value)
      : context.value === value

    return (
      <div ref={ref} {...props}>
        <Disclosure defaultOpen={isOpen}>
          {({ open }) => (
            <>
              <Disclosure.Button
                disabled={disabled}
                onClick={() => context.onValueChange?.(value)}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-4 py-2 text-left text-sm font-medium',
                  'bg-surface-100 hover:bg-surface-200',
                  'focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {trigger}
                <ChevronDownIcon
                  className={cn(
                    'h-5 w-5 text-surface-500 transition-transform duration-200',
                    open && 'rotate-180'
                  )}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel
                  className={cn(
                    'mt-2 px-4 text-sm text-surface-500'
                  )}
                >
                  {children}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    )
  }
)
AccordionItem.displayName = 'AccordionItem'

export { Accordion, AccordionItem }
export type { AccordionProps, AccordionItemProps }
