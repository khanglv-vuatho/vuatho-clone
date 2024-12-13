'use client'

import { Button, Tooltip } from '@nextui-org/react'
import { Call, Location, Sms } from 'iconsax-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { memo, useEffect, useState } from 'react'

import { FacebookIcon, TiktokIcon, YoutubeIcon, ZaloIcon } from '@/components/Icons'
import { Logo } from '../header'

type SocialNetwork = {
  id: string
  link: string
  icon: any | React.ReactNode
  background: string
  color: string
}

function Footer() {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const hiddenHeaderAndFooter = searchParams.get('hideHeaderAndFooter')

  const pathname = usePathname()
  console.log({ pathname })

  const t = useTranslations('Footer')
  const td = useTranslations('Download')
  const tc = useTranslations('Career')
  const tr = useTranslations('ReleaseNotes')

  const [isWebview, sIsWebview] = useState(false)

  useEffect(() => {
    const is_uiwebview = navigator.userAgent.includes('WebView')
    sIsWebview(is_uiwebview)
  }, [])

  const listSubFooter = {
    info: [
      { title: t('faq'), url: `/${locale}/faq` },
      { title: t('become_worker'), url: `/${locale}/become-services-provider` },
      { title: t('about_us'), url: `/${locale}/about-us` },
      { title: t('promotion'), url: 'https://promotion.vuatho.com' },
      { title: tr('release'), url: `/${locale}/release-notes` }
    ],
    policy: [
      { title: t('guides'), url: `/${locale}/terms-and-condition` },
      { title: t('private_infomation'), url: `/${locale}/privacy-policy` },
      { title: t('contact_us'), url: `/${locale}/contact-us` },
      { title: 'White Paper', url: './VT-White-Paper.pdf', blank: true },
      { title: tc('title'), url: `/${locale}/tuyen-dung` }
    ]
  }

  const partnerList = [
    { id: 1, url: '/partner/sieuthimaylanh.webp', link: 'https://sieuthimaylanh.com' },
    { id: 2, url: '/partner/dienmaygiagoc.webp', link: 'https://dienmaygiagoc.com.vn' },
    { id: 4, url: '/partner/logo_vuamaylanh_blue.svg', link: 'https://vuamaylanh.com' },
    { id: 3, url: '/partner/maylanhmitsu.webp', link: 'https://maylanhmitsu.com' }
  ]

  if (isWebview) {
    return null
  }

  if (hiddenHeaderAndFooter) return null
  if (pathname.includes('toa-sang-cung-vua-tho')) return null
  return (
    <footer>
      <div className='bg-[#F6F9FF]'>
        <div className='ct-container grid grid-cols-2 gap-5 py-5 lg:gap-10'>
          <Image src='/logo/textLogo.webp' alt='Logo footer' width={256} height={176} className='pointer-events-none hidden h-[60px] w-auto object-contain lg:block 3xl:h-[80px]' />
          {/* doi tac */}
          <div className='col-span-2 grid grid-cols-4 items-center gap-5 md:gap-10 lg:col-span-1'>
            {partnerList.map((item) => (
              <Link target='_blank' href={item.link} key={`partner-${item.id}`}>
                <Image alt={`partner-${item.id}`} width={194} height={64} src={item.url} className='pointer-events-none h-20 w-auto object-contain xl:h-16' />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className=' flex flex-col gap-5 bg-primary-blue py-4 lg:py-10'>
        <div className='ct-container flex items-center justify-between lg:hidden '>
          <Logo isDarkMode={true} />
          <div className='flex items-center gap-2'>
            <ListSocialItem />
          </div>
        </div>
        <div className='ct-container flex flex-col gap-8'>
          <div className='grid gap-5 lg:grid-cols-2 lg:gap-10'>
            <div className='flex flex-col gap-2'>
              <p className='text-sm  text-white lg:text-base 2xl:text-lg'>{t('contact_us')}</p>
              <div className='hidden items-center gap-6 lg:flex'>
                <ListSocialItem />
              </div>
            </div>
            <div className='flex items-center gap-4 lg:gap-5'>
              <p className='text-sm  text-white lg:text-base 2xl:text-lg'>{td('download')}: </p>
              <Link href={'https://play.google.com/store/apps/details?id=com.vuatho.mobile&pli=1'} target='_blank'>
                <Button className='h-10 items-center bg-white/10 px-4 text-sm font-semibold text-white lg:h-[54px] lg:px-6 lg:text-base 2xl:text-lg'>Google Play</Button>
              </Link>
              <Link href={'https://apps.apple.com/vn/app/vua-th%E1%BB%A3-si%C3%AAu-k%E1%BA%BFt-n%E1%BB%91i/id6467541777?l=vi'} target='_blank'>
                <Button className='h-10 items-center bg-white/10 px-4 text-sm font-semibold text-white lg:h-[54px] lg:px-6 lg:text-base 2xl:text-lg'>App Store</Button>
              </Link>
            </div>
          </div>
          <div className='grid gap-5 lg:grid-cols-2 lg:gap-10'>
            <div className='flex flex-col gap-10'>
              <div className='flex flex-col gap-4 text-sm  text-white lg:text-base 2xl:text-lg'>
                <div className='flex items-center gap-2'>
                  <Call size={24} className='text-white' />
                  <p>0912 426 404</p>
                </div>
                <div className='flex items-center gap-2'>
                  <Sms size={24} className='text-white' />
                  <p>social@vuatho.com</p>
                </div>
                <div className='flex items-start gap-2'>
                  <Location size={24} className='flex flex-shrink-0 text-white' />
                  <div>
                    <span> {t('address')}</span>
                    <span className='ml-2 xl:ml-0 3xl:ml-2' /> {t('location')}
                  </div>
                </div>
                <p>
                  {t('text1')} {t('text2')}
                </p>
              </div>
            </div>
            <div className='grid gap-8 lg:grid-cols-2'>
              <div className='flex flex-col gap-5 text-sm lg:text-base 2xl:text-lg'>
                {listSubFooter.info.map((item) => {
                  return <LinkItem key={item.title} item={item} />
                })}
              </div>
              <div className='flex flex-col gap-5 text-sm lg:text-base 2xl:text-lg'>
                {listSubFooter.policy.map((item) => {
                  return <LinkItem key={item.title} item={item} blank={item.blank} />
                })}
              </div>
            </div>
          </div>

          <div className='grid gap-5 text-sm  lg:grid-cols-2 lg:gap-10 lg:text-base 2xl:text-lg'>
            <p className='hidden text-white lg:block'>© 2023. All rights reserved.</p>
            <div className='flex items-center justify-between gap-10'>
              <p className=' text-white'>{t('text')}</p>
              <p className='text-white'>
                {t('sending')} <br className='hidden lg:block' /> <span className='uppercase'>{t('BCT')}</span>
              </p>
              {/* <ImageFallback alt='bo cong thuong' src='/daThongBao1.webp' width={188} height={71} className='h-32 w-auto object-contain md:h-auto' /> */}
            </div>
            <p className='text-center text-white lg:hidden'>© 2023. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

const LinkItem = ({ item, blank }: { item: any; blank?: boolean }) => {
  return (
    <Link href={item.url} key={item.title} title={item.title} target={item.url.startsWith('https') || blank ? '_blank' : ''} className='w-fit'>
      <p className='font-semibold text-white'>{item.title}</p>
    </Link>
  )
}
const ListSocialItem: React.FC = () => {
  const socialNetworkList: SocialNetwork[] = [
    {
      id: 'Facebook',
      icon: <FacebookIcon />,
      link: 'https://www.facebook.com/vuathovietnam',
      background: 'bg-[#0068FF]',
      color: '#0068FF'
    },
    {
      id: 'Tiktok',
      icon: <TiktokIcon />,
      link: 'https://www.tiktok.com/@vuatho.official',
      background: 'bg-[#000000]',
      color: '#000000'
    },
    {
      id: 'Youtube',
      icon: <YoutubeIcon />,
      link: 'https://www.youtube.com/@Vuatho.official/',
      background: 'bg-[#FF3131]',
      color: '#FF3131'
    },
    {
      id: 'Zalo',
      icon: <ZaloIcon />,
      link: 'https://zalo.me/622166130485793859',
      background: 'bg-[#0068FF]',
      color: '#0068FF'
    }
  ]

  return (
    <ul className='flex items-center justify-center'>
      {socialNetworkList.map((network) => (
        <SocialIcon key={network.id} {...network} />
      ))}
    </ul>
  )
}

const SocialIcon: React.FC<SocialNetwork> = ({ icon: icon, link, id, background }) => {
  const [onHover, setOnHover] = useState(false)
  return (
    <Tooltip
      content={id}
      closeDelay={150}
      classNames={{
        content: `${background} text-white`
      }}
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: 'easeIn'
            }
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: 'easeOut'
            }
          }
        }
      }}
    >
      <li className='group relative mx-2' key={id} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
        <Link
          href={link}
          target='_blank'
          className='relative flex size-12 items-center justify-center overflow-hidden rounded-[20%] bg-white text-[#4d4d4d] duration-300 hover:text-white hover:shadow-[3px_2px_45px_0px_rgb(0_0_0_/_50%)]'
        >
          <div className={`absolute bottom-0 left-0 top-auto h-0 w-full duration-300 group-hover:h-full ${background}`} />
          {id === 'Zalo'
            ? React.cloneElement(icon, {
                fill: onHover ? 'white' : '#0D308C',
                className: 'text-black relative z-[10] size-[30px]',
                fillHover: onHover ? '#0068FF' : '#fff'
              })
            : React.cloneElement(icon, {
                className: '*:group-hover:fill-white text-black relative z-[10] size-[30px]'
              })}
        </Link>
      </li>
    </Tooltip>
  )
}

export default memo(Footer)
