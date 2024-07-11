'use client'

import { memo } from 'react'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs'

import { IBreadcrumbWithUrl } from '@/interface'

export const ListBreadcrumbs = memo(({ list }: { list: IBreadcrumbWithUrl[] }) => {
  return (
    <Breadcrumbs
      underline='hover'
      separator='/'
      classNames={{
        list: 'gap-1 lg:gap-4 flex-nowrap'
      }}
      itemClasses={{
        item: 'text-lg',
        base: 'gap-1 lg:gap-4',
        separator: 'text-lg text-[#C9C9C9]'
      }}
    >
      {list.map((item) => (
        <BreadcrumbItem key={`details-${item?.title}`} href={item?.url}>
          {item?.title}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  )
})
