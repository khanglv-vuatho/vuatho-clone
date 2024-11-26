import { Call, Facebook, Global } from 'iconsax-react'
import Link from 'next/link'
import React from 'react'
import { useLocale } from 'next-intl'

const Infomation = () => {
  const locale = useLocale()

  const content = {
    vi: {
      title: 'Thông tin liên hệ',
      infos: [
        {
          icon: <Facebook size='32' variant='Bold' />,
          content: 'Fanpage Vua Thợ:',
          link: 'https://www.facebook.com/vuatho.01'
        },
        {
          icon: <Call size='32' variant='Bold' />,
          content: 'hotline: 090 134 44 94'
        },
        {
          icon: <Global size='32' variant='Bold' />,
          content: 'Website:',
          link: 'https://vuatho.com/vi'
        }
      ]
    },
    en: {
      title: 'Contact Information',
      infos: [
        {
          icon: <Facebook size='32' variant='Bold' />,
          content: 'Vua Tho Fanpage:',
          link: 'https://www.facebook.com/vuatho.01'
        },
        {
          icon: <Call size='32' variant='Bold' />,
          content: 'hotline: 090 134 44 94'
        },
        {
          icon: <Global size='32' variant='Bold' />,
          content: 'Website:',
          link: 'https://vuatho.com/en'
        }
      ]
    }
  }

  const selectedContent = content[locale as keyof typeof content] || content.vi

  return (
    <div className='mt-10 w-full bg-[#4EC4FF]/10 py-5 md:mt-20'>
      <div className='mx-auto flex max-w-[1300px] flex-col items-center  gap-2 md:grid md:grid-cols-3 md:gap-4'>
        <div className='col-span-1 md:border-r md:border-white'>
          <p className='px-0 text-3xl font-bold uppercase leading-[1.2] text-[#EFD800] md:px-4 md:text-4xl'>{selectedContent.title}</p>
        </div>
        <div className='col-span-2 flex w-full flex-col gap-4 px-4 md:ml-10 md:w-auto md:px-0'>
          {selectedContent.infos.map((item, index) => (
            <div key={index} className='flex items-center gap-2 text-white'>
              <div>{item.icon}</div>
              <div className={`flex ${item.link === 'https://www.facebook.com/vuatho.01' ? 'flex-col' : 'flex-row gap-1'}`}>
                <p className={`font-bold uppercase`}>{item.content}</p>
                {item.link && (
                  <Link target='_blank' href={item.link} className=' underline'>
                    {item.link}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Infomation
