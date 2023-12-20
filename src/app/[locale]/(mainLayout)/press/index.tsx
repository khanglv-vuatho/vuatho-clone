'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { BreadcrumbWithUrl } from '@/interface'
import instance from '@/services/axiosConfig'

import { ImageSkeleton } from '@/components/Icons'
import Article from '@/components/article'
import { ListBreadcrumbsForDetailPress } from '@/components/breadcrumbs'
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

interface IMostViewed {
  isHidden?: boolean
  dataDefault: any
  onLoading: boolean
  onFetching: boolean
}

export const MostViewed: React.FC<IMostViewed> = ({
  isHidden,
  dataDefault,
  onLoading,
  onFetching,
}) => {
  const t = useTranslations('Press')
  const locale = useLocale()

  return (
    <>
      <div className='flex flex-col gap-[16px]'>
        <h4 className=' flex h-[58px] items-center border-b-4 border-[#FCB713] text-[2rem] font-semibold'>
          {t('popular')}
        </h4>
        <div
          className={`grid-cols-1 gap-[16px]  ${
            isHidden
              ? 'hidden !grid-cols-1 lg:grid lg:grid-cols-2'
              : 'grid md:grid-cols-2 lg:grid-cols-1'
          }`}
        >
          {onFetching || onLoading ? (
            Array(4)
              .fill(1)
              .map((item: any, index: number) => (
                <div className='flex items-center' key={index}>
                  <Skeleton className='h-[130px] w-[165px] flex-shrink-0'>
                    <ImageSkeleton />
                  </Skeleton>
                  <div className='flex w-full flex-col gap-[8px] p-[16px]'>
                    <Skeleton className='h-[12px] w-[50px] rounded-[4px]' />
                    <Skeleton className='h-[12px] w-[70px] rounded-[4px]' />
                    <Skeleton className='h-[12px] w-full rounded-[4px]' />
                    <Skeleton className='h-[12px] w-full rounded-[4px]' />
                  </div>
                </div>
              ))
          ) : dataDefault?.length > 0 ? (
            dataDefault?.map((item: any, index: number) => {
              if (index > 4) return
              return (
                <Link
                  href={`/${locale}/${item.slug}`}
                  title={item.title}
                  key={item.title}
                  className='block'
                >
                  <div className='group grid grid-cols-5 items-center bg-white'>
                    <div className='col-span-2 h-full min-h-[130px] w-full overflow-hidden'>
                      <ImageFallback
                        alt='blog'
                        src={item?.thumb}
                        width={256}
                        height={202}
                        className='h-full w-full object-cover transition group-hover:scale-[1.1]'
                      />
                    </div>
                    <div className='col-span-3 flex h-full flex-col justify-center gap-[4px] p-[16px]'>
                      <Link
                        href={`/${locale}/press/${item.category.slug}`}
                        className='mb-[4px] block text-[1.5rem] text-primary-blue'
                      >
                        {item.category.name}
                      </Link>
                      <time className='text-[1.5rem] text-base-drak-gray'>
                        {item.created_at}
                      </time>
                      <h5 className='mt-[8px] line-clamp-2 h-fit text-[1.8rem] font-semibold leading-[1] text-base-black-1'>
                        {item.title}
                      </h5>
                    </div>
                  </div>
                </Link>
              )
            })
          ) : (
            <div className=''>{t('errorNetwork')}</div>
          )}
        </div>
      </div>
    </>
  )
}

export const PressContent = ({ searchParams }: { searchParams: any }) => {
  const t = useTranslations('listBreadcrumbs')
  const td = useTranslations('Press')

  const [onFetching, setOnFetching] = useState<boolean>(false)
  const [onLoading, setOnLoading] = useState<boolean>(true)
  const [onFetchingMostView, setOnFetchingMostView] = useState<boolean>(false)
  const [onLoadingMostView, setOnLoadingMostView] = useState<boolean>(true)
  const [listBlog, setListBlog] = useState<any>([])
  const [listMostView, setListMostView] = useState<any>([])
  const [meta, setMeta] = useState<{
    limit: number
    page: number
    totalPages: number
    total: number
  }>({
    limit: 6,
    page: 1,
    totalPages: 1,
    total: 0,
  })

  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()

  const listBreadcrumbs: BreadcrumbWithUrl[] = [
    { title: t('home'), url: '/' },
    { title: t('acrticle') },
  ]

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
          },
        })
        console.log('goi lai tag')

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
      const data: any = searchParams.search
        ? await instance.get('/blog/search', {
            params: {
              keyword: searchParams.search,
              page: meta.page,
              lang: locale,
            },
          })
        : await instance.get('/blog/newest', {
            // params: {
            //   page: meta.page,
            // },
          })
      setListBlog(data.data)
      setMeta(
        data?.meta || {
          limit: 6,
          page: 1,
          totalPages: 1,
          total: 0,
        },
      )
      console.log('chay lai api')
    } catch (error) {
      console.log(error)
      setListBlog([
        {
          id: 9,
          uuid: '3dc2baa1-8e58-4ea5-85f1-f2ef79c039a4',
          thumb:
            'https://sandbox-api-cms.vuatho.com/statics/blog/thumbs/9.jpg?cache=1701240176325',
          title: 'test-3',
          slug: 'press/tin-tuc/test-3',
          short_description: 'asdasdas',
          category: {
            title: 'Tin tức',
            slug: 'tin-tuc',
          },
          thumbnail: null,
          created_at: '29-11-2023',
        },
        {
          id: 8,
          uuid: 'fde75cfd-a873-49db-9daf-7851cd889080',
          thumb:
            'https://sandbox-api-cms.vuatho.com/statics/blog/thumbs/8.jpg?cache=1701240175945',
          title: 'test-2',
          slug: 'press/tin-tuc/test-2',
          short_description: 'asdasdas',
          category: {
            title: 'Tin tức',
            slug: 'tin-tuc',
          },
          thumbnail: null,
          created_at: '29-11-2023',
        },
        {
          id: 7,
          uuid: '85e8b72d-05ed-4cab-9605-262ef7ee257a',
          thumb:
            'https://sandbox-api-cms.vuatho.com/statics/blog/thumbs/7.jpg?cache=1701240174445',
          title: 'test-1',
          slug: 'press/tin-tuc/test-1',
          short_description: 'asdasdas',
          category: {
            title: 'Tin tức',
            slug: 'tin-tuc',
          },
          thumbnail: null,
          created_at: '29-11-2023',
        },
      ])
    } finally {
      setOnFetching(false)
      setOnLoading(false)
    }
  }

  useEffect(() => {
    searchParams.page && !isNaN(Number(searchParams?.page))
      ? setMeta((prev: any) => ({ ...prev, page: Number(searchParams.page) }))
      : router.push(`${pathname}?page=1`)
  }, [searchParams.page])

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
  }, [searchParams.search, meta.page])

  const handleChangePagi = (page: number) => {
    // setMeta((prev: any) => ({ ...prev, page }))
    router.push(`${pathname}?page=${page}`)
  }

  return (
    <>
      {/* <div className='w-full'>
        <SwiperPress renderBreadcums={<ListBreadcrumbs list={listBreadcrumbs} />} />
      </div> */}

      <div className='bg-base-gray py-[24px]'>
        <div className='ct-container-70 space-y-[16px]'>
          <ListBreadcrumbsForDetailPress list={listBreadcrumbs} />
          <div className='grid grid-cols-6 lg:gap-[20px]'>
            <h3 className='col-span-6 flex h-[58px] items-center text-[2.4rem]  font-semibold  lg:col-span-2'>
              BLOG
            </h3>
            <div className='relative col-span-6 lg:col-span-4'>
              <InputSearch onRefresh={setOnFetching} />
            </div>
          </div>
          <div className='grid grid-cols-6 lg:gap-[20px]'>
            <div className='order-1 col-span-6 flex flex-col gap-[16px] lg:order-none lg:col-span-2'>
              <MostViewed
                isHidden
                dataDefault={listMostView}
                onFetching={onFetchingMostView}
                onLoading={onLoadingMostView}
              />
              <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:hidden'>
                {onFetching || onLoading ? (
                  Array(4)
                    .fill(null)
                    .map((item: any, index: number) => <SkeletonBlog key={index} />)
                ) : !!listMostView.length ? (
                  listMostView.map((item: any, index: number) => (
                    <div key={item.id}>
                      <Article item={item} />
                    </div>
                  ))
                ) : (
                  <p className='font-light text-[#969696]'>{td('oops')}</p>
                )}
              </div>
            </div>
            <div className='order-none col-span-6 flex flex-col gap-[16px] lg:order-1 lg:col-span-4'>
              <h4 className=' flex h-[58px] flex-shrink-0 items-center border-b-4 border-primary-blue text-[2rem] font-semibold'>
                {searchParams.search
                  ? `${td('result')} "${searchParams.search}"`
                  : pathname.split('/').length === 4
                    ? listBlog?.[0]?.category?.title
                      ? listBlog?.[0]?.category?.title
                      : td('notFound')
                    : td('newest')}
              </h4>
              {onFetching || onLoading ? (
                <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2'>
                  {Array(4)
                    .fill(null)
                    .map((item: any, index: number) => (
                      <SkeletonBlog key={index}></SkeletonBlog>
                    ))}
                </div>
              ) : !!listBlog?.length ? (
                <>
                  <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2'>
                    {listBlog.map((item: any, index: number) => (
                      <Article key={item.id} item={item} />
                    ))}
                  </div>
                  <div className='flex items-center justify-center'>
                    <PaginationNextUI
                      radius='full'
                      onChange={(page) => {
                        handleChangePagi(page)
                      }}
                      total={meta.totalPages || 1}
                      page={meta.page}
                      classNames={{
                        cursor: 'h-[44px] w-[44px] text-[1.6rem] bg-[#282828] text-white',
                        item: 'h-[44px] w-[44px] text-[1.6rem] text-[#282828] bg-white',
                      }}
                    />
                  </div>
                </>
              ) : (
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
                  <p className='font-light text-[#969696]'>{td('oops')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const SwiperPress = React.memo(({ renderBreadcums }: { renderBreadcums: any }) => {
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
          titleLink: 'Xem ngay',
        },
        {
          title: 'Áo tay dài tăng thêm phong cách chuyên nghiệp',
          img: '/',
          url: '#',
          titleLink: 'Xem ngay',
        },
        {
          title: 'Trang phục chuyên nghiệp cho thợ tự tin hơn khi làm việc',
          img: '/',
          url: '#',
          titleLink: 'Xem ngay',
        },
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
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          navigation
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          className='pressSwiper w-full'
        >
          {slidersData?.map((item: any, index: number) => (
            <SwiperSlide key={index} className=''>
              <Image
                src={'/press/pressBanner1.png'}
                alt=''
                height={419}
                width={3000}
                className={`absolute h-full rotate-180 object-cover`}
              />
              <div className='relative inset-0 h-[420px]'>
                <div className='ct-container-70 relative flex h-full flex-col p-12'>
                  <div className='max-w-[50%] space-y-6'>
                    {renderBreadcums ? renderBreadcums : <div />}
                    <h1 className='text-[2.4rem] font-semibold text-white md:text-[3.2rem]'>
                      {item.title}
                    </h1>

                    <Link href={item.url || ''}>
                      <Button
                        type='button'
                        className='h-[46px] max-w-max rounded-full bg-[#FCB713] px-[24px] text-[1.8rem] font-semibold text-base-black-1'
                      >
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
SwiperPress.displayName = 'SwiperPress'
