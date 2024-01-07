import ImageFallback from '@/components/ImageFallback'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

function SectionWithVuaTho() {
  const t = useTranslations('WithVuaTho')

  return (
    <div className='relative my-[100px] flex flex-col items-center justify-center bg-gradient-to-r from-[#00142B] to-[#000103] py-[40px] lg:py-[80px] xl:py-[100px]'>
      <div className='ct-container-70 relative mb-[40px]'>
        <div className='z-[2] w-full rounded-[60px]'>
          <div className='w-full pt-20 md:w-[50%] md:pt-0'>
            <div className='flex flex-col justify-end gap-[8px] text-[#f5b500] md:gap-[20px]'>
              <div className='relative flex w-fit items-center gap-[10px]'>
                <h5 className='text-[3.2rem] font-bold text-white'>
                  {t('title')} {t('title1')}
                </h5>
                <div className='hidden scale-x-[-1] text-[12.8rem] text-[white]/30 lg:absolute lg:right-[-20%] lg:top-[-100%] lg:block'>
                  “
                </div>
              </div>
              <p className='flex justify-start text-[1.4rem] text-white md:text-[1.8rem]'>
                {t('text')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='size-full absolute right-0 top-0 z-[1] hidden md:block md:w-auto md:max-w-[45%]'>
        <ImageFallback
          src='/with-us.svg'
          alt=''
          height={500}
          width={500}
          className='size-full'
        />
      </div>
    </div>
  )
}

export default SectionWithVuaTho
