import HistoryPage from '.'

export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Lịch sử mua hàng',
      en: 'History Shopping'
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

const History = () => {
  return <HistoryPage />
}

export default History
