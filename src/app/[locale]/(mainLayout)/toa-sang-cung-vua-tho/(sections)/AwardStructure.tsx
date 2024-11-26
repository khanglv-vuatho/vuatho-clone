import FrameText from '@/components/FrameText'
import Image from 'next/image'
import React from 'react'
import { useLocale } from 'next-intl'

const AwardStructure = () => {
  const locale = useLocale()

  const content = {
    vi: {
      title: 'Cơ cấu giải thưởng',
      firstPrize: 'GIẢI NHẤT',
      prize: 'Giải',
      prizes: [
        {
          title: 'GIẢI NHÌ',
          quantity: 1,
          value: '50.000.000 VNĐ'
        },
        {
          title: 'GIẢI BA',
          quantity: 2,
          value: '15.000.000 VNĐ'
        },
        {
          title: 'Giải khuyến khích',
          quantity: 10,
          value: '1.000.000 VNĐ'
        },
        {
          title: 'Giải dành cho khán giả bình chọn',
          quantity: 10,
          value: '1.000.000 VNĐ'
        }
      ],
      notes: [
        '*Các tác giả đạt giải sẽ được Ban Tổ chức mời tham dự Lễ công bố và trao giải thưởng và giấy chứng nhận.',
        '*Tiền thưởng sẽ được Ban Tổ chức khấu trừ tiền thuế thu nhập cá nhân theo quy định Việt Nam hiện hành.'
      ]
    },
    en: {
      title: 'Prize Structure',
      firstPrize: 'FIRST PRIZE',
      prize: 'Prize',
      prizes: [
        {
          title: 'SECOND PRIZE',
          quantity: 1,
          value: '50,000,000 VND'
        },
        {
          title: 'THIRD PRIZE',
          quantity: 2,
          value: '15,000,000 VND'
        },
        {
          title: 'Consolation Prize',
          quantity: 10,
          value: '1,000,000 VND'
        },
        {
          title: 'Audience Choice Award',
          quantity: 10,
          value: '1,000,000 VND'
        }
      ],
      notes: [
        '*Winners will be invited by the Organizing Committee to attend the Award Announcement and Ceremony and will receive a certificate.',
        '*Prize money will be subject to personal income tax deduction in accordance with current Vietnamese regulations.'
      ]
    }
  }

  const selectedContent = content[locale as keyof typeof content] || content.en

  return (
    <div className='mx-auto flex h-full w-full  flex-col gap-4 px-4 md:px-10'>
      <FrameText>{selectedContent.title}</FrameText>
      <div className='relative'>
        <Image className='absolute inset-0  object-cover opacity-40' src={'/shineWithVuaTho/filmBackground.png'} alt='filmBackground' width={2000} height={1000} />
        <div className='flex flex-col items-center justify-center gap-4'>
          <Image className='z-[50] w-[100px] md:w-[120px]' src={'/shineWithVuaTho/1.png'} alt='prize.png' width={200} height={200} />
          <p className='text-3xl font-bold text-[#FFDD39] md:text-5xl'>{selectedContent.firstPrize}</p>
          <i className='-mt-2 text-2xl text-white md:text-4xl'>(01 {selectedContent.prize})</i>
          <p className='text-4xl font-bold text-[#FFDD39] md:text-5xl'>100.000.000 VNĐ</p>
        </div>
      </div>
      <div className='hidden w-full justify-center px-20 md:flex'>
        <Image className='object-cover' src={'/shineWithVuaTho/light.png'} alt='light' width={3000} height={100} />
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {selectedContent.prizes.map((prize, index) => (
          <div key={index} className={`flex items-center gap-6 rounded-2xl bg-[#4EC4FF]/10 px-10 py-4 md:my-2 ${index < 2 ? 'w-full' : 'w-full md:w-[90%]'} ${index === 3 ? 'ml-0' : 'ml-auto'}`}>
            <div className={`${index === 3 ? 'w-[80px] md:w-[110px]' : 'w-[70px] md:w-[90px]'}`}>
              <Image src={`/shineWithVuaTho/${index + 2}.png`} alt={`prize.png`} width={100} height={200} className='size-full' />
            </div>
            <div className='flex flex-col md:gap-2'>
              <p className='text-lg font-bold uppercase text-white md:text-2xl'>{prize.title}</p>
              <i className='-mt-2 text-lg text-white md:text-2xl'>
                ({prize.quantity < 10 ? '0' : null}
                {prize.quantity} {selectedContent.prize})
              </i>
              <p className='text-2xl font-bold text-[#FFDD39] md:text-4xl'>{prize.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-4 flex flex-col items-center gap-2 *:text-center *:text-sm *:italic *:text-white *:md:text-base'>
        {selectedContent.notes.map((note, index) => (
          <i key={index}>{note}</i>
        ))}
      </div>
    </div>
  )
}

export default AwardStructure
