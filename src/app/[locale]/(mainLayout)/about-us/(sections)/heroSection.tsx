'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

import animationData from '@/components/animateJson/aboutUs_banner.json'
import { useTranslations } from 'next-intl'

import lottie from 'lottie-web'

const HeroSection = () => {
  const t = useTranslations('AboutUs')

  return (
    <div className='relative w-full bg-[#FED32C] pb-[100px] pt-[64px] 3xl:pt-[80px]'>
      <div className='ct-container-70 flex flex-col items-center justify-center pt-10 md:flex-row'>
        <div className=' order-2 w-full'>
          <h3 className='text-[2.4rem] font-semibold'>
            {t('heading1')} <br />
            {t('heading2')}
          </h3>
          <p className='hidden text-[3.2rem] font-bold md:block'> {t('heading')}</p>
          <div className='w-full'>
            <p className='w-full py-4 text-[1.8rem]'>{t('text')}</p>
          </div>
        </div>
        <div className='order-1 mb-[35px] w-full md:order-3'>
          <p className='my-4 block w-full whitespace-nowrap text-center text-[3.2rem] font-bold md:hidden '>
            {t('heading')}
          </p>
          <div className='mx-auto max-w-[400px]'>
            <AnimatePhone />
          </div>
        </div>
      </div>
      <div className='absolute bottom-[-10%] w-full '>
        <Image
          src={'/images/about-us/bottom.png'}
          height={149}
          width={2700}
          quality={100}
          alt='bottom'
          className='pointer-events-none h-full w-full'
        />
      </div>
    </div>
  )
}

const AnimatePhone = () => {
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

  return <div ref={container} className='' />
}

export default HeroSection
