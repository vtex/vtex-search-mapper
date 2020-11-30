import { convertFromBiggyProductsToCatalogApiProducts } from '../index'

const EXTRA_INFO = {
  sc: '1',
  domain: 'https://instoreqa.myvtex.com',
}

describe('VTEX Search Mapper main functions', () => {
  describe('convertFromBiggyProductsToCatalogApiProducts', () => {
    it('with empty products should return empty products', () => {
      expect(
        convertFromBiggyProductsToCatalogApiProducts([], EXTRA_INFO)
      ).toEqual([])
    })

    // it('with product on biggy format with only seller1 should return correct catalog product format', () => {
    //   expect(
    //     convertFromBiggyProductsToCatalogApiProducts([], EXTRA_INFO)
    //   ).toEqual([])
    // })

    // it('with product on biggy format with external seller should return correct catalog product format', () => {
    //   expect(
    //     convertFromBiggyProductsToCatalogApiProducts([], EXTRA_INFO)
    //   ).toEqual([])
    // })

    // it('with multiple products on biggy format should return correct catalog products format', () => {
    //   expect(
    //     convertFromBiggyProductsToCatalogApiProducts([], EXTRA_INFO)
    //   ).toEqual([])
    // })
  })
})
