import { ISubContentItem } from '@/interface'
import React from 'react'

const SubContent = ({ title, content, index, className }: ISubContentItem & { index: number; className?: string }) => {
  return (
    <div>
      <p className={`text-white ${className}`}>
        {index + 1}. <span className='underline'>{title}:</span>
      </p>
      <ul className={`ml-4 list-inside list-disc space-y-2 text-white ${className}`}>{content?.map((item, index) => <li key={index}>{item}</li>)}</ul>
    </div>
  )
}

export default SubContent
