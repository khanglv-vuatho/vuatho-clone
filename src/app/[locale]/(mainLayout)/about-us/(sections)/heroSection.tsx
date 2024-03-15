'use client'

import { useTranslations } from 'next-intl'
import { memo } from 'react'

import ImageFallback from '@/components/ImageFallback'

const HeroSection = () => {
  const t = useTranslations('AboutUs')
  return (
    <div className='w-full pt-[100px] md:pb-[100px] 3xl:pt-[80px]'>
      <div className='ct-container-70 flex flex-col md:mt-[40px] md:flex-row'>
        <div className='col-span-2 md:mt-[100px] md:w-[80%]'>
          <h3 className='text-[1.8rem] font-semibold uppercase tracking-[4px] md:text-[2rem]'>
            {t('heading1')} <br />
            {t('heading2')}
          </h3>
          <p className='bg-gradient-to-r from-[#ff7c54] via-[#ffcc3f] to-[#ff783a] bg-clip-text text-left text-[2.4rem] font-bold uppercase text-[#f5b500] text-transparent xl:text-[3.2rem]'>
            {t('heading')}
          </p>
          <div className='w-full'>
            <p className='text-[1.8rem] font-light'>{t('text')}</p>
          </div>
        </div>
        <div className='relative mb-[35px] mt-[40px] w-full md:mt-0'>
          {/* <div className='mx-auto max-w-[400px]'>
            <AnimatePhone />
          </div> */}
          <div className='absolute right-0 h-full w-[520px] bg-red-200'>
            <ImageFallback src={'/contact-us/hero-1.jpeg'} alt='hero-1' height={600} width={800} className='h-full w-full object-cover' />
          </div>
          <div className='absolute bottom-[-30%] left-[10%] w-[300px] bg-white p-[10px]'>
            <ImageFallback src={'/to-the-moon/to-the-moon-2.jpeg'} alt='to-the-moon-2' height={300} width={300} className='w-auto' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(HeroSection)
