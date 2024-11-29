'use client'

import { Skeleton } from '@nextui-org/react'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import { useLocale, useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Autoplay, EffectFade, FreeMode, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ImageSkeleton } from '@/components/Icons'
import ImageFallback from '@/components/ImageFallback'
import LikeControl from '@/components/LikeControl'
import useSmallScreen from '@/hook/useSmallScreen'
import instance from '@/services/axiosConfig'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/zoom'

import './WorkerBenefitSection.scss'

const TestPage = () => {
  const t = useTranslations('WorkerBenefitSection')
  const locale = useLocale()

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [onFetching, setOnFetching] = useState<boolean>(false)
  const [onRefresh, setOnRefresh] = useState<boolean>(false)

  const [listDataBenefit, setListDataBenefit] = useState<any>([])
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  const isMobile = useSmallScreen()

  const swiperRef = useRef<any>(null)

  const _handleFetching = useCallback(async () => {
    try {
      const data: any = await instance.get(`home/benefit?lang=${onRefresh ? 'en' : locale}`)

      setListDataBenefit([...data])

      if (!data?.length) {
        setOnRefresh(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setOnFetching(false)
      onRefresh && setOnRefresh(false)
    }
  }, [locale, onRefresh])

  useEffect(() => {
    onFetching && _handleFetching()
  }, [onFetching, _handleFetching])

  useEffect(() => {
    setOnFetching(true)
  }, [])

  useEffect(() => {
    onRefresh && _handleFetching()
  }, [onRefresh, _handleFetching])

  let timer: any = null

  const _handleClickSwiper = () => {
    swiperRef?.current?.swiper?.autoplay?.stop()
    clearTimeout(timer)
    timer = setTimeout(() => {
      swiperRef?.current?.swiper?.autoplay?.start()
    }, 30000)
  }

  const handleSwiperAction = useCallback((action: 'slidePrev' | 'slideNext') => {
    if (!swiperRef.current) return
    swiperRef.current.swiper[action]()
  }, [])

  const handlePrev = () => handleSwiperAction('slidePrev')
  const handleNext = () => handleSwiperAction('slideNext')

  return (
    <div className='pt-[200px]'>
      <div className='relative flex flex-col' id='worker-benefit'>
        <div className='ct-container flex flex-col gap-6'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-sm font-bold uppercase text-primary-yellow md:text-xl'>{t('benefit')}</h2>
              <p className='text-2xl font-bold uppercase text-primary-blue lg:text-4xl'>{t('text')}</p>
            </div>
          </div>
          <div className='relative'>
            {onFetching ? (
              <>
                <div className='flex min-h-[400px] w-full animate-pulse items-center justify-center bg-gray-300 md:min-h-[600px] xl:min-h-[800px]'>
                  <ImageSkeleton style='h-[100px] w-full animate-pulse' />
                </div>
                <div className='flex w-full flex-col items-center justify-center gap-3 p-5'>
                  {Array(4)
                    .fill(1)
                    .map((_, index) => (
                      <Skeleton key={`skeleton-text-${index}`} className='h-3 w-full rounded-lg' />
                    ))}
                </div>
                <div className='flex w-full items-center justify-center gap-5'>
                  {Array(6)
                    .fill(1)
                    .map((_, index: number) => (
                      <Skeleton className='size-8 flex-shrink-0 rounded-lg' key={`skeleton-pagination-${index}`} />
                    ))}
                </div>
              </>
            ) : (
              <div className='relative grid grid-cols-1 gap-2'>
                <Swiper
                  ref={swiperRef}
                  effect={'fade'}
                  loop
                  autoHeight
                  autoplay={{
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    delay: 15000
                  }}
                  slidesPerView={1}
                  thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                  }}
                  modules={[Autoplay, EffectFade, FreeMode, Thumbs]}
                  className={`benefitSwipper z-[5] order-2 h-full w-full lg:order-1`}
                  onActiveIndexChange={(swiper: any) => {
                    setCurrentIndex(swiper.realIndex)
                  }}
                >
                  {listDataBenefit?.map((item: any, index: number) => {
                    return (
                      <SwiperSlide key={item.uuid} className={`${currentIndex === index ? 'visible' : 'invisible'}`} onClick={_handleClickSwiper}>
                        <div className='grid lg:grid-cols-3'>
                          <div className='z-20 order-2 flex flex-col justify-between gap-4 rounded-xl bg-primary-blue p-4 lg:order-1 lg:w-[130%] lg:p-6'>
                            <div className='flex flex-col gap-2 lg:gap-4'>
                              <div className='text-2xl font-bold text-primary-yellow'>
                                {currentIndex + 1 <= 9 ? `0${currentIndex + 1}` : currentIndex + 1}/{listDataBenefit?.length}
                              </div>
                              <h3 className='text-base font-semibold text-white lg:text-xl'>{item.title}</h3>
                              <div className='text-sm text-white xs:text-base' dangerouslySetInnerHTML={{ __html: item.html }} />
                            </div>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center gap-2'>
                                <button aria-label='prev' className='flex size-10 items-center justify-center rounded-full bg-[#F8F8F8] lg:size-[48px]' onClick={handlePrev}>
                                  <ArrowLeft2 className='flex size-6 flex-shrink-0' />
                                </button>
                                <button aria-label='next' className='flex size-10 items-center justify-center rounded-full bg-[#F8F8F8] lg:size-[48px]' onClick={handleNext}>
                                  <ArrowRight2 className='flex size-6 flex-shrink-0' />
                                </button>
                              </div>
                              <LikeControl item={item} />
                            </div>
                          </div>
                          <div className='order-1 mt-[-100px] flex items-center justify-center lg:order-2 lg:col-span-2 lg:mt-0'>
                            <ImageFallback loading='lazy' src={item.img} alt={item.title} height={600} width={900} className='size-full object-contain' />
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
                <Swiper
                  onSwiper={(swiper: any) => {
                    return setThumbsSwiper(swiper)
                  }}
                  slidesPerView={isMobile ? 3 : 6}
                  spaceBetween={10}
                  freeMode
                  modules={[FreeMode, Thumbs]}
                  className={`swiperPagination absolute inset-0 top-[200%] !z-30 order-1 flex min-h-[80px] w-full justify-between md:!top-[500%] lg:!top-0 lg:order-2 lg:min-h-0 `}
                >
                  {listDataBenefit?.map((item: any, index: number) => (
                    <SwiperSlide key={`swipper-slide-${index}`}>
                      <div
                        onClick={_handleClickSwiper}
                        className={`${currentIndex === index ? ' border-[#FCB713]' : 'scale-90 border-transparent opacity-70'}  group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-[2px] bg-white transition hover:border-[#FCB713]/80`}
                      >
                        <ImageFallback
                          src={item.img}
                          alt={item.title}
                          height={200}
                          width={200}
                          className={`w-full cursor-pointer select-none object-cover transition group-hover:scale-105 ${currentIndex === index && 'scale-105'} `}
                        />
                        <span className='absolute left-2 top-2 z-40 flex size-12 items-center justify-center rounded-full bg-black text-sm text-white md:size-8 '>
                          {index < 9 ? `0${index + 1}` : index + 1}
                        </span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestPage
