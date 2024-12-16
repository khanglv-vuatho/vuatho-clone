'use client'

import { Button } from '@nextui-org/react'
import { useLocale, useTranslations } from 'next-intl'

import ImageFallback from '@/components/ImageFallback'
import { ListBreadcrumbs } from '@/components/breadcrumbs'
import { ArrowRight2 } from 'iconsax-react'
import Link from 'next/link'

const RuleOfBehavior = () => {
  const td = useTranslations('listBreadcrumbs')
  const t = useTranslations('RuleOfBehavior')
  const to = useTranslations('otherRule')
  const te = useTranslations('encourageData')
  const tc = useTranslations('commitData')
  const r = useTranslations('Regards')

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
    <div className='ct-container flex flex-col gap-6 pb-[100px] pt-[70px] md:gap-[48px] lg:gap-[100px] 3xl:pt-[80px]'>
      <div className='mt-[48px] flex flex-col gap-6'>
        <ListBreadcrumbs list={listBreadcrumb} />
        <div className='flex flex-col gap-2'>
          <div className='size-full w-full 2xl:w-[103%]'>
            <ImageFallback src={'/rule-of-behavior/hero.png'} alt='/rule-of-behavior/hero.png' height={3000} width={3000} className='size-full rounded-xl object-cover' />
          </div>
          <div className='flex flex-col gap-2 rounded-2xl bg-[#F8F8F8] px-4 py-6 md:gap-4 lg:rounded-[48px] lg:p-12'>
            <h1 className='text-base !font-bold uppercase lg:!text-4xl'>{t('text45')}</h1>
            <p className='text-sm text-[#363636] lg:text-base'>{t('text46')}</p>
            <p className='text-sm text-[#363636] lg:text-base'>{t('text47')}</p>
            <p className='text-sm text-[#363636] lg:text-base'>{t('text48')}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <TitleNumberBall title={t('text49')} number={1} />
        <div className='grid items-center gap-5 lg:grid-cols-2'>
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
        <div className='grid items-center gap-5 lg:grid-cols-2'>
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

      <div className='grid gap-5 lg:grid-cols-2 lg:grid-rows-2'>
        <div className='flex items-center justify-center rounded-3xl border-1  border-[#F8F8F8]'>
          <TitleNumberBall title={t('text51')} number={3} />
        </div>
        <div className='grid grid-cols-3 items-center justify-center rounded-3xl bg-[#F3F8FF]'>
          <div className='col-span-2 flex flex-col gap-4 p-4 lg:px-12'>
            <p className='text-base font-bold lg:text-2xl'>{t('text52')}</p>
            <p className='text-sm lg:text-base'>{t('text53')}</p>
          </div>
          <div className='col-span-1 size-full'>
            <ImageFallback src={'/rule-of-behavior/award.png'} alt='/rule-of-behavior/award.png' height={700} width={700} className='size-full object-cover' />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-3 rounded-3xl bg-[#F8F8F8] p-4 lg:px-12'>
          <div className='w-full text-left'>
            <p className='text-2xl font-bold'>Kỷ luật</p>
          </div>
          <p className='text-base'>Thợ vi phạm quy tắc ứng xử sẽ bị Vua Thợ nhắc nhở, cảnh cáo hoặc khóa tài khoản tùy theo mức độ vi phạm.</p>
        </div>
        <div className='grid grid-cols-3 items-center justify-center '>
          <div className='col-span-1 size-full'>
            <ImageFallback src={'/rule-of-behavior/shield.png'} alt='/rule-of-behavior/shield.png' height={400} width={400} className='size-full object-cover' />
          </div>
          <div className='col-span-2 flex flex-col gap-2 px-4 lg:gap-4 lg:px-12'>
            <p className='text-base font-bold lg:text-2xl'>{t('text56')}</p>
            <p className='text-sm lg:text-base'>{t('text55')}</p>
            <Button
              as={Link}
              href={`/${locale}/rule-of-behavior/hanlding-violations`}
              className='flex h-[44px] w-fit items-center justify-center rounded-full bg-primary-yellow px-8 text-sm font-semibold text-black lg:h-[52px] lg:text-base'
              endContent={<ArrowRight2 className='size-6' />}
            >
              {t('text61')}
            </Button>
          </div>
        </div>
      </div>

      <div className='grid gap-5 lg:grid-cols-2'>
        <div className='flex flex-col gap-4 rounded-3xl border-1 border-[#F8F8F8]  p-4 lg:p-12'>
          <TitleNumberBall title={t('text58')} number={4} />
          <div className=''>{otherRule.join('')}</div>
        </div>
        <div className='flex flex-col gap-4 rounded-3xl bg-[#F8F8F8] p-4 lg:p-12'>
          <p className='text-base font-bold'>{t('text59')}</p>
          <div className='flex flex-col text-base '>
            {encourageData.map((item, index) => (
              <p key={index} className='text-sm lg:text-base'>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className='grid gap-4 rounded-3xl bg-[#1646C0] p-4 text-white lg:grid-cols-2 lg:p-12'>
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-bold lg:text-2xl '>{t('text60')}</p>
          <div className='flex flex-col text-base'>
            {commitData.map((item, index) => (
              <p key={index} className='text-sm lg:text-base'>
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className='flex items-center '>
          <div className='hidden lg:block'>
            <div className='relative -top-[157px] w-[314px]'>
              <ImageFallback src={'/rule-of-behavior/phone.png'} alt='/rule-of-behavior/phone.png' height={800} width={800} className='absolute top-0 object-cover' />
            </div>
          </div>
          <div className='flex w-full justify-end lg:hidden'>
            <div className='size-[140px]'>
              <ImageFallback src={'/rule-of-behavior/phone.png'} alt='/rule-of-behavior/phone.png' height={800} width={800} className='size-full object-cover' />
            </div>
          </div>
          <div className='flex w-full flex-col justify-end text-right *:whitespace-nowrap *:text-sm *:lg:text-base'>
            <p>{r('text')},</p>
            <p>{r('text1')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const TitleNumberBall = ({ title, number }: { title: string; number: number }) => {
  return (
    <div className='flex items-center gap-2 lg:gap-4'>
      <div className='flex size-[40px] items-center justify-center rounded-full bg-[#2855C9] text-base font-bold text-white lg:size-[58px] lg:text-3xl'>{number}</div>
      <p className='text-base font-bold text-[#2855C9] lg:text-3xl'>{title}</p>
    </div>
  )
}

const ItemDescription = ({ title, description }: { title: string; description: string[] }) => {
  return (
    <div className='flex flex-col gap-2 rounded-3xl bg-[#F8F8F8] p-4 transition-all duration-150 hover:bg-[#2855C9] hover:text-white lg:gap-4 lg:p-6'>
      <div className='flex flex-col gap-4'>
        <p className='text-base font-bold lg:text-2xl'>{title}</p>
      </div>
      <ul className='list-inside list-disc'>
        {description.map((item, index) => {
          return (
            <li key={index} className='text-sm lg:text-base'>
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RuleOfBehavior
