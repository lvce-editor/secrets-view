import { beforeEach, expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { MainProcess } from '@lvce-editor/rpc-registry'
import type { SecretsViewState } from '../src/parts/SecretsViewState/SecretsViewState.ts'
import { copySecret } from '../src/parts/CopySecret/CopySecret.ts'
import { deleteSecret } from '../src/parts/DeleteSecret/DeleteSecret.ts'
import { edit } from '../src/parts/Edit/Edit.ts'
import { handleInput } from '../src/parts/HandleInput/HandleInput.ts'
import * as PlatformState from '../src/parts/PlatformState/PlatformState.ts'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'
import { save } from '../src/parts/Save/Save.ts'
import { toggleReveal } from '../src/parts/ToggleReveal/ToggleReveal.ts'

const createRpc = (commands: Readonly<Record<string, (...args: readonly any[]) => any>>): any => {
  const invocations: any[] = []
  return {
    dispose(): Promise<void> {
      return Promise.resolve()
    },
    invocations,
    invoke(method: string, ...params: readonly any[]): any {
      invocations.push([method, ...params])
      return commands[method]?.(...params)
    },
    invokeAndTransfer(): Promise<void> {
      return Promise.resolve()
    },
  }
}

const state: SecretsViewState = {
  deletedIndices: [],
  editingValues: [],
  editMode: false,
  errorMessage: '',
  height: 600,
  loaded: true,
  originalValues: [],
  revealedIndices: [],
  secrets: [
    { extensionId: 'sample.extension', key: 'token' },
    { extensionId: 'sample.extension', key: 'refresh-token' },
  ],
  secretValues: [],
  uid: 1,
  width: 800,
  x: 0,
  y: 0,
}

beforeEach(() => {
  PlatformState.set(PlatformType.Electron)
})

test('edit loads all values after the view-level action', async () => {
  const mockRpc = createRpc({
    'SecretStorage.get'(_extensionId: string, key: string) {
      return `${key}-value`
    },
  })
  MainProcess.set(mockRpc)

  await expect(edit(state)).resolves.toMatchObject({
    editingValues: ['token-value', 'refresh-token-value'],
    editMode: true,
    originalValues: ['token-value', 'refresh-token-value'],
    secretValues: ['token-value', 'refresh-token-value'],
  })
  expect(mockRpc.invocations).toEqual([
    ['SecretStorage.get', 'sample.extension', 'token'],
    ['SecretStorage.get', 'sample.extension', 'refresh-token'],
  ])
})

test('edit exposes a recoverable error when storage cannot decrypt values', async () => {
  const mockRpc = createRpc({
    'SecretStorage.get'() {
      throw new Error('Encryption is not available.')
    },
  })
  MainProcess.set(mockRpc)

  await expect(edit(state)).resolves.toMatchObject({
    editMode: false,
    errorMessage: 'Could not edit secrets: Encryption is not available.',
  })
})

test('edit ignores empty and already-editing views', async () => {
  await expect(edit({ ...state, secrets: [] })).resolves.toMatchObject({ editMode: false })
  await expect(edit({ ...state, editMode: true })).resolves.toMatchObject({ editMode: true })
})

test('save stores changed values and commits staged deletions', async () => {
  const mockRpc = createRpc({
    'SecretStorage.delete'() {},
    'SecretStorage.store'() {},
  })
  MainProcess.set(mockRpc)
  const editingState: SecretsViewState = {
    ...state,
    deletedIndices: [1],
    editingValues: ['updated-token', 'refresh-value'],
    editMode: true,
    originalValues: ['token-value', 'refresh-value'],
    secretValues: ['updated-token', 'refresh-value'],
  }

  const result = await save(editingState)

  expect(result).toMatchObject({ editMode: false, secrets: [{ extensionId: 'sample.extension', key: 'token' }] })
  expect(mockRpc.invocations).toEqual([
    ['SecretStorage.store', 'sample.extension', 'token', 'updated-token'],
    ['SecretStorage.delete', 'sample.extension', 'refresh-token'],
  ])
})

test('save keeps edit mode recoverable when persistence fails', async () => {
  const mockRpc = createRpc({
    'SecretStorage.store'() {
      throw new Error('Storage is read-only')
    },
  })
  MainProcess.set(mockRpc)
  const editingState: SecretsViewState = {
    ...state,
    editingValues: ['updated-token', 'refresh-value'],
    editMode: true,
    originalValues: ['token-value', 'refresh-value'],
    secretValues: ['updated-token', 'refresh-value'],
  }

  await expect(save(editingState)).resolves.toMatchObject({ editMode: true, errorMessage: 'Could not save secrets: Storage is read-only' })
})

test('save ignores a view outside edit mode', async () => {
  await expect(save(state)).resolves.toBe(state)
})

test('delete is staged only in edit mode', () => {
  expect(deleteSecret(state, 0)).toBe(state)
  const deleted = deleteSecret({ ...state, editMode: true }, 1)
  expect(deleted).toMatchObject({ deletedIndices: [1] })
  expect(deleteSecret(deleted, 1)).toBe(deleted)
})

test('reveal loads one value and hide clears it outside edit mode', async () => {
  const mockRpc = createRpc({
    'SecretStorage.get'() {
      return 'plain-text'
    },
  })
  MainProcess.set(mockRpc)

  const revealed = await toggleReveal(state, 0)
  expect(revealed).toMatchObject({ revealedIndices: [0], secretValues: ['plain-text'] })
  await expect(toggleReveal(revealed, 0)).resolves.toMatchObject({ revealedIndices: [], secretValues: [''] })
})

test('reveal exposes retrieval failures without changing visibility', async () => {
  const mockRpc = createRpc({
    'SecretStorage.get'() {
      throw new Error('Encryption unavailable')
    },
  })
  MainProcess.set(mockRpc)

  await expect(toggleReveal(state, 0)).resolves.toMatchObject({
    errorMessage: 'Could not reveal secret sample.extension / token: Encryption unavailable',
    revealedIndices: [],
  })
})

test('copy retrieves the selected secret without revealing it', async () => {
  const mainRpc = createRpc({
    'SecretStorage.get'() {
      return 'plain-text'
    },
  })
  const rendererRpc = createRpc({
    'ClipBoard.writeText'() {},
  })
  MainProcess.set(mainRpc)
  RendererProcess.set(rendererRpc)

  const result = await copySecret(state, 1)

  expect(result.revealedIndices).toEqual([])
  expect(mainRpc.invocations).toEqual([['SecretStorage.get', 'sample.extension', 'refresh-token']])
  expect(rendererRpc.invocations).toEqual([['ClipBoard.writeText', 'plain-text']])
})

test('copy exposes clipboard failures without revealing the value', async () => {
  const mainRpc = createRpc({
    'SecretStorage.get'() {
      return 'plain-text'
    },
  })
  const rendererRpc = createRpc({
    'ClipBoard.writeText'() {
      throw new Error('Clipboard unavailable')
    },
  })
  MainProcess.set(mainRpc)
  RendererProcess.set(rendererRpc)

  await expect(copySecret(state, 0)).resolves.toMatchObject({
    errorMessage: 'Could not copy secret sample.extension / token: Clipboard unavailable',
    revealedIndices: [],
  })
})

test('input updates only the selected editable row', () => {
  const editingState = { ...state, editingValues: ['first', 'second'], editMode: true, secretValues: ['first', 'second'] }

  expect(handleInput(editingState, 'value:1', 'updated')).toMatchObject({
    editingValues: ['first', 'updated'],
    secretValues: ['first', 'updated'],
  })
  expect(handleInput(state, 'value:0', 'ignored')).toBe(state)
})

test('web fixtures remain editable without main-process persistence', async () => {
  PlatformState.set(PlatformType.Web)
  const fixtureState = {
    ...state,
    secrets: [{ extensionId: 'sample.extension', key: 'token', value: 'fixture-value' }],
  }

  const editingState = await edit(fixtureState)
  const updatedState = handleInput(editingState, 'value:0', 'updated-fixture')
  const result = await save(updatedState)

  expect(result).toMatchObject({ editMode: false, secrets: [{ extensionId: 'sample.extension', key: 'token', value: 'updated-fixture' }] })
})
