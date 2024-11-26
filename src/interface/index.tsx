import React from 'react'

export interface IBreadcrumbWithUrl {
  title: string
  url?: string
}

export interface IMostViewed {
  isHidden?: boolean
  dataDefault: any
  onLoading: boolean
  onFetching: boolean
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

export interface IMeta {
  limit: number
  page: number
  totalPages: number
  total: number
}

export interface IItemClothe {
  title: string
  thumb: string
  currency: string
}

export interface IItemClothes {
  title: string
  price: string | any
  thumb: string
  version: number
  currency: string
  isInStock: boolean
  package: IItemClothe[]
  uuid: string
}

export interface IUniform {
  info: { name: string; phone: { phone_code: string; phone_number: string } }
  list: IItemClothes[]
}

export interface IAccordionCustom {
  title: string
  children: string[]
}

export type TContentItem = string | ISubContentItem

export interface ISubContentItem {
  title: string
  content: string[]
}

export interface ICondition {
  title: string
  type?: 'subContent' // Tùy chọn, chỉ có khi điều kiện có cấu trúc con
  content: TContentItem[]
}

interface Attribute {
  name: {
    en: string
    vi: string
  }
  type: string
  quantity?: number
  uuid: string
  selected: string
  values: string[]
}

interface Image {
  thumb: string
}

interface Package {
  uuid: string
  title: string
  price: number
  quantity: number
  currency: string
  attributes: Attribute[]
  thumb: string
  images: Image[]
}

export interface IHistoryItem {
  uuid: string
  createdAt: string
  status: number
  location: string
  phone: string
  typeOfPayment: string
  title: string
  price: number
  currency: string
  thumb: string
  package: Package[]
  isInStock: boolean
}
