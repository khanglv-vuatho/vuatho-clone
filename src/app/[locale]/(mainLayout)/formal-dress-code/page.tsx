import AccordionCustom from '@/components/AccordionCustom'
import ImageFallback from '@/components/ImageFallback'
import Regards from '@/components/Regards'
import { ListBreadcrumbs } from '@/components/breadcrumbs'
import { IAccordionCustom } from '@/interface'
import { ShouldRenderGrid } from '@/utils'
import { Button } from '@nextui-org/react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Quy chuẩn đồng phục',
      en: 'Formal dress code'
    }
    const description: any = {
      vi: 'Ứng dụng số 1 Việt Nam',
      en: 'Leading App in Vietnam'
    }

    return {
      title: metadata[params.locale || 'vi'] || metadata.en,
      description: description[params.locale || 'vi'] || description.en
    }
  } catch (error) {
    console.log(error)
  }
}

const FormalDressCode = () => {
  const t = useTranslations('listBreadcrumbs')
  const tn = useTranslations('Navbar')
  const tt = useTranslations('HandlingViolations')
  const tf = useTranslations('FormalDressCode')
  const listBreadcrumb = [{ title: t('home'), url: '/' }, { title: tf('text') }]

  const locale = useLocale()

  const listFormal: string[] = [tf('text1'), tf('text2'), tf('text3'), tf('text4'), tf('text5'), tf('text6'), tf('text7')]
  const listDetailFormal = [
    {
      title: tf('text8'),
      desc: tf('text9')
    },
    {
      title: tf('text10'),
      desc: tf('text11')
    },
    {
      title: tf('text12'),
      desc: tf('text13')
    },
    {
      title: tf('text14'),
      desc: tf('text15')
    },
    {
      title: tf('text16'),
      desc: tf('text17')
    }
  ]

  const listCommon = [tf('text18'), tf('text19'), tf('text20'), tf('text21'), tf('text22'), tf('text23'), tf('text24')]

  const listNoice = [
    {
      title: tt('text8'),
      children: [{ text: tt('canhBao') }, { text: tt('text10') }, { text: tt('forever') }]
    },
    {
      title: tt('text12'),
      children: [{ text: tt('canhBao') }, { text: tt('text10') }, { text: tt('forever') }]
    }
  ]
  const listNoiceClone: IAccordionCustom[] = [
    {
      title: tt('text8'),
      children: [tt('canhBao'), tt('text10'), tt('forever')]
    },
    {
      title: tt('text12'),
      children: [tt('canhBao'), tt('text10'), tt('forever')]
    }
  ]

  return (
    <div className='ct-container flex flex-col gap-[48px] pb-[100px] pt-[70px] lg:gap-[100px] 3xl:pt-[80px]'>
      <div className='mt-[48px] flex flex-col gap-6'>
        <ListBreadcrumbs list={listBreadcrumb} />
        <div className='flex flex-col gap-2'>
          <div className='size-full'>
            <ImageFallback src={'/formal-dress-code/formal-dress-code.png'} alt='/formal-dress-code/formal-dress-code.png' height={3000} width={3000} className='size-full rounded-xl object-cover' />
          </div>
          <div className='*: flex flex-col gap-5 *:text-base'>
            <h1 className='mt-0 text-2xl !font-bold uppercase md:mt-5 md:!text-4xl'>{tf('text25')}</h1>
            <p>{tf('text26')}</p>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h2 className='text-base font-bold md:text-2xl'> {tf('text27')}:</h2>
          <ul className='*: list-inside list-decimal *:text-sm *:md:text-base'>
            {listFormal.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <p> {tf('text28')}</p>
        <div className='grid items-center justify-center gap-5'>
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div key={index} className=' lg:max-w-[800px]'>
                <ImageFallback src={`/formal-dress-code/rule-${index + 1}.png`} alt='' height={1000} width={1000} className='size-full rounded-xl object-contain' />
              </div>
            ))}
        </div>
      </div>
      <div className='flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#0D308C]/90 to-[#041B57] p-4 lg:px-0 lg:py-[100px]'>
        <div className='flex flex-col items-center gap-6 md:gap-[48px]'>
          <div className='flex max-w-[680px] flex-col items-center gap-4'>
            <h3 className='text-white lg:text-2xl'> {tf('text29')}</h3>
            <p className='text-center text-sm  text-white lg:text-base'>
              {tf('text30')}{' '}
              <Link target='_blank' href={'https://vuatho.com/vi/store'} className='font-semibold text-primary-yellow underline'>
                https://vuatho.com/vi/store
              </Link>{' '}
              {tf('text31')}.
            </p>
          </div>
          <Link href={`/${locale}/store`}>
            <Button className='flex min-h-[60px] items-center justify-center rounded-xl bg-primary-yellow px-6 text-base font-semibold'>{tn('store')}</Button>
          </Link>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <p className='text-lg font-bold lg:text-2xl'> {tf('text32')}</p>
        <div className='grid gap-4 md:grid-cols-3 md:gap-5'>
          {listDetailFormal?.map((item, index) => (
            <div className={`${listDetailFormal?.length - 1 === index ? 'md:col-span-2' : 'col-span-1'} flex flex-col gap-4 rounded-xl bg-[#f8f8f8] p-4`} key={item.title}>
              <h4 className='font-bold'>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <p className='text-lg font-bold lg:text-2xl'> {tf('text33')}</p>
        <ul className='*: list-inside list-disc pl-2'>{listCommon?.map((item) => <li key={item}>{item}</li>)}</ul>
        <div className='hidden flex-col gap-2 md:flex'>
          <div className='mt-2 grid grid-cols-2 gap-5'>
            <p className='text-xl font-bold uppercase text-primary-blue'>{tt('text66')}</p>
            <div className='*font-bold grid grid-cols-3 text-xl'>
              <p>{tt('text5')}</p>
              <p>{tt('text6')}</p>
              <p>{tt('text7')}</p>
            </div>
          </div>
          {listNoice.map((item, index) => (
            <div key={item.title} className='grid grid-cols-2 gap-5 rounded-xl bg-[#f8f8f8] p-4'>
              <div>
                <span className='font-bold'>1.{index + 1}</span>
                <span> {item.title}</span>
              </div>
              {ShouldRenderGrid(item.children)}
            </div>
          ))}
        </div>
        <div className='md:hidden'>
          <AccordionCustom data={listNoiceClone} />
        </div>
        <Regards />
      </div>
    </div>
  )
}

export default FormalDressCode
