import { BiggySearchProduct, BiggySearchResult, BiggySearchSku } from './biggy'
import { CatalogApiProduct, CatalogApiSku } from './catalog'
import { last, getDateStringFromTimestamp } from './utils'

function biggyProductBaseInfoToCatalog(
  product: BiggySearchProduct
): CatalogApiProduct {
  return {
    productId: product.id,
    productName: product.name,
    brand: product.brand,
    brandId: parseInt(product.brandId, 10),
    brandImageUrl: null, // TODO: Check this info on biggy
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
    link: product.url, // TODO: breaking change since it doesn't contain the domain on the url

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
    items: [], // get from product.skus
    skuSpecifications: [],
  }
}

function convertFromBiggySkuToCatalogApiItem(
  sku: BiggySearchSku
): CatalogApiSku {
  return {}
}

function convertFromBiggyProductToCatalogApiItems(
  product: BiggySearchProduct
): CatalogApiSku[] {
  const { skus } = product

  return skus.map((sku) => convertFromBiggySkuToCatalogApiItem(sku))
}

export function convertFromBiggyProductToCatalogApiProduct(
  product: BiggySearchProduct
): CatalogApiProduct {
  return {
    ...biggyProductBaseInfoToCatalog(product),
    items: convertFromBiggyProductToCatalogApiItems(product),
  }
}

export function convertFromBiggyProductsToCatalogApiProducts(
  products: BiggySearchProduct[]
): CatalogApiProduct[] {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return []
  }

  return products.map((product: BiggySearchProduct) =>
    convertFromBiggyProductToCatalogApiProduct(product)
  )
}

export { BiggySearchProduct, BiggySearchResult, CatalogApiProduct }
