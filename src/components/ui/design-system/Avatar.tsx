import * as React from 'react'
import { cn } from '@/lib/utils'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  status?: 'online' | 'offline' | 'away' | 'busy'
  shape?: 'circle' | 'square'
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', status, shape = 'circle', ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false)

    const sizes = {
      xs: {
        container: 'h-6 w-6',
        text: 'text-xs',
        status: 'h-1.5 w-1.5'
      },
      sm: {
        container: 'h-8 w-8',
        text: 'text-sm',
        status: 'h-2 w-2'
      },
      md: {
        container: 'h-10 w-10',
        text: 'text-base',
        status: 'h-2.5 w-2.5'
      },
      lg: {
        container: 'h-12 w-12',
        text: 'text-lg',
        status: 'h-3 w-3'
      },
      xl: {
        container: 'h-14 w-14',
        text: 'text-xl',
        status: 'h-3.5 w-3.5'
      },
      '2xl': {
        container: 'h-16 w-16',
        text: 'text-2xl',
        status: 'h-4 w-4'
      }
    }

    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-surface-300',
      away: 'bg-yellow-500',
      busy: 'bg-red-500'
    }

    const getFallbackInitials = (name: string) => {
      return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    return (
      <div className="relative inline-block" ref={ref} {...props}>
        <div
          className={cn(
            'flex items-center justify-center overflow-hidden bg-surface-100',
            shape === 'circle' ? 'rounded-full' : 'rounded-lg',
            sizes[size].container,
            className
          )}
        >
          {src && !hasError ? (
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              onError={() => setHasError(true)}
            />
          ) : (
            <span
              className={cn(
                'font-medium text-surface-900',
                sizes[size].text
              )}
            >
              {fallback ? getFallbackInitials(fallback) : '??'}
            </span>
          )}
        </div>
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 block rounded-full ring-2 ring-white',
              statusColors[status],
              sizes[size].status
            )}
          />
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    max?: number
    spacing?: 'tight' | 'normal' | 'loose'
  }
>(({ className, children, max, spacing = 'normal', ...props }, ref) => {
  const spacingStyles = {
    tight: '-space-x-2',
    normal: '-space-x-3',
    loose: '-space-x-4'
  }

  const childrenArray = React.Children.toArray(children)
  const excess = max ? childrenArray.length - max : 0

  return (
    <div
      ref={ref}
      className={cn('flex flex-row-reverse', spacingStyles[spacing], className)}
      {...props}
    >
      {excess > 0 && (
        <Avatar>
          <span>+{excess}</span>
        </Avatar>
      )}
      {max ? childrenArray.slice(0, max) : children}
    </div>
  )
})
AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarGroup }
export type { AvatarProps }
