'use client'

import React from 'react'

import { Modal, ModalContent, ModalHeader, ModalBody, Button, ModalProps } from '@nextui-org/react'
import { Add } from 'iconsax-react'
import { twMerge } from 'tailwind-merge'

type DefaultModal = {
  isOpen: boolean
  onOpenChange: () => void
  title?: React.ReactNode | string
  modalBody?: any
  defaultOpen?: boolean
  className?: string
  hiddenCloseBtn?: boolean
  hiddenHeader?: boolean
  styleHeader?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'xs' | '3xl' | '4xl' | '5xl'
  isDismissable?: boolean
}

export const DefaultModal: React.FC<DefaultModal> = ({ isOpen, onOpenChange, modalBody, className, defaultOpen, title, hiddenCloseBtn, hiddenHeader, size, styleHeader, isDismissable = true }) => {
  return (
    <Modal
      isOpen={defaultOpen ? true : isOpen}
      onOpenChange={defaultOpen ? () => {} : onOpenChange}
      hideCloseButton
      isDismissable={isDismissable}
      defaultOpen={defaultOpen || false}
      size={size ? size : '5xl'}
      placement='center'
      classNames={{
        body: 'p-0',
        header: 'p-0 pl-8',
        base: 'rounded-xl max-w-[900px]'
      }}
    >
      <ModalContent className={twMerge(`mx-auto ${size == 'full' ? '' : 'max-w-[90%]'} p-2 md:max-w-[900px] md:p-6`, className)}>
        {(onClose) => (
          <>
            {!hiddenHeader && (
              <ModalHeader className={twMerge(`relative flex items-center ${title ? 'justify-between' : 'justify-end'}`, styleHeader)}>
                {title}
                {!hiddenCloseBtn && (
                  <Button isIconOnly radius='full' onPress={onClose} variant='light' className='absolute right-[1%] top-[10%] h-[48px] w-[48px] min-w-[unset]'>
                    <Add className='rotate-45 ' size={32} />
                  </Button>
                )}
              </ModalHeader>
            )}
            <ModalBody>{modalBody}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
