import { Button, Textarea, useDisclosure } from '@nextui-org/react'
import { Add } from 'iconsax-react'
import { useTranslations } from 'next-intl'
import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SwiperCloth from '../SwiperCloth'
import { formatMoney } from '@/utils'
import PackageItem from '../PackageItem'
import BodyCard from '../BodyCard'
import { DefaultModal } from '../modal'
import QuantityControl from '../QuantityControl'

const RenderBodyItemDetail = memo(({ data, cartItems, setCartItems, onCloseDetail }: { data: any; cartItems: any; setCartItems: any; onCloseDetail: any }) => {
  const t = useTranslations('Store')
  const isHeaderVisible = useSelector((state: any) => state.isHeaderVisible)

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

    setCartItems(cloneItem)
  }

  const images = item.package.flatMap((item: any) => item.images)

  return (
    <div className='flex h-full flex-col gap-2 overflow-auto md:max-h-[80dvh]'>
      <div className={`${isHeaderVisible ? '' : 'mt-[90px] md:mt-0'} flex items-center justify-between px-2`}>
        <p className='text-lg font-bold'>{item?.title}</p>
        <Button className='max-h-[48px] min-h-[48px] min-w-[48px] max-w-[48px] bg-transparent px-0' onPress={onCloseDetail}>
          <Add className='rotate-45' size={32} />
        </Button>
      </div>
      <div className='flex h-[86dvh] flex-col gap-6 overflow-y-auto p-4 pb-10 pt-0 md:h-fit md:p-6 md:pb-0'>
        <div className='w-full rounded-lg'>
          <SwiperCloth data={[...images]} />
        </div>
        <div className='flex flex-col gap-4'>
          <p className='text-2xl font-semibold text-[#405AB7]'>
            {formatMoney(item?.price * quantity)}
            {item?.currency}
          </p>
          <div className='flex flex-col gap-4 divide-y *:pt-4'>
            {!!item?.package?.length && item?.package.map((itemPackage: any) => <PackageItem key={itemPackage.uuid} bigItem={{ ...item, quantity }} itemPackage={itemPackage} />)}
          </div>
          <div>
            {/* khang */}
            <Textarea
              classNames={{
                label: 'text-base',
                input: 'text-base placeholder:text-base group-data-[focus=true]:text-base',
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
            <DefaultModal
              className='h-full md:h-fit md:max-h-[80vh] md:max-w-[1000px] md:!rounded-xl'
              isOpen={isOpen}
              size='full'
              onOpenChange={onOpenChange}
              hiddenHeader
              hiddenCloseBtn
              modalBody={<BodyCard cartItems={cartItems} setCartItems={setCartItems} onCloseCart={onClose} onCloseDetail={onCloseDetail} />}
            />
          </div>
        </div>
      </div>
    </div>
  )
})
export default RenderBodyItemDetail
