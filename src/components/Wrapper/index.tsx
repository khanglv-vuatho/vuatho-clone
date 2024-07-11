'use client'

import { usePathname, useSearchParams } from 'next/navigation'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams()
  const hiddenHeaderAndFooter = searchParams.get('hideHeaderAndFooter')
  return <div className={`flex flex-col overflow-hidden  ${hiddenHeaderAndFooter ? 'gap-10 lg:gap-[100px]' : 'gap-10 pt-[70px] lg:gap-[100px] 3xl:pt-[80px]'}`}>{children}</div>
}

export const WrapperInner = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return <div className={`relative ${pathname.includes('career') ? 'lg:min-h-[calc(100dvh-400px)]' : ' min-h-[calc(100dvh-200px)]'}`}>{children}</div>
}

export default Wrapper
