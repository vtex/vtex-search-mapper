/* eslint-disable @typescript-eslint/no-explicit-any */
interface Specification {
  Name: string
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
  sellers: Array<Record<string, any>>
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
  clusterHighlights: Record<string, any>
  productClusters: Record<string, any>
  searchableClusters: Record<string, any>
  categories: string[]
  categoriesIds: string[]
  link: string
  completeSpecifications: Specification[]
  description: string
  items: CatalogApiSku[]
}
