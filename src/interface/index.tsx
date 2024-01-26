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
