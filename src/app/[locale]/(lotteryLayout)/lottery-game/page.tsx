'use client'

import Image from 'next/image'
import Countdown from 'react-countdown'
import { Button } from '@nextui-org/react'
import { ArrowLeft, People } from 'iconsax-react'

import './lottery.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Polium } from '.'
import Drawer from '@/components/Drawer'
import { useUnfocusItem } from '@/hook'

type TListFeature = {
  title: string
  thumb: string
  titleDrawer: string
  thumbDrawer: string
  isBgWhite?: boolean
  childrenDrawer: React.ReactNode
  headerDrawer: React.ReactNode
}

type TListCountDonw = {
  title: string
  time: string
}

function Lottery() {
  const [numberList, setNumberList] = useState([null, null, null, null, null, null])

  const listFeature: TListFeature[] = [
    {
      title: 'Lịch sử',
      thumb: 'history.png',
      titleDrawer: '123',
      thumbDrawer: '',
      isBgWhite: true,
      childrenDrawer: <></>,
      headerDrawer: <></>,
    },
    {
      title: 'Giải thưởng',
      thumb: 'prize.png',
      titleDrawer: '123',
      thumbDrawer: '',
      childrenDrawer: <></>,
      headerDrawer: <HeaderDrawerPrize />,
    },
    {
      title: 'Vé của bạn',
      thumb: 'ticket.png',
      titleDrawer: '123',
      thumbDrawer: '',
      childrenDrawer: <></>,
      headerDrawer: <></>,
    },
  ]

  return (
    <>
      <p className='hidden rounded border border-red-400 bg-red-100 p-4 text-red-700 md:block'>
        Chúng tôi chỉ hỗ trợ giao diện điện thoại, vui lòng đổi thiết bị hoặc thu nhỏ màn
        hình.
      </p>
      <div className='ct-container-game ct-background-app h-screen pt-10 md:hidden'>
        <Button
          isIconOnly
          radius='full'
          className='bg-gradient-to-br from-[#FFF8E6] via-[#FFB300] to-[#FFCB51]'
        >
          <ArrowLeft size={16} className='text-bold text-base-black-1' />
        </Button>
        <div className='relative z-0 flex flex-col items-center'>
          <div className='absolute left-[calc(-50vw+50%)] w-[100vw]'>
            <Image src={'/lottery/money.png'} alt='money' width={505} height={400} />
          </div>
          <div className='absolute top-[-14%] z-20 pl-[5%]'>
            <Image src={'/lottery/title.png'} alt='title' width={193} height={83} />
          </div>
          <div className='absolute top-[15%] z-20 grid grid-cols-4 justify-center gap-2'>
            <div className='absolute inset-0'>
              <CountDown />
            </div>
          </div>
          <div className='relative z-10 flex justify-center'>
            <div className='relative inset-0 flex items-center justify-center'>
              <Image src={'/lottery/glass.png'} alt='glass' width={320} height={320} />
              <div className='absolute w-[290px]'>
                <Image src={'/lottery/bar.png'} alt='bar' width={290} height={55} />
              </div>
            </div>
          </div>
          <div className='absolute top-[82%]'>
            <div className='relative flex flex-col items-center'>
              <Image
                src={'/lottery/body.png'}
                width={358}
                height={388}
                alt='body'
                className='h-[388px] w-[358px]'
              />
              <div className='absolute top-[30%] flex flex-col items-center gap-4'>
                <div className='grid h-[75px] w-full grid-cols-6 items-center gap-3 rounded-xl bg-[#81B3FF] px-4 shadow-[0px_1px_2px_0px_rgba(255,255,255,0.50)_inset,0px_-1px_1px_0px_rgba(255,255,255,0.25)_inset]'>
                  {numberList.map((number: number | null, index: number) => (
                    <Hole number={number} key={index} index={index} />
                  ))}
                </div>
                <div className='flex w-full flex-col gap-4 px-2'>
                  <div className='grid w-full grid-cols-3 py-2'>
                    <div className='col-span-2 flex items-center gap-2'>
                      <span className=''>
                        <People size={24} className='text-white' />
                      </span>
                      <p className=' font-light text-white'>Người tham gia</p>
                    </div>
                    <p className='col-span-1 flex justify-center font-semibold text-white'>
                      1000
                    </p>
                  </div>
                  <div className='grid grid-cols-3'>
                    <div className='col-span-2 flex items-center gap-2'>
                      <span className=''>
                        <Polium className='text-white' />
                      </span>
                      <p className=' font-light text-white'>Người thắng</p>
                    </div>
                    <div className='flex justify-center font-semibold text-white'>
                      <div className='flex h-10 w-full items-center justify-center rounded-[10px] border-1 border-white '>
                        8
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='fixed bottom-0 left-0 right-0 z-[1] grid grid-cols-3 items-center justify-center gap-8 bg-gradient-to-r from-[#4D7FFF] via-[#8AB4FF] to-[#3E75FF] p-4'>
          {listFeature.map((item) => (
            <ItemFeature key={item.title} item={item} />
          ))}
        </div>
      </div>
    </>
  )
}
const Hole = ({ number, index }: { number: number | null; index: number }) => {
  return (
    <div className='relative '>
      <div className='relative overflow-hidden'>
        <div className='flex flex-col items-center justify-center'>
          {/* 70% banh lăn xong -36% banh bắt đầu lăn */}
          <div className='absolute top-[70%] flex items-center justify-center'>
            <Image
              src={'/lottery/ball.png'}
              alt='ball'
              width={35}
              height={35}
              className='absolute min-h-[35px] min-w-[35px]'
            />
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
              {number || 12}
            </div>
          </div>
        </div>
        <Image src={'/lottery/hole.png'} alt='hole' width={41} height={50} />
      </div>
      <Image
        src={'/lottery/bulkhead.png'}
        alt=''
        width={41}
        height={16}
        className='absolute bottom-[-4%] min-h-[16px] min-w-[41px]'
      />
    </div>
  )
}

const ItemFeature = ({ item }: { item: TListFeature }) => {
  const [isOpen, setIsOpen] = useState(false)

  const exclusionRef = useRef(null)
  const itemRef = useUnfocusItem(() => {
    setIsOpen(false)
  }, exclusionRef)

  return (
    <div>
      <div
        className='relative flex items-center justify-center'
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={`/lottery/${item.thumb}`}
          alt=''
          width={60}
          height={60}
          className='min-h-[60px] min-w-[60px]'
        />
        <h3 className='ct-text-border absolute bottom-[-8%] font-bold text-white'>
          {item.title}
        </h3>
      </div>
      <div className='' ref={itemRef}>
        <Drawer
          isBgWhite={item?.isBgWhite}
          title={'123'}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          header={
            <div className='flex items-center gap-2'>
              <div className='h-[30px] w-[30px]'>
                <Image src='/lottery/prize-mini.png' alt='' width={30} height={30} />
              </div>
              <p className='text-white'>Giải thưởng</p>
            </div>
          }
        >
          {item.childrenDrawer}
        </Drawer>
      </div>
    </div>
  )
}

const HeaderDrawerPrize = () => {
  return (
    <div className='flex items-center gap-2'>
      <div className='h-[30px] w-[30px]'>
        <Image src='/lottery/prize-mini.png' alt='' width={30} height={30} />
      </div>
      <p className='text-white'>Giải thưởng</p>
    </div>
  )
}

const CountDownItem = ({ item }: { item: any }) => {
  return (
    <div className='flex flex-col items-center  gap-1'>
      <p className='text-[12px] text-base-black-1'>{item.title}</p>
      <div className='flex aspect-square h-[32px] w-[32px] items-center justify-center rounded-[4px] bg-base-black-1 text-xs font-bold text-white'>
        {item.time}
      </div>
    </div>
  )
}

const CountDown: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const auctionTime = Date.now() + 5000

  const [isExpired, setIsExpired] = useState<boolean>(false)

  useEffect(() => {
    let animationFrameId: any

    const checkTime = () => {
      const currentTime = Date.now()
      if (auctionTime - currentTime <= 0) {
        alert('boom')
        setIsExpired(true)
      } else {
        animationFrameId = requestAnimationFrame(checkTime)
      }
    }

    checkTime()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  const renderer = useMemo(
    () =>
      ({
        days,
        hours,
        minutes,
        seconds,
      }: {
        days: number
        hours: number
        minutes: number
        seconds: number
      }) => {
        const formattedDays = String(days).padStart(2, '0')
        const formattedHours = String(hours).padStart(2, '0')
        const formattedMinutes = String(minutes).padStart(2, '0')
        const formattedSeconds = String(seconds).padStart(2, '0')

        const listItem: TListCountDonw[] = [
          {
            title: 'Ngày',
            time: formattedDays,
          },
          {
            title: 'Giờ',
            time: formattedHours,
          },
          {
            title: 'Phút',
            time: formattedMinutes,
          },
          {
            title: 'Giây',
            time: formattedSeconds,
          },
        ]

        return (
          <div className='mt-2 flex justify-center gap-3'>
            {listItem.map((item) => (
              <CountDownItem item={item} />
            ))}
          </div>
        )
      },
    [],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <Countdown date={auctionTime} renderer={renderer} />
}
export default Lottery
