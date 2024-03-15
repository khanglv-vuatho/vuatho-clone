import AboutUsPage from '.'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Về chúng tôi',
      en: 'About us'
    }
    const description: any = {
      vi: 'Ứng dụng số 1 Việt Nam',
      en: 'Leading App in Vietnam'
    }
    return {
      title: metadata[params.locale || 'vi'] || metadata.en,
      description: description[params.locale || 'vi'] || metadata.en
    }
  } catch (error) {
    console.log(error)
  }
}

function AboutUs() {
  return <AboutUsPage />
}

export default AboutUs
