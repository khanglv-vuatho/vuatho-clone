'use client'

import { ArrowRight2 } from 'iconsax-react'
import { useLocale, useTranslations } from 'next-intl'
import React, { useCallback, useEffect, useState } from 'react'

import ImageFallback from '@/components/ImageFallback'
import Article, { ArticleOtherUrl } from '@/components/article'
import { SkeletonBlog } from '@/components/skeleton'
import instance from '@/services/axiosConfig'
import Link from 'next/link'

const PressHome = () => {
  const t = useTranslations('PressHome')
  const locale = useLocale()

  const [onFetching, setOnFetching] = useState<boolean>()
  const [listBlog, setListBlog] = useState([])

  const serverFetching = useCallback(async () => {
    try {
      const { data } = await instance.get('/home/blogs', {
        params: {
          lang: locale
        }
      })
      setListBlog(data)
    } catch (error) {
      console.log(error)
      setOnFetching(false)
    } finally {
      setOnFetching(false)
    }
  }, [locale])

  useEffect(() => {
    onFetching && serverFetching()
  }, [onFetching, serverFetching])

  useEffect(() => {
    locale && setOnFetching(true)
  }, [locale])

  const items = [
    {
      id: 1,
      title: 'title',
      subtitle: 'subdsadas'
    },
    {
      id: 1,
      title: 'sda',
      subtitle: '1222'
    },
    {
      id: 1,
      title: '32112321',
      subtitle: '12212112'
    }
  ]
  return (
    <div className='ct-container z-10 mb-10 flex flex-col gap-5 md:pb-0'>
      <div className='flex flex-col items-center justify-between xs:flex-row'>
        <h2 className='text-2xl font-bold uppercase text-primary-blue lg:text-4xl'>{t('heading')}</h2>
        <Link href={`/${locale}/press`} className='group inline-flex items-center text-sm font-semibold xs:text-base lg:text-lg'>
          <p>{t('seeAll')}</p>
          <span className='transition group-hover:translate-x-2'>
            <ArrowRight2 />
          </span>
        </Link>
      </div>
      <div className='blog-home flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden p-1 lg:grid lg:grid-cols-4 lg:gap-5'>
        {onFetching ? (
          Array(4)
            .fill(null)
            .map((_, index: number) => (
              <div className='w-[80%] md:w-[40%] lg:w-full' key={`skeleton-blog-${index}`}>
                <SkeletonBlog />
              </div>
            ))
        ) : !!listBlog?.length ? (
          listBlog.map((item: any, index: number) => {
            return !!item?.redirect_url?.length ? (
              <ArticleOtherUrl key={index} index={index} item={item} style='block w-[80%] md:w-[40%] lg:w-full cursor-pointer' />
            ) : (
              <Article key={index} index={index} item={item} style='w-[80%] md:w-[40%] lg:w-full cursor-pointer' />
            )
          })
        ) : (
          <div className='col-span-4 flex w-full flex-col items-center gap-4'>
            <ImageFallback src={'/press/no-data.png'} alt='no-data' height={400} width={400} className='size-[200px] w-auto' />
            <p className='text-xl text-[#282828]'>{t('noData')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PressHome
