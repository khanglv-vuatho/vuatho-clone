'use client'

import Image from 'next/image'
import { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

import { Autocomplete, AutocompleteItem, Badge, Button, Input, Skeleton, useDisclosure } from '@nextui-org/react'
import { Add, ArrowLeft, Bag2, Minus, Trash } from 'iconsax-react'

import ImageFallback from '@/components/ImageFallback'
import { ToastComponent } from '@/components/ToastComponent'
import { ListBreadcrumbsForDetailPress } from '@/components/breadcrumbs'
import { DefaultModal } from '@/components/modal'
import { phoneSelect } from '@/constants'
import { IBreadcrumbWithUrl, IItemClothes, IUniform } from '@/interface'
import instance from '@/services/axiosConfig'
import { formatMoney } from '@/utils'

export const Store = memo(() => {
  const td = useTranslations('listBreadcrumbs')
  const t = useTranslations('Store')
  const dispatch = useDispatch()
  const locale = useLocale()

  const currencyCurrent = useSelector((state: any) => state.currencyCurrent)

  const [onLoading, setOnLoading] = useState<boolean>(true)
  const [onFetching, setOnFetching] = useState<boolean>(false)
  const [valid, setValid] = useState(false)

  const [token, setToken] = useState<string | null>(null)

  const [isOpenModal, setIsOpenModal] = useState(true)

  const [listItem, setListItem] = useState<any[]>([])
  const [cartItems, setCartItems] = useState<any>([])

  useEffect(() => {
    setToken(localStorage.getItem('token') || '')
  }, [])

  const listBreadcrumbs: IBreadcrumbWithUrl[] = [{ title: td('home'), url: '/' }, { title: td('store') }]

  useEffect(() => {
    const storeItem: any = JSON.parse(localStorage.getItem('store') || '[]') || []
    setCartItems([...storeItem])
  }, [])

  const serverFetching = useCallback(async () => {
    if (!token?.length) return
    try {
      const data: IUniform = await instance.get('/uniforms', {
        params: {
          lang: locale,
          currency: currencyCurrent?.code,
          token,
        },
      })
      setValid(true)
      setListItem(data.list)
      setIsOpenModal(false)
      dispatch({ type: 'worker/info', payload: data.info })
    } catch (error) {
      setValid(false)
      setIsOpenModal(true)
    } finally {
      setOnFetching(false)
      setOnLoading(false)
    }
  }, [token, currencyCurrent?.code, locale])

  useEffect(() => {
    if (token === null) {
      setIsOpenModal(true)
      setOnFetching(false)
      setOnLoading(false)
      setValid(false)
      return
    }
    if (!!token?.length) {
      setIsOpenModal(false)
      setOnFetching(true)
    } else {
      setIsOpenModal(true)
      setOnFetching(false)
      setOnLoading(false)
      setValid(false)
    }
  }, [token])

  useEffect(() => {
    onFetching && serverFetching()
  }, [onFetching])

  useEffect(() => {
    currencyCurrent?.code && setOnFetching(true)
  }, [currencyCurrent?.code])

  return (
    <div className='min-h-[60vh] pt-[64px] 3xl:pt-[80px]'>
      <CheckValidWorker
        onLoading={onLoading}
        setOnLoading={setOnLoading}
        setOnFetching={setOnFetching}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setValid={setValid}
        setToken={setToken}
      />
      <div className='ct-container-70 mb-[60px]'>
        <div className='mt-[40px]'>
          <ListBreadcrumbsForDetailPress list={listBreadcrumbs} />
        </div>
        <div className='flex items-center justify-between'>
          <h3 className='mb-[20px] mt-[36px] text-[2.4rem] font-semibold uppercase '>{t('text4')}</h3>
          {valid && <Bagde cartItems={cartItems} setCartItems={setCartItems} />}
        </div>
<<<<<<< HEAD
        {!valid && !isOpenModal && !onLoading && (
=======
        {!valid && !isOpenModal && !onLoading && !onFetching && (
>>>>>>> 910737553a9bf209041691b53f489336c9a6ccab
          <div className='flex min-h-[400px] w-full flex-col items-center justify-center gap-[20px]'>
            <div className='max-w-[150px]'>
              <ImageFallback src={'/store/only-services-provider.png'} width={'307'} height={'240'} alt='image' className='object-cover' />
            </div>
            <p className='max-w-[500px] text-center text-[1.8rem] '>{t('text8')}</p>
            <div className='flex items-center gap-[16px]'>
              <Button variant='bordered' className='h-[44px] w-full border-[#FCB813] px-[20px] text-[1.5rem] font-medium text-[#282828]' radius='full' onClick={() => setIsOpenModal(true)}>
                {t('text9')}
              </Button>
              <Link href={`/${locale}/become-services-provider`}>
                <Button className='h-[44px] w-full bg-[#FCB813] px-[20px] text-[1.5rem] font-medium text-[#282828]' radius='full'>
                  {t('text10')}
                </Button>
              </Link>
            </div>
          </div>
        )}
        {!!listItem?.length && (
          <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {onFetching || onLoading
              ? Array(8)
                  .fill(null)
                  .map((_, index) => (
                    <div className='overflow-hidden rounded-[8px] shadow-[0px_4px_8px_0px_#ACACAC29]' key={index}>
                      <Skeleton className='h-[200px] w-full' />
                      <div className='flex flex-col gap-[8px] p-[16px] '>
                        <Skeleton className='h-[10px] w-1/2 rounded-[8px]' />
                        <Skeleton className='h-[10px] w-1/3 rounded-[8px]' />
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
})

const CheckValidWorker = memo(
  ({
    setOnFetching,
    onLoading,
    setOnLoading,
    setValid,
    setToken,
    isOpenModal,
    setIsOpenModal,
  }: {
    setOnFetching: any
    onLoading: boolean
    setOnLoading: any
    setValid: any
    setToken: any
    isOpenModal: any
    setIsOpenModal: any
  }) => {
    const t = useTranslations('Store')

    const { onOpenChange } = useDisclosure()

    const [onSending, setOnSending] = useState<boolean>(false)

    const [phone, setPhone] = useState('')
    const [phoneCountry, setPhoneCountry] = useState('+84')

    const _handleCheckValid = async () => {
      try {
        console.log({
          phone,
          phone_code: phoneCountry,
        })

        const data: any = await instance.post('/uniforms/confirm_worker', {
          phone,
          phone_code: phoneCountry,
        })

        if (data.status == 200) {
          localStorage.setItem('token', data.token)
          ToastComponent({ message: t('text13'), type: 'success' })
          setToken(data.token)
          setValid(true)
          setOnFetching(false)
          setIsOpenModal(false)
        } else {
          setIsOpenModal(false)
        }
      } catch (error: any) {
        setIsOpenModal(false)
      } finally {
        setOnSending(false)
        setIsOpenModal(false)
        setOnLoading(false)
      }
    }

    useEffect(() => {
      onSending && _handleCheckValid()
    }, [onSending])

    const _HandeleCheckValid = () => {
      setOnSending(true)
    }

    const _HandleSubmit = (e: any) => {
      e.preventDefault()
      _HandeleCheckValid
    }

    return (
      <>
        {onLoading ? (
          <></>
        ) : (
          <div tabIndex={0}>
            <DefaultModal
              isOpen={isOpenModal}
              onOpenChange={onOpenChange}
              hiddenCloseBtn
              aria-label='modal logic'
              title={
                <>
                  <Link href={'/'}>
                    <Button startContent={<ArrowLeft size={24} />} className='h-[44px] gap-[12px] bg-transparent hover:bg-base-gray-2'>
                      <p className='text-[1.6rem]'>{t('text14')}</p>
                    </Button>
                  </Link>
                </>
              }
              size='5xl'
              modalBody={
                <div className='flex h-full w-full flex-col gap-[24px] p-[16px]'>
                  <div className='flex items-center justify-center'>
<<<<<<< HEAD
                    <Image src={'/store/heart1.png'} priority alt='write-mascot' height={240} width={307} className='w-auto object-cover' />
=======
                    <Image src={'/store/heart1.png'} priority alt='write-mascot' height={240} width={307} className='object-cover' />
>>>>>>> 910737553a9bf209041691b53f489336c9a6ccab
                  </div>
                  <div className='flex flex-col justify-center gap-[8px]'>
                    <div className='flex flex-col gap-[4px]'>
                      <h3 className='text-[2.4rem] font-semibold '>{t('text6')}</h3>
                      <p className='font-light  '>{t('text5')}</p>
                    </div>
                  </div>
                  <form onSubmit={_HandleSubmit.bind(this)}>
                    <div className='flex items-center gap-[16px]'>
                      <Autocomplete
                        aria-label='phone'
                        defaultItems={phoneSelect}
                        variant='bordered'
                        className='max-w-[120px] '
                        value={phoneCountry}
                        radius='full'
                        isRequired
                        isClearable={false}
                        defaultSelectedKey={phoneCountry}
                        onSelectionChange={(e: any) => setPhoneCountry(e)}
                        scrollShadowProps={{
                          isEnabled: false,
                        }}
                        popoverProps={{
                          classNames: {
                            content: 'text-[1.2rem] whitespace-nowrap',
                          },
                        }}
                        inputProps={{
                          classNames: {
                            input: 'text-[1.4rem] text-[#A5A5A5]',
                            inputWrapper: 'border-[#BABEF4] data-[hover=true]:border-[#BABEF4] group-data-[focus=true]:border-[#BABEF4] border-1 h-[44px] pl-[16px]',
                          },
                        }}
                      >
                        {(item: any) => (
                          <AutocompleteItem
                            key={item.value}
                            classNames={{
                              title: 'text-[1.4rem] py-[8px]',
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
                          input: 'text-[1.4rem]',
                          inputWrapper: 'h-[44px] pl-[16px] bg-white border-[#E1E1E1] data-[hover=true]:border-[#E1E1E1] group-data-[focus=true]:border-[#E1E1E1] border-1',
                        }}
                      />
                    </div>
                    <Button
                      onPress={_HandeleCheckValid}
                      isDisabled={!phone.length || onSending}
                      type='submit'
                      isLoading={onSending}
                      className='mt-6 flex h-[44px] w-full items-center justify-center rounded-full bg-[#FCB813] text-[1.6rem] font-medium '
                    >
                      {t('text7')}
                    </Button>
                  </form>
                </div>
              }
            />
          </div>
        )}
      </>
    )
  },
)

const ItemClothe = memo(({ cartItems, setCartItems, item }: { item: IItemClothes; cartItems: any; setCartItems: any }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleClick = useCallback((item: IItemClothes) => {
    item.thumb && onOpen()
  }, [])

  return (
    <>
      <div className='group flex h-full cursor-pointer flex-col overflow-hidden rounded-[8px] shadow-[0px_4px_8px_0px_#ACACAC29]' onClick={() => handleClick(item)}>
        <div className='h-[200px] min-h-[200px] w-full overflow-hidden'>
          <ImageFallback src={item?.thumb} alt='image' height={300} width={600} className='h-full w-full object-cover duration-300 group-hover:scale-[1.1]' />
        </div>
        <div className='flex h-full flex-col justify-between gap-[8px] bg-white p-[16px]'>
          <p className='line-clamp-2 min-h-[54px] text-[1.8rem] font-semibold '>{item.title}</p>
          <p className='text-[1.8rem] font-semibold text-primary-blue'>
            {formatMoney(item.price)}
            {item.currency}
          </p>
        </div>
      </div>
      <DefaultModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        styleHeader='pt-[12px] pl-[24px]'
        title={<h3 className='max-w-[90%] text-[1.6rem] font-semibold leading-normal  md:text-[2.4rem]'>{item?.title}</h3>}
        modalBody={<RenderBodyItemDetail data={item} cartItems={cartItems} setCartItems={setCartItems} />}
      />
    </>
  )
})

const RenderBodyItemDetail = memo(({ data, cartItems, setCartItems }: { data: any; cartItems: any; setCartItems: any }) => {
  const t = useTranslations('Store')

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const [quantity, setQuantity] = useState(1)

  const [currentImage, setCurrentImage] = useState(data?.thumb || '')

  const [item, setItem] = useState({
    ...data,
    package: data.package.map((e: any, index: number) => ({
      ...e,
      uuid: `${index}-${e.title}`,
      sizes: [
        { name: 'S', isActive: true },
        { name: 'M', isActive: false },
        { name: 'L', isActive: false },
        { name: 'XL', isActive: false },
        { name: '2XL', isActive: false },
        { name: '3XL', isActive: false },
      ],
    })),
  })

  const _handleBookNow = () => {
    onOpen()
    const cloneItem = [{ ...item, quantity }]
    setCartItems(cloneItem)
  }

  const HandleChangeSize = useCallback(
    (uuid: string, sizeCheck: string) => {
      const newData = item.package.map((item: any) => {
        if (item.uuid === uuid) {
          const sizeActive = item.sizes.map((size: any) => {
            if (size.name === sizeCheck) {
              return { ...size, isActive: true }
            } else {
              return { ...size, isActive: false }
            }
          })

          return { ...item, sizes: sizeActive }
        } else {
          return item
        }
      })
      setItem({ ...item, package: newData })
    },
    [item],
  )

  const handleChangeCurrentImage = (thumb: string) => {
    console.log(thumb)
    setCurrentImage(thumb)
  }

  return (
    <div className='flex flex-col gap-[24px] p-[16px] pt-0 md:p-[24px]'>
      <div className='h-full max-h-[320px] w-full overflow-hidden rounded-[8px]'>
        <ImageFallback src={currentImage} alt='image' width={800} height={600} className='max-h-[320px] w-full object-cover' />
      </div>
      <div className='flex flex-col gap-[16px]'>
        <p className='text-[2.4rem] font-semibold text-[#405AB7]'>
          {formatMoney(item?.price * quantity)}
          {item?.currency}
        </p>
        <div className='flex max-h-[200px] flex-col gap-[16px] overflow-y-auto'>
          {!!item?.package?.length &&
            item?.package.map((itemPackage: any) => (
              <PackageItem
                key={itemPackage.uuid}
                itemPackage={itemPackage}
                HandleChangeSize={(sizeCheck: string) => HandleChangeSize(itemPackage.uuid, sizeCheck)}
                handleChangeCurrentImage={(thumb: string) => handleChangeCurrentImage(thumb)}
              />
            ))}
        </div>
        <div className='flex items-center gap-[24px]'>
          <div className='flex items-center gap-[16px]'>
            <p className='select-none whitespace-nowrap text-[#969696]'>Số lượng</p>
            <QuantityControl quantity={quantity} setQuantity={setQuantity} minQuanlity />
          </div>
          <Button onPress={_handleBookNow} variant='bordered' radius='full' className='h-[44px] w-full border-0 bg-[#FCB813] text-[1.5rem] font-medium text-[#282828]'>
            {t('text12')}
          </Button>
          <DefaultModal isOpen={isOpen} onOpenChange={onOpenChange} hiddenHeader hiddenCloseBtn modalBody={<BodyCard cartItems={cartItems} setCartItems={setCartItems} onCloseCart={onClose} />} />
        </div>
      </div>
    </div>
  )
})

const PackageItem = memo(({ itemPackage, HandleChangeSize, handleChangeCurrentImage }: { itemPackage: any; HandleChangeSize: any; handleChangeCurrentImage: any }) => {
  const t = useTranslations('Store')
  return (
    <div className='grid grid-cols-3 gap-[16px] md:gap-0' key={itemPackage.uuid}>
      <div className='col-span-3 flex items-center gap-[16px] md:col-span-1'>
        <div className='max-h-[60px] min-w-[60px] max-w-[60px] overflow-hidden rounded-[8px]'>
          <ImageFallback src={itemPackage.thumb} alt='image' width={60} height={40} className='aspect-square max-h-[320px] object-cover' onClick={() => handleChangeCurrentImage(itemPackage.thumb)} />
        </div>
        <p className='font-light '>{itemPackage.title || ''}</p>
        <p className='font-light '>x {itemPackage.quantity || '1'}</p>
      </div>
      <div className='col-span-3 flex items-center gap-[8px] pr-[8px] md:col-span-2 md:justify-end md:gap-[16px]'>
        <p className='text-[#969696]'>{t('text28')}</p>
        {itemPackage.sizes.map((itemSize: any) => (
          <button
            key={itemSize.name}
            onClick={() => HandleChangeSize(itemSize.name)}
            className={`flex-center h-[40px] w-[40px] flex-shrink-0 cursor-pointer rounded-full text-[#222] duration-200 ${itemSize.isActive ? 'bg-[#FCB713]' : 'bg-[#E1E1E1]'}`}
          >
            {itemSize.name}
          </button>
        ))}
      </div>
    </div>
  )
})

const CartItem = memo(({ item, cartItems, setCartItems }: { item: any; cartItems: any[]; setCartItems: any }) => {
  const t = useTranslations('Store')

  const [quantity, setQuantity] = useState(item.quantity)

  const _handleChangeQuantity = useCallback((newQuantity: number) => {
    setQuantity(newQuantity)
    const cloneItems = [...cartItems]
    const findIndexItem = cloneItems.findIndex((cartItem: any) => cartItem.uuid === item.uuid)
    if (findIndexItem !== -1) {
      cloneItems[findIndexItem].quantity = newQuantity
      setCartItems(cloneItems)
    }
  }, [])

  const _handleDeleteItem = () => {
    const cloneItems = [...cartItems]
    const findIndexItem = cloneItems.findIndex((cartItem: any) => cartItem.uuid === item.uuid)
    const newData = cloneItems.filter((cartItemData: any) => cartItemData !== cloneItems[findIndexItem])
    setCartItems([...newData])
  }

  return (
    <div className='flex flex-col gap-[24px]'>
      <div className='grid grid-cols-3'>
        <div className='col-span-3 flex space-x-3 md:col-span-2'>
          <div className='image w-[128px]'>
            <ImageFallback src={item.thumb} alt='12312321' width={74} height={128} />
          </div>
          <div className='flex w-full flex-col gap-[8px]'>
            <h3 className='text-[1.8rem] uppercase '>{item.title}</h3>
            <div className='text-[1.6rem]'>
              {item.package.map((item: any) => (
                <div className='grid grid-cols-2' key={item.title}>
                  <div className='flex items-center'>
                    <h3>
                      {item.title} ({item.sizes.find((i: any) => i.isActive === true).name})
                    </h3>
                  </div>
                  <div className='flex items-center justify-end gap-[48px]'>x{item?.quantity || 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='col-span-3 mt-[10px] flex items-start justify-end gap-[16px] md:col-span-1 '>
          <QuantityControl quantity={quantity} setQuantity={_handleChangeQuantity} />
          <div className='flex items-center gap-[16px]'>
            <Button isIconOnly variant='light' radius='full' className='h-[48px] w-[48px]' onClick={_handleDeleteItem}>
              <Trash className=' text-[#FF4343]' size={24} />
            </Button>
          </div>
        </div>
      </div>
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
    <div className='flex items-center gap-[16px]'>
      <Button
        disabled={minQuanlity && quantity === 1}
        className='flex-center h-[44px]  w-[44px] min-w-[unset] flex-shrink-0 cursor-pointer rounded-full border-1 border-[#A5A5A5] bg-white p-0 transition-all active:scale-[1.05]'
        onClick={_HandleDecrease}
      >
        <Minus size={24} className='#292D32' />
      </Button>
      <span className='select-none font-semibold text-[#222222]'>{quantity}</span>
      <Button
        className='flex-center  h-[44px] w-[44px] min-w-[unset] flex-shrink-0 cursor-pointer rounded-full border-1 border-[#222222] bg-white p-0 transition-all active:scale-[1.05]'
        onClick={_HandleIncrease}
      >
        <Add size={24} className='#292D32' />
      </Button>
    </div>
  )
})

const BodyCard = memo(({ cartItems, setCartItems, onCloseCart }: { cartItems: any; setCartItems: any; onCloseCart: any }) => {
  const t = useTranslations('Store')

  const workerInfo = useSelector((state: any) => state.workerInfo)
  const currencyCurrent = useSelector((state: any) => state.currencyCurrent)

  const initalInfo = {
    name: workerInfo?.full_name || 'full name',
    phone: workerInfo?.phone?.phone_number || '0123456789',
    phoneCountry: workerInfo?.phone?.phone_code || '+84',
    address: '',
  }
  const [infoCustomer, setInfoCustomer] = useState(initalInfo)

  const initalErrorInfo = {
    name: false,
    phoneCountry: false,
    address: false,
  }

  const [errorInfo, setInfoError] = useState(initalErrorInfo)
  const [onSending, setOnSending] = useState(false)
  const [totalPrice, setTotalPrice] = useState('')

  const [token, setToken] = useState('')

  const _HandleChangeValue = (type: string, value?: any) => {
    if (type === 'name') {
      setInfoCustomer({ ...infoCustomer, [type]: value?.target.value })
    } else if (type === 'phoneCountry') {
      setInfoCustomer({ ...infoCustomer, [type]: value })
    } else if (type === 'address') {
      setInfoCustomer({ ...infoCustomer, [type]: value?.target.value })
    }
  }

  const handleSubmit = () => {
    const checkError = {
      name: infoCustomer.name === '' ? true : false,
      phoneCountry: !infoCustomer.phoneCountry ? true : false,
      address: infoCustomer.address === '' ? true : false,
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

  const _HandlePostCart = async () => {
    console.log(token)

    try {
      const payload = {
        token,
        deliveryInformation: {
          ...infoCustomer,
          phoneNumber: {
            phone: infoCustomer.phone,
            phone_code: infoCustomer.phoneCountry,
          },
        },
        detailsOrder: {
          packageID: cartItems?.[0]?.uuid,
          quantity: cartItems?.[0]?.quantity,
          items: cartItems?.[0]?.package.map((item: any) => {
            const { uuid, sizes } = item
            const size = sizes.find((s: any) => s.isActive)?.name || ''
            return { uuid, size }
          }),
        },
      }

      const data = await instance.post('/uniforms/order', payload)

      setInfoError(initalErrorInfo)
      setInfoCustomer(initalInfo)
      ToastComponent({ message: t('text18'), type: 'success' })
      onCloseCart()
      cartItems[0].quantity = 1
      setCartItems([...cartItems])
    } catch (error) {
      console.log(error)
    } finally {
      setOnSending(false)
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
    <div className='flex flex-col gap-[24px] p-[24px]'>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold  md:text-[2.4rem]'>{t('text19')}</h3>
        <Button isIconOnly onPress={onCloseCart} variant='light' className='absolute right-0 top-0 h-[48px] w-[56px]'>
          <Add className='rotate-45 ' size={24} />
        </Button>
      </div>
      <div className='flex max-h-[300px] flex-col gap-[24px] overflow-y-auto pr-12'>
        {!!cartItems?.length ? (
          cartItems?.map((item: any) => <CartItem key={item.uuid} item={item} cartItems={cartItems} setCartItems={setCartItems} />)
        ) : (
          <div className='flex min-h-[300px] flex-col items-center justify-center gap-[16px]'>
            <div className='max-w-[150px]'>
              <ImageFallback src={'/store/emptyCart.png'} alt='image' width={307} height={240} className='object-cover' />
            </div>
            <p>{t('text20')}</p>
          </div>
        )}
      </div>
      {!!cartItems?.length ? (
        <div className='flex flex-col gap-[24px]'>
          <div className='flex w-full items-center justify-between bg-[#F8F8F8] p-[16px]'>
            <p className='text-[1.6rem] text-[#969696]'>{t('text21')}</p>
            <span className='text-[2.4rem] font-semibold text-primary-blue'>
              {formatMoney(+totalPrice)}
              {currencyCurrent?.code}
            </span>
          </div>
          <div className='flex flex-col'>
            <p className='text-[2.4rem] font-semibold '>{t('text22')}</p>
            <div className='mt-[16px] grid grid-cols-2 gap-[16px]'>
              <div>
                <Input
                  variant='bordered'
                  readOnly={true}
                  value={infoCustomer.name}
                  onChange={(e: any) => _HandleChangeValue('name', e)}
                  placeholder='Họ tên'
                  radius='full'
                  classNames={{
                    input: ' text-[1.4rem]',
                    inputWrapper: 'border-[#E1E1E1] data-[hover=true]:border-[#E1E1E1] group-data-[focus=true]:border-[#E1E1E1] border-1 h-[44px] pl-[16px]',
                  }}
                />
                <span className={`${errorInfo.name && infoCustomer.name === '' ? 'h-[10px] text-[1.2rem] text-red-500 opacity-100' : 'h-[10px] opacity-0'} `}>{t('text23')}</span>
              </div>
              <div>
                <div className='flex items-center'>
                  <div className='flex h-[46px] justify-center rounded-s-full border-1 border-[#E1E1E1] pl-[16px] focus:outline-none data-[hover=true]:border-[#E1E1E1] group-data-[focus=true]:border-[#E1E1E1]'>
                    <input readOnly={true} value={infoCustomer.phoneCountry} className='max-w-[46px] bg-transparent text-[1.4rem] focus:outline-none' />
                  </div>
                  <div className='flex h-[46px] w-full justify-center rounded-e-full border-1 border-l-0 border-[#E1E1E1] pl-[16px] data-[hover=true]:border-[#E1E1E1] group-data-[focus=true]:border-[#E1E1E1]'>
                    <input readOnly={true} value={`0${infoCustomer.phone}`} className='w-full bg-transparent text-[1.4rem] focus:outline-none' />
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-[4px]'>
              <Input
                variant='bordered'
                placeholder={t('text26')}
                value={infoCustomer.address}
                onChange={(e: any) => _HandleChangeValue('address', e)}
                radius='full'
                classNames={{
                  input: 'text-[1.4rem]',
                  inputWrapper: 'border-[#E1E1E1] data-[hover=true]:border-[#E1E1E1] group-data-[focus=true]:border-[#E1E1E1] border-1 h-[44px] pl-[16px]',
                }}
              />
              <span className={`${errorInfo.address && infoCustomer.address === '' ? 'h-[10px] text-[1.2rem] text-red-500 opacity-100' : 'h-[10px] opacity-0'} `}>{t('text24')}</span>
            </div>
          </div>
          <Button onPress={handleSubmit} className='flex h-[44px] w-full items-center justify-center rounded-full bg-[#FCB813] text-[1.6rem] font-medium '>
            {t('text25')}
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
})

const Bagde = memo(({ cartItems, setCartItems }: { cartItems: any[]; setCartItems: any }) => {
  const t = useTranslations('Store')

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  return null
  return (
    <>
      <Button
        onPress={onOpen}
        variant='bordered'
        className='h-[40px] items-center gap-[8px] border-[#FCB713] text-[1.6rem] text-[#FCB713]'
        startContent={
          <Badge
            content={!!cartItems?.length || 0}
            placement='top-right'
            classNames={{
              badge: 'bg-[#FF4343] text-white h-[16px] w-[16px] text-[1rem] right-[20%] top-[20%] border-0',
            }}
          >
            <Bag2 size={24} />
          </Badge>
        }
      >
        {t('text29')}
      </Button>
      <DefaultModal isOpen={isOpen} onOpenChange={onOpenChange} hiddenHeader hiddenCloseBtn modalBody={<BodyCard cartItems={cartItems} setCartItems={setCartItems} onCloseCart={onClose} />} />
    </>
  )
})
