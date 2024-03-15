import { memo, useState } from 'react'
import ImageFallback from '../ImageFallback'
import { twMerge } from 'tailwind-merge'
import { ImageProps } from 'next/image'

type TImageZoom = { sizeImg?: string; style?: string; src: string; alt: string; width: number; height: number } & ImageProps

export const ImageZoom = memo(({ sizeImg, style, src, alt, ...props }: TImageZoom) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setPosition({ x, y })
  }

  return (
    <div className={`overflow-hidden ${sizeImg ? sizeImg : 'flex size-full items-center justify-center'}`}>
      <ImageFallback
        alt={alt}
        src={src}
        className={twMerge('size-full object-contain hover:scale-[2.0]', style)}
        onMouseMove={handleMouseMove}
        {...props}
        style={{ transformOrigin: `${position.x}% ${position.y}%`, transition: 'transform 0.5s ease' }}
      />
    </div>
  )
})
