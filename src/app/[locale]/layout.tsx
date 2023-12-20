import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { Lexend } from 'next/font/google'
import { redirect } from 'next/navigation'
import Script from 'next/script'
import { ToastContainer } from 'react-toastify'

import { locales } from '@/constants'

import { Providers } from './providers'

import './global.css'

export const metadata: Metadata = {
  title: {
    default: 'Trang chủ',
    template: '%s | Vua Thợ',
  },
  description: 'Ứng dụng số 1 Việt Nam',
  openGraph: {
    type: 'website',
    url: 'https://vuatho.com',
    title: 'Vua Thợ',
    description: 'Thợ nào cũng có',
    siteName: 'Vua Thợ',
    images: ['https://cdn.vuatho.com/7e73936c9eff8e7c54c018b225ec224b'],
  },
}

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
})

const timeZone = 'Asia/Ho_Chi_Minh'

export default async function RootLayout({ children, params }: any) {
  const { locale = 'vi' } = params

  const isValidLocale = locales.some((cur) => cur === locale)

  if (!isValidLocale) {
    return redirect(`/vi/${locale}`)
  }

  let messages

  try {
    messages = (await import(`../../../messages/${locale || 'vi'}.json`)).default
  } catch (error) {
    console.log(error)
  }
  return (
    <html lang={locale} className={lexend.className + ' '}>
      <body className=''>
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
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
