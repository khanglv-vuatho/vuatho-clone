'use client'

import { ListBreadcrumbs } from '@/components/breadcrumbs'
import ItemHistory, { NoDataItemHistory, SekeletonItemHistory } from '@/components/ItemHistory'
import ToastComponent from '@/components/ToastComponent'
import { useGetAllQueryParams } from '@/hook/useGetAllQueryParams'
import { IBreadcrumbWithUrl, IHistoryItem } from '@/interface'
import instance from '@/services/axiosConfig'
import { formatDDMMYYYY } from '@/utils'

import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './storeSwiper.scss'
import { cn } from '@nextui-org/react'

const HistoryPage = () => {
  const td = useTranslations('listBreadcrumbs')
  const listBreadcrumbs: IBreadcrumbWithUrl[] = [{ title: td('home'), url: '/' }, { title: td('store'), url: '/store' }, { title: 'Lịch sử mua hàng' }]
  const allQuery: any = useGetAllQueryParams()

  const dispatch = useDispatch()
  const tokenFromWebview = !!allQuery?.token ? allQuery?.token : ''
  const [onFetching, setOnFetching] = useState(false)
  const [isMissToken, setIsMissToken] = useState(false)
  const [historyShoping, setHistoryShoping] = useState<IHistoryItem[]>([])

  const isWebview = allQuery.isWebview === 'true'
  const tokenFromLocalStorage = localStorage.getItem('token')

  const locale = useLocale()
  const localeText = locale === 'vi' ? 'vi' : 'en'

  const handleFormatData = (data: any) => {
    const result = data?.map((item: any) => ({
      ...item,
      // thumb: item?.info_collection?.thumb,
      createdAt: formatDDMMYYYY(item?.createdAt),
      location: item?.delivery_information?.address,
      phone: item?.delivery_information?.phoneNumber?.phone,
      typeOfPayment: item?.payment_method,
      status: item.order_status,
      title: item?.titles?.[localeText],
      //prices : {VND: 100000}
      price: Object.values(item?.prices)[0],
      currency: Object.keys(item?.prices)[0],
      package: item?.details?.items.map((packageItem: any) => ({
        ...packageItem,
        title: packageItem?.titles?.[localeText],
        price: Object.values(packageItem?.prices)[0],
        currency: Object.keys(packageItem?.prices)[0]
      }))
    }))
    return result
  }

  console.log({ tokenFromWebview })

  const handleFetchingHistoryShoping = async () => {
    if (!tokenFromWebview) return ToastComponent({ message: 'Vui lòng đăng nhập để xem lịch sử mua hàng', type: 'error' })

    try {
      const data: any = await instance.get('/uniforms/order', {
        params: {
          token: tokenFromWebview
        }
      })
      setHistoryShoping(handleFormatData(data.list) as IHistoryItem[])
      dispatch({ type: 'worker/info', payload: data?.info })
    } catch (error) {
      console.log(error)
    } finally {
      setOnFetching(false)
    }
  }

  const handleMissToken = () => {
    ToastComponent({ message: 'Vui lòng đăng nhập để xem lịch sử mua hàng', type: 'error' })
    setIsMissToken(true)
  }

  useEffect(() => {
    console.log({ tokenFromWebview })
    if (!!tokenFromWebview) {
      setOnFetching(true)
    }
  }, [tokenFromWebview])

  useEffect(() => {
    onFetching && handleFetchingHistoryShoping()
  }, [onFetching])

  return (
    <div className={cn('pt-[70px] 3xl:pt-[80px]', isWebview ? 'pt-0' : '')}>
      <div className='ct-container mb-[60px]'>
        {!isWebview && (
          <div className='mt-10 '>
            <ListBreadcrumbs list={listBreadcrumbs} />
          </div>
        )}
        {/* <ModalRebuy isOpen={isOpenModalRebuy} onClose={() => setIsOpenModalRebuy(false)} /> */}

        {!tokenFromWebview ? null : (
          <div className='flex flex-col gap-6'>
            <div className='mb-5 mt-9 text-2xl font-semibold uppercase'>Lịch sử mua hàng</div>
            {onFetching ? (
              Array(3)
                .fill(0)
                .map((_, index) => <SekeletonItemHistory key={index} />)
            ) : historyShoping?.length === 0 ? (
              <NoDataItemHistory />
            ) : (
              <div className='flex flex-col gap-6'>
                {historyShoping?.map((item: IHistoryItem, index: number) => <ItemHistory item={item} isLastItem={index === historyShoping?.length - 1} key={item?.uuid} />)}
              </div>
            )}
          </div>
        )}
      </div>
      {/* Modal rebuy */}
    </div>
  )
}

export default HistoryPage
