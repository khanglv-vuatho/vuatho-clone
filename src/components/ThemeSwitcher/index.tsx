'use client'

import { MoonIcon, SunIcon } from '@/components/Icons'
import { VisuallyHidden, useSwitch } from '@nextui-org/react'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeSwitcher({ props }: { props?: any }) {
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } =
    useSwitch(props)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='flex cursor-pointer flex-col gap-2'>
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input
            {...getInputProps()}
            value={theme}
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              'h-8 w-8',
              'flex items-center justify-center',
              'rounded-lg bg-transparent',
            ],
          })}
        >
          {theme === 'light' ? <SunIcon /> : <MoonIcon />}
        </div>
      </Component>
    </div>
  )
}
