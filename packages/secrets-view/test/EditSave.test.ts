import { beforeEach, expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { MainProcess } from '@lvce-editor/rpc-registry'
import type { SecretsViewState } from '../src/parts/SecretsViewState/SecretsViewState.ts'
import { edit } from '../src/parts/Edit/Edit.ts'
import * as PlatformState from '../src/parts/PlatformState/PlatformState.ts'
import { save } from '../src/parts/Save/Save.ts'

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
  editingIndex: -1,
  editingValue: '',
  errorMessage: '',
  height: 600,
  loaded: true,
  secrets: [{ extensionId: 'sample.extension', key: 'token' }],
  uid: 1,
  width: 800,
  x: 0,
  y: 0,
}

beforeEach(() => {
  PlatformState.set(PlatformType.Electron)
})

test('edit ignores an unknown row', async () => {
  await expect(edit(state, 10)).resolves.toBe(state)
})

test('edit fetches the value only after the explicit action', async () => {
  const mockRpc = createRpc({
    'SecretStorage.get'() {
      return 'plain-text'
    },
  })
  MainProcess.set(mockRpc)

  await expect(edit(state, 0)).resolves.toMatchObject({ editingIndex: 0, editingValue: 'plain-text' })
  expect(mockRpc.invocations).toEqual([['SecretStorage.get', 'sample.extension', 'token']])
})

test('edit exposes a recoverable error when storage cannot decrypt the secret', async () => {
  const mockRpc = createRpc({
    'SecretStorage.get'() {
      throw new Error('Encryption is not available.')
    },
  })
  MainProcess.set(mockRpc)

  await expect(edit(state, 0)).resolves.toMatchObject({
    editingIndex: -1,
    editingValue: '',
    errorMessage: 'Could not reveal secret sample.extension / token: Encryption is not available.',
  })
})

test('a successful retry clears the previous error', async () => {
  const mockRpc = createRpc({
    'SecretStorage.get'() {
      return 'plain-text'
    },
  })
  MainProcess.set(mockRpc)

  await expect(edit({ ...state, errorMessage: 'Previous failure' }, 0)).resolves.toMatchObject({
    editingIndex: 0,
    editingValue: 'plain-text',
    errorMessage: '',
  })
})

test('save stores the edited value and clears it from state', async () => {
  const mockRpc = createRpc({
    'SecretStorage.store'() {},
  })
  MainProcess.set(mockRpc)
  const editingState = { ...state, editingIndex: 0, editingValue: 'updated-secret' }

  await expect(save(editingState)).resolves.toMatchObject({ editingIndex: -1, editingValue: '' })
  expect(mockRpc.invocations).toEqual([['SecretStorage.store', 'sample.extension', 'token', 'updated-secret']])
})

test('save ignores an unknown row', async () => {
  await expect(save(state)).resolves.toBe(state)
})

test('edit uses injected values outside Electron', async () => {
  PlatformState.set(PlatformType.Web)
  const { secrets } = state
  const [secret] = secrets

  await expect(edit({ ...state, secrets: [{ ...secret, value: 'injected-secret' }] }, 0)).resolves.toMatchObject({
    editingIndex: 0,
    editingValue: 'injected-secret',
  })
})

test('save updates view state without persistence outside Electron', async () => {
  PlatformState.set(PlatformType.Web)
  const editingState = { ...state, editingIndex: 0, editingValue: 'updated-secret' }

  await expect(save(editingState)).resolves.toMatchObject({ editingIndex: -1, editingValue: '' })
})
