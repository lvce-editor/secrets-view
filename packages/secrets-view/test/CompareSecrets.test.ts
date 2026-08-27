import { expect, test } from '@jest/globals'
import { compareSecrets } from '../src/parts/CompareSecrets/CompareSecrets.ts'

test('compares secrets by extension id', () => {
  const result = compareSecrets({ extensionId: 'a.extension', key: 'z-key' }, { extensionId: 'b.extension', key: 'a-key' })
  expect(result).toBeLessThan(0)
})

test('compares secrets with the same extension id by key', () => {
  const result = compareSecrets({ extensionId: 'a.extension', key: 'a-key' }, { extensionId: 'a.extension', key: 'b-key' })
  expect(result).toBeLessThan(0)
})

test('returns zero for equal extension ids and keys', () => {
  const result = compareSecrets(
    { extensionId: 'a.extension', key: 'key', value: 'first' },
    { extensionId: 'a.extension', key: 'key', value: 'second' },
  )
  expect(result).toBe(0)
})
