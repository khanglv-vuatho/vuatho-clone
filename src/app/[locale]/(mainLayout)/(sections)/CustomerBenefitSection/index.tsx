import ImageFallback from '@/components/ImageFallback'
import { useTranslations } from 'next-intl'

const ClientBenefitSection = () => {
  const t = useTranslations('ClientBenefitSection')

  const listBenefit: {
    title: string
    id: number
  }[] = [
    { title: t('listBenefit.title1'), id: 1 },
    { title: t('listBenefit.title2'), id: 2 },
    { title: t('listBenefit.title3'), id: 3 },
    { title: t('listBenefit.title4'), id: 4 },
    { title: t('listBenefit.title5'), id: 5 }
  ]

  return (
    <div className='ct-container'>
      <div className='flex flex-col gap-2'>
        <h3 className='text-sm font-bold uppercase text-primary-yellow md:text-xl'>{t('benefit')}</h3>
        <p className='inline-block text-2xl font-semibold uppercase text-primary-blue lg:mb-10 lg:text-4xl'>{t('text')}</p>
      </div>
      <div className='relative w-full lg:mb-[100px]'>
        <div className='-bottom-1/2 right-0 z-[-1] lg:absolute lg:pb-[100px]'>
          <div className='lg:max-h-[735px] lg:max-w-[683px]'>
            <ImageFallback src={'/khach-benefit-7.webp'} alt='khach-benefit-7' loading='lazy' height={1200} width={1200} className='pointer-events-none size-full select-none object-contain' />
          </div>
        </div>
        <div className='grid w-full grid-rows-2 gap-4 md:grid-cols-2 lg:w-[80%] lg:grid-cols-3 lg:gap-5'>
          {listBenefit.map((item, index) => (
            <div className='flex items-center gap-4 rounded-xl bg-white lg:flex-col lg:justify-center lg:gap-5 lg:p-4 lg:shadow-[16px_16px_32px_0px_#88888829]' key={item.id}>
              <div className='flex size-[72px] flex-shrink-0 lg:size-[200px]'>
                <ImageFallback src={`/numbers/${index + 1}.webp`} alt={`benefit-numbers-${index + 1}`} width={200} height={200} className='pointer-events-none size-full select-none' />
              </div>
              <h3 className='text-sm font-semibold xs:text-base lg:mt-[-16px] lg:text-center lg:text-lg'>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ClientBenefitSection
