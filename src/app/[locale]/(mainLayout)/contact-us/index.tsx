'use client'

import { Button, Textarea } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import ImageFallback from '@/components/ImageFallback'
import ToastComponent from '@/components/ToastComponent'
import { InputCustom } from '@/components/input'
import instance from '@/services/axiosConfig'
import { validateEmail } from '@/utils'
import { FacebookIcon, TiktokIcon, YoutubeIcon, ZaloIcon } from '@/components/Icons'

const variants = {
  initial: {
    x: 0
  },
  exit: {
    x: 0,
    y: 0
  },
  top: {
    y: 20
  },
  bottom: {
    y: -20
  },
  left: {
    x: 20
  },
  right: {
    x: -20
  }
}

const BioPage = () => {
  const ts = useTranslations('Store')
  const t = useTranslations('Bio')

  const [mounted, setMounted] = useState(false)

  const [onSending, setOnSending] = useState(false)

  const initFormValue = {
    name: '',
    email: '',
    message: ''
  }
  const [formValue, setFormValue] = useState(initFormValue)

  const initError = {
    name: false,
    email: false,
    message: false
  }
  const [formError, setFormError] = useState(initError)

  const listSocial: { title: string; image: string; descrtiption: string; url: string; background: string; icon: React.ReactNode }[] = [
    {
      title: 'FACEBOOK',
      image: '/link-bio/item-1.png',
      descrtiption: t('text1'),
      url: 'https://www.facebook.com/vuathovietnam',
      background: 'bg-[#4B65A3]',
      icon: <FacebookIcon className='*:fill-white' />
    },
    {
      title: 'YOUTUBE',
      image: '/link-bio/item-2.png',
      descrtiption: t('text2'),
      url: 'https://www.youtube.com/@Vuatho.official',
      background: 'bg-[#FF3131]',
      icon: <YoutubeIcon className='*:fill-white' />
    },
    {
      title: 'TIKTOK',
      image: '/link-bio/item-3.png',
      descrtiption: t('text3'),
      url: 'https://www.tiktok.com/@vuatho.official',
      background: 'bg-[#212121]',
      icon: <TiktokIcon className='*:fill-white' />
    },
    {
      title: 'ZALO',
      image: '/link-bio/item-4.png',
      descrtiption: t('text4'),
      url: 'https://zalo.me/622166130485793859',
      background: 'bg-[#0068FF]',
      icon: <ZaloIcon fill='#0068FF' fillHover='#fff' />
    }
  ]

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const checkError = {
      name: formValue.name === '',
      email: !validateEmail(formValue.email),
      message: formValue.message === ''
    }

    setFormError(checkError)

    if (Object.values(checkError).some((item) => item === true)) {
      ToastComponent({ message: ts('text17'), type: 'error' })
      setOnSending(false)
    } else {
      //send api
      setOnSending(true)
    }
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
    setFormError({ ...formError, [e.target.name]: false })
  }

  const handleSubmitApi = async () => {
    try {
      await instance.post('/link-bio', {
        ...formValue
      })
      ToastComponent({ message: 'Cảm ơn bạn đã quan tâm', type: 'success' })
      setFormValue(initFormValue)
      setFormError(initError)
    } catch (error: any) {
      console.log(error)
      ToastComponent({ message: error?.response?.data?.message, type: 'error' })
    } finally {
      setOnSending(false)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    onSending && handleSubmitApi()
  }, [onSending])

  if (!mounted) return null

  return (
    <div className='flex flex-col gap-[40px] md:gap-[100px]'>
      <div className='flex w-full justify-center'>
        <ImageFallback src={'/link-bio/hero.png'} alt='hero' width={3000} height={1000} className='w-full rounded-none object-cover lg:rounded-b-2xl 2xl:w-[1920px]' />
      </div>
      <div className='ct-container flex flex-col gap-4 md:gap-6'>
        <p className='mx-auto text-xl md:text-2xl'>{t('text5')}</p>
        <div className='hidden gap-2 md:gap-5 lg:grid lg:grid-cols-2 lg:grid-rows-2'>
          {listSocial.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 100
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.05 * index,
                  duration: 0.2
                }}
                viewport={{ once: true }}
              >
                <Link target='_blank' href={item.url} className={`group relative flex flex-col gap-6 overflow-hidden rounded-2xl ${item.background} p-6`}>
                  <motion.div
                    className='absolute bottom-0 right-0 top-0 xs:z-50'
                    variants={variants}
                    transition={{
                      duration: 0.2,
                      ease: 'easeOut'
                    }}
                  >
                    <ImageFallback src={item.image} alt={item.image} width={290} height={290} className='size-full' />
                  </motion.div>
                  <div className='z-10 flex w-fit flex-col gap-6'>
                    <div className='flex w-fit flex-col text-white'>
                      <p className='text-xl font-bold leading-[1] md:text-3xl'>{item.title}</p>
                      <p className='z-[60] max-w-[55%] text-sm md:text-base'>{item.descrtiption}</p>
                    </div>
                    <Button target='_blank' as={Link} href={item.url} className='w-fit rounded-lg bg-white px-6 py-4 font-bold text-[#212121]'>
                      {t('text6')}
                    </Button>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
        <div className='flex flex-col gap-2 lg:hidden'>
          {listSocial.map((item, index) => {
            return (
              <Button target='_blank' startContent={item.icon} key={index} as={Link} href={item.url} radius='full' className={`flex h-12 items-center text-white ${item.background}`}>
                <div className='w-[76px]'>{item.title}</div>
              </Button>
            )
          })}
        </div>
      </div>

      <div className='ct-container flex justify-center'>
        <div className=''>
          <ImageFallback src={'/link-bio/hero1.png'} alt='hero-1' height={1000} width={1000} />
          <form className='relative z-20 mx-auto mb-[40px] flex w-[90%] -translate-y-[80px] flex-col  gap-6 rounded-3xl bg-gradient-to-r from-[#1646c0] to-[#1F51D3] p-6 lg:mb-[100px] lg:w-[80%] lg:gap-12 lg:p-12'>
            <p className='text-center text-2xl font-bold text-white'>{t('text7')}</p>
            <div className='flex flex-col gap-4'>
              <InputCustom label='Email' value={formValue.email} onChange={handleChangeInput} error={formError.email} />
              <InputCustom name='name' label={t('text8')} value={formValue.name} onChange={handleChangeInput} error={formError.name} />
              <Textarea
                value={formValue.message}
                onChange={handleChangeInput}
                name='message'
                placeholder={t('text9')}
                variant='bordered'
                classNames={{
                  input: 'text-white placeholder:text-white',
                  inputWrapper: `${formError.message ? 'border-red-500' : 'border-slate-300'} data-[hover=true]:border-white group-data-[focus=true]:border-white`
                }}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Button isLoading={onSending} className='flex h-[48px] items-center justify-center bg-white font-bold text-primary-blue' type='submit' onClick={handleSubmit}>
                {t('text10')}
              </Button>
              <p className='text-center text-xs text-white lg:text-sm'>{t('text11')}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BioPage
