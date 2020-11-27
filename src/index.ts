import {
  BiggySearchProduct,
  BiggySearchResult,
  BiggySearchSku,
  BiggySkuSeller,
  BiggySearchInstallment,
} from './biggy'
import {
  CatalogApiProduct,
  CatalogApiSku,
  CatalogApiSeller,
  CatalogApiInstallment,
} from './catalog'
import { last, getDateStringFromTimestamp, mergeProps, isNil } from './utils'

interface ExtraBiggyToCatalogInfo {
  sc: string
  domain: string
}

type PriceKey = 'price' | 'oldPrice' | 'discount' | 'stock'
const PRICE_KEYS: PriceKey[] = ['price', 'oldPrice', 'discount', 'stock']

function convertFromBiggyInstallmentsToCatalogApiInstallments(
  installment?: BiggySearchInstallment
): CatalogApiInstallment[] {
  if (!installment) {
    return []
  }

  const catalogInstallments: CatalogApiInstallment[] = []

  const totalValue = installment.value * installment.count

  for (
    let installmentNum = 1;
    installmentNum <= installment.count;
    installmentNum++
  ) {
    catalogInstallments.push({
      Value: totalValue / installmentNum,
      InterestRate: 0, // TODO: Biggy still don't have this
      TotalValuePlusInterestRate: totalValue / installmentNum,
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
    PriceWithoutDiscount: !isNil(seller?.price)
      ? (seller?.price ?? 0) + (seller?.discount ?? 0)
      : null,
  }

  return {
    sellerId: seller.id,
    sellerName: seller.name,
    addToCartLink: `${domain}/checkout/cart/add?sku=${sku.id}&qty=1&seller=${seller.id}&sc=${sc}&price=${pricesProps.Price}`,
    sellerDefault: true,
    commertialOffer: {
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
      PaymentOptions: {
        // TODO: Biggy still don't have this
        installmentOptions: [],
        paymentSystems: [],
        payments: [],
        giftCards: [],
        giftCardMessages: [],
        availableAccounts: [],
        availableTokens: [],
      },
      Installments: convertFromBiggyInstallmentsToCatalogApiInstallments(
        sku?.installment
      ),
    },
  }
}

function convertFromBiggySkuToCatalogApiSellers(
  sku: BiggySearchSku,
  extraInfo: ExtraBiggyToCatalogInfo
): CatalogApiSeller[] {
  const { sellers } = sku

  let defaultSellerIndex = 0

  const newSellers = sellers.map((rawSeller, index) => {
    const seller: BiggySkuSeller = {
      ...rawSeller,
      ...mergeProps<BiggySkuSeller, BiggySearchSku, PriceKey>(rawSeller, sku, {
        keys: PRICE_KEYS,
        defaultValue: 0,
      }),
    }

    if (seller.id === '1') {
      defaultSellerIndex = index
    }

    return convertFromBiggySellerAndSkuToCatalogApiSeller(
      seller,
      sku,
      extraInfo
    )
  })

  newSellers[defaultSellerIndex].sellerDefault = true

  return newSellers
}

function convertFromBiggyProductImagesToCatalogApiImages(
  product: BiggySearchProduct
) {
  return product.images.map((img) => ({
    imageId: '', // TODO: Biggy still don't have this
    imageLabel: img.name,
    imageTag: '', // TODO: Biggy still don't have this
    imageUrl: img.value,
    imageText: img.name,
    imageLastModified: '', // TODO: Biggy still don't have this
  }))
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

    // Pegar dados em sku.attributes
    // Cor: ['Azul'],
    // Tamanho: ['1'],
    // variations: ['Cor', 'Tamanho'],

    sellers: convertFromBiggySkuToCatalogApiSellers(sku, extraInfo),
  }
}

function convertFromBiggyProductToCatalogApiItems(
  product: BiggySearchProduct,
  extraInfo: ExtraBiggyToCatalogInfo
): CatalogApiSku[] {
  const { skus } = product

  return skus.map((sku: BiggySearchSku) =>
    convertFromBiggySkuAndProductToCatalogApiItem(sku, product, extraInfo)
  )
}

export function convertFromBiggyProductToCatalogApiProduct(
  product: BiggySearchProduct,
  extraInfo: ExtraBiggyToCatalogInfo
): CatalogApiProduct {
  const { domain = '' } = extraInfo

  return {
    productId: product.id,
    productName: product.name,
    brand: product.brand,
    brandId: parseInt(product.brandId, 10),
    brandImageUrl: null, // TODO: Biggy still don't have this
    linkText: product.link,
    productReference: product.reference,
    categoryId: last(product.categoryIds, ''),
    productTitle: product.name,
    description: product.description,
    metaTagDescription: product.description,
    releaseDate: getDateStringFromTimestamp(product.release),
    clusterHighlights: product.clusterHighlights,
    productClusters: {}, // productclusternames em textAttributes
    searchableClusters: {},
    categories: [], // category-1 e category-2 em textAttributes e ir acumulando: ['/Moda Masculina/Camisas/', '/Moda Masculina/']
    categoriesIds: [], // usar categoryIds e ir acumulando: ['/1000083/1000093/', '/1000083/']
    link: `${domain}${product.url}`,

    // from: ...JSON.parse(specificationGroups)
    // Especificações: ['Modelagem', 'Marca', 'Cor', 'Material'],
    // Especificações2: ['Ocasião', 'Mundo', 'Destaque', 'Pirâmide', 'Tendência'],

    // Pegar as keys em product.productSpecifications e depois ir em textAttributes filtrando por labelKey e pegando o labelValue
    // Modelagem: ['Manga Longa', 'Comfort'],
    // Marca: ['Angelo Lítrico'],
    // Cor: ['Azul'],
    // Material: ['Algodao', 'Poliéster'],
    // Ocasião: ['Trabalho'],
    // Mundo: ['Business'],
    // Destaque: ['Padrao'],
    // Pirâmide: ['A'],
    // Tendência: ['Bolso'],

    allSpecifications: product.productSpecifications,
    allSpecificationsGroups: [], // JSON.parse(specificationGroups) keys
    skuSpecifications: [],

    items: convertFromBiggyProductToCatalogApiItems(product, extraInfo),
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
