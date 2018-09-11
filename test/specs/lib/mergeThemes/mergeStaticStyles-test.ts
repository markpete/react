import { mergeStaticStyles } from '../../../../src/lib/mergeThemes'

describe('mergeStaticStyles', () => {
  test('latest boolean value wins', () => {
    expect(mergeStaticStyles(false, true)).toEqual(true)
    expect(mergeStaticStyles(true, false)).toEqual(false)

    expect(mergeStaticStyles(null, true)).toEqual(true)
    expect(mergeStaticStyles(null, false)).toEqual(false)

    expect(mergeStaticStyles(undefined, true)).toEqual(true)
    expect(mergeStaticStyles(undefined, false)).toEqual(false)
  })

  test('null values do not override boolean values', () => {
    expect(mergeStaticStyles(false, null)).toEqual(false)
    expect(mergeStaticStyles(true, null)).toEqual(true)
  })

  test('undefined values do not override boolean values', () => {
    expect(mergeStaticStyles(false, undefined)).toEqual(false)
    expect(mergeStaticStyles(true, undefined)).toEqual(true)
  })

  test('default to false if no boolean was provided', () => {
    expect(mergeStaticStyles(null, null)).toEqual(false)
    expect(mergeStaticStyles(null, undefined)).toEqual(false)

    expect(mergeStaticStyles(undefined, null)).toEqual(false)
    expect(mergeStaticStyles(undefined, undefined)).toEqual(false)
  })
})
