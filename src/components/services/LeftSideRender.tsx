'use client'

import Image from 'next/image'
import React, { useState, useEffect, memo } from 'react'
import { useRouter } from '@/navigation'
import { useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

import { useLocale, useTranslations } from 'next-intl'
import instance from '@/services/axiosConfig'

const LeftRenderSearch = memo(() => {
  const t = useTranslations('Press')
  const td = useTranslations('inputSearch')
  const dispatch = useDispatch()
  const [keyword, sKeyword] = useState('')
  const dataRender = useSelector((state: any) => state.services)
  const [onFetching, setOnFetching] = useState(false)

  const _ServerFetching = async () => {
    try {
      const data = await instance.get('/services')
      dispatch({ type: 'services', payload: data })
    } catch (error) {
      console.log(error)
    } finally {
      setOnFetching(false)
    }
  }

  const _HandleOnChangeKeySearch = (e: any) => {
    sKeyword(e.target.value)
  }

  useEffect(() => {
    onFetching && _ServerFetching()
  }, [onFetching])

  useEffect(() => {
    setOnFetching(true)
  }, [])

  return (
    <div className='flex flex-col gap-[10px]'>
      <div className='mb-3'>
        <input onChange={_HandleOnChangeKeySearch} placeholder={td('search')} className='w-full rounded-full border p-3 px-6 py-5 focus-within:outline-none' />
      </div>
      <div className='grid max-h-[480px] w-full gap-6 overflow-y-auto overflow-x-hidden md:grid-cols-2 xl:grid-cols-4'>
        {dataRender
          ?.filter((x: any) => (keyword ? x.keysearch?.toLowerCase().includes(keyword?.toLowerCase()) : x))
          ?.map((item: any) => {
            return <ItemService key={item?.id?.toString()} {...item} />
          })}
      </div>
    </div>
  )
})

const ItemService = memo((props: any) => {
  const locale = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  const services = searchParams.get('services')

  const country = searchParams.get('country')

  const _HandleClick = () => {
    const query: any = {}

    if (country) {
      query['country'] = country?.toLowerCase()
    }

    query['services'] = props.id

    router.replace({
      pathname: '/services',
      query: query
    })
  }

  return (
    <div
      onClick={_HandleClick.bind(this)}
      className={`flex select-none items-center gap-[10px] rounded-[8px] px-6 py-8 transition hover:cursor-pointer ${
        services == props.id ? 'bg-primary-blue-2 text-primary-blue' : 'hover:bg-base-gray'
      }`}
    >
      <Image src={props.icon} alt='' width={68} height={68} className='max-h-[50px] max-w-[50px]' />
      <div>
        <h3 className='text-[1.8rem] xl:text-[1.8rem]'>{props.name[locale]} </h3>
      </div>
    </div>
  )
})

export default LeftRenderSearch
