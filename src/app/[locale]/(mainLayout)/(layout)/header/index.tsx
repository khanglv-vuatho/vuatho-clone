'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import { Add, ArrowDown2, HambergerMenu as MenuIcon } from 'iconsax-react'
import { useDispatch, useSelector } from 'react-redux'

import DropDownMenu from '@/components/DropDownMenu'

import LangsComp from '@/components/LangsComp'
import useSmallScreen from '@/hook/useSmallScreen'

const Header = React.memo(() => {
  return (
    <HeaderWrapper>
      <Logo />
      <RightNav />
    </HeaderWrapper>
  )
})

export const HeaderWrapper = ({ children, style }: { children: React.ReactNode; style?: string }) => {
  const [isHeaderVisible, setHeaderVisible] = useState(true)
  const [isWebview, sIsWebview] = useState(false)
  const dispatch = useDispatch()

  const searchParams = useSearchParams()
  const hiddenHeaderAndFooter = searchParams.get('hideHeaderAndFooter')

  useEffect(() => {
    const is_uiwebview = navigator.userAgent.includes('WebView')
    sIsWebview(is_uiwebview)
  }, [])

  useEffect(() => {
    let prevScrollPos = window.scrollY

    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      if (Math.abs(currentScrollPos - prevScrollPos) > 20) {
        if (currentScrollPos > prevScrollPos && currentScrollPos > 60) {
          setHeaderVisible(false)
          dispatch({ type: 'isHeaderVisible', payload: false })
        } else {
          setHeaderVisible(true)
          dispatch({ type: 'isHeaderVisible', payload: true })
        }
        prevScrollPos = currentScrollPos
      }
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
    <header id='header' className={`header fixed left-0 right-0 z-[100] w-full bg-white transition ${isHeaderVisible ? 'translate-y-0 shadow-sm' : '-translate-y-[100%]'}`}>
      <div className={twMerge(`ct-container z-[100] flex h-[70px] items-center justify-between 3xl:h-[80px]`, style)}>{children}</div>
    </header>
  )
}
type Logo = {
  isDarkMode?: boolean
}

export const Logo = memo(({ isDarkMode }: Logo) => {
  const locale = useLocale()
  const dispatch = useDispatch()

  const _handleClickLogo = useCallback(() => {
    dispatch({ type: 'toggle_open_header_dropdown', payload: true })
    dispatch({ type: 'toggle_language', payload: true })
    dispatch({ type: 'toggle_menu', payload: true })
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    })
  }, [])

  return (
    <Link onClick={_handleClickLogo} href={`/${locale}`} className='block h-fit'>
      <Image src={isDarkMode ? '/logo/logoDarkMode.svg' : '/logo/logo.svg'} alt='Logo nav' width={256} height={176} className='pointer-events-none h-[48px] w-auto object-contain 3xl:h-[70px]' />
    </Link>
  )
})

const RightNav = memo(() => {
  const toggleMenu = useSelector((state: any) => state.openMenu)
  const t = useTranslations('Download')

  const dispatch = useDispatch()

  const isSmallScreen = useSmallScreen()

  const _HandleOpenWindow = useCallback(() => {
    const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://vuatho.com'
    window.open(`${domainUrl}/vi/qrcode-download-app`, '_blank')
  }, [])

  const handleCloseMenuMobile = () => {
    dispatch({ type: 'toggle_menu', payload: true })
    dispatch({ type: 'toggle_language', payload: true })
  }

  useEffect(() => {
    toggleMenu ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto')
  }, [toggleMenu])

  return (
    <>
      <div className='hidden w-full items-center justify-end gap-10 lg:flex'>
        <div className='flex items-center gap-4'>
          <LinkList handleCloseMenuMobile={handleCloseMenuMobile} />
        </div>
        <div className='flex items-center gap-4'>
          <Button onClick={_HandleOpenWindow} disableRipple className='hidden h-[48px] w-auto rounded-xl bg-primary-yellow px-6 text-lg font-semibold text-baseBlack transition lg:block'>
            {t('download')}
          </Button>
          <LangsComp />
        </div>
      </div>
      <div className='menu-mobile block transition lg:hidden'>
        <div className='flex items-center gap-5'>
          <LangsComp />
          <Button
            aria-label='menu'
            className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg ${toggleMenu ? 'bg-primary-yellow' : 'bg-[#f8f8f8]'} `}
            disableRipple
            disableAnimation
            isIconOnly
            onClick={() => {
              dispatch({ type: 'toggle_menu', payload: toggleMenu })
              dispatch({ type: 'toggle_language', payload: true })
            }}
          >
            <MenuIcon size={32} className='cursor-pointer text-baseBlack transition' />
          </Button>
        </div>
      </div>
      {/* test */}
      <DropDownMenu
        direction={isSmallScreen ? 'right' : 'top'}
        isOpen={toggleMenu}
        className='flex h-[calc(100dvh-70px)] flex-col items-center justify-between gap-0 overflow-auto bg-primary-blue p-0'
      >
        <div className='flex w-full flex-1 flex-col'>
          <div className='ct-container flex justify-end'>
            <Button isIconOnly variant='light' disableAnimation disableRipple className='rounded-full p-6'>
              <Add
                className='flex size-[48px] flex-shrink-0 rotate-45 text-white '
                size={48}
                onClick={() => {
                  dispatch({ type: 'toggle_menu', payload: toggleMenu })
                }}
              />
            </Button>
          </div>
          <div className='flex h-full flex-1 flex-col'>
            <LinkList handleCloseMenuMobile={handleCloseMenuMobile} />
          </div>
        </div>
        <Button onClick={_HandleOpenWindow} className='flex min-h-[48px] w-full flex-shrink-0 items-center justify-center rounded-none bg-primary-yellow text-base font-semibold text-baseBlack'>
          {t('download')}
        </Button>
      </DropDownMenu>
    </>
  )
})

type TLink = {
  id: number
  title: string
  url: string
}

type TNavLink = TLink & {
  children?: TLink[]
}

const LinkList = memo(({ handleCloseMenuMobile }: { handleCloseMenuMobile?: any }) => {
  const pathname = usePathname()
  const t = useTranslations('Navbar')
  const f = useTranslations('Footer')
  const locale = useLocale()
  const router = useRouter()
  const dispatch = useDispatch()

  const openHeaderDropDownItem = useSelector((state: any) => state.openHeaderDropDownItem)

  const [storeChildrenItem, setStoreChildrenItem] = useState<TLink[]>()

  const isSmallScreen = useSmallScreen(1024)

  const navLink: TNavLink[] = [
    {
      id: 3,
      title: f('about_us'),
      url: `/${locale}/about-us`
    },
    {
      id: 3,
      title: t('text'),
      url: `/${locale}/find-services-provider`
    },
    {
      id: 2,
      title: t('text1'),
      url: `/${locale}/become-services-provider`,
      children: [
        { id: 7, title: t('become_employee'), url: `/${locale}/become-services-provider` },
        { id: 5, title: t('text2'), url: `/${locale}/rule-of-behavior` },
        { id: 6, title: t('text3'), url: `/${locale}/formal-dress-code` },
        { id: 8, title: t('store'), url: `/${locale}/store` }
      ]
    }
  ]

  const handleClick = (url: any) => {
    router.replace(url)
    handleCloseMenuMobile ? handleCloseMenuMobile() : () => {}
  }

  const handleToggleOpen = (): void => {
    dispatch({ type: 'toggle_open_header_dropdown', payload: openHeaderDropDownItem })
    dispatch({ type: 'toggle_language', payload: true })
  }

  const _handleOpenMenuItem = (title: string) => {
    setStoreChildrenItem(navLink.find((item) => item.title === title)?.children)
    handleToggleOpen()
  }

  return (
    <div className='flex w-full flex-col items-center gap-4 lg:flex-row'>
      {navLink.map((link) => {
        const isActive = pathname === link.url
        if (link?.children) {
          if (isSmallScreen) {
            return (
              <Accordion
                itemClasses={{
                  content: 'text-xl flex flex-col gap-2',
                  indicator: 'text-2xl text-white',
                  title: 'text-xl text-white font-bold p-6',
                  trigger: 'py-0 pr-8 data-[open=true]:bg-white/10'
                }}
                key={link.id}
                className='px-0 text-lg'
              >
                {/* khang */}
                <AccordionItem aria-label={t('text1')} title={t('text1')}>
                  {link?.children?.map((itemChildren) => {
                    return (
                      <button
                        key={itemChildren?.id}
                        onClick={() => handleClick(itemChildren?.url)}
                        className={`${isActive ? 'text-primary-yellow ' : ' hover:bg-white/10'} block w-full p-4 pl-8 text-start text-lg text-white duration-300`}
                      >
                        {itemChildren?.title}
                      </button>
                    )
                  })}
                </AccordionItem>
              </Accordion>
            )
          } else {
            return (
              <Button
                variant='light'
                disableRipple
                onPress={() => _handleOpenMenuItem(link.title)}
                className='flex flex-shrink-0 px-0 text-lg data-[hover=true]:bg-transparent'
                key={link.id}
                endContent={<ArrowDown2 size={24} className={`${openHeaderDropDownItem ? 'rotate-180' : ''} transition`} />}
              >
                {link.title}
              </Button>
            )
          }
        } else {
          return (
            <div key={link.id} className='w-full cursor-pointer whitespace-nowrap p-6 lg:p-0' onClick={() => handleClick(link.url)}>
              <button className={`${isActive ? '!text-primary-yellow' : ' hover:bg-white/10'} text-xl font-bold text-white duration-300 lg:hidden`}>{link.title}</button>
              <Link
                href={link.url}
                className={`hidden lg:block ${isActive ? 'text-[#0B27B6]' : ' text-baseBlack hover:text-[#0B27B6]/60'} text-lg`}
                onClick={() => dispatch({ type: 'toggle_open_header_dropdown', payload: true })}
              >
                {link.title}
              </Link>
            </div>
          )
        }
      })}

      <DropDownMenu isOpen={openHeaderDropDownItem} className='bg-primary-blue'>
        <div className='flex w-full flex-col text-end'>
          <div className='ct-container flex justify-end'>
            <Button isIconOnly variant='light' disableAnimation disableRipple className='rounded-full p-6'>
              <Add className='flex size-[48px] flex-shrink-0 rotate-45 text-white ' size={48} onClick={() => handleToggleOpen()} />
            </Button>
          </div>
          {storeChildrenItem?.map((item) => {
            const isActive = pathname.includes(item.url)
            return (
              <div className={`w-full ${isActive ? '' : 'hover:bg-white/10'}`} key={item.id} onClick={() => handleToggleOpen()}>
                <Link href={item.url} className={`ct-container block py-6 text-4xl font-bold uppercase ${isActive ? 'text-primary-yellow' : 'text-white'}`}>
                  {item.title}
                </Link>
              </div>
            )
          })}
        </div>
      </DropDownMenu>
    </div>
  )
})

export default memo(Header)
