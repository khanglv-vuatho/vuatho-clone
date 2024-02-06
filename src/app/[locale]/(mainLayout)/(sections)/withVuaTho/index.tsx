'use client'

import { useTranslations } from 'next-intl'
import { memo } from 'react'
import { motion } from 'framer-motion'
import { Add } from 'iconsax-react'

import ImageFallback from '@/components/ImageFallback'
import { Button, useDisclosure } from '@nextui-org/react'
import { PlayIcon } from '@/components/Icons'
import { DefaultModal } from '@/components/modal'

function SectionWithVuaTho() {
  const t = useTranslations('WithVuaTho')
  const td = useTranslations('Footer')

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

  const handlePlayVideo = () => {
    onOpen()
  }
  return (
    <div className='ct-container-70 flex flex-col gap-[20px]'>
      <div>
        <p className='text-[2rem] font-semibold uppercase tracking-[8px]'>{td('about_us')}</p>
        <h2 className='text-[2.4rem] font-bold uppercase text-primary-blue lg:text-[3.6rem]'>
          {t('title')} {t('title1')}
        </h2>
        <p className='text-[1.8rem] font-light'>{t('text')}</p>
      </div>
      <motion.div
        viewport={{ once: true }}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 1.5 }}
        className='grid gap-[20px] md:grid-cols-2 md:grid-rows-2'
      >
        <div className='col-span-1 mx-auto overflow-hidden rounded-[20px] md:row-span-2'>
          <ImageFallback src={'/to-the-moon/to-the-moon-1.png'} alt='to-the-moon-1' height={750} width={610} className='pointer-events-none w-auto select-none' priority />
        </div>
        <div onClick={handlePlayVideo} className='relative col-span-1 mx-auto cursor-pointer overflow-hidden rounded-[20px] md:row-span-1'>
          <Button
            aria-label='play'
            onClick={handlePlayVideo}
            isIconOnly
            className='absolute left-1/2 top-1/2 flex min-h-[48px] min-w-[48px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20'
          >
            <PlayIcon className='size-[24px]' />
          </Button>
          <ImageFallback src={'/to-the-moon/to-the-moon-2.png'} alt='to-the-moon-2' height={350} width={610} className='pointer-events-none w-auto select-none' priority />
        </div>
        <div className='col-span-1 mx-auto overflow-hidden rounded-[20px] md:row-span-1'>
          <ImageFallback src={'/to-the-moon/to-the-moon-3.png'} alt='to-the-moon-3' height={350} width={610} className='pointer-events-none w-auto select-none' priority />
        </div>
      </motion.div>
      <DefaultModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hiddenCloseBtn
        aria-label='modal video'
        hiddenHeader
        size='5xl'
        modalBody={
          <video controls autoPlay className='max-h-[500px] min-h-[320px] w-full object-cover'>
            <source src='/video/with-us.mp4' type='video/mp4' />
          </video>
        }
      />
    </div>
  )
}

export default memo(SectionWithVuaTho)
