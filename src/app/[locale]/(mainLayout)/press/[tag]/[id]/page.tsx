import axios from 'axios'
import PressDetail from '.'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const { data } = await axios.get(
      'https://sandbox-api-website.vuatho.com/blog/detail',
      {
        params: {
          slug: params.id,
          lang: params.locale,
        },
      },
    )
    const description: any = {
      vi: 'Ứng dụng số 1 Việt Nam',
      en: 'Leading App in Vietnam',
    }
    return {
      title: data?.data.title,
      description: data?.data.description || data?.data.content,
      keywords: data?.data.keywords,
      robots: data?.data.robots
    }
  } catch (error) {
    console.log(error)

    const metadata: any = {
      vi: 'Không có bài viết',
      en: 'Article not found',
    }
    return {
      title: metadata[params.locale || 'vi'],
    }
  }
}

function PressDetailWrapper() {
  return <PressDetail />
}

export default PressDetailWrapper
