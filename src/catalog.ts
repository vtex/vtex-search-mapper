/* eslint-disable @typescript-eslint/no-explicit-any */

interface SkuSpecification {
  field: {
    id: number
    name: string
    isActive: boolean
    position: number
    type: string
  }
  values: Array<{
    id: string
    name: string
    position: number
  }>
}

export interface CatalogApiInstallment {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}

export interface CatalogApiSeller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: {
    DeliverySlaSamplesPerRegion: Record<string, any>
    Installments: CatalogApiInstallment[]
    DiscountHighLight: Array<Record<string, any>>
    GiftSkuIds: Array<Record<string, any>>
    Teasers: Array<Record<string, any>>
    BuyTogether: Array<Record<string, any>>
    ItemMetadataAttachment: Array<Record<string, any>>
    Price: number | null
    ListPrice: number | null
    PriceWithoutDiscount: number | null
    RewardValue: number
    PriceValidUntil: string | null
    AvailableQuantity: number
    Tax: number
    DeliverySlaSamples: Array<{
      DeliverySlaPerTypes: Record<string, any>
      Region: string | null
    }>
    GetInfoErrorMessage: string | null
    CacheVersionUsedToCallCheckout?: string
    PaymentOptions: Record<string, any> | null
  }
}

export interface CatalogApiSku {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  referenceId: Array<{ Key: string; Value: string }>
  ean: string
  measurementUnit: string
  unitMultiplier: number
  modalType: string | null
  isKit: boolean
  images: Array<{
    imageId: string
    imageLabel: string | null
    imageTag: string | null
    imageUrl: string
    imageText: string
    imageLastModified: string
  }>
  variations: string[]
  sellers: CatalogApiSeller[]
  Videos: string[]
  estimatedDateArrival: null
}

export interface CatalogApiProduct {
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: string | null
  linkText: string
  productReference: string
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: string
  clusterHighlights: Record<string, string>
  productClusters: Record<string, string>
  searchableClusters: Record<string, string>
  categories: string[]
  categoriesIds: string[]
  link: string
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  skuSpecifications: SkuSpecification[]
  description: string
  items: CatalogApiSku[]
}
