import { getDateStringFromTimestamp } from '../utils'

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
