'use client'

import { SearchNormal1 as SearchNormal1Icon } from 'iconsax-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

import useUnfocusItem from '@/hook/useUnfocusItem'
import { useRouter } from '@/navigation'
import instance from '@/services/axiosConfig'

const InputMainSearch = memo((props: any) => {
  const t = useTranslations('InputMainSearch')
  const ti = useTranslations('inputSearch')

  const [isFocus, setIsFocus] = useState(false)
  const [onFetching, sOnFetching] = useState(false)
  const [data, sData] = useState<any>([])

  const timerSearch: any = useRef(null)
  const exclusionRef = useRef(null)
  const searchAreaRef = useUnfocusItem(() => _HandleOnFocus(false), exclusionRef)

  const [keyword, setKeyword] = useState('')

  const _HandleSearching = useCallback(async () => {
    try {
      const data = await instance.get('/services/search', { params: { keyword } })
      sData(data)
    } catch (error) {
      console.log(error)
    } finally {
      sOnFetching(false)
    }
  }, [keyword])

  useEffect(() => {
    onFetching && _HandleSearching()
  }, [onFetching])

  useEffect(() => {
    if (keyword) {
      timerSearch.current && clearTimeout(timerSearch.current)
      timerSearch.current = setTimeout(() => {
        sOnFetching(true)
      }, 250)
    } else {
      timerSearch.current && clearTimeout(timerSearch.current)
    }
    return () => {
      timerSearch.current && clearTimeout(timerSearch.current)
    }
  }, [keyword])

  const _HandleOnFocus = useCallback((isBoolean: any) => {
    setIsFocus(isBoolean)
  }, [])

  const _HandleOnChangeInput = useCallback((e: any) => {
    setKeyword(e.target.value)
  }, [])

  return (
    <div ref={searchAreaRef} id='search-area-services' className='relative z-[10] mt-5 w-full space-y-3 md:max-w-[80%]'>
      <div className='flex w-full rounded-full  bg-white p-3 shadow-[0px_16px_32px_0px_#88888829] outline-none'>
        <input
          onFocus={() => _HandleOnFocus(true)}
          onChange={_HandleOnChangeInput}
          placeholder={t('text1')}
          className={props.className ? props.className : 'placeholder: w-full rounded-full p-3 outline-none placeholder:text-[#A6A6A6]'}
        />
        <button className='flex items-center justify-center gap-2 rounded-full bg-[#f5b500] px-3 py-3 hover:opacity-75 active:opacity-100 lg:px-6' aria-label='search'>
          <SearchNormal1Icon size={24} />
          <span className='hidden whitespace-nowrap font-semibold text-baseBlack lg:block'>{ti('search')}</span>
        </button>
      </div>
      <div className={`absolute z-[1] overflow-hidden overflow-y-auto transition ${!isFocus ? 'max-h-[0px]' : 'max-h-[200px]'} w-full rounded-xl bg-white shadow-xl`}>
        {onFetching && <p className='p-3 py-5 text-center text-gray-400'>{t('text2')}</p>}
        {!onFetching && <div>{data?.map((x: any) => <ItemRenderService key={x.id?.toString()} {...x} />)}</div>}
      </div>
    </div>
  )
})

const ItemRenderService = memo((props: any) => {
  const locale = useLocale()
  const router = useRouter()
  const [iconSrc, seticonSrc] = useState(props.icon)

  const _HandleOnErrorIcon = () => {
    seticonSrc('https://cdn.vuatho.com/')
  }

  const _HandleOnClick = () => {
    router.push({
      pathname: '/services',
      query: {
        services: props.id
      }
    })
  }

  return (
    <div onClick={_HandleOnClick.bind(this)} className='flex cursor-pointer items-center gap-2 p-3 py-4'>
      <Image src={iconSrc} onError={_HandleOnErrorIcon.bind(this)} alt='' width={48} height={48} />
      <h3 className='text-lg xl:text-lg'>{props.name[locale]} </h3>
    </div>
  )
})

export default InputMainSearch
