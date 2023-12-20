import axios from 'axios'
import { PressContent } from '..'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    console.log(params)

    const { data } = await axios.get(
      `https://sandbox-api-website.vuatho.com/blog/byCategory?slug=${params.tag}`,
    )
    const description: any = {
      vi: 'Ứng dụng số 1 Việt Nam',
      en: 'Leading App in Vietnam',
    }
    return {
      title: data?.data?.[0].category?.title,
      description: description[params.locale || 'vi'],
    }
  } catch (error) {
    console.log(error)
    const metadata: any = {
      vi: 'Không tìm thấy thẻ tag',
      en: 'Tag not found',
    }
    return {
      title: metadata[params.locale || 'vi'],
    }
  }
}

function Press({ searchParams, params }: { searchParams: any; params: any }) {
  return (
    <div className='flex flex-col pt-[64px] 3xl:pt-[80px]'>
      <PressContent searchParams={searchParams} />
    </div>
  )
}

export default Press
