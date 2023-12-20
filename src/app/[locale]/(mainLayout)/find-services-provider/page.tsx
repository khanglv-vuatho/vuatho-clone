import { useTranslations } from 'next-intl'
import SectionTest from './(sections)/sectionStep'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Tìm thợ',
      en: 'Find worker',
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

function FindWorker() {
  const t = useTranslations('FindWorker')

  return (
    <div className='pt-[64px] 3xl:pt-[80px]'>
      <div className='ct-container-70 flex flex-col gap-[30px] py-[20px]'>
        <h3 className='text-[2.4rem] text-[#405AB7] md:text-[3.2rem]'>{t('heading')}</h3>
        <SectionTest />
      </div>
    </div>
  )
}
export default FindWorker
