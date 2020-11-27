/* eslint-disable @typescript-eslint/no-explicit-any */

export interface BiggySkuSeller {
  oldPrice?: number
  price?: number
  name: string
  tax: number
  id: string
  stock?: number
}

export interface BiggySkuPolicy {
  id: string
  sellers: BiggySkuSeller[]
}

export interface BiggySearchSku {
  id: string
  idWithSplit: string
  reference: string
  policies: BiggySkuPolicy[]
  attributes: Array<{
    value: string
    key: string
  }>
  sellers: BiggySkuSeller[]
}

export interface BiggySearchProduct {
  skus: BiggySearchSku[]
  unitMultiplier: number
  year: number
  extraData: Array<Record<string, any>>
  release: number
  link: string
  wear: number
  discount: number
  description: string
  reference: string
  showIfNotAvailable: boolean
  price: number
  customSort: number
  clusterHighlights: Record<string, string>
  stickers: Array<Record<string, string>>
  id: string
  categories: string[]
  stock: number
  brand: string
  availableTradePolicies: string[]
  timestamp: number
  categoryTrees: Array<{
    categoryNames: string[]
    categoryIds: string[]
  }>
  images: Array<{ name: string; value: string }>
  product: string
  oldPrice: number
  locationAttributes: Array<Record<string, any>>
  tax: number
  productSpecifications: string[]
  url: string
  measurementUnit: string
  storeSplitAttribute: string
  categoryIds: string[]
  textAttributes: Array<{
    valueId: string
    isFilter: boolean
    labelValue: string
    labelKey: string
    value: string
    key: string
  }>
  brandId: string
  installment: {
    interest: boolean
    count: number
    value: number
    valueText: string
  }
  name: string
  boost: {
    newness: number
    image: number
    revenue: number
    discount: number
    click: number
    availableSpecsCount: number
    promotion: number
    order: number
  }
  specificationGroups: string
  extraInfo: Record<string, any>
  oldPriceText: string
  priceText: string
}

export interface BiggySearchResult {
  total: number
  products: BiggySearchProduct[]
  pagination: {
    count: number
    current: {
      index: number
      proxyUrl: string
    }
    before: []
    after: Array<{
      index: number
      proxyUrl: string
    }>
    perPage: number
    next: {
      index: number
      proxyUrl: string
    }
    previous: { index: number }
    first: { index: number }
    last: {
      index: number
      proxyUrl: string
    }
  }
  options: {
    sorts: Array<{
      field: string
      order: string
      active: boolean
      proxyUrl: string
    }>
    counts: Array<{
      count: number
      active?: boolean
      proxyUrl: string
    }>
  }
  query: string
  operator: string
  fuzzy: string
  correction: { misspelled: boolean }
}
