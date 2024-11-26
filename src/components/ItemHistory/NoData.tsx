import React from 'react'
import Image from 'next/image'

const NoDataItemHistory = () => {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center gap-6'>
      <Image src='/empty.webp' alt='No data' width={200} height={200} />
      <p className='text-lg font-medium text-gray-500'>Bạn chưa có đơn hàng nào</p>
    </div>
  )
}

export default NoDataItemHistory
