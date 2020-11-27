import { getDateStringFromTimestamp, last, mergeProps, isNil } from '../utils'

describe('Utils', () => {
  describe('getDateStringFromTimestamp', () => {
    it('passing empty value should return empty string', () => {
      expect(getDateStringFromTimestamp(0)).toEqual('')
    })

    it('passing valid value should return formatted string', () => {
      expect(getDateStringFromTimestamp(1435449600000)).toEqual(
        '2015-06-28T00:00:00'
      )
    })
  })

  describe('last', () => {
    it('should return default value on empty array', () => {
      expect(last([], '')).toEqual('')
    })

    it('should return last value on normal array', () => {
      expect(last(['a', 'b', 'c'], '')).toEqual('c')
    })
  })

  describe('mergeProps', () => {
    it('should return empty props on empty values', () => {
      const props1 = {}
      const props2 = {}
      const keys: string[] = []
      const defaultValue = 0
      const expectedProps = {}

      const finalProps = mergeProps(props1, props2, { keys, defaultValue })

      expect(finalProps).toEqual(expectedProps)
    })

    it('should return default value on empty props but not empty keys', () => {
      const props1 = {}
      const props2 = {}
      const keys = ['a', 'b']
      const defaultValue = 0
      const expectedProps = { a: 0, b: 0 }

      const finalProps = mergeProps(props1, props2, { keys, defaultValue })

      expect(finalProps).toEqual(expectedProps)
    })

    it('should return merged props (first try props1 and then props2) with valid values', () => {
      const props1 = { a: 1, b: 0, c: 10 }
      const props2 = { a: 0, b: 2, d: 20 }

      const keys = ['a', 'b']
      const defaultValue = 0
      const expectedProps = { a: 1, b: 2 }

      const finalProps = mergeProps(props1, props2, {
        keys,
        defaultValue,
      })

      expect(finalProps).toEqual(expectedProps)
    })
  })

  describe('isNil', () => {
    it('should return true for undefined value', () => {
      expect(isNil(undefined)).toBe(true)
    })

    it('should return true for null value', () => {
      expect(isNil(null)).toBe(true)
    })

    it('should return false for not null or undefined value', () => {
      expect(isNil('')).toBe(false)
      expect(isNil('a')).toBe(false)
      expect(isNil(0)).toBe(false)
      expect(isNil(10)).toBe(false)
      expect(isNil({})).toBe(false)
      expect(isNil({ a: 10 })).toBe(false)
      expect(isNil([])).toBe(false)
      expect(isNil(['hello'])).toBe(false)
    })
  })
})
