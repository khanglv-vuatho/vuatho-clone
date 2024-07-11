'use client'

import { Button } from '@nextui-org/react'
import { ArrowUp } from 'iconsax-react'
import { memo, useEffect, useState } from 'react'

function ScrollToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false)
  const [isScrollToTop, setIsScrollToTop] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
        setIsScrollToTop(false)
      }
    })
  }, [])
  //
  const _scrollToTop = () => {
    setIsScrollToTop(true)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Button
      aria-label='scroll-to-top'
      onClick={_scrollToTop}
      isIconOnly
      className={`fixed bottom-10 right-10 z-50 flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full bg-[#282828] text-white transition  ${
        showTopBtn ? 'translate-y-0' : 'translate-y-[90px]'
      }`}
    >
      <ArrowUp size={24} className={`${isScrollToTop ? 'duration-300 hover:-translate-y-[20%]' : ''} `} />
    </Button>
  )
}

export default memo(ScrollToTop)
