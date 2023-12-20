'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, usePathname } from 'next/navigation'

import instance from '@/services/axiosConfig'
import { BreadcrumbWithUrl } from '@/interface'
import { MostViewed } from '../..'

import { ListBreadcrumbsForDetailPress } from '@/components/breadcrumbs'
import { InputSearch } from '@/components/input'

import { Skeleton } from '@nextui-org/react'
import { useLocale, useTranslations } from 'next-intl'

function PressDetail() {
  const t = useTranslations('listBreadcrumbs')
  const td = useTranslations('DetailsPress')

  const paramsData = useParams()
  const pathname = usePathname()
  console.log(pathname)
  const locale = useLocale()

  const [onFetching, setOnFetching] = useState<boolean>(false)
  const [onLoading, setOnLoading] = useState<boolean>(true)
  const [onFetchingMostView, setOnFetchingMostView] = useState<boolean>(false)
  const [onLoadingMostView, setOnLoadingMostView] = useState<boolean>(true)
  const [isSuccess, setIsSuccess] = useState(false)

  const [listMostView, setListMostView] = useState<any>([])
  const [detailPress, setDetailPress] = useState<any>({})

  const listBreadcrumbs: BreadcrumbWithUrl[] = [
    { title: t('home'), url: '/' },
    { title: t('acrticle'), url: '/press' },
    { title: detailPress?.title },
  ]

  const ServerFetching = async () => {
    try {
      const data = await instance.get('/blog/detail', {
        params: {
          slug: paramsData.id,
          lang: paramsData.locale,
        },
      })
      setIsSuccess(data.status === 200)
      setDetailPress(data.data)
    } catch (error) {
      setOnFetching(false)
    } finally {
      setOnFetching(false)
      setOnLoading(false)
    }
  }

  const _serverFetchingMostView = async () => {
    try {
      const data = await instance.get('/blog/mostViewByWeek', {
        params: {
          lang: locale,
        },
      })
      setListMostView(data)
    } catch (error) {
      console.log(error)
    } finally {
      setOnFetchingMostView(false)
      setOnLoadingMostView(false)
    }
  }

  useEffect(() => {
    onFetchingMostView && _serverFetchingMostView()
  }, [onFetchingMostView])

  useEffect(() => {
    setOnFetchingMostView(true)
  }, [])

  useEffect(() => {
    onFetching && ServerFetching()
  }, [onFetching])

  useEffect(() => {
    paramsData.id && setOnFetching(true)
  }, [paramsData.id])

  return (
    <div className='bg-base-gray py-[104px]'>
      <div className=' ct-container-70 '>
        <div className='flex flex-col gap-[16px]'>
          <div className='grid grid-cols-6 lg:gap-[20px]'>
            <div className='relative col-span-6 lg:col-span-2'>
              <InputSearch onRefresh={setOnFetching} />
            </div>
            <div className='col-span-6 max-w-max rounded-full p-[17px] lg:col-span-4 lg:bg-white'>
              <ListBreadcrumbsForDetailPress list={listBreadcrumbs} />
            </div>
          </div>
          <div className='grid grid-cols-6 lg:gap-[20px]'>
            <div className='order-1 col-span-6 lg:order-none lg:col-span-2'>
              <MostViewed
                dataDefault={listMostView}
                onFetching={onFetchingMostView}
                onLoading={onLoadingMostView}
              />
            </div>
            <div className='order-none col-span-6 space-y-[16px] rounded-[16px] bg-white p-[16px] lg:order-1 lg:col-span-4'>
              {onFetching || onLoading ? (
                <div className='flex flex-col gap-[16px]'>
                  <Skeleton className='h-[32px] w-[140px] rounded-lg ' />
                  <div className='flex items-center gap-[16px]'>
                    <Skeleton className='h-[16px] w-[30px] rounded-lg ' />
                    <Skeleton className='h-[16px] w-[50px] rounded-lg ' />
                  </div>
                  <Skeleton className='h-[480px] w-full rounded-lg ' />
                  <Skeleton className='h-[32px] w-[140px] rounded-lg ' />
                  <div className='flex flex-col gap-[8px]'>
                    {Array(7)
                      .fill(null)
                      .map((item, index) => (
                        <Skeleton key={index} className='h-[16px] w-full rounded-lg ' />
                      ))}
                  </div>
                </div>
              ) : (
                <>
                  {!isSuccess ? (
                    <div className='flex h-full min-h-[400px] w-full flex-col items-center justify-center'>
                      <div className='h-[126px] w-[158px]'>
                        <Image
                          src={'/empty.png'}
                          alt='empty'
                          height={126}
                          width={158}
                          className='h-full w-full object-contain'
                        />
                      </div>
                      <p className='font-light text-[#969696]'>{td('oopsDetail')}</p>
                    </div>
                  ) : (
                    <>
                      <h1 className='text-[3.2rem] font-semibold text-base-black-1'>
                        {/* <Link href={`${detailPress?.slug}`}>{detailPress?.title}</Link> */}
                        {detailPress?.title}
                      </h1>
                      <div className='flex items-center gap-[16px]'>
                        <h3 className='text-base-black-1'>
                          <Link href={`/${paramsData.locale}/press/${detailPress?.category?.slug}`}>
                            {detailPress?.category?.name}
                          </Link>
                        </h3>
                        <time className='font-light text-base-drak-gray'>
                          {detailPress?.created_at}
                        </time>
                      </div>
                      <div
                        className='content-blog'
                        dangerouslySetInnerHTML={{ __html: detailPress?.content }}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PressDetail
