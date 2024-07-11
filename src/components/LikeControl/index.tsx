'use client'

import { Button, Textarea, Tooltip, useDisclosure } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { motion } from 'framer-motion'

import ImageFallback from '../ImageFallback'
import { DefaultModal } from '../modal'
import { Dislike, Like1 } from 'iconsax-react'
import instance from '@/services/axiosConfig'
import ToastComponent from '../ToastComponent'

const LikeControl = ({ item }: { item: any }) => {
  const t = useTranslations('Modal')

  const [checkLike, setCheckLike] = useState({ isLiked: item.isLike, count: item.like })
  const [checkDislike, setCheckDislike] = useState<any>({ isDisliked: item.isDislike })
  const [dislikeMessage, setDislikeMessage] = useState<string>('')

  const _ServerSendingLike = async () => {
    try {
      const data: any = await instance.post(`/home/benefit`, {
        uuid: item.uuid
      })
      setCheckLike(data)
    } catch (error) {}
  }

  const _ServerSendingDislike = async () => {
    try {
      const data = await instance.post('/home/benefit/dislike', {
        uuid: item.uuid,
        message: dislikeMessage
      })
      setCheckDislike(data)
      ToastComponent({ message: t('messageToast'), type: 'success' })
    } catch (error) {}
  }

  const _HandleAction = (type: string) => {
    if (checkLike.isLiked === checkDislike.isDisliked) {
      type === 'like' ? _ServerSendingLike() : _ServerSendingDislike()
    } else {
      if (type === 'like') {
        if (checkDislike.isDisliked === true) {
          return
        } else {
          _ServerSendingLike()
        }
      } else if (type === 'dislike') {
        if (checkLike.isLiked === true) {
          _ServerSendingLike()
          _ServerSendingDislike()
        } else {
          _ServerSendingDislike()
        }
      }
    }
  }

  return (
    <Tooltip
      isDisabled={!checkDislike.isDisliked}
      content={t('messageToast')}
      placement='top'
      classNames={{
        content: 'text-base lg:text-lg px-4 py-2'
      }}
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            scale: 0,
            transition: {
              duration: 0.1,
              ease: 'easeIn'
            }
          },
          enter: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.15,
              ease: 'easeOut'
            }
          }
        }
      }}
    >
      <div className='grid grid-cols-2 gap-2'>
        <Like isDislike={checkDislike.isDisliked} isLike={checkLike.isLiked} count={checkLike.count} onClick={() => _HandleAction('like')} />
        <UnLike isDislike={checkDislike.isDisliked} setMessage={setDislikeMessage} message={dislikeMessage} onClick={() => _HandleAction('dislike')} />
      </div>
    </Tooltip>
  )
}

const Like = ({ onClick, isLike, count, isDislike }: { onClick?: any; isLike?: boolean; count?: number; isDislike: boolean }) => {
  return (
    <button disabled={isDislike} className={`flex h-10 items-center justify-center gap-2 rounded-full px-8 lg:h-[48px]  ${isLike ? 'bg-primary-yellow' : 'bg-[#F8F8F8]'}`} onClick={onClick}>
      <motion.div>
        <Like1 size={24} style={{ zIndex: 1000 }} />
      </motion.div>
      <span>{count}</span>
    </button>
  )
}

const UnLike = ({ onClick, isDislike, message, setMessage }: { onClick?: any; isDislike?: boolean; message: string; setMessage: any }) => {
  const t = useTranslations('Modal')

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

  const _HandleUnLike = (): void => {
    isDislike !== true && onOpen()
  }

  const _HandleSendMessage = (): void => {
    if (!!message.length) {
      onClick()
      onClose()
    }
  }

  return (
    <>
      <button
        aria-label='unlike'
        onClick={() => _HandleUnLike()}
        disabled={isDislike}
        className={`flex h-10 items-center justify-center rounded-full px-5 lg:h-[48px]  ${isDislike ? 'bg-primary-yellow' : 'bg-[#F8F8F8]'}`}
      >
        <Dislike size={24} />
      </button>
      <DefaultModal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        modalBody={
          <div className='flex h-full w-full flex-col gap-6 p-4'>
            <div className='flex items-center justify-center'>
              <ImageFallback src={'/benefitClient/Fixy-write1.webp'} alt='write-mascot' height={174} width={217} className='object-cover' />
            </div>
            <div className='flex flex-col justify-center gap-2'>
              <p className='text-lg font-medium'>{t('heading')}</p>
              <Textarea
                value={message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                placeholder={t('type')}
                minRows={2}
                className='w-full'
                classNames={{
                  input: 'text-lg',
                  inputWrapper: 'px-4 py-3 text-[#969696] border-1 border-[#E1E1E1] bg-transparent'
                }}
              />
            </div>
            <Button onPress={_HandleSendMessage} className='flex h-[44px] w-full items-center justify-center rounded-full bg-[#FCB813] text-lg font-medium '>
              {t('send')}
            </Button>
          </div>
        }
      />
    </>
  )
}

export default LikeControl
