'use client'

import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { ArrowRight2 } from 'iconsax-react'
import ImageFallback from '../ImageFallback'

type Props = {
  item: any
  style?: string
}

const Article = ({ item, style, index }: Props & { index: number }) => {
  const locale = useLocale()
  const t = useTranslations('RuleOfBehavior')
  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2 * index }}
      viewport={{ once: true }}
      className={twMerge('group flex w-full flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-[0px_4px_8px_0px_#50505029]', style)}
    >
      <Link href={`/${locale}/${item?.slug}`} className='h-[150px] w-full overflow-hidden object-contain transition hover:scale-105 lg:h-[200px]'>
        <ImageFallback loading='lazy' src={item?.thumb} alt='Article image' height={210} width={350} className={`h-full w-full object-cover transition`} />
      </Link>
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex items-center justify-between text-sm'>
          <Link
            href={`/${locale}/press/${item?.category?.slug}`}
            dangerouslySetInnerHTML={{ __html: !!item?.custom_label?.length ? item?.custom_label : item?.category?.title }}
            className='hover:/80 text-sm  text-[#6a6a6a] hover:cursor-pointer'
          />
          <Link href={`/${locale}/${item?.slug}`}>
            <time className='text-sm  text-[#6a6a6a]'>{item?.created_at}</time>
          </Link>
        </div>
        <Link href={`/${locale}/${item?.slug}`} className='line-clamp-2 text-base font-semibold lg:text-lg' title={item?.title}>
          {item?.title}
        </Link>
        {/* <div className='line-clamp-3 text-lg  text-[#6a6a6a]' dangerouslySetInnerHTML={{ __html: item?.short_description }} /> */}
        {/* khang */}
        <Link href={`/${locale}/${item?.slug}`}>
          <p className='text-right font-semibold text-primary-yellow'>{t('text57')}</p>
        </Link>
      </div>
    </motion.div>
  )
}

export const ArticleOtherUrl = ({ item, style, index }: Props & { index: number }) => {
  const t = useTranslations('RuleOfBehavior')

  return (
    <div className={style}>
      <Link href={item?.redirect_url} target='_blank'>
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 * index }}
          viewport={{ once: true }}
          className={twMerge('group flex w-full flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-[0px_4px_8px_0px_#50505029]')}
        >
          <ImageFallback
            loading='lazy'
            src={item?.thumb}
            alt='Article image'
            height={210}
            width={350}
            className='h-[150px] w-full min-w-[350px] overflow-hidden object-contain transition hover:scale-105 lg:h-[200px]'
          />
          <div className='flex flex-col gap-4 p-4'>
            <div className='flex items-center justify-between text-sm'>
              <p dangerouslySetInnerHTML={{ __html: !!item?.custom_label?.length ? item?.custom_label : item?.category?.title }} className='hover:/80 text-sm  text-[#6a6a6a] hover:cursor-pointer' />
              <time className='text-sm  text-[#6a6a6a]'>{item?.created_at}</time>
            </div>
            <p className='line-clamp-2 text-base font-semibold lg:text-lg'>{item?.title}</p>
            {/* <div className='line-clamp-3 text-lg  text-[#6a6a6a]' dangerouslySetInnerHTML={{ __html: item?.short_description }} /> */}
            <p className='text-right font-semibold text-primary-yellow'>{t('text57')}</p>
          </div>
        </motion.div>
      </Link>
    </div>
  )
}

export const ArticleFollowCommunication = ({ item, style }: Props) => {
  const t = useTranslations('PressComunication')

  return (
    <Link href={item?.redirect_url} target='_blank'>
      <div className={twMerge('group flex w-full flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg border-[0.5px] border-black/5 bg-white shadow-[0px_4px_8px_0px_#50505029]', style)}>
        <div className='px-10 pt-5'>
          <ImageFallback loading='lazy' src={item?.thumb} alt='Article image' height={210} width={350} className='h-[100px] w-full overflow-hidden object-contain transition group-hover:scale-105' />
        </div>
        <div className='flex flex-col gap-4 p-4 pt-0'>
          <div className='flex items-center justify-between text-sm'>
            {/* <p dangerouslySetInnerHTML={{ __html: !!item?.label?.length ? item?.label : item?.category?.title }} className='hover:/80   hover:cursor-pointer text-[#6a6a6a]' /> */}
          </div>
          <p className='line-clamp-1 text-base font-semibold' title={item?.title}>
            {item?.title}
          </p>
          <div className=' mt-[10px] flex items-center justify-center gap-1 text-[#A6A6A6]'>
            <p>{t('text3')}</p>
            <ArrowRight2 color='#A6A6A6' size={24} />
          </div>
          {/* <p className='text-right font-semibold text-primary-yellow'>{t('text57')}</p> */}
        </div>
      </div>
    </Link>
  )
}

export default memo(Article)
