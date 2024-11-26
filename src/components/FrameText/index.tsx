'use client'

import { cn } from '@nextui-org/react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const FrameText = ({ children, className, imageClassName }: { children: React.ReactNode; className?: string; imageClassName?: string }) => {
  const textRef = useRef<HTMLParagraphElement>(null) // Ref để tham chiếu tới phần tử <p>
  const [textWidth, setTextWidth] = useState(0) // Lưu chiều rộng thực tế của nội dung

  useEffect(() => {
    const handleResize = () => {
      if (textRef.current) {
        setTextWidth(textRef.current.offsetWidth)
      }
    }

    // Initial measurement
    handleResize()

    // Add resize listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [children])

  return (
    <div className='flex w-full justify-center'>
      <div
        className={cn('relative', className)}
        style={{
          width: `${textWidth + 300}px` // Thêm padding hoặc margin nếu cần
        }}
      >
        <Image
          className={cn('size-full h-[80px]', imageClassName)}
          src={'/shineWithVuaTho/frameText.png'}
          alt='frame.png'
          width={textWidth + 300} // Chiều rộng dựa trên nội dung
          height={80}
        />
        <p
          ref={textRef} // Tham chiếu tới <p>
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-xl font-bold uppercase text-white md:text-3xl'
        >
          {children}
        </p>
      </div>
    </div>
  )
}

export default FrameText
