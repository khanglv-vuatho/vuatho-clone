import axios from 'axios'
import PressDetail from '.'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog/detail`, {
      params: {
        slug: params.id,
        lang: params.locale
      }
    })

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
      en: 'Article not found'
    }
    return {
      title: metadata[params.locale || 'vi'] || metadata.en
    }
  }
}

function PressDetailWrapper() {
  return <PressDetail />
}

export default PressDetailWrapper
