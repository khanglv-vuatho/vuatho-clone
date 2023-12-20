'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import LangsComp from '@/components/LangsComp'

import { Button } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Add as AddIcon, HambergerMenu as MenuIcon } from 'iconsax-react'
import { twMerge } from 'tailwind-merge'

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <RightNav />
    </HeaderWrapper>
  )
}

export const HeaderWrapper = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: string
}) => {
  const [isWebview, sIsWebview] = useState(false)

  const [isHeaderVisible, setHeaderVisible] = useState(true)
  const searchParams = useSearchParams()
  const hiddenHeaderAndFooter = searchParams.get('hideHeaderAndFooter')

  useEffect(() => {
    var is_uiwebview = navigator.userAgent.includes('WebView')
    sIsWebview(is_uiwebview)
  }, [])

  useEffect(() => {
    let prevScrollPos = window.scrollY
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      if (currentScrollPos > prevScrollPos && currentScrollPos > 60) {
        setHeaderVisible(false)
      } else {
        setHeaderVisible(true)
      }
      prevScrollPos = currentScrollPos
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (isWebview) {
    return null
  }
  if (hiddenHeaderAndFooter) return null
  return (
    <header
      id='header'
      className={`header fixed left-0 right-0 z-[11] w-full bg-white transition ${
        isHeaderVisible ? 'translate-y-0 shadow-sm' : '-translate-y-[100%]'
      }`}
    >
      <div
        className={twMerge(
          `ct-container-70 flex h-[70px] items-center justify-between 3xl:h-[80px]`,
          style,
        )}
      >
        {children}
      </div>
    </header>
  )
}

export const Logo = () => {
  const router = useRouter()
  const locale = useLocale()
  return (
    <button
      title='button'
      type='button'
      onClick={() => {
        router.push(`/${locale}`)
        window.scrollTo({
          top: 0,
        })
      }}
      className='block h-full'
    >
      <Image
        src='/logo/textLogo.webp'
        alt='Logo nav'
        width={256}
        height={176}
        quality={100}
        className='pointer-events-none h-[50px] w-auto object-contain 3xl:h-[80px]'
      />
    </button>
  )
}

const RightNav = () => {
  const t = useTranslations('Navbar')

  const [toggleMenu, setToggleMenu] = useState(false)
  const handleToggleMenu = () => setToggleMenu(!toggleMenu)
  const _HandleOpenWindow = () => {
    window.open('https://vuatho.com/vi/qrcode-download-app', '_blank')
  }

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

  useEffect(() => {
    toggleMenu
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto')
  }, [toggleMenu])

  return (
    <>
      <div className='hidden w-full items-center justify-end gap-[20px] lg:flex 3xl:gap-8'>
        <div className='flex items-center gap-[16px] 3xl:gap-8'>
          <LinkList />
        </div>
        <div className='flex items-center gap-[16px]'>
          <Button
            onClick={_HandleOpenWindow.bind(this)}
            className='hidden h-[44px] w-auto rounded-[44px] bg-primaryYellow px-[24px] text-[1.8rem] font-semibold text-baseBlack lg:block'
          >
            {t('download')}
          </Button>
          <LangsComp />
        </div>
      </div>
      <div className='menu-mobile block transition lg:hidden' onClick={handleToggleMenu}>
        {toggleMenu ? (
          <AddIcon size={32} className='rotate-45 cursor-pointer text-text transition' />
        ) : (
          <div className='flex items-center gap-[20px]'>
            <Button
              onClick={_HandleOpenWindow.bind(this)}
              className='h-[40px] w-auto bg-primaryYellow px-[30px] text-[1.8rem] font-semibold text-baseBlack md:px-[50px] lg:hidden xl:h-[50px]'
            >
              {t('download')}
            </Button>
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
            <LinkList handleToggleMenu={handleToggleMenu} />
            <LangsComp />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const LinkList = ({ handleToggleMenu }: { handleToggleMenu?: any }) => {
  const pathname = usePathname()
  const t = useTranslations('Navbar')
  const locale = useLocale()

  const navLink = [
    {
      id: 2,
      title: t('become_employee'),
      url: `/${locale}/become-services-provider`,
    },
    {
      id: 3,
      title: t('find_employee'),
      url: `/${locale}/find-services-provider`,
    },
    {
      id: 4,
      title: t('store'),
      url: `/${locale}/store`,
    },
  ]

  const menuVariantsLinks = {
    initial: {
      opacity: 0,
      y: '10vh',
      transiton: {
        duration: 0.5,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transiton: {
        duration: 0.7,
      },
    },
  }

  const router = useRouter()

  const handleClick = (url: any) => {
    router.replace(url)
    handleToggleMenu ? handleToggleMenu() : () => {}
  }
  return (
    <>
      {navLink.map((link) => {
        const isActive = pathname.includes(link.url)
        return (
          <div key={link.id} className='w-full whitespace-nowrap'>
            <motion.div
              variants={menuVariantsLinks}
              initial='initial'
              animate='open'
              viewport={{
                once: true,
              }}
              className='text-[1.8rem]'
            >
              <button
                onClick={() => handleClick(link.url)}
                className={`${
                  isActive
                    ? 'text-[#0B27B6] '
                    : 'text-base-black-1 hover:text-[#0B27B6]/60'
                } block duration-300 md:hidden`}
              >
                {link.title}
              </button>
              <Link
                href={link.url}
                className={`hidden md:block ${
                  isActive
                    ? 'text-[#0B27B6]'
                    : 'text-base-black-1 hover:text-[#0B27B6]/60'
                }`}
              >
                {link.title}
              </Link>
            </motion.div>
          </div>
        )
      })}
    </>
  )
}

export default Header
