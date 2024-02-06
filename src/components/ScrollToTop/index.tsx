'use client'

import { Button } from '@nextui-org/react'
import { ArrowUp } from 'iconsax-react'
import { memo, useEffect, useState } from 'react'

function ScrollToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    })
  }, [])

  const _scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Button
      onPress={_scrollToTop}
      isIconOnly
      className={`fixed bottom-10 right-10 flex min-h-[44px] min-w-[44px] translate-y-10 cursor-pointer items-center justify-center rounded-full bg-[#282828] text-white transition  ${
        showTopBtn ? 'translate-y-0' : 'translate-y-[70px]'
      }`}
    >
      <ArrowUp size={24} />
    </Button>
  )
}

export default memo(ScrollToTop)
