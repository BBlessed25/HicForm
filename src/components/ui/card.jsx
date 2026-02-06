import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const cardVariants = cva('glass rounded-xl text-foreground', {
  variants: {
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
})

export function Card({ className, padding, ...props }) {
  return (
    <div className={cn(cardVariants({ padding }), className)} {...props} />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('space-y-2', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('space-y-6', className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return (
    <div
      className={cn('mt-6 flex flex-wrap items-center gap-3', className)}
      {...props}
    />
  )
}
