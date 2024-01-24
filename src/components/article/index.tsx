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
      <Link href={`/${locale}/${item.slug}`} className='h-[206px] w-full overflow-hidden transition hover:scale-105'>
        <ImageFallback src={item.thumb} alt='Article image' height={406} width={800} priority className='h-full w-full object-cover transition' />
      </Link>
      <div className='flex flex-col gap-[8px] p-[16px]'>
        <div className='flex items-center justify-between text-[1.4rem]'>
          <Link href={`/${locale}/press/${item.category.slug}`} className='hover:/80 text-[1.5rem] font-light hover:cursor-pointer'>
            {item.category.title}
          </Link>
          <Link href={`/${locale}/${item.slug}`}>
            <time className='text-[1.5rem] font-light text-base-drak-gray'>{item.created_at}</time>
          </Link>
        </div>
        <Link href={`/${locale}/${item.slug}`} className='text-[1.8rem] font-semibold'>
          {item.title}
        </Link>
        <p className='line-clamp-3 text-[1.8rem] font-light text-base-drak-gray'>{item.short_description}</p>
      </div>
    </motion.div>
  )
}

export default memo(Article)
