import React, { forwardRef }  from 'react'
import { tv } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center justify-center gap-2 rounded-full font-sans font-semibold',

  variants: {
    variant: {
      primary:'bg-indigo-400 hover:bg-indigo-300 ring-indigo-400',
      secondary: 'bg-gray-500 hover:bg-gray-400 ring-gray-500',
    },

    size: {
      default: 'px-6 py-3.5',
      sm: 'px-4 py-1.5',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

export const Button = forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={button({ variant, size, className })}
      />
    )
  }
)

Button.displayName = 'Button'
