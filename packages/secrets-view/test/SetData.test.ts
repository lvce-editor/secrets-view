import { expect, test } from '@jest/globals'
import type { SecretsViewState } from '../src/parts/SecretsViewState/SecretsViewState.ts'
import { setData } from '../src/parts/SetData/SetData.ts'

const state: SecretsViewState = {
  deletedIndices: [1],
  editingValues: ['plain-text'],
  editMode: true,
  errorMessage: 'Previous failure',
  height: 600,
  loaded: false,
  originalValues: ['original'],
  revealedIndices: [0],
  secrets: [],
  secretValues: ['plain-text'],
  uid: 1,
  width: 800,
  x: 0,
  y: 0,
}

test('sorts metadata and clears transient secret values', () => {
  const result = setData(state, [
    { extensionId: 'z.extension', key: 'token', value: 'z' },
    { extensionId: 'a.extension', key: 'another', value: 'b' },
    { extensionId: 'a.extension', key: 'secret', value: 'a' },
  ])
  expect(result.loaded).toBe(true)
  expect(result.deletedIndices).toEqual([])
  expect(result.editingValues).toEqual([])
  expect(result.editMode).toBe(false)
  expect(result.errorMessage).toBe('')
  expect(result.originalValues).toEqual([])
  expect(result.revealedIndices).toEqual([])
  expect(result.secretValues).toEqual([])
  expect(result.secrets.map(({ key }) => key)).toEqual(['another', 'secret', 'token'])
})
