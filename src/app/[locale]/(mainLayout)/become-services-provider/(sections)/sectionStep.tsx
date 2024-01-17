'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'

import { AndroidBtn, IosBtn, QrCode } from '@/components/DownloadApps'
import ImageFallback from '@/components/ImageFallback'

const SectionStep = () => {
  const t = useTranslations('BecomeWorker')
  const [contentNumber, setContentNumber] = useState<number>(0)

  const highlightRef = useRef(null)

  const listAccordion: any = [
    {
      title: t('text1'),
      content: <Step1 />,
    },
    {
      title: t('text2'),
      content: <Step2 />,
    },
    {
      title: t('text3'),
      content: <Step3 />,
    },
    {
      title: t('text4'),
      content: <Step4 />,
    },
    {
      title: t('text5'),
      content: <Step5 />,
    },
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
    <div className='bg-white py-[20px] 13inch:py-[40px] 3xl:py-[80px]'>
      <div className='ct-container-70 hidden justify-center gap-[20px] md:grid md:grid-cols-5'>
        <div className='relative col-span-2 min-w-[28%] lg:min-w-[31%] 2xl:min-w-[28%]'>
          <div className='absolute w-full border-l-[4px] border-[#FCB713] bg-gradient-to-r from-[#FCB71333] to-[#FCB71300] transition' ref={highlightRef} />
          <div className='flex flex-col'>
            {listAccordion.map((i: any, index: number) => (
              <button
                onClick={() => handleActiveSelect(i.title, index)}
                className={`flex w-full items-center justify-start border-l-[4px] border-transparent px-10 py-6 text-[1.8rem] ${
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
      <div className='ct-container-70 block md:hidden'>
        <div className='w-full'>
          <Accordion
            className='gap-5'
            itemClasses={{
              base: 'group-[.is-splitted]:shadow-[0px_0px_12px_2px_rgba(0,0,0,0.20)]',
            }}
          >
            {listAccordion.map((i: any, index: any) => (
              <AccordionItem
                key={i.title}
                aria-label={i.title}
                title={
                  <p
                    className='text-[1.8rem]'
                    onClick={() =>
                      window.scrollTo({
                        top: 30 * (index + 1),
                      })
                    }
                  >
                    {i.title}
                  </p>
                }
                classNames={{
                  content: 'flex flex-col gap-2',
                  title: 'text-[1.8rem]',
                  indicator: 'text-[1.8rem]',
                  base: 'group-[.is-splitted]:pl-12',
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

  return (
    <div className='*:text-[1.8rem] *:font-light'>
      <h3 className='text-[2rem] !font-bold text-[#0B27B6] md:text-[2.4rem]'>{t('text55')}</h3>
      <h4 className='mt-[16px] !font-medium'>{t('text13')}</h4>
      <ul className='mt-4 list-inside list-disc'>
        {DocRequirements.map((item) => (
          <li key={item} className=''>
            {item}
          </li>
        ))}
      </ul>
      <h4 className='mt-[16px] !font-medium'>{t('text14')}</h4>
      <ul className='mt-4 list-inside list-disc'>
        {DocType.map((item) => (
          <li key={item} className=''>
            {item}
          </li>
        ))}
      </ul>
      <div className='mt-6 flex flex-col justify-start gap-4 lg:flex-row lg:items-center '>
        <Image src={'/images/cmnd1.png'} alt='' width={324} height={191} className='pointer-events-none max-w-[240px]' />
        <Image src={'/images/cmnd2.png'} alt='' width={324} height={191} className='pointer-events-none max-w-[240px]' />
      </div>
    </div>
  )
})

const Step2: React.FC = memo(() => {
  const t = useTranslations('BecomeWorker')

  return (
    <>
      <h3 className='mb-[16px] text-[2rem] font-bold text-[#0B27B6] md:text-[2.4rem] '>{t('text15')}</h3>
      <div className='flex flex-col gap-[16px] lg:flex-row lg:items-center'>
        <div className='grid grid-cols-1 gap-[16px] xl:grid-cols-2'>
          <AndroidBtn />
          <IosBtn />
        </div>
        <span className='text-[1.8rem] text-black/50'>{t('text56')}</span>
        <div>
          <QrCode />
        </div>
      </div>
    </>
  )
})

const Step3: React.FC = memo(() => {
  const t = useTranslations('BecomeWorker')

  const listItem = [
    {
      step: t('text20'),
      thumb: 'phone1',
      content: (
        <div className='*:text-[1.8rem]'>
          <p>{t('text57')}</p>
          <p className='mt-[32px]'>{t('text21')}</p>
          <ul className='list-inside list-disc'>
            <li>{t('text59')}</li>
            <li>{t('text25')}</li>
          </ul>
        </div>
      ),
    },
    {
      step: t('text31'),
      thumb: 'phone2',
      content: (
        <ul className='list-inside list-disc *:text-[1.8rem]'>
          <li>{t('text32')}</li>
          <li>{t('text33')}</li>
        </ul>
      ),
    },
    {
      step: t('text34'),
      thumb: 'phone3',
      content: (
        <ul className='list-inside list-disc *:text-[1.8rem]'>
          <li>{t('text35')}</li>
          <li>{t('text36')}</li>
        </ul>
      ),
    },
  ]

  return (
    <>
      <h3 className='text-[2rem] font-bold text-[#0B27B6] md:text-[2.4rem]'>{t('text19')}</h3>
      <div className='mt-[16px] flex flex-col gap-[32px]'>
        {listItem.map((item) => (
          <Step3Item key={item.thumb} item={item} />
        ))}
      </div>
    </>
  )
})

const Step3Item = ({ item }: { item: any }) => {
  const locale = useLocale()
  const localeImage = locale === 'vi' || locale === 'en' ? locale : 'en'

  return (
    <div className='flex flex-col gap-[16px] *:font-light'>
      <h4 className='text-[2rem] !font-bold'>{item.step}</h4>
      <div className='flex gap-[20px]'>
        <Image src={`/become-employee/step3/${item.thumb}-${localeImage}.png`} alt='step-3-1-image' width={335} height={153} className='max-h-[500px] max-w-[200px]' />
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
    <div className='flex flex-col gap-[16px]'>
      <h3 className='text-[2rem] font-bold text-[#0B27B6] md:text-[2.4rem]'>{t('text41')}</h3>
      <div className='flex flex-col gap-[32px] *:text-[1.8rem] *:font-light'>
        <p>{t('text42')}</p>
        <p>{t('text65')}</p>
        <p>{t('text66')}</p>
        <p>{t('text67')}</p>
        <div>
          <p>1. {t('text68')}</p>
          <p>2. {t('text69')}</p>
          <ul className='list-inside list-disc'>
            <li>{t('text70')}</li>
            <li>{t('text71')}</li>
            <li>{t('text72')}</li>
            <li>{t('text12')}</li>
          </ul>
        </div>
        <div className='flex w-full gap-[16px]'>
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
    <div className='*:font-light'>
      <h3 className='text-[2rem] font-bold text-[#0B27B6] md:text-[2.4rem]'>{t('text50')}</h3>
      <p className='mt-8 text-[1.8rem]'>{t('text51')}</p>
      <div className='mt-8 flex w-full flex-col items-center rounded-xl'>
        <p className='text-[1.8rem] md:text-left'>{t('text74')} </p>
        <ul className='list-inside list-disc *:text-[1.8rem]'>
          <li>{t('text75')}</li>
          <li>{t('text76')}</li>
        </ul>
        <div className='mt-[40px] flex w-full gap-[16px]'>
          <ImageFallback src={`/become-employee/step5/phone1-${localeImage}.png`} alt='phone1' width={335} height={153} className='max-h-[500px] max-w-[200px]' />
          <ImageFallback src={`/become-employee/step5/phone2-${localeImage}.png`} alt='phone2' width={335} height={153} className='max-h-[500px] max-w-[200px]' />
        </div>
      </div>
    </div>
  )
})

export default memo(SectionStep)
