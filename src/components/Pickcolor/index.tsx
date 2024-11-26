import { convertToLowerCase } from '@/utils'
import { useLocale, useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

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

export default PickColor
