'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { memo, useEffect, useState } from 'react'

import { IBreadcrumbWithUrl, IMostViewed } from '@/interface'
import instance from '@/services/axiosConfig'

import { ImageSkeleton } from '@/components/Icons'
import Article from '@/components/article'
import { ListBreadcrumbs } from '@/components/breadcrumbs'
import { InputSearch } from '@/components/input'
import { SkeletonBlog } from '@/components/skeleton'

import ImageFallback from '@/components/ImageFallback'
import { Button, Pagination as PaginationNextUI, Skeleton } from '@nextui-org/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import './pressSwiper.scss'
import { useGetAllQueryParams } from '@/hook/useGetAllQueryParams'

export const MostViewed: React.FC<IMostViewed> = memo(({ isHidden, dataDefault, onLoading, onFetching }) => {
  const t = useTranslations('Press')
  const locale = useLocale()

  return (
    <>
      <div className='flex flex-col gap-4'>
        <h4 className=' flex h-[58px] items-center border-b-4 border-[#FCB713] text-xl font-semibold'>{t('popular')}</h4>
        <div className={`grid-cols-1 gap-4  ${isHidden ? 'hidden !grid-cols-1 lg:grid lg:grid-cols-2' : 'grid md:grid-cols-2 lg:grid-cols-1'}`}>
          {onFetching || onLoading ? (
            Array(4)
              .fill(1)
              .map((_, index) => (
                <div className='flex items-center' key={index}>
                  <Skeleton className='h-[130px] w-[165px] flex-shrink-0'>
                    <ImageSkeleton />
                  </Skeleton>
                  <div className='flex w-full flex-col gap-2 p-4'>
                    <Skeleton className='h-3 w-[50px] rounded-md' />
                    <Skeleton className='h-3 w-[70px] rounded-md' />
                    <Skeleton className='h-3 w-full rounded-md' />
                    <Skeleton className='h-3 w-full rounded-md' />
                  </div>
                </div>
              ))
          ) : dataDefault?.length > 0 ? (
            dataDefault?.map((item: any, index: number) => {
              if (index > 4) return
              return (
                <div title={item.title} key={item.title} className='block'>
                  <div className='group grid grid-cols-5 items-center bg-white'>
                    <Link href={`/${locale}/${item.slug}`} className='col-span-2 h-full min-h-[130px] w-full overflow-hidden'>
                      <ImageFallback alt='blog' src={item?.thumb} width={256} height={202} className='h-full w-full object-cover transition group-hover:scale-[1.1]' />
                    </Link>
                    <div className='col-span-3 flex h-full flex-col justify-center gap-1 p-4'>
                      <Link href={`/${locale}/press/${item.category.slug}`} className='mb-1 block  text-primary-blue'>
                        {item.category.name}
                      </Link>
                      <time className=' text-base-drak-gray'>{item.created_at}</time>
                      <Link href={`/${locale}/${item.slug}`} className='mt-2 line-clamp-2 h-fit text-lg font-semibold'>
                        {item.title}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div>{t('errorNetwork')}</div>
          )}
        </div>
      </div>
    </>
  )
})

export const PressContent = memo(({ searchParams }: { searchParams: any }) => {
  const t = useTranslations('listBreadcrumbs')
  const td = useTranslations('Press')

  const [onFetching, setOnFetching] = useState<boolean>(false)
  const [onLoading, setOnLoading] = useState<boolean>(true)
  const [onFetchingMostView, setOnFetchingMostView] = useState<boolean>(false)
  const [onLoadingMostView, setOnLoadingMostView] = useState<boolean>(true)
  const [listBlog, setListBlog] = useState<any>([])
  const [listMostView, setListMostView] = useState<any>([])
  const [meta, setMeta] = useState<any>({})

  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()

  const listBreadcrumbs: IBreadcrumbWithUrl[] = [{ title: t('home'), url: '/' }, { title: t('acrticle') }]

  const allQueryParams: any = useGetAllQueryParams()
  const pageParams = allQueryParams.page

  console.log({ pageParams, meta })

  const _serverFetchingMostView = async () => {
    try {
      const data = await instance.get(`/blog/mostViewByWeek?lang=${locale}`)
      setListMostView(data)
    } catch (error) {
      console.log(error)
    } finally {
      setOnFetchingMostView(false)
      setOnLoadingMostView(false)
    }
  }

  const _handleFetchingBlogByTag = async () => {
    if (pathname.split('/').length === 4) {
      try {
        const { data } = await instance.get('blog/byCategory', {
          params: {
            slug: pathname.split('/')?.[3],
            lang: locale,
            page: pageParams || 1
          }
        })

        setListBlog(data)
      } catch (error) {
        console.log(error)
      } finally {
        setOnFetching(false)
        setOnLoading(false)
      }
    }
  }

  const _serverFetching = async () => {
    try {
      const data: any = !!searchParams?.search
        ? await instance.get('/blog/search', {
            params: {
              keyword: searchParams.search,
              page: meta.page,
              lang: locale
            }
          })
        : await instance.get(`/blog/newest?page=${Number(pageParams)}`)
      setListBlog(data?.data)
      setMeta({
        limit: data?.limit,
        totalPages: data?.totalPages,
        total: data?.total,
        page: Number(pageParams) || 1
      })
    } catch (error) {
      console.log(error)
    } finally {
      setOnFetching(false)
      setOnLoading(false)
    }
  }

  // useEffect(() => {
  //   pageParams && !isNaN(Number(searchParams?.page)) && setMeta((prev: any) => ({ ...prev, page: Number(pageParams) }))
  // }, [])

  useEffect(() => {
    onFetchingMostView && _serverFetchingMostView()
  }, [onFetchingMostView])

  useEffect(() => {
    setOnFetchingMostView(true)
  }, [])

  useEffect(() => {
    if (pathname.split('/').length === 4) {
      onFetching && _handleFetchingBlogByTag()
      return
    }
    onFetching && _serverFetching()
  }, [onFetching])

  useEffect(() => {
    setOnFetching(true)
  }, [])

  const handleChangePagi = (pagePagi: number) => {
    allQueryParams.page = pagePagi

    const queryString = Object.keys(allQueryParams)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(allQueryParams[key])}`)
      .join('&')

    console.log({ pagePagi })
    console.log({ queryString })
    console.log(`${pathname}?${queryString}`)

    router.push(`${pathname}?${queryString}`)
  }

  return (
    <>
      <div className='min-h-dvh bg-base-gray py-6'>
        <div className='ct-container space-y-4'>
          <ListBreadcrumbs list={listBreadcrumbs} />
          <div className='grid grid-cols-6 lg:gap-5'>
            <h3 className='col-span-6 flex h-[58px] items-center text-2xl  font-semibold  lg:col-span-2'>BLOG</h3>
            <div className='relative col-span-6 lg:col-span-4'>
              <InputSearch onRefresh={setOnFetching} />
            </div>
          </div>
          <div className='grid grid-cols-6 lg:gap-5'>
            <div className='order-1 col-span-6 flex flex-col gap-4 lg:order-none lg:col-span-2'>
              <MostViewed isHidden dataDefault={listMostView} onFetching={onFetchingMostView} onLoading={onLoadingMostView} />
              <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:hidden'>
                {onFetching || onLoading ? (
                  Array(4)
                    .fill(null)
                    .map((_, index) => <SkeletonBlog key={index} />)
                ) : !!listMostView.length ? (
                  listMostView.map((item: any, index: number) => <Article item={item} key={item.id} index={index} />)
                ) : (
                  <p className=' text-[#969696]'>{td('oops')}</p>
                )}
              </div>
            </div>
            <div className='order-none col-span-6 flex flex-col gap-4 lg:order-1 lg:col-span-4'>
              <h4 className=' flex h-[58px] flex-shrink-0 items-center border-b-4 border-primary-blue text-xl font-semibold'>
                {searchParams.search
                  ? `${td('result')} "${searchParams.search}"`
                  : pathname.split('/').length === 4
                    ? listBlog?.[0]?.category?.title
                      ? listBlog?.[0]?.category?.title
                      : td('notFound')
                    : td('newest')}
              </h4>
              {onFetching || onLoading ? (
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                  {Array(4)
                    .fill(null)
                    .map((_, index: number) => (
                      <SkeletonBlog key={index}></SkeletonBlog>
                    ))}
                </div>
              ) : !!listBlog?.length ? (
                <>
                  <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                    {listBlog.map((item: any, index: number) => (
                      <Article key={item.id} item={item} index={index} />
                    ))}
                  </div>
                  <div className='flex items-center justify-center'>
                    <PaginationNextUI
                      radius='full'
                      onChange={(page) => {
                        handleChangePagi(page)
                      }}
                      total={meta.totalPages || 1}
                      page={pageParams || meta.page}
                      classNames={{
                        cursor: 'h-[44px] w-[44px] text-base bg-[#282828] text-white',
                        item: 'h-[44px] w-[44px] text-base text-[#282828] bg-white'
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className='flex h-full min-h-[400px] w-full flex-col items-center justify-center'>
                  <div className='h-[126px] w-[158px]'>
                    <Image src={'/empty.webp'} alt='empty' height={126} width={158} className='h-full w-full object-contain' />
                  </div>
                  <p className=' text-[#969696]'>{td('oops')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

const SwiperPress = memo(({ renderBreadcums }: { renderBreadcums: any }) => {
  const [onFetching, setOnFetching] = useState(false)
  const [onLoading, setOnLoading] = useState(true)
  const [slidersData, setSliderData] = useState<any>([])

  const serverFetchingMostBlog = () => {
    try {
      setSliderData([
        {
          title: 'Quần dài thời gian cho Thợ',
          img: '/',
          url: '#',
          titleLink: 'Xem ngay'
        },
        {
          title: 'Áo tay dài tăng thêm phong cách chuyên nghiệp',
          img: '/',
          url: '#',
          titleLink: 'Xem ngay'
        },
        {
          title: 'Trang phục chuyên nghiệp cho Thợ tự tin hơn khi làm việc',
          img: '/',
          url: '#',
          titleLink: 'Xem ngay'
        }
      ])
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setOnFetching(false)
        setOnLoading(false)
      }, 500)
    }
  }

  useEffect(() => {
    onFetching && serverFetchingMostBlog()
  }, [onFetching])

  useEffect(() => {
    setOnFetching(true)
  }, [])

  return (
    <div>
      {onFetching || onLoading ? (
        <div className='flex h-[420px] w-full animate-pulse items-center justify-center bg-gray-300 '>
          <ImageSkeleton style='h-[120px] w-[300px] animate-pulse' />
        </div>
      ) : (
        <Swiper
          spaceBetween={30}
          effect={'fade'}
          loop
          autoHeight
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          slidesPerView={1}
          navigation
          pagination={{
            clickable: true
          }}
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          className='pressSwiper w-full'
        >
          {slidersData?.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <Image src={'/press/pressBanner1.webp'} alt='' height={419} width={3000} className={`absolute h-full rotate-180 object-cover`} />
              <div className='relative inset-0 h-[420px]'>
                <div className='ct-container relative flex h-full flex-col p-12'>
                  <div className='max-w-[50%] space-y-6'>
                    {renderBreadcums ? renderBreadcums : <div />}
                    <h1 className='text-2xl font-semibold text-white md:text-3xl'>{item.title}</h1>

                    <Link href={item.url || ''}>
                      <Button type='button' className='h-[46px] max-w-max rounded-full bg-[#FCB713] px-6 text-lg font-semibold '>
                        {item.titleLink}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
})
