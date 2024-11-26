import { IItemClothes } from '@/interface'
import { useDisclosure } from '@nextui-org/react'
import React, { memo, useCallback, useEffect } from 'react'
import ImageFallback from '../ImageFallback'
import { formatMoney } from '@/utils'
import { DefaultModal } from '../modal'
import useSmallScreen from '@/hook/useSmallScreen'
import RenderBodyItemDetail from '../RenderBodyItemDetail'

const ItemClothe = memo(({ cartItems, setCartItems, item }: { item: IItemClothes; cartItems: any; setCartItems: any }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const isSmallScreen = useSmallScreen()

  const handleClick = useCallback((item: IItemClothes) => {
    item.thumb && onOpen()
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

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
        hiddenHeader
        modalBody={<RenderBodyItemDetail data={item} cartItems={cartItems} setCartItems={setCartItems} onCloseDetail={onClose} />}
        className='md:mt-[140px]'
      />
    </>
  )
})
export default ItemClothe
