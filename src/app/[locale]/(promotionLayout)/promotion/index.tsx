'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button, Select, SelectItem } from '@nextui-org/react'
import {
  Apple as AppleIcon,
  GooglePlay as GooglePlayIcon,
  Location as LocationIcon,
  Sms as MailIcon,
  Call as PhoneIcon,
  Add as AddIcon,
  HambergerMenu as MenuIcon,
} from 'iconsax-react'

import { FacebookIcon, LinkedinIcon, YoutubeIcon } from '@/components/Icons'
import ImageFallback from '@/components/ImageFallback'
import { HeaderWrapper, Logo } from '../../(mainLayout)/(layout)/header'
import LangsComp from '@/components/LangsComp'
import { useUnfocusItem } from '@/hook'

import './promotion.css'
import { AndroidBtn, IosBtn } from '@/components/DownloadApps'

export const PromotionsHeader = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <RightHeader />
    </HeaderWrapper>
  )
}

export const PromotionsFooter = () => {
  const t = useTranslations('Promotion.PromotionsHeader')
  const socialNetworkList = [
    {
      id: 'Youtube',
      icon: <YoutubeIcon size={24} />,
      link: 'https://www.youtube.com/@Vuatho.official/',
    },
    {
      id: 'Facebook',
      icon: <FacebookIcon size={20} />,
      link: 'https://www.facebook.com/vuathovietnam',
    },
    // {
    //   id: 'Tiktok',
    //   icon: <TiktokIcon size={20} />,
    //   link: '	https://www.tiktok.com/@vuatho.com',
    // },
    // {
    //   id: 'Instagram',
    //   icon: <InstaIcon size={24} />,
    //   link: 'https://www.instagram.com/vuatho.official/',
    // },
    {
      id: 'Linkedin',
      icon: <LinkedinIcon size={20} />,
      link: 'https://www.linkedin.com/company/vuatho-vn/',
    },
  ]
  return (
    <footer className='ct-container-promotion grid grid-cols-1 gap-[40px] py-[40px] lg:grid-cols-5 lg:py-[80px]'>
      <div className='col-span-1 flex flex-col gap-[20px] lg:col-span-2'>
        <div className='flex flex-col'>
          <Logo />
          <p className='font-light text-base-black-1'>{t('text1')}</p>
        </div>
        <div className='flex flex-col gap-[20px]'>
          <p className='font-light text-base-black-1'>{t('text2')}</p>
          <div className='flex w-full items-center justify-between gap-[20px] md:justify-normal'>
            {socialNetworkList.map((e) => (
              <a rel='noopener' key={e.id} href={e.link} target='_blank' title={e.id}>
                <div className='flex items-center gap-[10px]'>
                  <span>{e.icon}</span>
                  <span className='font-light text-base-black-1'>{e.id}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className='col-span-1 flex flex-col gap-[14px] font-light text-base-black-1 lg:col-span-3'>
        <p className='text-[#969696] '>{t('text3')}</p>
        <div className='flex items-center gap-4'>
          <LocationIcon className='text-primary-blue' variant='Bold' />
          <span className=''>{t('text4')}</span>
        </div>
        <div className='flex items-center gap-4'>
          <PhoneIcon className='text-primary-blue' variant='Bold' />
          <span className=''>0912 426 404</span>
        </div>
        <div className='flex items-center gap-4'>
          <MailIcon className='text-primary-blue' variant='Bold' />
          <span className=''>info@vuatho.com</span>
        </div>
      </div>
    </footer>
  )
}

const RightHeader = () => {
  const td = useTranslations('Promotion.PromotionsHeader.RightHeader')
  const locale = useLocale()

  const pathName = usePathname()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const [toggleMenu, setToggleMenu] = useState(false)
  const [currentKey, setCurrentKey] = useState<any>([])

  const exclusionRef = useRef(null)

  type TPromotions = {
    id: number
    title: string
    url: string
  }

  const promotions: TPromotions[] = [
    { id: 1, title: td('title1'), url: 'promotion' },
    { id: 2, title: td('title2'), url: 'promotion/invite' },
  ]

  const menuVariants = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transiton: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transiton: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const _HandleToggleMenu = () => setToggleMenu(!toggleMenu)

  const _HandleChangePromotion = (e: any, item: TPromotions) => {
    setIsOpen(false)
    router.replace(`/${locale}/${item.url}`)
  }

  const _HandleScroll = () => {
    setIsOpen(false)
  }
  const itemRef = useUnfocusItem(() => {
    setIsOpen(false)
  }, exclusionRef)

  useEffect(() => {
    window.addEventListener('scroll', _HandleScroll)

    return () => {
      window.removeEventListener('scroll', _HandleScroll)
    }
  }, [])

  useEffect(() => {
    toggleMenu
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto')
  }, [toggleMenu])

  useEffect(() => {
    const splitArr = pathName.split('/')
    //destructuring get two last item
    const [, , ...lastTwoItems] = splitArr
    setCurrentKey([lastTwoItems.join('/').toString()])
  }, [pathName])

  const _HandleClickMenuMobile = (item: TPromotions) => {
    _HandleToggleMenu()
    router.replace(`/${locale}/${item.url}`)
  }

  return (
    <>
      <div className='hidden w-full items-center justify-end gap-[20px] lg:flex 3xl:gap-[32px]'>
        <div className='flex items-center gap-[20px] text-[1.6rem] 3xl:gap-[32px] '>
          <div className='flex h-[44px] items-center'>
            <Select
              ref={itemRef}
              disallowEmptySelection
              radius='full'
              className='w-full'
              placeholder={td('text3')}
              selectedKeys={currentKey}
              isOpen={isOpen}
              onClick={() => setIsOpen(true)}
              classNames={{
                base: 'min-w-[400px]',
                description: 'khang1',
                errorMessage: 'khang2',
                helperWrapper: 'khang3',
                innerWrapper: 'khang4',
                label: 'khang5',
                listbox: 'khang6',
                listboxWrapper: 'khang7',
                mainWrapper: 'khang8',
                popoverContent: 'khang9 max-w-max p-0',
                selectorIcon: 'khang123 w-[16px] h-[16px] right-[4%]',
                spinner: 'khang11',
                trigger: 'bg-[#FFF9ED] h-[48px] min-h-[48px] min-w-[400px] px-[20px]',
                value: 'khang222 text-[1.6rem] font-semibold',
              }}
            >
              {promotions.map((promotion) => (
                <SelectItem
                  classNames={{
                    base: 'p-[20px]',
                    description: 'zxc2',
                    selectedIcon: 'zxc3',
                    shortcut: 'zxc5',
                    title:
                      'zxc351 text-[1.4rem] text-base-black-1 font-light leading-[1.5]',
                    wrapper: 'zxc5132',
                  }}
                  key={promotion.url}
                  value={promotion.title}
                  onPress={(e) => {
                    _HandleChangePromotion(e, promotion)
                  }}
                >
                  {promotion.title}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Donwload />
          <LangsComp />
        </div>
      </div>
      <div
        className='menu-mobile block transition lg:hidden '
        onClick={_HandleToggleMenu}
      >
        {toggleMenu ? (
          <AddIcon size={32} className='rotate-45 cursor-pointer text-text transition' />
        ) : (
          <div className='flex items-center gap-[20px]'>
            <Donwload />
            <MenuIcon size={32} className='cursor-pointer text-text transition' />
          </div>
        )}
      </div>
      <AnimatePresence>
        {toggleMenu && (
          <motion.div
            initial='initial'
            animate='animate'
            exit='exit'
            variants={menuVariants}
            className='fixed bottom-0 left-0 right-0 top-[60px] z-10 flex h-[calc(100vh-60px)] origin-top flex-col items-start gap-6 overflow-auto bg-bg p-6'
          >
            {promotions.map((item) => (
              <div
                onClick={() => _HandleClickMenuMobile(item)}
                className='w-full cursor-pointer py-3 '
                key={item.id}
              >
                {item.title}
              </div>
            ))}
            <LangsComp />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

type THero = {
  title1: string
  title2: string
  desc: string
  thumb: string
  thumb1: string
  thumb2: string
  thumb3: string
}

export const Hero: React.FC<THero> = ({
  title1,
  title2,
  desc,
  thumb,
  thumb1,
  thumb2,
  thumb3,
}) => {
  const t = useTranslations('Promotion.Hero')

  return (
    <div>
      <div className='ct-container-promotion grid grid-cols-5 gap-[20px] pt-[6%]'>
        <div className='col-span-5 flex flex-col gap-[8px] md:col-span-2'>
          <h1 className='text-[2.4rem] font-semibold text-base-black-1 md:text-[3.6rem]'>
            {title1} <br /> {title2}
          </h1>
          <p className='font-light text-base-black-1'>{desc}</p>
          <div className='mt-[10px] flex items-center gap-[8px] md:mt-[32px]'>
            <Button
              className='bg-primary-blue px-[26px] py-[22px] text-[1.6rem] text-white'
              radius='full'
              onPress={() => {}}
            >
              {t('text4')}
            </Button>
            <p className='whitespace-nowrap text-[1.4rem] text-[#969696]'>
              856 {t('text5')}
            </p>
          </div>
        </div>
        <div className='col-span-5 mt-[24px] hidden md:col-span-3 md:mt-0 md:block'>
          <div>
            <ImageFallback
              src={thumb}
              alt=''
              width={773}
              height={491}
              className='object-contain'
            />
          </div>
        </div>
      </div>
      <CustomSlider thumb1={thumb1} thumb2={thumb2} thumb3={thumb3} />
    </div>
  )
}

export const GuidelinesPromotion = () => {
  const t = useTranslations('Promotion.GuidelinesPromotion')

  type TGuidelines = {
    title: string
    desc: string
    img?: string
  }

  const guidelines: TGuidelines[] = [
    {
      title: t('text1'),
      desc: t('text2'),
      img: '/promotion/guidelines1.png',
    },
    {
      title: t('text3'),
      desc: t('text4'),
      img: '/promotion/guidelines2.png',
    },
    {
      title: t('text5'),
      desc: t('text6'),
      img: '/promotion/guidelines3.png',
    },
    {
      title: t('text7'),
      desc: t('text8'),
    },
  ]

  return (
    <div className='ct-container-promotion flex flex-col gap-[20px]'>
      <h2 className='text-center text-[2.4rem] font-bold text-primary-blue md:text-[3.6rem]'>
        {t('title')}
      </h2>
      <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 xl:grid-cols-4'>
        {guidelines.map((item) => (
          <div
            key={item.title}
            className='rounded-[20px] border-2 border-[#FCB713] p-[12px] md:p-[20px]'
          >
            <div className='flex h-full flex-col justify-between gap-[10px] rounded-[10px] bg-white p-[12px] shadow-[0px_10px_20px_0px_#E2B41333] md:p-[20px]'>
              <div className='flex flex-col gap-[10px]'>
                <h4 className='text-[1.6rem] font-bold text-primary-blue'>
                  {item.title}
                </h4>
                <p className='text-[1.6rem] font-light text-base-black-1'>{item.desc}</p>
              </div>
              <div className='flex w-full justify-end'>
                {item?.img ? (
                  <div>
                    <ImageFallback
                      src={item.img}
                      width={106}
                      height={107}
                      alt='promotion-image'
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const ProtocolsPromotion = () => {
  const t = useTranslations('Download')
  const td = useTranslations('Promotion.ProtocolsPromotion')

  type TProtocols = {
    desc: string
    color: string
    background: string
  }

  const protocols: TProtocols[] = [
    {
      desc: td('text1'),
      color: 'text-[#282828]',
      background: 'bg-[#DEEDFF]',
    },
    {
      desc: td('text2'),
      color: 'text-[#282828]',
      background: 'bg-[#F5FAFF]',
    },
    {
      desc: td('text3'),
      color: 'text-[#282828]',
      background: 'bg-[#FCB713]',
    },
    {
      desc: td('text4'),
      color: 'text-[#282828]',
      background: 'bg-[#fff]',
    },
    {
      desc: td('text5'),
      color: 'text-white',
      background: 'bg-[#405AB7]',
    },
  ]
  return (
    <div className='ct-container-promotion flex flex-col gap-[20px]'>
      <div className='flex flex-col gap-[20px]'>
        <div className='flex flex-col gap-[10px] text-center'>
          <h3 className='text-[2.4rem] font-bold text-primary-blue md:text-[3.6rem]'>
            {td('title')}
          </h3>
          <p className='font-light text-base-black-1 '>{td('desc')}</p>
        </div>
        <div className='flex items-center justify-center gap-[10px]'>
          <AndroidBtn />
          <IosBtn />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-[20px] md:grid-cols-3'>
        {protocols.map((item, index) => (
          <div
            className={`flex flex-col gap-[10px] rounded-[20px] p-[20px] ${
              item.background
            } ${index === 1 ? 'md:col-span-2' : ''}`}
            key={item.desc}
          >
            <h3
              className={`text-[3.6rem] font-bold  ${
                index === 4 ? 'text-white/20' : 'text-base-black-1/20'
              }`}
            >
              {index + 1}
            </h3>
            <p className={`font-light text-base-black-1 ${item.color}`}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Reward = () => {
  const t = useTranslations('Promotion.Reward')
  return (
    <div className='bg-[#F5FAFF]'>
      <div className='ct-container-promotion py-[40px] md:py-[80px]'>
        <div className='grid grid-cols-3 items-center gap-[40px]'>
          <div className='col-span-3 flex flex-col gap-[10px] font-light text-base-black-1 md:col-span-2'>
            <h3 className='text-[2.4rem] font-bold text-primary-blue md:text-[3.6rem]'>
              {t('title')}
            </h3>
            <p> {t('text1')}</p>
            <ul className='list-inside list-disc'>
              <li>{t('text2')}</li>
              <li> {t('text3')}</li>
            </ul>
            <p>{t('text4')}</p>
            <p>{t('text5')}</p>
          </div>
          <div className='col-span-3 md:col-span-1'>
            <div>
              <ImageFallback
                src={'/promotion/thu-tuc-trao-thuong.png'}
                alt='thu-tuc-trao-thuong'
                width={377}
                height={266}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ConditionDetails = () => {
  const t = useTranslations('Promotion.ConditionDetails')
  return (
    <div className='bg-white'>
      <div className='ct-container-promotion flex flex-col gap-[10px] font-light text-base-black-1'>
        <h3 className='text-[2.4rem] font-bold text-primary-blue md:text-[3.6rem]'>
          {t('title')}
        </h3>
        <p>{t('text1')}</p>
        <p>{t('text2')}</p>
        <p>{t('text3')}</p>
        <p>{t('text4')}</p>
        <p>{t('text5')}</p>
        <p>{t('text6')}</p>
      </div>
    </div>
  )
}

export const ImportantNote = () => {
  const t = useTranslations('Promotion.ImportantNote')
  return (
    <div className='bg-gradient-to-l from-[#2559BD] to-[#3773E6] py-[40px] md:py-[80px]'>
      <div className='ct-container-promotion flex flex-col gap-[16px] font-light text-white'>
        <h3 className='text-[2.4rem] font-bold md:text-[3.6rem]'>{t('title')}</h3>
        <ul className='flex list-inside list-disc flex-col gap-[10px] pl-2'>
          <li>{t('text1')}</li>
          <li>{t('text2')}</li>
          <li>{t('text3')}</li>
          <li>{t('text4')}</li>
          <li> {t('text5')}</li>
          <li> {t('text6')}</li>
        </ul>
      </div>
    </div>
  )
}

export const ProtocolsInvite = () => {
  const t = useTranslations('Download')
  const td = useTranslations('Promotion.ProtocolsInvite')

  return (
    <div className='ct-container-promotion flex flex-col gap-[20px]'>
      <div className='flex flex-col gap-[20px] font-light text-base-black-1'>
        <div className='flex flex-col gap-[10px]'>
          <h3 className='text-[2.4rem] font-bold text-primary-blue md:text-[3.6rem]'>
            {td('title')}
          </h3>
          <p className='font-light text-base-black-1 '>{td('text1')}</p>
        </div>
        <div className='flex items-center gap-[10px]'>
          <a
            href='https://play.google.com/store/apps/details?id=com.vuatho.mobile&pli=1'
            target='_blank'
            className='group relative flex w-full max-w-[180px] select-none items-center gap-[16px] overflow-hidden rounded-xl bg-black p-[12px] text-white'
          >
            <GooglePlayIcon variant='Bold' size={36} />
            <div>
              <span className=' text-xs text-white/70'>{t('download_chplay')}</span>
              <h6 className='text-xs  md:text-base'>Google Play</h6>
            </div>
            <div className='absolute -right-1/3 top-0 h-full w-1/2 -skew-x-[30deg] bg-white/[0.15] transition group-hover:-translate-x-1/2' />
            <div className='absolute -right-1/2 top-0 h-full w-1/2 -skew-x-[30deg] bg-white/10 transition group-hover:-translate-x-1/2' />
          </a>
          <a
            href='https://play.google.com/store/apps/details?id=com.vuatho.mobile&pli=1'
            target='_blank'
            className='group relative flex w-full max-w-[180px] select-none items-center gap-[16px] overflow-hidden rounded-xl bg-black p-[12px] text-white'
          >
            <AppleIcon variant='Bold' size={36} />
            <div>
              <span className='text-xs text-white/70'>{t('download_appstore')}</span>
              <h6 className='text-xs md:text-base'>App Store</h6>
            </div>
            <div className='absolute -right-1/3 top-0 h-full w-1/2 -skew-x-[30deg] bg-white/[0.15] transition group-hover:-translate-x-1/2' />
            <div className='absolute -right-1/2 top-0 h-full w-1/2 -skew-x-[30deg] bg-white/10 transition group-hover:-translate-x-1/2' />
          </a>
        </div>
        <p>{td('text2')}</p>
        <p>{td('text3')}</p>
        <p>{td('text4')}</p>
        <div className='flex items-center gap-4'>
          {['12', '34', '2', '45', '4', '64'].map((item, index) => {
            return (
              <div
                className='flex aspect-square h-[40px] w-[40px] items-center justify-center rounded-full bg-[#DDEDFF] text-base-black-1'
                key={index}
              >
                {item}
              </div>
            )
          })}
        </div>
        <div className='flex flex-col gap-[20px] bg-[#F8F8F8] p-4 font-light text-base-black-1 md:p-24'>
          <p>{td('text5')}</p>
          <ul className='list-inside list-disc'>
            <li>{td('text6')}</li>
            <li>{td('text7')}</li>
            <li>{td('text8')}</li>
          </ul>
        </div>
        <p>{td('text9')}</p>
        <p>{td('text10')}</p>
        <p>{td('text11')}</p>
      </div>
    </div>
  )
}

const Donwload = () => {
  const td = useTranslations('Promotion.PromotionsHeader.RightHeader')

  const _HandleOpenWindow = () => {
    window.open('https://vuatho.com/vi/qrcode-download-app', '_blank')
  }
  return (
    <Button
      onClick={_HandleOpenWindow}
      className='h-[48px] w-auto rounded-full bg-primaryYellow px-6 text-[1.6rem] font-semibold text-base-black-1'
    >
      {td('download')}
    </Button>
  )
}

export const CustomSlider = ({
  thumb1,
  thumb2,
  thumb3,
}: {
  thumb1: string
  thumb2: string
  thumb3: string
}) => {
  return (
    <div className='relative col-span-5 mt-[40px] flex min-h-[300px] justify-center overflow-hidden md:hidden'>
      <div className='rank1 absolute'>
        <ImageFallback
          src={thumb1}
          alt='number1'
          width={300}
          height={310}
          className='h-auto w-72'
        />
      </div>
      <div className='rank2 absolute'>
        <ImageFallback
          src={thumb2}
          alt='number1'
          width={300}
          height={310}
          className='h-auto w-72'
        />
      </div>
      <div className='rank3 absolute'>
        <ImageFallback
          src={thumb3}
          alt='number1'
          width={300}
          height={310}
          className='h-auto w-72'
        />
      </div>
    </div>
  )
}
