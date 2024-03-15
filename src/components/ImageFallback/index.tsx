'use client'

import Image, { ImageProps } from 'next/image'
import { useState, forwardRef, Ref, memo } from 'react'

type ImageFallbackProps = {
  fallback?: string
  width: number
  height: number
} & ImageProps

const ImageFallback = forwardRef(({ src, alt, className, width, height, fallback: customFallback = '/default.webp', ...props }: ImageFallbackProps, ref: Ref<HTMLImageElement>) => {
  const [fallback, setFallback] = useState<string | any>('')

  const _handleError = () => {
    setFallback(customFallback)
  }

  return <Image className={className} ref={ref} src={fallback || src} alt={alt} width={width} height={height} {...props} onError={_handleError} />
})

export default memo(ImageFallback)
