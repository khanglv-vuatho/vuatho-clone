'use client'

import { useTranslations } from 'next-intl'

import { Accordion, AccordionItem, Image, Tab, Tabs } from '@nextui-org/react'

import { AndroidBtn, IosBtn, QrCode } from '@/components/DownloadApps'

const SectionTest = () => {
  const t = useTranslations('FindWorker')
  const tabs = [
    {
      id: '1',
      label: t('text1'),
      content: <Step1 />,
    },
    {
      id: '2',
      label: t('text2'),
      content: <Step2 />,
    },
    {
      id: '3',
      label: t('text3'),
      content: <Step3 />,
    },
  ]
  return (
    <div className='flex w-full flex-col'>
      <div className='hidden md:block'>
        <Tabs
          aria-label='Dynamic tabs'
          items={tabs}
          variant='light'
          classNames={{
            tabList: 'gap-6 w-full relative rounded-none py-2',
            cursor: 'w-full bg-[#405AB7]',
            tab: 'max-w-fit px-[20px] py-[30px] flex items-center justify-center bg-[#F8F8F8]',
            tabContent:
              'text-black group-data-[selected=true]:text-[#fff] text-[1.8rem] font-semibold',
          }}
        >
          {(item) => (
            <Tab key={item.id} title={item.label}>
              <div className='rounded-2xl border-[1px] border-[#E1E1E1] p-[20px]'>
                {item.content}
              </div>
            </Tab>
          )}
        </Tabs>
      </div>
      <div className='block md:hidden'>
        <Accordion
          className='gap-5'
          itemClasses={{
            base: 'group-[.is-splitted]:shadow-[0px_0px_12px_2px_rgba(0,0,0,0.20)]',
          }}
        >
          {tabs.map((i: any, index: any) => (
            <AccordionItem
              key={`tab-find-worker-${i.id}`}
              aria-label={i.label}
              title={
                <p
                  onClick={() =>
                    window.scrollTo({
                      top: 30 * (index + 1),
                    })
                  }
                >
                  {i.label}
                </p>
              }
              classNames={{
                content: 'flex flex-col gap-2',
                title: 'text-[1.8rem] font-bold data-[open=true]:text-[#0B27B6]',
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
  )
}

const Step1 = () => {
  const t = useTranslations('FindWorker')

  return (
    <div className='flex-col gap-[20px] rounded-lg border-2 border-base-gray p-6 md:flex md:border-none md:p-0'>
      <h3 className='text-[1.8rem] font-semibold text-[#405AB7]'>{t('text4')}</h3>
      <div className='mt-8 flex flex-col items-center gap-10 md:flex-row'>
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
        <span className='text-[1.8rem] text-black/50 3xl:text-[1.8rem]'>
          {t('text7')}
        </span>
        <QrCode />
      </div>
    </div>
  )
}

const Step2 = () => {
  const t = useTranslations('FindWorker')

  const tabs = [
    {
      id: '4',
      label: t('text8'),
      content: <Register />,
    },
    {
      id: '5',
      label: t('text9'),
      content: <Login />,
    },
  ]
  return (
    <div className='flex flex-col gap-[20px] rounded-lg border-2 border-base-gray p-6 md:border-none md:p-0'>
      <h3 className='text-[1.8rem] font-semibold text-[#405AB7]'>{t('text10')}</h3>
      <div className='hidden w-full gap-[20px] lg:flex'>
        <Tabs
          aria-label='Dynamic tabs'
          items={tabs}
          variant='light'
          classNames={{
            tabList: 'gap-6 w-full relative rounded-none py-2 flex-col',
            cursor: 'w-full bg-[#405AB7]',
            tab: 'xl:min-w-[300px] min-w-[100px] p-[24px] flex items-center justify-start border-[1px] border-[#E1E1E1]',
            tabContent:
              'text-black group-data-[selected=true]:text-[#fff] text-[1.8rem] font-semibold',
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
}

const Step3 = () => {
  const t = useTranslations('FindWorker')

  const listRegisterItem = [
    {
      url: 'findWorker1.png',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold'>{t('text11')}</p>
          <p className='text-[1.8rem]'>{t('text30')}</p>
        </>
      ),
    },
    {
      url: 'findWorker2.png',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold'>{t('text14')}</p>
          <p className='text-[1.8rem]'>{t('text31')}</p>
          <ul className='list-inside list-disc text-[1.8rem]'>
            <li>{t('text32')}</li>
            <li>{t('text33')}</li>
            <li>{t('text34')}</li>
            <li>{t('text35')}</li>
          </ul>
        </>
      ),
    },
    {
      url: 'findWorker3.png',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold'>{t('text17')}</p>
          <p className='text-[1.8rem]'>{t('text36')}</p>
          <p className='text-[1.8rem]'>{t('text37')}</p>
        </>
      ),
    },
    {
      url: 'findWorker4.png',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold'>{t('text20')}</p>
          <p className='text-[1.8rem]'>{t('text38')}</p>
          <p className='text-[1.8rem]'>{t('text39')}</p>
        </>
      ),
    },
    {
      url: 'findWorker5-1.png',
      url2: 'findWorker5-2.png',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold'>{t('text28')}</p>
          <p className='text-[1.8rem]'>{t('text40')}</p>
          <p className='text-[1.8rem]'>{t('text41')}</p>
        </>
      ),
    },
    {
      url: 'findWorker6-1.png',
      url2: 'findWorker6-2.png',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold'>{t('text29')}</p>
          <p className='text-[1.8rem]'>{t('text42')}</p>
          <p className='text-[1.8rem]'>{t('text43')}</p>
        </>
      ),
    },
  ]

  return (
    <div className='rounded-lg border-2 border-base-gray p-6 md:border-none md:p-0'>
      <h3 className='text-[1.8rem] font-semibold text-[#405AB7]'>{t('text44')}</h3>
      <p className='my-[20px] text-[1.8rem]'>{t('text45')}</p>
      <div className='grid gap-10 md:grid-cols-2 2xl:gap-y-20'>
        {listRegisterItem.map((i, index) => (
          <RegisterItem url={i.url} key={i.url} url2={i.url2} index={index}>
            {i.content}
          </RegisterItem>
        ))}
      </div>
    </div>
  )
}

const Register: any = () => {
  const t = useTranslations('FindWorker')

  const listRegisterItem = [
    {
      url: 'screen1.png',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold'>{t('text11')}</p>
          <p className='text-[1.8rem]'>{t('text12')}</p>
          <p className='text-[1.8rem]'>{t('text13')}</p>
        </>
      ),
    },
    {
      url: 'screen2.png',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold'>{t('text14')}</p>
          <p className='text-[1.8rem]'>{t('text15')}</p>
          <p className='text-[1.8rem]'>{t('text16')}</p>
        </>
      ),
    },
    {
      url: 'screen3.png',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold'>{t('text17')}</p>
          <p className='text-[1.8rem]'>
            {t('text18')}
            <span className='text-[#FF4343]'>{t('text19')}</span>
          </p>
        </>
      ),
    },
    {
      url: 'screen4.png',
      content: (
        <>
          <p className='text-[1.8rem] font-semibold'>{t('text20')}</p>
          <p className='text-[1.8rem]'>{t('text21')}</p>
        </>
      ),
    },
  ]

  return (
    <div className=''>
      <h5 className='mb-10 block w-full rounded-lg bg-primary-blue py-6 pl-6 text-[2.5rem] text-white lg:hidden'>
        {t('text8')}
      </h5>
      <div className='grid gap-10 md:grid-cols-2'>
        {listRegisterItem.map((i) => (
          <RegisterItem url={i.url} key={i.url}>
            {i.content}
          </RegisterItem>
        ))}
      </div>
    </div>
  )
}

const Login = () => {
  const t = useTranslations('FindWorker')

  return (
    <>
      <h5 className='mb-10 w-full rounded-lg bg-primary-blue py-6 pl-6 text-[2.5rem] text-white lg:hidden'>
        {t('text9')}
      </h5>
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
        <Image
          src='/find-worker/loginScreen1.png'
          alt=''
          width={220}
          height={420}
          className='pointer-events-none'
        />
        <Image
          src='/find-worker/loginScreen2.png'
          alt=''
          width={220}
          height={420}
          className='pointer-events-none'
        />
        <Image
          src='/find-worker/loginScreen3.png'
          alt=''
          width={220}
          height={420}
          className='pointer-events-none'
        />
      </div>
    </>
  )
}

const RegisterItem = ({
  children,
  url,
  url2,
  index,
}: {
  children: any
  url: any
  url2?: any
  index?: number
}) => {
  return (
    <div
      className={`${
        index == 4 || index == 5 ? 'md:col-span-2 xl:col-span-1' : 'col-span-1'
      } flex flex-col items-center justify-between gap-[20px] md:flex-row`}
    >
      <div
        className={`flex flex-col gap-4 text-[#282828] ${url2 ? 'md:max-w-[55%]' : ''}`}
      >
        {children}
      </div>
      {url2 ? (
        <div className='flex w-fit flex-col gap-10 md:flex-row md:gap-2'>
          <div className='w-[180px]'>
            <Image
              src={`/find-worker/${url}`}
              alt=''
              width={220}
              height={300}
              className='pointer-events-none h-full w-full'
            />
          </div>
          <div className='w-[180px]'>
            <Image
              src={`/find-worker/${url2}`}
              alt=''
              width={220}
              height={300}
              className='pointer-events-none h-full w-full'
            />
          </div>
        </div>
      ) : (
        <div className='flex w-fit justify-start md:justify-end'>
          <div className='w-[180px]'>
            <Image
              src={`/find-worker/${url}`}
              alt=''
              width={220}
              height={300}
              className='pointer-events-none'
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SectionTest
