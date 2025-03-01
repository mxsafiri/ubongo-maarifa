import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'hover' | 'active';
  className?: string;
}

export const GlassCard = ({
  children,
  variant = 'default',
  className,
  ...props
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/10 to-white/5 p-6',
        'backdrop-blur-xl backdrop-filter',
        'border border-white/10',
        'shadow-lg shadow-black/5',
        {
          'hover:bg-white/15 transition-colors duration-300': variant === 'hover',
          'bg-white/15': variant === 'active',
        },
        className
      )}
      {...props}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
