import React from 'react'
import { forwardRef, type ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = ComponentProps<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={twMerge(
        'px-4 h-12 bg-zinc-900 border border-zinc-950 rounded-2xl placeholder-zinc-400 outline-none text-sm hover:border-zinc-800 focus-visible:border-pink-500 focus-visible:ring-4 ring-pink-500/10',
        props.className
      )}
    />
  )
})

Input.displayName = 'Input'