import { expect, test } from '@jest/globals'
import { RendererProcess } from '@lvce-editor/rpc-registry'
import type { SecretsViewState } from '../src/parts/SecretsViewState/SecretsViewState.ts'
import { edit } from '../src/parts/Edit/Edit.ts'
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
  height: 600,
  loaded: true,
  secrets: [{ extensionId: 'sample.extension', key: 'token' }],
  uid: 1,
  width: 800,
  x: 0,
  y: 0,
}

test('edit ignores an unknown row', async () => {
  await expect(edit(state, 10)).resolves.toBe(state)
})

test('edit fetches the value only after the explicit action', async () => {
  const mockRpc = createRpc({
    'SecretStorage.get'() {
      return 'plain-text'
    },
  })
  RendererProcess.set(mockRpc)

  await expect(edit(state, 0)).resolves.toMatchObject({ editingIndex: 0, editingValue: 'plain-text' })
  expect(mockRpc.invocations).toEqual([['SecretStorage.get', 'sample.extension', 'token']])
})

test('save stores the edited value and clears it from state', async () => {
  const mockRpc = createRpc({
    'SecretStorage.store'() {},
  })
  RendererProcess.set(mockRpc)
  const editingState = { ...state, editingIndex: 0, editingValue: 'updated-secret' }

  await expect(save(editingState)).resolves.toMatchObject({ editingIndex: -1, editingValue: '' })
  expect(mockRpc.invocations).toEqual([['SecretStorage.store', 'sample.extension', 'token', 'updated-secret']])
})

test('save ignores an unknown row', async () => {
  await expect(save(state)).resolves.toBe(state)
})
