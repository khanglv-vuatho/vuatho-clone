'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Autoplay, FreeMode, Navigation, Thumbs, Zoom } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { v4 as uuidv4 } from 'uuid'

import { Autocomplete, AutocompleteItem, Badge, Button, Input, Radio, RadioGroup, Skeleton, Textarea, useDisclosure } from '@nextui-org/react'
import { Add, ArrowLeft, Bag2, Minus, Trash } from 'iconsax-react'

import ImageFallback from '@/components/ImageFallback'
import ToastComponent from '@/components/ToastComponent'
import { ListBreadcrumbs } from '@/components/breadcrumbs'
import { DefaultModal } from '@/components/modal'
import { phoneSelect } from '@/constants'
import { IBreadcrumbWithUrl, IItemClothes, IUniform } from '@/interface'
import instance from '@/services/axiosConfig'
import { convertToLowerCase, formatMoney } from '@/utils'

import { ImageZoom } from '@/components/ImageZoom'
import useSmallScreen from '@/hook/useSmallScreen'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/zoom'

import './storeSwiper.scss'
import { useRouter } from 'next/navigation'

const Store1 = () => {
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
    const token = localStorage.getItem('token')
    setToken(token)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    onFetching && serverFetching()
  }, [onFetching])

  useEffect(() => {
    if (!!token?.length) {
      setOnFetching(true)
      setIsOpenModal(false)
      setValidToken(true)
    } else {
      setIsOpenModal(true)
    }
  }, [token])

  if (!mounted) return null

  return (
    <div className='min-h-[60vh] pt-[70px] 3xl:pt-[80px]'>
      <CheckValidWorker setToken={setToken} setValidToken={setValidToken} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      <div className='ct-container mb-[60px]'>
        <div className='mt-10'>
          <ListBreadcrumbs list={listBreadcrumbs} />
        </div>
        <div className='flex items-center justify-between'>
          <h3 className='mb-5 mt-9 text-2xl font-semibold uppercase'>{t('text4')}</h3>
        </div>
        {!isOpenModal && !validToken ? (
          <div className='flex min-h-[400px] w-full flex-col items-center justify-center gap-5'>
            <div className='max-w-[150px]'>
              <ImageFallback src={'/store/only-services-provider.webp'} width={307} height={240} alt='image' className='object-cover' />
            </div>
            <p className='max-w-[500px] text-center text-lg '>{t('text8')}</p>
            <div className='flex items-center gap-4'>
              <Button variant='bordered' className='h-[44px] w-full border-[#FCB813] px-5  font-medium text-[#282828]' radius='full' onClick={() => setIsOpenModal(true)}>
                {t('text9')}
              </Button>
              <Link href={`/${locale}/become-services-provider`}>
                <Button className='h-[44px] w-full bg-[#FCB813] px-5  font-medium text-[#282828]' radius='full'>
                  {t('text10')}
                </Button>
              </Link>
            </div>
          </div>
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
                  return <ItemClothe item={item} key={item.uuid} />
                })}
          </div>
        )}
        {/* <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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
        </div> */}
        {/* {!!listItem?.length && (
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {onFetching || onLoading
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
        )} */}
      </div>
    </div>
  )
}

const ItemClothe = memo(({ item }: { item: IItemClothes }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const isSmallScreen = useSmallScreen()

  const handleClick = useCallback((item: IItemClothes) => {
    item.thumb && onOpen()
  }, [])

  return (
    <>
      <div className='group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg shadow-[0px_4px_8px_0px_#ACACAC29]' onClick={() => handleClick(item)}>
        <div className='flex max-h-[280px] min-h-[260px] w-full items-center justify-center'>
          <ImageFallback src={item?.thumb} alt='image' height={500} width={500} className='max-h-[260px] w-full object-contain duration-300 group-hover:scale-[1.1] group-hover:overflow-hidden' />
        </div>
        <div className='flex h-full flex-col justify-between gap-2 bg-white p-4'>
          <p className='line-clamp-2 min-h-[54px] text-lg font-semibold '>{item.title}</p>
          <p className='text-lg font-semibold text-primary-blue'>
            {formatMoney(item.price)}
            {item.currency}
          </p>
        </div>
      </div>
      <DefaultModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={isSmallScreen ? 'full' : '5xl'}
        styleHeader='pt-3 pl-6'
        title={<h3 className='max-w-[90%] text-base font-semibold leading-normal md:text-2xl'>{item?.title}</h3>}
        modalBody={<RenderBodyItemDetail data={item} onCloseDetail={onClose} />}
        className='overflow-y-auto md:mt-[140px] md:max-h-[80dvh]'
      />
    </>
  )
})

const RenderBodyItemDetail = memo(({ data, onCloseDetail }: { data: any; onCloseDetail: any }) => {
  const t = useTranslations('Store')

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [noted, setNoted] = useState('')
  const [quantity, setQuantity] = useState(1)

  const [item, setItem] = useState({
    ...data
  })

  const dispatch = useDispatch()

  const _handleBookNow = () => {
    onOpen()
    const cloneItem = [{ ...item, quantity, noted }]
    dispatch({ type: 'cards_store', payload: cloneItem?.[0] })
    dispatch({ type: 'carts_store', payload: cloneItem })
  }

  const images = item.package.flatMap((item: any) => item.images)

  return (
    <div className='flex h-screen flex-col gap-6 overflow-y-auto p-4 pb-10 pt-0 md:h-fit md:p-6 md:pb-0'>
      <div className='w-full rounded-lg'>
        <SwiperCloth data={[...images]} />
      </div>
      <div className='flex flex-col gap-4'>
        <p className='text-2xl font-semibold text-[#405AB7]'>
          {formatMoney(item?.price * quantity)}
          {item?.currency}
        </p>
        <div className='flex flex-col gap-4 divide-y *:pt-4 md:max-h-[140px] md:overflow-y-auto 13inch:max-h-[320px]'>
          {!!item?.package?.length && item?.package.map((itemPackage: any) => <PackageItem key={itemPackage.uuid} bigItem={{ ...item, quantity }} itemPackage={itemPackage} />)}
        </div>
        <div>
          <Textarea
            classNames={{
              label: 'text-base',
              input: 'text-sm placeholder:',
              inputWrapper: 'border-[#E1E1E1] data-[hover=true]:border-[#E1E1E1] group-data-[focus=true]:border-[#E1E1E1] border-1 min-h-10 pl-3'
            }}
            variant='bordered'
            label='Ghi chú'
            labelPlacement='outside'
            placeholder='1 áo xanh, 1 áo trắng, ...'
            value={noted}
            onChange={(e) => setNoted(e.target.value)}
            minRows={1}
          />
        </div>
        <div className='flex items-center gap-6 pb-8 md:pb-0'>
          <div className='flex items-center gap-4'>
            <p className='select-none whitespace-nowrap text-[#969696]'>{t('text27')}</p>
            <QuantityControl quantity={quantity} setQuantity={setQuantity} minQuanlity />
          </div>
          <Button onPress={_handleBookNow} variant='bordered' radius='full' className='h-[44px] w-full border-0 bg-[#FCB813]  font-medium text-[#282828]'>
            {t('text12')}
          </Button>
          <DefaultModal isOpen={isOpen} onOpenChange={onOpenChange} hiddenHeader hiddenCloseBtn modalBody={<BodyCard onCloseCart={onClose} onCloseDetail={onCloseDetail} />} />
        </div>
      </div>
    </div>
  )
})

const BodyCard = memo(({ onCloseCart, onCloseDetail }: { onCloseCart: any; onCloseDetail?: any }) => {
  const t = useTranslations('Store')
  const dispatch = useDispatch()
  const router = useRouter()
  const locale = useLocale()

  const workerInfo = useSelector((state: any) => state.workerInfo)
  const currencyCurrent = useSelector((state: any) => state.currencyCurrent)
  const cartItems = useSelector((state: any) => state.carts_store)

  const initalInfo = {
    name: workerInfo?.name || 'full name',
    phone: workerInfo?.phone?.phone_number || '0123456789',
    phoneCountry: workerInfo?.phone?.phone_code || '+84',
    address: '',
    transport: ''
  }

  const [infoClient, setInfoClient] = useState(initalInfo)

  const initalErrorInfo = {
    name: false,
    phoneCountry: false,
    address: false,
    transport: false
  }

  const [errorInfo, setInfoError] = useState(initalErrorInfo)
  const [onSending, setOnSending] = useState(false)
  const [totalPrice, setTotalPrice] = useState('')
  const [isBuying, setIsBuying] = useState(false)

  const [token, setToken] = useState('')
  const isSmallScreen = useSmallScreen()

  const paymentMethodContentInit: any = {
    '0': (
      <div className='flex flex-col gap-2'>
        <div>
          <p>{t('text31')}:</p>
          <p>{t('text32')}.</p>
        </div>
        <i>{t('text33')}.</i>
      </div>
    ),
    '1': (
      <div>
        <p>{t('text34')}:</p>
        <p>{t('text35')}:</p>
        <ul className='list-inside list-disc '>
          <li>{t('text36')}: TONG PHUOC DAI</li>
          <li>{t('text37')}: 333 6666 88</li>
          <li>{t('text38')}</li>
          <li>{t('text39')}</li>
          <li>{t('text40')}</li>
        </ul>
      </div>
    ),
    '2': (
      <div>
        <p>{t('text41')}:</p>
        <p>{t('text42')}.</p>
        <p>{t('text43')}.</p>
      </div>
    )
  }

  const _HandleChangeValue = (type: string, value?: any) => {
    if (type === 'name') {
      setInfoClient({ ...infoClient, [type]: value?.target.value })
    } else if (type === 'phoneCountry') {
      setInfoClient({ ...infoClient, [type]: value })
    } else if (type === 'address') {
      setInfoClient({ ...infoClient, [type]: value?.target.value })
    } else if (type === 'transport') {
      setInfoClient({ ...infoClient, [type]: value?.target.value })
    }
  }

  const handleSubmit = () => {
    const checkError = {
      name: infoClient.name === '',
      phoneCountry: !infoClient.phoneCountry ? true : false,
      address: infoClient.address === '',
      transport: infoClient.transport === ''
    }

    setInfoError(checkError)

    if (+totalPrice === 0) {
      ToastComponent({ message: t('text16'), type: 'error' })
      return
    }

    if (Object.values(checkError).some((item) => item === true)) {
      ToastComponent({ message: t('text17'), type: 'error' })
      setOnSending(false)
    } else {
      //send api
      setOnSending(true)
    }
  }

  const cartItemFromRedux = useSelector((state: any) => state.cards_store)

  const _HandlePostCart = async () => {
    const { address, name } = infoClient
    try {
      const payload = {
        token,
        deliveryInformation: {
          address,
          name,
          phoneNumber: {
            phone: infoClient.phone,
            phone_code: infoClient.phoneCountry
          }
        },
        detailsOrder: {
          packageID: cartItemFromRedux?.uuid,
          quantity: cartItemFromRedux?.quantity,
          items: cartItemFromRedux?.package,
          note: cartItemFromRedux?.noted,
          payment_method: infoClient.transport
        }
      }

      cartItems[0].quantity = 1

      dispatch({ type: 'cards_store', payload: [...cartItems] })

      setIsBuying(true)
      const data = await instance.post('/uniforms/order', payload)
      if (data?.status === 200) {
        setInfoError(initalErrorInfo)
        setInfoClient(initalInfo)
        ToastComponent({ message: t('text18'), type: 'success' })
        dispatch({ type: 'cards_store', payload: {} })

        onCloseCart()
        cartItems[0].quantity = 1
        // setCartItems([...cartItems])
      }
    } catch (error) {
      console.log(error)
      ToastComponent({ message: t('text30'), type: 'error' })
    } finally {
      setOnSending(false)
      setIsBuying(false)
      onCloseDetail && onCloseDetail()
    }
  }

  useEffect(() => {
    onSending && _HandlePostCart()
  }, [onSending])

  console.log({ cartItems })

  useEffect(() => {
    const totalPrice = cartItems.reduce((acc: any, product: any) => acc + product.price * product.quantity, 0)
    setTotalPrice(totalPrice)
  }, [cartItems])

  useEffect(() => {
    const access_token = localStorage.getItem('token') || ''
    setToken(access_token)
  }, [])

  return (
    <div className='flex max-h-[90vh] flex-col gap-6 overflow-y-auto p-6'>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold  md:text-2xl'>{t('text19')}</h3>
        <Button isIconOnly onPress={onCloseCart} variant='light' className='absolute right-0 top-0 h-[48px] w-[56px]'>
          <Add className='rotate-45' size={24} />
        </Button>
      </div>
      <div className='flex max-h-[300px] flex-col gap-6 overflow-y-auto pr-12'>
        {!!cartItems?.length ? (
          cartItems?.map((item: any) => <CartItem key={item.uuid} item={item} />)
        ) : (
          <div className='flex min-h-[300px] flex-col items-center justify-center gap-4'>
            <div className='max-w-[150px]'>
              <ImageFallback src={'/store/emptyCart.webp'} alt='image' width={307} height={240} className='object-cover' />
            </div>
            <p>{t('text20')}</p>
          </div>
        )}
      </div>
      {!!cartItems?.length ? (
        <div className='flex flex-col gap-2'>
          <div className='flex w-full items-center justify-between bg-[#F8F8F8] p-4'>
            <p className='text-base text-[#969696]'>{t('text21')}</p>
            <span className='text-2xl font-semibold text-primary-blue'>
              {formatMoney(+totalPrice)}
              {currencyCurrent?.code}
            </span>
          </div>
          <div className='flex flex-col'>
            <p className='text-2xl font-semibold '>{t('text22')}</p>
            <div className='mb-[10px] flex flex-col gap-2'>
              <div className='mt-4 grid grid-cols-2 gap-4'>
                <Input
                  variant='bordered'
                  readOnly
                  value={infoClient.name}
                  onChange={(e: any) => _HandleChangeValue('name', e)}
                  placeholder='Họ tên'
                  radius='full'
                  classNames={{
                    input: ' text-sm',
                    inputWrapper: 'border-[#E1E1E1] data-[hover=true]:border-[#E1E1E1] group-data-[focus=true]:border-[#E1E1E1] border-1 h-[44px] pl-4'
                  }}
                />
                <div>
                  <div className='flex items-center'>
                    <div className='flex h-[46px] justify-center rounded-s-full border-1 border-[#E1E1E1] pl-4 focus:outline-none data-[hover=true]:border-[#E1E1E1] group-data-[focus=true]:border-[#E1E1E1]'>
                      <input readOnly value={infoClient.phoneCountry} className='max-w-[46px] bg-transparent text-sm focus:outline-none' />
                    </div>
                    <div className='flex h-[46px] w-full justify-center rounded-e-full border-1 border-l-0 border-[#E1E1E1] pl-4 data-[hover=true]:border-[#E1E1E1] group-data-[focus=true]:border-[#E1E1E1]'>
                      <input readOnly value={`${infoClient.phone}`} className='w-full bg-transparent text-sm focus:outline-none' />
                    </div>
                  </div>
                </div>
              </div>
              <Input
                variant='bordered'
                placeholder={t('text26')}
                value={infoClient.address}
                onChange={(e: any) => _HandleChangeValue('address', e)}
                radius='full'
                classNames={{
                  input: 'text-sm',
                  inputWrapper: 'border-[#E1E1E1] data-[hover=true]:border-[#E1E1E1] group-data-[focus=true]:border-[#E1E1E1] border-1 h-[44px] pl-4'
                }}
              />
            </div>
            <div className='max-h-[20vh] overflow-y-auto'>
              <RadioGroup
                isInvalid={errorInfo.transport && infoClient.transport == ''}
                label={t('text46')}
                orientation={isSmallScreen ? 'vertical' : 'horizontal'}
                onChange={(e) => _HandleChangeValue('transport', e)}
                classNames={{
                  label: 'text-base font-bold text-black',
                  wrapper: 'gap-2 lg:gap-5'
                }}
              >
                <Radio value='0' classNames={{ label: 'text-base' }}>
                  COD
                </Radio>
                <Radio classNames={{ label: 'text-base' }} value='1'>
                  {t('text44')}
                </Radio>
                <Radio classNames={{ label: 'text-base' }} value='2'>
                  {t('text45')}
                </Radio>
              </RadioGroup>
              {infoClient.transport !== '' ? <div className='mt-[10px]'>{paymentMethodContentInit[infoClient.transport]}</div> : ''}
            </div>
          </div>
          <Button onPress={handleSubmit} className='flex h-[44px] w-full items-center justify-center rounded-full bg-[#FCB813] text-base font-medium '>
            {t('text25')}
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
})

const PackageItem = memo(({ itemPackage, bigItem }: { itemPackage: any; bigItem: any }) => {
  return (
    <div className='grid grid-cols-3 gap-4 md:gap-0' key={itemPackage.uuid}>
      <div className='col-span-3 flex items-center gap-4 md:col-span-1'>
        <div className='max-h-[60px] min-w-[60px] max-w-[60px] overflow-hidden rounded-lg'>
          <ImageFallback src={itemPackage.thumb} alt='image' width={60} height={40} className='aspect-square max-h-[320px] w-auto object-contain' />
        </div>
        <p>{itemPackage.title || ''}</p>
        <div className='flex items-center gap-1'>
          <p>x</p>
          <p>{itemPackage.quantity || '1'}</p>
        </div>
      </div>
      {!!itemPackage?.attributes ? (
        <div className='col-span-3 flex items-center gap-2 pr-2 md:col-span-2 md:justify-end md:gap-4'>
          <div className='flex justify-end'>
            <div className='flex flex-col gap-2'>
              {itemPackage?.attributes?.map((attr: any) => {
                return attr.type === 'COLOR' ? (
                  <PickColor bigItem={bigItem} key={uuidv4()} itemPackage={itemPackage} itemAttr={attr} name={attr?.name} colors={attr?.values} />
                ) : (
                  <PickText bigItem={bigItem} key={uuidv4()} texts={attr?.values} itemPackage={itemPackage} itemAttr={attr} name={attr?.name} />
                )
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
})

const QuantityControl = memo(({ minQuanlity, quantity, setQuantity }: { quantity: any; setQuantity: any; minQuanlity?: boolean }) => {
  const _HandleDecrease = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }, [quantity])

  const _HandleIncrease = useCallback(() => setQuantity(quantity <= 9 ? quantity + 1 : quantity), [quantity])

  return (
    <div className='flex items-center gap-4'>
      <Button
        disabled={minQuanlity && quantity === 1}
        className='flex size-[44px]  min-h-[44px] min-w-[44px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full border-1 border-[#A5A5A5] bg-white p-0 transition-all active:scale-[1.05]'
        onClick={_HandleDecrease}
      >
        <Minus size={24} className='#292D32' />
      </Button>
      <span className='select-none font-semibold text-[#222222]'>{quantity}</span>
      <Button
        className='flex size-[44px] min-h-[44px] min-w-[44px]  flex-shrink-0 cursor-pointer items-center justify-center rounded-full border-1 border-[#222222] bg-white p-0 transition-all active:scale-[1.05]'
        onClick={_HandleIncrease}
      >
        <Add size={24} className='#292D32' />
      </Button>
    </div>
  )
})
const SwiperCloth = ({ data }: { data?: any }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const swiperRef = useRef<any>(null)

  const isSmallScreen = useSmallScreen()

  return (
    <div className='flex flex-col gap-2'>
      <Swiper
        ref={swiperRef}
        effect={'fade'}
        loop
        autoHeight
        autoplay={{
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          delay: 15000
        }}
        slidesPerView={1}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        zoom={true}
        navigation
        modules={[Autoplay, Zoom, Navigation, Thumbs]}
        className={`swiperStore z-[5] h-full w-full`}
        onActiveIndexChange={(swiper: any) => {
          setCurrentIndex(swiper.realIndex)
        }}
      >
        {data?.map((item: any, index: number) => {
          return (
            <SwiperSlide key={item.uuid} className={`${currentIndex === index ? 'visible' : 'invisible'}`}>
              <div className='flex h-[400px] w-auto items-center justify-center md:h-[300px]'>
                {isSmallScreen ? (
                  <ImageFallback src={item?.thumb} alt={item.title} height={800} width={900} className='w-auto object-contain' />
                ) : (
                  <ImageZoom src={item?.thumb} alt={item.title} height={800} width={900} style='w-auto' />
                )}
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Swiper
        onSwiper={(swiper: any) => setThumbsSwiper(swiper)}
        breakpoints={{
          300: {
            slidesPerView: 2.5
          },
          600: {
            slidesPerView: 5.5
          },
          1024: {
            slidesPerView: 7.5
          }
        }}
        freeMode
        modules={[FreeMode, Navigation, Thumbs]}
        className={`swiperPagination z-10 flex w-full justify-between`}
      >
        {data?.map((item: any, index: number) => (
          <SwiperSlide key={`swipper-slide-${index}`}>
            <div
              className={`${
                currentIndex === index ? ' border-[#FCB713]' : 'scale-90 border-transparent opacity-70'
              } flex items-center justify-center overflow-hidden rounded-md border-[3px] transition`}
            >
              <ImageFallback
                src={item?.thumb}
                alt={item.title}
                height={200}
                width={200}
                className={`aspect-square max-h-[80px] min-h-[60px] w-auto min-w-[60px] cursor-pointer select-none object-contain transition hover:scale-105 ${currentIndex === index && 'scale-105'} `}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

type TCheckValidWorker = {
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
  setToken: (value: string) => void
  setValidToken: (value: boolean) => void
}

const CheckValidWorker = ({ isOpenModal, setIsOpenModal, setToken, setValidToken }: TCheckValidWorker) => {
  const t = useTranslations('Store')

  const { onOpenChange } = useDisclosure()

  const [onSending, setOnSending] = useState<boolean>(false)

  const [phone, setPhone] = useState('')
  const [phoneCountry, setPhoneCountry] = useState('+84')

  const handleCheckValid = async () => {
    try {
      const data: any = await instance.post('/uniforms/confirm_worker', {
        phone,
        phone_code: phoneCountry
      })

      if (data.status == 200) {
        localStorage.setItem('token', data.token)
        setValidToken(true)
        setToken(data.token)
      }
    } catch (error: any) {
      console.log(error)
      setValidToken(false)
    } finally {
      setOnSending(false)
      setIsOpenModal(false)
    }
  }

  useEffect(() => {
    onSending && handleCheckValid()
  }, [onSending])

  return (
    <DefaultModal
      isOpen={isOpenModal}
      onOpenChange={onOpenChange}
      hiddenCloseBtn
      aria-label='modal logic'
      title={
        <>
          <Link href={'/'}>
            <Button startContent={<ArrowLeft size={24} />} className='h-[44px] gap-3 bg-transparent hover:bg-base-gray-2'>
              <p className='text-base'>{t('text14')}</p>
            </Button>
          </Link>
        </>
      }
      size='5xl'
      modalBody={
        <div className='flex h-full w-full flex-col gap-6 p-4'>
          <div className='flex items-center justify-center'>
            <Image src={'/store/heart1.webp'} alt='write-mascot' height={240} width={307} className='w-auto object-cover' />
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <div className='flex flex-col gap-1'>
              <h3 className='text-2xl font-semibold '>{t('text6')}</h3>
              <p>{t('text5')}</p>
            </div>
          </div>
          <form>
            <div className='flex items-center gap-4'>
              <Autocomplete
                aria-label='phone'
                defaultItems={phoneSelect}
                variant='bordered'
                className='max-w-[120px]'
                value={phoneCountry}
                radius='full'
                isRequired
                isClearable={false}
                defaultSelectedKey={phoneCountry}
                onSelectionChange={(e: any) => setPhoneCountry(e)}
                scrollShadowProps={{
                  isEnabled: false
                }}
                popoverProps={{
                  classNames: {
                    content: 'text-[1.2rem] whitespace-nowrap'
                  }
                }}
                inputProps={{
                  classNames: {
                    input: 'text-sm text-[#A5A5A5]',
                    inputWrapper: 'border-[#BABEF4] data-[hover=true]:border-[#BABEF4] group-data-[focus=true]:border-[#BABEF4] border-1 h-[44px] pl-4'
                  }
                }}
              >
                {(item: any) => (
                  <AutocompleteItem
                    key={item.value}
                    classNames={{
                      title: 'text-sm py-2'
                    }}
                  >
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <Input
                value={phone}
                onChange={(e: any) => setPhone(e.target.value)}
                placeholder={t('text15')}
                radius='full'
                classNames={{
                  input: 'text-sm',
                  inputWrapper: 'h-[44px] pl-4 bg-white border-[#E1E1E1] data-[hover=true]:border-[#E1E1E1] group-data-[focus=true]:border-[#E1E1E1] border-1'
                }}
              />
            </div>
            <Button
              onPress={() => setOnSending(true)}
              isDisabled={!phone.length || onSending}
              type='submit'
              isLoading={onSending}
              className='mt-6 flex h-[44px] w-full items-center justify-center rounded-full bg-[#FCB813] text-base font-medium '
            >
              {t('text7')}
            </Button>
          </form>
        </div>
      }
    />
  )
}

export default Store1

const PickColor = ({ colors, name, itemPackage, itemAttr, bigItem }: { colors: any; name: any[]; itemPackage: any; itemAttr: any; bigItem: any }) => {
  const t = useTranslations('Store')

  const [currentColor, setCurrentColor] = useState<string>(itemAttr?.selected ? itemAttr?.selected : colors[0])

  const locale: any = useLocale()

  const localeText = locale === 'vi' || locale === 'en' ? locale : 'en'

  const dispatch = useDispatch()

  const _handlePickColor = (color: string) => {
    if (color == currentColor) return

    setCurrentColor(color)
    bigItem.package.forEach((item: any) => {
      if (item.uuid === itemPackage.uuid) {
        itemPackage?.attributes?.forEach((itemAttrib: any) => {
          if (itemAttrib.uuid === itemAttr.uuid) {
            itemAttrib.selected = color
          }
        })
      }
    })

    dispatch({ type: 'cards_store', payload: bigItem })

    // setItem(bigItem)
  }
  return (
    <div className='grid items-center gap-2 xs:grid-cols-3 xs:gap-5'>
      <p>
        {t('text47')} {convertToLowerCase(name[localeText])}
      </p>
      <div className='col-span-2 flex w-fit items-center gap-3 rounded-md bg-[#f8f8f8] p-[6px]'>
        {colors?.map((color: any) => (
          <div
            onClick={() => _handlePickColor(color)}
            style={{ background: color }}
            key={color.uuid}
            className={`flex size-10 h-10 w-10 cursor-pointer rounded-full ring-[2px] ring-offset-2 transition ${
              color === currentColor ? 'ring-primary-yellow' : 'ring-transparent  hover:ring-primary-yellow/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

const PickText = ({ texts, name, itemPackage, itemAttr, bigItem }: { texts: any; name: string; itemPackage: any; itemAttr: any; bigItem: any }) => {
  const t = useTranslations('Store')

  const [currentText, setCurrentText] = useState(itemAttr?.selected ? itemAttr?.selected : texts[0])
  const locale: any = useLocale()

  const dispatch = useDispatch()

  const _handleChangeText = (text: string) => {
    if (text == currentText) return

    setCurrentText(text)

    bigItem.package.forEach((item: any) => {
      if (item.uuid === itemPackage.uuid) {
        itemPackage?.attributes?.forEach((itemAttrib: any) => {
          if (itemAttrib.uuid === itemAttr.uuid) {
            itemAttrib.selected = text
          }
        })
      }
    })
    dispatch({ type: 'cards_store', payload: bigItem })
    // setItem(bigItem)
  }

  const localeText = locale === 'vi' || locale === 'en' ? locale : 'en'
  return (
    <div className='grid items-center gap-2 xs:grid-cols-3 xs:gap-5'>
      <p>
        {t('text47')} {convertToLowerCase(name[localeText])}
      </p>
      <div className='col-span-2 flex items-center gap-2'>
        {texts?.map((text: any) => (
          <button
            key={text}
            onClick={() => _handleChangeText(text)}
            className={`flex size-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full text-[#222] duration-200 ${text === currentText ? 'bg-[#FCB713]' : 'bg-[#ededed]'}`}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  )
}

const CartItem = memo(({ item }: { item: any }) => {
  const [quantity, setQuantity] = useState(item.quantity)

  const cartItems = useSelector((state: any) => state.carts_store)

  const dispatch = useDispatch()

  const _handleChangeQuantity = useCallback((newQuantity: number) => {
    setQuantity(newQuantity)
    const cloneItems = [...cartItems]
    const findIndexItem = cloneItems.findIndex((cartItem: any) => cartItem.uuid === item.uuid)
    if (findIndexItem !== -1) {
      cloneItems[findIndexItem].quantity = newQuantity
      dispatch({ type: 'cards_store', payload: cloneItems?.[0] })
      dispatch({ type: 'carts_store', payload: cloneItems })
    }
  }, [])

  const _handleDeleteItem = () => {
    const cloneItems = [...cartItems]
    const findIndexItem = cloneItems.findIndex((cartItem: any) => cartItem.uuid === item.uuid)
    const newData = cloneItems.filter((cartItemData: any) => cartItemData !== cloneItems[findIndexItem])
    dispatch({ type: 'carts_store', payload: [...newData] })
  }

  return (
    <div className='flex max-h-[30vh] flex-col gap-6 overflow-y-auto'>
      <div className='grid grid-cols-3'>
        <div className='col-span-3 flex space-x-3 md:col-span-2'>
          <div className='image w-[128px]'>
            <ImageFallback src={item.thumb} alt='12312321' width={74} height={128} />
          </div>
          <div className='flex w-full flex-col gap-2'>
            <h3 className='text-lg uppercase '>{item.title}</h3>
            <div className='text-base'>
              {item.package.map((item: any) => (
                <div className='grid grid-cols-2 ' key={item.title}>
                  <div className='flex flex-col justify-center gap-1'>
                    <p>{item.title} </p>
                    {item?.attributes?.map((itemAttr: any, idx: any) => {
                      return itemAttr.type == 'COLOR' ? (
                        <div className='flex items-center gap-1 text-sm '>
                          &bull; Màu sắc{' '}
                          <div
                            style={{ background: itemAttr?.selected ? itemAttr?.selected : itemAttr.values?.[0] }}
                            className='size-6 rounded-full ring-[2px] ring-inset ring-primary-yellow'
                            key={idx}
                          />
                        </div>
                      ) : (
                        <span key={idx} className='text-sm  '>
                          &bull; Kích thước {itemAttr?.selected ? itemAttr?.selected : itemAttr?.values?.[0]}
                        </span>
                      )
                    })}
                  </div>
                  <div className='flex items-center justify-end gap-[48px]'>x{item?.quantity || 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='col-span-3 mt-[10px] flex items-start justify-end gap-4 md:col-span-1 '>
          <QuantityControl quantity={quantity} setQuantity={_handleChangeQuantity} />
          <div className='flex items-center gap-4'>
            <Button isIconOnly variant='light' radius='full' className='h-[48px] w-[48px]' onClick={_handleDeleteItem}>
              <Trash className=' text-[#FF4343]' size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})
