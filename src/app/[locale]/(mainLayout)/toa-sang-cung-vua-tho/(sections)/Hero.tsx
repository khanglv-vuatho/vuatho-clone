import { useLocale } from 'next-intl'
import Image from 'next/image'
import React from 'react'
const Hero = () => {
  const locale = useLocale()

  const customGradient = 'radial-gradient(61.97% 149.07% at 83.11% 83.68%, #FFFFFF 15.14%, #FFE35E 100%)'

  const content = {
    vi: {
      purpose: {
        title: 'Mục đích',
        items: [
          'Tôn vinh những câu chuyện, khoảnh khắc ý nghĩa về mọi mặt đời sống, xã hội của những người thợ, những người lao động chân chính Việt Nam thông qua những tác phẩm video ngắn nhằm khơi dậy niềm tự hào về nghề nghiệp và khuyến khích tinh thần sáng tạo của cộng đồng.',
          'Tạo cơ hội giao lưu, học hỏi, chia sẻ những câu chuyện cảm động về người thợ với mong muốn quảng bá hình ảnh thương hiệu Vua Thợ và nâng cao nhận thức về hình ảnh của nghề thợ trong xã hội làm góp phần vào sự phát triển của Đất nước',
          'Tạo ra một cộng đồng thợ nhân văn, là nơi để các anh thợ có thể chia sẻ, yêu thương và chăm sóc lẫn nhau. Giúp cho người lao động có thêm được việc làm và giảm bớt các tệ nạn xã hội.',
          'Đề cao sự chuẩn mực trong dịch vụ sửa chữa, bảo hành bảo trì. Giúp khách hàng có trải nghiệm dịch vụ tốt nhất.',
          'Hướng đến một hành tinh xanh sạch đẹp. Bảo vệ môi trường, giảm phát thải khi gia tăng thời gian sử dụng sản phẩm thay vì mua mới.'
        ]
      },
      requirements: {
        title: 'YÊU CẦU',
        items: [
          'Các tác phẩm dự thi không vi phạm bản quyền, phải đảm bảo tính pháp lý mang tính quảng bá cao, đáp ứng được các tiêu chí về chất lượng nghệ thuật.',
          'Nội dung và hình thức của tác phẩm phải đảm bảo thuần phong mỹ tục và các quy định Pháp luật Việt Nam.',
          'Tác giả gửi tác phẩm dự thi phải hoàn toàn chịu trách nhiệm về bản quyền tác phẩm của mình.',
          'Khuyến khích tác giả sử dụng công nghệ thông tin, truyền thông hiện đại để đạt hiệu ứng truyền thông tốt với công chúng.'
        ]
      },
      participants: {
        title: 'ĐỐI TƯỢNG',
        items: ['Cuộc thi mở rộng cho công dân toàn cầu, không giới hạn quốc gia và vùng lãnh thổ.', 'Các thành viên Ban Tổ chức không được tham gia dự thi.']
      }
    },
    en: {
      purpose: {
        title: 'Purpose',
        items: [
          'Honor meaningful stories and moments in all aspects of life and society of Service Providers and genuine laborers in Vietnam through short video works to inspire pride in professions and encourage the creative spirit of the community.',
          'Create opportunities to exchange, learn, and share touching stories about Service Providers with the aim of promoting the brand image of Vua Thợ and raising awareness about the image of Service Providers in society, contributing to the development of the nation.',
          'Build a Service Providers community, a place where Service Providers can share, care, and support one another. Help laborers find more job opportunities and reduce social evils.',
          'Promote standards in repair, warranty, and maintenance services. Provide customers with the best service experience.',
          'Aim for a clean and beautiful planet. Protect the environment by reducing emissions and extending product usage time instead of purchasing new ones.'
        ]
      },
      requirements: {
        title: 'Requirements',
        items: [
          'Entries must not violate copyright laws, must ensure legality, have high promotional value, and meet artistic quality standards.',
          'The content and format of the works must adhere to Vietnamese customs and laws.',
          'Participants submitting works are entirely responsible for the copyrights of their works.',
          'Authors are encouraged to use modern information and communication technologies to achieve effective communication with the public.'
        ]
      },
      participants: {
        title: 'Participants',
        items: ['The competition is open to global citizens without restriction on nationality or territory.', 'Members of the Organizing Committee are not allowed to participate in the competition.']
      }
    }
  }

  const selectedContent = content[locale as keyof typeof content] || content.vi

  return (
    <div id='join-now' className='mx-auto w-full px-10'>
      <div className='flex w-full flex-col gap-4'>
        <div style={{ background: customGradient, overflow: 'visible' }} className='flex flex-col gap-2 rounded-2xl md:grid md:grid-cols-2 '>
          <div className='flex flex-col gap-2 p-4 md:gap-4 md:p-8'>
            <p className='text-2xl font-bold uppercase text-primary-blue md:text-3xl'>{selectedContent.purpose.title}</p>
            <ul className='ml-2 list-inside list-disc space-y-2'>
              {selectedContent.purpose.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='w-full md:relative'>
            <Image className='-bottom-[1px] -right-4 z-[40] object-cover md:absolute' src={'/shineWithVuaTho/2people.png'} alt='2people.png' width={1000} height={1000} />
          </div>
        </div>
        <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2'>
          <div style={{ background: '#FFE35E' }} className='flex flex-col gap-2 rounded-2xl p-4 md:gap-4 md:p-8'>
            <p className='text-2xl font-bold uppercase text-primary-blue md:text-3xl'>{selectedContent.requirements.title}</p>
            <ul className='ml-2 list-inside list-disc space-y-2'>
              {selectedContent.requirements.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#FFE35E' }} className='flex flex-col gap-2 rounded-2xl p-4 md:gap-4 md:p-8'>
            <p className='text-2xl font-bold uppercase text-primary-blue md:text-3xl'>{selectedContent.participants.title}</p>
            <ul className='ml-2 list-inside list-disc space-y-2'>
              {selectedContent.participants.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
