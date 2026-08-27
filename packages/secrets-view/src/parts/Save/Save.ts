import { PlatformType } from '@lvce-editor/constants'
import { MainProcess } from '@lvce-editor/rpc-registry'
import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import * as PlatformState from '../PlatformState/PlatformState.ts'

export const save = async (state: SecretsViewState): Promise<SecretsViewState> => {
  const { editingIndex, editingValue, secrets } = state
  const secret = secrets[editingIndex]
  if (!secret) {
    return state
  }
  if (PlatformState.get() === PlatformType.Electron) {
    await MainProcess.invoke('SecretStorage.store', secret.extensionId, secret.key, editingValue)
  }
  return {
    ...state,
    editingIndex: -1,
    editingValue: '',
  }
}
