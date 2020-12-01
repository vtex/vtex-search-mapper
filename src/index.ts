import {
  BiggySearchProduct,
  BiggySearchResult,
  BiggySearchSku,
  BiggySkuSeller,
  BiggySearchInstallment,
  BiggySkuAttribute,
  BiggyProductTextAttribute,
} from './biggy'
import {
  CatalogApiProduct,
  CatalogApiSku,
  CatalogApiSeller,
  CatalogApiInstallment,
} from './catalog'
import {
  last,
  getDateStringFromTimestamp,
  mergeProps,
  isNil,
  uniqById,
  castToTwoDecimalFloat,
} from './utils'

interface ExtraBiggyToCatalogInfo {
  sc: string
  domain: string
}

type PriceKey = 'price' | 'oldPrice' | 'stock'
const PRICE_KEYS: PriceKey[] = ['price', 'oldPrice', 'stock']

function convertFromBiggyInstallmentsToCatalogApiInstallments(
  totalValue: number,
  installment?: BiggySearchInstallment
): CatalogApiInstallment[] {
  if (!totalValue || !installment) {
    return []
  }

  const catalogInstallments: CatalogApiInstallment[] = []

  for (
    let installmentNum = 1;
    installmentNum <= installment.count;
    installmentNum++
  ) {
    catalogInstallments.push({
      Value: castToTwoDecimalFloat(totalValue / installmentNum),
      InterestRate: 0, // TODO: Biggy still don't have this
      TotalValuePlusInterestRate: totalValue,
      NumberOfInstallments: installmentNum,
      PaymentSystemName: '', // TODO: Biggy still don't have this
      PaymentSystemGroupName: '', // TODO: Biggy still don't have this
      Name: '', // TODO: Biggy still don't have this
    })
  }

  return catalogInstallments
}

function convertFromBiggySellerAndSkuToCatalogApiSeller(
  seller: BiggySkuSeller,
  sku: BiggySearchSku,
  { sc, domain = '' }: ExtraBiggyToCatalogInfo
): CatalogApiSeller {
  const pricesProps = {
    Price: seller.price ?? null,
    ListPrice: seller.oldPrice ?? null,
    PriceWithoutDiscount: seller.price ?? null, // TODO: Biggy still don't have this
  }

  const intPrice = Math.round((pricesProps.Price ?? 0) * 100)

  return {
    sellerId: seller.id,
    sellerName: seller.name,
    addToCartLink: `${domain}/checkout/cart/add?sku=${sku.id}&qty=1&seller=${seller.id}&sc=${sc}&price=${intPrice}`,
    sellerDefault: false,
    commertialOffer: {
      CacheVersionUsedToCallCheckout: '', // TODO: Biggy still don't have this
      DeliverySlaSamplesPerRegion: {}, // TODO: Biggy still don't have this
      DiscountHighLight: [], // TODO: Biggy still don't have this
      GiftSkuIds: [], // TODO: Biggy still don't have this
      Teasers: [], // TODO: Biggy still don't have this
      BuyTogether: [], // TODO: Biggy still don't have this
      ItemMetadataAttachment: [], // TODO: Biggy still don't have this
      RewardValue: 0, // TODO: Biggy still don't have this
      PriceValidUntil: null, // TODO: Biggy still don't have this
      DeliverySlaSamples: [], // TODO: Biggy still don't have this
      GetInfoErrorMessage: null,
      Price: pricesProps.Price,
      ListPrice: pricesProps.ListPrice,
      PriceWithoutDiscount: pricesProps.PriceWithoutDiscount,
      AvailableQuantity: seller.stock ?? 0,
      Tax: seller.tax,
      PaymentOptions: null, // TODO: Biggy still don't have this
      Installments: convertFromBiggyInstallmentsToCatalogApiInstallments(
        pricesProps.Price ?? 0,
        sku?.installment
      ),
    },
  }
}

function convertFromBiggySkuToCatalogApiSellers(
  sku: BiggySearchSku,
  extraInfo: ExtraBiggyToCatalogInfo
): CatalogApiSeller[] {
  const { sellers, policies } = sku
  const { sc } = extraInfo

  let defaultSellerIndex = 0
  let seller1WithStockIndex: number | undefined

  const currentPolicy = policies.find((policy) => policy.id === sc)
  const currentPolicySellers = currentPolicy ? currentPolicy.sellers : []
  const skuSellers = uniqById([...sellers, ...currentPolicySellers])

  const newSellers = skuSellers.map((rawSeller, index) => {
    const seller: BiggySkuSeller = {
      ...rawSeller,
      ...mergeProps<BiggySkuSeller, BiggySearchSku, PriceKey>(rawSeller, sku, {
        keys: PRICE_KEYS,
        defaultValue: 0,
      }),
    }

    if (seller.stock) {
      defaultSellerIndex = index
      if (seller.id === '1') {
        seller1WithStockIndex = index
      }
    }

    return convertFromBiggySellerAndSkuToCatalogApiSeller(
      seller,
      sku,
      extraInfo
    )
  })

  defaultSellerIndex = seller1WithStockIndex ?? defaultSellerIndex

  if (newSellers[defaultSellerIndex]) {
    newSellers[defaultSellerIndex].sellerDefault = true
  }

  return newSellers
}

function convertFromBiggyProductImagesToCatalogApiImages(
  product: BiggySearchProduct
) {
  return product.images.map((img) => ({
    imageId: '', // TODO: Biggy still don't have this
    imageLabel: img.name ?? null,
    imageTag: '', // TODO: Biggy still don't have this
    imageUrl: img.value,
    imageText: img.name ?? '',
    imageLastModified: '', // TODO: Biggy still don't have this
  }))
}

type CatalogSkuVariations = { variations: string[] } & Record<string, string[]>

function convertFromBiggySkuAttributesToVariations(
  attributes: BiggySkuAttribute[]
): CatalogSkuVariations {
  const result: CatalogSkuVariations = { variations: [] }

  attributes.forEach((attribute) => {
    result.variations.push(attribute.key)
    result[attribute.key] = [attribute.value]
  })

  return result
}

function convertFromBiggySkuAndProductToCatalogApiItem(
  rawSku: BiggySearchSku,
  product: BiggySearchProduct,
  extraInfo: ExtraBiggyToCatalogInfo
): CatalogApiSku {
  const sku: BiggySearchSku = {
    ...rawSku,
    ...mergeProps<BiggySearchSku, BiggySearchProduct, PriceKey>(
      rawSku,
      product,
      {
        keys: PRICE_KEYS,
        defaultValue: 0,
      }
    ),
    installment: rawSku?.installment ?? product.installment,
  }

  const {
    variations,
    ...catalogSkuVariations
  } = convertFromBiggySkuAttributesToVariations(sku.attributes) as {
    variations: string[]
  } // fooling typescript so it doesn't throw error

  return {
    itemId: sku.id,
    name: '', // TODO: Biggy still don't have this
    nameComplete: '', // TODO: Biggy still don't have this (product name + sku name)
    complementName: '', // TODO: Biggy still don't have this
    ean: '',
    referenceId: [{ Key: 'RefId', Value: sku.reference }],
    measurementUnit: product.measurementUnit,
    unitMultiplier: product.unitMultiplier,
    modalType: null,
    isKit: false,
    Videos: [], // Todo: Biggy still don't have this
    estimatedDateArrival: null, // TODO: Biggy still don't have this}
    images: convertFromBiggyProductImagesToCatalogApiImages(product), // TODO: Biggy still don't have this (using from product for now)
    sellers: convertFromBiggySkuToCatalogApiSellers(sku, extraInfo),
    variations,
    ...catalogSkuVariations,
  }
}

function convertFromBiggyProductToCatalogApiItems(
  product: BiggySearchProduct,
  extraInfo: ExtraBiggyToCatalogInfo
): CatalogApiSku[] {
  const { skus } = product

  // Catalog have items list ordered by sku ids, but biggy not necessarily
  skus.sort((a: BiggySearchSku, b: BiggySearchSku) => (a.id < b.id ? -1 : 1))

  return skus.map((sku: BiggySearchSku) =>
    convertFromBiggySkuAndProductToCatalogApiItem(sku, product, extraInfo)
  )
}

type CatalogProductSpecificationsBase = {
  allSpecificationsGroups: string[]
}
type CatalogProductSpecifications = CatalogProductSpecificationsBase &
  Record<string, string[]>

function convertFromBiggySpecificationsToCatalogApiSpecifications(
  specificationGroups: string,
  textAttributes: BiggyProductTextAttribute[]
): CatalogProductSpecifications {
  const parsedSpecifications = JSON.parse(specificationGroups)
  const allSpecificationsGroups = Object.keys(parsedSpecifications).reverse()
  const result: CatalogProductSpecifications = {
    ...parsedSpecifications,
    allSpecificationsGroups,
  }

  const productSpecifications: string[] = []
  const specificationKeyMap: Record<string, boolean> = {}
  const specificationKeyValueMap: Record<string, Record<string, boolean>> = {}

  allSpecificationsGroups.forEach((specificationsGroup: string) => {
    parsedSpecifications[specificationsGroup].forEach(
      (specificationKey: string) => {
        specificationKeyMap[specificationKey] = true
        specificationKeyValueMap[specificationKey] = {}
        productSpecifications.push(specificationKey)
      }
    )
  })

  textAttributes.forEach((textAttribute) => {
    if (
      !textAttribute.labelKey ||
      !specificationKeyMap[textAttribute.labelKey]
    ) {
      return
    }

    if (
      specificationKeyValueMap[textAttribute.labelKey][textAttribute.labelValue]
    ) {
      return
    }

    specificationKeyValueMap[textAttribute.labelKey][
      textAttribute.labelValue
    ] = true

    if (result[textAttribute.labelKey]) {
      result[textAttribute.labelKey].push(textAttribute.labelValue)
    } else {
      result[textAttribute.labelKey] = [textAttribute.labelValue]
    }
  })

  return result
}

function convertFromBiggyCategoriesToCatalogCategories(
  biggyCategories: string[]
): string[] {
  const categoryList: string[] = []
  const newCategories: string[] = []

  biggyCategories.forEach((category) => {
    categoryList.push(category)
    newCategories.push(`/${categoryList.join('/')}/`)
  })

  return newCategories.reverse()
}

function convertFromBiggyTextAttributesToCatalogClustersAndCategories(
  textAttributes: BiggyProductTextAttribute[]
) {
  const productClusters: Record<string, string> = {}
  const biggyCategories: string[] = []

  textAttributes.forEach((textAttribute) => {
    if (
      textAttribute.key === 'productclusternames' &&
      (textAttribute.valueId || textAttribute.id)
    ) {
      const valueId = textAttribute.valueId ?? textAttribute.id ?? ''

      productClusters[valueId] = textAttribute.labelValue
    } else if (textAttribute.key.startsWith('category-')) {
      biggyCategories.push(textAttribute.labelValue)
    }
  })

  return {
    productClusters,
    categories: convertFromBiggyCategoriesToCatalogCategories(biggyCategories),
  }
}

export function convertFromBiggyProductToCatalogApiProduct(
  product: BiggySearchProduct,
  extraInfo: ExtraBiggyToCatalogInfo
): CatalogApiProduct {
  const { domain = '' } = extraInfo

  const {
    allSpecificationsGroups,
    ...catalogProductSpecifications
  } = convertFromBiggySpecificationsToCatalogApiSpecifications(
    product.specificationGroups,
    product.textAttributes
  ) as CatalogProductSpecificationsBase // fooling typescript so it doesn't throw error

  const {
    productClusters,
    categories,
  } = convertFromBiggyTextAttributesToCatalogClustersAndCategories(
    product.textAttributes
  )

  return {
    productId: product.id,
    productName: product.name,
    brand: product.brand,
    brandId: parseInt(product.brandId, 10),
    brandImageUrl: null, // TODO: Biggy still don't have this
    linkText: product.link,
    productReference: product.reference ?? product.skus[0].reference,
    categoryId: last(product.categoryIds, ''),
    productTitle: product.name,
    description: product.description,
    metaTagDescription: product.description,
    releaseDate: getDateStringFromTimestamp(product.release),
    clusterHighlights: product.clusterHighlights,
    link: `${domain}${product.url}`,
    allSpecifications: product.productSpecifications,
    searchableClusters: {}, // TODO: Biggy still don't have this
    skuSpecifications: [], // TODO: Biggy still don't have this
    categoriesIds: convertFromBiggyCategoriesToCatalogCategories(
      product.categoryIds
    ),
    items: convertFromBiggyProductToCatalogApiItems(product, extraInfo),
    productClusters,
    categories,
    allSpecificationsGroups,
    ...catalogProductSpecifications,
  }
}

export function convertFromBiggyProductsToCatalogApiProducts(
  products: BiggySearchProduct[],
  extraInfo: ExtraBiggyToCatalogInfo
): CatalogApiProduct[] {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return []
  }

  return products.map((product: BiggySearchProduct) =>
    convertFromBiggyProductToCatalogApiProduct(product, extraInfo)
  )
}

export { BiggySearchProduct, BiggySearchResult, CatalogApiProduct }
