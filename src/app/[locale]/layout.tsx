import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { ToastContainer } from 'react-toastify'

import { locales } from '@/constants'
import { Providers } from './providers'

import ScrollToTop from '@/components/ScrollToTop'
import './global.css'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/zoom'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
export const metadata: Metadata = {
  title: {
    default: 'Trang chủ',
    template: '%s | Vua Thợ'
  },
  description: 'Ứng dụng số 1 Việt Nam',
  openGraph: {
    type: 'website',
    url: 'https://vuatho.com',
    title: 'Vua Thợ',
    description: 'Thợ nào cũng có',
    siteName: 'Vua Thợ',
    images: ['https://cdn.vuatho.com/7e73936c9eff8e7c54c018b225ec224b']
  }
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

const timeZone = 'Asia/Ho_Chi_Minh'

export default async function RootLayout({ children, params }: any) {
  const { locale = 'vi' } = params
  const isValidLocale = locales.some((cur) => cur === locale)
  const headersList = headers()
  const referer = headersList.get('referer') || ''

  let url: URL | null = null
  if (referer) {
    try {
      url = new URL(referer)
    } catch (error) {
      console.error('Invalid referer URL:', referer, error)
    }
  }

  const searchParams = url ? Object.fromEntries(url.searchParams.entries()) : {} // Lấy tất cả query strings nếu URL hợp lệ
  console.log({ searchParams })
  function objectToQueryString(obj: any) {
    if (!obj) return ''
    const queryParams = new URLSearchParams(obj)
    return queryParams.toString()
  }

  let messages

  try {
    messages = (await import(`../../../messages/${locale || 'vi'}.json`)).default
  } catch (error) {
    console.log(error)
  }

  if (!isValidLocale) {
    return redirect(`/vi/${locale}?${objectToQueryString(searchParams)}`)
  }

  return (
    <html lang={locale} className={inter.className}>
      <body>
        <Script src='https://www.googletagmanager.com/gtag/js?id=G-Z8JD7Z5934' />
        <Script id='google-analytics'>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-Z8JD7Z5934');
        `}
        </Script>
        <ToastContainer />
        <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
          <Providers locale={locale}>{children}</Providers>
          <ScrollToTop />
          {/* <ChatBox /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
