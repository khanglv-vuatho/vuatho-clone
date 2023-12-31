'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { Screen } from '@/components/animateScreen'
import ImageFallback from '@/components/ImageFallback'
import { AndroidBtn, IosBtn } from '@/components/DownloadApps'

const SectionDownload = () => {
  const t = useTranslations('Download')
  return (
    <div className='relative bg-gradient-to-r from-[#ffffff] to-[#ffffff] '>
      <div className='ct-container-70 left-1/2 h-full md:absolute md:-translate-x-1/2 md:px-[16px]'>
        <motion.div
          whileInView={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          initial={{
            opacity: 0,
            y: -100,
          }}
          transition={{
            delay: 1,
            duration: 0.5,
          }}
          viewport={{ once: true }}
          className='md:absolute md:left-[20px] 13inch:left-0'
        >
          <ImageFallback
            src={'/downloadApp/download-person.png'}
            alt=''
            height={605}
            width={605}
            className='size-full md:size-[450px] lg:size-[500px] xl:size-[605px]'
          />
        </motion.div>
      </div>
      <div className='relative z-10'>
        <motion.section
          whileInView={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          initial={{
            opacity: 0,
            x: 200,
          }}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
          viewport={{ once: true }}
          className='ct-container-70 flex items-center justify-start gap-4 overflow-hidden py-[20px] md:justify-center md:py-[60px]'
        >
          <div className='flex flex-col items-start md:flex-row md:gap-[60px] md:pl-[40%] 3xl:gap-[100px]'>
            <div className='order-2 flex w-full items-center justify-center md:order-1 md:justify-start'>
              <div className='flex w-full flex-col items-start justify-start gap-[4px] md:items-center md:justify-center md:gap-[20px]'>
                <h2
                  className={`w-full text-left text-[2.4rem] font-medium uppercase text-primary-blue md:text-[3.6rem]`}
                >
                  {t('download')}
                </h2>
                <div className='flex w-full flex-col gap-[20px] md:gap-[10px]'>
                  <p className='font-light text-base-black-1 md:text-[1.8rem]'>
                    {t('text1')}
                  </p>
                  <div className='flex flex-col gap-[40px]'>
                    <div className='flex flex-row items-start gap-[10px] md:flex-col 13inch:flex-row 13inch:items-center '>
                      <AndroidBtn style={'min-w-[160px]'} />
                      <IosBtn style={'min-w-[160px]'} />
                    </div>
                    <div className='hidden flex-col items-start gap-[10px] md:flex'>
                      <p className='text-[1.8rem] font-light text-base-black-1'>
                        {t('text2')}
                      </p>
                      <Image
                        alt='QRCode'
                        src={'/downloadApp/qrcode.webp'}
                        width={128}
                        height={128}
                        quality={100}
                        className={`relative z-[1] aspect-square size-[140px] w-auto object-contain`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='hidden md:block'>
              <Screen />
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default SectionDownload
