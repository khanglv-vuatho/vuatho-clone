import { Metadata } from 'next'

import BackgroundRelative from '@/components/BackgroundRelative'
import SectionStep from './(sections)/sectionStep'
import { useTranslations } from 'next-intl'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Trở thành thợ',
      en: 'Become worker',
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

const BeComeEmployee = () => {
  const t = useTranslations('Footer')

  return (
    <div className=''>
      <BackgroundRelative text={t('become_worker')} />
      <SectionStep />
    </div>
  )
}

export default BeComeEmployee
