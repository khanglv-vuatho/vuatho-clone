'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useState, useCallback, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import { ArticleFollowCommunication } from '@/components/article'
import { SkeletonBlog } from '@/components/skeleton'
import instance from '@/services/axiosConfig'

import 'swiper/css'
import 'swiper/css/pagination'

const OtherPress = () => {
  const t = useTranslations('PressComunication')
  const [listArticleFollowCommunication, setListArticleFollowCommunication] = useState([])
  const [listArticleFollowCommunicationVideo, setListArticleFollowCommunicationVideo] = useState([])
  const [onFetching, setOnFetching] = useState(false)
  const [mounted, setMounted] = useState(false)

  const locale = useLocale()
  const serverFetching = useCallback(async () => {
    try {
      const { data } = await instance.get('/communication-activities')
      const { data: videoData } = await instance.get('/communication-activities', {
        params: {
          type: 1
        }
      })
      setListArticleFollowCommunication(data)
      setListArticleFollowCommunicationVideo(videoData)
    } catch (error) {
      console.log(error)
      setOnFetching(false)
    } finally {
      setOnFetching(false)
    }
  }, [locale])

  useEffect(() => {
    onFetching && serverFetching()
  }, [onFetching])

  useEffect(() => {
    setOnFetching(true)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className='ct-container flex flex-col gap-5'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm font-bold uppercase text-primary-yellow md:text-xl'>{t('text')}</p>
        <h2 className='text-2xl font-bold uppercase text-primary-blue lg:text-4xl'>{t('heading')}</h2>
      </div>
      <>
        {mounted ? (
          <>
            {!!listArticleFollowCommunicationVideo?.length ? (
              <>
                <p className='text-xl font-semibold'>{t('text1')}</p>
                <SwipperBlog data={listArticleFollowCommunicationVideo} />
              </>
            ) : (
              <></>
            )}
            {!!listArticleFollowCommunication?.length ? (
              <>
                <p className='text-xl font-semibold'>{t('text2')}</p>
                <SwipperBlog data={listArticleFollowCommunication} />
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <div className='flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden p-1'>
            {Array(4)
              .fill(null)
              .map((_, index) => {
                return (
                  <div className='w-[80%] min-w-[250px] md:w-[40%] lg:w-full' key={`skeleton-listOtherPress-${index}`}>
                    <SkeletonBlog />
                  </div>
                )
              })}
          </div>
        )}
      </>
    </div>
  )
}

const SwipperBlog = ({ data }: { data: any }) => {
  return (
    <Swiper
      breakpoints={{
        300: {
          slidesPerView: 1.5
        },
        600: {
          slidesPerView: 2.5
        },
        1024: {
          slidesPerView: 4
        }
      }}
      spaceBetween={20}
      modules={[Pagination]}
      pagination={{
        clickable: true
      }}
      className={'swipperListOtherPress z-[5] h-full w-full overflow-x-hidden'}
    >
      {data.map((item: any) => (
        <SwiperSlide key={item?.id} className='p-[2px] pb-8'>
          <ArticleFollowCommunication item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default OtherPress
