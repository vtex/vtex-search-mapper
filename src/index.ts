import { BiggySearchProduct, BiggySearchResult } from './biggy'
import { CatalogApiProduct } from './catalog'

export function convertFromBiggyProductsToCatalogApiProducts(
  _products: BiggySearchProduct[]
): CatalogApiProduct[] {
  const newProducts: CatalogApiProduct[] = []

  return newProducts
}

export { BiggySearchProduct, BiggySearchResult, CatalogApiProduct }
