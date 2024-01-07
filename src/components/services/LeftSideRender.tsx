'use client'
import Image from 'next/image'
import InputSearch from '@/components/input/services'
import React, { useState, useEffect } from 'react'
import { useRouter } from '@/navigation'
import { useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Instance from '@/services/axiosConfig'
import { useLocale } from 'next-intl'

const LeftRenderSearch = React.memo(() => {
  const dispatch = useDispatch()
  const [keyword, sKeyword] = useState('')
  const dataRender = useSelector((state: any) => state.services)
  const [onFetching, sOnFetching] = useState(false)

  const _ServerFetching = () => {
    Instance.get('/services').then((res) => {
      console.log(res)
      dispatch({ type: 'services', payload: res })
      sOnFetching(false)
    })
  }

  const _HandleOnChangeKeySearch = (e: any) => {
    sKeyword(e.target.value)
  }

  useEffect(() => {
    onFetching && _ServerFetching()
  }, [onFetching])

  useEffect(() => {
    sOnFetching(true)
  }, [])

  return (
    <React.Fragment>
      <div className='mb-3'>
        <input
          onChange={_HandleOnChangeKeySearch.bind(this)}
          placeholder='Tìm kiếm nhanh ...'
          className='w-full rounded-full border p-3 px-6 py-5 focus-within:outline-none'
        />
      </div>
      <div className='grid grid-cols-3 flex-wrap gap-6 xl:max-h-[480px] xl:grid-cols-1 xl:flex-col xl:flex-nowrap xl:overflow-hidden xl:overflow-y-auto'>
        {dataRender
          ?.filter((x: any) =>
            keyword ? x.keysearch?.toLowerCase().includes(keyword?.toLowerCase()) : x,
          )
          ?.map((item: any, index: number) => {
            return <ItemService key={item?.id?.toString()} {...item} />
          })}
      </div>
    </React.Fragment>
  )
})

const ItemService = React.memo((props: any) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const country = searchParams.get('country')

  const _HandleClick = () => {
    const query: any = {}
    if (country) {
      query['country'] = country?.toLowerCase()
    }

    query['services'] = props.id

    router.replace({
      pathname: '/services',
      query: query,
    })
  }

  const locale = useLocale()
  return (
    <div
      onClick={_HandleClick.bind(this)}
      className='select-none flex-col items-center gap-[10px] space-y-6 p-3 py-4 transition hover:scale-110 hover:cursor-pointer active:scale-100 lg:space-y-3 xl:flex xl:flex-row'
    >
      <div className='w-[120px] md:max-w-[768px] lg:hidden lg:max-w-[1024px]' />
      <Image src={props.icon} alt='' width={68} height={68} />
      <div>
        <h3 className='text-[1.8rem] xl:text-[1.8rem]'>{props.name[locale]} </h3>
      </div>
    </div>
  )
})

export default LeftRenderSearch
