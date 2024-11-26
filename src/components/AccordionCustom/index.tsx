'use client'

import { IAccordionCustom } from '@/interface'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { Add, Minus } from 'iconsax-react'

type Props = {
  data: IAccordionCustom[]
}

const AccordionCustom: React.FC<Props> = ({ data }) => {
  return (
    <Accordion
      defaultExpandedKeys={[data?.[0]?.title?.toString()]}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            height: 'auto',
            transition: {
              height: {
                ease: 'linear',
                duration: 0.2
              },
              opacity: {
                easings: 'ease',
                duration: 0.1
              }
            }
          },
          exit: {
            y: -10,
            opacity: 0,
            height: 0,
            transition: {
              height: {
                easings: 'ease',
                duration: 0.2
              },
              opacity: {
                easings: 'ease',
                duration: 0.1
              }
            }
          }
        }
      }}
      className='gap-4 p-0'
      variant='splitted'
      disableIndicatorAnimation
      itemClasses={{
        base: 'group-[.is-splitted]:bg-white/10 group-[.is-splitted]:shadow-none group-[.is-splitted]:px-0 data-[open=true]:rounded-xl data-[open=true]:overflow-hidden',
        content: 'p-4 bg-primary-blue data-[open=true]:text-white pl-6',
        heading: 'data-[open=true]:bg-primary-blue data-[open=true]:overflow-hidden data-[open=true]:rounded-t-4',
        indicator: 'text-black data-[open=true]:text-white',
        title: 'text-sm lg:text-base font-bold data-[open=true]:text-white',
        trigger: 'lg:py-[28px] py-4 px-4 data-[open=true]:bg-white/10 data-[open=true]:rounded-xl'
      }}
    >
      {data?.map((item) => (
        <AccordionItem
          key={item.title}
          aria-label={item.title}
          title={item.title}
          indicator={({ isOpen }) => (isOpen ? <Minus className='size-6 lg:size-[48px]' /> : <Add className='size-6 lg:size-[48px]' />)}
        >
          <ul className='*: list-inside list-disc *:text-base'>{item?.children?.map((item) => <li key={item}>{item}.</li>)}</ul>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default AccordionCustom
