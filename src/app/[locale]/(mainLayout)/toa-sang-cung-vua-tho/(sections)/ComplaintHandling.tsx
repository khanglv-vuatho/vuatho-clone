import FrameText from '@/components/FrameText'
import React from 'react'
import { useLocale } from 'next-intl'

const ComplaintHandling = () => {
  const locale = useLocale()

  const content = {
    vi: {
      title1: 'GIẢI QUYẾT KHIẾU NẠI VÀ',
      title2: 'TỐ CÁO VÀ XỬ LÝ VI PHẠM',
      paragraph1:
        '1. Các cá nhân có quyền khiếu nại về kết quả cuộc thi. Đơn khiếu nại phải ghi rõ họ tên, địa chỉ, lý do khiếu nại và gửi tới Đơn vị tổ chức thực hiện. Đơn vị tổ chức thực hiện có trách nhiệm xem xét và trả lời đơn khiếu nại, báo cáo kết quả giải quyết khiếu nại lên Ban Tổ chức. Không xem xét đơn không có tên, địa chỉ rõ ràng hoặc nặc danh, mạo danh.',
      paragraph2: '2. Ban Tổ chức sẽ thu hồi giải thưởng, thông báo cơ quan chức năng để giải quyết theo quy định của pháp luật đối với các trường hợp sau:',
      listItems: [
        'Tác phẩm tham dự vi phạm Luật Báo chí, Luật Xuất bản, Luật Bản quyền, Luật Sở hữu trí tuệ, các quy định pháp luật của Nhà nước có liên quan và Thể lệ Cuộc thi này.',
        'Lợi dụng giải thưởng được trao để thực hiện hành vi phạm pháp luật.',
        'Việc thu hồi giải thưởng sẽ được công bố công khai trên các phương tiện thông tin đại chúng.'
      ]
    },
    en: {
      title1: 'COMPLAINT RESOLUTION AND',
      title2: 'VIOLATION HANDLING',
      paragraph1:
        '1. Individuals have the right to appeal the contest results. Complaints must clearly state the name, address, reason for complaint and be sent to the Organizing Unit. The Organizing Unit is responsible for reviewing and responding to complaints, reporting resolution results to the Organizing Committee. Anonymous complaints or those without clear names and addresses will not be considered.',
      paragraph2: '2. The Organizing Committee will revoke prizes and notify relevant authorities for legal resolution in the following cases:',
      listItems: [
        'Contest entries that violate Press Law, Publishing Law, Copyright Law, Intellectual Property Law, relevant State regulations and these Contest Rules.',
        'Using awarded prizes to conduct illegal activities.',
        'Prize revocation will be publicly announced through mass media.'
      ]
    }
  }

  const selectedContent = content[locale as keyof typeof content] || content.vi

  return (
    <div className='flex flex-col gap-10 px-4 md:px-10'>
      <FrameText imageClassName='h-[100px]'>
        {selectedContent.title1} <br className='md:hidden' />
        {selectedContent.title2}
      </FrameText>
      <div className='mx-auto max-w-[90%]'>
        <div className='flex flex-col gap-4 text-white'>
          <p>{selectedContent.paragraph1}</p>
          <p>{selectedContent.paragraph2}</p>
          <ul className='-mt-2 ml-2 list-inside list-disc md:ml-4'>
            {selectedContent.listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ComplaintHandling
