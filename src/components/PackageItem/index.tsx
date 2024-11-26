import React, { memo } from 'react'
import ImageFallback from '../ImageFallback'
import PickColor from '../Pickcolor'
import PickText from '../PickText'
import { v4 as uuidv4 } from 'uuid'

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

export default PackageItem
