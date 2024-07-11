import type { Metadata } from 'next'

import Footer from './(layout)/footer'
import Header from './(layout)/header'

import './globals.css'
import { WrapperInner } from '@/components/Wrapper'

export const metadata: Metadata = {
  title: {
    default: 'Trang chủ | Vua Thợ',
    template: '%s | Vua Thợ'
  },
  description: 'Ứng dụng số 1 Việt Nam'
}

export default async function RootLayout({ children }: any) {
  return (
    <>
      <Header />
      <WrapperInner>{children}</WrapperInner>
      <Footer />
    </>
  )
}
