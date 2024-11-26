import React from 'react'

const SekeletonItemHistory = () => {
  return (
    <div className='flex animate-pulse flex-col gap-6 border-b border-b-[#E4E4E4] pb-6'>
      <div className='h-6 w-32 rounded bg-gray-200 lg:hidden' /> {/* Date for mobile */}
      <div className='flex items-center gap-6'>
        <div className='size-[116px] rounded bg-gray-200' /> {/* Main image */}
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <div className='h-6 w-48 rounded bg-gray-200' /> {/* Title */}
            <div className='h-8 w-32 rounded bg-gray-200' /> {/* Price */}
          </div>
          <div className='hidden grid-cols-2 items-center gap-12 lg:grid'>
            {[1, 2].map((i) => (
              <div key={i} className='flex items-center gap-4'>
                <div className='size-[48px] rounded bg-gray-200' /> {/* Package image */}
                <div className='h-5 w-32 rounded bg-gray-200' /> {/* Package title */}
                <div className='h-5 w-20 rounded bg-gray-200' /> {/* Attribute */}
                <div className='size-6 rounded-full bg-gray-200' /> {/* Color/Size indicator */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center gap-4 lg:hidden'>
        {[1, 2].map((i) => (
          <div key={i} className='flex items-center gap-4'>
            <div className='size-[48px] rounded bg-gray-200' />
            <div className='h-5 w-32 rounded bg-gray-200' />
            <div className='h-5 w-20 rounded bg-gray-200' />
            <div className='size-6 rounded-full bg-gray-200' />
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-4'>
        <div className='h-5 w-64 rounded bg-gray-200' /> {/* Address */}
        <div className='h-5 w-48 rounded bg-gray-200' /> {/* Phone */}
        <div className='h-5 w-56 rounded bg-gray-200' /> {/* Payment */}
      </div>
      <div className='flex flex-col justify-between gap-4 lg:flex-row lg:items-center'>
        <div className='flex items-center gap-6'>
          <div className='hidden h-5 w-32 rounded bg-gray-200 lg:block' /> {/* Date for desktop */}
          <div className='flex items-center gap-2'>
            <div className='size-6 rounded bg-gray-200' /> {/* Status icon */}
            <div className='h-5 w-24 rounded bg-gray-200' /> {/* Status text */}
          </div>
        </div>
        <div className='h-[48px] w-32 rounded-full bg-gray-200' /> {/* Button */}
      </div>
    </div>
  )
}

export default SekeletonItemHistory
