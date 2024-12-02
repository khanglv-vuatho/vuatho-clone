'use client'

import { Skeleton } from '@nextui-org/react'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import { useLocale, useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Autoplay, EffectFade, FreeMode, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ImageSkeleton } from '@/components/Icons'
import ImageFallback from '@/components/ImageFallback'
import LikeControl from '@/components/LikeControl'
import useSmallScreen from '@/hook/useSmallScreen'
import instance from '@/services/axiosConfig'

const WorkerBenefitSection = () => {
  const t = useTranslations('WorkerBenefitSection')
  const locale = useLocale()

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [onFetching, setOnFetching] = useState<boolean>(false)
  const [onRefresh, setOnRefresh] = useState<boolean>(false)

  const [listDataBenefit, setListDataBenefit] = useState<any>([])
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  const isMobile = useSmallScreen()

  const swiperRef = useRef<any>(null)

  const _handleFetching = useCallback(async () => {
    try {
      const data: any = await instance.get(`home/benefit?lang=${onRefresh ? 'en' : locale}`)

      setListDataBenefit([
        {
          title: 'Việc làm gần nhà nhất',
          html: '<div class="flex flex-col gap-[10px]"><p>- Dù bạn là Thợ của bất kì ngành nghề nào, Vua Thợ sẽ đem công việc đến gần bạn nhất.</p><p>- Bạn ở đâu trên đất nước của mình, Khách hàng đều nhìn thấy bạn.</p><p>- Tiết kiệm được chi phí đi lại và các khoản khác, ngay khi ở quê nhà cũng sẽ nhanh chóng tìm được công việc ổn định.</p></div>',
          img: 'https://icdn.vuatho.com/home/benefits/fa9e2f2c-9784-4d82-a500-ab51141e0a64.png?cache=0',
          like: 31,
          isLike: false,
          isDislike: false,
          uuid: 'fa9e2f2c-9784-4d82-a500-ab51141e0a64'
        },
        {
          title: 'Thu nhập cao luôn ổn định',
          html: '<div class="flex flex-col gap-[10px]"><p>- Chủ động kiếm thêm thu nhập - làm chủ tài chính bản thân.</p><p>- Thu nhập từ 20.000.000 đến 60.000.000đ mỗi tháng.</p><p>- Thợ có thể làm được nhiều nghề phụ ngoài nghề chính - công việc lúc nào cũng có trong 24h.</p></div>',
          img: 'https://icdn.vuatho.com/home/benefits/3fbf9b00-4b45-43b0-b6a2-247f6b06a35f.png?cache=0',
          like: 25,
          isLike: false,
          isDislike: false,
          uuid: '3fbf9b00-4b45-43b0-b6a2-247f6b06a35f'
        },
        {
          title: 'Thời gian làm việc tự do',
          html: '<div class="flex flex-col gap-[10px]"><p>- Thời gian linh động, Thợ hoàn toàn có thể chủ động quyết định thời gian làm việc của mình.</p><p>- Khi có thời gian thì mở ứng dụng hoạt động, nếu bận có thể tạm thời tắt ứng dụng, với Vua Thợ sẽ không có bất kì sự ràng buộc nào.</p></div>',
          img: 'https://icdn.vuatho.com/home/benefits/4e9c5698-b9c7-454c-9e5e-ee4aa7be3453.png?cache=0',
          like: 24,
          isLike: false,
          isDislike: false,
          uuid: '4e9c5698-b9c7-454c-9e5e-ee4aa7be3453'
        },
        {
          title: 'Cùng Vua Thợ chia sẻ lợi nhuận',
          html: '<div class="flex flex-col gap-[10px]"><p>- Về phí dịch vụ (sửa chữa, lắp đặt ...) Vua Thợ sẽ thu 10 - 25% tuỳ ngành.</p><p>- Về Sản phẩm - Vật Tư - Nguyên Liệu ... chia sẻ 50 - 50% lợi nhuận.</p></div>',
          img: 'https://icdn.vuatho.com/home/benefits/84323661-c9ef-4879-91c5-984af66f1e95.png?cache=0',
          like: 11,
          isLike: false,
          isDislike: false,
          uuid: '84323661-c9ef-4879-91c5-984af66f1e95'
        },
        {
          title: 'Thợ giới thiệu Thợ (hoặc Thợ phụ) - Khách giới thiệu Thợ',
          html: '<div class="flex flex-col gap-[10px]"><p>- Khi giới thiệu Thợ chính hoặc Thợ phụ bạn sẽ được 50.000đ (tiền sẽ được chuyển vào ví của bạn, nhưng không sử dụng được, Vua Thợ sẽ thanh toán khi người Thợ đó phát sinh việc làm).</p><p>- Nếu là Thợ phụ sẽ được Vua Thợ chấp nhận mà không cần kiểm tra trình độ, chỉ cần xác minh thông tin và nghề mình muốn làm khi tham gia vào Vua Thợ (Thợ phụ có thể phụ nhiều ngành nghề khác nhau).</p></div>',
          img: 'https://icdn.vuatho.com/home/benefits/976850ed-c993-44b3-8d1d-76e37dd19fdf.png?cache=0',
          like: 14,
          isLike: false,
          isDislike: false,
          uuid: '976850ed-c993-44b3-8d1d-76e37dd19fdf'
        },
        {
          title: 'Được tham gia chương trình mỗi 1000 Thợ nhận 1 xe Wave RSX FI',
          html: '<div class="flex flex-col gap-[10px]"><p>Khi đăng ký Thợ thành công trên ứng dụng Vua Thợ, mỗi anh thợ sẽ nhận được 01 mã dự thưởng (cũng là mã giới thiệu) để có cơ hội nhận 01 chiếc xe Wave RSX FI trong mỗi 1.000 Thợ đăng ký thông qua vòng quay trúng thưởng từ hệ thống - phục vụ làm nghề.</p><ul><li>1 giải đặc biệt trị giá 25.000.000đ</li><li>1 giải nhì 6 thùng bia</li><li>1 giải ba 3 thùng bia</li></ul></div>',
          img: 'https://icdn.vuatho.com/home/benefits/8a0ba98d-185b-4e1c-aee0-a81ef452290f.png?cache=0',
          like: 9,
          isLike: false,
          isDislike: false,
          uuid: '8a0ba98d-185b-4e1c-aee0-a81ef452290f'
        },
        {
          title: 'Được nhận dãy số may mắn vĩnh viễn tham gia chương trình trúng thưởng hàng tháng từ Vua Thợ',
          html: '<div class="flex flex-col gap-[10px]"><p>Khi giới thiệu Thợ (dù là Thợ nào) mỗi 1 Thợ tương đương với 1 con số và với 12 người Thợ - bạn sẽ có 1 dãy số may mắn trong 6 trái banh (mỗi trái banh có 2 con số) Thợ sẽ có một dãy số may mắn và không giới hạn nhiều dãy số sở hữu được tham gia mở thưởng định kì vào mỗi tháng.</p><ul><li>1 giải đặc biệt giá trị tương đương 35.000.000đ</li><li>1 giải nhì 6 thùng bia</li><li>1 giải ba 3 thùng bia</li></ul></div>',
          img: 'https://icdn.vuatho.com/home/benefits/da7eb78d-eed2-4117-93e3-9d5297df3889.png?cache=0',
          like: 12,
          isLike: false,
          isDislike: false,
          uuid: 'da7eb78d-eed2-4117-93e3-9d5297df3889'
        },
        {
          title: 'Phúc lợi hỗ trợ khi gặp tai nạn lao động',
          html: '<div class="flex flex-col gap-[10px]"><p>Quỹ tấm lòng vàng của Cộng đồng Thợ sẽ giúp cho các anh Thợ bị những trường hợp tai nạn lao động hoặc các sự cố không mong muốn khi hành nghề (cộng đồng Thợ càng lớn thì sự hỗ trợ sẽ càng lớn). Thợ sẽ cảm thấy được bảo vệ và an tâm khi tham gia vào Cộng đồng Vua Thợ (cộng đồng Thợ trên toàn thế giới)</p></div>',
          img: 'https://icdn.vuatho.com/home/benefits/c9f93d28-29b6-4490-8f9d-8890ead5e450.png?cache=0',
          like: 13,
          isLike: false,
          isDislike: false,
          uuid: 'c9f93d28-29b6-4490-8f9d-8890ead5e450'
        },
        {
          title: 'Khi về hưu lớn tuổi',
          html: '<div class="flex flex-col gap-[10px]"><p>- Khi trẻ làm các công việc nặng nhọc, đến khi lớn tuổi Vua Thợ sẽ giúp bạn chuyển qua công việc nhẹ nhàng hơn - tối ưu tất cả các nguồn thu nhập khi về già.</p><p>- Vua Thợ sẽ liên kết với các Công ty bảo hiểm để tạo ra "bảo hiểm riêng của Vua Thợ" đảm bảo tương lai cho Thợ. Ví dụ: 1 ngày đóng từ 5.000 - 10.000đ tương đương 150.000 - 300.000đ/ tháng để tích luỹ, thì khi lớn tuổi về hưu Thợ sẽ có 1 khoản tiền từ 10.000.000 - 30.000.000đ / tháng.</p></div>',
          img: 'https://icdn.vuatho.com/home/benefits/03bc1e48-100e-4d13-a3cd-bcde97348774.png?cache=0',
          like: 10,
          isLike: false,
          isDislike: false,
          uuid: '03bc1e48-100e-4d13-a3cd-bcde97348774'
        },
        {
          title: 'Được tham gia các cuộc thi Thợ giỏi (hàng quý - hàng năm)',
          html: '<div class="flex flex-col gap-[10px]"><p>Vua Thợ thường xuyên tổ chức các cuộc thi nhằm tìm kiếm những Thợ giỏi về kỹ năng chuyên môn - nghiệp vụ nhằm tuyên dương cho sự tận lực với nghề (sẽ mời các Thợ đoạt giải tham gia cổ phần vào những Công ty do Vua Thợ thành lập). Qua đó tạo động lực cho tất cả các anh thợ cùng nhau phấn đấu học hỏi, không ngừng phát triển.</p></div>',
          img: 'https://icdn.vuatho.com/home/benefits/f82aaba6-2f4d-40a7-adb3-b0b5ee4f494c.png?cache=0',
          like: 7,
          isLike: false,
          isDislike: false,
          uuid: 'f82aaba6-2f4d-40a7-adb3-b0b5ee4f494c'
        },
        {
          title: 'Được công nhận tay nghề - tài năng và cấp bằng từ các trung tâm đào tạo nghề của Vua Thợ ',
          html: '<div class="flex flex-col gap-[10px]"><p>Trong tương lai Vua Thợ sẽ xây dựng các Trung tâm đào tạo nghề (từ sơ cấp đến cao cấp...) để cấp các chứng chỉ và bằng cấp ... công nhận tài năng của các anh em Thợ theo tiêu chuẩn.</p></div>',
          img: 'https://icdn.vuatho.com/home/benefits/f044cca7-7d31-479c-aee8-202ec2a463de.png?cache=0',
          like: 7,
          isLike: false,
          isDislike: false,
          uuid: 'f044cca7-7d31-479c-aee8-202ec2a463de'
        },
        {
          title: 'Cùng Vua Thợ xây dựng Cộng đồng nhân ái hỗ trợ các hoàn cảnh khó khăn',
          html: '<div class="flex flex-col gap-[10px]"><p>Vua Thợ và các anh em Thợ cùng xây dựng một cộng đồng nhằm giúp đỡ, sẻ chia với xã hội và địa phương có những hoàn cảnh khó khăn: như xây 1 ngôi trường, 1 cái cầu, làm sạch 1 dòng kênh ... đem lại những điều tốt đẹp nhất cho xã hội bằng sức lao động của những người Thợ.</p></div>',
          img: 'https://icdn.vuatho.com/home/benefits/1051a473-7f29-4f74-ad6e-2cfabb8551d6.png?cache=0',
          like: 9,
          isLike: false,
          isDislike: false,
          uuid: '1051a473-7f29-4f74-ad6e-2cfabb8551d6'
        },
        {
          title: 'Nâng tầm vị thế của người Thợ',
          html: '<div class="flex flex-col gap-[10px]"><p>- Đến với Vua Thợ, người Thợ sẽ tự làm chủ công việc của bản thân không còn khái niệm về làm công. Bên cạnh đó Thợ sẽ không cần phải lo lắng việc tìm kiếm Khách hàng mà Khách hàng sẽ tìm đến Thợ.</p><p>- Thợ sẽ là người đại diện bán hàng cho Vua Thợ.</p></div>',
          img: 'https://icdn.vuatho.com/home/benefits/11a8bf9a-73d8-4471-ad3e-c8be8f503dd1.png?cache=0',
          like: 6,
          isLike: false,
          isDislike: false,
          uuid: '11a8bf9a-73d8-4471-ad3e-c8be8f503dd1'
        },
        {
          title: 'Đảm bảo giao dịch minh bạch - công bằng',
          html: '<div class="flex flex-col gap-[10px]"><p>Khi hoàn thành tốt công việc, đảm bảo Thợ sẽ nhận được tiền.</p></div>',
          img: 'https://icdn.vuatho.com/home/benefits/b3b8a748-5540-4c3c-acb7-a575ac55f1ab.png?cache=0',
          like: 7,
          isLike: false,
          isDislike: false,
          uuid: 'b3b8a748-5540-4c3c-acb7-a575ac55f1ab'
        },
        {
          title: 'Phân phối lại thị trường lao động',
          html: '<ul class="flex flex-col gap-[10px]"><span><p>Chuyển Thợ dư thừa sang những nơi thiếu (từ thành phố này sang thành phố khác hoặc từ nước này sang nước khác).</p></span></ul>',
          img: 'https://icdn.vuatho.com/home/benefits/f53fb34c-d084-4be4-a87b-6f44833f3560.png?cache=0',
          like: 6,
          isLike: false,
          isDislike: false,
          uuid: 'f53fb34c-d084-4be4-a87b-6f44833f3560'
        }
      ])

      // setListDataBenefit([...data])

      if (!data?.length) {
        setOnRefresh(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setOnFetching(false)
      onRefresh && setOnRefresh(false)
    }
  }, [locale, onRefresh])

  useEffect(() => {
    onFetching && _handleFetching()
  }, [onFetching, _handleFetching])

  useEffect(() => {
    setOnFetching(true)
  }, [])

  useEffect(() => {
    onRefresh && _handleFetching()
  }, [onRefresh, _handleFetching])

  let timer: any = null

  const _handleClickSwiper = () => {
    swiperRef?.current?.swiper?.autoplay?.stop()
    clearTimeout(timer)
    timer = setTimeout(() => {
      swiperRef?.current?.swiper?.autoplay?.start()
    }, 30000)
  }

  const handleSwiperAction = useCallback((action: 'slidePrev' | 'slideNext') => {
    if (!swiperRef.current) return
    swiperRef.current.swiper[action]()
  }, [])

  const handlePrev = () => handleSwiperAction('slidePrev')
  const handleNext = () => handleSwiperAction('slideNext')

  return (
    <div className='relative flex flex-col' id='worker-benefit'>
      <div className='ct-container z-[10] flex flex-col gap-2 lg:hidden'>
        <h2 className='text-sm font-bold uppercase text-primary-yellow md:text-xl'>{t('benefit')}</h2>
        <p className='text-2xl font-bold uppercase text-primary-blue lg:text-4xl'>{t('text')}</p>
      </div>
      <div className='ct-container flex flex-col gap-6'>
        <div className='z-[10] mb-20 hidden items-center justify-between lg:flex'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-sm font-bold uppercase text-primary-yellow md:text-xl'>{t('benefit')}</h2>
            <p className='text-2xl font-bold uppercase text-primary-blue lg:text-4xl'>{t('text')}</p>
          </div>
        </div>
        <div className='relative'>
          {onFetching ? (
            <>
              <div className='flex min-h-[400px] w-full animate-pulse items-center justify-center bg-gray-300 md:min-h-[600px] xl:min-h-[800px]'>
                <ImageSkeleton style='h-[100px] w-full animate-pulse' />
              </div>
              <div className='flex w-full flex-col items-center justify-center gap-3 p-5'>
                {Array(4)
                  .fill(1)
                  .map((_, index) => (
                    <Skeleton key={`skeleton-text-${index}`} className='h-3 w-full rounded-lg' />
                  ))}
              </div>
              <div className='flex w-full items-center justify-center gap-5'>
                {Array(6)
                  .fill(1)
                  .map((_, index: number) => (
                    <Skeleton className='size-8 flex-shrink-0 rounded-lg' key={`skeleton-pagination-${index}`} />
                  ))}
              </div>
            </>
          ) : (
            <div className='relative grid grid-cols-1 gap-2'>
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
                modules={[Autoplay, EffectFade, FreeMode, Thumbs]}
                // className={`benefitSwipper z-[5] order-2 h-full w-full lg:order-1`}
                className={`benefitSwipper z-[5] h-full w-full`}
                style={{
                  overflow: 'unset'
                }}
                onActiveIndexChange={(swiper: any) => {
                  setCurrentIndex(swiper.realIndex)
                }}
              >
                {listDataBenefit?.map((item: any, index: number) => {
                  return (
                    <SwiperSlide key={item.uuid} className={`${currentIndex === index ? 'visible' : 'invisible'}`} onClick={_handleClickSwiper}>
                      <div className='grid lg:grid-cols-3'>
                        <div className='z-20 order-2 flex flex-col justify-between gap-4 rounded-xl bg-primary-blue p-4 lg:order-1 lg:w-[130%] lg:p-6'>
                          <div className='flex flex-col gap-2 lg:gap-4'>
                            <div className='text-2xl font-bold text-primary-yellow'>
                              {currentIndex + 1 <= 9 ? `0${currentIndex + 1}` : currentIndex + 1}/{listDataBenefit?.length}
                            </div>
                            <h3 className='text-base font-semibold text-white lg:text-xl'>{item.title}</h3>
                            <div className='text-sm text-white xs:text-base' dangerouslySetInnerHTML={{ __html: item.html }} />
                          </div>
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                              <button aria-label='prev' className='flex size-10 items-center justify-center rounded-full bg-[#F8F8F8] lg:size-[48px]' onClick={handlePrev}>
                                <ArrowLeft2 className='flex size-6 flex-shrink-0' />
                              </button>
                              <button aria-label='next' className='flex size-10 items-center justify-center rounded-full bg-[#F8F8F8] lg:size-[48px]' onClick={handleNext}>
                                <ArrowRight2 className='flex size-6 flex-shrink-0' />
                              </button>
                            </div>
                            <LikeControl item={item} />
                          </div>
                        </div>
                        <div className='order-1 mt-[-100px] flex items-center justify-center lg:order-2 lg:col-span-2 lg:mt-0'>
                          <ImageFallback loading='lazy' src={item.img} alt={item.title} height={600} width={900} className='size-full object-contain' />
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
              <Swiper
                onSwiper={(swiper: any) => {
                  return setThumbsSwiper(swiper)
                }}
                slidesPerView={isMobile ? 3 : 6}
                spaceBetween={10}
                freeMode
                modules={[FreeMode, Thumbs]}
                // className={`swiperPagination absolute inset-0 top-[200%] !z-30 order-1 flex min-h-[80px] w-full justify-between md:!top-[500%] lg:!top-0 lg:order-2 lg:min-h-0 `}
                className={`swiperPagination absolute !z-30 order-1 !hidden min-h-[80px] w-full justify-between lg:static lg:order-2 lg:!flex lg:min-h-0`}
              >
                {listDataBenefit?.map((item: any, index: number) => (
                  <SwiperSlide key={`swipper-slide-${index}`}>
                    <div
                      onClick={_handleClickSwiper}
                      className={`${currentIndex === index ? ' border-[#FCB713]' : 'scale-90 border-transparent opacity-70'}  group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-[2px] bg-white transition hover:border-[#FCB713]/80`}
                    >
                      <ImageFallback
                        src={item.img}
                        alt={item.title}
                        height={200}
                        width={200}
                        className={`w-full cursor-pointer select-none object-cover transition group-hover:scale-105 ${currentIndex === index && 'scale-105'} `}
                      />
                      <span className='absolute left-2 top-2 z-40 flex size-12 items-center justify-center rounded-full bg-black text-sm text-white md:size-8 '>
                        {index < 9 ? `0${index + 1}` : index + 1}
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WorkerBenefitSection
