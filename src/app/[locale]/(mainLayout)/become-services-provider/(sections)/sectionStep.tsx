'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

import { AndroidBtn, IosBtn, QrCode } from '@/components/DownloadApps'
import { Accordion, AccordionItem } from '@nextui-org/react'

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

  const handleActiveSelect = (title: any, index: number) => {
    setActiveSelect(title)
    setContentNumber(index)
  }

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
      <div className='ct-container-70 hidden w-full gap-10 md:flex lg:gap-20'>
        <div className='relative min-w-[28%] lg:min-w-[31%] 2xl:min-w-[28%] '>
          <div
            className='absolute w-full rounded-[60px] bg-gradient-to-r from-[#FFB500] to-[#FED32C] transition'
            ref={highlightRef}
          />
          <div className='flex flex-col gap-2'>
            {listAccordion.map((i: any, index: number) => (
              <button
                onClick={() => handleActiveSelect(i.title, index)}
                className={`flex w-full items-center justify-start rounded-[60px] px-10 py-6 text-[1.8rem] ${
                  activeSelect === i.title
                    ? 'menuActive text-black'
                    : 'bg-transparent hover:bg-gradient-to-r hover:from-[#FFB500]/5 hover:to-[#FED32C]/5'
                }`}
                key={i.title}
              >
                <span className='relative z-[1] text-start'>{i.title}</span>
              </button>
            ))}
          </div>
        </div>
        <div className='w-full border-l-1 border-[#E1E1E1] pl-10 lg:pl-20'>
          {listAccordion[contentNumber].content}
        </div>
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

const Step1: React.FC = () => {
  const t = useTranslations('BecomeWorker')

  const DocRequirements = [t('text6'), t('text7'), t('text8'), t('text9'), t('text10')]
  const DocType = [t('text11'), t('text12')]

  return (
    <>
      <h3 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text13')}</h3>
      <ul className='mt-4 list-inside list-disc'>
        {DocRequirements.map((item) => (
          <li key={item} className='text-[1.8rem] text-[#555]'>
            {item}
          </li>
        ))}
      </ul>
      <h4 className='mt-14 text-[1.8rem] font-medium'>{t('text14')}</h4>
      <ul className='mt-4 list-inside list-disc'>
        {DocType.map((item) => (
          <li key={item} className='text-[1.8rem] text-[#555]'>
            {item}
          </li>
        ))}
      </ul>
      <div className='mt-6 flex flex-col items-center gap-6 13inch:flex-row'>
        <Image
          src={'/images/cmnd1.png'}
          alt=''
          width={324}
          height={191}
          className='pointer-events-none'
        />
        <Image
          src={'/images/cmnd2.png'}
          alt=''
          width={324}
          height={191}
          className='pointer-events-none'
        />
      </div>
    </>
  )
}

const Step2: React.FC = () => {
  const t = useTranslations('BecomeWorker')

  return (
    <>
      <h3 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text15')}</h3>
      <div className='flex flex-col items-start gap-10 md:gap-20 lg:flex-row lg:gap-40'>
        <div className='flex items-center gap-10'>
          <div className='mt-8 space-y-10'>
            <div>
              <h4 className='mb-2 text-[1.8rem]'> {t('text16')}</h4>
              <AndroidBtn />
            </div>
            <div>
              <h4 className='mb-2 text-[1.8rem]'> {t('text17')}</h4>
              <IosBtn />
            </div>
          </div>
          <span className='text-[1.8rem] text-black/50'> {t('text18')}</span>
          <QrCode />
        </div>
      </div>
    </>
  )
}

const Step3: React.FC = () => {
  const t = useTranslations('BecomeWorker')

  return (
    <>
      <h3 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text19')}</h3>
      <h4 className='mt-8 text-[1.8rem] font-bold'> {t('text20')}</h4>
      <p className='mt-5 text-[1.8rem]'>{t('text21')}</p>
      <div className='mt-3 flex flex-col gap-10 xl:flex-row'>
        <div className=' mt-5 w-full space-y-5'>
          <div className='flex justify-end'>
            <div className='relative ml-20 flex w-full flex-col justify-center rounded-2xl bg-primary-yellow/10 p-8 pb-[50px] 3xl:ml-28'>
              <p className='w-[60%] text-[1.8rem]'>
                <span className='font-bold'> {t('text22')}</span>
                <br />
                {t('text23')}
                <br />
                {t('text24')}
              </p>
              <Image
                alt='select customer'
                src='/become-employee/step3/khach.png'
                width={519}
                height={615}
                className='pointer-events-none absolute right-0 top-0 z-[1] h-[200px] w-auto object-contain md:-right-3'
              />
            </div>
          </div>
          <div className='flex justify-start'>
            <div className='relative mr-20 flex w-full flex-col justify-center rounded-2xl bg-primary-blue/10 p-8  3xl:mr-28'>
              <div className='flex justify-end'>
                <p className='w-[60%] text-right text-[1.8rem]'>
                  <span className='font-bold'>{t('text26')}</span>
                  <br /> {t('text25')}
                </p>
              </div>
              <Image
                alt='select customer'
                src='/become-employee/step3/tho.png'
                width={519}
                height={615}
                className='pointer-events-none absolute bottom-0 left-0 h-[200px] w-auto object-contain md:-left-3 '
              />
            </div>
          </div>
          <p className='pt-5 text-center text-[1.5rem] text-black/30'>{t('text27')}</p>
        </div>
        <div className='w-full xl:w-1/3'>
          <Image
            alt='login screen'
            src='/become-employee/step3/login.png'
            width={432}
            height={599}
            quality={100}
            className='w-auto'
          />
          <p className='text-[1.8rem]'>
            {t('text28')}
            <span className='font-bold'>{t('text29')}</span> {t('text30')}
          </p>
        </div>
      </div>
      <h4 className='mt-8 text-[1.8rem] font-bold'>{t('text31')}</h4>
      <p className='text-[1.8rem]'>{t('text32')}</p>
      <p className='text-[1.8rem]'>{t('text33')}</p>
      <div className='mt-6 flex flex-col gap-6'>
        <Image
          src={'/become-woker/step2-1.webp'}
          alt=''
          width={200}
          height={400}
          className='pointer-events-none'
        />
        <Image
          src={'/become-woker/step2-2.webp'}
          alt=''
          width={405}
          height={407}
          className='pointer-events-none'
        />
        <Image
          src={'/become-woker/step2-3.webp'}
          alt=''
          width={378}
          height={407}
          className='pointer-events-none'
        />
      </div>
      <h4 className='mt-8 text-[1.8rem] font-bold'>{t('text34')}</h4>
      <p className='text-[1.8rem]'>{t('text35')}</p>
      <p className='text-[1.8rem]'>{t('text36')}</p>
      <Image
        src={'/become-woker/step3-1.webp'}
        alt=''
        width={200}
        height={400}
        className='my-8'
      />
      <strong className='text-[1.8rem]'>{t('text37')}</strong>
      <p className='text-[1.8rem]'>{t('text38')}</p>
      <p className='mb-8 text-[1.8rem]'>{t('text39')}</p>
      <div className='flex flex-col gap-8'>
        <Image
          src={'/become-woker/step3-2.webp'}
          alt=''
          width={430}
          height={400}
          className='pointer-events-none'
        />
        <Image
          src={'/become-woker/step3-3.webp'}
          alt=''
          width={410}
          height={400}
          className='pointer-events-none'
        />
      </div>
      <p className='my-8'>
        <strong className='text-[1.8rem]'>{t('text40')}</strong>
      </p>
      <Image
        src={'/become-woker/step3-4.webp'}
        alt=''
        width={410}
        height={400}
        className='pointer-events-none'
      />
    </>
  )
}

const Step4: React.FC = () => {
  const t = useTranslations('BecomeWorker')

  return (
    <>
      <h3 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text41')}</h3>
      <p className='mt-8 text-[1.8rem]'>{t('text42')}</p>
      <p className='mt-5 text-[1.8rem]'>{t('text43')}</p>
      <div className='mt-5 flex justify-center'>
        <div className='relative w-fit rounded-xl border-2 border-base-gray p-4'>
          <p className='absolute -left-1 top-3 rounded-r-full bg-base-gray p-5 pr-10 text-center text-[1.8rem] font-medium shadow-md '>
            {t('text44')}
          </p>
          <Image
            alt='noti-kyc'
            src='/become-employee/step4/nation.png'
            width={640}
            height={518}
            quality={100}
            className='h-auto w-[350px] object-contain 2xl:w-[450px] '
          />
        </div>
      </div>
      <div className='mt-5 flex justify-center'>
        <div className='relative w-fit rounded-xl border-2 border-base-gray p-4 pt-32'>
          <p className='absolute -left-1 top-3 rounded-r-full bg-base-gray p-5 pr-10 text-center text-[1.8rem] font-medium shadow-md'>
            {t('text45')}
          </p>
          <Image
            alt='noti-kyc'
            src='/become-employee/step4/docs.png'
            width={640}
            height={439}
            quality={100}
            className='h-auto w-[350px] object-contain 2xl:w-[450px] '
          />
          <p className='mt-2 text-center text-[1.8rem] text-black/30'>
            {t('text46')}
            <br />
            {t('text47')}
          </p>
        </div>
      </div>
      <p className='mt-8 text-[1.8rem]'>{t('text48')}</p>
      <div className='mt-8 flex justify-center'>
        <div className='relative w-fit rounded-xl border-2 border-base-gray p-4 pt-32'>
          <p className='absolute -left-1 top-3 rounded-r-full bg-base-gray p-5 pr-10 text-center text-[1.8rem] font-medium shadow-md'>
            {t('text49')}
          </p>
          <Image
            alt='noti-kyc'
            src='/become-employee/step4/kyc.png'
            width={640}
            height={439}
            quality={100}
            className='h-auto w-[350px] object-contain 2xl:w-[450px] '
          />
        </div>
      </div>
    </>
  )
}

const Step5: React.FC = () => {
  const t = useTranslations('BecomeWorker')

  return (
    <>
      <h3 className='text-[1.8rem] font-bold text-[#0B27B6]'>{t('text50')}</h3>
      <p className='mt-8 text-[1.8rem]'>{t('text51')}</p>
      <div className='mt-8 flex w-fit flex-col items-center gap-10 rounded-xl bg-black/[0.02] p-8 md:flex-row'>
        <Image
          alt='noti-kyc'
          src='/become-employee/step5/noti.png'
          width={640}
          height={492}
          quality={100}
          className='pointer-events-none h-[200px] w-auto object-contain lg:h-[250px]'
        />
        <p className='text-center text-[1.8rem] md:w-[400px] md:text-left'>
          {t('text50')}
        </p>
      </div>
      <p className='mt-8 text-[1.8rem]'>{t('text52')}</p>
      <div className='mt-8 flex flex-col items-center gap-10 xl:flex-row'>
        <div className='flex w-[300px] flex-col items-center space-y-6 lg:w-[350px] xl:w-[300px] 2xl:w-[400px]'>
          <Image
            alt='noti-kyc'
            src='/become-employee/step5/success.png'
            width={640}
            height={492}
            quality={100}
            className='h-auto w-[300px] object-contain 2xl:w-[400px] '
          />
          <p className='text-center text-[1.8rem] text-black/30'>{t('text53')}</p>
        </div>
        <span className='text-[1.8rem] text-black/50'>{t('or')}</span>
        <div className='flex w-[300px] flex-col items-center space-y-6 lg:w-[350px] xl:w-[300px] 2xl:w-[400px]'>
          <Image
            alt='noti-kyc'
            src='/become-employee/step5/error.png'
            width={640}
            height={492}
            quality={100}
            className='h-auto w-[300px] object-contain 2xl:w-[400px]'
          />
          <p className='text-center text-[1.8rem] text-black/30'>{t('text54')}</p>
        </div>
      </div>
    </>
  )
}

export default SectionStep
