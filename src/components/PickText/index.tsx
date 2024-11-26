import { useTranslations } from 'next-intl'
import { useDispatch } from 'react-redux'
import { useLocale } from 'next-intl'
import React, { useState } from 'react'
import { convertToLowerCase } from '@/utils'

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
export default PickText
