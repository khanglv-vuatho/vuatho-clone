'use client'

import Image from 'next/image'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import instance from '@/services/axiosConfig'
import { SearchNormal1 as IconSearchNormal1 } from 'iconsax-react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from '@/navigation'

let timerSearch: any = null
const InputMainSearch = React.memo((props: any) => {
  const t = useTranslations('InputMainSearch')

  const [isFocus, sIsFocus] = useState(false)
  const [onFetching, sOnFetching] = useState(false)
  const [data, sData] = useState<any>([])

  const [keyword, sKeyword] = useState('')

  const _HandleSearching = useCallback(() => {
    try {
      instance.get('/services/search', { params: { keyword } }).then((res) => {
        console.log(res)
        sData(res)
      })
    } catch (error) {
    } finally {
      sOnFetching(false)
    }
  }, [keyword])

  useEffect(() => {
    onFetching && _HandleSearching()
  }, [onFetching])

  useEffect(() => {
    if (keyword) {
      timerSearch && clearTimeout(timerSearch)
      timerSearch = setTimeout(() => {
        sOnFetching(true)
      }, 250)
    } else {
      timerSearch && clearTimeout(timerSearch)
    }
    return () => {
      timerSearch && clearTimeout(timerSearch)
    }
  }, [keyword])

  const _HandleOnFocus = useCallback((isBoolean: any) => {
    sIsFocus(isBoolean)
  }, [])

  const _HandleOnChangeInput = useCallback((e: any) => {
    sKeyword(e.target.value)
  }, [])

  const searchAreaRef = useRef<any>(null)

  const handleClickOutside = (event: any) => {
    if (searchAreaRef.current && !searchAreaRef.current.contains(event.target)) {
      _HandleOnFocus(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={searchAreaRef}
      id='search-area-services'
      className='relative z-[10] w-full space-y-3 md:w-[70%]'
    >
      <div className='flex w-full rounded-full border-2 border-[#f5b500] p-3 outline-none focus:border-[#ffcc3f]'>
        <input
          onFocus={_HandleOnFocus.bind(this, true)}
          type='text'
          onChange={_HandleOnChangeInput}
          placeholder={t('text1')}
          className={
            props.className
              ? props.className
              : `w-full rounded-full p-3 px-6 outline-none`
          }
        />
        <button className='rounded-full bg-[#f5b500] p-3 hover:opacity-75 active:opacity-100'>
          <IconSearchNormal1 />
        </button>
      </div>
      <div
        className={`absolute z-[1] overflow-hidden overflow-y-auto transition ${
          !isFocus ? 'max-h-[0px]' : 'max-h-[200px]'
        } w-full rounded-2xl bg-white shadow-xl`}
      >
        {onFetching && <p className='p-3 py-5 text-center text-gray-400'>{t('text2')}</p>}
        {!onFetching && (
          <div>
            {data?.map((x: any) => <ItemRenderService key={x.id?.toString()} {...x} />)}
          </div>
        )}
      </div>
    </div>
  )
})

const ItemRenderService = React.memo((props: any) => {
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
        services: props.id,
      },
    })
  }

  return (
    <div
      onClick={_HandleOnClick.bind(this)}
      className='flex cursor-pointer items-center gap-[10px] p-3 py-4'
    >
      <Image
        src={iconSrc}
        onError={_HandleOnErrorIcon.bind(this)}
        alt=''
        width={48}
        height={48}
      />
      <h3 className='text-[1.8rem] xl:text-[1.8rem]'>{props.name[locale]} </h3>
    </div>
  )
})

export default InputMainSearch
