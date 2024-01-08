import ImageFallback from '@/components/ImageFallback'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

function SectionWithVuaTho() {
  const t = useTranslations('WithVuaTho')

  return (
    <div className='relative my-[100px] bg-gradient-to-r from-[#00142B] to-[#000103]'>
      <div className='ct-container-70 relative'>
        <div className='relative z-[2] w-full rounded-[60px] py-[40px] lg:py-[80px] lg:backdrop-blur-lg xl:py-[100px]'>
          <div className='absolute right-[50%] top-[-10%] hidden scale-x-[-1] text-[16rem] text-[white]/30 md:top-0 lg:block'>
            “
          </div>
          <div className='pt-20 md:pt-0 lg:w-[50%] xl:w-[60%]'>
            <div className='flex flex-col justify-end gap-[8px] text-[#f5b500] md:gap-[20px]'>
              <h5 className='text-[3.2rem] font-bold text-white'>
                {t('title')} {t('title1')}
              </h5>
              <p className='flex justify-start text-[1.4rem] text-white md:text-[1.8rem]'>
                {t('text')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 right-0 top-0 z-[10] hidden lg:block'>
        <ImageFallback
          alt='with-us'
          src='/with-us.png'
          height={522}
          width={522}
          className='h-full'
        />
      </div>
    </div>
  )
}

export default SectionWithVuaTho
