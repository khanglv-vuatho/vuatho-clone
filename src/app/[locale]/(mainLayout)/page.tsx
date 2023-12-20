import HomePage from '.'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Thợ nào cũng có',
      en: 'Home',
    }
    return {
      title: metadata[params.locale || 'vi'],
    }
  } catch (error) {
    console.log(error)
  }
}

const HeroSection = () => {
  return <HomePage />
}

export default HeroSection
