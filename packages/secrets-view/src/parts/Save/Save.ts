import { PlatformType } from '@lvce-editor/constants'
import { MainProcess } from '@lvce-editor/rpc-registry'
import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import * as PlatformState from '../PlatformState/PlatformState.ts'
import * as SecretsViewStrings from '../SecretsViewStrings/SecretsViewStrings.ts'

export const save = async (state: SecretsViewState): Promise<SecretsViewState> => {
  const { deletedIndices, editingValues, editMode, originalValues, secrets } = state
  if (!editMode) {
    return state
  }
  try {
    if (PlatformState.get() === PlatformType.Electron) {
      const operations: Promise<void>[] = []
      for (const [index, secret] of secrets.entries()) {
        if (deletedIndices.includes(index)) {
          operations.push(MainProcess.invoke('SecretStorage.delete', secret.extensionId, secret.key))
        } else if (editingValues[index] !== originalValues[index]) {
          operations.push(MainProcess.invoke('SecretStorage.store', secret.extensionId, secret.key, editingValues[index]))
        }
      }
      await Promise.all(operations)
    }
  } catch (error) {
    const message = error instanceof Error && error.message ? error.message : String(error)
    return {
      ...state,
      errorMessage: SecretsViewStrings.failedToSaveSecrets(message),
    }
  }
  return {
    ...state,
    deletedIndices: [],
    editingValues: [],
    editMode: false,
    errorMessage: '',
    originalValues: [],
    revealedIndices: [],
    secrets: secrets
      .map((secret, index) => (secret.value === undefined ? secret : { ...secret, value: editingValues[index] }))
      .filter((_secret, index) => !deletedIndices.includes(index)),
    secretValues: [],
  }
}
