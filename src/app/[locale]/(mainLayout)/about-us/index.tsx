'use client'

import { Button } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import ImageFallback from '@/components/ImageFallback'
import ImageScrollZoom from '@/components/ImageScrollZoom'
import Letter from '@/components/Letter'
import LogoAnimate from '@/components/LogoAnimate'
import { useSmallScreen } from '@/hook'
import { useCallback } from 'react'

import './about-us.css'

function AboutUsPage() {
  const t = useTranslations('AboutUs')

  const DURATION_CHAR = 0.02
  const _HandleOpenWindow = useCallback(() => {
    window.open('https://vuatho.com/vi/qrcode-download-app', '_blank')
  }, [])

  const isSmallScreen = useSmallScreen()

  const lineVariant = {
    initial: {
      x: '-100%'
    },
    animate: (number: number) => ({
      x: 0,
      transition: {
        duration: 0.5,
        delay: number,
        ease: 'linear'
      }
    })
  }

  return (
    <div className='mb-[100px] flex flex-col gap-[40px] pt-[60px] md:pt-[80px] 2xl:gap-[100px]'>
      <div className='mb-[40px] grid grid-cols-6 px-[16px] pt-[40px] md:px-[40px]'>
        <div className='relative col-span-6 md:col-span-5'>
          <div className='absolute bottom-0 left-[3%] z-10 text-[1.8rem] text-white md:bottom-auto md:left-[15%] md:top-1/2 md:-translate-y-1/2 md:text-[3.2rem] 2xl:left-[8%]'>
            <div className='flex items-center font-bold uppercase'>
              {t('text5')
                ?.split('')
                ?.map((item, index) => <Letter durationChar={DURATION_CHAR} duration={0.2} key={index} index={index} character={item} />)}
            </div>
            <div className='flex items-center justify-end gap-[12px] whitespace-nowrap tracking-[2px]'>
              <div className='font-bold uppercase text-primary-yellow'>
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
                  ?.map((item, index) => <Letter initDelay={t('text5')?.split('')?.length * DURATION_CHAR} durationChar={DURATION_CHAR} duration={0.2} key={index} index={index} character={item} />)}
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
            <ImageFallback src={'/contact-us/hero.jpeg'} alt='' width={2000} height={2000} className='size-full object-cover' />
          </div>
        </div>
        <div className='relative z-[-1] hidden justify-center md:block'>
          <strong className='absolute bottom-[20%] right-[-80px] -rotate-90 whitespace-nowrap text-[4rem] uppercase text-primary-blue xs:right-[-60px] md:left-0 md:text-[10rem] lg:left-[-100px]'>
            {t('text4')}
          </strong>
        </div>
      </div>
      <ImageScrollZoom thumb='/to-the-moon/to-the-moon-3-1.jpeg' />
      {/* <StairGird cols={3} />
      <div className='translate-y-[-20px]'>
        <StairGird cols={3} />
      </div> */}
      <div className='w-full overflow-hidden  md:pb-[100px] '>
        <div className='ct-container-70 flex flex-col md:mt-[40px] lg:flex-row'>
          <div className='flex flex-col justify-center gap-[4px] md:w-[80%] md:py-[40px]'>
            <h3 className='text-[1.8rem] font-semibold uppercase tracking-[4px] md:text-[2rem]'>
              {t('heading1')} <br />
              {t('heading2')}
            </h3>
            <p className='bg-gradient-to-r from-[#ff7c54] via-[#ffcc3f] to-[#ff783a] bg-clip-text text-left text-[2.4rem] font-bold uppercase text-[#f5b500] text-transparent md:text-[3.2rem]'>
              {t('heading')}
            </p>
            <div className='w-full'>
              <div className='text-[1.8rem] font-bold'>
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
              <ImageFallback src={'/contact-us/hero-1.jpeg'} alt='hero-1' height={600} width={800} className='size-full rounded-[16px] object-cover lg:rounded-none' />
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
              className='bottom-[-20%] left-[5%] w-full bg-white lg:absolute lg:w-[40%] lg:p-[10px]'
            >
              <ImageFallback src={'/to-the-moon/to-the-moon-2.png'} alt='to-the-moon-2' height={600} width={600} className='w-full rounded-[16px] lg:w-auto lg:rounded-none' />
            </motion.div>
          </div>
        </div>
      </div>
      <div className='ct-container-70 '>
        <div className='flex items-center justify-center gap-[16px]'>
          <div className='relative h-[4px] w-[100px] overflow-hidden rounded-[4px] md:w-[300px]'>
            <motion.div variants={lineVariant} initial='initial' viewport={{ once: true }} whileInView='animate' className='absolute inset-0 bg-primary-yellow' />
          </div>
          <div className='flex-shrink-0 rounded-full'>
            <LogoAnimate height={70} width={100} delay={0.8} />
          </div>
          <div className='relative h-[4px] w-[100px] overflow-hidden rounded-[4px] md:w-[300px]'>
            <motion.div variants={lineVariant} custom={isSmallScreen ? 0 : 2.5} initial='initial' whileInView='animate' viewport={{ once: true }} className='absolute inset-0 bg-primary-yellow' />
          </div>
        </div>
      </div>
      <div className='relative md:mt-[100px]'>
        <div className='ct-container-70 grid items-center rounded-[20px] lg:grid-cols-3 lg:bg-[#eff1f3]/20'>
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
            <ImageFallback src={'/to-the-moon/to-the-moon-1.png'} alt='to-the-moon-1' height={750} width={610} className='pointer-events-none select-none object-cover' priority />
          </motion.div>
          <div className='col-span-2 flex flex-col gap-[20px] lg:pl-[20%] lg:pr-[20px]'>
            <p className='text-[2.4rem] font-bold uppercase text-primary-blue md:text-[3.6rem]'>{t('text1')}</p>
            <ImageFallback
              src={'/to-the-moon/to-the-moon-1.png'}
              alt='to-the-moon-1'
              height={750}
              width={610}
              className='pointer-events-none mx-auto select-none rounded-[16px] object-cover shadow-[0px_8px_16px_0px_#A2BAF366] lg:hidden'
              priority
            />

            <div className='text-[1.8rem] font-bold'>
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
                onPress={_HandleOpenWindow}
                disableRipple
                variant='bordered'
                className='w-full cursor-pointer border-primary-blue px-[40px] py-[24px] text-[1.8rem] text-primary-blue hover:bg-primary-blue hover:text-white lg:w-auto'
                radius='md'
              >
                {t('text3')}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      <div className='grid gap-[10px] px-[40px] *:*:overflow-hidden *:overflow-hidden *:*:rounded-[10px] *:rounded-[10px] xl:max-h-[90vh] xl:grid-cols-4 xl:grid-rows-3'>
        <div className='grid gap-[10px] xl:row-span-3 xl:grid-rows-3'>
          <div className='overflow-hidden rounded-[10px] xl:row-span-2'>
            <ImageFallback src={'/about-us/3.jpeg'} alt='about-us/3.jpeg' className='size-full object-cover' height={400} width={800} />
          </div>
          <div className='overflow-hidden rounded-[10px]'>
            <ImageFallback src={'/about-us/4.png'} alt='about-us/4.png' className='size-full object-cover' height={400} width={800} />
          </div>
        </div>
        <div className='grid gap-[10px] xl:col-span-3 xl:row-span-3 xl:grid-cols-3 xl:grid-rows-3'>
          <div className='grid gap-[10px] xl:col-span-3 xl:grid-cols-3'>
            <div className='overflow-hidden rounded-[10px] xl:col-span-2'>
              <ImageFallback src={'/about-us/9.jpeg'} alt='about-us/9.jpeg' className='size-full object-cover' height={400} width={800} />
            </div>
            <div className='overflow-hidden rounded-[10px]'>
              <ImageFallback src={'/about-us/8.jpeg'} alt='about-us/8.jpeg' className='size-full object-cover' height={400} width={800} />
            </div>
          </div>
          <div className='grid gap-[10px] xl:col-span-3 xl:row-span-2 xl:grid-cols-3 xl:grid-rows-2'>
            <div className='overflow-hidden rounded-[10px] xl:row-span-2'>
              <ImageFallback src={'/about-us/1.jpeg'} alt='about-us/1.jpeg' className='size-full object-cover' height={400} width={800} />
            </div>
            <div className='grid gap-[10px] xl:col-span-2 xl:row-span-2 xl:grid-rows-2'>
              <div className='overflow-hidden rounded-[10px]'>
                <ImageFallback src={'/about-us/5.jpeg'} alt='about-us/5.jpeg' className='size-full object-cover' height={400} width={800} />
              </div>
              <div className='overflow-hidden rounded-[10px]'>
                <ImageFallback src={'/about-us/7.jpeg'} alt='about-us/7.jpeg' className='size-full object-cover' height={400} width={800} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
