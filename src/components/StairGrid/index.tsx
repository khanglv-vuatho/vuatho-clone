'use client'

import React, { useRef } from 'react'
import ImageFallback from '../ImageFallback'
import { MotionValue, useScroll, motion, useTransform } from 'framer-motion'

const StairGird = ({ cols = 3 }: { cols?: number }) => {
  const dataImages: string[] = ['/contact-us/hero-1.jpeg', '/contact-us/hero-1.jpeg', '/contact-us/hero-1.jpeg']
  const container = useRef<HTMLInputElement | null>(null)
  const { scrollYProgress }: { scrollYProgress: MotionValue<number> } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  })

  const y: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <div ref={container} className={`ct-container-70 grid grid-cols-1 md:grid-cols-${cols} gap-[10px]`}>
      {dataImages?.map((item, index) => {
        return (
          <motion.div key={index} style={{ y }} className={`relative`}>
            <ImageFallback src={item} alt='' width={2000} height={2000} className='size-full object-contain' />
          </motion.div>
        )
      })}
    </div>
  )
}

export default StairGird
