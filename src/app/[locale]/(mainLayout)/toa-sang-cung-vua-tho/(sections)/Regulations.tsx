import FrameText from '@/components/FrameText'
import React from 'react'
import { useLocale } from 'next-intl'

const Regulations = () => {
  const locale = useLocale()
  const localText = locale === 'vi' ? 'vi' : 'en'

  const content = {
    vi: {
      title: 'Quy chế chấm giải',
      step: 'Bước',
      rules: [
        {
          title: 'Vòng Sơ Khảo (Chiếm 40% tổng số điểm trên thang điểm 10)',
          content: [
            'Trên cơ sở tập hợp tác phẩm của người dự thi gửi đến, Hội đồng Giám khảo tiến hành lựa chọn 30 tác phẩm cao nhất dựa vào: Tổng số lượng lượt xem và tương tác (Like, share, bình luận) của video'
          ]
        },
        {
          title: 'Vòng Chung khảo (Chiếm 60% tổng số điểm trên thang điểm 10)',
          content: [
            'Các tác phẩm vào vòng Chung khảo sẽ được Hội đồng Giám khảo chấm và xét chọn dựa theo những tiêu chí bên dưới, kết quả sẽ được trình Ban Tổ chức xem xét và ký quyết định công nhận giải thưởng:',
            'Nội dung: Sáng tạo, ý nghĩa, cảm động, gần gũi với cuộc sống.',
            'Hình ảnh: Chất lượng hình ảnh tốt, góc máy đẹp, bố cục hài hòa.',
            'Âm thanh: Âm thanh rõ ràng, phù hợp với nội dung.',
            'Sự độc đáo: Ý tưởng mới lạ, khác biệt so với các video khác.'
          ]
        }
      ]
    },
    en: {
      title: 'Judging Criteria',
      step: 'Step',
      rules: [
        {
          title: 'Preliminary Round (40% of total points on a 10-point scale)',
          content: [
            'Based on the collection of submitted works, the Board of Judges will select the top 30 entries based on: Total number of views and interactions (Likes, shares, comments) of the video'
          ]
        },
        {
          title: 'Final Round (60% of total points on a 10-point scale)',
          content: [
            'Entries in the Final Round will be evaluated by the Board of Judges based on the criteria below, and results will be submitted to the Organizing Committee for review and approval:',
            'Content: Creative, meaningful, touching, relatable to life.',
            'Visual Quality: Good image quality, beautiful camera angles, harmonious composition.',
            'Audio: Clear sound that matches the content.',
            'Originality: Novel ideas that differ from other videos.'
          ]
        }
      ]
    }
  }

  const selectedContent = content[localText] || content.vi

  return (
    <div className='flex flex-col gap-10 px-4 md:px-10'>
      <FrameText>{selectedContent.title}</FrameText>
      {selectedContent.rules.map((rule, index) => (
        <div key={index} className='flex flex-col gap-4'>
          <p className='text-lg font-bold uppercase text-[#FFF266] md:text-2xl'>
            <span className='underline'>
              {selectedContent.step} {index + 1}:
            </span>{' '}
            {rule.title}
          </p>
          <ul className='ml-4 list-inside list-disc space-y-2 text-white md:ml-10'>{rule.content?.map((item, index) => <li key={index}>{item}</li>)}</ul>
        </div>
      ))}
    </div>
  )
}

export default Regulations
