import { expect, test } from '@jest/globals'
import type { SecretsViewState } from '../src/parts/SecretsViewState/SecretsViewState.ts'
import { getSecretsViewVirtualDom } from '../src/parts/GetSecretsViewVirtualDom/GetSecretsViewVirtualDom.ts'

const createState = (overrides: Partial<SecretsViewState> = {}): SecretsViewState => ({
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
  ...overrides,
})

test('renders one view-level edit action and safe row actions by default', () => {
  const dom = getSecretsViewVirtualDom(createState())

  expect(JSON.stringify(dom)).not.toContain('plain-text')
  const extensionInput = dom.find((node) => node.className === 'InputBox SecretsViewExtensionId')
  const keyInput = dom.find((node) => node.className === 'InputBox SecretsViewKey')
  const valueInput = dom.find((node) => node.className === 'InputBox SecretsViewValue')
  const editButton = dom.find((node) => node.name === 'edit')
  const revealButton = dom.find((node) => node.name === 'reveal:0')
  const copyButton = dom.find((node) => node.name === 'copy:0')
  const deleteButton = dom.find((node) => node.name === 'delete:0')
  expect(extensionInput).toMatchObject({ readOnly: true, tabIndex: -1 })
  expect(keyInput).toMatchObject({ readOnly: true, tabIndex: -1 })
  expect(valueInput).toMatchObject({ inputType: 'password', readOnly: true, tabIndex: -1, value: '••••••••••••' })
  expect(editButton).toMatchObject({ ariaLabel: 'Edit secrets' })
  expect(revealButton).toMatchObject({ ariaLabel: 'Show secret sample.extension / token' })
  expect(copyButton).toMatchObject({ ariaLabel: 'Copy secret sample.extension / token' })
  expect(deleteButton).toBeUndefined()
  expect(dom.find((node) => node.className === 'MaskIcon MaskIconEye')).toBeDefined()
  expect(dom.find((node) => node.className === 'MaskIcon MaskIconCopy')).toBeDefined()
})

test('reveals only the selected value and offers a hide action', () => {
  const dom = getSecretsViewVirtualDom(createState({ revealedIndices: [0], secretValues: ['plain-text'] }))
  const valueInput = dom.find((node) => node.className === 'InputBox SecretsViewValue')
  const revealButton = dom.find((node) => node.name === 'reveal:0')

  expect(valueInput).toMatchObject({ inputType: 'text', readOnly: true, value: 'plain-text' })
  expect(revealButton).toMatchObject({ ariaLabel: 'Hide secret sample.extension / token' })
  expect(dom.find((node) => node.className === 'MaskIcon MaskIconEyeClosed')).toBeDefined()
})

test('edit mode moves save and cancel to the header and adds row delete', () => {
  const dom = getSecretsViewVirtualDom(
    createState({ editingValues: ['plain-text'], editMode: true, originalValues: ['plain-text'], secretValues: ['plain-text'] }),
  )
  const valueInput = dom.find((node) => node.className === 'InputBox SecretsViewValue')
  const editButton = dom.find((node) => node.name === 'edit')
  const saveButton = dom.find((node) => node.name === 'save')
  const cancelButton = dom.find((node) => node.name === 'cancel')
  const deleteButton = dom.find((node) => node.name === 'delete:0')

  expect(valueInput).toMatchObject({ inputType: 'password', name: 'value:0', readOnly: false, tabIndex: 0, value: 'plain-text' })
  expect(editButton).toBeUndefined()
  expect(saveButton).toMatchObject({ ariaLabel: 'Save secrets' })
  expect(cancelButton).toMatchObject({ ariaLabel: 'Cancel editing secrets' })
  expect(deleteButton).toMatchObject({ ariaLabel: 'Delete secret sample.extension / token' })
  expect(dom.find((node) => node.className === 'MaskIcon MaskIconTrash')).toBeDefined()
})

test('staged deletion removes the row while retaining edit controls', () => {
  const dom = getSecretsViewVirtualDom(
    createState({ deletedIndices: [0], editingValues: ['plain-text'], editMode: true, originalValues: ['plain-text'], secretValues: ['plain-text'] }),
  )

  expect(dom.some((node) => node.className === 'SecretsViewRow')).toBe(false)
  expect(JSON.stringify(dom)).toContain('No secrets stored.')
  expect(dom.find((node) => node.name === 'save')).toBeDefined()
  expect(dom.find((node) => node.name === 'cancel')).toBeDefined()
})

test('renders an empty status after loading', () => {
  const dom = getSecretsViewVirtualDom(createState({ secrets: [] }))
  expect(JSON.stringify(dom)).toContain('No secrets stored.')
  expect(dom.find((node) => node.name === 'edit')).toBeUndefined()
})

test('renders a loading status before loading', () => {
  const dom = getSecretsViewVirtualDom(createState({ loaded: false, secrets: [] }))
  expect(JSON.stringify(dom)).toContain('Loading secrets…')
})

test('renders storage failures as an accessible alert', () => {
  const dom = getSecretsViewVirtualDom(createState({ errorMessage: 'Could not reveal this secret.' }))
  const root = dom[0]
  const alert = dom.find((node) => node.className === 'SecretsViewError')
  expect(root).toMatchObject({ childCount: 3 })
  expect(alert).toMatchObject({ childCount: 1, role: 'alert' })
  expect(JSON.stringify(dom)).toContain('Could not reveal this secret.')
})
