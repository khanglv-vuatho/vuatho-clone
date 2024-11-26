'use client'

import AccordionCustomShineWithVuaTho from '@/components/AccordionCustomShineWithVuaTho'
import FrameText from '@/components/FrameText'
import { ICondition, ISubContentItem } from '@/interface'
import React from 'react'
import SubContent from './SubContent'
import { useLocale } from 'next-intl'
const Conditions = () => {
  const locale = useLocale()
  const conditionsVi: ICondition[] = [
    {
      title: 'TIÊU CHÍ VỀ NỘI DUNG',
      content: [
        'Giới thiệu, truyền tải hình ảnh người Thợ một cách sáng tạo, ý nghĩa, cảm động, gần gũi trên mọi mặt của đời sống, xã hội nhằm khơi gợi giá trị văn hóa truyền thống và khát vọng phát triển trong mọi tầng lớp nhân dân để xây dựng đất nước Việt Nam phát triển mạnh mẽ, thịnh vượng, hạnh phúc.',
        'Khuyến khích ý tưởng sáng tạo, độc đáo thu hút được sự quan tâm mạnh mẽ đến với công chúng và tạo ra sức lan tỏa rộng rãi ở trong và ngoài nước.',
        'Tuyệt đối không vi phạm đến các chủ trương, đường lối của Đảng, pháp luật Nhà nước và quy định cuộc thi.'
      ]
    },
    {
      title: 'Tiêu chí về video',
      content: [
        'Video dự thi dưới dạng kỹ thuật số, file video có định dạng mp4. Chất lượng hình ảnh video đạt tối thiểu Full HD trở lên với thời lượng tối thiểu 1 phút, tối đa không quá 15 phút.',
        'Nội dung: Xoay quanh những câu chuyện đời thường trong cuộc sống, trong công việc, khó khăn và thành công của người Thợ nhằm trân trọng, ngợi ca những phẩm chất tốt đẹp của người Thợ qua các thể loại hài hước, vui tươi, cảm động,...',
        'Đảm bảo chất lượng hình ảnh tốt, bố cục hài hòa, âm thanh rõ ràng thể hiện trọn vẹn thông điệp của cuộc thi.',
        'Mỗi tác giả được gửi không giới hạn số lượng tác phẩm dự thi. Tên tác giả hoặc người đại diện nhóm tác giả phải được lấy theo tên trong căn cước công dân hoặc hộ chiếu.',
        'Các nhân vật xuất hiện trong video phải được sự đồng ý của nhân vật hoặc người giám hộ của nhân vật đó.'
      ]
    },
    {
      title: 'Thời gian sáng tác',
      content: ['Thời gian nhận bài dự thi: Từ ngày 11/11/2024 đến ngày 31/01/2025.', 'Tác phẩm dự thi chưa từng tham gia bất kỳ cuộc thi nào trước đây.']
    },
    {
      title: 'Bản quyền tác giả',
      content: [
        'Video dự thi phải thuộc sở hữu của các giả và tuyệt đối không sao chép bất cứ nguồn nào mà chưa được cho phép. Tác giả chịu trách nhiệm trước Pháp luật về bản quyền đối với tác phẩm dự thi.',
        'Ban Tổ chức không chịu trách nhiệm về những tranh chấp quyền tác giả và các quyền liên quan. Ban Tổ chức sẽ thu hồi giải thưởng khi phát hiện có vi phạm quyền tác giả, quyền liên quan theo quy định của pháp luật.',
        'Trong trường hợp cần thiết, Ban Tổ chức sẽ yêu cầu tác giả nộp file gốc để kiểm chứng thông tin.',
        'Ban Tổ chức Cuộc thi được phép sử dụng miễn phí các tác phẩm dự thi để phục vụ công tác quảng bá Cuộc thi và tuyên truyền đối ngoại mà không phải chi trả bất kỳ chi phí nào.'
      ]
    },
    {
      title: 'Chi phí tham gia',
      content: [
        'Vì đây là cuộc thi mang tính nhân văn, tôn vinh nét đẹp lao động của những người thợ. Đồng thời tạo môi trường giao lưu học hỏi đến các cộng đồng thợ nên sẽ không tính bất kỳ chi phí tham gia.'
      ]
    },
    {
      title: 'Quyền lợi và trách nhiệm của người tham gia',
      type: 'subContent',
      content: [
        {
          title: 'Về quyền lợi',
          content: [
            'Trong cuộc thi "SÁNG TẠO KHÔNG GIỚI HẠN - TỎA SÁNG CÙNG VUA THỢ" thí sinh có quyền được hỗ trợ về thông tin, tài liệu hoặc các hướng dẫn từ BTC.',
            'Người tham gia có thể được quảng bá tên tuổi hoặc tác phẩm thông qua các phương tiện truyền thông của cuộc thi.',
            'Được đảm bảo quyền lợi liên quan đến giải thưởng nếu đạt giải bao gồm nhận thưởng và chứng nhận.'
          ]
        },
        {
          title: 'Về trách nhiệm của người tham gia',
          content: [
            'Thí sinh cam kết tác phẩm là do chính mình sáng tạo không sao chép hay vi phạm bản quyền của người khác.',
            'Phải tuân thủ theo đúng thể lệ cuộc thi, không vi phạm các quy định về đạo đức, pháp luật.',
            'Thí sinh phải đảm bảo tính trung thực và chính xác của các thông tin cá nhân cung cấp cho BTC.'
          ]
        }
      ]
    }
  ]
  const conditionsEn: ICondition[] = [
    {
      title: 'GENERAL CONTENT CRITERIA',
      content: [
        'Introduce and convey the image of workers in a creative, meaningful, touching, and relatable way in all aspects of life and society. Aim to evoke traditional cultural values and aspirations for development across all social classes to build a strong, prosperous, and happy Vietnam.',
        'Encourage creative and unique ideas that attract strong public attention and create widespread influence both domestically and internationally.',
        'Strictly avoid violating the policies and guidelines of the Party, State laws, and competition regulations.'
      ]
    },
    {
      title: 'Video Criteria',
      content: [
        'The competition videos must be in digital format, mp4 file type, with a minimum resolution of Full HD and a duration of at least 1 minute, but no more than 15 minutes.',
        'Content: Revolve around everyday stories in life and work, including challenges and successes of workers, to appreciate and celebrate the admirable qualities of workers through humorous, cheerful, or touching genres.',
        'Ensure good video quality, balanced composition, and clear audio to fully convey the message of the competition.',
        'Each participant can submit an unlimited number of entries. The name of the author or group representative must match the name on their national ID card or passport.',
        'All individuals appearing in the video must have given consent, or consent must be obtained from their guardian if applicable.'
      ]
    },
    {
      title: 'Creation Period',
      content: ['Submission period: From 11/11/2024 to 31/01/2025.', 'Entries must not have participated in any previous competitions.']
    },
    {
      title: 'Copyright',
      content: [
        "The competition video must be the participant's original work and not copied from any source without permission. Participants are responsible under the law for the copyright of their submissions.",
        'The Organizing Committee is not responsible for copyright disputes and related issues. Awards will be revoked if copyright violations are discovered as per legal regulations.',
        'If necessary, the Organizing Committee may request the original file for verification.',
        'The Organizing Committee reserves the right to use the competition entries for promotional purposes and external communications without incurring any additional costs.'
      ]
    },
    {
      title: 'Participation Fees',
      content: ["As this is a humanitarian competition honoring the beauty of workers' labor and fostering a learning environment among worker communities, no participation fees will be charged."]
    },
    {
      title: 'Rights and Responsibilities of Participants',
      type: 'subContent',
      content: [
        {
          title: 'Rights',
          content: [
            'In the competition "UNLIMITED CREATIVITY - SHINE WITH VUA THỢ," participants have the right to receive support regarding information, materials, or instructions from the Organizing Committee.',
            "Participants may have their names or works promoted through the competition's media platforms.",
            'Winners are guaranteed their rights related to prizes, including receiving awards and certificates.'
          ]
        },
        {
          title: 'Responsibilities',
          content: [
            "Participants commit that their submissions are original and do not infringe on others' copyrights.",
            'Must comply with the competition rules and not violate ethical or legal regulations.',
            'Participants must ensure the accuracy and honesty of personal information provided to the Organizing Committee.'
          ]
        }
      ]
    }
  ]
  const conditions = locale === 'vi' ? conditionsVi : conditionsEn
  return (
    <div className='mx-auto flex h-full w-full flex-col gap-4 px-4 md:px-10'>
      <FrameText>{locale === 'vi' ? 'Điều kiện và tiêu chí' : 'Conditions and Criteria'}</FrameText>
      <div className='hidden grid-cols-2 gap-10 md:grid'>
        {conditions.map((condition, index) => {
          return (
            <div key={index} className='flex h-full gap-4'>
              <div className='flex flex-1 flex-col items-center justify-center '>
                <div className='flex size-14 flex-shrink-0 items-center justify-center rounded-full bg-white text-4xl font-bold uppercase text-primary-blue'>{index + 1}</div>
                <div className='h-full w-[1px] -translate-x-[0.25px] bg-white' />
                <div className='flex size-2 flex-shrink-0  rounded-full bg-white' />
              </div>
              <div className='flex w-full flex-col gap-4'>
                <p className='mt-3 text-2xl font-bold uppercase text-white'>{condition.title}</p>
                {condition.type === 'subContent' ? (
                  condition?.content?.map((item, index) => {
                    return <SubContent key={index} {...(item as ISubContentItem)} index={index} />
                  })
                ) : (
                  <ul className='ml-2 list-inside list-disc space-y-2 text-white'>
                    {condition.content.map((item, index) => {
                      if (typeof item === 'string') return <li key={index}>{item}</li>
                    })}
                  </ul>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className='md:hidden'>
        <AccordionCustomShineWithVuaTho data={conditions} />
      </div>
    </div>
  )
}

export default Conditions
