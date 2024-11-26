'use client'

import instance from '@/services/axiosConfig'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

const Default = () => {
  const router = useRouter()

  const params = useParams()

  const [onSending, setOnSending] = useState(false)
  const [fullUrl, setFullUrl] = useState('')

  useEffect(() => {
    setFullUrl(window.location.href)
  }, [])

  // Function to detect the device and OS and redirect
  const detectAndRedirect = () => {
    // if (window.location.href.includes('zalo')) return

    // Ensure this code does not run on server-side
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent

      // iOS detection with a delay to support Zalo and embedded browsers
      if (/iPad|iPhone|iPod|Macintosh|MacBook/.test(userAgent)) {
        setTimeout(() => {
          window.location.href = 'https://apps.apple.com/vn/app/vua-th%E1%BB%A3-si%C3%AAu-k%E1%BA%BFt-n%E1%BB%91i/id6467541777?l=vi'
        }, 500) // 500ms delay
      }
      // Android detection
      else {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.vuatho.mobile&pli=1'
      }
    }
  }

  const handleSendingRefUrl = useCallback(async () => {
    const payload = { ref_code: params?.id, mode: process.env.NODE_ENV === 'development' ? 'sandbox' : undefined, link: fullUrl }

    try {
      await instance.post('/referral-deep-link', payload)
      detectAndRedirect()
    } catch (error) {
      console.log(error)
    }
  }, [fullUrl, params])

  useEffect(() => {
    setOnSending(true)
  }, [])

  useEffect(() => {
    onSending && handleSendingRefUrl()
  }, [onSending])

  return (
    <div className='pt-[80px]'>
      <p>Redirecting...</p>
    </div>
  )
}

export default Default
