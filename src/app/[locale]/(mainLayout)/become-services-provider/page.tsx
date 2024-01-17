import { useTranslations } from 'next-intl'

import BackgroundRelative from '@/components/BackgroundRelative'
import SectionStep from './(sections)/sectionStep'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Trở thành Thợ',
      en: 'Become worker',
    }
    const description: any = {
      vi: 'Ứng dụng số 1 Việt Nam',
      en: 'Leading App in Vietnam',
    }

    return {
      title: metadata[params.locale || 'vi'] || metadata.en,
      description: description[params.locale || 'vi'] || metadata.en,
    }
  } catch (error) {
    console.log(error)
  }
}

const BeComeEmployee = () => {
  const t = useTranslations('Footer')

  return (
    <div>
      <BackgroundRelative text={t('become_worker')} />
      <SectionStep />
    </div>
  )
}

export default BeComeEmployee
