import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { DefaultModal } from '../modal'
import { ArrowLeft } from 'iconsax-react'
import Link from 'next/link'
import { Button, Input } from '@nextui-org/react'
import Image from 'next/image'
import { postMessageCustom } from '@/utils'
import { messageWebview } from '@/constants'

const ModalComfirmPhone = ({
  isOpen,
  onClose,
  setPhone,
  phone,
  onSending,
  setOnSending,
  isWebview
}: {
  isOpen: boolean
  onClose: () => void
  setPhone: (phone: string) => void
  phone: string
  onSending: boolean
  setOnSending: (onSending: boolean) => void
  isWebview: boolean
}) => {
  const t = useTranslations('Store')

  return (
    <DefaultModal
      isOpen={isOpen}
      onOpenChange={onClose}
      hiddenCloseBtn
      isDismissable={!isWebview}
      aria-label='modal logic'
      styleHeader='pl-0'
      title={
        isWebview ? (
          <Button
            isDisabled={onSending}
            startContent={<ArrowLeft size={24} />}
            className='h-[44px] gap-3 bg-transparent hover:bg-base-gray-2'
            onClick={() => postMessageCustom({ message: messageWebview.CANPOP })}
          >
            <p>Trở về App</p>
          </Button>
        ) : (
          <Button as={Link} href={'/'} isDisabled={onSending} startContent={<ArrowLeft size={24} />} className='h-[44px] gap-3 bg-transparent hover:bg-base-gray-2'>
            <p className='text-base'>{t('text14')}</p>
          </Button>
        )
      }
      size='5xl'
      modalBody={
        <div className='flex w-full flex-col gap-4 p-4 md:gap-6'>
          <div className='flex items-center justify-center'>
            <Image src={'/store/heart1.webp'} alt='write-mascot' height={240} width={307} className='w-auto object-cover' />
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <div className='flex flex-col gap-1'>
              <h3 className='text-base font-semibold md:text-2xl '>{t('text6')}</h3>
              <Input
                value={phone}
                onChange={(e: any) => {
                  setPhone(e.target.value)
                }}
                onKeyUp={(e: any) => {
                  if (e.key === 'Enter') {
                    setOnSending(true)
                  }
                }}
                placeholder={t('text15')}
                radius='full'
                classNames={{
                  input: 'text-base group-data-[focus=true]:text-base',
                  inputWrapper: 'h-[44px] pl-4 bg-white border-[#E1E1E1] data-[hover=true]:border-[#E1E1E1] group-data-[focus=true]:border-[#E1E1E1] border-1'
                }}
              />
            </div>
          </div>
          <form className='flex flex-col gap-2'>
            <p className='text-center text-xs md:text-base'>{t('text5')}</p>
            <Button
              onPress={() => setOnSending(true)}
              isDisabled={!phone.length || onSending}
              type='submit'
              isLoading={onSending}
              className='flex h-[40px] w-full items-center justify-center rounded-full bg-[#FCB813] text-sm font-medium md:text-base'
            >
              {t('text7')}
            </Button>
          </form>
        </div>
      }
    />
  )
}

export default ModalComfirmPhone
