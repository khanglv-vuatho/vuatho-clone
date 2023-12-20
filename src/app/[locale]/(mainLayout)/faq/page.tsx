import { memo } from 'react'

import BackgroundRelative from '@/components/BackgroundRelative'
import { useTranslations } from 'next-intl'
import FaqSection from './(sections)/faqSection'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Câu hỏi thường gặp',
      en: 'FAQ',
    }
    const description: any = {
      vi: 'Ứng dụng số 1 Việt Nam',
      en: 'Leading App in Vietnam',
    }
    return {
      title: metadata[params.locale || 'vi'],
      description: description[params.locale || 'vi'],
    }
  } catch (error) {
    console.log(error)
  }
}
function Faq() {
  const t = useTranslations('Footer')

  return (
    <div className=''>
      <BackgroundRelative text={t('faq')} />
      <FaqSection />
    </div>
  )
}

export default memo(Faq)
