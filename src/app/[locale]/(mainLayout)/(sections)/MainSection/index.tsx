'use client'

import { motion } from 'framer-motion'
import { Link } from 'iconsax-react'
import CountUp from 'react-countup'
import { useTranslations, useLocale } from 'next-intl'
import React, { useState, useEffect } from 'react'

import { Wave } from '@/components/Icons'
import ImageFallback from '@/components/ImageFallback'
import instance from '@/services/axiosConfig'
import InputSearch from '@/components/input/services'
import CountUpComponent from '@/components/CountUpComponent'

const MainSection = () => {
  const t = useTranslations('MainSection')

  return (
    <div className='relative overflow-hidden bg-white'>
      <div className='ct-container z-1 relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5'>
        <div className='col-span-1 mt-10 xl:col-span-3'>
          <div className='relative z-10 flex max-w-max flex-col justify-between gap-6 xl:mx-0 xl:w-full'>
            <div className='mx-auto flex max-w-max flex-col gap-2 xl:mx-0 xl:w-full'>
              <h2 className='text-sm font-bold uppercase text-primary-yellow md:text-xl'>{t('heading1')}</h2>
              <h1 className='text-left text-2xl font-bold uppercase text-primary-blue xl:text-4xl'>{t('heading1-1')}</h1>
              {/* <h3 className='text-3xl font-bold uppercase'>{t('heading2')}</h3> */}
              <p className='text-lg text-baseBlack'>{t('text3')}</p>
            </div>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
                <ImageFallback src={'/storm.svg'} alt='storm' width={14} height={14} className='w-auto' />
                <p className='text-sm text-black xs:text-base xl:text-lg'>{t('text1')}</p>
              </div>
              <div className='flex items-center gap-2'>
                <ImageFallback src={'/storm.svg'} alt='storm' width={14} height={14} className='w-auto' />
                <p className='text-sm text-black xs:text-base xl:text-lg'>{t('text2')}</p>
              </div>
            </div>
          </div>
          <div className='mt-[50px]'>
            <QuickDashboard />
          </div>
        </div>
        <div className='relative z-[1] col-span-1 w-full justify-center md:mt-32 xl:col-span-2'>
          <div className='flex justify-center md:block'>
            <ImageFallback
              src={'/hand-hold-phone-2.png'}
              alt='hand-hold-phone-2'
              width={800}
              height={1000}
              className='z-[1] h-auto max-h-[500px] w-auto max-w-[400px] xl:pointer-events-none xl:select-none'
            />
          </div>
          <div className='absolute left-[20%] top-[5%] z-[-3] hidden rounded-full object-contain md:block'>
            <div className='overflow-hidden rounded-full p-2'>
              <motion.div
                variants={{
                  hidden: {
                    scale: 0
                  },
                  visible: {
                    scale: 1,
                    transition: {
                      scale: { duration: 0.5 }
                    }
                  }
                }}
                initial='hidden'
                animate='visible'
                className='relative size-full overflow-hidden rounded-full'
              >
                <motion.div
                  variants={{
                    hidden: {
                      rotate: 0
                    },
                    visible: {
                      scale: 1,
                      rotate: 360,
                      transition: {
                        rotate: {
                          duration: 180,
                          repeat: Infinity,
                          ease: 'linear'
                        }
                      }
                    }
                  }}
                  initial='hidden'
                  animate='visible'
                >
                  <ImageFallback src='/globe.svg' alt='earth' width={600} height={600} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 right-0 z-[0] transform'>
        <Wave />
      </div>
    </div>
  )
}

const QuickDashboard = React.memo(() => {
  const t = useTranslations('InputMainSearch')

  const [objectData, setObjectData] = useState({
    clients: 0,
    providers: 0,
    services: 0
  })

  const [onFetching, setOnFetching] = useState(false)

  const _HandleFetching = async () => {
    try {
      const data: any = await instance.get('/home/dash')
      setObjectData({ ...data })
    } catch (error) {
      console.log(error)
    } finally {
      setOnFetching(false)
    }
  }

  useEffect(() => {
    onFetching && _HandleFetching()
  }, [onFetching])

  useEffect(() => {
    setOnFetching(true)
  }, [])

  return (
    <div className='relative z-[10] mb-10 mt-[10px] space-y-16'>
      <InputSearch />
      {/* <div className='grid gap-5 md:grid-cols-3 md:gap-0'>
          <div className='flex items-center justify-between md:block'>
            <h1>{t('worker')}</h1>
            <h1 className='bg-gradient-to-r from-[#ff7c54] via-[#ffcc3f] to-[#ff783a] bg-clip-text text-7xl font-bold text-transparent'>
              <CountUp end={objectData?.providers} />
            </h1>
          </div>
          <div className='flex items-center justify-between md:block'>
            <h1>{t('client')}</h1>
            <h1 className='bg-gradient-to-r from-[#ff7c54] via-[#ffcc3f] to-[#ff783a] bg-clip-text text-7xl font-bold text-transparent'>
              <CountUp end={objectData?.clients} />
            </h1>
          </div>
          <div>
            <ServcesModal value={objectData?.services} />
          </div>
        </div> */}
    </div>
  )
})

const ImageMotion = () => {
  return (
    <motion.div
      variants={{
        hidden: {
          scale: 0
        },
        visible: {
          scale: 1,
          transition: {
            scale: { duration: 0.5 }
          }
        }
      }}
      initial='hidden'
      animate='visible'
      className='relative size-full overflow-hidden rounded-full'
    >
      <motion.div
        variants={{
          hidden: {
            rotate: 0
          },
          visible: {
            scale: 1,
            rotate: 360,
            transition: {
              rotate: {
                duration: 180,
                repeat: Infinity,
                ease: 'linear'
              }
            }
          }
        }}
        initial='hidden'
        animate='visible'
      >
        <ImageFallback src='/globe.svg' alt='earth' width={600} height={600} />
      </motion.div>
    </motion.div>
  )
}

const ServcesModal = React.memo((props: any) => {
  const t = useTranslations('InputMainSearch')

  const locale = useLocale()
  const [countUpValue, setcountUpValue] = useState(props?.value)

  useEffect(() => {
    setcountUpValue(props?.value)
  }, [props?.value])

  return (
    <div className='flex w-full items-center justify-between md:block'>
      <h1>{t('industry')}</h1>
      <div>
        <Link
          href={`/${locale}/services`}
          className='cursor-pointer bg-gradient-to-r from-[#ff7c54] via-[#ffcc3f] to-[#ff783a] bg-clip-text text-7xl font-bold text-transparent hover:opacity-80 active:opacity-100'
        >
          <CountUpComponent end={countUpValue} delay={5} />
        </Link>
      </div>
    </div>
  )
})

export { ImageMotion, ServcesModal, QuickDashboard }
