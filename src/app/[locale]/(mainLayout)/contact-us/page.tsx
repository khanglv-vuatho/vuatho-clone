import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { Call as CallIcon, Location as LocationIcon, Sms as SmsIcon } from 'iconsax-react'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Liên hệ',
      en: 'Contact us',
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

const ContactUs = () => {
  const t = useTranslations('ContactUs')
  return (
    <div className='overflow-hidden pt-10 xl:pt-20 2xl:pt-32'>
      <div className='relative flex min-h-[70vh] w-screen flex-col justify-center xl:min-h-[80vh] 2xl:min-h-[90vh]'>
        <div className='ct-container-70 relative z-[1] pt-[40px] xl:pt-[80px]'>
          <h3 className='text-[3.5rem] font-semibold'>{t('heading')}</h3>
          <div className='mt-10 space-y-10 lg:mt-20 xl:space-y-20'>
            <div className='flex gap-6 xl:gap-10'>
              <div className='flex aspect-square h-12 w-fit flex-col items-center justify-center rounded-full bg-primary-blue-2 text-primary-blue md:h-20'>
                <LocationIcon variant='Bold' />
              </div>
              <div>
                <h5 className='text-[1.8rem] font-semibold text-primary-blue'>
                  {t('address1')}
                  <br /> {t('address2')}
                </h5>
                <div className='mt-8 flex gap-3'>
                  <h6 className='rounded-xl bg-base-gray p-3 text-[1.8rem] font-semibold'>
                    {t('timeNumber')}
                  </h6>
                  <h6 className='rounded-xl bg-base-gray p-3 text-[1.8rem] font-semibold'>
                    {t('timeDay')}
                  </h6>
                </div>
                <p className='mt-5 text-[1.5rem] text-black/50 xs:w-1/2 xl:text-[1.7rem]'>
                  {t('text')}
                </p>
              </div>
            </div>
            <div className='flex items-center gap-6 xl:gap-10'>
              <div className='flex aspect-square h-12 w-fit flex-col items-center justify-center rounded-full bg-primary-blue-2 text-primary-blue md:h-20'>
                <CallIcon variant='Bold' />
              </div>
              <h5 className='text-[1.8rem] font-semibold text-primary-blue'>
                {t('numberPhone')}
              </h5>
              <h6 className='rounded-xl bg-base-gray p-3 text-[1.8rem] font-semibold'>
                24/7
              </h6>
            </div>
            <div className='flex items-center gap-6 xl:gap-10'>
              <div className='h120 flex aspect-square w-fit flex-col items-center justify-center rounded-full bg-primary-blue-2 text-primary-blue md:h-20'>
                <SmsIcon variant='Bold' />
              </div>
              <h5 className='text-[1.8rem] font-semibold text-primary-blue'>
                {t('gmail')}
              </h5>
            </div>
          </div>
        </div>
        <Image
          alt='background'
          src='/contact-us/bg.webp'
          quality={100}
          width={1920}
          height={848}
          className='pointer-events-none absolute bottom-0 right-0 opacity-40 md:opacity-100'
        />
      </div>
    </div>
  )
}

export default ContactUs
