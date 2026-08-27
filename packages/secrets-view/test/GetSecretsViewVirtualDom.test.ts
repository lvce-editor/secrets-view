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
  const extensionInput = dom.find((node) => node.className === 'InputBox SecretsViewExtensionId')
  const keyInput = dom.find((node) => node.className === 'InputBox SecretsViewKey')
  const valueInput = dom.find((node) => node.className === 'InputBox SecretsViewValue')
  const editButton = dom.find((node) => node.name === 'edit:0')
  expect(extensionInput).toMatchObject({ readOnly: true, tabIndex: -1 })
  expect(keyInput).toMatchObject({ readOnly: true, tabIndex: -1 })
  expect(valueInput).toMatchObject({ inputType: 'password', readOnly: true, tabIndex: -1, value: '••••••••••••' })
  expect(editButton).toMatchObject({ ariaLabel: 'Edit secret sample.extension / token' })
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
  const saveButton = dom.find((node) => node.name === 'save:0')
  const cancelButton = dom.find((node) => node.name === 'cancel:0')
  expect(valueInput).toMatchObject({ inputType: 'password', readOnly: false, tabIndex: 0, value: 'plain-text' })
  expect(saveButton).toMatchObject({ ariaLabel: 'Save secret sample.extension / token' })
  expect(cancelButton).toMatchObject({ ariaLabel: 'Cancel editing secret sample.extension / token' })
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
