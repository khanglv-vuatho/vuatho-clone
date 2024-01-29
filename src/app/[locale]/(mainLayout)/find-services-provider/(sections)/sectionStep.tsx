'use client'

import { memo } from 'react'
import { useTranslations } from 'next-intl'
import { Accordion, AccordionItem, Tab, Tabs } from '@nextui-org/react'

import { AndroidBtn, IosBtn, QrCode } from '@/components/DownloadApps'

import ImageFallback from '@/components/ImageFallback'

const SectionTest = memo(() => {
  const t = useTranslations('FindWorker')
  const tabs = [
    {
      id: '1',
      label: t('text1'),
      content: <Step1 />
    },
    {
      id: '2',
      label: t('text2'),
      content: <Step2 />
    },
    {
      id: '3',
      label: t('text3'),
      content: <Step3 />
    }
  ]
  return (
    <div className='flex w-full flex-col'>
      <div className='hidden lg:block'>
        <Tabs
          aria-label='Find Woker Tabs'
          items={tabs}
          variant='light'
          classNames={{
            tabList: 'gap-6 w-full relative rounded-none py-2',
            cursor: 'w-full bg-[#405AB7]',
            tab: 'max-w-fit px-[20px] py-[30px] flex items-center justify-center bg-[#F8F8F8]',
            tabContent: 'text-black group-data-[selected=true]:text-[#fff] text-[1.8rem] font-semibold'
          }}
        >
          {(item) => (
            <Tab key={item.id} title={item.label}>
              <div className='rounded-2xl border-[1px] border-[#E1E1E1] p-[20px]'>{item.content}</div>
            </Tab>
          )}
        </Tabs>
      </div>
      <div className='block lg:hidden'>
        <Accordion
          className='gap-5'
          itemClasses={{
            base: 'group-[.is-splitted]:shadow-[0px_0px_12px_2px_rgba(0,0,0,0.20)]'
          }}
        >
          {tabs.map((item: any, index: any) => (
            <AccordionItem
              key={`tab-find-worker-${item.id}`}
              aria-label={item.label}
              title={
                <p
                  onClick={() =>
                    window.scrollTo({
                      top: 30 * (index + 1)
                    })
                  }
                >
                  {item.label}
                </p>
              }
              classNames={{
                content: 'flex flex-col gap-2',
                title: 'text-[1.8rem] font-bold data-[open=true]:text-[#0B27B6]',
                indicator: 'text-[1.8rem]',
                base: 'group-[.is-splitted]:pl-12',
                trigger: 'data-[focus-visible=true]:!outline-none'
              }}
            >
              {item.content}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
})

const Step1 = memo(() => {
  const t = useTranslations('FindWorker')

  return (
    <div className='flex-col gap-[20px] rounded-lg border-2 border-base-gray p-6 md:flex md:border-none md:p-0'>
      <h3 className='text-[1.8rem] font-semibold text-[#405AB7]'>{t('text4')}</h3>
      <div className='mt-8 flex flex-col gap-10 md:flex-row md:items-center'>
        <div className='space-y-10'>
          <div>
            <h4 className='mb-2 whitespace-nowrap text-[1.8rem]'>{t('text5')}</h4>
            <AndroidBtn />
          </div>
          <div>
            <h4 className='mb-2 whitespace-nowrap text-[1.8rem]'>{t('text6')}</h4>
            <IosBtn />
          </div>
        </div>
        <span className='text-[1.8rem] text-black/50 3xl:text-[1.8rem]'>{t('text7')}</span>
        <div>
          <QrCode />
        </div>
      </div>
    </div>
  )
})

const Step2 = memo(() => {
  const t = useTranslations('FindWorker')

  const tabs = [
    {
      id: '4',
      label: t('text8'),
      content: <Register />
    },
    {
      id: '5',
      label: t('text9'),
      content: <Login />
    }
  ]
  return (
    <div className='flex flex-col gap-[20px] rounded-lg border-2 border-base-gray p-6 md:border-none md:p-0'>
      <h3 className='text-[1.8rem] font-semibold text-[#405AB7]'>{t('text10')}</h3>
      <div className='hidden w-full gap-[20px] lg:flex'>
        <Tabs
          aria-label='Option Login Logout Tabs'
          items={tabs}
          variant='light'
          classNames={{
            tabList: 'gap-6 w-full relative rounded-none py-2 flex-col',
            cursor: 'w-full bg-[#405AB7]',
            tab: 'xl:min-w-[300px] min-w-[100px] p-[24px] flex items-center justify-start border-[1px] border-[#E1E1E1]',
            tabContent: 'text-black group-data-[selected=true]:text-[#fff] text-[1.8rem] font-semibold'
          }}
        >
          {(item) => (
            <Tab key={item.id} title={item.label}>
              <div className='w-full'>{item.content}</div>
            </Tab>
          )}
        </Tabs>
      </div>
      <div className='block lg:hidden'>
        <Register />
        <Login />
      </div>
    </div>
  )
})

const Step3 = memo(() => {
  const t = useTranslations('FindWorker')

  const listRegisterItem = [
    {
      thumb: 'findWorker1.webp',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold xl:text-[2.4rem]'>{t('text11')}</p>
          <p className='text-[1.8rem]'>{t('text30')}</p>
        </>
      )
    },
    {
      thumb: 'findWorker2.webp',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold xl:text-[2.4rem]'>{t('text14')}</p>
          <p className='text-[1.8rem]'>{t('text31')}</p>
        </>
      )
    },
    {
      thumb: 'findWorker3.webp',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold xl:text-[2.4rem]'>{t('text17')}</p>
          <p className='text-[1.8rem]'>{t('text36')}</p>
        </>
      )
    },
    {
      thumb: 'findWorker4.webp',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold xl:text-[2.4rem]'>{t('text20')}</p>
          <p className='text-[1.8rem]'>{t('text38')}</p>
          <p className='text-[1.8rem]'>{t('text39')}</p>
        </>
      )
    },
    {
      thumb: 'findWorker5-1.webp',
      thumb2: 'findWorker5-2.webp',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold xl:text-[2.4rem]'>{t('text28')}</p>
          <p className='text-[1.8rem]'>{t('text40')}</p>
          <p className='text-[1.8rem]'>{t('text41')}</p>
        </>
      )
    },
    {
      thumb: 'findWorker6-1.webp',
      thumb2: 'findWorker6-2.webp',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold xl:text-[2.4rem]'>{t('text29')}</p>
          <p className='text-[1.8rem]'>{t('text42')}</p>
          <p className='text-[1.8rem]'>{t('text43')}</p>
        </>
      )
    }
  ]

  return (
    <div className='rounded-lg border-2 border-base-gray p-6 md:border-none md:p-0'>
      <h3 className='text-[1.8rem] font-semibold text-[#405AB7]'>{t('text44')}</h3>
      <p className='my-[20px] text-[1.8rem]'>{t('text45')}</p>
      <div className='grid gap-[40px] lg:grid-cols-2'>
        {listRegisterItem.map((item) => (
          <RegisterItem thumb={item.thumb} key={item.thumb} thumb2={item.thumb2}>
            {item.content}
          </RegisterItem>
        ))}
      </div>
    </div>
  )
})

const Register: any = memo(() => {
  const t = useTranslations('FindWorker')

  const listRegisterItem = [
    {
      thumb: 'screen1.webp',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold'>{t('text11')}</p>
          <p className='text-[1.8rem]'>{t('text12')}</p>
          <p className='text-[1.8rem]'>{t('text13')}</p>
        </>
      )
    },
    {
      thumb: 'screen2.webp',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold'>{t('text14')}</p>
          <p className='text-[1.8rem]'>{t('text15')}</p>
          <p className='text-[1.8rem]'>{t('text16')}</p>
        </>
      )
    },
    {
      thumb: 'screen3.webp',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold'>{t('text17')}</p>
          <p className='text-[1.8rem]'>
            {t('text18')}
            <span className='text-[#FF4343]'>{t('text19')}</span>
          </p>
        </>
      )
    },
    {
      thumb: 'screen4.webp',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold'>{t('text20')}</p>
          <p className='text-[1.8rem]'>{t('text21')}</p>
        </>
      )
    }
  ]

  return (
    <div>
      <h5 className='mb-10 block w-full rounded-lg bg-primary-blue py-2 pl-6 text-[2.2rem] text-white lg:hidden'>{t('text8')}</h5>
      <div className='grid gap-10 md:grid-cols-2'>
        {listRegisterItem.map((item) => (
          <RegisterItem thumb={item.thumb} key={item.thumb}>
            {item.content}
          </RegisterItem>
        ))}
      </div>
    </div>
  )
})

const Login = memo(() => {
  const t = useTranslations('FindWorker')

  return (
    <>
      <h5 className='mb-10 w-full rounded-lg bg-primary-blue py-2 pl-6 text-[2.2rem] text-white lg:hidden'>{t('text9')}</h5>
      <p className='text-[1.8rem]'>{t('text22')}</p>
      <p className='my-4'>
        <strong className='text-[1.8rem]'> {t('text23')}</strong>
      </p>
      <p className='text-[1.8rem]'> {t('text24')}</p>
      <ul className='list-inside list-disc pl-3 text-[1.8rem]'>
        <li> {t('text25')}</li>
        <li> {t('text26')}</li>
        <li> {t('text27')}</li>
      </ul>
      <div className='mt-[20px] flex'>
        <ImageFallback src='/find-worker/loginScreen1.webp' alt={`find-worker-loginScreen1`} width={220} height={420} className='pointer-events-none' />
        <ImageFallback src='/find-worker/loginScreen2.webp' alt={`find-worker-loginScreen2`} width={220} height={420} className='pointer-events-none' />
        <ImageFallback src='/find-worker/loginScreen3.webp' alt={`find-worker-loginScreen3`} width={220} height={420} className='pointer-events-none' />
      </div>
    </>
  )
})

const RegisterItem = memo(({ children, thumb, thumb2 }: { children: any; thumb: any; thumb2?: any }) => {
  return (
    <div className={`flex flex-col justify-between gap-[20px] md:col-span-2 md:flex-row xl:col-span-1`}>
      <div className={`flex flex-col gap-4 text-[#282828] ${thumb2 ? 'md:max-w-[55%]' : ''}`}>{children}</div>
      {thumb2 ? (
        <div className='flex w-fit flex-col gap-10 md:flex-row md:gap-2'>
          <div className='w-[180px]'>
            <ImageFallback src={`/find-worker/${thumb}`} alt={`find-worker-${thumb}`} width={220} height={300} className='pointer-events-none h-full w-full' />
          </div>
          <div className='w-[180px]'>
            <ImageFallback src={`/find-worker/${thumb2}`} alt={`find-worker-${thumb2}`} width={220} height={300} className='pointer-events-none h-full w-full' />
          </div>
        </div>
      ) : (
        <div className='flex w-fit justify-start md:justify-end'>
          <div className='w-[180px]'>
            <ImageFallback src={`/find-worker/${thumb}`} alt={`find-worker-${thumb}`} width={220} height={300} className='pointer-events-none h-full w-full' />
          </div>
        </div>
      )}
    </div>
  )
})

export default memo(SectionTest)
