import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        glow: `relative bg-accent text-background font-semibold
          rounded-xl overflow-hidden
          transition-all duration-300 ease-out
          hover:shadow-[0_0_20px_rgba(201,168,76,0.5)] hover:scale-105
          active:scale-95
          before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500
          group inline-flex items-center justify-center gap-2`,
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  // Wrap text children with glow effect span for glow variant
  const wrappedChildren = variant === 'glow' && typeof children === 'string' 
    ? (
        <span className="relative inline-block">
          {children}
          {/* Shine overlay */}
          <span className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm rounded-lg" />
          {/* Glowing text shadow effect */}
          <span className="absolute inset-0 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" style={{
            textShadow: '0 0 12px rgba(255,255,255,0.8), 0 0 20px rgba(201,168,76,0.6), 0 0 30px rgba(201,168,76,0.3)',
            pointerEvents: 'none',
          }}>
            {children}
          </span>
        </span>
      )
    : children

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {wrappedChildren}
    </Comp>
  )
}

export { Button, buttonVariants }
