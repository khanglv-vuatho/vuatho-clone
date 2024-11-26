import { Button } from '@nextui-org/react'
import { Add, Minus } from 'iconsax-react'
import React, { memo, useCallback } from 'react'

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

export default QuantityControl
