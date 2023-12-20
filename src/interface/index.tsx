import React from 'react'

export interface BreadcrumbWithUrl {
  title: string
  url?: string
}

export interface TlistBenefit {
  title: string
  desc: { text: JSX.Element }[]
  img: string
  like: number
  isLike: boolean
  id: number
  imageContent?: React.ReactNode
}
