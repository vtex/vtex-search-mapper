import { convertFromBiggyProductsToCatalogApiProducts } from '../index'
import {
  biggyExternalSellerProduct,
  biggySeller1Product,
} from './mocks/biggyProduct'
import {
  catalogExternalSellerProduct as expectedCatalogExternalSellerProduct,
  catalogSeller1Product as expectedCatalogSeller1Product,
} from './mocks/catalogProduct'

const EXTRA_INFO = {
  sc: '1',
  domain: 'https://cea.myvtex.com',
}

describe('VTEX Search Mapper main functions', () => {
  describe('convertFromBiggyProductsToCatalogApiProducts', () => {
    it('with empty products should return empty products', () => {
      expect(
        convertFromBiggyProductsToCatalogApiProducts([], EXTRA_INFO)
      ).toEqual([])
    })

    it('with product on biggy format with only seller 1 should return correct catalog product format', () => {
      const {
        items: expectedItems,
        ...expectedCatalogSeller1ProductBase
      } = expectedCatalogSeller1Product

      const [
        { sellers: expectedSellersSku1, ...expectedSku1Base },
        { sellers: expectedSellersSku2, ...expectedSku2Base },
        { sellers: expectedSellersSku3, ...expectedSku3Base },
        { sellers: expectedSellersSku4, ...expectedSku4Base },
        { sellers: expectedSellersSku5, ...expectedSku5Base },
      ] = expectedItems

      const newCatalogSeller1Products = convertFromBiggyProductsToCatalogApiProducts(
        [biggySeller1Product],
        EXTRA_INFO
      )

      const [newCatalogSeller1Product] = newCatalogSeller1Products
      const {
        items,
        ...newCatalogSeller1ProductBase
      } = newCatalogSeller1Product

      const [
        { sellers: sellersSku1, ...sku1Base },
        { sellers: sellersSku2, ...sku2Base },
        { sellers: sellersSku3, ...sku3Base },
        { sellers: sellersSku4, ...sku4Base },
        { sellers: sellersSku5, ...sku5Base },
      ] = items

      expect(newCatalogSeller1ProductBase).toEqual(
        expectedCatalogSeller1ProductBase
      )
      expect(sku1Base).toEqual(expectedSku1Base)
      expect(sku2Base).toEqual(expectedSku2Base)
      expect(sku3Base).toEqual(expectedSku3Base)
      expect(sku4Base).toEqual(expectedSku4Base)
      expect(sku5Base).toEqual(expectedSku5Base)

      expect(sellersSku1).toEqual(expectedSellersSku1)
      expect(sellersSku2).toEqual(expectedSellersSku2)
      expect(sellersSku3).toEqual(expectedSellersSku3)
      expect(sellersSku4).toEqual(expectedSellersSku4)
      expect(sellersSku5).toEqual(expectedSellersSku5)
    })

    it('with product on biggy format with external seller should return correct catalog product format', () => {
      const {
        items: expectedItems,
        ...expectedCatalogExternalSellerProductBase
      } = expectedCatalogExternalSellerProduct

      const [
        { sellers: expectedSellersSku1, ...expectedSku1Base },
      ] = expectedItems

      const newCatalogExternalSellerProducts = convertFromBiggyProductsToCatalogApiProducts(
        [biggyExternalSellerProduct],
        EXTRA_INFO
      )

      const [newCatalogExternalSellerProduct] = newCatalogExternalSellerProducts
      const {
        items,
        ...newCatalogExternalSellerProductBase
      } = newCatalogExternalSellerProduct

      const [{ sellers: sellersSku1, ...sku1Base }] = items

      expect(newCatalogExternalSellerProductBase).toEqual(
        expectedCatalogExternalSellerProductBase
      )
      expect(sku1Base).toEqual(expectedSku1Base)

      expect(sellersSku1).toEqual(expectedSellersSku1)
    })

    it('with multiple products on biggy format should return correct catalog products format', () => {
      expect(
        convertFromBiggyProductsToCatalogApiProducts(
          [biggyExternalSellerProduct, biggySeller1Product],
          EXTRA_INFO
        )
      ).toEqual([
        expectedCatalogExternalSellerProduct,
        expectedCatalogSeller1Product,
      ])
    })
  })
})
