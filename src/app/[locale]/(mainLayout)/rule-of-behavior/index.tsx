'use client'

import { Button } from '@nextui-org/react'
import { useLocale, useTranslations } from 'next-intl'

import AccordionCustom from '@/components/AccordionCustom'
import ImageFallback from '@/components/ImageFallback'
import { ListBreadcrumbs } from '@/components/breadcrumbs'
import Link from 'next/link'
import Regards from '@/components/Regards'

const RuleOfBehavior = () => {
  const td = useTranslations('listBreadcrumbs')
  const t = useTranslations('RuleOfBehavior')
  const to = useTranslations('otherRule')
  const te = useTranslations('encourageData')
  const tc = useTranslations('commitData')

  const listBreadcrumb = [{ title: td('home'), url: '/' }, { title: t('text') }]
  const locale = useLocale()

  const dataAccordionJob = [
    {
      title: t('heading1'),
      children: [t('text1'), t('text2'), t('text3'), t('text4')]
    },
    {
      title: t('heading2'),
      children: [t('text5'), t('text6'), t('text7'), t('text8'), t('text9'), t('text10'), t('text11')]
    },
    {
      title: t('heading4'),
      children: [t('text16'), t('text17')]
    },
    {
      title: t('heading3'),
      children: [t('text12'), t('text13'), t('text14'), t('text15')]
    },

    {
      title: t('heading5'),
      children: [t('text18'), t('text19'), t('text20')]
    },
    {
      title: t('heading7'),
      children: [t('text24'), t('text25'), t('text26')]
    },
    {
      title: t('heading6'),
      children: [t('text21'), t('text2'), t('text23')]
    }
  ]

  const dataAccordionActivity = [
    {
      title: t('text27'),
      children: [t('text28'), t('text29'), t('text30'), t('text31')]
    },
    {
      title: t('heading11'),
      children: [t('text40'), t('text41'), t('text42'), t('text43'), t('text44')]
    },
    {
      title: t('heading9'),
      children: [t('text34'), t('text35'), t('text36')]
    },
    {
      title: t('heading8'),
      children: [t('text32'), t('text33')]
    },

    {
      title: t('heading10'),
      children: [t('text37'), t('text38'), t('text39')]
    }
  ]

  const otherRule = [to('text'), to('text1'), to('text2'), to('text3')]

  const encourageData = [te('text'), te('text1'), te('text2'), te('text3'), te('text4')]

  const commitData = [tc('text'), tc('text1'), tc('text2')]

  return (
    <div className='ct-container flex flex-col gap-[48px] pb-[100px] pt-[70px] lg:gap-[100px] 3xl:pt-[80px]'>
      <div className='mt-[48px] flex flex-col gap-6'>
        <ListBreadcrumbs list={listBreadcrumb} />
        <div className='flex flex-col gap-2'>
          <div className='size-full w-[103%]'>
            <ImageFallback src={'/rule-of-behavior/hero.png'} alt='/rule-of-behavior/hero.png' height={3000} width={3000} className='size-full rounded-xl object-cover' />
          </div>
          <div className='*: flex flex-col gap-4 rounded-[48px] bg-[#F8F8F8] p-12 *:text-base'>
            <h1 className='mt-0 text-2xl !font-bold uppercase lg:mt-5 lg:!text-4xl'>{t('text45')}</h1>
            <p className='text-[#363636]'>{t('text46')}</p>
            <p className='text-[#363636]'>{t('text47')}</p>
            <p className='text-[#363636]'>{t('text48')}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <TitleNumberBall title={t('text49')} number={1} />
        <div className='grid grid-cols-2 items-center gap-5'>
          <div className='flex flex-col gap-5'>
            {dataAccordionJob.splice(0, 3).map((item, index) => {
              return <ItemDescription key={item.title} title={item.title} description={item.children} />
            })}
          </div>
          <div className='flex flex-col gap-5'>
            {dataAccordionJob.map((item, index) => {
              return <ItemDescription key={item.title} title={item.title} description={item.children} />
            })}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <TitleNumberBall title={t('text50')} number={2} />
        <div className='grid grid-cols-2 items-center gap-5'>
          <div className='flex flex-col gap-5'>
            {dataAccordionActivity.splice(0, 2).map((item, index) => {
              return <ItemDescription key={item.title} title={item.title} description={item.children} />
            })}
          </div>
          <div className='flex flex-col gap-5'>
            {dataAccordionActivity.map((item, index) => {
              return <ItemDescription key={item.title} title={item.title} description={item.children} />
            })}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 grid-rows-2 gap-5'>
        <div className='flex items-center justify-center rounded-3xl border-1  border-[#F8F8F8]'>
          <TitleNumberBall title={t('text51')} number={3} />
        </div>
        <div className='grid grid-cols-3 items-center justify-center rounded-3xl bg-[#F3F8FF]'>
          <div className='col-span-2 flex flex-col gap-4 px-12'>
            <p className='text-2xl font-bold'>Jhen rthuong</p>
            <p>Thợ có thành tích tốt, được khách hàng đánh giá cao sẽ được khen thưởng theo quy định của Vua Thợ.</p>
          </div>
          <div className='col-span-1 size-[252px]'>
            <ImageFallback src={'/rule-of-behavior/hero.png'} alt='/rule-of-behavior/hero.png' height={400} width={400} className='size-full object-cover' />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-3 rounded-3xl bg-[#F8F8F8] px-12'>
          <div className='w-full text-left'>
            <p className='text-2xl font-bold'>Kỷ luật</p>
          </div>
          <p className='text-base'>Thợ vi phạm quy tắc ứng xử sẽ bị Vua Thợ nhắc nhở, cảnh cáo hoặc khóa tài khoản tùy theo mức độ vi phạm.</p>
        </div>
        <div className='grid grid-cols-3 items-center justify-center '>
          <div className='col-span-1 size-[252px]'>
            <ImageFallback src={'/rule-of-behavior/hero.png'} alt='/rule-of-behavior/hero.png' height={400} width={400} className='size-full object-cover' />
          </div>
          <div className='col-span-2 flex flex-col gap-4 px-12'>
            <p className='text-2xl font-bold'>Hình thức xử lý vi phạm</p>
            <p>Thợ vi phạm quy tắc ứng xử sẽ bị Vua Thợ nhắc nhở, cảnh cáo hoặc khóa tài khoản tùy theo mức độ vi phạm.</p>
            <Button className='flex h-[60px] items-center justify-center bg-baseBlack px-8 text-base font-semibold text-white'>Xem chi tiết</Button>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h3 className='text-xl font-bold lg:text-2xl'>{t('text51')}</h3>
        <div className='grid gap-5 lg:grid-cols-2'>
          <div className='flex flex-col gap-5'>
            <div>
              <h4 className='font-bold'>{t('text52')}:</h4>
              <p>{t('text53')}.</p>
            </div>
            <div>
              <h4 className='font-bold'>{t('text54')}:</h4>
              <p>{t('text55')}.</p>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center gap-4 rounded-xl bg-primary-yellow py-4 lg:gap-6 lg:py-8'>
            <h4 className='text-xl font-bold lg:text-2xl'>{t('text56')}</h4>
            <Link href={`/${locale}/rule-of-behavior/hanlding-violations`}>
              <Button className='flex h-[60px] items-center justify-center bg-baseBlack px-8 text-base font-semibold text-white'>{t('text57')}</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h3 className='text-xl font-bold lg:text-2xl'>{t('text58')}</h3>
        <ul className='*: list-inside list-disc *:text-base lg:pl-2 *:lg:text-base'>{otherRule?.map((item) => <li key={item}>{item}.</li>)}</ul>
      </div>
      <div className='flex flex-col gap-4'>
        <h3 className='text-xl font-bold lg:text-2xl'>{t('text59')}:</h3>
        <ul className='*: list-inside list-disc *:text-base lg:pl-2 *:lg:text-base'>{encourageData?.map((item) => <li key={item}>{item}.</li>)}</ul>
      </div>
      <div className='flex flex-col gap-4 rounded-xl bg-[#F3F6FF] p-4'>
        <h3 className='font-bold'>{t('text60')}:</h3>
        <ul className='*: list-inside list-decimal *:text-base lg:pl-1 *:lg:text-base'>{commitData?.map((item) => <li key={item}>{item}.</li>)}</ul>
      </div>
      <Regards />
    </div>
  )
}

const TitleNumberBall = ({ title, number }: { title: string; number: number }) => {
  return (
    <div className='flex items-center gap-4'>
      <div className='flex size-[58px] items-center justify-center rounded-full bg-[#2855C9] text-3xl font-bold text-white'>{number}</div>
      <p className='text-3xl font-bold text-[#2855C9]'>{title}</p>
    </div>
  )
}

const ItemDescription = ({ title, description }: { title: string; description: string[] }) => {
  return (
    <div className='flex flex-col gap-4 rounded-3xl bg-[#F8F8F8] p-6 transition-all duration-150 hover:bg-[#2855C9] hover:text-white'>
      <div className='flex flex-col gap-4'>
        <p className='text-2xl font-bold'>{title}</p>
      </div>
      <ul className='list-inside list-disc'>
        {description.map((item, index) => {
          return <li key={index}>{item}</li>
        })}
      </ul>
    </div>
  )
}

export default RuleOfBehavior
