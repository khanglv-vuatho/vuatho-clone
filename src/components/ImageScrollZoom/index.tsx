'use client'

import { MotionValue, useScroll, motion, useTransform } from 'framer-motion'
import React, { useRef } from 'react'
import ImageFallback from '../ImageFallback'
import { useSmallScreen } from '@/hook'

type Props = {
  thumb: string
}

const ImageScrollZoom = ({ thumb }: Props) => {
  const container = useRef<HTMLInputElement | null>(null)
  const { scrollYProgress }: { scrollYProgress: MotionValue<number> } = useScroll({
    target: container,
    offset: ['0 1', '1 0.9']
  })
  const isSmallScreen: boolean = useSmallScreen()

  const y: MotionValue<string> = useTransform(scrollYProgress, [0, 1], [60 + 'vw', 100 + 'vw'])
  const y2: MotionValue<string> = useTransform(scrollYProgress, [0, 1], [30 + 'vh', isSmallScreen ? '400px' : 100 + 'vh'])
  const y3: MotionValue<number> = useTransform(scrollYProgress, [0, 0.6, 1], [0.5, 1, 1])
  return (
    <div ref={container} className='flex max-h-[500px] min-h-[400px] items-center justify-center px-[8px] lg:h-dvh lg:max-h-none lg:pb-[20px] lg:pt-[40px]'>
      <motion.div style={{ width: y, height: y2, opacity: y3 }} className='relative h-full min-w-[1/2] lg:h-auto'>
        <div className='absolute inset-0'>
          <ImageFallback src={thumb} alt={thumb} height={1000} width={3000} className='size-full object-contain' />
        </div>
      </motion.div>
    </div>
  )
}

export default ImageScrollZoom
