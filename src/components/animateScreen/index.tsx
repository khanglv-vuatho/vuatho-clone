'use client'

import lottie from 'lottie-web'
import { memo, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

import animationAboutUs from '@/components/animateJson/aboutUs_banner.json'
import animationData from '@/components/animateJson/downloadApp2.json'

export const Screen = memo(({ className }: { className?: string }) => {
  const container = useRef(null)

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: container.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData
    })

    return () => instance.destroy()
  }, [])

  return <div ref={container} className={twMerge('h-[578px] min-w-[278px] overflow-hidden', className)}></div>
})
