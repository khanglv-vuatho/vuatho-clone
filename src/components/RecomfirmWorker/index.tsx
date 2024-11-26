import React, { useState } from 'react'
import ImageFallback from '../ImageFallback'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

const RecomfirmWorker = ({ setIsOpenModal }: { setIsOpenModal: (isOpen: boolean) => void }) => {
  const locale = useLocale()
  const t = useTranslations('Store')

  return (
    <div className='flex min-h-[400px] w-full flex-col items-center justify-center gap-5'>
      <div className='max-w-[150px]'>
        <ImageFallback src={'/store/only-services-provider.webp'} width={307} height={240} alt='image' className='object-cover' />
      </div>
      <p className='max-w-[500px] text-center text-lg '>{t('text8')}</p>
      <div className='flex items-center gap-4'>
        <Button variant='bordered' className='h-[44px] w-full border-[#FCB813] px-5  font-medium text-[#282828]' radius='full' onClick={() => setIsOpenModal(true)}>
          {t('text9')}
        </Button>
        <Link href={`/${locale}/become-services-provider`}>
          <Button className='h-[44px] w-full bg-[#FCB813] px-5  font-medium text-[#282828]' radius='full'>
            {t('text10')}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default RecomfirmWorker
