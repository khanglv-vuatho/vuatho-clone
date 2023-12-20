'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'

import confetti from 'canvas-confetti'
import { motion, useAnimate } from 'framer-motion'
import { ArrowRight, Dislike, Like1 } from 'iconsax-react'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Agree, CheckIcon, GigEconomy, ImageSkeleton, Support } from '@/components/Icons'
import Article from '@/components/article'
import { SkeletonBlog } from '@/components/skeleton'
import instance from '@/services/axiosConfig'
import { Button, Skeleton, Textarea, Tooltip, useDisclosure } from '@nextui-org/react'
import SectionDownload from './(sections)/downloadApp'
import SectionToTheMoon from './(sections)/toTheMoon'
import SectionWithVuaTho from './(sections)/withVuaTho'

import ImageFallback from '@/components/ImageFallback'
import { ToastComponent } from '@/components/ToastComponent'
import { DefaultModal } from '@/components/modal'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './swipper.scss'

import dynamic from 'next/dynamic'

const GlobeComponent = dynamic(() => import('@/components/GlobeComponent'), {
  ssr: false,
})

function HomePage() {
  const searchParams = useSearchParams()
  const hiddenHeaderAndFooter = searchParams.get('hideHeaderAndFooter')

  return (
    <>
      <div
        className={`${
          hiddenHeaderAndFooter
            ? 'space-y-[40px] overflow-hidden md:space-y-[100px] xl:space-y-[100px]'
            : 'space-y-[40px] overflow-hidden pt-[70px] md:space-y-[100px] xl:space-y-[100px] 3xl:pt-[80px]'
        }`}
      >
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
        <h4 className='relative z-10 mb-[60px] inline-block w-full bg-gradient-to-r from-[#ff7c54] via-[#ffcc3f] to-[#ff783a] bg-clip-text text-center text-[2.4rem] font-semibold uppercase  text-transparent drop-shadow-sm md:text-[4.2rem] 2xl:mb-[100px]'>
          {t('heading1')}
        </h4>
        <div className='flex flex-col'>
          <div className='bottom-2 flex h-full w-full items-center justify-center md:absolute md:justify-end 13inch:justify-center'>
            <div className='xl:mt-[200px] flex w-full items-center justify-center md:w-1/2 13inch:w-auto'>
              <Image
                src={'/ai-section-1.png'}
                alt='AI Robot'
                width={700}
                height={680}
                quality={100}
                className='pointer-events-none select-none'
              />
            </div>
          </div>
          <div className='grid grid-cols-1 items-center gap-[20px] py-12 lg:ml-[10%] 13inch:ml-0 13inch:grid-cols-2 13inch:gap-[56px]'>
            {listAI.map((item, index) => (
              <div
                key={`listAI-${index}`}
                className={`relative z-[10] flex w-full flex-col gap-[10px] p-[20px] text-baseBlack md:max-w-[400px]  ${
                  index % 2 !== 0 && '13inch:ml-[36%]'
                }`}
              >
                <div
                  className={`absolute inset-0 z-[2] rounded-[20px] border-b-[2px] border-[#fbac47] bg-gradient-to-br from-[#ffffff] via-[#ffffff] to-[#e7e7e7] shadow-[0px_8px_16px_0px_#A2BAF366]`}
                ></div>
                <h5 className=' z-[4] text-[1.8rem] font-bold'>{item.title}</h5>
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
    <div className='' id='trade'>
      <section className='ct-container-70'>
        <h2
          className='mb-[40px] inline-block bg-gradient-to-br from-[#ff7c54] via-[#ffcc3f] to-[#ff783a] bg-clip-text text-[2.4rem] font-semibold uppercase text-[#f5b500]
        text-transparent md:text-[4.2rem]'
        >
          {t('heading')}
        </h2>
        <div className='grid grid-cols-1 gap-[20px] lg:grid-cols-2 lg:gap-[40px]'>
          {listData.map((item, index) => (
            <div
              key={`listData-${index}`}
              className='flex flex-col gap-[8px] text-[1.8rem] text-baseBlack'
            >
              <div className='flex items-center gap-[10px]'>
                <span className='relative flex h-6 w-6 items-center justify-center'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f5b500] opacity-75'></span>
                  <span className='relative inline-flex h-4 w-4 rounded-full bg-[#f5b500]'></span>
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
    <section id='multi' className=''>
      <section className='ct-container-70'>
        <h2
          className='mb-[40px] inline-block bg-gradient-to-br from-[#ff7c54] via-[#ffcc3f] to-[#ff783a] bg-clip-text text-[2.4rem] font-semibold
        uppercase  text-transparent md:text-[4.2rem]'
        >
          {t('heading')}
        </h2>
        <div className='grid grid-cols-1 gap-[20px] pb-[40px] lg:grid-cols-2 lg:gap-[40px]'>
          {DataLabel.map((item: any, index: number) => (
            <div
              key={`datalabel-${index}`}
              className='flex flex-col gap-[8px] text-[1.8rem] text-baseBlack'
            >
              <div className='flex items-center gap-[10px]'>
                {/* <div className='h-[12px] w-[12px] animate-ping rounded-full bg-gradient-to-tr from-[#000000] to-[#181818]' /> */}
                <span className='relative flex h-6 w-6 items-center justify-center'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f5b500] opacity-75'></span>
                  <span className='relative inline-flex h-4 w-4 rounded-full bg-[#f5b500]'></span>
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
  const listCard = [
    {
      id: '#AI',
      icon: GigEconomy,
      title: t('listCard.title1'),
      desc: t('listCard.desc1'),
    },
    {
      id: '#trade',
      icon: Agree,
      title: t('listCard.title2'),
      desc: t('listCard.desc2'),
    },
    {
      id: '#multi',
      icon: Support,
      title: t('listCard.title3'),
      desc: t('listCard.desc3'),
    },
  ]
  return (
    <div>
      <div className='relative bg-[white]'>
        <div className='ct-container-70 z-1 relative grid grid-cols-1 xl:grid-cols-5'>
          <div className='col-span-1 xl:col-span-3'>
            <div className='relative z-10 mx-auto flex max-w-max flex-col justify-between gap-[20px] pt-10 xl:mx-0 xl:w-full xl:pt-20'>
              <div className='mx-auto flex max-w-max flex-col  xl:mx-0 xl:w-full'>
                <h3 className='text-[2.8rem] font-bold uppercase'>{t('heading1')}</h3>
                <h3 className='bg-gradient-to-r from-[#ff7c54] via-[#ffcc3f] to-[#ff783a] bg-clip-text text-left text-[2.4rem] font-bold uppercase text-[#f5b500] text-transparent xl:text-[3.2rem]'>
                  <span className='text-[#f5b500]'>{t('heading1-1')}</span>
                </h3>
                <h3 className='text-[2.8rem] font-bold uppercase'>{t('heading2')}</h3>
              </div>
              <div className='flex flex-col gap-[20px]'>
                <div className='flex items-center gap-[8px]'>
                  <Image src={'/storm.svg'} alt='' width={14} height={14} />
                  <p className='text-[1.8rem] text-black xl:text-[1.8rem]'>
                    {t('text1')}
                  </p>
                </div>
                <div className='flex items-center gap-[8px]'>
                  <Image src={'/storm.svg'} alt='' width={14} height={14} />
                  <p className='text-[1.8rem] text-black xl:text-[1.8rem]'>
                    {t('text2')}
                  </p>
                </div>
              </div>
              <div className='relative'>
                <div></div>
              </div>
            </div>
            <div className='mt-24 grid w-full grid-cols-1 gap-6 md:grid-cols-3'>
              {listCard.map((item: any, index: any) => (
                <a
                  href={item.id}
                  key={`listcard-${index}`}
                  className='group z-[2] flex cursor-pointer items-center gap-[10px] rounded-[10px] bg-white p-[12px] shadow-xl duration-300 hover:border-transparent hover:bg-white md:flex-col md:items-start xl:p-[10px] xl:hover:-translate-y-[6px]'
                >
                  <item.icon size={40} className='text-[#f5b500]' variant='Bold' />
                  <div className='w-full pl-5 md:pl-0'>
                    <p className='mt-2 text-[1.8rem] text-primaryText'>{item.desc}</p>
                    <div className='flex items-center justify-between'>
                      <p className='mt-2 text-[1.8rem] font-semibold text-primaryText'>
                        {item.title}
                      </p>
                      <span className='-translate-x-[10px] opacity-0 duration-300 group-hover:translate-x-0 group-hover:opacity-100'>
                        <ArrowRight size={24} className='text-black' />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className='z-[1] col-span-1 mt-32 w-full justify-center xl:col-span-2'>
            <Image
              src={'/hand-hold-phone-1.png'}
              alt=''
              quality={100}
              width={400}
              height={400}
              className='object-fit relative z-[1]'
            />
            <Image
              src={'/globe.svg'}
              alt=''
              quality={100}
              width={400}
              height={400}
              className='motion-safe:animate-bounce-slow absolute top-[660px] z-[0] object-contain lg:top-12'
            />
          </div>
        </div>
        <div className='absolute bottom-0 left-0 right-0 z-[0] -skew-y-0 transform'>
          <svg
            id='wave'
            style={{
              transform: 'rotate(0deg)',
              transition: '0.3s',
            }}
            viewBox='0 0 1440 380'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
          >
            <defs>
              <linearGradient id='sw-gradient-0' x1='0' x2='0' y1='1' y2='0'>
                <stop stop-color='rgba(255, 247.849, 245.552, 1)' offset='0%'></stop>
                <stop stop-color='rgba(255, 214.838, 126.06, 1)' offset='100%'></stop>
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id='sw-gradient-1' x1='0' x2='0' y1='1' y2='0'>
                <stop stop-color='rgba(255, 220.258, 82.871, 1)' offset='0%'></stop>
                <stop stop-color='rgba(255, 233.672, 186.526, 1)' offset='100%'></stop>
              </linearGradient>
            </defs>
            <path
              style={{
                transform: 'translate(0, 50px)',
                opacity: 0.9,
              }}
              fill='url(#sw-gradient-1)'
              d='M0,38L80,82.3C160,127,320,215,480,247C640,279,800,253,960,240.7C1120,228,1280,228,1440,202.7C1600,177,1760,127,1920,133C2080,139,2240,203,2400,209C2560,215,2720,165,2880,171C3040,177,3200,241,3360,240.7C3520,241,3680,177,3840,164.7C4000,152,4160,190,4320,177.3C4480,165,4640,101,4800,82.3C4960,63,5120,89,5280,88.7C5440,89,5600,63,5760,88.7C5920,114,6080,190,6240,234.3C6400,279,6560,291,6720,247C6880,203,7040,101,7200,57C7360,13,7520,25,7680,25.3C7840,25,8000,13,8160,50.7C8320,89,8480,177,8640,228C8800,279,8960,291,9120,266C9280,241,9440,177,9600,126.7C9760,76,9920,38,10080,25.3C10240,13,10400,25,10560,44.3C10720,63,10880,89,11040,107.7C11200,127,11360,139,11440,145.7L11520,152L11520,380L11440,380C11360,380,11200,380,11040,380C10880,380,10720,380,10560,380C10400,380,10240,380,10080,380C9920,380,9760,380,9600,380C9440,380,9280,380,9120,380C8960,380,8800,380,8640,380C8480,380,8320,380,8160,380C8000,380,7840,380,7680,380C7520,380,7360,380,7200,380C7040,380,6880,380,6720,380C6560,380,6400,380,6240,380C6080,380,5920,380,5760,380C5600,380,5440,380,5280,380C5120,380,4960,380,4800,380C4640,380,4480,380,4320,380C4160,380,4000,380,3840,380C3680,380,3520,380,3360,380C3200,380,3040,380,2880,380C2720,380,2560,380,2400,380C2240,380,2080,380,1920,380C1760,380,1600,380,1440,380C1280,380,1120,380,960,380C800,380,640,380,480,380C320,380,160,380,80,380L0,380Z'
            ></path>
            <defs>
              <linearGradient id='sw-gradient-2' x1='0' x2='0' y1='1' y2='0'>
                <stop stop-color='rgba(255, 240.059, 105.905, 1)' offset='0%'></stop>
                <stop stop-color='rgba(255, 179, 11, 1)' offset='100%'></stop>
              </linearGradient>
            </defs>
            <path
              style={{
                transform: 'translate(0, 100px)',
                opacity: 0.8,
              }}
              fill='url(#sw-gradient-2)'
              d='M0,266L80,266C160,266,320,266,480,240.7C640,215,800,165,960,171C1120,177,1280,241,1440,221.7C1600,203,1760,101,1920,57C2080,13,2240,25,2400,69.7C2560,114,2720,190,2880,190C3040,190,3200,114,3360,101.3C3520,89,3680,139,3840,183.7C4000,228,4160,266,4320,247C4480,228,4640,152,4800,145.7C4960,139,5120,203,5280,221.7C5440,241,5600,215,5760,190C5920,165,6080,139,6240,139.3C6400,139,6560,165,6720,158.3C6880,152,7040,114,7200,82.3C7360,51,7520,25,7680,69.7C7840,114,8000,228,8160,259.7C8320,291,8480,241,8640,221.7C8800,203,8960,215,9120,202.7C9280,190,9440,152,9600,164.7C9760,177,9920,241,10080,259.7C10240,279,10400,253,10560,215.3C10720,177,10880,127,11040,107.7C11200,89,11360,101,11440,107.7L11520,114L11520,380L11440,380C11360,380,11200,380,11040,380C10880,380,10720,380,10560,380C10400,380,10240,380,10080,380C9920,380,9760,380,9600,380C9440,380,9280,380,9120,380C8960,380,8800,380,8640,380C8480,380,8320,380,8160,380C8000,380,7840,380,7680,380C7520,380,7360,380,7200,380C7040,380,6880,380,6720,380C6560,380,6400,380,6240,380C6080,380,5920,380,5760,380C5600,380,5440,380,5280,380C5120,380,4960,380,4800,380C4640,380,4480,380,4320,380C4160,380,4000,380,3840,380C3680,380,3520,380,3360,380C3200,380,3040,380,2880,380C2720,380,2560,380,2400,380C2240,380,2080,380,1920,380C1760,380,1600,380,1440,380C1280,380,1120,380,960,380C800,380,640,380,480,380C320,380,160,380,80,380L0,380Z'
            ></path>
            <defs>
              <linearGradient id='sw-gradient-3' x1='0' x2='0' y1='1' y2='0'>
                <stop stop-color='rgba(255, 186.256, 0, 1)' offset='0%'></stop>
                <stop stop-color='rgba(255, 179, 11, 1)' offset='100%'></stop>
              </linearGradient>
            </defs>
            <path
              style={{
                transform: 'translate(0, 150px)',
                opacity: 0.7,
              }}
              fill='url(#sw-gradient-3)'
              d='M0,266L80,259.7C160,253,320,241,480,215.3C640,190,800,152,960,120.3C1120,89,1280,63,1440,82.3C1600,101,1760,165,1920,164.7C2080,165,2240,101,2400,101.3C2560,101,2720,165,2880,158.3C3040,152,3200,76,3360,69.7C3520,63,3680,127,3840,183.7C4000,241,4160,291,4320,266C4480,241,4640,139,4800,114C4960,89,5120,139,5280,171C5440,203,5600,215,5760,228C5920,241,6080,253,6240,228C6400,203,6560,139,6720,120.3C6880,101,7040,127,7200,139.3C7360,152,7520,152,7680,177.3C7840,203,8000,253,8160,285C8320,317,8480,329,8640,304C8800,279,8960,215,9120,171C9280,127,9440,101,9600,133C9760,165,9920,253,10080,240.7C10240,228,10400,114,10560,101.3C10720,89,10880,177,11040,183.7C11200,190,11360,114,11440,76L11520,38L11520,380L11440,380C11360,380,11200,380,11040,380C10880,380,10720,380,10560,380C10400,380,10240,380,10080,380C9920,380,9760,380,9600,380C9440,380,9280,380,9120,380C8960,380,8800,380,8640,380C8480,380,8320,380,8160,380C8000,380,7840,380,7680,380C7520,380,7360,380,7200,380C7040,380,6880,380,6720,380C6560,380,6400,380,6240,380C6080,380,5920,380,5760,380C5600,380,5440,380,5280,380C5120,380,4960,380,4800,380C4640,380,4480,380,4320,380C4160,380,4000,380,3840,380C3680,380,3520,380,3360,380C3200,380,3040,380,2880,380C2720,380,2560,380,2400,380C2240,380,2080,380,1920,380C1760,380,1600,380,1440,380C1280,380,1120,380,960,380C800,380,640,380,480,380C320,380,160,380,80,380L0,380Z'
            ></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

const CustomerBenefitSection = () => {
  const t = useTranslations('CustomerBenefitSection')

  interface TlistBenefit {
    title: string
    id: number
  }
  const listBenefit: TlistBenefit[] = [
    { title: t('listBenefit.title1'), id: 1 },
    { title: t('listBenefit.title2'), id: 2 },
    { title: t('listBenefit.title3'), id: 3 },
    { title: t('listBenefit.title4'), id: 4 },
    { title: t('listBenefit.title5'), id: 5 },
  ]

  return (
    <div className='ct-container-70 flex flex-col gap-[20px]'>
      <div className='flex flex-col gap-[10px] md:hidden'>
        <h3 className='text-[1.8rem] font-semibold uppercase tracking-[8px] text-primary-blue lg:text-[2rem]'>
          {t('benefit')}
        </h3>
        <p className=' text-[2.4rem] md:text-[3.2rem]'>{t('text')}</p>
      </div>
      <div className=' grid grid-cols-1 gap-[20px] xl:grid-cols-5'>
        <div className='col-span-1 xl:col-span-2'>
          <div className='hidden flex-col gap-[10px] md:flex'>
            <h3 className='text-[1.8rem] font-semibold uppercase tracking-[8px] md:text-[2rem]'>
              {t('benefit')}
            </h3>
            <p className='whitespace-nowrap bg-gradient-to-r from-[#ff7c54] via-[#ffcc3f] to-[#ff783a] bg-clip-text text-[2.4rem] font-semibold uppercase text-transparent md:text-[3.2rem]'>
              {t('text')}
            </p>
          </div>
          <div className='mx-auto mt-6 h-[400px] w-[400px] md:h-[300px] md:w-[300px] xl:mx-0 xl:h-[480px] xl:w-[480px]'>
            <Image
              src={'/khach-benefit-7.png'}
              alt=''
              quality={100}
              height={600}
              width={600}
              className='pointer-events-none h-full w-full select-none object-contain'
            />
          </div>
        </div>
        <div className='col-span-1 grid grid-cols-1 gap-[20px] md:mx-auto md:max-w-[820px] md:grid-cols-2 md:gap-[40px] xl:col-span-3'>
          {listBenefit.map((item: TlistBenefit, index: number) => (
            <div className='col-span-1' key={`listBenefit-${index}`}>
              <div className='items-left flex items-center gap-[20px] md:flex-col lg:justify-center xl:gap-[6px]'>
                <Image
                  src={`/numbers/${index + 1}.png`}
                  alt='AI Robot'
                  width={128}
                  height={128}
                  quality={100}
                  className='pointer-events-none select-none'
                />
                {/* <p className='text-[4rem] font-semibold leading-none text-[#f5b500] md:text-[6.4rem]'>
                  {index + 1}
                </p> */}
                <h3 className='mt-[-16px] text-[1.8rem] text-base-black-1 lg:text-center'>
                  {item.title}
                </h3>
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

  const swiperRef = useRef<any>(null)

  const _handleFetching = useCallback(async () => {
    try {
      const data: any = await instance.get(`home/benefit?lang=${locale}`)
      setListDataBenefit([...data])
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

  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return `<span class="paginationBenefit ${className}" key="bullet-${index}">${
        index + 1
      }</span>`
    },
  }

  useEffect(() => {
    return () => clearTimeout(timer)
  }, [timer])

  return (
    <div className='relative flex flex-col gap-[20px] '>
      <div className='ct-container-70 flex flex-col gap-[20px] xl:gap-[40px]'>
        <div className='flex flex-col gap-[10px]'>
          <h3 className='text-[1.8rem] font-semibold uppercase tracking-[8px] md:text-[2rem]'>
            {t('benefit')}
          </h3>
          <p className='bg-gradient-to-r from-[#f5b500] to-[#ff8800] bg-clip-text text-[2.4rem] font-bold uppercase text-transparent md:text-[3.6rem]'>
            {t('text')}
          </p>
        </div>
        {onFetching ? (
          <>
            <div className='flex h-[200px] w-full animate-pulse items-center justify-center bg-gray-300'>
              <ImageSkeleton style='h-[60px] w-full animate-pulse' />
            </div>
            <div className='flex w-full flex-col items-center justify-center gap-[12px] p-[20px]'>
              {Array(4)
                .fill(1)
                .map((_, index) => (
                  <Skeleton
                    key={`skeleton-text-${index}`}
                    className='h-[12px] w-full rounded-lg'
                  />
                ))}
            </div>
            <div className='flex w-full items-center justify-center gap-[20px]'>
              {Array(6)
                .fill(1)
                .map((_: any, index: number) => (
                  <Skeleton
                    className='h-[32px] w-[32px] flex-shrink-0 rounded-lg'
                    key={`skeleton-pagination-${index}`}
                  />
                ))}
            </div>
          </>
        ) : (
          <Swiper
            ref={swiperRef}
            spaceBetween={30}
            effect={'fade'}
            loop
            autoHeight
            autoplay={{
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              delay: 15000,
            }}
            slidesPerView={1}
            navigation
            pagination={pagination}
            modules={[Autoplay, EffectFade, Pagination, Navigation]}
            className='benefitSwipper h-full w-full'
            onActiveIndexChange={(swiper: any) => {
              setCurrentIndex(swiper.realIndex)
            }}
          >
            {listDataBenefit?.map((item: any, index: number) => {
              return (
                <div className='h-full w-full' key={`listDataBenefit-${index}`}>
                  <SwiperSlide
                    className={currentIndex === index ? 'visible' : 'invisible'}
                    onClick={_handleClickSwiper}
                  >
                    <div className='relative z-[12] mb-[16px] flex items-center justify-between'>
                      <div className='flex h-[76px] items-center gap-[12px]'>
                        <p className='text-[4rem] font-semibold uppercase leading-none text-[#f5b500] xl:text-[6.4rem]'>
                          {index + 1}
                        </p>
                        <h4 className='text-[1.8rem] font-bold uppercase text-[#f5b500] xl:text-[2.4rem]'>
                          {item.title}
                        </h4>
                      </div>
                      <div className='likeButton z-[10] hidden md:block'>
                        <LikeControl item={item} />
                      </div>
                    </div>
                    <div className='likeButtonMobile relative z-[10] w-auto md:hidden'>
                      <LikeControl item={item} />
                    </div>
                    <div className='grid w-full grid-cols-5 rounded-xl'>
                      <div className='text order-1 col-span-5 h-full w-full p-[20px] text-[1.8rem] xl:order-none xl:col-span-2'>
                        <div dangerouslySetInnerHTML={{ __html: item.html }} />
                      </div>
                      <div className='relative order-none col-span-5 h-full w-full xl:order-1 xl:col-span-3'>
                        <div className='rounded-t-[12px] md:mt-[-20px] xl:rounded-r-[12px]'>
                          <ImageFallback
                            src={`/benefits/${index + 1}.png`}
                            alt={item.title}
                            height={400}
                            width={860}
                            quality={100}
                            className='max-h-[250px] w-full object-cover md:max-h-none'
                          />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              )
            })}
          </Swiper>
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
    <div className='ct-container-70 flex flex-col gap-[20px] pb-[40px] md:pb-0'>
      <div className='flex items-center justify-between'>
        <h2 className='inline-block bg-gradient-to-br from-[#ff7c54] via-[#ffcc3f] to-[#ff783a] bg-clip-text text-[1.8rem] font-bold uppercase text-transparent md:text-[3.2rem]'>
          {t('heading')}
        </h2>
        <Link
          href={`/${locale}/press`}
          className='text-[1.8rem] font-semibold uppercase text-[#f5b500]'
        >
          {t('seeAll')}
        </Link>
      </div>
      <div className='blog-home flex flex-nowrap gap-[20px] overflow-x-auto xl:grid xl:grid-cols-4 xl:overflow-x-auto'>
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
                return (
                  <Article
                    key={`blog-${index}`}
                    item={item}
                    style='w-[80%] md:w-[40%] xl:w-full cursor-pointer'
                  />
                )
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
      ToastComponent({ message: 'Cảm ơn bạn đã đóng góp ý kiến', type: 'success' })
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
      content={'Cảm ơn bạn đã đóng góp ý kiến'}
      placement='top'
      classNames={{
        content: 'text-[1.8rem] px-[16px] py-[8px]',
      }}
    >
      <div className='flex h-[40px] items-center justify-between overflow-hidden rounded-full bg-white md:h-[48px] md:bg-[#F8F8F8]'>
        <div className=''>
          <Like
            isDislike={checkDislike.isDisliked}
            isLike={checkLike.isLiked}
            count={checkLike.count}
            onClick={() => _HandleAction('like')}
          />
        </div>
        <div className='mx-[8px] flex h-[80%] w-[1px] items-center justify-center bg-[#E1E1E1]' />
        <div className=''>
          <UnLike
            isDislike={checkDislike.isDisliked}
            setMessage={setDislikeMessage}
            message={dislikeMessage}
            onClick={() => _HandleAction('dislike')}
          />
        </div>
      </div>
    </Tooltip>
  )
}

const Like = ({
  onClick,
  isLike,
  count,
  isDislike,
}: {
  onClick?: any
  isLike?: boolean
  count?: number
  isDislike: boolean
}) => {
  const [scope, animate] = useAnimate()

  const handeAnimation = (isLike: boolean) => {
    const button: any = document.querySelector('.likeButton')
    const buttonMobile: any = document.querySelector('.likeButtonMobile')
    const rect = button.getBoundingClientRect()
    const rect2 = buttonMobile.getBoundingClientRect()
    const x =
      (rect.left + rect.width / 2) / window.innerWidth !== 0
        ? (rect.left + rect.width / 2) / window.innerWidth
        : (rect2.left + rect2.width / 2) / window.innerWidth
    const y =
      (rect.top + rect.height) / window.innerHeight !== 0
        ? (rect.top + rect.height) / window.innerHeight
        : (rect2.top + rect2.height) / window.innerHeight

    !isLike &&
      confetti({
        gravity: 5,
        particleCount: 70,
        spread: 40,
        origin: { x, y },
      })
    animate(
      isLike
        ? []
        : [
            [scope.current, { y: -28 }, { duration: 0.2 }],
            [scope.current, { scaleX: -1 }, { duration: 0.2, at: '<' }],
            [scope.current, { scaleX: 1 }, { duration: 0.2 }],
            [scope.current, { y: 0 }, { duration: 0.2 }],
          ],
    )
  }

  return (
    <button
      disabled={isDislike}
      className='like flex items-center gap-[8px] px-[20px] py-[10px]'
      onClick={onClick}
    >
      <motion.div>
        <Like1
          ref={scope}
          variant={isLike ? 'Bold' : 'Linear'}
          size={24}
          style={{ zIndex: 1000 }}
          className={isLike ? 'text-[#FCB713]' : 'text-base-black-1'}
        />
      </motion.div>
      <span className='text-base-black-1'>{count}</span>
    </button>
  )
}

Like.displayName = 'Like'

const UnLike = ({
  onClick,
  isDislike,
  message,
  setMessage,
}: {
  onClick?: any
  isDislike?: boolean
  message: string
  setMessage: any
}) => {
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
      <button
        type='button'
        title='button'
        onClick={() => _HandleUnLike()}
        disabled={isDislike}
        className='unlike flex items-center px-[20px] py-[10px]'
      >
        <Dislike
          size={24}
          variant={isDislike ? 'Bold' : 'Linear'}
          className={isDislike ? 'text-[#FCB713]' : 'text-base-black-1'}
        />
      </button>
      <DefaultModal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        modalBody={
          <div className='flex h-full w-full flex-col gap-[24px] p-[16px]'>
            <div className='flex items-center justify-center'>
              <Image
                src={'/benefitCustomer/Fixy-write1.png'}
                alt='write-mascot'
                height={174}
                width={217}
                className='object-cover'
              />
            </div>
            <div className='flex flex-col justify-center gap-[8px]'>
              <p className='font-medium text-base-black-1 '>{t('heading')}</p>
              <Textarea
                value={message}
                onChange={(e: any) => setMessage(e.target.value)}
                placeholder={t('type')}
                minRows={2}
                className='w-full'
                classNames={{
                  input: 'text-[1.8rem]',
                  inputWrapper:
                    'px-[16px] py-[12px] text-[#969696] border-1 border-[#E1E1E1] bg-transparent',
                }}
              />
            </div>
            <Button
              onPress={_HandleSendMessage}
              className='flex h-[44px] w-full items-center justify-center rounded-full bg-[#FCB813] text-[1.8rem] font-medium text-base-black-1'
            >
              {t('send')}
            </Button>
          </div>
        }
      ></DefaultModal>
    </>
  )
}

export default HomePage
