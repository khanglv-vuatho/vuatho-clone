import ImageFallback from '@/components/ImageFallback'
import { useTranslations } from 'next-intl'

const AISection = () => {
  const t = useTranslations('AISection')

  const listAI: { title: string; desc: string }[] = [
    { title: t('title1'), desc: t('desc1') },
    { title: t('title2'), desc: t('desc2') },
    { title: t('title3'), desc: t('desc3') },
    { title: t('title4'), desc: t('desc4') }
  ]

  return (
    <div id='AI' className='relative pt-10 md:py-[80px] xl:py-[100px]'>
      <div className='ct-container relative'>
        <div className='flex flex-col lg:items-center'>
          <p className='text-sm font-bold uppercase text-primary-yellow md:text-xl'>{t('text')}</p>
          <h4 className='z-10 mb-[60px] w-fit text-2xl font-semibold uppercase text-primary-blue drop-shadow-sm lg:text-4xl 2xl:mb-[100px]'>{t('heading1')}</h4>
        </div>
        <div className='left-1/2 top-1/2 lg:absolute lg:mt-[100px] lg:max-h-[416px] lg:max-w-[664px] lg:-translate-x-1/2 lg:-translate-y-1/2'>
          <ImageFallback src={'/ai-section-1.webp'} alt='AI Robot' loading='lazy' width={700} height={680} className='pointer-events-none size-full select-none object-contain' />
        </div>
        <div className='grid w-full grid-cols-1 justify-between gap-4 lg:grid-cols-2 lg:gap-8'>
          {listAI.map((item, index) => (
            <div key={`listAI-${index}`} className={`z-[10] flex w-full  ${index % 2 == 0 ? 'lg:justify-start' : 'lg:justify-end'}`}>
              <div className='flex w-full flex-col gap-2 rounded-xl bg-white p-4  text-baseBlack shadow-[16px_16px_32px_0px_#88888829] lg:max-w-[400px]  lg:gap-2 lg:p-5 '>
                <h5 className='z-[4] font-semibold text-primary-blue 3xl:text-lg'>{item.title.replace(/(^|\s)\S/g, (match) => match.toUpperCase())}</h5>
                <p className='z-[4] text-sm text-baseBlack xs:text-base 3xl:text-lg'>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AISection
