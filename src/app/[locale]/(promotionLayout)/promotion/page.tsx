import { useTranslations } from 'next-intl'
import {
  ConditionDetails,
  GuidelinesPromotion,
  Hero,
  ImportantNote,
  ProtocolsPromotion,
  Reward,
} from '.'

function Promotion() {
  const t = useTranslations('Promotion.Hero')

  return (
    <div className='flex flex-col gap-[40px] pt-[70px] md:gap-[100px] 3xl:pt-[80px]'>
      <Hero
        title1={t('text1')}
        title2={t('text2')}
        desc={t('text3')}
        thumb='/promotion/hero1.png'
        thumb1='/promotion/number1.png'
        thumb2='/promotion/number2.png'
        thumb3='/promotion/number3.png'
      />
      <GuidelinesPromotion />
      <ProtocolsPromotion />
      <Reward />
      <ConditionDetails />
      <ImportantNote />
    </div>
  )
}

export default Promotion
