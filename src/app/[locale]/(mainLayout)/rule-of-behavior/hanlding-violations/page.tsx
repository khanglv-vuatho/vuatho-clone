import HandlingViolations from '.'
export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Hình thức xử lý vi phạm',
      en: 'Hanlding Violations'
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
const Page = () => {
  return <HandlingViolations />
}

export default Page
