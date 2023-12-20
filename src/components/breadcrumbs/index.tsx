'use client'

import { BreadcrumbWithUrl } from '@/interface'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs'

export const ListBreadcrumbs = ({ list }: { list: BreadcrumbWithUrl[] }) => {
  return (
    <Breadcrumbs
      underline='hover'
      classNames={{
        list: 'gap-[8px]',
      }}
      itemClasses={{
        item: 'text-[1.8rem] text-white font-light',
        base: 'gap-[8px]',
        separator: 'text-[2.4rem] text-white font-light',
      }}
    >
      {list.map((i) => (
        <BreadcrumbItem key={i.title} href={i?.url}>
          {i.title}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  )
}

export const ListBreadcrumbsForDetailPress = ({
  list,
}: {
  list: BreadcrumbWithUrl[]
}) => {
  return (
    <Breadcrumbs
      underline='hover'
      classNames={{
        list: 'gap-[4px] lg:gap-[16px] flex-nowrap',
      }}
      itemClasses={{
        item: 'text-[1.8rem] ',
        base: 'gap-[4px] lg:gap-[16px]',
        separator: 'text-[2.4rem] text-[#C9C9C9]',
      }}
    >
      {list.map((i) => (
        <BreadcrumbItem key={i.title} href={i?.url}>
          {i.title}
          <div className='class="flex text-[1.8rem]" line-clamp-1 cursor-default items-center gap-1 whitespace-nowrap text-foreground no-underline outline-none transition-opacity tap-highlight-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus'></div>
          <div className='line-clamp-1 flex cursor-pointer items-center gap-1 whitespace-nowrap text-[1.8rem] text-foreground/50 outline-none transition-opacity tap-highlight-transparent hover:underline hover:opacity-80 active:opacity-disabled data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus'></div>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  )
}
