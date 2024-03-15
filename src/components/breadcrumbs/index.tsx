'use client'

import { memo } from 'react'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs'

import { IBreadcrumbWithUrl } from '@/interface'

export const ListBreadcrumbs = memo(({ list }: { list: IBreadcrumbWithUrl[] }) => {
  return (
    <Breadcrumbs
      underline='hover'
      classNames={{
        list: 'gap-[8px]'
      }}
      itemClasses={{
        item: 'text-[1.8rem] text-white font-light',
        base: 'gap-[8px]',
        separator: 'text-[2.4rem] text-white font-light'
      }}
    >
      {list.map((item) => (
        <BreadcrumbItem key={item?.title} href={item?.url}>
          {item?.title}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  )
})

export const ListBreadcrumbsForDetailPress = memo(({ list }: { list: IBreadcrumbWithUrl[] }) => {
  return (
    <Breadcrumbs
      underline='hover'
      classNames={{
        list: 'gap-[4px] lg:gap-[16px] flex-nowrap'
      }}
      itemClasses={{
        item: 'text-[1.8rem]',
        base: 'gap-[4px] lg:gap-[16px]',
        separator: 'text-[2.4rem] text-[#C9C9C9]'
      }}
    >
      {list.map((item, index) => (
        <BreadcrumbItem key={`details-${index}`} href={item?.url}>
          {item?.title}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  )
})
