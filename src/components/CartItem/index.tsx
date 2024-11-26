import React, { memo, useCallback, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useDispatch } from 'react-redux'
import { Button } from '@nextui-org/react'
import { Trash } from 'iconsax-react'
import ImageFallback from '../ImageFallback'
import QuantityControl from '../QuantityControl'

const CartItem = memo(({ item, cartItems, setCartItems }: { item: any; cartItems: any[]; setCartItems: any }) => {
  const t = useTranslations('Store')
  const [quantity, setQuantity] = useState(item.quantity)
  const dispatch = useDispatch()

  const _handleChangeQuantity = useCallback((newQuantity: number) => {
    setQuantity(newQuantity)
    const cloneItems = [...cartItems]
    const findIndexItem = cloneItems.findIndex((cartItem: any) => cartItem.uuid === item.uuid)
    if (findIndexItem !== -1) {
      cloneItems[findIndexItem].quantity = newQuantity
      dispatch({ type: 'cards_store', payload: cloneItems?.[0] })
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
    <div className='flex h-full flex-col gap-6'>
      <div className='grid grid-cols-3'>
        <div className='col-span-3 flex space-x-3 md:col-span-2'>
          <div className='image w-[128px]'>
            <ImageFallback src={item.thumb} alt={item.thumb} width={74} height={128} />
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
                        <span key={idx} className='text-sm'>
                          &bull; {t('text48')} {itemAttr?.selected ? itemAttr?.selected : itemAttr?.values?.[0]}
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

export default CartItem
