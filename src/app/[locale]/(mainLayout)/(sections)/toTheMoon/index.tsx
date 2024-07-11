'use client'

import { useTranslations } from 'next-intl'
import { memo } from 'react'

import { AndroidBtn, IosBtn } from '@/components/DownloadApps'
import { Screen } from '@/components/animateScreen'
import QRCode from 'react-qr-code'

function SectionToTheMoon() {
  const t = useTranslations('ToTheMoon')
  const tdl = useTranslations('Download')
  const td = useTranslations('Extra')

  return (
    <div className='ct-container grid grid-cols-1 gap-[48px] bg-primary-blue px-4 py-[48px] lg:grid-cols-3 lg:rounded-xl lg:px-[100px]'>
      <div className='flex items-center lg:col-span-2'>
        <div className='flex flex-col gap-6 lg:gap-[80px]'>
          <div className='flex flex-col gap-4'>
            <div className='mx-auto flex flex-col gap-1 text-center lg:mx-0 lg:text-left'>
              <h3 className='text-sm font-bold uppercase text-primary-yellow md:text-base'>{td('text')}</h3>
              <h2 className='text-2xl font-bold uppercase text-white lg:text-4xl'>{t('title')}</h2>
            </div>
            <p className='text-center text-sm text-white xs:text-base lg:text-left 2xl:text-lg'>{t('desc')}</p>
            <Screen className='mx-auto h-[354px] w-[200px] min-w-0 max-w-[200px] lg:mx-0 lg:hidden' />
          </div>
          <div className='flex w-full justify-center gap-2 lg:justify-between'>
            <div className='flex flex-col gap-2 md:gap-5'>
              <p className='text-center text-base font-bold uppercase text-white lg:text-left lg:text-xl'>{tdl('text3')}</p>
              <div className='mx-auto grid grid-cols-1 items-center justify-center gap-2 xl:grid-cols-2 xl:gap-5'>
                <AndroidBtn />
                <IosBtn />
              </div>
            </div>
            <div className='hidden flex-col gap-2 lg:flex'>
              <p className='text-sm text-white xs:text-base 2xl:text-lg'>{tdl('text2')}</p>
              <div className='flex w-fit items-center justify-center rounded-lg bg-white p-2'>
                <QRCode value='https://vuatho.com/vi/qrcode-download-app' size={150} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end'>
        <Screen className='mx-auto hidden w-[278px] max-w-[278px]  lg:mx-0 lg:block' />
      </div>
    </div>
  )
}

export default memo(SectionToTheMoon)
