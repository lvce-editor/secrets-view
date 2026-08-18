import { expect, test } from '@jest/globals'
import type { SecretsViewState } from '../src/parts/SecretsViewState/SecretsViewState.ts'
import { setData } from '../src/parts/SetData/SetData.ts'

const state: SecretsViewState = {
  editingIndex: 1,
  editingValue: 'plain-text',
  height: 600,
  loaded: false,
  secrets: [],
  uid: 1,
  width: 800,
  x: 0,
  y: 0,
}

test('sorts metadata and clears the editing value', () => {
  const result = setData(state, [
    { extensionId: 'z.extension', key: 'token', value: 'z' },
    { extensionId: 'a.extension', key: 'another', value: 'b' },
    { extensionId: 'a.extension', key: 'secret', value: 'a' },
  ])
  expect(result.loaded).toBe(true)
  expect(result.editingIndex).toBe(-1)
  expect(result.editingValue).toBe('')
  expect(result.secrets.map(({ key }) => key)).toEqual(['another', 'secret', 'token'])
})
