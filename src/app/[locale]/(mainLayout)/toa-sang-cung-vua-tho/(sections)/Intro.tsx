import ImageFallback from '@/components/ImageFallback'
import { useLocale } from 'next-intl'
import React from 'react'

const Intro = () => {
  const locale = useLocale()
  const localText = locale === 'vi' ? 'vi' : 'en'
  const content = {
    vi: {
      text: 'là ứng dụng di động tiên phong, kết nối khách hàng với các Cộng tác viên thợ chuyên nghiệp, giàu kinh nghiệm trong nhiều lĩnh vực. Ứng dụng mang đến trải nghiệm dịch vụ tiện lợi chỉ với vài thao tác, đáp ứng nhanh chóng 24/7 và đa dạng nhu cầu trong cuộc sống hằng ngày. Với chính sách đảm bảo chất lượng, bảo hành và hậu mãi chu đáo, Vua Thợ giúp khách hàng dễ dàng tìm thấy giải pháp phù hợp cho các yêu cầu từ sửa chữa, bảo trì, làm đẹp đến nhiều lĩnh vực khác. Không chỉ tạo dựng niềm tin và hiệu quả trong từng dịch vụ, Vua Thợ còn xây dựng một cộng đồng thợ hiện đại, nơi giá trị lao động được trân trọng và phát triển bền vững. Trong tương lai, ứng dụng sẽ mở rộng phạm vi hoạt động đến các thị trường quốc tế tiềm năng, mang giải pháp công nghệ từ Việt Nam ra thế giới. Vua Thợ là biểu tượng cho tinh thần sáng tạo và khát vọng đổi mới, lan tỏa giá trị lao động và trí tuệ Việt đến mọi nơi trên toàn cầu.'
    },
    en: {
      text: 'is a cutting-edge mobile application connecting customers with professional, highly skilled service providers across various industries.The app offers a seamless service experience with just a few taps, operating 24/7 to meet diverse daily needs. Backed by quality assurance, warranty, and attentive aftercare, Vua Thợ provides tailored solutions for everything from repairs and maintenance to beauty services and more.More than just delivering reliable services, Vua Thợ fosters a progressive and supportive service provider community, where the value of labor is honored and sustainable growth is encouraged.In the future, the app aims to expand into promising international markets, bringing innovative solutions and Vietnamese excellence to a global audience.Vua Thợ embodies the spirit of creativity and the drive for innovation, spreading the value of labor and the intelligence of Vietnam to every corner of the world.'
    }
  }

  return (
    <div className='mx-auto flex h-full w-full flex-col items-center justify-center gap-4 px-4 text-white md:px-10'>
      <div className='w-[50px]'>
        <ImageFallback src={'/shineWithVuaTho/“.png'} alt='vua tho' width={100} height={100} className='size-full object-cover' />
      </div>
      <p className='text-center text-lg'>
        <strong>Vua Thợ </strong>
        {content[localText].text}
      </p>
    </div>
  )
}

export default Intro
