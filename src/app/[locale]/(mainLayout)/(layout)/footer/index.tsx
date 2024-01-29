'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { FacebookIcon, LinkedinIcon, YoutubeIcon } from '@/components/Icons'
import { AndroidBtn, IosBtn } from '@/components/DownloadApps'
import { Location as LocationIcon, Sms as MailIcon, Call as PhoneIcon } from 'iconsax-react'

function Footer() {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const hiddenHeaderAndFooter = searchParams.get('hideHeaderAndFooter')

  const t = useTranslations('Footer')
  const td = useTranslations('Download')

  const [isWebview, sIsWebview] = useState(false)

  useEffect(() => {
    const is_uiwebview = navigator.userAgent.includes('WebView')
    sIsWebview(is_uiwebview)
  }, [])

  const listSubFooter = {
    info: [
      { title: t('about_us'), url: `/${locale}/about-us` },
      { title: t('faq'), url: `/${locale}/faq` },
      { title: t('become_worker'), url: `/${locale}/become-services-provider` },
      { title: t('promotion'), url: 'https://promotion.vuatho.com' },
    ],
    policy: [
      { title: t('guides'), url: `/${locale}/terms-and-condition` },
      { title: t('private_infomation'), url: `/${locale}/privacy-policy` },
      { title: t('contact_us'), url: `/${locale}/contact-us` },
    ],
  }

  const partnerList = [
    { id: 1, url: '/partner/sieuthimaylanh.png' },
    { id: 2, url: '/partner/dienmaygiagoc.png' },
    { id: 4, url: '/partner/vuamaylanh.png' },
    { id: 3, url: '/partner/maylanhmitsu.png' },
  ]

  const socialNetworkList = [
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
    {
      id: 'Youtube',
      icon: <YoutubeIcon size={24} />,
      link: 'https://www.youtube.com/@Vuatho.official/',
    },
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

  if (isWebview) {
    return null
  }

  if (hiddenHeaderAndFooter) return null

  return (
    <footer className='divide-y-2 divide-base-gray bg-[#fff]/20'>
      <div className='ct-container-70 space-y-10 pb-20 pt-10'>
        <div className='flex items-center justify-between'>
          <Image src='/logo/textLogo.png' alt='Logo footer' width={256} height={176} quality={100} className='pointer-events-none h-[60px] w-auto object-contain 3xl:h-[80px]' />
          <div className='flex items-center gap-4'>
            {socialNetworkList.map((e) => (
              <a rel='noopener' key={e.id} href={e.link} target='_blank' title={e.id} className='flex-center aspect-square h-20 w-fit rounded-full bg-primary-blue-2'>
                {e.icon}
              </a>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-9 gap-[20px] 3xl:gap-[40px]'>
          <div className='col-span-9 flex flex-col gap-[20px] lg:col-span-3'>
            <h5 className='text-[1.8rem] font-semibold md:text-[2rem]'>{t('contact_us')}</h5>
            <div className='flex flex-col gap-[20px]'>
              <div className='flex items-center gap-4'>
                <PhoneIcon className='text-primary-blue' variant='Bold' />
                <span className='text-[1.8rem] font-light md:text-[2rem]'>
                  <span className='text-gray-500'>(+84)</span> 912 426 404
                </span>
              </div>
              <div className='flex items-center gap-4'>
                <MailIcon className='text-primary-blue' variant='Bold' />
                <span className='text-[1.8rem] font-light md:text-[2rem]'>admin@vuatho.com</span>
              </div>
              <div className='flex items-center gap-4'>
                <LocationIcon className='!size-[24px] flex-shrink-0 text-primary-blue' variant='Bold' />
                <span className='text-[1.8rem] font-light md:text-[2rem]'>
                  {t('address')}
                  <span className='ml-2 xl:ml-0 3xl:ml-2' /> {t('location')}
                </span>
              </div>
              <p className='text-[1.8rem] font-light md:text-[2rem]'>
                <span className='font-semibold'>{t('text1')}</span>
                <span>0318063280</span>
              </p>
            </div>
          </div>
          <div className='col-span-9 grid grid-cols-8 gap-[8px] lg:col-span-6'>
            <div className='col-span-8 flex flex-col gap-[20px] md:col-span-3'>
              <h5 className='text-[1.8rem] font-semibold md:text-[2rem]'>{t('about_vuatho')}</h5>
              <div className='flex flex-col gap-[20px]'>
                {listSubFooter.info.map((item) => (
                  <LinkItem key={item.title} item={item} />
                ))}
              </div>
            </div>
            <div className='col-span-8 flex flex-col gap-[20px] md:col-span-3 '>
              <h5 className='text-[1.8rem] font-semibold md:text-[2rem]'>{t('contact_with_vuatho')}</h5>
              <div className='flex flex-col gap-[20px]'>
                {listSubFooter.policy.map((item) => (
                  <LinkItem key={item.title} item={item} />
                ))}
              </div>
            </div>
            <div className='col-span-8 flex flex-col gap-[20px] md:col-span-2'>
              <h5 className='whitespace-nowrap text-[1.8rem] font-semibold md:text-[2rem]'>{td('download')}</h5>
              <div className='flex flex-row gap-[10px] md:flex-col'>
                <AndroidBtn />
                <IosBtn />
              </div>
            </div>
          </div>
        </div>
        {/* doi tac */}
        <div className='col-span-8 flex flex-col gap-4 md:col-span-5 xl:col-span-8 xl:mt-20 xl:flex-row xl:items-center xl:justify-between xl:gap-0'>
          <h5 className='min-w-fit text-left text-[1.8rem] font-semibold md:text-[2rem]'>{t('our_partner')}</h5>
          <div className='grid w-full grid-cols-2 items-center gap-10 xl:flex xl:justify-end xl:gap-20'>
            {partnerList.map((item) => (
              <Image key={`partner-${item.id}`} alt={`partner-${item.id}`} width={194} height={64} quality={100} src={item.url} className='pointer-events-none h-20 w-auto object-contain xl:h-16' />
            ))}
          </div>
        </div>
      </div>
      <SubFooter />
    </footer>
  )
}

const LinkItem = ({ item }: { item: any }) => {
  return (
    <Link href={item.url} key={item.title} title={item.title} target={item.url.startsWith('https') ? '_blank' : ''}>
      <p className='text-[1.8rem] font-light hover:text-primary-blue md:text-[2rem]'>{item.title}</p>
    </Link>
  )
}

const SubFooter = () => {
  const t = useTranslations('Footer')
  return (
    <div className='ct-container-70 grid grid-cols-2 flex-col items-center justify-between gap-[10px] py-10 text-[1.4rem] md:flex md:flex-row md:gap-2'>
      <div>
        <h1 className='text-slate-500'>
          {t('sending')} <br /> <span className='uppercase'>{t('BCT')}</span>
        </h1>
      </div>
      {/* <Image
        alt='bo cong thuong'
        src='/daThongBao1.png'
        width={188}
        height={71}
        className='md:h-auto h-32 w-auto object-contain'
      /> */}
      <p className='text-[1.8rem] text-baseBlack'>{t('text')}</p>
      <p className='col-span-2 text-center text-[1.8rem] text-baseBlack md:text-left'>© 2023. All rights reserved.</p>
    </div>
  )
}

export default memo(Footer)
