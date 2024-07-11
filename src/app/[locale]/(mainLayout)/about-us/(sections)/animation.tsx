'use client'

import lottie from 'lottie-web'
import { useEffect, useRef } from 'react'

import animationData1 from '@/components/animateJson/websiteAbout.json'

function AnimationToTheMoon() {
  return (
    <>
      <AnimateAbout />
    </>
  )
}

const AnimateAbout = () => {
  const container = useRef(null)
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: container.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData1
    })

    return () => instance.destroy()
  }, [])

  return <div ref={container} />
}

export default AnimationToTheMoon
