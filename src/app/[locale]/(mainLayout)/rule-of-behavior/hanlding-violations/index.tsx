'use client'

import ImageFallback from '@/components/ImageFallback'
import Regards from '@/components/Regards'
import { ListBreadcrumbs } from '@/components/breadcrumbs'
import { ShouldRenderGrid, normalizeKeyword } from '@/utils'

import { Accordion, AccordionItem, Input } from '@nextui-org/react'
import { Add, Minus, SearchNormal1 } from 'iconsax-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

const HandlingViolations = () => {
  const t = useTranslations('HandlingViolations')
  const td = useTranslations('listBreadcrumbs')
  const ta = useTranslations('AboutUs')

  const [dataFilterd, setDataFilterd] = useState<(typeof newData)[]>([])

  const listBreadcrumb = [{ title: td('home'), url: '/' }, { title: t('text60'), url: `/rule-of-behavior` }, { title: t('text1') }]

  const SUPER_NORMAL = [{ text: t('canhBao') }, { text: t('3day') }, { text: t('forever') }]
  const NORMAL = [{ text: t('3day') }, { text: t('7day') }, { text: t('forever') }]
  const SIMPLE = [{ text: t('canhBao') }, { text: t('text10') }, { text: t('forever') }]
  const FOREVER = [{ text: t('forever') }]
  const THREE_DAYS_REDEEM = [{ text: t('3day') + ' ' + t('redeem') }, { text: t('forever') + ' ' + t('redeem') }]
  const IMPORTANT = [{ text: t('importantForever') }]
  const FOREVER_POLICE = [{ text: t('forever') + ' ' + t('police') }]
  const FOREVER_REDEEM = [{ text: t('forever') + ' ' + t('redeem') }]
  const SEVEN_DAYS_FOREVER = [{ text: t('7day') }, { text: t('forever') }]
  const SEVEN_DAYS_REDEEM = [{ text: t('7day') + ' ' + t('redeem') }, { text: t('forever') + ' ' + t('redeem') }]

  const newData = [
    {
      heading: {
        title: t('text66'),
        children: [{ text: t('text5') }, { text: t('text6') }, { text: t('text7') }]
      },
      content: [
        {
          title: ta('text11'),
          children: [
            {
              title: t('text8'),
              children: SIMPLE,
              code: '1.1'
            },
            {
              title: t('text12'),
              children: SIMPLE,
              code: '1.2'
            },
            {
              title: t('text15'),
              code: '1.3',
              children: THREE_DAYS_REDEEM
            },
            {
              title: t('text17'),
              code: '1.4',
              children: SUPER_NORMAL
            },
            {
              title: t('text18'),
              code: '1.5',
              children: THREE_DAYS_REDEEM
            },
            {
              code: '1.6',
              title: t('text19'),
              children: THREE_DAYS_REDEEM
            },
            {
              code: '1.7',
              title: t('text20'),
              children: THREE_DAYS_REDEEM
            },
            {
              code: '1.8',
              title: t('text21'),
              children: SUPER_NORMAL
            }
          ]
        },
        {
          code: '2.1',
          title: t('text74'),
          children: [
            {
              code: '2.1',
              title: t('text22'),
              children: IMPORTANT
            },
            {
              code: '2.2',
              title: t('text24'),
              children: FOREVER
            },
            {
              code: '2.3',
              title: t('text25'),
              children: FOREVER
            }
          ]
        },
        {
          code: '3.0',
          title: t('text75'),
          children: [
            {
              code: '3.1',
              title: t('text26'),
              children: FOREVER
            },
            {
              code: '3.2',
              title: t('text27'),
              children: IMPORTANT
            },
            {
              code: '3.3',
              title: t('text28'),
              children: [{ text: t('3day') }, { text: t('superImportantForever') }]
            },
            {
              code: '3.4',
              title: t('text30'),
              children: SEVEN_DAYS_FOREVER
            }
          ]
        }
      ]
    },
    {
      heading: {
        title: t('text70'),
        children: [{ text: t('text5') }, { text: t('text6') }, { text: t('text7') }]
      },
      content: [
        {
          title: t('text67'),
          children: [
            {
              title: t('text32'),
              code: '4.1',
              children: NORMAL
            },
            {
              code: '4.2',
              title: t('text33'),
              children: NORMAL
            },
            {
              code: '4.3',
              title: t('text34'),
              children: FOREVER_REDEEM
            },
            {
              code: '4.4',
              title: t('text35'),
              children: FOREVER_REDEEM
            },
            {
              code: '4.5',
              title: t('text36'),
              children: IMPORTANT
            }
          ]
        },
        {
          title: t('text68'),
          children: [
            {
              title: t('text37'),
              code: '5.1',
              children: [{ text: t('3day') }, { text: t('forever') }]
            },
            {
              title: t('text38'),
              code: '5.2',
              children: SEVEN_DAYS_FOREVER
            },
            {
              title: t('text39'),
              code: '5.3',
              children: FOREVER
            },
            {
              title: t('text40'),
              code: '5.4',
              children: SEVEN_DAYS_REDEEM
            },
            {
              title: t('text43'),
              code: '5.5',
              children: SEVEN_DAYS_REDEEM
            },
            {
              title: t('text44'),
              code: '5.6',
              children: [{ text: t('7day') + ' ' + t('redeem') }, { text: t('14day') + ' ' + t('redeem') }, { text: t('forever') + ' ' + t('redeem') }]
            }
          ]
        },
        {
          title: t('text76'),
          children: [
            {
              code: '6.1',
              title: t('text46'),
              children: FOREVER
            },
            {
              code: '6.2',
              title: t('text47'),
              children: NORMAL
            },
            {
              code: '6.3',
              title: t('text48'),
              children: SEVEN_DAYS_FOREVER
            },
            {
              code: '6.4',
              title: t('text49'),
              children: NORMAL
            },
            {
              code: '6.5',
              title: t('text50'),
              children: FOREVER
            },
            {
              code: '6.6',
              title: t('text51'),
              children: FOREVER
            },
            {
              code: '6.7',
              title: t('text52'),
              children: SUPER_NORMAL
            },
            {
              code: '6.8',
              title: t('text53'),
              children: SUPER_NORMAL
            }
          ]
        },
        {
          title: t('text69'),
          children: [
            {
              code: '7.1',
              title: t('text54'),
              children: FOREVER_POLICE
            },
            {
              code: '7.2',
              title: t('text55'),
              children: FOREVER_POLICE
            },
            {
              code: '7.3',
              title: t('text56'),
              children: FOREVER_POLICE
            }
          ]
        }
      ]
    }
  ]
  const menuMind: string[] = [t('text61'), t('text62'), t('text63'), t('text64'), t('text65')]

  interface Child {
    text?: string
    code?: string
    title: string
    children?: Child[]
  }

  interface Content {
    title: string
    code?: string
    children: Child[]
  }

  interface Heading {
    title: string
    children: { text: string }[]
  }
  interface DataItem {
    heading: Heading
    content: Content[]
  }

  return (
    <div className='ct-container flex flex-col gap-[48px] pb-[100px] pt-[70px] lg:gap-[100px] 3xl:pt-[80px]'>
      <div className='mt-[48px] flex flex-col gap-6'>
        <ListBreadcrumbs list={listBreadcrumb} />
        <div className='flex flex-col gap-2'>
          <div className='size-full'>
            <ImageFallback src={'/rule-of-behavior/hanlding-violations.png'} alt='/rule-of-behavior/hanlding-violations.png' height={3000} width={3000} className='size-full rounded-xl object-cover' />
          </div>
          <div className='*: flex flex-col gap-5 *:text-base'>
            <h1 className='mt-0 text-2xl !font-bold uppercase lg:mt-5 lg:!text-4xl'>{t('text1')}</h1>
            <p>{t('text2')}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0'>
          <h2 className='text-2xl font-bold'>{t('text3')}</h2>
        </div>
        <div className='hidden flex-col gap-[48px] md:flex'>
          {newData?.length
            ? newData?.map((item: any) => {
                return (
                  <div className='flex flex-col gap-4' key={item.heading.title}>
                    <div className='grid grid-cols-2'>
                      <div className='text-xl font-bold uppercase text-primary-blue'>{item.heading.title}</div>
                      <div className='grid grid-cols-3'>{item?.heading.children.map((itemHeading: any) => <div key={itemHeading.text}>{itemHeading.text}</div>)}</div>
                    </div>
                    {item.content.map((itemContent: any) => {
                      return (
                        <div key={itemContent.title} className='flex flex-col gap-4'>
                          <div className='bg-primary-blue p-4 text-xl text-white'>{itemContent.title}</div>
                          {itemContent.children?.map((itemChildContent: any, idx: number) => (
                            <div key={itemChildContent.title} className='grid grid-cols-2 gap-5 py-4'>
                              <div>
                                <span className='font-bold'>{itemContent?.children?.[idx].code}</span>
                                <span> {itemChildContent.title}</span>
                              </div>
                              {ShouldRenderGrid(itemChildContent.children)}
                            </div>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                )
              })
            : null}
        </div>
        <div className='flex flex-col gap-[48px] md:hidden'>
          {newData?.length
            ? newData.map((item: any) => {
                return (
                  <div key={item.heading.title} className='flex flex-col gap-2'>
                    <div className='text-xl font-bold uppercase text-primary-blue'>{item.heading.title}</div>
                    <div className='flex flex-col gap-4'>
                      {item.content?.map((itemC: any) => {
                        return (
                          <div className='flex flex-col gap-2' key={itemC.title}>
                            <div className='bg-primary-blue p-4 text-xl text-white'>{itemC.title}</div>
                            <AccordionVioaltions data={itemC?.children} />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })
            : null}
        </div>
        <div className='flex flex-col gap-4 rounded-xl bg-[#f8f8f8] p-4 md:p-10'>
          <p className='text-xl font-bold text-primary-blue md:text-2xl'>{t('text57')}</p>
          <ul className='*: list-inside list-decimal *:text-sm *:md:text-base'>
            {menuMind.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className='*: *:text-sm *:md:text-base'>
            <p>{t('text58')}</p>
            <p>{t('text59')}</p>
          </div>
        </div>
      </div>
      <Regards />
    </div>
  )
}

const AccordionVioaltions = ({ data }: { data: any }) => {
  const t = useTranslations('HandlingViolations')

  const NUMBER_TRANSLATE_DEFINE = 5

  return (
    <Accordion
      variant='splitted'
      className='gap-4 p-0'
      disableIndicatorAnimation
      itemClasses={{
        base: 'group-[.is-splitted]:bg-[#f8f8f8] group-[.is-splitted]:shadow-none group-[.is-splitted]:px-0 data-[open=true]:overflow-hidden group-[.is-splitted]:rounded-none',
        content: 'p-4 data-[open=true]:text-white pl-6 bg-white',
        indicator: 'text-black data-[open=true]:text-white',
        title: 'text-sm lg:text-base  data-[open=true]:text-white',
        trigger: 'lg:py-[28px] py-4 px-4 data-[open=true]:bg-baseBlack '
      }}
    >
      {data?.map((item: any) => {
        return (
          <AccordionItem
            key={item.title}
            aria-label={item.title}
            title={
              <div className='text-base'>
                <span className='!font-bold'>{item?.code} </span>
                <span>{item.title}</span>
              </div>
            }
            indicator={({ isOpen }) => (isOpen ? <Minus className='size-6 lg:size-[48px]' /> : <Add className='size-6 lg:size-[48px]' />)}
          >
            {item.children?.map((itemChild: any, idx: any) => {
              return (
                <div key={itemChild.text} className='text-sm'>
                  <span className={`${item?.children?.length - 1 === idx ? 'text-[#FF4343]' : 'text-baseBlack'}  font-bold `}>{t(`text${idx + NUMBER_TRANSLATE_DEFINE}`)}: </span>
                  <span className={`${item?.children?.length - 1 === idx ? 'text-[#FF4343]' : 'text-baseBlack'}  `}>{itemChild.text}</span>
                </div>
              )
            })}
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default HandlingViolations
