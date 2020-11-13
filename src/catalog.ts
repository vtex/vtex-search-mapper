/* eslint-disable @typescript-eslint/no-explicit-any */
interface Specification {
  Name: string
  Values: Array<{
    Id: string
    Position: number
    Value: string
  }>
  Position: number
  IsOnProductDetails: boolean
  FieldId: string
}

interface CatalogApiSeller {
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

interface CatalogApiSku {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
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
  Videos: []
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
  completeSpecifications: Specification[]
  description: string
  items: CatalogApiSku[]
}
