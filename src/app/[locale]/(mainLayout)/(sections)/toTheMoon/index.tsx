import ImageFallback from '@/components/ImageFallback'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

function SectionToTheMoon() {
  const t = useTranslations('ToTheMoon')
  const td = useTranslations('Extra')

  return (
    // <div className='flex-center relative md:min-h-[500px]'>
    //   <div className='relative w-[96%] md:w-[520px]'>
    //     <div className='relative z-[2] w-full space-y-2 rounded-[16px] border-3 border-[#ffe297] bg-gradient-to-br from-[#ffe8ad] via-[#f5b500] to-[#ffd255] p-[26px] text-black md:p-[40px]'>
    //       <div className='flex items-center gap-[10px]'>
    //         <p className=' w-[55%] text-[2.4rem] font-semibold xs:w-full md:text-[3.2rem]'>
    //           {t('title')}
    //         </p>
    //       </div>
    //       <p className='text-[1.8rem] font-light'>{t('desc')}</p>
    //     </div>
    //     <div className='absolute top-[-40%] z-[1] hidden w-[744px] translate-x-[90%] md:block lg:left-[-85%] xl:left-[-62%] 2xl:left-[-60%]'>
    //       <Image
    //         src={'/home/test12.png?cache=1'}
    //         alt=''
    //         height={280}
    //         quality={100}
    //         width={1028}
    //         className='h-full w-full object-contain'
    //       />
    //     </div>
    //     <div className='absolute left-[-100%] top-[-45%] z-[1] hidden w-[744px] md:block lg:left-[-80%] xl:left-[-90%] 2xl:left-[-110%]'>
    // <Image
    //   src={'/home/test11.png'}
    //   alt=''
    //   height={280}
    //   quality={100}
    //   width={1028}
    //   className='h-full w-full object-contain '
    // />
    //     </div>
    //   </div>
    // </div>
    <div className='ct-container-70 grid lg:grid-cols-2'>
      <div className='order-1 flex flex-col justify-center gap-[10px]'>
        <>
          <h3 className='font-bold uppercase tracking-[8px]'>{td('text')}</h3>
          <h2 className='text-[2.4rem] font-semibold text-primary-blue md:text-[3.2rem]'>
            {t('title')}
          </h2>
        </>
        <p className='text-[1.8rem] font-light'>{t('desc')}</p>
      </div>
      <div className='z-[-1] order-none lg:relative lg:right-[20%] lg:order-2 lg:min-h-[570px] lg:min-w-[680px]'>
        <ImageFallback
          src={'/home/test12.webp'}
          alt=''
          height={280}
          quality={100}
          width={1028}
          className='size-full object-contain lg:absolute'
        />
      </div>
    </div>
  )
}
export default SectionToTheMoon
