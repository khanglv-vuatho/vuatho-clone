'use client'

import ImageFallback from '@/components/ImageFallback'
import { useLocale } from 'next-intl'
import { memo } from 'react'

const SectionServices = () => {
  const locale = useLocale()

  return (
    <>
      <ImageFallback src={`/images/Banner_danganhnghe_mobile_${locale}.webp`} alt='banner' width={3000} height={700} className='object-contain md:hidden' />
      <ImageFallback src={`/images/banner_da_nganh_nghe-${locale}.webp`} alt='banner' width={3000} height={700} className='hidden object-contain md:block' />
    </>
  )
}

export default memo(SectionServices)
