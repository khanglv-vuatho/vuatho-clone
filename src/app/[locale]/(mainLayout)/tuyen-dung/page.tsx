import { ListBreadcrumbs } from '@/components/breadcrumbs'
import ImageFallback from '@/components/ImageFallback'
import { useLocale, useTranslations } from 'next-intl'
import { TabListJobs } from '.'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Tuyển dụng',
      en: 'Career'
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

const Career = () => {
  const locale = useLocale()

  const t = useTranslations('listBreadcrumbs')
  const tc = useTranslations('Career')

  return (
    <div className='relative h-full py-[70px] 3xl:py-[80px]'>
      <div className='absolute bottom-0 left-0 right-0 z-[-10] hidden lg:block'>
        <ImageFallback src={'/career/bg.png'} alt='bg' height={2000} width={3000} className='absolute bottom-0 left-0 right-0 max-h-[80dvh]' />
      </div>
      <div className='ct-container z-20'>
        <div className='mt-10'>
          <ListBreadcrumbs list={[{ title: t('home'), url: '/' }, { title: tc('title') }]} />
        </div>
        <h1 className='my-4 mt-6 text-center text-2xl font-bold uppercase text-primary-blue lg:my-6 lg:mt-4 lg:text-4xl'>Vị trí</h1>
        <TabListJobs />
      </div>
    </div>
  )
}

export default Career
