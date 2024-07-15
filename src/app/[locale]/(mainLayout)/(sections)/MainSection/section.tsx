import { useTranslations } from 'next-intl'

import { Wave } from '@/components/Icons'
import ImageFallback from '@/components/ImageFallback'
import { ImageMotion, QuickDashboard } from '.'
import Link from 'next/link'

const MainSection = () => {
  const t = useTranslations('MainSection')

  return (
    <div className='relative overflow-hidden bg-white'>
      <div className='ct-container z-1 relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5'>
        <div className='col-span-1 mt-10 xl:col-span-3'>
          <div className='relative z-10 flex max-w-max flex-col justify-between gap-6 xl:mx-0 xl:w-full'>
            <div className='mx-auto flex max-w-max flex-col gap-2 xl:mx-0 xl:w-full'>
              <h2 className='text-sm font-bold uppercase text-primary-yellow md:text-xl'>{t('heading1')}</h2>
              <h1 className='text-left text-2xl font-bold uppercase text-primary-blue xl:text-4xl'>{t('heading1-1')}</h1>
              {/* <h3 className='text-3xl font-bold uppercase'>{t('heading2')}</h3> */}
              <p className='text-lg text-baseBlack'>{t('text3')}</p>
            </div>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
                <ImageFallback src={'/storm.svg'} alt='storm' width={14} height={14} className='w-auto' />
                <p className='text-sm text-black xs:text-base xl:text-lg'>{t('text1')}</p>
              </div>
              <div className='flex items-center gap-2'>
                <ImageFallback src={'/storm.svg'} alt='storm' width={14} height={14} className='w-auto' />
                <p className='text-sm text-black xs:text-base xl:text-lg'>{t('text2')}</p>
              </div>
            </div>
          </div>
          <div className='mt-[50px]'>
            <QuickDashboard />
          </div>
        </div>
        <div className='relative z-[1] col-span-1 w-full justify-center md:mt-32 xl:col-span-2'>
          <div className='flex justify-center md:block'>
            <ImageFallback
              src={'/hand-hold-phone-2.png'}
              alt='hand-hold-phone-2'
              width={800}
              height={1000}
              className='z-[1] h-auto max-h-[500px] w-auto max-w-[400px] xl:pointer-events-none xl:select-none'
            />
          </div>
          <div className='absolute left-[20%] top-[5%] z-[-3] hidden rounded-full object-contain md:block'>
            <div className='overflow-hidden rounded-full p-2'>
              <ImageMotion />
            </div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 right-0 z-[0] -skew-y-0 transform'>
        <Wave />
      </div>
    </div>
  )
}

export default MainSection
