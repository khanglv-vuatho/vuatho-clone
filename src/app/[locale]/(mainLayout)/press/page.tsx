import type { Metadata } from 'next'

import { PressContent } from '.'

export async function generateMetadata({ params, searchParams }: any): Promise<Metadata> {
  console.log(searchParams.search)
  const description: any = {
    vi: 'Ứng dụng số 1 Việt Nam',
    en: 'Leading App in Vietnam',
  }
  return {
    title: searchParams.search ? searchParams.search : 'Press',
    description: description[params.locale || 'vi'],
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
