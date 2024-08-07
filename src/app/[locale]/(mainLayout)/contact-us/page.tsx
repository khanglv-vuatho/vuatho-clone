import BioPage from '.'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Liên hệ',
      en: 'Contact us'
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

const ContactUs = () => {
  // return <ContactUsPage />
  return (
    <div className='pt-[70px] 3xl:pt-[80px]'>
      <BioPage />
    </div>
  )
}

export default ContactUs
