import { expect, test } from '@jest/globals'
import type { SecretsViewState } from '../src/parts/SecretsViewState/SecretsViewState.ts'
import { handleClick } from '../src/parts/HandleClick/HandleClick.ts'

const state: SecretsViewState = {
  editingIndex: -1,
  editingValue: '',
  errorMessage: '',
  height: 600,
  loaded: true,
  secrets: [{ extensionId: 'sample.extension', key: 'token', value: 'plain-text' }],
  uid: 1,
  width: 800,
  x: 0,
  y: 0,
}

test('edit uses mock data without loading real storage', async () => {
  await expect(handleClick(state, 'edit:0')).resolves.toMatchObject({ editingIndex: 0, editingValue: 'plain-text' })
})

test('cancel clears the editing value', () => {
  expect(handleClick({ ...state, editingIndex: 0, editingValue: 'plain-text' }, 'cancel:0')).toMatchObject({ editingIndex: -1, editingValue: '' })
})

test('unknown actions do not change state', () => {
  expect(handleClick(state, 'unknown:0')).toBe(state)
})
