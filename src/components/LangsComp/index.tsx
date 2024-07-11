'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { langs } from '@/constants'

import { Button, Input } from '@nextui-org/react'
import { Add, Global, SearchNormal1, TickCircle } from 'iconsax-react'

import { useGetAllQueryParams } from '@/hook/useGetAllQueryParams'
import instance from '@/services/axiosConfig'
import { normalizeKeyword } from '@/utils'
import DropDownMenu from '../DropDownMenu'
import useSmallScreen from '@/hook/useSmallScreen'

function LangsComp() {
  const locale = useLocale()
  const dispatch = useDispatch()
  const openLanguage = useSelector((state: any) => state.openLanguage)

  const router = useRouter()
  const pathName = usePathname()
  const allQueryParams: any = useGetAllQueryParams()

  const lang = useMemo(() => {
    return langs.find((e) => e.code == locale)
  }, [locale])

  const [onFetching, setOnFetching] = useState<boolean>(false)

  const isSmallScreen = useSmallScreen()

  const currency = useSelector((state: any) => state.currency)
  const selectCurrency = useSelector((state: any) => state.currencyCurrent)

  const _HandleGetCurrency = async () => {
    try {
      const data: any = await instance.get('/default/currency')
      const cloneData = [...data]

      const newListCurrency = cloneData.map((currency) => ({
        ...currency,
        label: `${currency.code} - ${currency.symbol}`,
        active: true
      }))
      dispatch({ type: 'currency', payload: newListCurrency })
    } catch (error) {
      console.log(error)
    } finally {
      setOnFetching(false)
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

  const handleToggleLanguage = () => {
    dispatch({ type: 'toggle_language', payload: openLanguage })
    dispatch({ type: 'toggle_menu', payload: true })
    dispatch({ type: 'toggle_open_header_dropdown', payload: true })
  }

  const _HandleChangeLang = useCallback(
    (value?: any) => {
      dispatch({ type: 'toggle_menu', payload: true })
      // handleToggleLanguage()
      dispatch({ type: 'toggle_language', payload: true })

      const arrayUrl = pathName?.split('/')
      const urlReplace = arrayUrl.map((item) => (item === arrayUrl?.[1] ? value.code : item)).join('/')

      const queryString = Object.keys(allQueryParams)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(allQueryParams[key])}`)
        .join('&')

      router.replace(urlReplace + (queryString !== null ? `?${queryString}` : ''), {
        scroll: false
      })
    },
    [isSmallScreen, pathName]
  )

  const _HandleChangeCurrency = useCallback(
    (value: any) => {
      dispatch({ type: 'toggle_menu', payload: true })

      localStorage.setItem('currency', JSON.stringify(value))
      dispatch({ type: 'currencyCurrent', payload: { ...value } })
    },
    [isSmallScreen, pathName]
  )

  return (
    <>
      <Button
        variant='light'
        isIconOnly
        disableAnimation
        disableRipple
        aria-label='language'
        onPress={handleToggleLanguage}
        className={`flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg lg:rounded-xl ${openLanguage ? 'bg-primary-yellow data-[hover=true]:bg-primary-yellow' : 'bg-[#F8F8F8] data-[hover=true]:bg-[#f8f8f8]'}`}
      >
        <Global size={24} className='flex flex-shrink-0' />
      </Button>
      <DropDownMenu direction={isSmallScreen ? 'left' : 'top'} isOpen={openLanguage} className='w-full bg-primary-blue'>
        <div className='ct-container flex items-center justify-end'>
          <Button isIconOnly variant='light' disableAnimation disableRipple className='rounded-full p-6' onClick={() => handleToggleLanguage()}>
            <Add className='flex size-[48px] flex-shrink-0 rotate-45 text-white ' size={48} />
          </Button>
        </div>
        <div className='ct-container grid grid-cols-2 gap-5 overflow-y-scroll'>
          <LangSelect lang={lang} onClick={(item: any) => _HandleChangeLang(item)} />
          <CurrencySelect currency={currency} onClick={(item: any) => _HandleChangeCurrency(item)} selectCurrency={selectCurrency} />
        </div>
      </DropDownMenu>
    </>
  )
}

const LangSelect = memo(({ lang, onClick }: { lang: any; onClick: any }) => {
  const t = useTranslations('Navbar')
  const [searchLang, setSearchLang] = useState('')

  return (
    <div className='flex flex-col lg:gap-2'>
      <div className='flex flex-col justify-between gap-4'>
        <h5 className='p-2 text-2xl font-bold leading-normal text-white lg:p-4 lg:text-4xl lg:font-bold'>{t('language')}</h5>
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
            input: 'text-base group-data-[has-value=true]:text-white text-white placeholder:text-white',
            inputWrapper: 'h-10 pl-3 after:hidden',
            innerWrapper: 'gap-1'
          }}
        />
      </div>
      <div className='grid max-h-[calc(100vh-300px)] grid-cols-1 gap-1 overflow-x-hidden overflow-y-scroll py-2 '>
        {langs
          .filter((itemFilter) => normalizeKeyword(itemFilter.label).includes(normalizeKeyword(searchLang)))
          .map((item) => (
            <ItemSelect
              key={item.code}
              disabled={!item.active}
              isActive={lang === item}
              customLabel={
                <div className='flex items-center gap-2'>
                  <span>{item.symbol}</span>
                  <span className={`${item.active ? '' : 'text-black/30'}`}>{item.label}</span>
                </div>
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
  const dispatch = useDispatch()
  const [searchCurrency, setSearchCurrency] = useState('')

  const _handleChangeValue = useCallback((e: any) => setSearchCurrency(e.target.value), [])
  return (
    <div className='flex flex-col lg:gap-2'>
      <div className='flex flex-col justify-between gap-4'>
        <h5 className='p-2 text-2xl font-bold leading-normal text-white lg:p-4 lg:text-4xl lg:font-bold'>{t('money')}</h5>
        <Input
          variant='underlined'
          value={searchCurrency}
          onChange={_handleChangeValue}
          placeholder='Search'
          startContent={<SearchNormal1 size={24} className='text-[#C9C9C9]' />}
          classNames={{
            base: 'w-full',
            input: 'text-base group-data-[has-value=true]:text-white text-white placeholder:text-white',
            inputWrapper: 'h-10 pl-3 after:hidden',
            innerWrapper: 'gap-1'
          }}
        />
      </div>
      <div className='grid max-h-[calc(100vh-300px)] grid-cols-1 gap-1 overflow-y-scroll py-2'>
        {currency
          .filter((item: any) => normalizeKeyword(`${item.code} ${item.name} ${item.symbol}`).toLowerCase().includes(normalizeKeyword(searchCurrency).toLowerCase().trim()))
          ?.map((x: any) => ({
            ...x,
            priority: x.code === selectCurrency.code ? 1 : 0
          }))
          .sort((a: any, b: any) => b.priority - a.priority)
          .map((item: any) => (
            <ItemSelect
              key={item.code}
              disabled={item.code === selectCurrency.code}
              isActive={selectCurrency.code === item.code}
              label={`${item.code} - ${item.symbol}`}
              handleClick={() => {
                onClick(item)
                dispatch({ type: 'toggle_language', payload: true })
              }}
            />
          ))}
      </div>
    </div>
  )
})

const ItemSelect = memo(({ disabled, handleClick, isActive, label, customLabel }: { disabled: boolean; handleClick: any; isActive: boolean; label?: string; customLabel?: any }) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${
        isActive ? 'bg-white/10' : 'hover:bg-white/10 disabled:hover:bg-transparent'
      } flex items-center justify-between gap-2 whitespace-nowrap rounded-lg px-4 py-6 text-left text-lg text-white`}
    >
      <div>{customLabel ? customLabel : label}</div>
      {isActive ? <TickCircle variant='Bold' size={24} color='#00C070' className='flex size-6 flex-shrink-0' /> : <></>}
    </button>
  )
})

type TInputSearch = {
  value: string
  setValue: (value: string) => void
}

const InputSearch = ({ value, setValue }: TInputSearch) => {
  return (
    <Input
      variant='underlined'
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      placeholder='Search'
      startContent={<SearchNormal1 size={24} className='text-[#C9C9C9]' />}
      classNames={{
        base: 'w-full',
        input: 'text-base group-data-[has-value=true]:text-white text-white placeholder:text-white',
        inputWrapper: 'h-10 pl-3 after:hidden',
        innerWrapper: 'gap-1'
      }}
    />
  )
}

export default memo(LangsComp)
