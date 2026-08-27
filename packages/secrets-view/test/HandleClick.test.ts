import { expect, test } from '@jest/globals'
import type { SecretsViewState } from '../src/parts/SecretsViewState/SecretsViewState.ts'
import { handleClick } from '../src/parts/HandleClick/HandleClick.ts'

const state: SecretsViewState = {
  deletedIndices: [],
  editingValues: [],
  editMode: false,
  errorMessage: '',
  height: 600,
  loaded: true,
  originalValues: [],
  revealedIndices: [],
  secrets: [{ extensionId: 'sample.extension', key: 'token', value: 'plain-text' }],
  secretValues: [],
  uid: 1,
  width: 800,
  x: 0,
  y: 0,
}

test('edit uses mock data without loading real storage', async () => {
  await expect(handleClick(state, 'edit')).resolves.toMatchObject({ editingValues: ['plain-text'], editMode: true })
})

test('cancel clears staged edit state', () => {
  expect(handleClick({ ...state, editingValues: ['plain-text'], editMode: true, originalValues: ['plain-text'] }, 'cancel')).toMatchObject({
    editingValues: [],
    editMode: false,
    originalValues: [],
  })
})

test('delete is routed to the selected row only in edit mode', () => {
  expect(handleClick({ ...state, editMode: true }, 'delete:0')).toMatchObject({ deletedIndices: [0] })
})

test('unknown actions do not change state', () => {
  expect(handleClick(state, 'unknown:0')).toBe(state)
})
