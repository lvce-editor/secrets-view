import { PlatformType } from '@lvce-editor/constants'
import { MainProcess } from '@lvce-editor/rpc-registry'
import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import * as PlatformState from '../PlatformState/PlatformState.ts'

export const edit = async (state: SecretsViewState, index: number): Promise<SecretsViewState> => {
  const { secrets } = state
  const secret = secrets[index]
  if (!secret) {
    return state
  }
  const editingValue =
    secret.value ??
    (PlatformState.get() === PlatformType.Electron ? await MainProcess.invoke('SecretStorage.get', secret.extensionId, secret.key) : undefined) ??
    ''
  return {
    ...state,
    editingIndex: index,
    editingValue,
  }
}
