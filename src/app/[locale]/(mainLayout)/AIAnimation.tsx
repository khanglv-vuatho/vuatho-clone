'use client'

import animationData1 from '@/components/animateJson/robotAnimation.json'
import lottie from 'lottie-web'
import { useEffect, useRef } from 'react'

function AIAnimation() {
  return (
    <>
      <AnimationAI />
    </>
  )
}

const AnimationAI = () => {
  const container = useRef(null)

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: container.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData1,
    })

    return () => instance.destroy()
  }, [])

  return <div ref={container} />
}

export default AIAnimation
