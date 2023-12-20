'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { langs } from '@/constants'

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useSelect,
} from '@nextui-org/react'
import { Add, Global, SearchNormal1 } from 'iconsax-react'

import { useGetAllQueryParams } from '@/hook/useGetAllQueryParams'
import instance from '@/services/axiosConfig'
import { normalizeKeyword } from '@/utils'

function LangsComp() {
  const t = useTranslations('Navbar')
  const locale = useLocale()
  const dispatch = useDispatch()

  const router = useRouter()
  const pathName = usePathname()
  const allQueryParams: any = useGetAllQueryParams()

  const [onFetching, setOnFetching] = useState<boolean>(false)

  const [isOpen, setIsOpen] = useState(false)
  const [lang, setLang] = useState<any>(langs.find((e) => e.code == locale))
  const [searchLang, setSearchLang] = useState('')

  const [listCurrency, setListCurrency] = useState<
    { label: string; active: boolean; code: string; name: string; symbol: string }[]
  >([])

  const [searchCurrency, setSearchCurrency] = useState('')
  const currency = useSelector((state: any) => state.currency)
  const selectCurrency = useSelector((state: any) => state.currencyCurrent)

  const _HandleGetCurrency = async () => {
    try {
      const data: any = await instance.get('/default/currency')
      const cloneData = [...data]
      dispatch({ type: 'currency', payload: cloneData })

      const newListCurrency = cloneData.map((currency) => ({
        ...currency,
        label: `${currency.code} - ${currency.symbol}`,
        active: true,
      }))

      setListCurrency(newListCurrency)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    onFetching && _HandleGetCurrency()
  }, [onFetching])

  useEffect(() => {
    setOnFetching(true)
  }, [])

  useEffect(() => {
    try {
      const plainText = localStorage.getItem('currency') || '{}'
      const currencyStored = JSON.parse(plainText) || {}
      if (currencyStored?.code) {
        dispatch({ type: 'currencyCurrent', payload: currencyStored })
      }
    } catch (error) {}
  }, [])

  const _HandleScroll = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', _HandleScroll)

    return () => {
      window.removeEventListener('scroll', _HandleScroll)
    }
  }, [])

  const _HandleChangeLang = (value?: any) => {
    setLang(value)
    setIsOpen(false)

    const arrayUrl = pathName?.split('/')
    const urlReplace = arrayUrl
      .map((item) => (item === arrayUrl[1] ? value.code : item))
      .join('/')

    const queryString = Object.keys(allQueryParams)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(allQueryParams[key])}`,
      )
      .join('&')

    router.replace(urlReplace + (queryString !== null ? `?${queryString}` : ''), {
      scroll: false,
    })
  }

  const _HandleChangeCurrency = (value: any) => {
    setIsOpen(false)
    localStorage.setItem('currency', JSON.stringify(value))
    dispatch({ type: 'currencyCurrent', payload: { ...value } })
  }

  const _HandleClearValue = () => {
    setSearchCurrency('')
    setSearchLang('')
  }

  useEffect(() => {
    isOpen && _HandleClearValue()
  }, [isOpen])

  return (
    <>
      <div className='hidden lg:block '>
        <Popover
          placement='bottom-end'
          isOpen={isOpen}
          onOpenChange={(open: any) => setIsOpen(open)}
          classNames={{
            content: 'p-[16px] rounded-none',
          }}
        >
          <PopoverTrigger>
            <button className='flex h-[44px] cursor-pointer items-center space-x-6 divide-x-1 rounded-[44px] bg-[#F8F8F8] p-[10px] px-5 hover:opacity-80 focus:outline-none active:opacity-100'>
              <div className='flex items-center gap-2 text-[#646464]'>
                <Global size={24} className='' />
                <span className='text-[1.8rem] uppercase'>{lang?.code}</span>
              </div>
              <div className='flex items-center pl-6 text-[#646464]'>
                <span className='text-[1.8rem] uppercase'>{selectCurrency?.code}</span>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <Button
              isIconOnly
              onPress={() => setIsOpen(false)}
              variant='light'
              className='absolute right-0 top-0 h-[48px] w-[56px]'
            >
              <Add className='rotate-45 text-base-black-1' size={24} />
            </Button>
            <div className='grid grid-cols-2 gap-[20px] overflow-y-scroll'>
              <div className='col-span-1 flex flex-col gap-[8px]'>
                <div className='flex flex-col justify-between gap-[16px]'>
                  <h5 className='text-[1.8rem] font-bold leading-normal text-primary-blue'>
                    {t('language')}
                  </h5>
                  <Input
                    variant='underlined'
                    value={searchLang}
                    onChange={(e: any) => {
                      setSearchLang(e.target.value)
                    }}
                    placeholder='Search'
                    startContent={<SearchNormal1 size={24} className='text-[#C9C9C9]' />}
                    classNames={{
                      base: 'w-full',
                      input: 'text-[1.4rem] text-[#C9C9C9]',
                      inputWrapper: 'h-[40px] pl-[12px]',
                      innerWrapper: 'gap-[4px]',
                    }}
                  />
                </div>
                <div className='grid max-h-[400px] grid-cols-1 gap-1 overflow-y-scroll py-2'>
                  {langs
                    .filter((item) =>
                      normalizeKeyword(item.label).includes(normalizeKeyword(searchLang)),
                    )
                    .map((item) => (
                      <button
                        onClick={() => _HandleChangeLang(item)}
                        disabled={!item.active}
                        key={item.code}
                        className={`${
                          lang === item
                            ? 'bg-primary-blue-2 text-primary-blue'
                            : 'hover:bg-base-gray disabled:hover:bg-transparent'
                        } flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-6 text-left text-[1.8rem]`}
                      >
                        <span>{item.symbol}</span>
                        <span className={`${item.active ? '' : 'text-black/30'}`}>
                          {item.label}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
              <div className='col-span-1 flex flex-col gap-[8px]'>
                <div className='flex flex-col justify-between gap-[16px]'>
                  <h5 className='text-[1.8rem] font-bold leading-normal text-primary-blue'>
                    {t('money')}
                  </h5>
                  <Input
                    variant='underlined'
                    value={searchCurrency}
                    onChange={(e) => setSearchCurrency(e.target.value)}
                    placeholder='Search'
                    startContent={<SearchNormal1 size={24} className='text-[#C9C9C9]' />}
                    classNames={{
                      base: 'w-full',
                      input: 'text-[1.4rem] text-[#C9C9C9]',
                      inputWrapper: 'h-[40px] pl-[12px]',
                      innerWrapper: 'gap-[4px]',
                    }}
                  />
                </div>
                <div className='grid max-h-[400px] grid-cols-1 gap-1 overflow-y-scroll py-2'>
                  {currency
                    .filter((item: any) =>
                      `${item.code} ${item.name} ${item.symbol}`
                        .toLowerCase()
                        .includes(searchCurrency.toLowerCase().trim()),
                    )
                    ?.map((x: any) => ({
                      ...x,
                      priority: x.code === selectCurrency.code ? 1 : 0,
                    }))
                    .sort((a: any, b: any) => b.priority - a.priority)
                    .map((item: any) => (
                      <button
                        onClick={() => _HandleChangeCurrency(item)}
                        key={item.code}
                        disabled={item.code === selectCurrency.code}
                        className={`${
                          selectCurrency.code === item.code
                            ? 'bg-primary-blue-2 text-primary-blue'
                            : 'hover:bg-base-gray disabled:hover:bg-transparent'
                        } flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-6 text-left text-[1.8rem] disabled:cursor-not-allowed`}
                      >
                        <span
                          className={`${
                            item.code === selectCurrency.code ? '' : 'text-black/30'
                          }`}
                        >
                          {item.code} - {item.symbol}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className='mb:pb-0 block w-full pb-80 lg:hidden'>
        <div className='grid grid-cols-2 gap-[20px] overflow-y-scroll'>
          <div className=''>
            <div className='flex flex-col justify-between gap-[16px]'>
              <h5 className='text-[1.8rem] font-normal text-primary-blue'>
                {t('language')}
              </h5>
              <Input
                variant='underlined'
                value={searchLang}
                onChange={(e: any) => {
                  setSearchLang(e.target.value)
                }}
                placeholder='Search'
                startContent={<SearchNormal1 size={24} className='text-[#C9C9C9]' />}
                classNames={{
                  base: 'w-full',
                  input: 'text-[1.4rem] text-[#C9C9C9]',
                  inputWrapper: 'h-[40px] pl-[12px]',
                  innerWrapper: 'gap-[4px]',
                }}
              />
            </div>
            <div className='grid max-h-[400px] grid-cols-1 gap-1 overflow-y-scroll py-2'>
              {langs
                .filter((item) =>
                  normalizeKeyword(item.label).includes(normalizeKeyword(searchLang)),
                )
                .map((item) => (
                  <button
                    onClick={() => _HandleChangeLang(item)}
                    disabled={!item.active}
                    key={item.code}
                    className={`${
                      lang === item
                        ? 'bg-primary-blue-2 text-primary-blue'
                        : 'hover:bg-base-gray disabled:hover:bg-transparent'
                    } flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-6 text-left text-[1.8rem]`}
                  >
                    <span>{item.symbol}</span>
                    <span className={`${item.active ? '' : 'text-black/30'}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
            </div>
          </div>
          <div className=''>
            <div className='flex flex-col justify-between gap-[16px]'>
              <h5 className='text-[1.8rem] font-normal text-primary-blue'>Tiền tệ</h5>
              <Input
                variant='underlined'
                value={searchCurrency}
                onChange={(e) => setSearchCurrency(e.target.value)}
                placeholder='Search'
                startContent={<SearchNormal1 size={24} className='text-[#C9C9C9]' />}
                classNames={{
                  base: 'w-full',
                  input: 'text-[1.4rem] text-[#C9C9C9]',
                  inputWrapper: 'h-[40px] pl-[12px]',
                  innerWrapper: 'gap-[4px]',
                }}
              />
            </div>
            <div className='grid max-h-[400px] grid-cols-1 gap-1 overflow-y-scroll py-2'>
              {listCurrency
                .filter((item) =>
                  item.label.toLowerCase().includes(searchCurrency.toLowerCase().trim()),
                )
                .map((item) => (
                  <button
                    onClick={() => _HandleChangeCurrency(item)}
                    key={item.code}
                    disabled={!item.active}
                    className={`${
                      selectCurrency.code === item.code
                        ? 'bg-primary-blue-2 text-primary-blue'
                        : 'hover:bg-base-gray disabled:hover:bg-transparent'
                    } flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-6 text-left text-[1.8rem]`}
                  >
                    <span className={`${item.active ? '' : 'text-black/30'}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LangsComp
