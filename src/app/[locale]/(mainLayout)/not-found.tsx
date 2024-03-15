'use client'

import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <div className='w-full bg-[#f8f8f8]'>
      <div className='flex h-[80vh] w-full flex-col items-center justify-center'>
        <div className='flex h-full w-full items-center justify-center '>
          <div className='flex flex-col items-center justify-center gap-10'>
            <Image src={'/images/404.png'} alt='404' width={400} height={400} className='size-[300px] object-contain' />
            <p className='text-[2.4rem] font-bold lg:text-[3.6rem]'>{t('text')}</p>
            <Link href={'/'}>
              <Button
                variant='bordered'
                size='lg'
                className='h-[40px] rounded-2xl border-primary-blue text-[2.2rem] font-bold leading-[40px] text-primary-blue hover:bg-primary-blue hover:text-white  lg:h-[44px] lg:leading-[44px]'
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
