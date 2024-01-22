'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { langs } from '@/constants'

import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { Add, Global, SearchNormal1 } from 'iconsax-react'

import { useGetAllQueryParams } from '@/hook/useGetAllQueryParams'
import instance from '@/services/axiosConfig'
import { normalizeKeyword } from '@/utils'

function LangsComp() {
  const locale = useLocale()
  const dispatch = useDispatch()

  const router = useRouter()
  const pathName = usePathname()
  const allQueryParams: any = useGetAllQueryParams()

  const lang = useMemo(() => {
    return langs.find((e) => e.code == locale)
  }, [locale])

  const [onFetching, setOnFetching] = useState<boolean>(false)

  const [isOpen, setIsOpen] = useState(false)

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const currency = useSelector((state: any) => state.currency)
  const selectCurrency = useSelector((state: any) => state.currencyCurrent)

  const _HandleGetCurrency = async () => {
    try {
      const data: any = await instance.get('/default/currency')
      const cloneData = [...data]

      const newListCurrency = cloneData.map((currency) => ({
        ...currency,
        label: `${currency.code} - ${currency.symbol}`,
        active: true,
      }))
      dispatch({ type: 'currency', payload: newListCurrency })
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
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    const _HandleScroll = () => {
      setIsOpen(false)
    }

    _HandleScroll()

    window.addEventListener('scroll', _HandleScroll)

    return () => {
      window.removeEventListener('scroll', _HandleScroll)
    }
  }, [])

  const _HandleChangeLang = useCallback(
    (value?: any) => {
      isSmallScreen ? dispatch({ type: 'toggle_menu', payload: true }) : setIsOpen(false)

      const arrayUrl = pathName?.split('/')
      const urlReplace = arrayUrl.map((item) => (item === arrayUrl[1] ? value.code : item)).join('/')

      const queryString = Object.keys(allQueryParams)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(allQueryParams[key])}`)
        .join('&')

      router.replace(urlReplace + (queryString !== null ? `?${queryString}` : ''), {
        scroll: false,
      })
    },
    [isSmallScreen, pathName],
  )

  const _HandleChangeCurrency = useCallback(
    (value: any) => {
      isSmallScreen ? dispatch({ type: 'toggle_menu', payload: true }) : setIsOpen(false)
      localStorage.setItem('currency', JSON.stringify(value))
      dispatch({ type: 'currencyCurrent', payload: { ...value } })
    },
    [isSmallScreen, pathName],
  )

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window?.innerWidth < 1024)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <div className='hidden lg:block'>
        <Popover
          placement='bottom-end'
          isOpen={isOpen}
          onOpenChange={(open: boolean) => setIsOpen(open)}
          classNames={{
            content: 'p-[16px] rounded-none',
          }}
        >
          <PopoverTrigger>
            <button className='flex h-[44px] cursor-pointer items-center space-x-6 divide-x-1 rounded-[44px] bg-[#F8F8F8] p-[10px] px-5 hover:opacity-80 focus:outline-none active:opacity-100'>
              <div className='flex items-center gap-2 text-[#646464]'>
                <Global size={24} />
                <span className='text-[1.8rem] uppercase'>{lang?.code}</span>
              </div>
              <div className='flex items-center pl-6 text-[#646464]'>
                <span className='text-[1.8rem] uppercase'>{selectCurrency?.code}</span>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <Button isIconOnly onPress={() => setIsOpen(false)} variant='light' className='absolute right-0 top-0 h-[48px] w-[56px]'>
              <Add className='rotate-45 ' size={24} />
            </Button>
            <div className='grid grid-cols-2 gap-[20px] overflow-y-scroll'>
              <LangSelect lang={lang} onClick={(item: any) => _HandleChangeLang(item)} />
              <CurrencySelect currency={currency} onClick={(item: any) => _HandleChangeCurrency(item)} selectCurrency={selectCurrency} />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className='block w-full lg:hidden'>
        <div className='grid grid-cols-2 overflow-y-scroll lg:gap-[20px]'>
          <LangSelect lang={lang} onClick={(item: any) => _HandleChangeLang(item)} />
          <CurrencySelect currency={currency} onClick={(item: any) => _HandleChangeCurrency(item)} selectCurrency={selectCurrency} />
        </div>
      </div>
    </>
  )
}

const LangSelect = memo(({ lang, onClick }: { lang: any; onClick: any }) => {
  const t = useTranslations('Navbar')

  const [searchLang, setSearchLang] = useState('')

  return (
    <div className='flex flex-col lg:gap-[8px]'>
      <div className='flex flex-col justify-between gap-[16px]'>
        <h5 className='text-[1.8rem] font-normal leading-normal text-primary-blue lg:font-bold'>{t('language')}</h5>
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
      <div className='grid max-h-[calc(100vh-300px)] grid-cols-1 gap-1 overflow-x-hidden overflow-y-scroll py-2 lg:max-h-[400px]'>
        {langs
          .filter((itemFilter) => normalizeKeyword(itemFilter.label).includes(normalizeKeyword(searchLang)))
          .map((item) => (
            <ItemSelect
              key={item.code}
              disabled={!item.active}
              isActive={lang === item}
              customLabel={
                <>
                  <span>{item.symbol}</span>
                  <span className={`${item.active ? '' : 'text-black/30'}`}>{item.label}</span>
                </>
              }
              handleClick={() => onClick(item)}
            />
          ))}
      </div>
    </div>
  )
})

const CurrencySelect = memo(({ currency, selectCurrency, onClick }: { currency: any; selectCurrency: any; onClick: any }) => {
  const t = useTranslations('Navbar')
  const [searchCurrency, setSearchCurrency] = useState('')

  const _handleChangeValue = useCallback((e: any) => setSearchCurrency(e.target.value), [])
  return (
    <div className='flex flex-col lg:gap-[8px]'>
      <div className='flex flex-col justify-between gap-[16px]'>
        <h5 className='text-[1.8rem] font-normal leading-normal text-primary-blue lg:font-bold'>{t('money')}</h5>
        <Input
          variant='underlined'
          value={searchCurrency}
          onChange={_handleChangeValue}
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
      <div className='grid  max-h-[calc(100vh-300px)] grid-cols-1 gap-1 overflow-y-scroll py-2 lg:max-h-[400px] lg:min-w-[236px]'>
        {currency
          .filter((item: any) => `${item.code} ${item.name} ${item.symbol}`.toLowerCase().includes(searchCurrency.toLowerCase().trim()))
          ?.map((x: any) => ({
            ...x,
            priority: x.code === selectCurrency.code ? 1 : 0,
          }))
          .sort((a: any, b: any) => b.priority - a.priority)
          .map((item: any) => (
            <ItemSelect
              key={item.code}
              disabled={item.code === selectCurrency.code}
              isActive={selectCurrency.code === item.code}
              canActive={item.code === selectCurrency.code}
              label={`${item.code} - ${item.symbol}`}
              handleClick={() => onClick(item)}
            />
          ))}
      </div>
    </div>
  )
})

const ItemSelect = memo(
  ({ disabled, handleClick, isActive, canActive, label, customLabel }: { disabled: boolean; handleClick: any; isActive: boolean; canActive?: boolean; label?: string; customLabel?: any }) => {
    return (
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`${
          isActive ? 'bg-primary-blue-2 text-primary-blue' : 'hover:bg-base-gray disabled:hover:bg-transparent'
        } flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-6 text-left text-[1.8rem]`}
      >
        {customLabel ? customLabel : <span className={`${canActive ? '' : ''}`}>{label}</span>}
      </button>
    )
  },
)

export default memo(LangsComp)
