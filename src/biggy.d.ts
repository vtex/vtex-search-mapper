/* eslint-disable @typescript-eslint/no-explicit-any */

interface BiggySearchSku {
  id: string
  idWithSplit: string
  reference: string
  policies: Array<Record<string, any>>
  attributes: Array<Record<string, any>>
  sellers: Array<Record<string, any>>
}

interface BiggySearchProduct {
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
  clusterHighlights: Record<string, any>
  stickers: Array<Record<string, any>>
  id: string
  categories: Array<Record<string, any>>
  stock: number
  brand: string
  availableTradePolicies: Array<Record<string, any>>
  timestamp: number
  categoryTrees: Array<Record<string, any>>
  images: Array<Record<string, any>>
  product: string
  oldPrice: number
  locationAttributes: Array<Record<string, any>>
  tax: number
  productSpecifications: Array<Record<string, any>>
  url: string
  measurementUnit: string
  storeSplitAttribute: string
  categoryIds: Array<Record<string, any>>
  textAttributes: Array<Record<string, any>>
  brandId: string
  installment: Record<string, any>
  name: string
  boost: Record<string, any>
  specificationGroups: string
  extraInfo: Record<string, any>
  oldPriceText: string
  priceText: string
}

interface BiggySearchResult {
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
