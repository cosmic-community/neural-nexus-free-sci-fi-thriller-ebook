import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, variant = 'default', size = 'md', ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    
    const variants = {
      default: 'bg-primary',
      secondary: 'bg-secondary',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      destructive: 'bg-destructive',
    }

    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-muted',
          sizes[size],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-full w-full flex-1 transition-all duration-500 ease-out',
            variants[variant]
          )}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    )
  }
)

Progress.displayName = 'Progress'

export { Progress }