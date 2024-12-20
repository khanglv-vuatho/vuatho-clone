import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useLocale } from 'next-intl'

const Banner = () => {
  const locale = useLocale()
  const localText = locale === 'vi' ? 'vi' : 'en'
  const customGradient = 'radial-gradient(61.97% 149.07% at 83.11% 83.68%, #FFFFFF 15.14%, #FFE35E 100%)'

  const content = {
    vi: {
      joinNow: 'THAM GIA NGAY'
    },
    en: {
      joinNow: 'JOIN NOW'
    }
  }

  const selectedContent = content[localText] || content.vi

  return (
    <div className='relative w-full'>
      <Image loading='lazy' src={`/shineWithVuaTho/banner-${localText}.png`} alt='shineWithVuaTho' width={2550} height={2550} className='hidden md:block' />
      <Image loading='lazy' src={`/shineWithVuaTho/bannerMobile-${localText}.png`} alt='shineWithVuaTho' width={2550} height={2550} className='block md:hidden' />
      <Button
        as={Link}
        target='_blank'
        href='https://www.messenger.com/t/vuatho.01'
        style={{ background: customGradient }}
        className='absolute bottom-10 left-1/2 hidden h-[60px] -translate-x-1/2 px-10 text-2xl font-bold uppercase text-primary-blue md:flex'
      >
        {selectedContent.joinNow}
      </Button>
    </div>
  )
}

export default Banner
