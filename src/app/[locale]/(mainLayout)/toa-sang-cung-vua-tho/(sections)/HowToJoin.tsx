import FrameText from '@/components/FrameText'
import Link from 'next/link'
import React from 'react'
import { useLocale } from 'next-intl'

const HowToJoin = () => {
  const locale = useLocale()
  const localText = locale === 'vi' ? 'vi' : 'en'

  const content = {
    vi: {
      title: 'Cách thức tham gia',
      registration: {
        title: '1. Đăng ký tham gia:',
        method1: {
          title: 'Cách 1: Qua Fanpage Vua Thợ:',
          steps: ['Truy cập vào fanpage Vua Thợ: https://www.facebook.com/vuatho.01', 'Gửi tin nhắn, điền đầy đủ thông tin theo mẫu: Họ tên, số điện thoại, email.']
        },
        method2: {
          title: 'Cách 2: Qua hotline:',
          steps: ['Liên hệ đến số điện thoại: 0901 344 494', 'Thông báo muốn đăng ký tham gia cuộc thi và cung cấp các thông tin cần thiết.']
        }
      },
      submission: {
        title: '2. Gửi video dự thi:',
        step1:
          'Bước 1: Upload video lên kênh cá nhân: Tạo một video công khai trên kênh YouTube, Tiktok hoặc Facebook cá nhân của bạn, bắt buộc phải gắn hashtag: #vuatho #ungdungvuatho #appvuatho #sangtaokhonggioihantoasangcungvuatho',
        step2: 'Bước 2: Gửi link video: Sau khi đăng tải video, hãy gửi link video đến Ban tổ chức theo một trong các cách sau.',
        methods: [
          'Qua tin nhắn trực tiếp trên Fanpage Vua Thợ: Gửi link video vào tin nhắn trực tiếp của fanpage.',
          'Qua hotline: Thông báo link video cho nhân viên tiếp nhận qua số điện thoại: 0901.344.494'
        ]
      },
      deadline: {
        title: '3. Thời hạn gửi bài:',
        content: 'Các video dự thi phải được gửi về trước',
        time: '31/01/2025'
      }
    },
    en: {
      title: 'How to Participate',
      registration: {
        title: '1. Registration:',
        method1: {
          title: 'Method 1: Via Vua Thợ Fanpage:',
          steps: ['Access the Vua Thợ fanpage: https://www.facebook.com/vuatho.01', 'Send a message and fill out the required information: Full name, phone number, email.']
        },
        method2: {
          title: 'Method 2: Via hotline:',
          steps: ['Contact the hotline: 0901 344 494', 'State your intention to register for the competition and provide the necessary information.']
        }
      },
      submission: {
        title: '2. Submit Your Video:',
        step1:
          'Step 1: Upload your video: Create a public video on your personal YouTube, TikTok, or Facebook account. Make sure to include the hashtags: #vuatho #ungdungvuatho #appvuatho #sangtaokhonggioihantoasangcungvuatho',
        step2: 'Step 2: Send the video link: After uploading the video, send the video link to the Organizing Committee using one of the following methods.',
        methods: ["Via direct message on the Vua Thợ Fanpage: Send the video link through the fanpage's direct messaging.", 'Via hotline: Share the video link with the hotline staff at: 0901.344.494']
      },
      deadline: {
        title: '3. Submission Deadline:',
        content: 'All competition videos must be submitted by ',
        time: '31/01/2025'
      }
    }
  }

  const selectedContent = content[localText] || content.vi

  return (
    <div className='flex flex-col gap-10 px-4 text-white md:px-10'>
      <FrameText>{selectedContent.title}</FrameText>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
          <p className='text-lg font-bold uppercase text-[#FFF266] md:text-2xl'>{selectedContent.registration.title}</p>
          <div className='flex flex-col gap-2'>
            <p className='font-bold'>{selectedContent.registration.method1.title}</p>
            <ul className='ml-2 list-inside list-disc'>
              {selectedContent.registration.method1.steps.map((step, index) => (
                <li key={index}>
                  {step.includes('https://') ? (
                    <>
                      {step.split('https://')[0]}
                      <Link target='_blank' href={'https://' + step.split('https://')[1]}>
                        https://{step.split('https://')[1]}
                      </Link>
                    </>
                  ) : (
                    step
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-bold'>{selectedContent.registration.method2.title}</p>
            <ul className='ml-2 list-inside list-disc'>
              {selectedContent.registration.method2.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <p className='text-lg font-bold uppercase text-[#FFF266] md:text-2xl'>{selectedContent.submission.title}</p>
          <div className='flex flex-col gap-2'>
            <p>{selectedContent.submission.step1}</p>
            <p>{selectedContent.submission.step2}</p>
            <ul className='ml-2 list-inside list-disc'>
              {selectedContent.submission.methods.map((method, index) => (
                <li key={index}>{method}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <p className='text-lg font-bold uppercase text-[#FFF266] md:text-2xl'>{selectedContent.deadline.title}</p>
          <div className='flex flex-col gap-2'>
            <p>
              {selectedContent.deadline.content} <strong> {selectedContent.deadline.time}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToJoin
