'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { memo, useEffect, useState } from 'react'

import ImageFallback from '@/components/ImageFallback'
import { DefaultModal } from '@/components/modal'
import { useDisclosure } from '@nextui-org/react'

function SectionWithVuaTho() {
  const t = useTranslations('WithVuaTho')
  const td = useTranslations('Footer')

  const [videoType, setVideoType] = useState('')
  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  const handlePlayVideo = (value: string) => {
    onOpen()
    setVideoType(value)
  }

  const variantScale = {
    initial: {
      opacity: 0,
      scale: 0.8
    },
    whileInView: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        delay: 1.5
      }
    }
  }

  useEffect(() => {
    isOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto')

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <div className='ct-container-70 flex flex-col gap-[20px]'>
      <motion.div>
        <p className='text-[1.8rem] font-semibold uppercase tracking-[8px] md:text-[2rem]'>{td('about_us')}</p>
        <h2 className='text-[2.4rem] font-bold uppercase text-primary-blue lg:text-[3.6rem]'>
          {t('title')} {t('title1')}
        </h2>
        <p className='text-[1.8rem] font-light'>{t('text')}</p>
      </motion.div>
      <div className='grid gap-[20px] md:grid-cols-2 md:grid-rows-2'>
        <motion.div variants={variantScale} initial='initial' animate='whileInView' viewport={{ once: true }} className='mx-auto w-full overflow-hidden rounded-[20px] md:row-span-2'>
          <ImageFallback src={'/to-the-moon/to-the-moon-1.png'} alt='to-the-moon-1' height={750} priority width={610} className='pointer-events-none size-full select-none object-cover' />
        </motion.div>
        {/* <motion.div
          variants={variantScale}
          initial='initial'
          animate='whileInView'
          viewport={{ once: true }}
          onClick={() => {
            handlePlayVideo('HTV')
          }}
          className='relative col-span-1 mx-auto cursor-pointer overflow-hidden rounded-[20px] md:row-span-1'
        >
          <Button
            aria-label='play'
            onClick={() => {
              handlePlayVideo('HTV')
            }}
            isIconOnly
            className='absolute left-1/2 top-1/2 flex min-h-[48px] min-w-[48px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20'
          >
            <PlayIcon className='size-[24px]' />
          </Button>
          <ImageFallback src={'/to-the-moon/to-the-moon-2.jpeg'} alt='to-the-moon-2' height={350} width={610} className='pointer-events-none w-auto select-none'  priority />
        </motion.div> */}
        {/* <motion.div
          variants={variantScale}
          initial='initial'
          animate='whileInView'
          viewport={{ once: true }}
          onClick={() => {
            handlePlayVideo('VTV')
          }}
          className='relative col-span-1 mx-auto cursor-pointer overflow-hidden rounded-[20px] md:row-span-1'
        >
          <Button
            aria-label='play'
            onClick={() => {
              handlePlayVideo('VTV')
            }}
            isIconOnly
            className='absolute left-1/2 top-1/2 flex min-h-[48px] min-w-[48px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20'
          >
            <PlayIcon className='size-[24px]' />
          </Button>
          <ImageFallback src={'/vtv-thumb.jpg'} alt='to-the-moon-2' height={350} width={610} className='pointer-events-none w-auto select-none'   />
        </motion.div> */}
        <motion.div variants={variantScale} initial='initial' animate='whileInView' viewport={{ once: true }} className='size-full w-full overflow-hidden rounded-[20px] md:row-span-1'>
          <ImageFallback src={'/to-the-moon/to-the-moon-3.png'} alt='to-the-moon-3' height={400} width={610} className='pointer-events-none size-full select-none object-cover' priority />
        </motion.div>
        <motion.div variants={variantScale} initial='initial' animate='whileInView' viewport={{ once: true }} className='mx-auto size-full overflow-hidden rounded-[20px] md:row-span-1'>
          <ImageFallback src={'/to-the-moon/to-the-moon-2.png'} alt='to-the-moon-2' height={400} width={610} className='pointer-events-none size-full select-none object-cover' priority />
        </motion.div>
      </div>
      <DefaultModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hiddenCloseBtn
        aria-label='modal video'
        hiddenHeader
        size='5xl'
        modalBody={
          videoType === 'VTV' ? (
            <video src='/video/vtv.mp4' controls></video>
          ) : (
            <iframe
              className='min-h-[200px] w-full object-cover xs:min-h-[400px] lg:min-h-[500px] 2xl:min-h-[600px]'
              src='https://www.youtube.com/embed/0SPc8O_G26U?si=drHkpvysmnTswANk'
              title='YouTube video player'
            />
          )
        }
      />
    </div>
  )
}

export default memo(SectionWithVuaTho)
