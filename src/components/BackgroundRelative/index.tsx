'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

function BackgroundRelative({ text }: { text: string }) {
  const searchParams = useSearchParams()

  const hiddenHeaderAndFooter = searchParams.get('hideHeaderAndFooter')

  return (
    <div
      className={`flex-center relative h-[200px] min-h-[200px] w-full md:h-[300px] ${
        hiddenHeaderAndFooter ? '' : 'pt-[64px] 3xl:pt-[80px]'
      }`}
    >
      <div className='absolute inset-0 h-full w-full'>
        <Image
          src='/images/bg-relative.webp'
          alt='bg-relative'
          width={3840}
          height={889}
          quality={100}
          className='pointer-events-none h-full object-cover'
        />
      </div>
      <h1 className=' z-[10] w-full max-w-max text-[2.4rem] font-bold text-white md:text-[3.2rem]'>
        {text}
      </h1>
    </div>
  )
}

export default BackgroundRelative
