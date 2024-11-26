import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import ImageFallback from '../ImageFallback'
import useSmallScreen from '@/hook/useSmallScreen'
import { ImageZoom } from '../ImageZoom'
import { Autoplay, FreeMode, Navigation, Thumbs, Zoom } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/zoom'

const SwiperCloth = ({ data }: { data?: any }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const swiperRef = useRef<any>(null)

  const isSmallScreen = useSmallScreen()

  return (
    <div className='flex flex-col gap-2'>
      <Swiper
        ref={swiperRef}
        effect={'fade'}
        loop
        autoHeight
        autoplay={{
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          delay: 15000
        }}
        slidesPerView={1}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        zoom={true}
        navigation
        modules={[Autoplay, Zoom, Navigation, Thumbs]}
        className={`swiperStore z-[5] h-full w-full`}
        onActiveIndexChange={(swiper: any) => {
          setCurrentIndex(swiper.realIndex)
        }}
      >
        {data?.map((item: any, index: number) => {
          return (
            <SwiperSlide key={item.uuid} className={`${currentIndex === index ? 'visible' : 'invisible'}`}>
              <div className='flex h-[400px] w-auto items-center justify-center md:h-[300px]'>
                {isSmallScreen ? (
                  <ImageFallback src={item?.thumb} alt={item.title} height={800} width={900} className='w-auto object-contain' />
                ) : (
                  <ImageZoom src={item?.thumb} alt={item.title} height={800} width={900} style='w-auto' />
                )}
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Swiper
        onSwiper={(swiper: any) => setThumbsSwiper(swiper)}
        breakpoints={{
          300: {
            slidesPerView: 2.5
          },
          600: {
            slidesPerView: 5.5
          },
          1024: {
            slidesPerView: 7.5
          }
        }}
        freeMode
        modules={[FreeMode, Navigation, Thumbs]}
        className={`swiperPagination z-10 flex w-full justify-between`}
      >
        {data?.map((item: any, index: number) => (
          <SwiperSlide key={`swipper-slide-${index}`}>
            <div
              className={`${
                currentIndex === index ? ' border-[#FCB713]' : 'scale-90 border-transparent opacity-70'
              } flex items-center justify-center overflow-hidden rounded-md border-[3px] transition`}
            >
              <ImageFallback
                src={item?.thumb}
                alt={item.title}
                height={200}
                width={200}
                className={`aspect-square max-h-[80px] min-h-[60px] w-auto min-w-[60px] cursor-pointer select-none object-contain transition hover:scale-105 ${currentIndex === index && 'scale-105'} `}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
export default SwiperCloth
