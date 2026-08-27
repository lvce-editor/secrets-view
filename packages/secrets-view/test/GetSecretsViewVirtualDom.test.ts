import { expect, test } from '@jest/globals'
import { getSecretsViewVirtualDom } from '../src/parts/GetSecretsViewVirtualDom/GetSecretsViewVirtualDom.ts'

test('does not render plaintext while read-only', () => {
  const dom = getSecretsViewVirtualDom({
    editingIndex: -1,
    editingValue: '',
    height: 600,
    loaded: true,
    secrets: [{ extensionId: 'sample.extension', key: 'token', value: 'plain-text' }],
    uid: 1,
    width: 800,
    x: 0,
    y: 0,
  })
  expect(JSON.stringify(dom)).not.toContain('plain-text')
  const valueInput = dom.find((node) => node.className === 'InputBox SecretsViewValue')
  expect(valueInput).toMatchObject({ inputType: 'password', readOnly: true, value: '••••••••••••' })
})

test('renders a password input while editing', () => {
  const dom = getSecretsViewVirtualDom({
    editingIndex: 0,
    editingValue: 'plain-text',
    height: 600,
    loaded: true,
    secrets: [{ extensionId: 'sample.extension', key: 'token' }],
    uid: 1,
    width: 800,
    x: 0,
    y: 0,
  })
  const valueInput = dom.find((node) => node.className === 'InputBox SecretsViewValue')
  expect(valueInput).toMatchObject({ inputType: 'password', readOnly: false, value: 'plain-text' })
})

test('renders an empty status after loading', () => {
  const dom = getSecretsViewVirtualDom({
    editingIndex: -1,
    editingValue: '',
    height: 600,
    loaded: true,
    secrets: [],
    uid: 1,
    width: 800,
    x: 0,
    y: 0,
  })
  expect(JSON.stringify(dom)).toContain('No secrets stored.')
})

test('renders a loading status before loading', () => {
  const dom = getSecretsViewVirtualDom({
    editingIndex: -1,
    editingValue: '',
    height: 600,
    loaded: false,
    secrets: [],
    uid: 1,
    width: 800,
    x: 0,
    y: 0,
  })
  expect(JSON.stringify(dom)).toContain('Loading secrets…')
})
