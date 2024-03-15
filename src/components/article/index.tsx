'use client'

import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { memo } from 'react'

import ImageFallback from '../ImageFallback'

const Article = ({ item, style, index }: { item: any; style?: string; index: number }) => {
  const locale = useLocale()

  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2 * index }}
      viewport={{ once: true }}
      className={twMerge('group flex w-full flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-[8px] bg-white shadow-[0px_4px_8px_0px_#50505029]', style)}
    >
      <Link href={`/${locale}/${item?.slug}`} className='h-[150px] w-full overflow-hidden object-contain transition hover:scale-105 lg:h-[200px]'>
        <ImageFallback loading='lazy' src={item?.thumb} alt='Article image' height={210} width={350} className={`h-full w-full object-cover transition`} />
      </Link>
      <div className='flex flex-col gap-[8px] p-[16px]'>
        <div className='flex items-center justify-between text-[1.4rem]'>
          <Link
            href={`/${locale}/press/${item?.category?.slug}`}
            dangerouslySetInnerHTML={{ __html: !!item?.custom_label?.length ? item?.custom_label : item?.category?.title }}
            className='hover:/80 text-[1.5rem] font-light hover:cursor-pointer'
          />
          <Link href={`/${locale}/${item?.slug}`}>
            <time className='text-[1.5rem] font-light text-base-drak-gray'>{item?.created_at}</time>
          </Link>
        </div>
        <Link href={`/${locale}/${item?.slug}`} className='line-clamp-2 text-[1.8rem] font-semibold' title={item?.title}>
          {item?.title}
        </Link>
        <div className='line-clamp-3 text-[1.8rem] font-light text-base-drak-gray' dangerouslySetInnerHTML={{ __html: item?.short_description }} />
      </div>
    </motion.div>
  )
}

export const ArticleOtherUrl = ({ item, style, index }: { item: any; style?: string; index: number }) => {
  return (
    <div className={style}>
      <Link href={item?.redirect_url} target='_blank'>
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 * index }}
          viewport={{ once: true }}
          className={twMerge('group flex w-full flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-[8px] bg-white shadow-[0px_4px_8px_0px_#50505029]')}
        >
          <ImageFallback
            loading='lazy'
            src={item?.thumb}
            alt='Article image'
            height={210}
            width={350}
            className='h-[150px] w-full min-w-[350px] overflow-hidden object-contain transition hover:scale-105 lg:h-[200px]'
          />
          <div className='flex flex-col gap-[8px] p-[16px]'>
            <div className='flex items-center justify-between text-[1.4rem]'>
              <p dangerouslySetInnerHTML={{ __html: !!item?.custom_label?.length ? item?.custom_label : item?.category?.title }} className='hover:/80 text-[1.5rem] font-light hover:cursor-pointer' />
              <time className='text-[1.5rem] font-light text-base-drak-gray'>{item?.created_at}</time>
            </div>
            <p className='line-clamp-2 text-[1.8rem] font-semibold'>{item?.title}</p>
            <div className='line-clamp-3 text-[1.8rem] font-light text-base-drak-gray' dangerouslySetInnerHTML={{ __html: item?.short_description }} />
          </div>
        </motion.div>
      </Link>
    </div>
  )
}

export const ArticleFollowCommunication = ({ item, style }: { item: any; style?: string }) => {
  return (
    <Link href={item?.redirect_url} target='_blank'>
      <div
        className={twMerge('group flex w-full flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-[8px] border-[0.5px] border-black/5 bg-white shadow-[0px_4px_8px_0px_#50505029]', style)}
      >
        <div className='px-[40px] pt-[20px]'>
          <ImageFallback loading='lazy' src={item?.thumb} alt='Article image' height={210} width={350} className='h-[100px] w-full overflow-hidden object-contain transition group-hover:scale-105' />
        </div>
        <div className='flex flex-col gap-[8px] p-[16px] pt-0'>
          <div className='flex items-center justify-between text-[1.4rem]'>
            {/* <p dangerouslySetInnerHTML={{ __html: !!item?.label?.length ? item?.label : item?.category?.title }} className='hover:/80 text-[1.5rem] font-light hover:cursor-pointer' /> */}
          </div>
          <p className='line-clamp-2 text-[1.8rem] font-semibold' title={item?.title}>
            {item?.title}
          </p>
          <time className='block text-right text-[1.5rem] font-light text-base-drak-gray'>{item?.created_at}</time>
        </div>
      </div>
    </Link>
  )
}

export default memo(Article)
