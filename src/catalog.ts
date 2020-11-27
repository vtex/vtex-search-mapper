/* eslint-disable @typescript-eslint/no-explicit-any */

interface SkuSpecification {
  field: {
    id: number
    name: string
    isActive: boolean
    position: number
    type: string
  }
  values: [
    {
      id: string
      name: string
      position: number
    }
  ]
}

export interface CatalogApiSeller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: {
    DeliverySlaSamplesPerRegion: Record<string, any>
    Installments: Array<Record<string, any>>
    DiscountHighLight: Array<Record<string, any>>
    GiftSkuIds: Array<Record<string, any>>
    Teasers: Array<Record<string, any>>
    BuyTogether: Array<Record<string, any>>
    ItemMetadataAttachment: Array<Record<string, any>>
    Price: number
    ListPrice: number
    PriceWithoutDiscount: number
    RewardValue: number
    PriceValidUntil: string
    AvailableQuantity: number
    Tax: number
    DeliverySlaSamples: [
      {
        DeliverySlaPerTypes: Record<string, any>
        Region: string | null
      }
    ]
    GetInfoErrorMessage: string | null
    CacheVersionUsedToCallCheckout: string
    PaymentOptions: Record<string, any>
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
    imageLabel: string
    imageTag: string
    imageUrl: string
    imageText: string
    imageLastModified: string
  }>
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
