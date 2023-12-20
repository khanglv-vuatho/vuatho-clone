import { useTranslations } from 'next-intl'
import Image from 'next/image'

function SectionWithVuaTho() {
  const t = useTranslations('WithVuaTho')

  return (
    <div className='my-[100px]'>
      <div className='ct-container-70 relative mb-[40px]'>
        <div className='relative z-[2] w-full rounded-[60px] rounded-tl-none bg-[#B5E0FF1A]/10 px-[10px] py-[20px] md:px-[40px] md:py-[20px] lg:backdrop-blur-lg xl:px-[100px] xl:py-[60px]'>
          <div className='absolute bottom-[80%] h-[92px] w-[120px] md:bottom-0 md:left-[-10%] md:h-[220px] md:w-[320px] lg:left-[-2%] xl:h-[330px] xl:w-[400px]'>
            <Image
              src={'/images/about-us/loaloaloa.png'}
              alt='mascot'
              height={330}
              width={423}
              quality={100}
              className='pointer-events-none h-full w-full object-contain'
            />
          </div>
          <div className='absolute right-[7%] top-[-10%] scale-x-[-1] text-[16rem] text-[#f5b500]/20 md:top-0'>
            “
          </div>
          <div className='w-full pt-20 md:ml-[26%] md:pt-0'>
            <div className='flex w-[85%] flex-col justify-end gap-[8px] text-[#f5b500] md:w-[62%] md:gap-[20px]'>
              <h5 className='text-[3.2rem] font-bold'>
                {t('title')} {t('title1')}
              </h5>
              <p className='flex justify-start text-[1.4rem] text-base-black-1 md:text-[1.8rem]'>
                {t('text')}
              </p>
            </div>
          </div>
        </div>
        <div className='absolute bottom-0 left-[20%] top-0 hidden w-[200px] -skew-x-[30deg] bg-[#f5b500]/10 md:block'></div>
        <div className='absolute bottom-0 left-[calc(20%+210px)] top-0 hidden w-[200px] -skew-x-[30deg] bg-white/20 md:block'></div>
      </div>
    </div>
  )
}

export default SectionWithVuaTho
