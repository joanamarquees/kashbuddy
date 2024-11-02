import React, { forwardRef }  from 'react'
import { twMerge } from 'tailwind-merge'

export const Input = forwardRef((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={twMerge(
        'px-4 h-12 bg-zinc-900 border border-zinc-950 rounded-2xl placeholder-zinc-400 outline-none text-sm hover:border-zinc-800 focus-visible:border-indigo-400 focus-visible:ring-4 ring-indigo-400/10',
        props.className
      )}
    />
  )
})

Input.displayName = 'Input'