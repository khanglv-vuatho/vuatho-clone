'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Input } from '@nextui-org/react'
import { Add, SearchNormal1 } from 'iconsax-react'

import { useUnfocusItem } from '@/hook'
import { SearchSpiner } from '../Icons'

export const InputSearch = ({ onRefresh }: { onRefresh: any }) => {
  const [searchValue, setSearchValue] = useState<string>(
    useSearchParams().get('search') || '',
  )
  const searchParams = useSearchParams()
  const [showSearchItem, setShowSearchItem] = useState<boolean>(false)
  const [onSearching, setOnSearching] = useState<boolean>(false)
  const [listTagSearch, setListTagSearch] = useState<any>([])

  const router = useRouter()
  const locale = useLocale()

  const t = useTranslations('inputSearch')

  const exclusionRef = useRef(null)
  const itemRef = useUnfocusItem(() => {
    setShowSearchItem(false)
  }, exclusionRef)

  const handleClearValue = () => {
    setSearchValue('')
    if (itemRef.current) {
      itemRef.current.focus()
    }
  }
  const handleNavigate = useCallback(() => {
    if (searchParams.get('search')?.length || searchValue?.length) {
      router.push(`/${locale}/press?search=${searchValue?.trim()}&page=1`)
      setShowSearchItem(false)
      if (itemRef.current) {
        itemRef.current.blur()
      }
    }
  }, [searchValue, searchParams.get('search')])

  const handleChangeValueSearch = (e: any) => {
    const value = e.target.value
    if (value.length < 70) setSearchValue(value)
  }

  const handleSearch = async () => {
    try {
      // const {data} = instance.post('home/search')
    } catch (error) {
      console.log(error)
    } finally {
      setOnSearching(false)
    }
  }

  useEffect(() => {
    setOnSearching(true)
    const debounceTimer = setTimeout(() => {
      handleSearch()
    }, 500)

    return () => {
      clearTimeout(debounceTimer)
    }
  }, [searchValue])

  return (
    <Input
      autoComplete='off'
      value={searchValue}
      ref={itemRef}
      onFocus={() => setShowSearchItem(true)}
      onChange={(e: any) => {
        handleChangeValueSearch(e)
      }}
      startContent={<SearchNormal1 size={24} className=' text-[#292D32]' />}
      placeholder={t('search')}
      onKeyDown={(e: any) => {
        if (e.key === 'Enter') {
          handleNavigate()
        }
      }}
      endContent={
        !!searchValue?.length && (
          <div
            className={`cursor-pointer rounded-full ${
              !onSearching && 'bg-[#292D32] hover:bg-[#292D32]/40'
            }`}
            onClick={handleClearValue}
          >
            {onSearching ? (
              <SearchSpiner className='h-[20px] w-[20px] animate-spin text-[#292D32]' />
            ) : (
              <Add size={16} className='rotate-45 text-white' />
            )}
          </div>
        )
      }
      // endContent={
      //   !!searchValue?.length && (
      //     <div
      //       className='cursor-pointer rounded-full bg-[#292D32] hover:bg-[#292D32]/40'
      //       onClick={handleClearValue}
      //     >
      //       <Add size={16} className='rotate-45 text-white' />
      //     </div>
      //   )
      // }
      classNames={{
        clearButton: 'pr-[10px]',
        innerWrapper:
          'py-[16px] px-[8px] data-[hover=true]:bg-white group-data-[focus=true]:bg-white bg-white ',
        input:
          'text-[1.8rem] placeholder:font-light data-[has-start-content=true]:ps-[10px]',
        inputWrapper:
          'bg-white rounded rounded-full overflow-hidden data-[hover=true]:bg-white group-data-[focus=true]:bg-white h-[58px] shadow-[0px_4px_8px_0px_#ACACAC29] group-data-[focus=true]:border-none border-none',
      }}
    />
  )
}
