'use client'

import { memo, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import instance from '@/services/axiosConfig'
import { IBreadcrumbWithUrl } from '@/interface'
import { MostViewed } from '../..'

import { ListBreadcrumbs } from '@/components/breadcrumbs'
import { InputSearch } from '@/components/input'

import { Skeleton } from '@nextui-org/react'
import { useLocale, useTranslations } from 'next-intl'

function PressDetail() {
  const t = useTranslations('listBreadcrumbs')
  const td = useTranslations('DetailsPress')

  const paramsData = useParams()
  const locale = useLocale()

  const [onFetching, setOnFetching] = useState<boolean>(false)
  const [onLoading, setOnLoading] = useState<boolean>(true)
  const [onFetchingMostView, setOnFetchingMostView] = useState<boolean>(false)
  const [onLoadingMostView, setOnLoadingMostView] = useState<boolean>(true)
  const [isSuccess, setIsSuccess] = useState(false)

  const [listMostView, setListMostView] = useState<any>([])
  const [detailPress, setDetailPress] = useState<any>({})

  const [listImage, setListImage] = useState<{ key: string; url: string }[]>([])

  const [doneFetching, setDoneFetching] = useState<boolean>(false)

  const listBreadcrumbs: IBreadcrumbWithUrl[] = useMemo(() => {
    return [{ title: t('home'), url: '/' }, { title: detailPress?.category?.name, url: `/${locale}/press/${detailPress?.category?.slug}` }, { title: t('acrticle') }]
  }, [detailPress])

  const ServerFetching = async () => {
    try {
      const data = await instance.get('/blog/detail', {
        params: {
          slug: paramsData.id,
          lang: paramsData.locale
        }
      })
      setIsSuccess(data.status === 200)
      setDetailPress(data.data)

      const newListImage = !!data.data.attachments
        ? data.data.attachments.list_key.map((key: any, index: number) => {
            const url = data.data.attachments.list_image[index]
            return {
              key: key,
              url: url
            }
          })
        : []
      setListImage(newListImage)
      setDoneFetching(true)
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
          lang: locale
        }
      })
      setListMostView(data)
    } catch (error) {
      console.log(error)
    } finally {
      setOnFetchingMostView(false)
      setOnLoadingMostView(false)
    }
  }

  const decodeHtmlEntities = (content: string) => {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = content
    return textArea.value
  }

  const replaceKeywordsWithImages = (content: string, listUrlImg: { key: string; url: string }[]) => {
    console.log({ listUrlImg })
    content = decodeHtmlEntities(content)

    listUrlImg.forEach((item) => {
      const imgTag = `
        <div class="image-container" style="text-align: justify;" title="${item.key}" data-fancybox="group">
          <figure style="text-align: center;">
            <img class="img-fake" src="${item.url}" alt="${item.key}" width="600" height="auto">
            <figcaption>${item.key}</figcaption>
          </figure>
        </div>
      `
      const keyRegex = new RegExp(item.key, 'g')

      content = content?.replace(keyRegex, imgTag)
    })

    return content
  }

  console.log({ replaceKeywordsWithImages: replaceKeywordsWithImages(detailPress?.content, listImage) })

  useEffect(() => {
    if (!doneFetching) return

    const content = replaceKeywordsWithImages(detailPress?.content, listImage)
    setDetailPress((prev: any) => ({ ...prev, content: content }))

    setDoneFetching(false)
  }, [doneFetching])

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
      <div className=' ct-container '>
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-6 lg:gap-5'>
            <div className='relative col-span-6 lg:col-span-2'>
              <InputSearch onRefresh={setOnFetching} />
            </div>
            <div className='col-span-6 max-w-max rounded-full p-[17px] lg:col-span-4 lg:bg-white'>
              <ListBreadcrumbs list={listBreadcrumbs} />
            </div>
          </div>
          <div className='grid grid-cols-6 lg:gap-5'>
            <div className='order-1 col-span-6 lg:order-none lg:col-span-2'>
              <MostViewed dataDefault={listMostView} onFetching={onFetchingMostView} onLoading={onLoadingMostView} />
            </div>
            <div className='order-none col-span-6 space-y-4 rounded-xl bg-white p-4 lg:order-1 lg:col-span-4'>
              {onFetching || onLoading ? (
                <div className='flex flex-col gap-4'>
                  <Skeleton className='h-8 w-[140px] rounded-lg ' />
                  <div className='flex items-center gap-4'>
                    <Skeleton className='h-4 w-8 rounded-lg ' />
                    <Skeleton className='h-4 w-[50px] rounded-lg ' />
                  </div>
                  <Skeleton className='h-[480px] w-full rounded-lg ' />
                  <Skeleton className='h-8 w-[140px] rounded-lg ' />
                  <div className='flex flex-col gap-2'>
                    {Array(7)
                      .fill(null)
                      .map((_, index) => (
                        <Skeleton key={index} className='h-4 w-full rounded-lg ' />
                      ))}
                  </div>
                </div>
              ) : (
                <>
                  {!isSuccess ? (
                    <div className='flex h-full min-h-[400px] w-full flex-col items-center justify-center'>
                      <div className='h-[126px] w-[158px]'>
                        <Image src={'/empty.webp'} alt='empty' height={126} width={158} className='h-full w-full object-contain' />
                      </div>
                      <p className=' text-[#969696]'>{td('oopsDetail')}</p>
                    </div>
                  ) : (
                    <>
                      <h1 className='text-xl font-semibold lg:text-3xl '>
                        {/* <Link href={`${detailPress?.slug}`}>{detailPress?.title}</Link> */}
                        {detailPress?.title}
                      </h1>
                      <div className='flex items-center gap-4'>
                        <h3>
                          <Link href={`/${paramsData.locale}/press/${detailPress?.category?.slug}`}>{detailPress?.category?.name}</Link>
                        </h3>
                        <time className=' text-base-drak-gray'>{detailPress?.created_at}</time>
                      </div>
                      {/* khang */}
                      <div className='prose min-w-fit prose-figure:flex prose-figure:flex-col prose-figure:items-center' dangerouslySetInnerHTML={{ __html: detailPress?.content }} />
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

export default memo(PressDetail)
