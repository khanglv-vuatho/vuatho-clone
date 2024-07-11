'use client'

import { Bug, Rocket } from '@/components/Icons'
import { ListBreadcrumbs } from '@/components/breadcrumbs'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { Star } from 'iconsax-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

type ListReleaseNotes = {
  version: string
  update_time: string
  funcs: { title: string; icon: any; children: { title: string; content: string }[] }[]
}

export const ReleaseNotes = () => {
  const t = useTranslations('listBreadcrumbs')
  const td = useTranslations('ReleaseNotes')
  const listBreadcrumbs = [{ title: t('home'), url: '/' }, { title: td('release') }]
  const listReleaseNotes: ListReleaseNotes[] = [
    {
      version: '2.0.32',
      update_time: '20-03-2024',
      funcs: [
        {
          title: td('text'),
          icon: <Star variant='Bold' size={32} className='flex size-6 flex-shrink-0 text-primary-yellow lg:size-8' />,
          children: [
            { title: 'Tối ưu hoá hiệu suất', content: 'Tăng tốc độ tải ứng dụng và giảm thời gian chờ đợi' },
            { title: 'Giao Diện Người Dùng Được Nâng Cấp', content: 'Cải thiện giao diện người dùng để mang lại trải nghiệm mượt mà và thân thiện hơn' },
            { title: 'Hỗ Trợ Người Dùng Nâng Cao', content: 'Mở rộng giờ làm việc của đội ngũ hỗ trợ khách hàng để đáp ứng nhanh chóng mọi yêu cầu và thắc mắc của bạn' }
          ]
        },
        {
          title: td('text1'),
          icon: <Rocket className='flex size-6 flex-shrink-0 lg:size-8' />,
          children: [
            { title: 'Tối ưu hoá hiệu suất', content: 'Tăng tốc độ tải ứng dụng và giảm thời gian chờ đợi' },
            { title: 'Giao Diện Người Dùng Được Nâng Cấp', content: 'Cải thiện giao diện người dùng để mang lại trải nghiệm mượt mà và thân thiện hơn' },
            { title: 'Hỗ Trợ Người Dùng Nâng Cao', content: 'Mở rộng giờ làm việc của đội ngũ hỗ trợ khách hàng để đáp ứng nhanh chóng mọi yêu cầu và thắc mắc của bạn' }
          ]
        },
        {
          title: td('text2'),
          icon: <Bug className='flex size-6 flex-shrink-0 lg:size-8' />,
          children: [
            { title: 'Tối ưu hoá hiệu suất', content: 'Tăng tốc độ tải ứng dụng và giảm thời gian chờ đợi' },
            { title: 'Giao Diện Người Dùng Được Nâng Cấp', content: 'Cải thiện giao diện người dùng để mang lại trải nghiệm mượt mà và thân thiện hơn' },
            { title: 'Hỗ Trợ Người Dùng Nâng Cao', content: 'Mở rộng giờ làm việc của đội ngũ hỗ trợ khách hàng để đáp ứng nhanh chóng mọi yêu cầu và thắc mắc của bạn' }
          ]
        }
      ]
    },
    {
      version: '2.0.24',
      update_time: '20-05-2024',
      funcs: [
        {
          title: 'Tính Năng Mới',
          icon: <Star variant='Bold' size={32} className='flex size-6 flex-shrink-0 text-primary-yellow lg:size-8' />,
          children: [
            { title: 'Tối ưu hoá hiệu suất', content: 'Tăng tốc độ tải ứng dụng và giảm thời gian chờ đợi' },
            { title: 'Giao Diện Người Dùng Được Nâng Cấp', content: 'Cải thiện giao diện người dùng để mang lại trải nghiệm mượt mà và thân thiện hơn' },
            { title: 'Hỗ Trợ Người Dùng Nâng Cao', content: 'Mở rộng giờ làm việc của đội ngũ hỗ trợ khách hàng để đáp ứng nhanh chóng mọi yêu cầu và thắc mắc của bạn' }
          ]
        },
        {
          title: 'Cải Tiến',
          icon: <Rocket className='flex size-6 flex-shrink-0 lg:size-8' />,
          children: [
            { title: 'Tối ưu hoá hiệu suất', content: 'Tăng tốc độ tải ứng dụng và giảm thời gian chờ đợi' },
            { title: 'Giao Diện Người Dùng Được Nâng Cấp', content: 'Cải thiện giao diện người dùng để mang lại trải nghiệm mượt mà và thân thiện hơn' },
            { title: 'Hỗ Trợ Người Dùng Nâng Cao', content: 'Mở rộng giờ làm việc của đội ngũ hỗ trợ khách hàng để đáp ứng nhanh chóng mọi yêu cầu và thắc mắc của bạn' }
          ]
        },
        {
          title: 'Sửa lỗi',
          icon: <Bug className='flex size-6 flex-shrink-0 lg:size-8' />,
          children: [
            { title: 'Tối ưu hoá hiệu suất', content: 'Tăng tốc độ tải ứng dụng và giảm thời gian chờ đợi' },
            { title: 'Giao Diện Người Dùng Được Nâng Cấp', content: 'Cải thiện giao diện người dùng để mang lại trải nghiệm mượt mà và thân thiện hơn' },
            { title: 'Hỗ Trợ Người Dùng Nâng Cao', content: 'Mở rộng giờ làm việc của đội ngũ hỗ trợ khách hàng để đáp ứng nhanh chóng mọi yêu cầu và thắc mắc của bạn' }
          ]
        }
      ]
    }
  ]
  const [contentVersion, setContentVersion] = useState<ListReleaseNotes>(listReleaseNotes[0])

  const highlightRef = useRef(null)

  const handleSelect = (version?: string) => {
    const activeButton = document.querySelector(`button.menuActive`) as HTMLElement
    const highlight = highlightRef.current

    if (activeButton && highlight) {
      const { offsetTop: top, offsetHeight: height } = activeButton
      ;(highlight as HTMLElement).style.transform = `translateY(${top}px)`
      ;(highlight as HTMLElement).style.height = `${height}px`
    }

    if (!version) return

    const findItem = listReleaseNotes?.find((item) => item.version === version)
    if (findItem) return setContentVersion(findItem)
  }

  useEffect(() => {
    handleSelect()
  }, [contentVersion])

  return (
    <div className='ct-container pt-[70px] 3xl:pt-[80px]'>
      <div className='my-6'>
        <ListBreadcrumbs list={listBreadcrumbs} />
      </div>
      <div className='lg:hidden'>
        <Accordion
          defaultExpandedKeys={[listReleaseNotes?.[0]?.version.toString()]}
          selectionMode='single'
          className='gap-5'
          itemClasses={{
            base: 'group-[.is-splitted]:shadow-[0px_8px_32px_0px_#00000014]'
          }}
        >
          {listReleaseNotes.map((item: any) => (
            <AccordionItem
              key={item.version}
              aria-label={item.version}
              title={`Vua thợ ${td('text3')} ${item.version}`}
              classNames={{
                content: 'flex flex-col gap-10',
                title: 'font-bold data-[open=true]:text-primary-blue text-lg',
                indicator: 'text-lg',
                base: 'group-[.is-splitted]:pl-4',
                trigger: 'data-[focus-visible=true]:!outline-none px-2 py-4'
              }}
            >
              <ContentRelease contentVersion={contentVersion} />
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className='hidden grid-cols-1 lg:mt-5 lg:grid lg:grid-cols-4'>
        <div className='relative hidden w-full lg:block'>
          <div className='absolute w-full border-l-4 border-[#FCB713] bg-gradient-to-r from-[#FCB71333] to-[#FCB71300] transition ' ref={highlightRef} />
          <ItemTitleRelease contentVersion={contentVersion} handleSelect={handleSelect} listReleaseNotes={listReleaseNotes} />
        </div>
        <div className='relative flex flex-col gap-10 p-10 lg:col-span-3 lg:px-0'>
          <div>
            <p className=' text-[#a6a6a6]'>{contentVersion?.update_time}</p>
            <p className='text-2xl font-semibold text-primary-blue'>
              Vua Thợ {td('text3')} [{contentVersion?.version}]
            </p>
          </div>
          <div className='flex flex-col gap-10'>
            <ContentRelease contentVersion={contentVersion} />
          </div>
        </div>
      </div>
    </div>
  )
}

type ContentRelease = {
  contentVersion: ListReleaseNotes
}

const ContentRelease = ({ contentVersion }: { contentVersion: ListReleaseNotes }) => {
  return contentVersion?.funcs?.map((item: any) => (
    <div className='flex flex-col gap-4' key={item.title}>
      <div className='flex items-center gap-3'>
        {item.icon}
        <p className='text-lg font-semibold lg:text-xl'>{item.title}</p>
      </div>
      <ul className='*: flex list-disc flex-col gap-2 pl-5 text-sm *:my-1 *:text-base lg:*:my-0'>
        {item?.children?.map((item: any) => {
          return (
            <li key={item.title}>
              <span className='font-semibold'>{item.title}:</span>
              <span> {item.content}</span>
            </li>
          )
        })}
      </ul>
    </div>
  ))
}

type ItemTitleReleaseProps = {
  listReleaseNotes: ListReleaseNotes[]
  // eslint-disable-next-line no-unused-vars
  handleSelect: (version: string) => void
} & ContentRelease

const ItemTitleRelease: React.FC<ItemTitleReleaseProps> = ({ listReleaseNotes, contentVersion, handleSelect }) => {
  return listReleaseNotes?.map((item) => (
    <button key={item.version} className={`relative flex w-full items-center p-5 ${item.version === contentVersion.version ? 'menuActive ' : ''}`} onClick={() => handleSelect(item.version)}>
      <p>Vua Thợ [{item.version}]</p>
      <time className='ml-1'> - {item.update_time}</time>
    </button>
  ))
}
