'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, cn, Link, Skeleton } from '@nextui-org/react'

import { ListBreadcrumbs } from '@/components/breadcrumbs'
import { IBreadcrumbWithUrl, IItemClothes } from '@/interface'
import instance from '@/services/axiosConfig'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/zoom'

import CheckValidWorker from '@/components/CheckValidWorker'
import ItemClothe from '@/components/ItemClothe'
import RecomfirmWorker from '@/components/RecomfirmWorker'
import { useGetAllQueryParams } from '@/hook/useGetAllQueryParams'
import { ShoppingBag } from 'iconsax-react'
import './storeSwiper.scss'

const Store = () => {
  const td = useTranslations('listBreadcrumbs')
  const t = useTranslations('Store')

  const listBreadcrumbs: IBreadcrumbWithUrl[] = [{ title: td('home'), url: '/' }, { title: td('store') }]

  const locale = useLocale()

  const [mounted, setMounted] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [onFetching, setOnFetching] = useState<boolean>(false)
  const [listItem, setListItem] = useState<any[]>([])
  const [cartItems, setCartItems] = useState<any>([])
  const [token, setToken] = useState<string | null>(null)
  const [validToken, setValidToken] = useState<boolean>(false)

  const dispatch = useDispatch()
  const currencyCurrent = useSelector((state: any) => state.currencyCurrent)

  const allQuery: any = useGetAllQueryParams()
  const isWebview = allQuery.isWebview === 'true'
  const tokenFromLocalStorage = localStorage.getItem('token')

  const initPhoneValue = !!allQuery?.phone ? allQuery?.phone : ''
  const tokenFromWebview = !!allQuery?.token ? allQuery?.token : tokenFromLocalStorage

  const buildQueryString = (query: any) => {
    return Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  }

  const queryInParams = isWebview ? buildQueryString(allQuery) : ''

  const serverFetching = useCallback(async () => {
    if (!token?.length) return
    try {
      const data: any = await instance.get('/uniforms', {
        params: {
          lang: locale,
          currency: currencyCurrent?.code,
          token
        }
      })

      const updatedData = data?.list?.map((item: any) => ({
        ...item,
        package: item.package.map((packageItem: any) => ({
          ...packageItem,
          attributes: packageItem.attributes
            ? packageItem.attributes.map((attribute: any) => ({
                ...attribute,
                selected: attribute.values ? attribute.values[0] : null
              }))
            : null
        }))
      }))

      setListItem([...updatedData])

      dispatch({ type: 'worker/info', payload: data.info })

      setIsOpenModal(false)
    } catch (error) {
      console.log(error)
      setIsOpenModal(true)
      setValidToken(false)
    } finally {
      setOnFetching(false)
    }
  }, [token, currencyCurrent?.code, locale])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    onFetching && serverFetching()
  }, [onFetching])

  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token)
  }, [])

  useEffect(() => {
    if (!!token?.length) {
      setOnFetching(true)
      setIsOpenModal(false)
      setValidToken(true)
    } else {
      setIsOpenModal(true)
    }
  }, [token])

  useEffect(() => {
    localStorage.removeItem('token')
  }, [])

  if (!mounted) return null

  return (
    <div className={cn('min-h-[60vh] pt-[70px] 3xl:pt-[80px]', isWebview ? 'pt-0' : '')}>
      <CheckValidWorker initPhoneValue={initPhoneValue} setToken={setToken} setValidToken={setValidToken} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} isWebview={isWebview} />
      <div className='ct-container mb-[60px]'>
        {!isWebview && (
          <div className='mt-10'>
            <ListBreadcrumbs list={listBreadcrumbs} />
          </div>
        )}
        <div className='flex items-center justify-between'>
          <h3 className='mb-5 mt-9 text-2xl font-semibold uppercase'>{t('text4')}</h3>
          <Button
            as={Link}
            href={`/${locale}/store/history?token=${tokenFromWebview}&${queryInParams}`}
            endContent={<ShoppingBag />}
            className='hidden h-[44px] rounded-2xl bg-[#F8F8F8] text-[#212121] md:flex'
          >
            Lịch sử mua hàng
          </Button>
          <Button isIconOnly as={Link} href={`/${locale}/store/history?token=${tokenFromWebview}&${queryInParams}`} className='h-[44px] rounded-2xl bg-[#F8F8F8] text-[#212121] md:hidden'>
            <ShoppingBag />
          </Button>
        </div>
        {!isOpenModal && !validToken ? (
          <RecomfirmWorker setIsOpenModal={setIsOpenModal} />
        ) : (
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {onFetching
              ? Array(8)
                  .fill(null)
                  .map((_, index) => (
                    <div className='overflow-hidden rounded-lg shadow-[0px_4px_8px_0px_#ACACAC29]' key={index}>
                      <Skeleton className='h-[200px] w-full' />
                      <div className='flex flex-col gap-2 p-4 '>
                        <Skeleton className='h-[10px] w-1/2 rounded-lg' />
                        <Skeleton className='h-[10px] w-1/3 rounded-lg' />
                      </div>
                    </div>
                  ))
              : listItem?.map((item: IItemClothes) => {
                  return <ItemClothe cartItems={cartItems} setCartItems={setCartItems} item={item} key={item.uuid} />
                })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Store
