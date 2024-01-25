'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { motion } from 'framer-motion'
import { ArrowRight2, Dislike, Like1 } from 'iconsax-react'

import { Button, Skeleton, Textarea, Tooltip, useDisclosure } from '@nextui-org/react'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import CountUp from 'react-countup'
import { Autoplay, EffectFade, FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ImageSkeleton, Wave } from '@/components/Icons'
import ImageFallback from '@/components/ImageFallback'
import { ToastComponent } from '@/components/ToastComponent'
import Article from '@/components/article'
import { DefaultModal } from '@/components/modal'
import { SkeletonBlog } from '@/components/skeleton'
import instance from '@/services/axiosConfig'
import SectionDownload from './(sections)/downloadApp'
import SectionToTheMoon from './(sections)/toTheMoon'
import SectionWithVuaTho from './(sections)/withVuaTho'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import './swipper.scss'

import InputSearch from '@/components/input/services'
import dynamic from 'next/dynamic'

const GlobeComponent = dynamic(() => import('@/components/GlobeComponent'), {
  ssr: false,
})

function HomePage() {
  const searchParams = useSearchParams()
  const hiddenHeaderAndFooter = searchParams.get('hideHeaderAndFooter')

  return (
    <>
      <div className={`flex flex-col overflow-hidden  ${hiddenHeaderAndFooter ? 'gap-[40px] md:gap-[100px]' : 'gap-[40px] pt-[70px] md:gap-[100px] 3xl:pt-[80px]'}`}>
        <MainSection />
        <WorkerBenefitSection />
        <CustomerBenefitSection />
        <AISection />
        <MinhBach />
        <HinhThucKetNoi />
        <SectionToTheMoon />
        <SectionDownload />
        <PressHome />
        <SectionWithVuaTho />
      </div>
    </>
  )
}

const AISection = () => {
  const t = useTranslations('AISection')

  const listAI = [
    { title: t('title1'), desc: t('desc1') },
    { title: t('title2'), desc: t('desc2') },
    { title: t('title3'), desc: t('desc3') },
    { title: t('title4'), desc: t('desc4') },
  ]

  return (
    <div id='AI' className='relative bg-white py-[40px] md:py-[80px] xl:py-[100px]'>
      <div className='ct-container-70 relative'>
        <h5 className='text-center font-semibold uppercase leading-[30px] tracking-[8px]'>{t('text')}</h5>
        <h4 className='relative z-10 mb-[60px] inline-block w-full text-center text-[2.4rem] font-semibold uppercase text-primary-blue drop-shadow-sm md:text-[4.2rem] 2xl:mb-[100px] '>
          {t('heading1')}
        </h4>
        <div className='flex flex-col'>
          <div className='bottom-2 flex h-full w-full items-center justify-center md:absolute md:justify-end 13inch:justify-center'>
            <div className='flex w-full items-center justify-center md:w-1/2 xl:mt-[200px] 13inch:w-auto'>
              <ImageFallback src={'/ai-section-1.png'} alt='AI Robot' width={700} height={680} quality={100} className='pointer-events-none w-auto select-none' />
            </div>
          </div>
          <div className='grid grid-cols-1 items-center gap-[20px] py-12 lg:ml-[10%] 13inch:ml-0 13inch:grid-cols-2 13inch:gap-[56px]'>
            {listAI.map((item, index) => (
              <div key={`listAI-${index}`} className={`relative z-[10] flex w-full flex-col gap-[10px] p-[20px] text-baseBlack md:max-w-[400px]  ${index % 2 !== 0 && '13inch:ml-[36%]'}`}>
                <div
                  className={`absolute inset-0 z-[2] rounded-[20px] border-b-[2px] border-[#fbac47] bg-gradient-to-br from-[#ffffff] via-[#ffffff] to-[#e7e7e7] shadow-[0px_8px_16px_0px_#A2BAF366]`}
                ></div>
                <h5 className=' z-[4] text-[1.8rem] font-bold'>{item.title.replace(/(^|\s)\S/g, (match) => match.toUpperCase())}</h5>
                <p className='z-[4] text-[1.8rem]'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const MinhBach = () => {
  const t = useTranslations('MinhBach')
  const td = useTranslations('Extra')

  const listData = [
    {
      title: t('listData.title1'),
      desc: t('listData.desc1'),
    },
    {
      title: t('listData.title2'),
      desc: t('listData.desc2'),
    },
    {
      title: t('listData.title3'),
      desc: t('listData.desc3'),
    },
    {
      title: t('listData.title4'),
      desc: t('listData.desc4'),
    },
    {
      title: t('listData.title5'),
      desc: t('listData.desc5'),
    },
    {
      title: t('listData.title6'),
      desc: t('listData.desc6'),
    },
  ]

  return (
    <div id='trade'>
      <section className='ct-container-70'>
        <h3 className='font-semibold uppercase tracking-[8px]'>{td('text1')}</h3>
        <h2 className='mb-[40px] inline-block text-[2.4rem] font-semibold uppercase text-primary-blue md:text-[4.2rem]'>{t('heading')}</h2>
        <div className='grid grid-cols-1 gap-[20px] lg:grid-cols-2 lg:gap-[40px]'>
          {listData.map((item, index) => (
            <div key={`listData-${index}`} className='flex flex-col gap-[8px] text-[1.8rem] text-baseBlack'>
              <div className='flex items-center gap-[10px]'>
                <span className='relative flex h-[16px] w-[16px] items-center justify-center'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f5b500] opacity-75'></span>
                  <span className='relative inline-flex h-[10px] w-[10px] rounded-full bg-[#f5b500]'></span>
                </span>
                <h3 className=' text-[2.2rem] font-bold text-black'>{item.title}</h3>
              </div>
              <p className='text-[1.8rem] font-light'>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const HinhThucKetNoi = () => {
  const t = useTranslations('HinhThucKetNoi')
  const td = useTranslations('Extra')

  const DataLabel: any = [
    {
      label: t('listData.label1'),
      description: t('listData.description1'),
    },
    {
      label: t('listData.label2'),
      description: t('listData.description2'),
    },
    {
      label: t('listData.label3'),
      description: t('listData.description3'),
    },
    {
      label: t('listData.label4'),
      description: t('listData.description4'),
    },
    {
      label: t('listData.label5'),
      description: t('listData.description5'),
    },
    {
      label: t('listData.label6'),
      description: t('listData.description6'),
    },
  ]

  return (
    <section id='multi'>
      <section className='ct-container-70'>
        <h3 className='font-semibold uppercase tracking-[8px]'>{td('text2')}</h3>
        <h2 className='mb-[40px] inline-block  text-[2.4rem] font-semibold uppercase text-primary-blue md:text-[4.2rem]'>{t('heading')}</h2>
        <div className='grid grid-cols-1 gap-[20px] pb-[40px] lg:grid-cols-2 lg:gap-[40px]'>
          {DataLabel.map((item: any, index: number) => (
            <div key={`datalabel-${index}`} className='flex flex-col gap-[8px] text-[1.8rem] text-baseBlack'>
              <div className='flex items-center gap-[10px]'>
                <span className='relative flex h-[16px] w-[16px] items-center justify-center'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f5b500] opacity-75'></span>
                  <span className='relative inline-flex h-[10px] w-[10px] rounded-full bg-[#f5b500]'></span>
                </span>
                <h3 className='text-[2.2rem] font-bold text-black'>{item.label}</h3>
              </div>
              <p className=' text-[1.8rem] font-light'>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}

const MainSection = () => {
  const t = useTranslations('MainSection')

  return (
    <div>
      <div className='relative overflow-hidden bg-[white]'>
        <div className='ct-container-70 z-1 relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5'>
          <div className='col-span-1 xl:col-span-3'>
            <div className='relative z-10 flex max-w-max flex-col justify-between gap-[20px] pt-10 xl:mx-0  xl:w-full xl:pt-20'>
              <div className='mx-auto flex max-w-max flex-col  xl:mx-0 xl:w-full'>
                <h3 className='text-[2.8rem] font-bold uppercase'>{t('heading1')}</h3>
                <h3 className='bg-gradient-to-r from-[#ff7c54] via-[#ffcc3f] to-[#ff783a] bg-clip-text text-left text-[2.4rem] font-bold uppercase text-[#f5b500] text-transparent xl:text-[3.2rem]'>
                  {t('heading1-1')}
                </h3>
                <h3 className='text-[2.8rem] font-bold uppercase'>{t('heading2')}</h3>
              </div>
              <div className='flex flex-col gap-[20px]'>
                <div className='flex items-center gap-[8px]'>
                  <Image src={'/storm.svg'} alt='storm' width={14} height={14} className='w-auto' />
                  <p className='text-[1.8rem] text-black xl:text-[1.8rem]'>{t('text1')}</p>
                </div>
                <div className='flex items-center gap-[8px]'>
                  <Image src={'/storm.svg'} alt='storm' width={14} height={14} className='w-auto' />
                  <p className='text-[1.8rem] text-black xl:text-[1.8rem]'>{t('text2')}</p>
                </div>
              </div>
            </div>
            <QuickDashboard />
          </div>
          <div className='z-[1] col-span-1 mt-32 w-full justify-center xl:col-span-2'>
            <div>
              <div className='max-h-[500px] max-w-[400px]'>
                <ImageFallback priority src={'/hand-hold-phone-1.webp'} alt='hand-hold-phone-1' width={500} height={600} className=' relative z-[1] h-auto w-auto' />
              </div>
            </div>
            <div className='absolute top-[550px] z-[0] object-contain md:top-0'>
              <GlobeComponent />
            </div>
          </div>
        </div>
        <div className='absolute bottom-0 left-0 right-0 z-[0] -skew-y-0 transform'>
          <Wave />
        </div>
      </div>
    </div>
  )
}

const QuickDashboard = React.memo(() => {
  const t = useTranslations('InputMainSearch')

  const [objectData, setObjectData] = useState({
    customers: 0,
    providers: 0,
    services: 0,
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
    <div className='relative z-[10] mb-[40px] mt-[10px] space-y-16'>
      <InputSearch />
      <div className='grid gap-[20px] md:grid-cols-3 md:gap-0'>
        <div className='flex items-center justify-between md:block'>
          <h1>{t('worker')}</h1>
          <h1 className='bg-gradient-to-r from-[#ff7c54] via-[#ffcc3f] to-[#ff783a] bg-clip-text text-7xl font-bold text-transparent'>
            <CountUp end={objectData?.providers} />
          </h1>
        </div>
        <div className='flex items-center justify-between md:block'>
          <h1>{t('customer')}</h1>
          <h1 className='bg-gradient-to-r from-[#ff7c54] via-[#ffcc3f] to-[#ff783a] bg-clip-text text-7xl font-bold text-transparent'>
            <CountUp end={objectData?.customers} />
          </h1>
        </div>
        <div>
          <ServcesModal value={objectData?.services} />
        </div>
      </div>
    </div>
  )
})

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
          <CountUp end={countUpValue} delay={5} />
        </Link>
      </div>
    </div>
  )
})

const CustomerBenefitSection = () => {
  const t = useTranslations('CustomerBenefitSection')

  const listBenefit: {
    title: string
    id: number
  }[] = [
    { title: t('listBenefit.title1'), id: 1 },
    { title: t('listBenefit.title2'), id: 2 },
    { title: t('listBenefit.title3'), id: 3 },
    { title: t('listBenefit.title4'), id: 4 },
    { title: t('listBenefit.title5'), id: 5 },
  ]

  return (
    <div className='ct-container-70 flex flex-col gap-[20px]'>
      <div className='flex flex-col gap-[10px] md:hidden'>
        <h3 className='text-[1.8rem] font-semibold uppercase tracking-[8px] text-primary-blue lg:text-[2rem]'>{t('benefit')}</h3>
        <p className=' text-[2.4rem] md:text-[3.2rem]'>{t('text')}</p>
      </div>
      <div className='mt-[40px] grid grid-cols-1 gap-[20px] xl:grid-cols-5'>
        <div className='col-span-1 xl:col-span-2'>
          <div className='hidden flex-col gap-[10px] md:flex'>
            <h3 className='text-[1.8rem] font-semibold uppercase tracking-[8px] md:text-[2rem]'>{t('benefit')}</h3>
            <p className='whitespace-nowrap text-[2.4rem] font-semibold uppercase text-primary-blue md:text-[3.2rem]'>{t('text')}</p>
          </div>
          <div className='mx-auto mt-6 size-full max-h-[800px] max-w-[800px] xl:mx-0'>
            <Image src={'/khach-benefit-7.webp'} alt='khach-benefit-7' quality={100} height={600} width={600} className='pointer-events-none h-full w-full select-none object-contain' />
          </div>
        </div>
        <div className='col-span-1 grid grid-cols-1 md:mx-auto md:max-w-[820px] md:grid-cols-2 xl:col-span-3'>
          {listBenefit.map((item, index) => (
            <div className='col-span-1' key={item.id}>
              <div className='items-left flex items-center gap-[20px] md:flex-col lg:justify-center xl:gap-[6px]'>
                <ImageFallback src={`/numbers/${index + 1}.png`} alt='AI Robot' width={200} height={200} className='pointer-events-none size-[180px] select-none' />
                <h3 className='mt-[-16px] text-[1.8rem] lg:text-center'>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const WorkerBenefitSection = () => {
  const t = useTranslations('WorkerBenefitSection')
  const locale = useLocale()

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [onFetching, setOnFetching] = useState<boolean>(false)
  const [onRefresh, setOnRefresh] = useState<boolean>(false)

  const [listDataBenefit, setListDataBenefit] = useState<any>([])
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  const [isMobile, setIsMobile] = useState(false)

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

  useEffect(() => {
    return () => clearTimeout(timer)
  }, [timer])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className='relative flex flex-col'>
      <div className='ct-container-70 flex flex-col'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-[10px]'>
            <h3 className='text-[1.8rem] font-semibold uppercase tracking-[8px] md:text-[2rem]'>{t('benefit')}</h3>
            <p className='text-[2.4rem] font-bold uppercase text-primary-blue md:text-[3.6rem]'>{t('text')}</p>
          </div>
          <div className='rounded-full bg-black px-[24px] py-[8px] text-white'>
            {currentIndex + 1 <= 9 ? `0${currentIndex + 1}` : currentIndex + 1}/{listDataBenefit?.length}
          </div>
        </div>
        {onFetching ? (
          <>
            <div className='flex min-h-[400px] w-full animate-pulse items-center justify-center bg-gray-300 md:min-h-[600px] xl:min-h-[800px]'>
              <ImageSkeleton style='h-[100px] w-full animate-pulse' />
            </div>
            <div className='flex w-full flex-col items-center justify-center gap-[12px] p-[20px]'>
              {Array(4)
                .fill(1)
                .map((_, index) => (
                  <Skeleton key={`skeleton-text-${index}`} className='h-[12px] w-full rounded-lg' />
                ))}
            </div>
            <div className='flex w-full items-center justify-center  gap-[20px]'>
              {Array(6)
                .fill(1)
                .map((_: any, index: number) => (
                  <Skeleton className='h-[32px] w-[32px] flex-shrink-0 rounded-lg' key={`skeleton-pagination-${index}`} />
                ))}
            </div>
          </>
        ) : (
          <>
            <Swiper
              ref={swiperRef}
              effect={'fade'}
              loop
              autoHeight
              autoplay={{
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                delay: 15000,
              }}
              slidesPerView={1}
              thumbs={{
                swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              navigation
              modules={[Autoplay, EffectFade, FreeMode, Navigation, Thumbs]}
              className='benefitSwipper z-[5] h-full w-full md:max-h-[420px] 13inch:max-h-[480px]'
              onActiveIndexChange={(swiper: any) => {
                setCurrentIndex(swiper.realIndex)
              }}
            >
              {listDataBenefit?.map((item: any, index: number) => {
                return (
                  <SwiperSlide key={item.uuid} className={currentIndex === index ? 'visible' : 'invisible'} onClick={_handleClickSwiper}>
                    <div className='relative z-[12] flex items-center justify-between gap-[40px]'>
                      <h4 className='text-[2rem] font-semibold '>{item.title}</h4>
                      <div className='likeButton z-[10] hidden md:block'>
                        <LikeControl item={item} />
                      </div>
                    </div>
                    <div className='likeButtonMobile relative z-[10] my-10 w-auto md:hidden'>
                      <LikeControl item={item} />
                    </div>
                    <div className='grid w-full grid-cols-2 gap-[20px] rounded-xl'>
                      <div className='text order-1 col-span-2 h-full w-full text-[1.8rem] md:order-none md:col-span-1'>
                        <div dangerouslySetInnerHTML={{ __html: item.html }} />
                      </div>
                      <div className='relative order-none col-span-2 h-full w-full md:order-1 md:col-span-1'>
                        <ImageFallback
                          priority
                          src={`/benefits/${index + 1}.png`}
                          alt={item.title}
                          height={400}
                          width={400}
                          className='max-h-[400px] w-full object-contain md:max-h-[280px] 13inch:max-h-none'
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
            <Swiper
              onSwiper={(swiper: any) => setThumbsSwiper(swiper)}
              slidesPerView={isMobile ? 3 : 6}
              spaceBetween={10}
              freeMode={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className={`swiperPagination z-10 flex w-full max-w-[86%] items-center justify-between ${isMobile ? 'mt-10' : ''}`}
            >
              {listDataBenefit?.map((item: any, index: number) => (
                <SwiperSlide key={`swipper-slide-${index}`}>
                  <div
                    onClick={_handleClickSwiper}
                    className={`${currentIndex === index ? ' border-[#FCB713]' : 'border-transparent opacity-50'}  relative overflow-hidden rounded-[10px] border-[2px] transition`}
                  >
                    <ImageFallback
                      src={`/benefits/${index + 1}.png`}
                      alt={item.title}
                      height={400}
                      width={860}
                      quality={100}
                      className={`h-full w-full cursor-pointer select-none object-cover transition hover:scale-105 ${currentIndex === index && 'scale-105'} `}
                    />
                    <span className='absolute left-[8px] top-[8px] flex size-12 items-center justify-center rounded-full bg-black text-[1.2rem] text-white md:size-10 lg:size-12'>
                      {index < 9 ? `0${index + 1}` : index + 1}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </div>
  )
}

const PressHome = () => {
  const locale = useLocale()
  const t = useTranslations('PressHome')

  const [onFetching, setOnFetching] = useState<boolean>()
  const [listBlog, setListBlog] = useState([])

  const serverFetching = useCallback(async () => {
    try {
      const { data } = await instance.get('/home/blogs', {
        params: {
          lang: locale,
        },
      })
      setListBlog(data)
    } catch (error) {
      console.log(error)
      setOnFetching(false)
    } finally {
      setOnFetching(false)
    }
  }, [locale])

  useEffect(() => {
    onFetching && serverFetching()
  }, [onFetching, serverFetching])

  useEffect(() => {
    locale && setOnFetching(true)
  }, [locale])

  return (
    <div className='ct-container-70 z-10 flex flex-col gap-[20px] pb-[40px] md:pb-0'>
      <div className='flex items-center justify-between'>
        <h2 className='inline-block text-[1.8rem] font-bold uppercase text-primary-blue md:text-[3.2rem]'>{t('heading')}</h2>
        <Link href={`/${locale}/press`} className='group inline-flex items-center text-[1.6rem] font-semibold md:text-[1.8rem]'>
          <p>{t('seeAll')}</p>
          <span className='transition group-hover:translate-x-2'>
            <ArrowRight2 />
          </span>
        </Link>
      </div>
      <div className='blog-home flex flex-nowrap gap-[10px] overflow-x-auto overflow-y-hidden p-[4px] lg:grid lg:grid-cols-4 lg:gap-[20px]'>
        {onFetching
          ? Array(4)
              .fill(null)
              .map((_, index: number) => (
                <div className='w-full' key={`skeleton-blog-${index}`}>
                  <SkeletonBlog />
                </div>
              ))
          : listBlog.length > 0
            ? listBlog.map((item: any, index: number) => {
                return <Article key={index} index={index} item={item} style='w-[80%] md:w-[40%] lg:w-full cursor-pointer' />
              })
            : Array(4)
                .fill(null)
                .map((_, index) => (
                  <div className='w-full' key={`skeleton-blog1-${index}`}>
                    <SkeletonBlog />
                  </div>
                ))}
      </div>
    </div>
  )
}

const LikeControl = ({ item }: { item: any }) => {
  const t = useTranslations('Modal')
  const [checkLike, setCheckLike] = useState({ isLiked: item.isLike, count: item.like })
  const [checkDislike, setCheckDislike] = useState<any>({ isDisliked: item.isDislike })

  const [dislikeMessage, setDislikeMessage] = useState<string>('')

  const _ServerSendingLike = async () => {
    try {
      const data: any = await instance.post(`/home/benefit`, {
        uuid: item.uuid,
      })
      setCheckLike(data)
    } catch (error) {
      console.log(error)
    }
  }

  const _ServerSendingDislike = async () => {
    try {
      const data = await instance.post('/home/benefit/dislike', {
        uuid: item.uuid,
        message: dislikeMessage,
      })
      setCheckDislike(data)
      ToastComponent({ message: t('messageToast'), type: 'success' })
    } catch (error) {
      console.log(error)
    }
  }

  const _HandleAction = (type: string) => {
    if (checkLike.isLiked === checkDislike.isDisliked) {
      type === 'like' ? _ServerSendingLike() : _ServerSendingDislike()
    } else {
      if (type === 'like') {
        if (checkDislike.isDisliked === true) {
          return
        } else {
          _ServerSendingLike()
        }
      } else if (type === 'dislike') {
        if (checkLike.isLiked === true) {
          _ServerSendingLike()
          _ServerSendingDislike()
        } else {
          _ServerSendingDislike()
        }
      }
    }
  }

  return (
    <Tooltip
      isDisabled={!checkDislike.isDisliked}
      content={t('messageToast')}
      placement='top'
      classNames={{
        content: 'text-[1.8rem] px-[16px] py-[8px]',
      }}
    >
      <div className='flex h-[40px] items-center justify-between overflow-hidden rounded-full bg-white md:h-[48px] md:bg-[#F8F8F8]'>
        <div>
          <Like isDislike={checkDislike.isDisliked} isLike={checkLike.isLiked} count={checkLike.count} onClick={() => _HandleAction('like')} />
        </div>
        <div className='mx-[8px] hidden h-[80%] w-[1px] items-center justify-center bg-[#E1E1E1] md:flex' />
        <div>
          <UnLike isDislike={checkDislike.isDisliked} setMessage={setDislikeMessage} message={dislikeMessage} onClick={() => _HandleAction('dislike')} />
        </div>
      </div>
    </Tooltip>
  )
}

const Like = ({ onClick, isLike, count, isDislike }: { onClick?: any; isLike?: boolean; count?: number; isDislike: boolean }) => {
  return (
    <button disabled={isDislike} className='like flex items-center gap-[8px] px-[20px] py-[10px]' onClick={onClick}>
      <div>
        <Like1 variant={isLike ? 'Bold' : 'Linear'} size={24} style={{ zIndex: 1000 }} className={isLike ? 'text-[#FCB713]' : ''} />
      </div>
      <span>{count}</span>
    </button>
  )
}

Like.displayName = 'Like'

const UnLike = ({ onClick, isDislike, message, setMessage }: { onClick?: any; isDislike?: boolean; message: string; setMessage: any }) => {
  const t = useTranslations('Modal')

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

  const _HandleUnLike = () => {
    isDislike !== true && onOpen()
  }

  const _HandleSendMessage = () => {
    if (!!message.length) {
      onClick()
      onClose()
    }
  }

  return (
    <>
      <button onClick={() => _HandleUnLike()} disabled={isDislike} className='unlike flex items-center px-[20px] py-[10px]'>
        <Dislike size={24} variant={isDislike ? 'Bold' : 'Linear'} className={isDislike ? 'text-[#FCB713]' : ''} />
      </button>
      <DefaultModal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        modalBody={
          <div className='flex h-full w-full flex-col gap-[24px] p-[16px]'>
            <div className='flex items-center justify-center'>
              <Image src={'/benefitCustomer/Fixy-write1.png'} alt='write-mascot' height={174} width={217} className='object-cover' />
            </div>
            <div className='flex flex-col justify-center gap-[8px]'>
              <p className='text-[1.8rem]  font-medium'>{t('heading')}</p>
              <Textarea
                value={message}
                onChange={(e: any) => setMessage(e.target.value)}
                placeholder={t('type')}
                minRows={2}
                className='w-full'
                classNames={{
                  input: 'text-[1.8rem]',
                  inputWrapper: 'px-[16px] py-[12px] text-[#969696] border-1 border-[#E1E1E1] bg-transparent',
                }}
              />
            </div>
            <Button onPress={_HandleSendMessage} className='flex h-[44px] w-full items-center justify-center rounded-full bg-[#FCB813] text-[1.8rem] font-medium '>
              {t('send')}
            </Button>
          </div>
        }
      />
    </>
  )
}

export default HomePage
