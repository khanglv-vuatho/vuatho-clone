import { useTranslations } from 'next-intl'

import SectionTest from './(sections)/sectionStep'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Tìm Thợ',
      en: 'Find worker'
    }
    const description: any = {
      vi: 'Ứng dụng số 1 Việt Nam',
      en: 'Leading App in Vietnam'
    }
    return {
      title: metadata[params.locale || 'vi'] || metadata.en,
      description: description[params.locale || 'vi'] || description.en
    }
  } catch (error) {
    console.log(error)
  }
}

function FindWorker() {
  const t = useTranslations('FindWorker')

  return (
    <div className='pt-[70px] 3xl:pt-[80px]'>
      <div className='ct-container flex flex-col gap-8 py-5'>
        <h3 className='text-2xl text-[#405AB7] md:text-3xl'>{t('heading')}</h3>
        <SectionTest />
      </div>
    </div>
  )
}
export default FindWorker
