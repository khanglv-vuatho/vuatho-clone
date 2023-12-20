import { forwardRef } from '@nextui-org/react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import ImageFallback from '../ImageFallback'

const Article = forwardRef(({ item, style }: { item: any; style?: string }, ref) => {
  const locale = useLocale()

  return (
    <Link
      href={`/${locale}/${item.slug}`}
      ref={ref}
      className={twMerge(
        'group flex w-full flex-shrink-0 cursor-pointer flex-col bg-white',
        style,
      )}
    >
      <div className='h-[206px] w-full overflow-hidden'>
        <ImageFallback
          src={item.thumb}
          alt='Article image'
          height={406}
          width={800}
          quality={100}
          className='h-full w-full object-cover transition group-hover:scale-[1.1]'
        />
      </div>
      <div className='flex flex-col gap-[8px] p-[16px]'>
        <div className='flex items-center justify-between text-[1.4rem]'>
          <Link
            href={`/${locale}/press/${item.category.slug}`}
            className='text-[1.5rem] font-light text-[#f5b500] hover:cursor-pointer hover:text-[#f5b500]/80'
          >
            {item.category.title}
          </Link>
          <time className='text-[1.5rem] font-light text-base-drak-gray'>
            {item.created_at}
          </time>
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
