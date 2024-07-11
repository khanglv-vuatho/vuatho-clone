'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Accordion, AccordionItem, Button, useDisclosure } from '@nextui-org/react'

import { AndroidBtn, IosBtn, QrCode } from '@/components/DownloadApps'
import ImageFallback from '@/components/ImageFallback'
import { DefaultModal } from '@/components/modal'
import { PlayIcon } from '@/components/Icons'

const SectionStep = () => {
  const t = useTranslations('BecomeWorker')
  const [contentNumber, setContentNumber] = useState<number>(0)

  const highlightRef = useRef(null)

  const listAccordion: { title: string; content: React.ReactNode }[] = [
    {
      title: t('text1'),
      content: <Step1 />
    },
    {
      title: t('text2'),
      content: <Step2 />
    },
    {
      title: t('text3'),
      content: <Step3 />
    },
    {
      title: t('text4'),
      content: <Step4 />
    },
    {
      title: t('text5'),
      content: <Step5 />
    },
    {
      title: t('text80'),
      content: <Step6 />
    }
  ]

  const [activeSelect, setActiveSelect] = useState<string>(listAccordion[0].title)

  const handleActiveSelect = useCallback((title: any, index: number) => {
    setActiveSelect(title)
    setContentNumber(index)
  }, [])

  const handleSelect = () => {
    const activeButton = document.querySelector(`button.menuActive`) as HTMLElement
    const highlight = highlightRef.current

    if (activeButton && highlight) {
      const { offsetTop: top, offsetHeight: height } = activeButton
      ;(highlight as HTMLElement).style.transform = `translateY(${top}px)`
      ;(highlight as HTMLElement).style.height = `${height}px`
    }
  }

  useEffect(() => {
    handleSelect()
  }, [activeSelect])

  useEffect(() => {
    const handleResize = () => {
      handleSelect()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [activeSelect])

  return (
    <div className='bg-white py-5 13inch:py-10 3xl:py-[80px]'>
      <div className='ct-container hidden justify-center gap-5 lg:grid lg:grid-cols-5'>
        <div className='relative col-span-2 min-w-[28%] lg:min-w-[31%] 2xl:min-w-[28%]'>
          <div className='absolute w-full border-l-4 border-[#FCB713] bg-gradient-to-r from-[#FCB71333] to-[#FCB71300] transition' ref={highlightRef} />
          <div className='flex flex-col gap-2'>
            {listAccordion.map((i, index) => (
              <button
                onClick={() => handleActiveSelect(i.title, index)}
                className={`flex w-full items-center justify-start border-l-4 border-transparent px-8 py-4 text-lg ${
                  activeSelect === i.title ? 'menuActive text-black' : 'hover:border-[#FCB713]/5 hover:bg-gradient-to-r hover:from-[#FCB71333]/5 hover:to-[#FCB71300]/5'
                }`}
                key={i.title}
              >
                <span className='relative z-[1] text-start'>{i.title}</span>
              </button>
            ))}
          </div>
        </div>
        <div className='col-span-3 w-full'>{listAccordion[contentNumber].content}</div>
      </div>
      <div className='ct-container block lg:hidden'>
        <div className='w-full'>
          <Accordion
            className='gap-5'
            itemClasses={{
              base: 'group-[.is-splitted]:shadow-[0px_0px_12px_2px_rgba(0,0,0,0.20)]'
            }}
          >
            {listAccordion.map((i, index) => (
              <AccordionItem
                key={i.title}
                aria-label={i.title}
                title={
                  <p
                    className='text-lg'
                    onClick={() =>
                      window.scrollTo({
                        top: 30 * (index + 1)
                      })
                    }
                  >
                    {i.title}
                  </p>
                }
                classNames={{
                  content: 'flex flex-col gap-2',
                  title: 'text-lg',
                  indicator: 'text-lg',
                  base: 'group-[.is-splitted]:pl-4',
                  trigger: 'data-[focus-visible=true]:!outline-none'
                }}
              >
                {i.content}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}

const Step1: React.FC = memo(() => {
  const t = useTranslations('BecomeWorker')

  const DocRequirements = [t('text6'), t('text7'), t('text8'), t('text9'), t('text10')]
  const DocType = [t('text11'), t('text12'), t('text12-1')]

  const imageDemoPaper: { desc: string; thumbs: string[] }[] = [
    {
      desc: t('text70'),
      thumbs: ['cmnd1.webp', 'cmnd2.webp']
    },
    {
      desc: t('text72'),
      thumbs: ['mat-truoc-bang-lai.webp', 'mat-sau-bang-lai.jpeg']
    },
    {
      desc: t('text12'),
      thumbs: ['ho-chieu.jpeg']
    }
  ]

  return (
    <div className='*: *:text-lg'>
      <h3 className='text-xl !font-bold text-[#0B27B6] lg:text-2xl'>{t('text55')}</h3>
      <h4 className='mt-4 !font-medium'>{t('text13')}</h4>
      <ul className='mt-4 list-inside list-disc'>
        {DocRequirements.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h4 className='mt-4 !font-medium'>{t('text14')}</h4>
      <ul className='mt-4 list-inside list-disc'>
        {DocType.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {imageDemoPaper.map((item: any, index: number) => (
        <div key={index} className='flex flex-col gap-1 xs:items-center'>
          <div className='mt-5 flex flex-col justify-start gap-4 lg:flex-row lg:items-center '>
            {item.thumbs.map((thumb: any, index: number) => (
              <ImageFallback key={`${thumb}-${index}`} src={`/images/${thumb}`} alt={thumb} width={335} height={153} className='max-h-[500px] max-w-[200px]' />
            ))}
          </div>
          <p className='text-sm  text-gray-400 lg:text-center'>{item.desc}</p>
        </div>
      ))}
    </div>
  )
})

const Step2: React.FC = memo(() => {
  const t = useTranslations('BecomeWorker')

  return (
    <>
      <h3 className='mb-4 text-xl font-bold text-[#0B27B6] lg:text-2xl '>{t('text15')}</h3>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-center'>
        <div className='flex flex-col gap-4'>
          <AndroidBtn />
          <IosBtn />
        </div>
        <span className='text-lg text-black/50'>{t('text56')}</span>
        <div>
          <QrCode />
        </div>
      </div>
    </>
  )
})

const Step3: React.FC = memo(() => {
  const t = useTranslations('BecomeWorker')
  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  const handlePlayVideo = () => {
    onOpen()
  }

  const listItem = [
    {
      step: t('text20'),
      thumb: 'phone1',
      content: (
        <div className='*:text-lg'>
          <p>{t('text57')}</p>
          <p className='mt-8'>{t('text21')}</p>
          <ul className='list-inside list-disc'>
            <li>{t('text59')}</li>
            <li>{t('text25')}</li>
          </ul>
        </div>
      )
    },
    {
      step: t('text31'),
      thumb: 'phone2',
      content: (
        <ul className='list-inside list-disc *:text-lg'>
          <li>{t('text32')}</li>
          <li>{t('text33')}</li>
        </ul>
      )
    },
    {
      step: t('text34'),
      thumb: 'phone3',
      content: (
        <ul className='list-inside list-disc *:text-lg'>
          <li>{t('text35')}</li>
          <li>{t('text36')}</li>
        </ul>
      )
    }
  ]

  return (
    <>
      <h3 className='text-xl font-bold text-[#0B27B6] lg:text-2xl'>{t('text19')}</h3>
      <div className='mt-4 flex flex-col gap-8'>
        {listItem.map((item) => (
          <Step3Item key={item.thumb} item={item} />
        ))}
        <div onClick={handlePlayVideo} className='relative col-span-1 text-center lg:row-span-1'>
          <Button
            aria-label='play'
            onClick={handlePlayVideo}
            isIconOnly
            className='absolute left-1/2 top-1/2 flex min-h-[64px] min-w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40'
          >
            <PlayIcon className='size-6' />
          </Button>
          <ImageFallback
            src={'/become-employee/step3/huong-dan-dang-ky.png'}
            alt='huong-dan-dang-ky'
            height={350}
            width={1000}
            className='pointer-events-none mb-[10px] w-full cursor-pointer select-none overflow-hidden rounded-xl'
          />
          <i>{t('text79')}</i>
        </div>
        <DefaultModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          hiddenCloseBtn
          aria-label='modal video'
          hiddenHeader
          size='5xl'
          modalBody={
            <iframe className='min-h-[200px] w-full object-cover xs:min-h-[400px] lg:min-h-[500px] 2xl:min-h-[600px]' src='https://www.youtube.com/embed/Q2sh1pOaUuk' title='YouTube video player' />
          }
        />
      </div>
    </>
  )
})

const Step3Item = ({ item }: { item: any }) => {
  const locale = useLocale()
  const localeImage = locale === 'vi' || locale === 'en' ? locale : 'en'

  return (
    <div className='*: flex flex-col gap-4'>
      <h4 className='text-xl !font-bold'>{item.step}</h4>
      <div className='flex flex-col gap-5 lg:flex-row'>
        <Image src={`/become-employee/step3/${item.thumb}-${localeImage}.webp`} alt='step-3-1-image' width={335} height={153} className='max-h-[500px] max-w-[200px]' />
        {item.content}
      </div>
    </div>
  )
}

const Step4: React.FC = memo(() => {
  const t = useTranslations('BecomeWorker')
  const locale = useLocale()

  const localeImage = locale === 'vi' || locale === 'en' ? locale : 'en'
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-xl font-bold text-[#0B27B6] lg:text-2xl'>{t('text41')}</h3>
      <div className='*: flex flex-col gap-8 *:text-lg'>
        <p>{t('text42')}</p>
        <p>{t('text65')}</p>
        <p>{t('text66')}</p>
        <p>{t('text67')}</p>
        <div>
          <p>1. {t('text68')}</p>
          <p>2. {t('text69')}</p>
          <ul className='list-inside list-disc'>
            <li>{t('text70')}</li>
            <li>{t('text72')}</li>
            <li>{t('text12')}</li>
          </ul>
        </div>

        <div className='flex w-full gap-4'>
          <ImageFallback src={`/become-employee/step4/phone1-${localeImage}.png`} alt='phone1' width={335} height={153} className='max-h-[500px] max-w-[200px]' />
          <ImageFallback src={`/become-employee/step4/phone2-${localeImage}.png`} alt='phone2' width={335} height={153} className='max-h-[500px] max-w-[200px]' />
        </div>
        <p>{t('text73')}</p>
      </div>
    </div>
  )
})

const Step5: React.FC = memo(() => {
  const t = useTranslations('BecomeWorker')
  const locale = useLocale()

  const localeImage = locale === 'vi' || locale === 'en' ? locale : 'en'
  return (
    <div className='*:'>
      <h3 className='text-xl !font-bold text-[#0B27B6] lg:text-2xl'>{t('text50')}</h3>
      <p className='mt-8 text-lg'>{t('text51')}</p>
      <div className='mt-8 flex w-full flex-col items-center rounded-xl'>
        <p className='text-lg lg:text-left'>{t('text74')} </p>
        <ul className='list-inside list-disc *:text-lg'>
          <li>{t('text75')}</li>
          <li>{t('text76')}</li>
        </ul>
        <div className='mt-10 flex w-full gap-4'>
          <ImageFallback src={`/become-employee/step5/phone1-${localeImage}.webp`} alt='phone1' width={335} height={153} className='max-h-[500px] max-w-[200px]' />
          <ImageFallback src={`/become-employee/step5/phone2-${localeImage}.webp`} alt='phone2' width={335} height={153} className='max-h-[500px] max-w-[200px]' />
        </div>
      </div>
    </div>
  )
})

const Step6: React.FC = memo(() => {
  const t = useTranslations('BecomeWorker')

  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  const handlePlayVideo = () => {
    onOpen()
  }

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-xl !font-bold text-[#0B27B6] lg:text-2xl'>{t('text77')}</h3>
      <div onClick={handlePlayVideo} className='relative col-span-1  text-center lg:row-span-1'>
        <Button
          aria-label='play'
          onClick={handlePlayVideo}
          isIconOnly
          className='absolute left-1/2 top-1/2 flex min-h-[64px] min-w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40'
        >
          <PlayIcon className='size-6' />
        </Button>
        <ImageFallback
          src={'/become-employee/step6/huong-dan-kiem-tra-nghiep-vu.png'}
          alt='huong-dan-kiem-tra-nghiep-vu'
          height={350}
          width={1000}
          className='pointer-events-none mb-[10px] w-full cursor-pointer select-none overflow-hidden rounded-xl'
        />
        <i className=' '>{t('text78')}</i>
      </div>
      <DefaultModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hiddenCloseBtn
        aria-label='modal video'
        hiddenHeader
        size='5xl'
        modalBody={
          <iframe className='min-h-[200px] w-full object-cover xs:min-h-[400px] lg:min-h-[500px] 2xl:min-h-[600px]' src='https://www.youtube.com/embed/yUzIennkrM8' title='YouTube video player' />
        }
      />
    </div>
  )
})

export default memo(SectionStep)
