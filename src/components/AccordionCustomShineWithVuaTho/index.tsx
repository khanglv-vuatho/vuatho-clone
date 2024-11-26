'use client'

import SubContent from '@/app/[locale]/(mainLayout)/toa-sang-cung-vua-tho/(sections)/SubContent'
import { ICondition, ISubContentItem } from '@/interface'
import { Accordion, AccordionItem } from '@nextui-org/react'
import React from 'react'

const AccordionCustomShineWithVuaTho = ({ data }: { data: ICondition[] }) => {
  return (
    <Accordion
      variant='splitted'
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
      itemClasses={{
        base: 'group-[.is-splitted]:bg-white group-[.is-splitted]:shadow-none group-[.is-splitted]:px-0 data-[open=true]:rounded-xl data-[open=true]:overflow-hidden',
        content: 'p-4 bg-[#0042AB] data-[open=true]:text-white pl-6',
        heading: 'data-[open=true]:bg-[#0042AB] data-[open=true]:overflow-hidden data-[open=true]:rounded-t-4',
        indicator: 'text-black data-[open=true]:text-white',
        title: 'text-sm lg:text-base font-bold data-[open=true]:text-white',
        trigger: 'lg:py-[28px] py-4 px-4 data-[open=true]:bg-white data-[open=true]:rounded-xl'
      }}
    >
      {data.map((item, index) => (
        <AccordionItem key={index} aria-label={item.title} title={<Title title={item.title} index={index} />}>
          {item.type === 'subContent' ? (
            item?.content?.map((item, index) => <SubContent key={index} {...(item as ISubContentItem)} index={index} />)
          ) : (
            <ul className='ml-2 list-inside list-disc space-y-2 '>
              {item.content.map((item, index) => {
                if (typeof item === 'string') return <li key={index}>{item}</li>
              })}
            </ul>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  )
}

const Title = ({ title, index }: { title: string; index: number }) => {
  return (
    <div className='flex items-center gap-4 font-bold uppercase text-primary-blue'>
      <p className='text-2xl font-extrabold'>{index + 1} </p>
      <p className='text-lg'>{title}</p>
    </div>
  )
}

export default AccordionCustomShineWithVuaTho
