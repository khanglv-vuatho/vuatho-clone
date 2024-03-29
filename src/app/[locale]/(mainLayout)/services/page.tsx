import Map from '@/components/map'
import LeftRenderSearch from '@/components/services/LeftSideRender'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Danh sách ngành nghề tại Vua Thợ',
      en: 'Terms and condition',
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

const Default = () => {
  return (
    <div>
      <div className='py-[20px] 13inch:py-[40px] 3xl:py-[80px]'>
        <div className='ct-container-70 mt-[68px]'>
          <div className='flex flex-col gap-[20px]'>
            <div>
              <LeftRenderSearch />
            </div>
            <div>
              <div className='h-full w-full p-5'>
                <div className='flex space-x-6'>{/* <h1>Việt Nam</h1> */}</div>
                <Map />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Default
