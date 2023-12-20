'use client'

import lottie from 'lottie-web'
import { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

import animationAboutUs from '@/components/animateJson/aboutUs_banner.json'
import animationData from '@/components/animateJson/downloadApp.json'

export const Screen = ({ style }: { style?: string }) => {
  const container = useRef(null)

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: container.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
    })

    return () => instance.destroy()
  }, [])

  return (
    <div
      ref={container}
      className={twMerge(
        'h-[500px] min-w-[260px] overflow-hidden 13inch:h-[700px] 13inch:min-w-[300px]',
        style,
      )}
    ></div>
  )
}

export const AboutUsScreen = ({ style }: { style?: string }) => {
  const container = useRef(null)

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: container.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationAboutUs,
    })

    return () => instance.destroy()
  }, [])

  return (
    <div
      ref={container}
      className={twMerge(
        'h-[500px] min-w-[260px] overflow-hidden 13inch:h-[800px] 13inch:min-w-[400px]',
        style,
      )}
    ></div>
  )
}
