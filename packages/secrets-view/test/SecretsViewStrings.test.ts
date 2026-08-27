import { expect, test } from '@jest/globals'
import * as SecretsViewStrings from '../src/parts/SecretsViewStrings/SecretsViewStrings.ts'

test('cancel', () => {
  expect(SecretsViewStrings.cancel()).toBe('Cancel')
})

test('description', () => {
  expect(SecretsViewStrings.description()).toBe(
    'Stored extension secrets are encrypted. Reveal or copy a value explicitly; choose Edit to update or delete secrets.',
  )
})

test('edit', () => {
  expect(SecretsViewStrings.edit()).toBe('Edit')
})

test('row action labels', () => {
  expect(SecretsViewStrings.actionsForSecret('sample.extension', 'token')).toBe('Actions for secret sample.extension / token')
  expect(SecretsViewStrings.showSecret('sample.extension', 'token')).toBe('Show secret sample.extension / token')
  expect(SecretsViewStrings.hideSecret('sample.extension', 'token')).toBe('Hide secret sample.extension / token')
  expect(SecretsViewStrings.copySecret('sample.extension', 'token')).toBe('Copy secret sample.extension / token')
  expect(SecretsViewStrings.deleteSecret('sample.extension', 'token')).toBe('Delete secret sample.extension / token')
})

test('failedToRevealSecret', () => {
  expect(SecretsViewStrings.failedToRevealSecret('sample.extension', 'token', 'Encryption unavailable')).toBe(
    'Could not reveal secret sample.extension / token: Encryption unavailable',
  )
})

test('loadingSecrets', () => {
  expect(SecretsViewStrings.loadingSecrets()).toBe('Loading secrets…')
})

test('noSecretsStored', () => {
  expect(SecretsViewStrings.noSecretsStored()).toBe('No secrets stored.')
})

test('save', () => {
  expect(SecretsViewStrings.save()).toBe('Save')
})

test('view action labels', () => {
  expect(SecretsViewStrings.editSecrets()).toBe('Edit secrets')
  expect(SecretsViewStrings.saveSecrets()).toBe('Save secrets')
  expect(SecretsViewStrings.cancelEditingSecrets()).toBe('Cancel editing secrets')
  expect(SecretsViewStrings.secretsActions()).toBe('Secrets actions')
})

test('operation failure labels', () => {
  expect(SecretsViewStrings.failedToCopySecret('sample.extension', 'token', 'Clipboard unavailable')).toBe(
    'Could not copy secret sample.extension / token: Clipboard unavailable',
  )
  expect(SecretsViewStrings.failedToEditSecrets('Encryption unavailable')).toBe('Could not edit secrets: Encryption unavailable')
  expect(SecretsViewStrings.failedToSaveSecrets('Storage unavailable')).toBe('Could not save secrets: Storage unavailable')
})

test('secrets', () => {
  expect(SecretsViewStrings.secrets()).toBe('Secrets')
})

test('storedSecrets', () => {
  expect(SecretsViewStrings.storedSecrets()).toBe('Stored secrets')
})
