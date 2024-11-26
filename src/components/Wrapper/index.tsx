'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams()
  const hiddenHeaderAndFooter = searchParams.get('hideHeaderAndFooter')
  return <div className={`flex flex-col overflow-hidden  ${hiddenHeaderAndFooter ? 'gap-10 lg:gap-[100px]' : 'gap-10 pt-[70px] lg:gap-[100px] 3xl:pt-[80px]'}`}>{children}</div>
}

export const WrapperInner = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    let timeoutId: any

    const { hash } = window.location

    if (hash) {
      const elementId = hash.replace('#', '')
      const element = document.getElementById(elementId)

      if (element) {
        timeoutId = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 500) // Đặt thời gian trễ là 500 miligiây (0.5 giây)
      }
    }

    return () => {
      clearTimeout(timeoutId) // Xóa bỏ timeout khi component bị unmount
    }
  }, [router])

  return <div className={`relative ${pathname.includes('career') ? 'lg:min-h-[calc(100dvh-400px)]' : ' min-h-[calc(100dvh-200px)]'}`}>{children}</div>
}

export default Wrapper
