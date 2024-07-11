import { useLocale, useTranslations } from 'next-intl'

import ImageFallback from '@/components/ImageFallback'
import { playball } from '@/font'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

function SectionWithVuaTho() {
  const t = useTranslations('WithVuaTho')
  const td = useTranslations('Footer')

  const locale = useLocale()

  return (
    <div className='ct-container grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-[80px]'>
      <div className='size-full lg:col-span-3'>
        <ImageFallback src={'/to-the-moon/to-the-moon.webp'} alt='to-the-moon' className='size-full object-contain' />
      </div>
      <div className='lg:col-span-2 lg:py-[90px]'>
        <div className='flex flex-col gap-4 lg:gap-[48px]'>
          <div className='flex flex-col gap-2 lg:gap-4'>
            <div className='flex flex-col gap-2'>
              <p className='text-sm font-bold uppercase text-primary-yellow md:text-xl'>{td('about_us')}</p>
              <div className='text-2xl font-bold uppercase text-primary-blue lg:text-4xl'>
                <p className='max-w-[60%] md:max-w-[83%]'>{t('title')} Vua Thợ</p>
              </div>
            </div>
            <div className={playball.className + ' flex gap-2 text-xl  lg:text-3xl'}>
              <p className=' text-[#a6a6a6]'>“{t('slogan')}”</p>
            </div>
            <p className='text-sm text-baseBlack xs:text-base 2xl:text-lg'>{t('text')}</p>
          </div>
          <Link href={`/${locale}/about-us`}>
            <Button className='flex h-[48px] w-fit items-center justify-center rounded-full bg-primary-yellow px-6 text-base font-semibold'>{t('readmore')}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SectionWithVuaTho
