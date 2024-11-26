import { useTranslations } from 'next-intl'
import { useDispatch, useSelector } from 'react-redux'
import React, { memo, useEffect, useState } from 'react'
import useSmallScreen from '@/hook/useSmallScreen'
import ToastComponent from '../ToastComponent'
import instance from '@/services/axiosConfig'
import { Button, Input, RadioGroup, Radio } from '@nextui-org/react'
import { Add } from 'iconsax-react'
import ImageFallback from '../ImageFallback'
import { formatMoney } from '@/utils'
import CartItem from '../CartItem'

const BodyCard = memo(({ cartItems, setCartItems, onCloseCart, onCloseDetail }: { cartItems: any; setCartItems: any; onCloseCart: any; onCloseDetail?: any }) => {
  const t = useTranslations('Store')
  const t2 = useTranslations('FindWorker')

  const dispatch = useDispatch()
  const isHeaderVisible = useSelector((state: any) => state.isHeaderVisible)

  const workerInfo = useSelector((state: any) => state.workerInfo)

  const currencyCurrent = useSelector((state: any) => state.currencyCurrent)
  const initalInfo = {
    name: workerInfo?.name || '',
    phone: workerInfo?.phone?.phone_number || '',
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

  const [token, setToken] = useState('')
  const isSmallScreen = useSmallScreen()

  const paymentMethodContentInit: any = {
    '1': (
      <div>
        {/* <p>{t('text34')}:</p> */}
        <p>{t('text35')}:</p>
        <ul className='list-inside list-disc '>
          <li>{t('text36')}: CÔNG TY TNHH CÔNG NGHỆ VUA THỢ</li>
          <li>{t('text37')}: 31361688</li>
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

      const data = await instance.post('/uniforms/order', payload)
      if (data?.status === 200) {
        setInfoError(initalErrorInfo)
        setInfoClient(initalInfo)
        ToastComponent({ message: t('text18'), type: 'success' })
        dispatch({ type: 'cards_store', payload: {} })

        onCloseCart()
        cartItems[0].quantity = 1
        setCartItems([...cartItems])
      }
    } catch (error) {
      console.log(error)
      ToastComponent({ message: t('text30'), type: 'error' })
    } finally {
      setOnSending(false)
      onCloseDetail && onCloseDetail()
    }
  }

  useEffect(() => {
    onSending && _HandlePostCart()
  }, [onSending])

  useEffect(() => {
    const totalPrice = cartItems.reduce((acc: any, product: any) => acc + product.price * product.quantity, 0)
    setTotalPrice(totalPrice)
  }, [cartItems])

  useEffect(() => {
    const access_token = localStorage.getItem('token') || ''
    setToken(access_token)
  }, [])

  return (
    //khang
    <div className='flex h-[calc(100dvh)] flex-col gap-6 overflow-y-auto p-4 pb-8 md:h-fit md:max-h-[70dvh] md:pb-0'>
      <div className={`${isHeaderVisible ? '' : 'mt-[90px] md:mt-0'} flex items-center justify-between`}>
        <h3 className='font-semibold md:text-2xl'>{t('text19')}</h3>
        <Button className='max-h-[48px] min-h-[48px] min-w-[48px] max-w-[48px] bg-transparent px-0' onPress={onCloseCart}>
          <Add className='rotate-45' size={32} />
        </Button>
      </div>
      <div className='flex flex-col gap-6'>
        {!!cartItems?.length ? (
          cartItems?.map((item: any) => <CartItem key={item.uuid} item={item} cartItems={cartItems} setCartItems={setCartItems} />)
        ) : (
          <div className='flex flex-col items-center justify-center gap-4'>
            <div className='max-w-[150px]'>
              <ImageFallback src={'/store/emptyCart.webp'} alt='image' width={307} height={240} className='object-cover' />
            </div>
            <p>{t('text20')}</p>
          </div>
        )}
      </div>
      {!!cartItems?.length ? (
        <div className='flex flex-col gap-2'>
          <div className='flex w-full items-center justify-between bg-[#F8F8F8]  p-3 md:p-4'>
            <p className='text-xs text-[#969696] md:text-base'>{t('text21')}</p>
            <span className='text-base font-semibold text-primary-blue md:text-2xl'>
              {formatMoney(+totalPrice)}
              {currencyCurrent?.code}
            </span>
          </div>
          <div className='flex flex-col gap-2 md:gap-4'>
            <p className='text-sm font-semibold md:text-2xl'>{t('text22')}</p>
            <div className='flex flex-col gap-2'>
              <Input
                variant='bordered'
                placeholder={t('text26')}
                value={infoClient.address}
                onChange={(e: any) => _HandleChangeValue('address', e)}
                radius='full'
                classNames={{
                  input: 'text-base',
                  inputWrapper: 'border-[#E1E1E1] data-[hover=true]:border-[#E1E1E1] group-data-[focus=true]:text-base group-data-[focus=true]:border-[#E1E1E1] border-1 h-[44px] pl-4'
                }}
              />
              <div className='flex w-full flex-col items-center gap-2 md:flex-row md:gap-4'>
                {/* khang */}
                <input
                  readOnly
                  value={infoClient.name}
                  placeholder='Họ tên'
                  className='flex h-[46px] w-full items-center justify-center rounded-full border-1 border-[#E1E1E1] pl-4 text-center focus:outline-none'
                />
                <div className='flex w-full items-center'>
                  <div className='flex h-[46px] justify-center rounded-s-full border-1 border-[#E1E1E1] pl-4 focus:outline-none'>
                    <input readOnly value={infoClient.phoneCountry} className='max-w-[46px] bg-transparent text-sm focus:outline-none' />
                  </div>
                  <div className='flex h-[46px] w-full justify-center rounded-e-full border-1 border-l-0 border-[#E1E1E1] pl-4'>
                    <input readOnly value={`${infoClient.phone}`} className='w-full bg-transparent text-sm focus:outline-none' />
                  </div>
                </div>
              </div>
            </div>
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
              <Radio classNames={{ label: 'text-base' }} value='1'>
                {t('text44')}
              </Radio>
              <Radio classNames={{ label: 'text-base' }} value='2'>
                {t('text45')}
              </Radio>
            </RadioGroup>
            {infoClient.transport !== '' ? (
              <div className='mt-[4px] flex flex-col'>
                <p>{paymentMethodContentInit[infoClient.transport]}</p>
                <p>{t2('text23')}</p>
                <ul className='list-inside list-disc'>
                  <li>{t('text49')}</li>
                  <li>{t('text51')}</li>
                </ul>
                <div className='flex'>
                  <div className='mr-4 mt-3 size-[5px] min-w-[5px] rounded-full bg-black' />
                  <div dangerouslySetInnerHTML={{ __html: `${t('text50')}` }} />
                </div>
              </div>
            ) : (
              ''
            )}
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

export default BodyCard
