import useSmallScreen from '@/hook/useSmallScreen'
import { IHistoryItem } from '@/interface'
import { Button, useDisclosure } from '@nextui-org/react'
import { ShoppingCart } from 'iconsax-react'
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import ImageFallback from '../ImageFallback'
import { DefaultModal } from '../modal'
import RenderBodyItemDetail from '../RenderBodyItemDetail'
import { formatMoney } from '@/utils'
import { paymentMethod, StatusOrderUniform } from '@/constants'

const ItemHistory = ({ item, isLastItem }: { item: IHistoryItem; isLastItem: boolean }) => {
  const locale = useLocale()
  const localeText = locale === 'vi' ? 'vi' : 'en'

  const [isOpenModalRebuy, setIsOpenModalRebuy] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const handleRebuy = (item: IHistoryItem) => {
    setIsOpenModalRebuy(true)
    item.thumb && onOpen()
  }

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const isSmallScreen = useSmallScreen()
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])
  console.log({ item })
  return (
    <>
      <div className={`flex flex-col gap-6 ${isLastItem ? '' : 'border-b border-b-[#E4E4E4]'} pb-6`} key={item?.uuid}>
        <time className='lg:hidden'>{item?.createdAt}</time>
        <div className='flex items-center gap-6'>
          <div className='size-[116px]'>
            <ImageFallback src={item?.thumb} alt={item?.title} height={300} width={300} className='size-full object-cover' />
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <p className='font-bold'>{item?.title}</p>
              <p className='text-2xl font-bold text-primary-blue'>
                {formatMoney(Number(item?.price))}
                {item?.currency}
              </p>
            </div>
            <div className=' hidden grid-cols-2 items-center gap-12 lg:grid'>
              {item?.package?.map((pack) => (
                <div className='flex items-center gap-4' key={pack?.uuid}>
                  <div className='size-[48px]'>
                    <ImageFallback src={pack?.thumb} alt={pack?.title} height={300} width={300} className='size-full object-cover' />
                  </div>
                  <p className='text-sm font-normal md:text-base'>
                    {pack?.title} x{pack?.quantity}
                  </p>
                  {pack?.attributes?.map((attribute) => (
                    <div key={attribute?.uuid} className='flex items-center gap-2'>
                      <p className='text-sm font-normal md:text-base'>{attribute?.name[localeText]}</p>
                      {attribute.type === 'COLOR' ? (
                        <div className='flex size-6 cursor-pointer rounded-full ring-[2px] ring-offset-2 transition' style={{ background: attribute?.selected }} />
                      ) : (
                        <p className='text-sm font-normal md:text-base'>{attribute?.selected}</p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center gap-4 lg:hidden'>
          {item?.package?.map((pack) => (
            <div className='flex items-center gap-4' key={pack.uuid}>
              <div className='size-[48px]'>
                <ImageFallback src={pack?.thumb} alt={pack?.title} height={300} width={300} className='size-full object-cover' />
              </div>
              <p className='text-sm font-normal md:text-base'>
                {pack?.title} x{pack?.quantity}
              </p>
              {pack?.attributes?.map((attribute) => (
                <div key={attribute?.uuid} className='flex items-center gap-2'>
                  <p className='text-sm font-normal md:text-base'>{attribute?.name[localeText]}</p>
                  {attribute.type === 'COLOR' ? (
                    <div className='flex size-6 cursor-pointer rounded-full ring-[2px] ring-offset-2 transition' style={{ background: attribute?.selected }} />
                  ) : (
                    <p className='text-sm font-normal md:text-base'>{attribute?.selected}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-4 text-sm md:text-base'>
          <p>Địa chỉ giao hàng: {item.location}</p>
          <p>SĐT: {item.phone}</p>
          <p>Thanh toán: {paymentMethod.find((payment) => payment?.id === Number(item?.typeOfPayment))?.name}</p>
        </div>
        <div className='flex flex-col justify-between gap-4 lg:flex-row lg:items-center'>
          <div className='flex items-center gap-6'>
            <time className='hidden lg:block'>{item.createdAt}</time>
            <div style={{ color: StatusOrderUniform.find((status) => status?.id === item?.status)?.color }} className={`flex items-center gap-2`}>
              <ShoppingCart />
              <p>{StatusOrderUniform.find((status) => status?.id === item?.status)?.name}</p>
            </div>
          </div>
          <Button onClick={() => handleRebuy(item)} className='h-[48px] rounded-full bg-primary-yellow px-10'>
            Mua lại
          </Button>
        </div>
      </div>
      <DefaultModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={isSmallScreen ? 'full' : '5xl'}
        styleHeader='pt-3 pl-6'
        hiddenHeader
        modalBody={<RenderBodyItemDetail data={item} cartItems={cartItems} setCartItems={setCartItems} onCloseDetail={onClose} />}
        className='md:mt-[140px]'
      />
    </>
  )
}
export default ItemHistory
