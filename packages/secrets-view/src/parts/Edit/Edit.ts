import { MainProcess } from '@lvce-editor/rpc-registry'
import type { SecretsViewState } from '../SecretsViewState/SecretsViewState.ts'

export const edit = async (state: SecretsViewState, index: number): Promise<SecretsViewState> => {
  const { secrets } = state
  const secret = secrets[index]
  if (!secret) {
    return state
  }
  const editingValue = secret.value ?? (await MainProcess.invoke('SecretStorage.get', secret.extensionId, secret.key)) ?? ''
  return {
    ...state,
    editingIndex: index,
    editingValue,
  }
}
