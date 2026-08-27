import { expect, test } from '@jest/globals'
import * as SecretsViewStrings from '../src/parts/SecretsViewStrings/SecretsViewStrings.ts'

test('cancel', () => {
  expect(SecretsViewStrings.cancel()).toBe('Cancel')
})

test('description', () => {
  expect(SecretsViewStrings.description()).toBe('Stored extension secrets are encrypted. Values stay hidden until you choose Edit.')
})

test('edit', () => {
  expect(SecretsViewStrings.edit()).toBe('Edit')
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

test('secrets', () => {
  expect(SecretsViewStrings.secrets()).toBe('Secrets')
})

test('storedSecrets', () => {
  expect(SecretsViewStrings.storedSecrets()).toBe('Stored secrets')
})
