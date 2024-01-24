'use client'

import Image from 'next/image'
import { memo } from 'react'
import { useSearchParams } from 'next/navigation'

const BackgroundRelative = memo(({ text }: { text: string }) => {
  const searchParams = useSearchParams()

  const hiddenHeaderAndFooter = searchParams.get('hideHeaderAndFooter')

  return (
    <div className={`${hiddenHeaderAndFooter ? '' : 'pt-[70px] 3xl:pt-[80px]'}`}>
      <div className={`flex-center relative h-[150px] min-h-[150px] w-full`}>
        <div className='absolute inset-0 h-full w-full'>
          <Image src='/images/bg-relative.webp' alt='bg-relative' width={3840} height={889} priority className='pointer-events-none h-full' />
        </div>
        <h1 className='z-[10] w-full max-w-max text-[2.4rem] font-bold text-white lg:text-[3.6rem]'>{text}</h1>
      </div>
    </div>
  )
})

export default BackgroundRelative
