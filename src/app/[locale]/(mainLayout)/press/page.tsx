import type { Metadata } from 'next'

import { PressContent } from '.'

export async function generateMetadata({ params, searchParams }: any): Promise<Metadata> {
  const description: any = {
    vi: 'Ứng dụng số 1 Việt Nam',
    en: 'Leading App in Vietnam'
  }
  return {
    title: searchParams.search ? searchParams.search : 'Press',
    description: description[params.locale || 'vi']
  }
}

function Press({ searchParams }: { searchParams: any }) {
  return (
    <div className='flex flex-col pt-[70px] 3xl:pt-[80px]'>
      <PressContent searchParams={searchParams} />
    </div>
  )
}

export default Press
