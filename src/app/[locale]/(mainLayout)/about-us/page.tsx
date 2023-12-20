import Image from 'next/image'

import { useTranslations } from 'next-intl'
import SectionDownload from '../(sections)/downloadApp'
import SectionServices from '../(sections)/services'
import HeroSection from './(sections)/heroSection'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Về chúng tôi',
      en: 'About us',
    }
    const description: any = {
      vi: 'Ứng dụng số 1 Việt Nam',
      en: 'Leading App in Vietnam',
    }
    return {
      title: metadata[params.locale || 'vi'],
      description: description[params.locale || 'vi'],
    }
  } catch (error) {
    console.log(error)
  }
}
function AboutUs() {
  const t = useTranslations('AboutUs')

  return (
    <div className=' w-full'>
      <HeroSection />
      <div className='relative h-[400px] w-full bg-[#f6f8fa] xl:h-[600px] xl:bg-transparent'>
        <div className='w-full'>
          <Image
            src={'/images/about-us/people.png'}
            alt='people'
            width={2700}
            height={584}
            className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 hidden xl:block'
          />
        </div>
        <div className='absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-8 text-center xl:px-0'>
          <p className='w-full bg-gradient-to-r from-[#1C55D8] to-[#0D2D8F] bg-clip-text text-[2.4rem] font-bold text-transparent md:text-[3.2rem]'>
            {t('goal')}
          </p>
          <p className='bg-gradient-to-r from-[#2769FF] to-[#0032CB] bg-clip-text text-[3.2rem] font-bold text-transparent md:text-[4rem]'>
            {t('numberGoal')}
          </p>
          <p className='text-[1.8rem] font-semibold'>{t('textGold')}</p>
        </div>
      </div>
      <div className='w-full bg-[#F6F8FA]'>
        <SectionServices />
      </div>
      <SectionDownload />
    </div>
  )
}

export default AboutUs
