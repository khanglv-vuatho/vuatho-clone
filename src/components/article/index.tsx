'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { memo } from 'react'

import ImageFallback from '../ImageFallback'

const Article = memo(({ item, style }: { item: any; style?: string }) => {
  const locale = useLocale()

  return (
    <Link
      href={`/${locale}/${item.slug}`}
      className={twMerge('group flex w-full flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-[8px] bg-white shadow-[0px_4px_8px_0px_#50505029]', style)}
    >
      <div className='h-[206px] w-full overflow-hidden transition hover:scale-105'>
        <ImageFallback src={item.thumb} alt='Article image' height={406} width={800} quality={100} className='h-full w-full object-cover transition' />
      </div>
      <div className='flex flex-col gap-[8px] p-[16px]'>
        <div className='flex items-center justify-between text-[1.4rem]'>
          <Link href={`/${locale}/press/${item.category.slug}`} className='text-[1.5rem] font-light hover:cursor-pointer hover:text-base-black-1/80'>
            {item.category.title}
          </Link>
          <time className='text-[1.5rem] font-light text-base-drak-gray'>{item.created_at}</time>
        </div>
        <h3 className='text-[1.8rem] font-semibold'>{item.title}</h3>
        <p
          className='line-clamp-3 text-[1.8rem] font-light text-base-drak-gray'
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {item.short_description}
        </p>
      </div>
    </Link>
  )
})

export default Article
