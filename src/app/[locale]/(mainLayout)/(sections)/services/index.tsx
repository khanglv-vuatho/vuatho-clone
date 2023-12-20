import ImageFallback from '@/components/ImageFallback'
import { useLocale } from 'next-intl'

const SectionServices = () => {
  const locale = useLocale()

  return locale === 'vi' ? (
    <>
      <ImageFallback
        src='/images/Banner_danganhnghe_mobile1.webp'
        alt='banner'
        width={3000}
        height={700}
        className='object-contain md:hidden'
      />
      <ImageFallback
        src='/images/banner_services.webp'
        alt='banner'
        width={3000}
        height={700}
        className='hidden object-contain md:block'
      />
    </>
  ) : (
    <>
      <ImageFallback
        src='/images/Banner_danganhnghe_mobile_en1.webp'
        alt='banner'
        width={3000}
        height={700}
        className='object-contain md:hidden'
      />
      <ImageFallback
        src='/images/banner_da_nganh_nghe-en.webp'
        alt='banner'
        width={3000}
        height={700}
        className='hidden object-contain md:block'
      />
    </>
  )
}

export default SectionServices
