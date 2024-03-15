'use client'

import { Button } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import ImageFallback from '@/components/ImageFallback'
import Letter from '@/components/Letter'

function ContactUsPage() {
  const t = useTranslations('ContactUs')

  const characters = t('desc').split('')

  return (
    <div className='ct-container-70 py-[70px] 3xl:py-[80px]'>
      <div className='flex flex-col gap-[20px] lg:gap-[40px]'>
        <div className='flex flex-col items-center justify-center gap-[20px] pt-[60px] lg:gap-[40px]'>
          <h1 className='text-[2.4rem] font-bold text-primary-blue lg:text-[3.6rem]'>{t('heading')}</h1>
          <div className='max-w-[800px] text-center text-[1.8rem] font-light'>
            {characters.map((character, index) => (
              <Letter key={index} index={index} character={character} />
            ))}
          </div>
        </div>
        <motion.div
          initial={{
            y: 40,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 1.5,
            type: 'tween'
          }}
          className='grid w-full overflow-hidden rounded-[20px] xl:grid-cols-2 13inch:grid-cols-3'
        >
          <div className='z-5 relative order-2 flex flex-col justify-between bg-white/30 p-[12px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] lg:p-[24px] xl:order-1'>
            <div className='absolute inset-0 z-[-5] translate-x-[-10px] translate-y-[-10px] overflow-hidden rounded-[20px] bg-gradient-to-r from-[#ededed] to-white blur-lg' />
            <div className='flex flex-col gap-[8px] 13inch:gap-[24px]'>
              <h2 className='text-[2.4rem] font-semibold'>{t('text3')}</h2>
              <p className='text-[1.8rem] font-light'>
                {t('text6')}: {t('text4')}
              </p>
              <div className='*:text-[1.8rem] *:font-light'>
                <p>{t('text5')}: 0912 426 404</p>
                <p>Email: admin@vuatho.com</p>
              </div>
              <p className='text-[1.8rem] font-light'>
                {t('text2')}: {t('timeNumber')}
              </p>
              <p className='text-[1.8rem] font-light'>{t('text')}</p>
            </div>
            <Link href={'https://maps.app.goo.gl/Zh6eMrdEy9E6AYfZA'} target='_blank' className='mt-[10px] cursor-pointer'>
              <Button disableRipple className='h-[40px] w-full bg-primary-yellow text-[1.8rem] transition 13inch:h-[48px]' radius='md'>
                {t('text1')}
              </Button>
            </Link>
          </div>
          <div className='z-10 order-1 xl:order-2 13inch:col-span-2'>
            <ImageFallback src={'/to-the-moon/to-the-moon-3.png'} alt='to-the-moon-3' height={400} width={1200} className='pointer-events-none select-none object-cover' priority />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ContactUsPage
