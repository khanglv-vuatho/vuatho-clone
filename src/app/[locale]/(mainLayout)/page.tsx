import Wrapper from '@/components/Wrapper'
import SectionWithVuaTho from './(sections)/withVuaTho'
import WorkerBenefitSection from './(sections)/WorkerBenefitSection'
import ClientBenefitSection from './(sections)/CustomerBenefitSection'
import AISection from './(sections)/AISection'
import MinhBach from './(sections)/MinhBach'
import HinhThucKetNoi from './(sections)/HinhThucKetNoi'
import SectionToTheMoon from './(sections)/toTheMoon'
import PressHome from './(sections)/PressHome'
import MainSection from './(sections)/MainSection/section'
import OtherPress from './(sections)/OtherPress'

// import './swipper.scss'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/zoom'

import './swipper.scss'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Thợ nào cũng có',
      en: 'Home'
    }
    return {
      title: metadata[params.locale || 'vi'] || metadata.en
    }
  } catch (error) {
    console.log(error)
  }
}

const HeroSection = () => {
  return (
    <Wrapper>
      <MainSection />
      <SectionWithVuaTho />
      <OtherPress />
      <WorkerBenefitSection />
      <ClientBenefitSection />
      <AISection />
      <MinhBach />
      <HinhThucKetNoi />
      <SectionToTheMoon />
      <PressHome />
    </Wrapper>
  )
}

export default HeroSection
