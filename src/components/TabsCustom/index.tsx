'use client'

import { Button, Divider, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { ArrowLeft2, ArrowRight2, Briefcase, Clock, Money2, Profile2User } from 'iconsax-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

interface Job {
  id: number | string
  jobTitle: string
  jobDescription: string
  experience: number
  salary: string
  workTime: string
  quantity: number
  status: string
  createdAt: string
}

interface TabsCustomProps {
  data: Job[]
  handleOpenModal: (position: string, jobId: number | string) => void
}

type TItemDescription = {
  title: string
  description: string
  index: number
}

const ItemDescription = ({ description, title, index }: TItemDescription) => {
  const listIconDescription: { icon: React.ReactNode }[] = [{ icon: <Money2 /> }, { icon: <Clock /> }, { icon: <Briefcase /> }, { icon: <Profile2User /> }]

  return (
    <div className='flex flex-col gap-2 rounded-lg bg-[#F8F8F8] p-3'>
      <p className='text-sm text-[#A6A6A6]'>{title}</p>
      <div className='flex items-center gap-2 font-bold text-primary-blue'>
        {listIconDescription?.[index].icon}
        <p>{description}</p>
      </div>
    </div>
  )
}

export const TabsCustom = ({ data, handleOpenModal }: TabsCustomProps) => {
  const t = useTranslations('Career')
  const [activeTab, setActiveTab] = useState(0)
  const [runnerStyle, setRunnerStyle] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  const containerRef = useRef(null)
  const itemRefs: any = useRef([])

  const scrollToTab = (index: any) => {
    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      setActiveTab(index)
    }
  }

  const handleLeftClick = () => {
    if (activeTab > 0) {
      scrollToTab(activeTab - 1)
    }
  }

  const handleRightClick = () => {
    if (activeTab < data.length - 1) {
      scrollToTab(activeTab + 1)
    }
  }
  useEffect(() => {
    if (itemRefs.current[activeTab]) {
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = itemRefs.current[activeTab]
      setRunnerStyle({
        left: offsetLeft,
        top: offsetTop,
        width: offsetWidth,
        height: offsetHeight
      })
    }
  }, [activeTab])

  return (
    <div className='flex flex-col items-center gap-10'>
      <div className='grid w-full grid-cols-11 gap-4'>
        <div ref={containerRef} className='relative col-span-10 hidden w-full flex-wrap gap-4 overflow-x-auto scrollbar-hide lg:flex lg:flex-nowrap'>
          <div className='absolute h-full !bg-[#F4B807]/10 transition-all duration-500' style={{ ...runnerStyle }} />
          {data.map((item, index) => (
            <Button
              disableRipple
              ref={(el) => (itemRefs.current[index] = el)}
              onPress={() => scrollToTab(index)}
              key={index}
              className={`flex min-h-[50px] shrink-0 items-center justify-center border-1 !bg-transparent px-6 text-base text-[#212121] ${activeTab === index ? 'menuActive border-[#F4B807]' : 'border-[#E4E4E4]'}`}
            >
              {item.jobTitle}
            </Button>
          ))}
        </div>
        <div className='col-span-11 flex w-full flex-col gap-2 lg:hidden'>
          <Popover
            isOpen={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
            triggerScaleOnOpen={false}
            placement='bottom'
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.15
                  }
                },
                exit: {
                  y: '20%',
                  opacity: 0,
                  transition: {
                    duration: 0.1
                  }
                }
              }
            }}
          >
            <PopoverTrigger>
              <Button
                disableRipple
                className='min-h-[50px] w-full justify-between border-1 border-[#F4B807] bg-[#F4B807]/10 px-4 text-base font-bold text-[#212121]'
                endContent={<ArrowRight2 className='rotate-90' />}
              >
                {data?.[activeTab]?.jobTitle}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='flex w-full flex-col gap-2 bg-white p-2'>
                {data.map((item, index) => (
                  <Button
                    disableRipple
                    ref={(el) => (itemRefs.current[index] = el)}
                    onPress={() => {
                      scrollToTab(index)
                      setIsOpen(false)
                    }}
                    key={index}
                    className={`flex min-h-[50px] shrink-0 items-center justify-center bg-transparent px-6 text-base text-[#212121]  ${activeTab === index ? 'bg-[#F4B807]/10' : 'hover:bg-[#F4B807]/10'}`}
                  >
                    {item.jobTitle}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className='hidden min-w-[110px] items-center gap-4 lg:flex'>
          <Button
            onClick={handleLeftClick}
            disableRipple
            radius='full'
            isIconOnly
            className={`min-h-[44px] min-w-[44px] items-center justify-center  ${activeTab === 0 ? 'bg-[#f8f8f8] text-black' : 'bg-[#282828] text-white'}`}
            disabled={activeTab === 0}
          >
            <ArrowLeft2 />
          </Button>
          <Button
            onClick={handleRightClick}
            disableRipple
            radius='full'
            isIconOnly
            className={`min-h-[44px] min-w-[44px] items-center justify-center  ${activeTab === data.length - 1 ? 'bg-[#f8f8f8] text-black' : 'bg-[#282828] text-white'}`}
            disabled={activeTab === data.length - 1}
          >
            <ArrowRight2 />
          </Button>
        </div>
      </div>
      <Divider />
      <div className='size-full'>
        <div className='flex flex-col gap-4'>
          <p className='text-2xl font-bold text-[#212121]'>{data?.[activeTab]?.jobTitle}</p>
          <div className='grid grid-cols-2 gap-2 lg:grid-cols-4'>
            <ItemDescription description={data?.[activeTab]?.salary} title='Lương' index={0} />
            <ItemDescription description={data?.[activeTab]?.workTime} title={'Thời gian làm việc'} index={1} />
            <ItemDescription description={data?.[activeTab]?.experience === 0 ? 'Không yêu cầu' : data?.[activeTab]?.experience + ' năm'} title={'Kinh nghiệm'} index={2} />
            <ItemDescription description={data?.[activeTab]?.quantity + ' ' + 'người' || `1 người`} title={'Số lượng'} index={3} />
          </div>
        </div>
        <div className='mt-6 flex flex-col gap-4'>
          <div dangerouslySetInnerHTML={{ __html: data?.[activeTab]?.jobDescription }} />
        </div>
        <div className='mt-8 flex w-full justify-end'>
          <Button className='bg-primary-blue px-10 py-6 text-base font-bold text-white' radius='md' onPress={() => handleOpenModal(data?.[activeTab]?.jobTitle, data?.[activeTab]?.id)}>
            Ứng tuyển
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TabsCustom
