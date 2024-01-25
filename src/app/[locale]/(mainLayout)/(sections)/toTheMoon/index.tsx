'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { memo } from 'react'

import ImageFallback from '@/components/ImageFallback'

function SectionToTheMoon() {
  const t = useTranslations('ToTheMoon')
  const td = useTranslations('Extra')

  return (
    <div className='ct-container-70 grid lg:grid-cols-2'>
      <div className='order-1 flex flex-col justify-center gap-[10px]'>
        <>
          <h3 className='font-bold uppercase tracking-[8px]'>{td('text')}</h3>
          <h2 className='text-[2.4rem] font-semibold text-primary-blue md:text-[3.2rem]'>{t('title')}</h2>
        </>
        <motion.p
          initial={{
            opacity: 0,
            x: -200,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.5,
            duration: 0.3,
          }}
          viewport={{ once: true }}
          className='text-[1.8rem] font-light'
        >
          {t('desc')}
        </motion.p>
      </div>
      <div className='z-[-1] order-none lg:relative lg:right-[20%] lg:order-2 lg:min-h-[570px] lg:min-w-[680px]'>
        <ImageFallback src={'/home/test12.webp'} alt='' height={280} quality={100} width={1028} className='size-full object-contain lg:absolute' />
      </div>
    </div>
  )
}
export default memo(SectionToTheMoon)
