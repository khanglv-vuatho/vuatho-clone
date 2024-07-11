'use client'

import { useTranslations } from 'next-intl'

import { ListBreadcrumbs } from '@/components/breadcrumbs'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Controller, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Letter from '@/components/Letter'
import LogoAnimate from '@/components/LogoAnimate'
import { Button } from '@nextui-org/react'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import { useSearchParams } from 'next/navigation'
import './about-us.scss'
import Image from 'next/image'

function AboutUsPage() {
  const t = useTranslations('AboutUs')
  const td = useTranslations('listBreadcrumbs')
  const tf = useTranslations('Footer')
  const listBeardcrumbAboutUs = [{ title: td('home'), url: '/' }, { title: tf('about_us') }]

  const [firstSwiper, setFirstSwiper] = useState(null)
  const [secondSwiper, setSecondSwiper] = useState(null)
  const searchParams = useSearchParams()
  const hiddenHeaderAndFooter = searchParams.get('hideHeaderAndFooter')
  const sliderRef: any = useRef(null)

  type TListSwiper = {
    thumb: string
    text: { title: string; content: string }
  }
  const listSwiper: TListSwiper[] = [
    {
      thumb: '/to-the-moon/to-the-moon-3-1.jpeg',
      text: {
        title: t('text10'),
        content: t('text9')
      }
    },
    {
      thumb: '/to-the-moon/to-the-moon-3-1.jpeg',
      text: {
        title: t('text11'),
        content: t('text12')
      }
    },
    {
      thumb: '/to-the-moon/to-the-moon-3-1.jpeg',
      text: {
        title: t('text13'),
        content: t('text14')
      }
    },
    {
      thumb: '/to-the-moon/to-the-moon-3-1.jpeg',
      text: {
        title: t('text15'),
        content: t('text16')
      }
    }
  ]

  const handleSwiper = (direction: 'slidePrev' | 'slideNext') => {
    if (!sliderRef.current) return
    sliderRef.current.swiper?.[direction]()
  }

  const DURATION_CHAR = 0.02
  return (
    <div style={hiddenHeaderAndFooter ? { paddingTop: 0 } : {}} className='mb-[100px] pt-[70px] 3xl:pt-20'>
      <div className='ct-container mt-10'>
        <ListBreadcrumbs list={listBeardcrumbAboutUs} />
      </div>
      <div className='flex flex-col gap-10 2xl:gap-[100px]'>
        <div className='w-full overflow-hidden  md:pb-[100px] '>
          <div className='ct-container flex flex-col md:mt-[40px] lg:flex-row'>
            {/* <MacbookScroll src='/to-the-moon/to-the-moon-3-1.jpeg' title='about Vua Thợ' /> */}

            <div className='flex flex-col justify-center gap-[4px] md:w-[80%] md:py-[40px]'>
              <h3 className='text-lg font-semibold uppercase tracking-[4px] md:text-xl'>
                {t('heading1')} <br />
                {t('heading2')}
              </h3>
              <p className='bg-gradient-to-r from-[#ff7c54] via-[#ffcc3f] to-[#ff783a] bg-clip-text text-left text-2xl font-bold uppercase text-[#f5b500] text-transparent md:text-3xl'>
                {t('heading')}
              </p>
              <div className='w-full'>
                <div className='text-lg '>
                  {t('text')
                    .split('')
                    ?.map((char: any, index: number) => <Letter key={index} character={char} index={index} />)}
                </div>
              </div>
            </div>
            <div className='mt-[20px] flex min-h-[300px] w-full flex-col gap-[10px] md:mt-0 lg:relative lg:mt-[40px] lg:block'>
              <motion.div
                initial={{
                  x: 100,
                  opacity: 0
                }}
                whileInView={{
                  x: 0,
                  opacity: 1
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.3,
                  ease: 'linear'
                }}
                viewport={{ once: true }}
                className='right-0 h-full w-full lg:absolute lg:w-[80%]'
              >
                <Image src={'/contact-us/hero-1.jpeg'} alt='hero-1' height={600} width={800} className='size-full rounded-[16px] object-cover lg:rounded-none' />
              </motion.div>
              <motion.div
                initial={{
                  y: 60,
                  opacity: 0
                }}
                whileInView={{
                  y: 0,
                  opacity: 1
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.3,
                  ease: 'linear'
                }}
                viewport={{ once: true }}
                className='bottom-[-20%] left-[5%] w-full rounded-lg bg-white lg:absolute lg:w-[40%] lg:p-[10px]'
              >
                <Image src={'/to-the-moon/to-the-moon-2.webp'} alt='to-the-moon-2' height={600} width={600} className='rxlg:w-auto w-full lg:rounded-none' />
              </motion.div>
            </div>
          </div>
        </div>
        <div className='ct-container '>
          <div className='flex items-center justify-center gap-[16px]'>
            <div className='relative h-[4px] w-[100px] overflow-hidden rounded-[4px] md:w-[300px]'>
              <motion.div className='absolute inset-0 bg-primary-yellow' />
            </div>
            <div className='flex-shrink-0 rounded-full'>
              <LogoAnimate height={70} width={100} delay={0.8} />
            </div>
            <div className='relative h-[4px] w-[100px] overflow-hidden rounded-[4px] md:w-[300px]'>
              <motion.div className='absolute inset-0 bg-primary-yellow' />
            </div>
          </div>
        </div>
        <div className='relative md:mt-[100px]'>
          <div className='ct-container grid items-center rounded-[20px] lg:grid-cols-3 lg:bg-[#eff1f3]/20'>
            <motion.div
              initial={{
                x: 0,
                opacity: 0
              }}
              whileInView={{
                x: '20%',
                opacity: 1
              }}
              transition={{
                delay: 0.3,
                duration: 0.2,
                ease: 'linear'
              }}
              viewport={{ once: true }}
              className='relative top-[-20%] z-10 hidden rounded-[16px] bg-white p-[20px] shadow-[0px_8px_16px_0px_#A2BAF366] lg:block'
            >
              <Image src={'/to-the-moon/to-the-moon-1.webp'} alt='to-the-moon-1' height={750} width={610} className='pointer-events-none select-none object-cover' />
            </motion.div>
            <div className='col-span-2 flex flex-col gap-[20px] lg:pl-[20%] lg:pr-[20px]'>
              <p className='text-2xl font-bold uppercase text-primary-blue md:text-4xl'>{t('text1')}</p>
              <Image
                src={'/to-the-moon/to-the-moon-1.webp'}
                alt='to-the-moon-1'
                height={750}
                width={610}
                className='pointer-events-none mx-auto select-none rounded-[16px] object-cover shadow-[0px_8px_16px_0px_#A2BAF366] lg:hidden'
              />

              <div className='text-lg '>
                {t('text2')
                  .split('')
                  ?.map((char: any, index: number) => <Letter key={index} character={char} index={index} />)}
              </div>
              <motion.div
                initial={{
                  y: 40,
                  opacity: 0
                }}
                whileInView={{
                  y: 0,
                  opacity: 1
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.1,
                  ease: 'linear'
                }}
                viewport={{ once: true }}
              >
                <Button
                  // onPress={_HandleOpenWindow}
                  disableRipple
                  variant='bordered'
                  className='w-full cursor-pointer border-primary-blue px-[40px] py-[24px] text-lg text-primary-blue hover:bg-primary-blue hover:text-white lg:w-auto'
                  radius='md'
                >
                  {t('text3')}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
        <div className='ct-container mt-10 flex flex-col gap-[48px]'>
          <div className='flex flex-col items-center text-center text-2xl font-semibold text-primary-blue lg:text-left lg:text-5xl'>
            <p>{t('text17')} </p>
            <p>{t('text18')}</p>
          </div>
          <div className='max-h-[700px]'>
            <Image src={'/about-us/section-1.png'} alt='section-1' width={2000} height={1000} className='size-full object-contain' />
          </div>
        </div>
        <div className='ct-container flex max-w-[600px] flex-col items-center gap-6'>
          <div className='mx-auto flex flex-col items-center gap-1'>
            <h2 className='text-2xl font-semibold text-primary-blue lg:text-5xl '>{t('text19')}</h2>
            <p className='text-center text-sm  xs:text-base 2xl:text-lg'>{t('text20')}</p>
          </div>
          <div>
            <Image src={'/to-the-moon/to-the-moon-3-1.jpeg'} alt='to-the-moon-3' height={500} width={500} className='size-full rounded-xl object-contain' />
          </div>
        </div>
        <div className='ct-container flex flex-col gap-4 lg:gap-[48px]'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-center text-2xl font-semibold text-primary-blue lg:text-left lg:text-5xl'>{t('text21')}</h3>
            <p className='text-center text-sm  xs:text-base lg:w-1/2 lg:text-left 2xl:text-lg'>{t('text22')}</p>
          </div>
          <div className='flex flex-col lg:grid lg:grid-cols-3'>
            <div className='order-2 mt-2 flex flex-col justify-between lg:order-1 lg:mt-0 lg:pt-[100px]'>
              <div className='z-10 rounded-xl bg-primary-blue text-white lg:w-[120%]'>
                <Swiper
                  ref={sliderRef}
                  effect='fade'
                  fadeEffect={{ crossFade: true }}
                  loop
                  className='rounded-xl'
                  modules={[EffectFade, Controller]}
                  controller={{ control: secondSwiper }}
                  onSwiper={setFirstSwiper as any}
                >
                  {listSwiper.map((item) => (
                    <SwiperSlide key={item.text.title} className='flex items-center justify-center bg-primary-blue'>
                      <div className='flex h-full flex-col gap-2 overflow-hidden p-4 lg:gap-4 lg:p-[48px] xl:p-[100px]'>
                        <h3 className='text-center text-2xl font-bold lg:text-left'>{item.text.title}</h3>
                        <p className='text-sm  xs:text-base 2xl:text-lg'>{item.text.content}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className='hidden items-center gap-5 lg:flex'>
                <button aria-label='prev' className='flex size-[64px] items-center justify-center rounded-full bg-[#F8F8F8]' onClick={() => handleSwiper('slidePrev')}>
                  <ArrowLeft2 className='flex size-6 flex-shrink-0' />
                </button>
                <button aria-label='next' className='flex size-[64px] items-center justify-center rounded-full bg-[#F8F8F8]' onClick={() => handleSwiper('slideNext')}>
                  <ArrowRight2 className='flex size-6 flex-shrink-0' />
                </button>
              </div>
            </div>
            <div className='order-1 col-span-2 '>
              <Swiper loop pagination modules={[Pagination, Controller]} className='mySwiper rounded-xl' controller={{ control: firstSwiper }} onSwiper={setSecondSwiper as any}>
                {listSwiper.map((item) => (
                  <SwiperSlide key={item.text.title}>
                    <div>
                      <Image src={item.thumb} alt='to-the-moon' height={1000} width={10000} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 duration-300 lg:gap-10'>
          <div className='ct-container flex flex-col items-center gap-2'>
            <h2 className='text-2xl font-semibold text-primary-blue lg:text-5xl '>{t('text23')}</h2>
            <p className='max-w-[800px] text-center text-sm  xs:text-base 2xl:text-lg'>{t('text24')}</p>
          </div>
          <div className='mb-[40px] grid grid-cols-6 px-[16px] pt-[40px] md:px-[40px]'>
            <div className='relative col-span-6 md:col-span-5'>
              <div className='absolute bottom-0 left-[3%] z-10 text-lg text-white md:bottom-auto md:left-[15%] md:top-1/2 md:-translate-y-1/2 md:text-4xl 2xl:left-[8%]'>
                <div className='flex items-center font-bold uppercase'>
                  {t('text5')
                    ?.split('')
                    ?.map((item, index) => <Letter durationChar={DURATION_CHAR} duration={0.2} key={index} index={index} character={item} />)}
                </div>
                <div className='flex items-center justify-end gap-[12px] whitespace-nowrap tracking-[2px]'>
                  <div className='uppercase text-primary-yellow'>
                    {t('text8')
                      ?.split('')
                      ?.map((item, index) => (
                        <Letter
                          durationChar={DURATION_CHAR}
                          initDelay={t('text5')?.split('')?.length * DURATION_CHAR + t('text7')?.split('')?.length * DURATION_CHAR + t('text6')?.split('')?.length * DURATION_CHAR}
                          duration={0.2}
                          key={index}
                          index={index}
                          character={item}
                        />
                      ))}
                  </div>
                  <div className='font-bold'>
                    {t('text6')
                      ?.split('')
                      ?.map((item, index) => (
                        <Letter initDelay={t('text5')?.split('')?.length * DURATION_CHAR} durationChar={DURATION_CHAR} duration={0.2} key={index} index={index} character={item} />
                      ))}
                  </div>
                </div>
                <div className='text-right'>
                  <div className='font-bold uppercase'>
                    {t('text7')
                      ?.split('')
                      ?.map((item, index) => (
                        <Letter
                          durationChar={DURATION_CHAR}
                          initDelay={t('text5')?.split('')?.length * DURATION_CHAR + t('text6')?.split('')?.length * DURATION_CHAR}
                          duration={0.2}
                          key={index}
                          index={index}
                          character={item}
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div className='absolute size-full'>
                <div className='absolute bottom-0 left-0 top-0 w-[30%] bg-black/70 md:w-[40%]' />
                <div className='absolute right-0 top-0 h-[60px] w-[70%] bg-black/70 md:h-[80px] md:w-[60%]' />
                <div className='absolute bottom-0 right-0 h-[60px] w-[70%] bg-black/70 md:h-[80px] md:w-[60%]' />
              </div>
              <div className='flex w-full items-center md:h-[80vh]'>
                <Image src={'/contact-us/hero.jpeg'} alt='' width={2000} height={2000} className='size-full object-cover' />
              </div>
            </div>
            <div className='relative z-[-1] hidden justify-center md:block'>
              <strong className='absolute bottom-[20%] right-[-80px] -rotate-90 whitespace-nowrap text-5xl uppercase text-primary-blue xs:right-[-60px] md:left-0 md:text-8xl lg:left-[-100px]'>
                {t('text4')}
              </strong>
            </div>
          </div>
          <div className='grid gap-2 px-10 *:*:overflow-hidden *:overflow-hidden *:*:rounded-lg *:rounded-lg xl:max-h-[90vh] xl:grid-cols-4 xl:grid-rows-3'>
            <div className='grid gap-2 xl:row-span-3 xl:grid-rows-3'>
              <div className='overflow-hidden rounded-lg xl:row-span-2'>
                <Image src={'/about-us/3.jpeg'} alt='about-us/3.jpeg' className='size-full object-cover' height={400} width={800} />
              </div>
              <div className='overflow-hidden rounded-lg'>
                <Image src={'/about-us/4.png'} alt='about-us/4.png' className='size-full object-cover' height={400} width={800} />
              </div>
            </div>
            <div className='grid gap-2 xl:col-span-3 xl:row-span-3 xl:grid-cols-3 xl:grid-rows-3'>
              <div className='grid gap-2 xl:col-span-3 xl:grid-cols-3'>
                <div className='overflow-hidden rounded-lg xl:col-span-2'>
                  <Image src={'/about-us/9.jpeg'} alt='about-us/9.jpeg' className='size-full object-cover' height={400} width={800} />
                </div>
                <div className='overflow-hidden rounded-lg'>
                  <Image src={'/about-us/8.jpeg'} alt='about-us/8.jpeg' className='size-full object-cover' height={400} width={800} />
                </div>
              </div>
              <div className='grid gap-2 xl:col-span-3 xl:row-span-2 xl:grid-cols-3 xl:grid-rows-2'>
                <div className='overflow-hidden rounded-lg xl:row-span-2'>
                  <Image src={'/about-us/1.jpeg'} alt='about-us/1.jpeg' className='size-full object-cover' height={400} width={800} />
                </div>
                <div className='grid gap-2 xl:col-span-2 xl:row-span-2 xl:grid-rows-2'>
                  <div className='overflow-hidden rounded-lg'>
                    <Image src={'/about-us/5.jpeg'} alt='about-us/5.jpeg' className='size-full object-cover' height={400} width={800} />
                  </div>
                  <div className='overflow-hidden rounded-lg'>
                    <Image src={'/about-us/7.jpeg'} alt='about-us/7.jpeg' className='size-full object-cover' height={400} width={800} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput
            className='text-red-200 placeholder:text-red-400'
            name='khang'
            label='123'
            placeholder='enter title'
            rules={{
              minLength: {
                value: 10,
                message: 'minLength'
              },
              required: 'asdasdhakj'
            }}
          />
          <FormInput
            className='text-red-200 placeholder:text-red-400'
            name='khang1'
            label='123'
            placeholder='enter title'
            rules={{
              required: 'klhang',
              minLength: {
                value: 4,
                message: 'minLength'
              }
            }}
          />
          <FormInput
            className='text-red-200 placeholder:text-red-400'
            name='khang2'
            label='123'
            placeholder='enter title'
            rules={{
              // required: 'klh2321312ang',
              // maxLength: {
              //   value: 10,
              //   message: 'maxLength'
              // },
              minLength: {
                value: 4,
                message: 'min lenght 4'
              }
            }}
          />
          <button onClick={() => methods.handleSubmit(onSubmit)}>hgjh</button>
        </form>
      </FormProvider> */}
      </div>
    </div>
  )
}

export default AboutUsPage
