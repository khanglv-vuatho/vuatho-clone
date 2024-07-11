'use client'

import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <div className='w-full bg-[#f8f8f8]'>
      <div className='ct-container flex h-[80vh] w-full flex-col items-center justify-center'>
        <div className='flex h-full w-full items-center justify-center '>
          <div className='flex flex-col items-center justify-center gap-4 lg:gap-10'>
            <Image src={'/images/booking/404.png'} alt='404' width={400} height={400} className='size-[300px] object-contain' />
            <p className='font-bold lg:text-xl'>{t('text')}</p>
            <Link href={'/'}>
              <Button
                variant='bordered'
                size='lg'
                className='h-10 rounded-xl border-primary-blue text-lg font-bold leading-10 text-primary-blue hover:bg-primary-blue hover:text-white lg:h-[44px]  lg:text-2xl lg:leading-[44px]'
              >
                {t('button')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
