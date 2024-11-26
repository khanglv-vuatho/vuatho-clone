import FrameText from '@/components/FrameText'
import Image from 'next/image'
import React from 'react'
import { useLocale } from 'next-intl'

const OrganizingCommittee = () => {
  const locale = useLocale()

  const content = {
    vi: {
      title: 'ban tổ chức',
      organizer: {
        title: 'Ban tổ chức',
        company: 'Công ty TNHH CÔNG NGHỆ',
        name: 'VUA THỢ'
      },
      judges: {
        title: 'Hội đồng giám khảo',
        description: 'Gồm những đạo diễn tên tuổi'
      }
    },
    en: {
      title: 'organizing committee',
      organizer: {
        title: 'Organizing Committee',
        company: 'VUA THO TECHNOLOGY CO., LTD',
        name: 'VUA THO'
      },
      judges: {
        title: 'Board of Judges',
        description: 'Including renowned directors'
      }
    }
  }

  const selectedContent = content[locale as keyof typeof content] || content.vi

  return (
    <div className='flex flex-col gap-10 px-4 md:px-10'>
      <FrameText>{selectedContent.title}</FrameText>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10'>
        <div className='relative flex flex-col items-center justify-center gap-4 rounded-2xl bg-[#4EC4FF]/10 p-5 text-white'>
          <p className='text-center text-lg font-bold uppercase md:text-2xl'>{selectedContent.organizer.title}</p>
          <p className='text-center text-lg md:text-2xl'>{selectedContent.organizer.company}</p>
          <p className='-mt-2 text-center text-5xl font-bold md:text-6xl'>{selectedContent.organizer.name}</p>
          {/* <Image src={'/shineWithVuaTho/littleLight.png'} alt='littleLight' width={200} height={20} className='absolute -bottom-2 left-1/2 -translate-x-1/2' /> */}
        </div>
        <div className='relative flex flex-col items-center justify-center gap-4 rounded-2xl bg-[#4EC4FF]/10 p-5 text-white'>
          <p className='text-center text-lg font-bold uppercase md:text-2xl'>{selectedContent.judges.title}</p>
          <Image src={'/shineWithVuaTho/directors.png'} alt='directors' width={200} height={150} className='-mt-6' />
          <p className='-mt-2 text-center text-lg uppercase md:text-xl'>{selectedContent.judges.description}</p>
          {/* <Image src={'/shineWithVuaTho/littleLight.png'} alt='littleLight' width={200} height={20} className='absolute -bottom-2 left-1/2 -translate-x-1/2' /> */}
        </div>
      </div>
    </div>
  )
}

export default OrganizingCommittee
