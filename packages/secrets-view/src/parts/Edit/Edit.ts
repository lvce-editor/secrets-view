import { PlatformType } from '@lvce-editor/constants'
import { MainProcess } from '@lvce-editor/rpc-registry'
import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'
import * as PlatformState from '../PlatformState/PlatformState.ts'
import * as SecretsViewStrings from '../SecretsViewStrings/SecretsViewStrings.ts'

export const edit = async (state: SecretsViewState, index: number): Promise<SecretsViewState> => {
  const { secrets } = state
  const secret = secrets[index]
  if (!secret) {
    return state
  }
  try {
    const editingValue =
      secret.value ??
      (PlatformState.get() === PlatformType.Electron ? await MainProcess.invoke('SecretStorage.get', secret.extensionId, secret.key) : undefined) ??
      ''
    return {
      ...state,
      editingIndex: index,
      editingValue,
      errorMessage: '',
    }
  } catch (error) {
    const message = error instanceof Error && error.message ? error.message : String(error)
    return {
      ...state,
      editingIndex: -1,
      editingValue: '',
      errorMessage: SecretsViewStrings.failedToRevealSecret(secret.extensionId, secret.key, message),
    }
  }
}
